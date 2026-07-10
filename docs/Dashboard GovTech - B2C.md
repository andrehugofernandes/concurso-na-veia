Contexto de Arquitetura: Painel Admin Unificado (B2C & GovTech)
Objetivo: Criar a interface administrativa (`src/app/admin`) e as rotas de API para gerenciamento de usuários, controle de assinaturas Stripe, e o Wizard de criação de cursos integrado com a vitrine da Landing Page e isolamento de Tenants.

Ações esperadas do Antigravity:

1. AMPLIAÇÃO DO SCHEMA DO BANCO (SQL - Supabase)
Adicione/ajuste as seguintes tabelas para suportar o modelo híbrido:
- tabela `tenants`: 
  * id (uuid, pk), nome (text), cnpj (text), ativo (boolean). (Obs: Para usuários B2C, o tenant_id no sistema será NULL).
- tabela `profiles` (extensão do auth.users):
  * id (uuid, fk), email (text), role (enum: 'superadmin', 'tenant_id_admin', 'aluno'), tenant_id (uuid, nullable), stripe_customer_id (text, nullable), stripe_status (text, nullable -> 'active', 'canceled').
- tabela `cursos`:
  * id (uuid, pk), titulo (text), slug (text, unique), imagem_capa (text), materia_id (text), tenant_id (uuid, nullable).
  * is_public (boolean) -> Se TRUE, o curso vai para a vitrine pública B2C. Se FALSE, fica oculto.
  * preco (numeric, nullable), stripe_price_id (text, nullable) -> Apenas para cursos B2C.

2. MÓDULO 1: GERENCIAMENTO DE USUÁRIOS (src/app/admin/usuarios/page.tsx)
Crie uma interface de tabela rica com Shadcn/ui contendo:
- Filtros Globais: Aba 1: "Alunos B2C" (Filtra por tenant_id IS NULL) | Aba 2: "GovTech / Corporativo" (Select para filtrar por um Tenant específico).
- Indicadores Visuais: Para B2C, mostrar badge do status do Stripe (Verde se 'active', Vermelho se 'past_due' ou 'canceled'). Para GovTech, mostrar o nome do Órgão Público/Tenant correspondente e a Role interna dele.
- Ações: Botão para alterar cargo (Role) ou revogar acesso manualmente.

3. MÓDULO 2: WIZARD DE CURSOS E ACOPLAMENTO COM A VITRINE (src/app/admin/cursos/novo/page.tsx)
Implemente o formulário em etapas (Wizard) que decide o destino do curso:
- Passo 1 (Segmentação de Mercado):
  * Um Switch/Toggle: "Tipo de Distribuição". 
    -> Se selecionar "Venda Aberta (B2C)": Habilita o campo `stripe_price_id`, o input de `preco` e força `is_public = true`.
    -> Se selecionar "Contrato Governamental (GovTech)": Abre um dropdown listando os `tenants` cadastrados, vincula o `tenant_id` selecionado e força `is_public = false`.
- Passo 2 (Informações da Vitrine): 
  * Título, descrição comercial, upload da imagem de capa, tags de benefícios e badges de destaque (ex: "Focado na Cesgranrio", "Pós-Edital").
- Passo 3 (Estrutura de Aulas):
  * Interface para associar as aulas (IDs gerados do schema JSON que criamos anteriormente) à grade/cronograma deste curso.

4. ENDPOINTS DE CONSULTA PARA A VITRINE (src/app/api/vitrine/route.ts)
Crie a API pública que a sua Landing Page vai consumir para renderizar os cards de cursos:
- A query no Supabase deve ser estritamente: `SELECT * FROM cursos WHERE is_public = true AND tenant_id IS NULL`.
- Isso garante que nenhum curso customizado criado para uma prefeitura ou órgão público vaze acidentalmente na sua vitrine comercial B2C.

5. MIDDLEWARE DE PROTEÇÃO GOVTECH (src/middleware.ts)
Implemente a regra de segurança nas rotas de alunos:
- Se o aluno acessar `/dashboard/cursos/[slug]`, o sistema deve verificar se o curso possui um `tenant_id`.
- Caso possua, o sistema deve validar se o `tenant_id` do perfil do usuário logado bate exatamente com o do curso. Se não bater, barra o acesso (Proteção contra vazamento de dados entre prefeituras).