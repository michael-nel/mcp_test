# Copilot Instructions — Projeto Base Node.js (Backend + EJS)

## Objetivo

Gerar um projeto base **simples, mínimo e funcional** em Node.js com:

- Backend: Express + TypeScript
- Frontend: EJS
- Sem banco de dados
- Sem integração MCP nesta fase (apenas estrutura pronta para futura integração)

## Escopo desta fase

Implementar somente:

- configuração inicial do projeto
- servidor Express
- renderização EJS
- rota de healthcheck
- rota principal com página simples

## Regras obrigatórias

1. Código curto, claro e tipado.
2. Não usar banco de dados, ORM ou persistência.
3. Não usar frameworks frontend (React/Vue/Angular).
4. Não adicionar autenticação, testes, Swagger ou validação avançada.
5. Não adicionar bibliotecas fora da lista permitida sem necessidade explícita.
6. Evitar refatorações grandes; manter estrutura simples.

## Bibliotecas permitidas

- express
- ejs
- typescript
- @types/node
- @types/express
- nodemon

## Bibliotecas proibidas nesta fase

- prisma, mongoose, sequelize, typeorm, pg, mysql2, mongodb
- react, vue, angular, svelte
- zod, joi, yup
- passport, jsonwebtoken
- swagger / openapi
- jest, mocha, vitest, cypress, playwright
- winston, morgan
- dotenv (não usar nesta fase base)

## Estrutura esperada

- package.json
- tsconfig.json
- src/index.ts
- views/index.ejs
- public/ (somente se necessário)

## Padrões de implementação

- ES Modules (`"type": "module"`)
- TypeScript strict
- Rotas mínimas:
  - GET `/health` -> `{ "ok": true }`
  - GET `/` -> render `index.ejs`
- Respostas JSON curtas e padronizadas no backend.

## Estilo de resposta do Copilot

- Priorizar resultado final direto.
- Evitar texto longo e sugestões extras.
- Não sugerir ferramentas fora do escopo.
- Foco em economia de tokens.
