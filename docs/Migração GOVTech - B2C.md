Contexto de Arquitetura: Migração de Content-as-Code para JSON Dinâmico (Foco B2C/GovTech)
Objetivo: Implementar um sistema de rotas híbrido, criar a validação estrita de layout com Zod, e salvar as aulas estruturadas no Supabase consumindo os componentes do `shared.tsx`.

Ações esperadas do Antigravity:

1. SCHEMA DE VALIDAÇÃO (Zod - src/shared/schemas/aula.schema.ts)
Implemente a validação estrita para garantir que nenhuma IA ou usuário quebre o layout polido atual:
- QuizQuestionSchema: Deve conter id (uuid), pergunta (string), exatamente 5 alternativas (Array de tamanho 5), respostaCorreta (regex de A a E) e explicacaoStepByStep (Array de strings).
- FlipCardSchema: Deve conter id, icon (string correspondente ao Lucide), frontTitle e backContent.
- AulaConteudoSchema: Deve validar o array de módulos. Cada módulo DEVE ter:
  * numero (int positivo)
  * titulo (string)
  * introducaoCEDEA: Array de strings com no mínimo 5 itens (forçando a metodologia C.E.D.E.A).
  * laboratorioTexto: string (opcional).
  * flipCards: Array de exatamente 6 FlipCards (para manter a simetria visual do layout).
  * quiz: Array com no mínimo 6 questões.

2. SCHEMA DO SUPABASE (SQL - Tabela: aulas)
Gere o script SQL para a tabela de banco de dados considerando o cenário GovTech (Multi-tenant):
- id: uuid (primary key)
- slug: text (unique) -> ex: 'interpretacao-texto'
- curso_id: uuid (foreign key)
- titulo: text
- materia_id: text
- metadata: jsonb -> { duracao: string, descricao: string, xp_ganho: number }
- conteudo: jsonb -> Onde salvaremos o payload validado pelo AulaConteudoSchema do Zod.
- tenant_id: uuid (nullable) -> Para isolamento de clientes governamentais no futuro.

3. ROTA DE API PARA CRIAÇÃO (Next.js App Router - src/app/api/aulas/create/route.ts)
Crie o handler POST que o Form Wizard vai consumir:
- Deve receber o payload do front-end.
- Deve passar os dados pelo `AulaConteudoSchema.parse()`.
- Se falhar, retornar Status 400 com os erros detalhados do Zod.
- Se passar, realizar o `INSERT` ou `UPSERT` na tabela `aulas` do Supabase.

4. COMPONENTE RENDERIZADOR DINÂMICO (src/app/dashboard/aulas/[id]/page.tsx)
Utilizando o motor `AulaPremiumDataEngine` exposto no `shared.tsx`:
- Crie um Server Component que busca a aula no Supabase pelo `slug` ou `id`.
- Faça o parse seguro dos dados vindos do banco usando o schema do Zod para garantir integridade em tempo de execução.
- Renderize a interface injetando o JSON diretamente nos componentes visuais do `shared.tsx`.
- Se a aula não existir, dispare a função `notFound()`.

5. SCRIPT AUTOMATIZADO DE EXTRAÇÃO (Scripts/extract-to-json.ts)
Escreva um script Node/TypeScript utilitário que consiga ler o arquivo estático atual `AulaInterpretacaoTexto.tsx`, extrair seus textos, arrays de flipcards e pools de quizzes antigos, e cuspi-los formatados exatamente no formato JSON aceito pelo novo schema do Zod, facilitando a nossa migração.