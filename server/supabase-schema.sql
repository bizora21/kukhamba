-- KuKhamba Database Schema for Supabase
-- Execute este SQL no Supabase SQL Editor

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    phone TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('CLIENT', 'PROVIDER')),
    location TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Perfil de Provedor
CREATE TABLE IF NOT EXISTS "ProviderProfile" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL UNIQUE REFERENCES "User"(id) ON DELETE CASCADE,
    "serviceName" TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    "locationAreas" TEXT NOT NULL,
    "profilePhoto" TEXT,
    portfolio TEXT,
    "contactInfo" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Solicitações de Serviço
CREATE TABLE IF NOT EXISTS "ServiceRequest" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "clientId" UUID NOT NULL REFERENCES "User"(id),
    "providerId" UUID NOT NULL REFERENCES "User"(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    "estimatedBudget" DOUBLE PRECISION,
    "serviceLocation" TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'REQUESTED' CHECK (status IN ('REQUESTED', 'NEGOTIATING', 'IN_PROGRESS', 'AWAITING_PAYMENT_CONFIRMATION', 'AWAITING_RECEIPT_CONFIRMATION', 'COMPLETED', 'CANCELLED')),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Mensagens
CREATE TABLE IF NOT EXISTS "Message" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "serviceRequestId" UUID NOT NULL REFERENCES "ServiceRequest"(id) ON DELETE CASCADE,
    "senderId" UUID NOT NULL REFERENCES "User"(id),
    "receiverId" UUID NOT NULL REFERENCES "User"(id),
    content TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Avaliações
CREATE TABLE IF NOT EXISTS "Review" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "serviceRequestId" UUID NOT NULL REFERENCES "ServiceRequest"(id) ON DELETE CASCADE,
    "clientId" UUID NOT NULL REFERENCES "User"(id),
    "providerId" UUID NOT NULL REFERENCES "User"(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_user_email ON "User"(email);
CREATE INDEX IF NOT EXISTS idx_user_role ON "User"(role);
CREATE INDEX IF NOT EXISTS idx_provider_profile_user ON "ProviderProfile"("userId");
CREATE INDEX IF NOT EXISTS idx_service_request_client ON "ServiceRequest"("clientId");
CREATE INDEX IF NOT EXISTS idx_service_request_provider ON "ServiceRequest"("providerId");
CREATE INDEX IF NOT EXISTS idx_service_request_status ON "ServiceRequest"(status);
CREATE INDEX IF NOT EXISTS idx_message_service_request ON "Message"("serviceRequestId");
CREATE INDEX IF NOT EXISTS idx_message_sender ON "Message"("senderId");
CREATE INDEX IF NOT EXISTS idx_message_receiver ON "Message"("receiverId");
CREATE INDEX IF NOT EXISTS idx_review_service_request ON "Review"("serviceRequestId");
CREATE INDEX IF NOT EXISTS idx_review_provider ON "Review"("providerId");

-- Trigger para atualizar updatedAt automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger nas tabelas relevantes
CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "User"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_provider_profile_updated_at BEFORE UPDATE ON "ProviderProfile"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_request_updated_at BEFORE UPDATE ON "ServiceRequest"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProviderProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ServiceRequest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Message" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Review" ENABLE ROW LEVEL SECURITY;

-- Políticas RLS básicas (ajuste conforme necessário)
-- Permitir que service_role tenha acesso total
CREATE POLICY "Service role has full access to User" ON "User"
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to ProviderProfile" ON "ProviderProfile"
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to ServiceRequest" ON "ServiceRequest"
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to Message" ON "Message"
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to Review" ON "Review"
    FOR ALL USING (auth.role() = 'service_role');

-- Comentários nas tabelas
COMMENT ON TABLE "User" IS 'Tabela de usuários do sistema (clientes e provedores)';
COMMENT ON TABLE "ProviderProfile" IS 'Perfil adicional para usuários que são provedores de serviços';
COMMENT ON TABLE "ServiceRequest" IS 'Solicitações de serviço entre clientes e provedores';
COMMENT ON TABLE "Message" IS 'Mensagens trocadas entre usuários em uma solicitação de serviço';
COMMENT ON TABLE "Review" IS 'Avaliações de serviços prestados';
