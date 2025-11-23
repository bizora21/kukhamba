/// <reference path="../types/express.d.ts" />

import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const JWT_EXPIRES_IN = '7d';

// Constants for validation (replacing enums)
const VALID_ROLES = ['CLIENT', 'PROVIDER'] as const;
type UserRole = typeof VALID_ROLES[number];

// 📝 Registro de novo usuário
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, fullName, phone, role, location } = req.body;

        // Validações
        if (!email || !password || !fullName || !phone || !role) {
            res.status(400).json({
                error: 'Campos obrigatórios: email, password, fullName, phone, role'
            });
            return;
        }

        if (!VALID_ROLES.includes(role)) {
            res.status(400).json({
                error: 'Role inválido. Use CLIENT ou PROVIDER'
            });
            return;
        }

        // Verificar se email já existe
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            res.status(400).json({ error: 'Email já cadastrado' });
            return;
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar usuário
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName,
                phone,
                role,
                location
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                phone: true,
                role: true,
                location: true,
                createdAt: true
            }
        });

        // Gerar token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            user,
            token
        });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// 🔐 Login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validações
        if (!email || !password) {
            res.status(400).json({ error: 'Email e senha são obrigatórios' });
            return;
        }

        // Buscar usuário
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                providerProfile: true
            }
        });

        if (!user) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        // Verificar senha
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        // Gerar token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });

        // Remover senha da resposta
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            message: 'Login realizado com sucesso',
            user: userWithoutPassword,
            token
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

// 👤 Obter perfil do usuário autenticado
router.get('/me', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Usuário não autenticado' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                providerProfile: true
            }
        });

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        res.json({ user: userWithoutPassword });
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        res.status(500).json({ error: 'Erro ao buscar perfil' });
    }
});

// ✏️ Atualizar perfil
router.put('/profile', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Usuário não autenticado' });
            return;
        }

        const { fullName, phone, location } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                ...(fullName && { fullName }),
                ...(phone && { phone }),
                ...(location && { location })
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                phone: true,
                role: true,
                location: true,
                updatedAt: true
            }
        });

        res.json({
            message: 'Perfil atualizado com sucesso',
            user: updatedUser
        });
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
});

// 🔒 Alterar senha
router.put('/change-password', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Usuário não autenticado' });
            return;
        }

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias' });
            return;
        }

        // Buscar usuário com senha
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        // Verificar senha atual
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Senha atual incorreta' });
            return;
        }

        // Hash da nova senha
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Atualizar senha
        await prisma.user.update({
            where: { id: req.user.id },
            data: { password: hashedPassword }
        });

        res.json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
        console.error('Erro ao alterar senha:', error);
        res.status(500).json({ error: 'Erro ao alterar senha' });
    }
});

export default router;
