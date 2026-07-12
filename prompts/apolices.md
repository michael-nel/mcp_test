Use as instruções do repositório e implemente a funcionalidade **Apólices** no padrão atual do projeto (Node.js + Express + TypeScript + EJS + MVC), reutilizando o contexto global de autenticação.

## Etapa obrigatória (antes de codar)
1. Consultar o MCP `pottencial-docs` sobre a API **Policy Management** para:
   - endpoint de listagem de apólices
   - endpoint de detalhe da apólice
   - método HTTP
   - headers obrigatórios (Authorization Bearer)
   - parâmetros, filtros e paginação
   - contrato de resposta e de erro
2. Implementar conforme documentação oficial, sem suposições.

## Objetivo funcional
Adicionar no menu principal a opção **Apólices**, com regra de acesso por autenticação:
- **Usuário deslogado**:
  - item **Apólices** deve aparecer desabilitado (ou oculto, conforme padrão atual do projeto)
  - não permitir acesso direto à rota de apólices
- **Usuário logado**:
  - item **Apólices** fica ativo
  - ao clicar, abrir tela de listagem com:
    - número da apólice
    - data de emissão
    - ação **Detalhes**
  - ao clicar em **Detalhes**, abrir tela com todos os dados da apólice

## Regra obrigatória de integração
Toda chamada da Policy Management deve usar:
1. **Token** do escopo global de autenticação setado pelo usuário no login
2. **Ambiente** do escopo global (`homologacao` ou `producao`) setado pelo usuário no login

- base URL deve ser resolvida pelo ambiente global atual
- Authorization deve usar o token global atual
- se não houver token/ambiente global válidos, bloquear acesso e redirecionar para login (ou mensagem amigável)

## Regra obrigatória de período (listagem)
Ao consultar listagem de apólices:
1. Definir período padrão:
   - `dataInicial` = **hoje - 30 dias**
   - `dataFinal` = **hoje**
2. Datas enviadas para API devem conter **somente dia (sem hora)**.
3. Exibir datas na interface em **pt-BR**.

## Regras obrigatórias de parâmetros (IMPORTANTE)
### Listagem
- **Não enviar** o parâmetro `includes`.
- Enviar apenas os parâmetros mínimos necessários da listagem (ex.: período/paginação), conforme documentação.

### Detalhe
- A chamada de detalhe deve enviar **apenas o identificador da apólice** (`id`).
- **Não enviar `includes` na rota de detalhe.**
- **Não enviar `includesAll` na rota de detalhe.**
- **Não enviar parâmetros extras** além do `id`, exceto se a documentação exigir explicitamente algum header/query obrigatório.

## Tratamento de erros (obrigatório)
Em qualquer erro retornado pela API de Policy Management:
1. Exibir **toast de erro** no frontend contendo:
   - **status code HTTP**
   - **mensagem de erro retornada pela API**
2. Exemplo:
   - `Erro 404: <mensagem da API>`
3. Logs técnicos detalhados apenas no backend.
4. Não expor dados sensíveis.

## Implementação esperada (MVC)
### Models / Types
- `src/models/policy.model.ts`
  - tipos de listagem e detalhe
  - tipo de erro da API

### Service
- `src/services/policy.service.ts`
  - `listPolicies(...)` (sem `includes`)
  - `getPolicyDetails(policyId)` (**somente id**)
  - usar `getAuthContext()` para token + ambiente global
  - montar baseURL conforme ambiente
  - Authorization Bearer
  - serialização de datas sem hora
  - normalização de erros (status + mensagem)

### Controller
- `src/controllers/policy.controller.ts`
  - `renderPoliciesList`
  - `renderPolicyDetails`
  - validar autenticação global
  - repassar erro para toast

### Routes
- `src/routes/policy.routes.ts`
  - `GET /apolices`
  - `GET /apolices/:id`
- detalhe deve encaminhar apenas `req.params.id` para o service

### Views
- `src/views/policies/index.ejs`
- `src/views/policies/details.ejs`
- menu com Apólices ativo apenas para logado
- toast de erro visível

## Critérios de aceite
1. Menu Apólices só ativo quando logado.
2. Listagem funciona com período de 30 dias e sem hora.
3. **Listagem não envia `includes`.**
4. **Detalhe envia somente `id` da apólice.**
5. **Detalhe não envia `includes` nem `includesAll`.**
6. Dados em português BR, datas em pt-BR.
7. Em erro, toast mostra status + mensagem da API.
8. `npm run build` e `npm run dev` sem erros.

## Entrega
- Lista de arquivos alterados.
- Conteúdo dos principais arquivos (routes, controller, service, views).
- Trecho explícito da chamada HTTP de detalhe provando que só envia `id`.
- Passo a passo de teste manual de listagem e detalhe.