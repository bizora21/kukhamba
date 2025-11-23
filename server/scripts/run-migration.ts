import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Variáveis de ambiente do Supabase não encontradas.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
    const sqlPath = path.resolve(__dirname, '../../update-schema-jobs.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('🚀 Iniciando migração...');

    // Infelizmente, a biblioteca JS do Supabase não executa SQL raw diretamente via cliente padrão
    // a menos que usemos uma função RPC (Stored Procedure) ou a API de gerenciamento (que não temos aqui).
    // MAS, como estamos usando o Postgres diretamente via conexão, poderíamos usar 'pg'.
    // Porém, para simplificar e evitar novas dependências, vou tentar usar uma função RPC se existir,
    // ou instruir o usuário.

    // ESPERA! O Supabase JS Client não roda SQL arbitrário por segurança.
    // A melhor forma aqui é pedir ao usuário para rodar no dashboard OU usar a conexão direta do Prisma se estiver configurada.
    // O Prisma está configurado com SQLite localmente no schema.prisma atual, mas o projeto usa Supabase.

    console.log('⚠️  ATENÇÃO: O cliente JS do Supabase não permite execução direta de SQL raw por segurança.');
    console.log('⚠️  Por favor, copie o conteúdo de "server/update-schema-jobs.sql" e execute no SQL Editor do seu projeto Supabase.');
}

runMigration();
