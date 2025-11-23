# 🚀 Guia Rápido - Sistema de Autenticação KuKhamba

## ⚡ Início Rápido (5 minutos)

### 1️⃣ Instalar Dependências

Abra **dois terminais** (um para server, outro para client):

#### Terminal 1 - Backend
```bash
cd server
npm install bcryptjs jsonwebtoken cookie-parser
npm install --save-dev @types/bcryptjs @types/jsonwebtoken @types/cookie-parser
npx prisma generate
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd client
npm install js-cookie
npm install --save-dev @types/js-cookie
npm run dev
```

### 2️⃣ Configurar Variáveis de Ambiente

#### Server: Criar arquivo `server/.env`
```env
PORT=3001
CLIENT_URL=http://localhost:3000
JWT_SECRET=meu-super-secret-key-123
DATABASE_URL="file:./dev.db"
```

#### Client: Criar arquivo `client/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3️⃣ Testar

1. Abra http://localhost:3000/register
2. Crie uma conta
3. Faça login em http://localhost:3000/login

## ✅ Checklist

- [ ] Dependências do backend instaladas
- [ ] Dependências do frontend instaladas
- [ ] Prisma Client gerado (`npx prisma generate`)
- [ ] Arquivo `.env` criado no server
- [ ] Arquivo `.env.local` criado no client
- [ ] Backend rodando (porta 3001)
- [ ] Frontend rodando (porta 3000)

## 🎯 Endpoints da API

- `POST /api/auth/register` - Criar conta
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Perfil (requer autenticação)
- `PUT /api/auth/profile` - Atualizar perfil (requer autenticação)
- `PUT /api/auth/change-password` - Mudar senha (requer autenticação)

## 📖 Documentação Completa

Veja `AUTH_SYSTEM.md` para documentação detalhada.
