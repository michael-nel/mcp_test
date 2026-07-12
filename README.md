# MCP Test — POC Pottencial

Projeto de prova de conceito para integração com as APIs da **Pottencial Seguradora**, usando o servidor MCP `pottencial-docs` como fonte de documentação técnica para o GitHub Copilot.

**Stack:** Node.js · Express · TypeScript · EJS · sem banco de dados

---

## Instalação

```bash
npm install
```

---

## Servidor MCP — pottencial-docs

O GitHub Copilot usa o servidor MCP para consultar a documentação oficial das APIs Pottencial durante o desenvolvimento.

A configuração já está inclusa em `.vscode/mcp.json`:

```json
{
  "servers": {
    "pottencial-docs": {
      "type": "http",
      "url": "https://mcp-docs.turtletech.com.br/mcp"
    }
  }
}
```

### Iniciando o servidor MCP no VS Code

1. Abra o projeto no VS Code.
2. Paleta de comandos: `Cmd+Shift+P` → **MCP: List Servers**.
3. Localize `pottencial-docs` e clique em **Start**.
4. Status deve aparecer como **running**.

O Copilot consultará automaticamente a documentação ao gerar código de integração com a Pottencial.

---

## Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:3000`

O `nodemon` observa `src/` e `views/`. A cada alteração, recompila o TypeScript e reinicia o servidor automaticamente.

---

## Build de produção

```bash
npm run build   # compila TypeScript → dist/
npm start       # executa dist/server.js
```

---

## Rotas disponíveis

| Rota            | Descrição     |
| --------------- | --------------- |
| `GET /`       | Página inicial |
| `GET /health` | Healthcheck     |
