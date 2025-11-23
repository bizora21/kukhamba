import { Router } from 'express';
import { supabase } from '../lib/supabase';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Listar jobs públicos (Concursos)
router.get('/', async (req, res) => {
    try {
        const { category, location } = req.query;

        let query = supabase
            .from('ServiceRequest')
            .select(`
                *,
                client:User!clientId (fullName, location)
            `)
            .eq('type', 'PUBLIC')
            .eq('status', 'REQUESTED') // Apenas jobs abertos
            .order('createdAt', { ascending: false });

        if (category) {
            query = query.eq('category', category);
        }

        if (location) {
            query = query.ilike('serviceLocation', `%${location}%`);
        }

        const { data: jobs, error } = await query;

        if (error) throw error;

        res.json(jobs);
    } catch (error: any) {
        console.error('Erro ao listar jobs:', error);
        res.status(500).json({ error: 'Erro ao buscar oportunidades.' });
    }
});

// Detalhes do job
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const { data: job, error } = await supabase
            .from('ServiceRequest')
            .select(`
                *,
                client:User!clientId (fullName, location)
            `)
            .eq('id', id)
            .single();

        if (error) throw error;

        res.json(job);
    } catch (error: any) {
        console.error('Erro ao buscar job:', error);
        res.status(500).json({ error: 'Erro ao buscar detalhes da oportunidade.' });
    }
});

// Criar novo job (Apenas Clientes)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, description, estimatedBudget, serviceLocation, category } = req.body;
        const userId = (req as any).user.userId;

        // Verificar se o usuário é CLIENT
        const { data: user } = await supabase.from('User').select('role').eq('id', userId).single();

        if (user?.role !== 'CLIENT') {
            return res.status(403).json({ error: 'Apenas clientes podem publicar trabalhos.' });
        }

        const { data: job, error } = await supabase
            .from('ServiceRequest')
            .insert({
                clientId: userId,
                title,
                description,
                estimatedBudget,
                serviceLocation,
                category,
                type: 'PUBLIC',
                status: 'REQUESTED'
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(job);
    } catch (error: any) {
        console.error('Erro ao criar job:', error);
        res.status(500).json({ error: 'Erro ao publicar trabalho.' });
    }
});

// Candidatar-se a um job (Apenas Prestadores)
router.post('/:id/apply', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { price, message } = req.body;
        const userId = (req as any).user.userId;

        // Verificar se o usuário é PROVIDER
        const { data: user } = await supabase.from('User').select('role').eq('id', userId).single();

        if (user?.role !== 'PROVIDER') {
            return res.status(403).json({ error: 'Apenas prestadores podem se candidatar.' });
        }

        // Verificar se já se candidatou
        const { data: existing } = await supabase
            .from('JobApplication')
            .select('id')
            .eq('serviceRequestId', id)
            .eq('providerId', userId)
            .single();

        if (existing) {
            return res.status(400).json({ error: 'Você já se candidatou para este trabalho.' });
        }

        const { data: application, error } = await supabase
            .from('JobApplication')
            .insert({
                serviceRequestId: id,
                providerId: userId,
                price,
                message,
                status: 'PENDING'
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(application);
    } catch (error: any) {
        console.error('Erro ao candidatar-se:', error);
        res.status(500).json({ error: 'Erro ao enviar candidatura.' });
    }
});

export default router;
