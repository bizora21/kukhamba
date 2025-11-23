import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

interface JwtPayload {
    userId: string;
}

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Pegar token do header Authorization ou cookies
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            res.status(401).json({ error: 'Token de autenticação não fornecido' });
            return;
        }

        const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-this';

        // Verificar token
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

        // Buscar usuário
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: {
                providerProfile: true
            }
        });

        if (!user) {
            res.status(401).json({ error: 'Usuário não encontrado' });
            return;
        }

        // Adicionar usuário ao request
        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(403).json({ error: 'Token inválido' });
            return;
        }
        res.status(500).json({ error: 'Erro ao autenticar token' });
    }
};

export const optionalAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-this';
            const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
                include: {
                    providerProfile: true
                }
            });

            if (user) {
                req.user = user;
            }
        }

        next();
    } catch (error) {
        // Continuar mesmo se o token for inválido
        next();
    }
};
