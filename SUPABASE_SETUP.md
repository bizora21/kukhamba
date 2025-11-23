# Configuração do Supabase para o KuKhamba

Este guia ajudará você a configurar o banco de dados Supabase (PostgreSQL) para o projeto.

## 1. Criar um Projeto no Supabase
1.  Acesse [supabase.com](https://supabase.com) e faça login.
2.  Clique em **"New Project"**.
3.  Escolha sua organização, dê um nome ao projeto (ex: `kukhamba`) e defina uma senha forte para o banco de dados (guarde-a!).
4.  Escolha a região mais próxima (ex: São Paulo).
5.  Clique em **"Create new project"**.

## 2. Obter a URL de Conexão (Connection String)
1.  No painel do seu projeto, vá em **Settings** (ícone de engrenagem na barra lateral esquerda).
2.  Clique em **Database**.
3.  Role até a seção **Connection parameters**.
4.  Desative a opção "Use connection pooling" (para Prisma, geralmente usamos a conexão direta ou o Session Pool, mas para começar, a conexão direta é mais simples. Se tiver problemas, podemos configurar o Pooler).
    *   *Nota:* O Prisma recomenda usar o **Transaction Pooler** (porta 6543) em produção, mas para dev, a conexão direta (porta 5432) funciona bem. Vamos usar a **URI** padrão.
5.  Clique em **URI** (não JDBC).
6.  Copie a string de conexão. Ela se parece com:
    `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

## 3. Configurar o Ambiente Local
1.  Abra o arquivo `server/.env` no seu editor.
2.  Localize a variável `DATABASE_URL`.
3.  Substitua o valor atual pela URL que você copiou.
4.  **Importante:** Substitua `[YOUR-PASSWORD]` pela senha que você criou no passo 1.

    Exemplo:
    ```env
    DATABASE_URL="postgresql://postgres:minhasenha123@db.xyz.supabase.co:5432/postgres"
    ```

## 4. Atualizar o Banco de Dados
Após configurar o `.env`, você precisa criar as tabelas no Supabase. Execute o seguinte comando no terminal (dentro da pasta `server`):

```bash
npx prisma migrate dev --name init_supabase
```

Isso criará todas as tabelas necessárias no seu novo banco de dados na nuvem.

## 5. Verificar
Reinicie o servidor backend:
```bash
npm run dev
```
Se tudo estiver correto, você verá a mensagem de que o servidor está rodando e conectado.
