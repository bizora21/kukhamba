import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth-supabase';
import testRoutes from './routes/test';
import { prisma } from './lib/prisma';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rotas
app.get('/', (req, res) => {
    res.json({
        message: 'KuKhamba API is running',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            test: '/api/test',
            health: '/health'
        }
    });
});

app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
    } catch (error) {
        res.status(500).json({ status: 'error', database: 'disconnected', error: String(error) });
    }
});

// Rotas de autenticação
app.use('/api/auth', authRoutes);

import debugRoutes from './routes/debug';
import profileRoutes from './routes/profile';

// ... (outros imports)

// Rotas de teste
app.use('/api/test', testRoutes);
app.use('/api/debug', debugRoutes);

// Rotas de perfil
app.use('/api/profile', profileRoutes);

import jobsRoutes from './routes/jobs';
app.use('/api/jobs', jobsRoutes);

// Global error handler
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, async () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 API: http://localhost:${PORT}`);
    console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);

    // Test database connection
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
});
