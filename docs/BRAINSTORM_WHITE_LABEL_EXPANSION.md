# Brainstorm: Expansão White Label, Admin Dashboard e Geração de Cursos via Edital

## Contexto
Após o MVP da Petrobras Quest, a evolução natural é transformar a aplicação em uma plataforma **White Label** (Multi-tenant). Isso exige:
1. **Gestão Operacional:** Um Dashboard Administrativo para gerenciar usuários, pagamentos, tickets de suporte e turmas.
2. **Escala de Conteúdo Autônoma:** Uma inteligência artificial capaz de ler um **Edital de Concurso** recém-lançado e gerar, de forma independente, a estrutura do curso (aulas com a metodologia SCORE e banco de simulados).

O desafio central é parametrizar o formato de aula atual (componentes React interativos) para que a IA consiga criá-los dinamicamente a partir do preenchimento de um formulário no Admin.

---

## Option A: Pipeline de Geração de Código Híbrido (AI Scaffolding Workflow)
O administrador faz o upload do Edital no Dashboard. Um serviço de backend extrai os tópicos e a IA gera novos arquivos `.tsx` fisicamente na base de código, baseando-se no nosso template SCORE. Isso é enviado para uma *branch* nova no GitHub para aprovação e deploy.

✅ **Pros:**
- Mantém a arquitetura atual sem exigir grandes refatorações.
- Máxima flexibilidade visual (como as aulas são arquivos, pode-se inserir componentes customizados se necessário).

❌ **Cons:**
- Escala lenta: requer deploy e aprovação de PR (código) para cada novo edital ou curso.
- Administradores sem perfil técnico não conseguirão corrigir um texto na aula diretamente pelo painel Admin, dependendo sempre do código.

📊 **Esforço:** Alto

---

## Option B: Content-Driven Architecture (CMS + JSON Schema)
Deixamos de criar componentes React (`.tsx`) fixos para cada aula. Em vez disso, criamos um **Único Componente Motor de Aula** (ex: `ScoreLessonRenderer.tsx`). Ao enviar o Edital, a IA extrai os dados e preenche um banco de dados (Headless CMS) com um JSON estruturado no padrão SCORE (S, C, O, R, E). O Dashboard Admin gerencia tudo via formulários.

✅ **Pros:**
- Totalmente dinâmico: um novo concurso pode ser lançado instantaneamente sem gerar novos deploys.
- O Dashboard Admin fica autossuficiente: gestão de usuários, tickets e edição visual de aulas no mesmo lugar.
- Perfeitamente alinhado com um modelo 100% White Label (o JSON e o banco definem o tenant, logo, cores, etc).

❌ **Cons:**
- *Originalmente:* Exigiria refatoração das aulas atuais (`.tsx`) para JSON. **Solução (Estratégia Híbrida):** As aulas antigas permanecerão intactas em `.tsx` (legado blindado), e apenas os novos cursos usarão o JSON, eliminando o risco de retrabalho.

📊 **Esforço:** Médio (Inicial), Muito Baixo (Escala no longo prazo)

---

## Option C: Micro-Plataformas Serverless (Tenant-per-Database)
Cada edital novo provisiona uma infraestrutura backend totalmente isolada (novo projeto Supabase/Firebase). O código frontend é unificado, direcionando a conexão conforme a URL do concurso (`banco-do-brasil.passeinoconcurso.com`). O Master Admin enxerga todos.

✅ **Pros:**
- Isolamento total de dados e segurança reforçada entre os cursos.
- Facilita a modelagem comercial B2B (venda de instâncias da plataforma para outros cursinhos).

❌ **Cons:**
- Complexidade DevOps extrema e alto custo de infraestrutura (manter esquemas sincronizados em vários bancos).

📊 **Esforço:** Muito Alto

---

## 💡 Recomendação Final
**Option B (Content-Driven Architecture)** é a rota recomendada para escalar plataformas EdTech White Label.

Manter a produção de arquivos `.tsx` para cada nova aula em novos editais cria um gargalo técnico que inviabiliza a velocidade do negócio. Ao centralizar o formato das aulas em um **JSON Schema Baseado no SCORE** – e construir um renderizador universal no frontend –, conquistamos flexibilidade para lançar qualquer concurso em minutos através do Admin Dashboard.

### Próximos Passos para Implementação
1. **Modelagem de Dados e Admin:** Estruturar as tabelas do Admin Dashboard (Users, Tickets, Cursos/Concursos).
2. **Gerador Inteligente (Edital -> JSON):** Criar a API/Action que consome o Gemini lendo o Edital e retornando a estrutura do curso e aulas.
3. **Motor de Renderização (ScoreLessonRenderer):** Criar o componente universal que traduzirá o JSON devolvido pela IA na UI espetacular existente.
