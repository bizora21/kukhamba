# Configuração Manual do GitHub

## Opção 1: Via Navegador (Upload Manual)
Se você prefere não usar comandos, pode fazer o upload direto pelo site.

### 1. Criar o Repositório
1.  Acesse [github.com/new](https://github.com/new).
3.  Clique em **Create repository**.
2.  Dê um nome ao repositório (ex: `kukhamba`).

### 2. Enviar os Arquivos
1.  Na tela do repositório criado, procure o link **"uploading an existing file"**.
2.  Abra a pasta do seu projeto no seu computador.
3.  **Arraste e solte** os arquivos e pastas para a área de upload no navegador.
    *   **ATENÇÃO**: O GitHub via navegador pode ter limite de quantidade de arquivos por vez. Tente enviar pastas separadas se der erro.
    *   **NÃO ENVIE**: A pasta `node_modules` (é muito pesada e desnecessária) e o arquivo `.env` (tem senhas).
4.  No campo "Commit changes", escreva "Upload inicial".
5.  Clique em **Commit changes**.

### 3. Atualizações Futuras
Para atualizar, você terá que repetir o processo de upload substituindo os arquivos antigos. Isso não é o ideal para projetos grandes, mas funciona para backups simples.

---

## Opção 2: Via Linha de Comando (Recomendado)
Se mudar de ideia e quiser usar o terminal (é mais rápido para atualizações):

### 1. Instalar o Git
... (resto do conteúdo anterior)
Se você ainda não tem o Git instalado:
1.  Baixe o instalador para Windows: [git-scm.com/download/win](https://git-scm.com/download/win)
2.  Instale (pode usar as opções padrão).
3.  **Importante**: Após instalar, feche e abra novamente o seu terminal (VS Code ou PowerShell) para que o comando funcione.

## 2. Preparar os Arquivos
Certifique-se de que você está na pasta raiz do projeto (`novo`).

Vamos criar um arquivo `.gitignore` na raiz para evitar enviar arquivos desnecessários.
(Eu já vou criar este arquivo para você no próximo passo).

## 3. Inicializar e Enviar para o GitHub

Abra o terminal na pasta do projeto e execute os comandos abaixo um por um:

```bash
# 1. Inicializar o repositório
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Fazer o primeiro commit
git commit -m "Initial commit: KuKhamba MVP"

# 4. Renomear a branch principal para 'main' (padrão atual)
git branch -M main

# 5. Adicionar o repositório remoto (Substitua URL_DO_SEU_REPO pelo link do seu GitHub)
# Exemplo: git remote add origin https://github.com/seu-usuario/kukhamba.git
git remote add origin URL_DO_SEU_REPO

# 6. Enviar os arquivos
git push -u origin main
```

## 4. Como fazer Commits Futuros

Sempre que você fizer alterações e quiser salvar no GitHub:

```bash
# 1. Ver o que mudou (opcional)
git status

# 2. Adicionar as mudanças
git add .

# 3. Salvar com uma mensagem explicando o que fez
git commit -m "Descreva aqui o que você mudou"

# 4. Enviar para o GitHub
git push
```

## Dicas
- **Erros de Login**: Se pedir senha, use seu Token de Acesso Pessoal (PAT) do GitHub se a senha normal não funcionar, ou configure a autenticação via navegador se o Git solicitar.
- **Ignorar Arquivos**: Nunca envie pastas `node_modules` ou arquivos `.env` com senhas. O arquivo `.gitignore` previne isso.
