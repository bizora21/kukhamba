import express, { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

const router = express.Router();

// Listar usuários (apenas para debug)
router.get('/users', async (req: Request, res: Response) => {
    try {
        const { data: users, error } = await supabase
            .from('User')
            .select('id, email, fullName, role, createdAt')
            .order('createdAt', { ascending: false });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({
            count: users?.length || 0,
            users
        });
    } catch (error) {
        res.status(500).json({ error: String(error) });
    }
});

export default router;
