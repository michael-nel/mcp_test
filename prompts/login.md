Use as instruções do repositório e implemente autenticação da Pottencial neste projeto, consultando primeiro o MCP `pottencial-docs`.

## Etapa obrigatória (antes de codar)
1. Consulte o MCP `pottencial-docs` para identificar:
   - fluxo de autenticação da Pottencial
   - diferenças entre ambiente de homologação e produção
   - endpoint de token por ambiente
   - método HTTP
   - headers obrigatórios
   - content-type
   - payload exato (client_id, client_secret, grant_type etc.)
   - estrutura da resposta (access_token, expires_in, token_type)
2. Implementar exatamente conforme documentação, sem suposições.

## Objetivo funcional
Adicionar fluxo de autenticação com escolha de ambiente:
- No menu, manter padrão visual atual e incluir ação de **Login/Logout**.
- Quando deslogado: exibir botão **Login**.
- No login, permitir informar:
  - `clientId`
  - `clientSecret`
  - `ambiente` (opções: `homologacao` ou `producao`)
- Após enviar, backend busca token no ambiente selecionado.
- Salvar em escopo global da aplicação (backend, em memória):
  - ambiente selecionado
  - token
  - metadados relevantes (ex.: token_type, expires_in, timestamp)
- Após login com sucesso:
  - menu troca para **Logout** (mantendo padrão dos menus)
  - exibir toast: **"Logado com sucesso"**
- No logout:
  - limpar token + ambiente + estado global de autenticação
  - menu volta para **Login**
  - exibir toast: **"Logout realizado com sucesso"**

## Regras técnicas
1. Manter stack atual: Node.js + Express + TypeScript + EJS.
2. Não usar banco de dados.
3. Não usar framework frontend.
4. Não adicionar libs fora da allowlist (preferir fetch nativo; usar axios apenas se já existir).
5. Manter padrão MVC já adotado.
6. Manter padrão visual e estrutura dos menus existentes (sem redesign completo).

## Implementação esperada (MVC)
- `src/models/auth.model.ts`
  - tipos de ambiente (`homologacao | producao`)
  - tipos de request/response do token
  - tipo para estado global de autenticação
- `src/services/auth.service.ts`
  - resolver configuração por ambiente
  - autenticar no endpoint correto
  - armazenar estado global (token + ambiente)
  - limpar estado no logout
  - função `getAuthContext()` para reuso em outras integrações
- `src/controllers/auth.controller.ts`
  - `login`
  - `logout`
  - `getAuthStatus`
- `src/routes/auth.routes.ts`
  - `POST /auth/login`
  - `POST /auth/logout`
  - `GET /auth/status`
- Ajustar rotas e views para menu dinâmico Login/Logout sem quebrar padrão atual
- `public/js/main.js` (se necessário)
  - submissão do login
  - renderização de toast
  - atualização de estado do menu no frontend

## Segurança mínima (POC)
- Não expor token no HTML.
- Não logar `clientSecret`.
- Armazenar token somente no backend (memória do processo).
- Erros técnicos detalhados apenas no backend; frontend com mensagem amigável.

## Critérios de aceite
1. App inicia com menu no padrão atual mostrando **Login**.
2. Login permite escolher `homologacao` ou `producao`.
3. Backend autentica no endpoint correto conforme ambiente selecionado.
4. Token e ambiente ficam disponíveis em escopo global backend para integrações futuras.
5. Após login, menu muda para **Logout** mantendo padrão dos menus.
6. Toast "Logado com sucesso" após autenticação.
7. Logout limpa estado global e retorna para **Login**.
8. Toast "Logout realizado com sucesso" após logout.
9. `GET /health` continua funcionando.
10. `npm run build` e `npm run dev` executam sem erro.

## Entrega
- Listar arquivos criados/alterados.
- Mostrar conteúdo completo dos principais arquivos alterados.
- Explicar onde o estado global (token + ambiente) foi armazenado e como outras integrações devem consumir esse contexto.
- Incluir passo a passo de teste manual para os dois ambientes.