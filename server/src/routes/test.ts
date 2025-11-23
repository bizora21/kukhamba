import express, { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

const router = express.Router();

// Teste de conexão com Supabase
router.get('/test-connection', async (req: Request, res: Response) => {
    try {
        // Tenta fazer uma query simples
        const { data, error } = await supabase
            .from('User')
            .select('count')
            .limit(1);

        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao conectar com Supabase',
                error: error.message
            });
        }

        res.json({
            success: true,
            message: 'Conexão com Supabase estabelecida com sucesso!',
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao testar conexão',
            error: String(error)
        });
    }
});

export default router;
