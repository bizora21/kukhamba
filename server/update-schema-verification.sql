-- Atualização da tabela ProviderProfile para suportar verificação
-- Execute este script no Supabase SQL Editor

-- Adicionar colunas de verificação
ALTER TABLE "ProviderProfile" 
ADD COLUMN IF NOT EXISTS "verificationStatus" TEXT DEFAULT 'NOT_STARTED' CHECK ("verificationStatus" IN ('PENDING', 'VERIFIED', 'REJECTED', 'NOT_STARTED')),
ADD COLUMN IF NOT EXISTS "documentsUrl" TEXT, -- Pode armazenar JSON string com várias URLs
ADD COLUMN IF NOT EXISTS "selfieUrl" TEXT,
ADD COLUMN IF NOT EXISTS "certificateUrl" TEXT;

-- Criar índice para buscar prestadores verificados rapidamente
CREATE INDEX IF NOT EXISTS idx_provider_verification ON "ProviderProfile"("verificationStatus");

-- Comentário para documentação
COMMENT ON COLUMN "ProviderProfile"."verificationStatus" IS 'Status da verificação de documentos do prestador';
