/// <reference path="../types/express.d.ts" />

import crypto from 'crypto';
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth';
import { supabase } from '../lib/supabase';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const JWT_EXPIRES_IN = '7d';

// Constants for validation
const VALID_ROLES = ['CLIENT', 'PROVIDER'] as const;
type UserRole = typeof VALID_ROLES[number];

// 📝 Registro de novo usuário (usando Supabase)
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
        const { data: existingUser } = await supabase
            .from('User')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) {
            res.status(400).json({ error: 'Email já cadastrado' });
            return;
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Gerar UUID para o usuário
        const userId = crypto.randomUUID();
        const now = new Date().toISOString();

        // Criar usuário no Supabase
        const { data: user, error } = await supabase
            .from('User')
            .insert({
                id: userId,
                email,
                password: hashedPassword,
                fullName,
                phone,
                role,
                location,
                createdAt: now,
                updatedAt: now
            })
            .select('id, email, fullName, phone, role, location, createdAt')
            .single();

        if (error) {
            console.error('Erro ao criar usuário no Supabase:', error);
            res.status(500).json({ error: 'Erro ao criar usuário' });
            return;
        }

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

// 🔐 Login (usando Supabase)
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validações
        if (!email || !password) {
            res.status(400).json({ error: 'Email e senha são obrigatórios' });
            return;
        }

        // Buscar usuário no Supabase
        const { data: user, error } = await supabase
            .from('User')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
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

export default router;
