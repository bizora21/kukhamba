-- Atualização para suportar Concursos (Job Posting)

-- 1. Alterar ServiceRequest para permitir providerId nulo e adicionar novos campos
ALTER TABLE "ServiceRequest" ALTER COLUMN "providerId" DROP NOT NULL;

ALTER TABLE "ServiceRequest" 
ADD COLUMN IF NOT EXISTS "type" TEXT DEFAULT 'DIRECT' CHECK ("type" IN ('DIRECT', 'PUBLIC')),
ADD COLUMN IF NOT EXISTS "category" TEXT;

-- 2. Criar tabela JobApplication
CREATE TABLE IF NOT EXISTS "JobApplication" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "serviceRequestId" UUID NOT NULL REFERENCES "ServiceRequest"(id) ON DELETE CASCADE,
    "providerId" UUID NOT NULL REFERENCES "User"(id),
    price DOUBLE PRECISION NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACCEPTED', 'REJECTED')),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_job_application_request ON "JobApplication"("serviceRequestId");
CREATE INDEX IF NOT EXISTS idx_job_application_provider ON "JobApplication"("providerId");

-- 4. Habilitar RLS na nova tabela
ALTER TABLE "JobApplication" ENABLE ROW LEVEL SECURITY;

-- 5. Políticas RLS para JobApplication

-- Service Role tem acesso total
CREATE POLICY "Service role full access JobApplication" ON "JobApplication"
    FOR ALL USING (auth.role() = 'service_role');

-- Prestadores podem ver suas próprias candidaturas
CREATE POLICY "Providers can view own applications" ON "JobApplication"
    FOR SELECT USING (auth.uid() = "providerId");

-- Prestadores podem criar candidaturas
CREATE POLICY "Providers can create applications" ON "JobApplication"
    FOR INSERT WITH CHECK (auth.uid() = "providerId");

-- Clientes podem ver candidaturas para seus pedidos
CREATE POLICY "Clients can view applications for their requests" ON "JobApplication"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "ServiceRequest"
            WHERE "ServiceRequest".id = "JobApplication"."serviceRequestId"
            AND "ServiceRequest"."clientId" = auth.uid()
        )
    );
