Use as instruções do repositório e implemente a funcionalidade **Extrato Financeiro** integrando com a API **Financial**, seguindo o padrão atual do projeto (Node.js + Express + TypeScript + EJS + MVC).

## Etapa obrigatória (antes de codar)
1. Consultar o MCP `pottencial-docs` para a API Financial e identificar:
   - endpoint(s) de extrato financeiro
   - método HTTP
   - headers obrigatórios
   - parâmetros disponíveis (todos)
   - obrigatoriedade de cada parâmetro
   - formato de datas aceito pela API
   - contrato de resposta e de erro
2. Implementar exatamente conforme documentação, sem suposições.

## Objetivo funcional
Adicionar no menu principal a opção **Extrato** e criar nova tela para consulta de extrato financeiro com suporte a **todos os parâmetros da integração**, por exemplo:
- data início
- data fim
- tipo
- e demais filtros/parâmetros disponíveis na documentação

## Regra obrigatória de execução da consulta
1. A chamada da API de extrato deve ocorrer **somente** quando o usuário clicar no botão **Consultar**.
2. **Não executar consulta automática** ao abrir a tela.
3. **Não executar consulta automática** ao alterar campos/filtros.
4. Botão **Limpar filtros** apenas limpa os campos, sem disparar consulta.

## Regras obrigatórias de data (filtros)
1. Os campos de data do formulário devem aceitar **somente data (dia/mês/ano)**, sem hora.
2. No backend, os parâmetros de data enviados para a API devem ir **sem hora**.
3. Não enviar `HH:mm:ss`, timezone ou datetime nos filtros de data.
4. Usar o formato de **data simples** exigido na documentação da API (ex.: `yyyy-MM-dd`, se aplicável).

## Regras de autenticação e ambiente
1. A integração deve usar o **token global** e o **ambiente global** (`homologacao`/`producao`) já definidos no login.
2. Se usuário não estiver autenticado:
   - menu Extrato deve ficar desabilitado (ou oculto, conforme padrão existente)
   - bloquear acesso direto à rota de extrato
3. Não expor token no frontend.

## Regras de tela (UI/UX)
1. Criar página `Extrato` com:
   - formulário de filtros completo (todos os parâmetros suportados)
   - botão **Consultar**
   - botão **Limpar filtros**
2. Exibir loading **"Carregando..."** durante a consulta.
3. Exibir resultados em tabela/lista com labels em **português (Brasil)**.
4. Formatar datas exibidas em **pt-BR**.
5. Campos vazios/nulos devem aparecer como `Não informado`.
6. Em erro, exibir toast:
   - `Erro <statusCode>: <mensagem da API>`

## Regras de parâmetros
1. Implementar suporte real a **todos os parâmetros documentados** da API de extrato.
2. Não enviar parâmetros inexistentes, deprecated ou não documentados.
3. Enviar apenas parâmetros preenchidos pelo usuário (exceto os obrigatórios da API).
4. Para filtros de data, enviar **somente data (sem hora)**.

## Implementação esperada (MVC)
### Models / Types
- `src/models/financial-statement.model.ts`
  - tipos de filtros
  - tipos da resposta do extrato
  - tipo de erro da API

### Service
- `src/services/financial-statement.service.ts`
  - montar chamada para API Financial
  - usar token + ambiente do escopo global
  - serializar parâmetros corretamente
  - garantir datas dos filtros sem hora
  - normalizar erros (status + mensagem)

### Controller
- `src/controllers/financial-statement.controller.ts`
  - render da página de extrato (sem disparar consulta)
  - ação de consulta com leitura de query/form (executada só via botão Consultar)
  - tratamento de sucesso/erro para view

### Routes
- `src/routes/financial-statement.routes.ts`
  - `GET /extrato` (render tela sem consulta automática)
  - `POST /extrato/consultar` (consulta apenas quando usuário clicar em Consultar)
- proteger rotas para exigir autenticação global
- registrar no roteador principal

### Views
- `src/views/financial-statement/index.ejs`
  - formulário completo com todos os filtros da API
  - campos de data sem hora (input date)
  - seção de resultados (inicialmente vazia)
  - loading
  - toast de erro/sucesso
- atualizar menu/layout compartilhado com item **Extrato**

## Boas práticas
1. Manter padrão visual e estrutural já existente no projeto.
2. Não adicionar bibliotecas desnecessárias.
3. Não alterar regras de negócio fora do escopo.
4. Logs técnicos no backend; mensagens amigáveis no frontend.

## Critérios de aceite
1. Item **Extrato** aparece no menu seguindo padrão atual.
2. Usuário deslogado não acessa extrato.
3. Tela permite informar todos os parâmetros da integração.
4. Filtros de data funcionam com **apenas data, sem hora**.
5. **Nenhuma consulta é executada automaticamente ao abrir a página.**
6. **Consulta só ocorre ao clicar em "Consultar".**
7. Loading aparece durante requisição.
8. Resultado é exibido corretamente com campos em pt-BR.
9. Erros mostram toast com status code + mensagem da API.
10. `npm run build` e `npm run dev` executam sem erro.

## Entrega
- Lista de arquivos criados/alterados.
- Conteúdo dos principais arquivos (route, controller, service, view).
- Tabela mapeando: parâmetro da API -> campo no formulário.
- Exemplo de chamada real montada pelo service (com datas sem hora).
- Passo a passo de teste manual (incluindo validação de que não há autoexecução).