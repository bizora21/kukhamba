# 📦 Instalação de Dependências - KuKhamba

## ⚠️ Importante: Execute estes comandos manualmente

### Backend (Server)

Abra o terminal no diretório `server` e execute:

```bash
npm install bcryptjs jsonwebtoken cookie-parser
npm install --save-dev @types/bcryptjs @types/jsonwebtoken @types/cookie-parser
```

### Frontend (Client)

Abra o terminal no diretório `client` e execute:

```bash
npm install js-cookie
npm install --save-dev @types/js-cookie
```

## 🔧 Alternativa: Habilitar Scripts no PowerShell

Se preferir, você pode habilitar a execução de scripts no PowerShell (como administrador):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Depois execute os comandos npm normalmente.
