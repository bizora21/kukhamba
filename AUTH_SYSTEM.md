# 🔐 Sistema de Autenticação - KuKhamba

Sistema completo de autenticação implementado com JWT, bcrypt e React Context.

## ✅ O que foi implementado

### Backend (Express + Prisma)

1. **Rotas de Autenticação** (`/api/auth`)
   - `POST /api/auth/register` - Criar nova conta
   - `POST /api/auth/login` - Fazer login
   - `GET /api/auth/me` - Obter perfil do usuário autenticado
   - `PUT /api/auth/profile` - Atualizar perfil
   - `PUT /api/auth/change-password` - Alterar senha

2. **Middleware de Autenticação**
   - `authenticateToken` - Protege rotas que requerem autenticação
   - `optionalAuth` - Autenticação opcional para rotas públicas

3. **Segurança**
   - Senhas com hash bcrypt (10 rounds)
   - Tokens JWT com expiração de 7 dias
   - Validação de dados de entrada
   - Proteção contra SQL injection (via Prisma)

### Frontend (Next.js + React)

1. **Context de Autenticação** (`AuthContext`)
   - Estado global de autenticação
   - Funções: `login()`, `register()`, `logout()`
   - Persistência de token (localStorage + cookies)
   - Auto-carregamento do usuário ao iniciar

2. **Páginas**
   - `/login` - Página de login moderna
   - `/register` - Página de registro com seleção de tipo de conta
   - Design premium com gradientes e animações

## 📦 Instalação

### 1. Instalar Dependências

#### Backend (Server)
```bash
cd server
npm install bcryptjs jsonwebtoken cookie-parser
npm install --save-dev @types/bcryptjs @types/jsonwebtoken @types/cookie-parser
```

#### Frontend (Client)
```bash
cd client
npm install js-cookie
npm install --save-dev @types/js-cookie
```

### 2. Configurar Variáveis de Ambiente

#### Server (.env)
```env
PORT=3001
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DATABASE_URL="file:./dev.db"
```

#### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Gerar Prisma Client
```bash
cd server
npx prisma generate
```

## 🚀 Como Usar

### 1. Iniciar o Backend
```bash
cd server
npm run dev
```

O servidor estará rodando em `http://localhost:3001`

### 2. Iniciar o Frontend
```bash
cd client
npm run dev
```

O cliente estará rodando em `http://localhost:3000`

### 3. Testar o Sistema

1. Acesse `http://localhost:3000/register`
2. Crie uma conta (Cliente ou Prestador)
3. Você será automaticamente redirecionado para o dashboard
4. Teste o logout e login em `http://localhost:3000/login`

## 🔧 Uso no Código

### Proteger uma Página (Frontend)

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Carregando...</div>;
  if (!user) return null;

  return (
    <div>
      <h1>Bem-vindo, {user.fullName}!</h1>
      <p>Email: {user.email}</p>
      <p>Tipo: {user.role}</p>
    </div>
  );
}
```

### Proteger uma Rota (Backend)

```typescript
import { authenticateToken } from '../middleware/auth';

// Rota protegida
router.get('/protected', authenticateToken, async (req, res) => {
  // req.user contém os dados do usuário autenticado
  res.json({ 
    message: 'Você está autenticado!',
    user: req.user 
  });
});
```

### Fazer Requisições Autenticadas (Frontend)

```typescript
const { token } = useAuth();

const response = await fetch(`${API_URL}/api/protected`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## 🎨 Componentes Criados

### Páginas
- ✅ `/login` - Login com design moderno
- ✅ `/register` - Registro com seleção de tipo de conta

### Contextos
- ✅ `AuthContext` - Gerenciamento de estado de autenticação

### Middleware (Backend)
- ✅ `authenticateToken` - Autenticação obrigatória
- ✅ `optionalAuth` - Autenticação opcional

### Rotas (Backend)
- ✅ `/api/auth/*` - Todas as rotas de autenticação

## 🔒 Segurança

- ✅ Senhas nunca são retornadas nas respostas da API
- ✅ Tokens JWT com expiração configurável
- ✅ Hash de senhas com bcrypt (10 rounds)
- ✅ Validação de entrada em todas as rotas
- ✅ CORS configurado para aceitar apenas o cliente
- ✅ Proteção contra SQL injection (Prisma ORM)

## 📝 Próximos Passos

1. **Implementar "Esqueceu a Senha"**
   - Envio de email com token de recuperação
   - Página de reset de senha

2. **Adicionar OAuth**
   - Login com Google
   - Login com Facebook

3. **Melhorar Segurança**
   - Rate limiting nas rotas de autenticação
   - Refresh tokens
   - Blacklist de tokens

4. **Dashboard**
   - Criar página de dashboard para usuários autenticados
   - Perfil de usuário editável
   - Histórico de atividades

## 🐛 Troubleshooting

### Erro: "Cannot find module 'bcryptjs'"
**Solução**: Instale as dependências do backend
```bash
cd server
npm install bcryptjs jsonwebtoken cookie-parser
```

### Erro: "Cannot find module 'js-cookie'"
**Solução**: Instale as dependências do frontend
```bash
cd client
npm install js-cookie
```

### Erro: "Module '@prisma/client' has no exported member 'PrismaClient'"
**Solução**: Gere o Prisma Client
```bash
cd server
npx prisma generate
```

### Erro de CORS
**Solução**: Verifique se `CLIENT_URL` no `.env` do servidor está correto
```env
CLIENT_URL=http://localhost:3000
```

## 📚 Recursos

- [Documentação JWT](https://jwt.io/)
- [Documentação bcrypt](https://www.npmjs.com/package/bcryptjs)
- [Documentação Prisma](https://www.prisma.io/docs)
- [Documentação Next.js](https://nextjs.org/docs)
