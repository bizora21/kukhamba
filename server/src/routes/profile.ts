import express, { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { authenticateToken } from '../middleware/auth'; // Vamos precisar adaptar esse middleware para usar o token do Supabase ou manter o nosso JWT

const router = express.Router();

// Middleware para extrair o ID do usuário do token (simulado por enquanto se o middleware auth não estiver 100% integrado com supabase)
// Idealmente, usaremos o ID que vem no JWT do nosso login

// 🔍 Obter perfil do usuário logado
router.get('/me', async (req: Request, res: Response) => {
    try {
        // Pegar o token do header Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        // Aqui deveríamos decodificar o token para pegar o userId. 
        // Vou assumir que o middleware de auth já colocou o userId no req (precisamos verificar isso)
        // Por enquanto, vou fazer uma consulta simulada baseada em um header 'x-user-id' para teste ou implementar a decodificação real

        // Vamos usar a implementação real de decodificação do JWT que já temos no projeto
        // Mas como estamos migrando, vou focar na lógica do Supabase

        // ... Lógica de busca no Supabase ...
        // (Vou implementar completo no próximo passo, após verificar o middleware de auth)

        res.json({ message: "Endpoint em construção" });
    } catch (error) {
        res.status(500).json({ error: String(error) });
    }
});

// 🆙 Atualizar perfil do prestador (envio de documentos)
router.post('/provider/verification', async (req: Request, res: Response) => {
    try {
        const { userId, documentsUrl, selfieUrl, certificateUrl } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID obrigatório' });
        }

        // Atualizar tabela ProviderProfile
        // Primeiro verificamos se o perfil existe, se não, criamos

        const { data: existingProfile } = await supabase
            .from('ProviderProfile')
            .select('id')
            .eq('userId', userId)
            .single();

        let result;

        if (existingProfile) {
            // Atualizar
            result = await supabase
                .from('ProviderProfile')
                .update({
                    documentsUrl,
                    selfieUrl,
                    certificateUrl,
                    verificationStatus: 'PENDING', // Muda para pendente ao enviar novos docs
                    updatedAt: new Date().toISOString()
                })
                .eq('userId', userId)
                .select();
        } else {
            // Criar novo perfil (caso não exista)
            // Nota: Normalmente criamos o perfil vazio no registro se o role for PROVIDER
            result = await supabase
                .from('ProviderProfile')
                .insert({
                    userId,
                    serviceName: 'Novo Prestador', // Placeholder
                    category: 'Geral',            // Placeholder
                    locationAreas: '[]',
                    documentsUrl,
                    selfieUrl,
                    certificateUrl,
                    verificationStatus: 'PENDING'
                })
                .select();
        }

        if (result.error) {
            throw result.error;
        }

        res.json({
            success: true,
            message: 'Documentos enviados para verificação',
            data: result.data
        });

    } catch (error) {
        console.error('Erro ao atualizar verificação:', error);
        res.status(500).json({ error: 'Erro ao processar verificação' });
    }
});

export default router;
