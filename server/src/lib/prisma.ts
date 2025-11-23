import { PrismaClient } from '@prisma/client';

// Ensure a single PrismaClient instance in development
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
        log: ['query', 'error', 'warn'],
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
