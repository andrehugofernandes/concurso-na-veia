# 🚀 PRD Completo — Plataforma Concurso Na Veia (concursonaveia.com.br)

> **Documento de Requisitos de Produto (PRD) Unificado & Arquitetural**  
> **Versão:** 2.5 (Produção 2026)  
> **Status:** Ativo / Em Expansão White-Label (Edital-to-Course)  
> **Domínio Principal:** [concursonaveia.com.br](https://concursonaveia.com.br)

---

## 1. Visão Geral do Produto

O **Concurso Na Veia** é uma plataforma EdTech gamificada de alta performance focada no aprendizado acelerado para concursos públicos no Brasil. A aplicação combina Inteligência Artificial generativa, métodos de repetição espaçada, micro-interações didáticas e simulados preditivos para maximizar a aprovação de candidatos.

### 1.1 Proposta de Valor (Value Proposition)
- **Estudo Gamificado & Ativo:** Em vez da leitura passiva de PDFs de 100 páginas, o estudante aprende resolvendo questões, interagindo com *FlipCards* didáticos e praticando no **NaVeiaLingo** (sistema estilo Duolingo para concursos).
- **IA Integrada ao Edital:** Assistente e geradores de questões alimentados pelas LLMs mais modernas (Anthropic Claude 3.5/3.7 e Gemini), decifrando as pegadinhas e o padrão de cobrança da banca **CESGRANRIO** (e futuras bancas como Cebraspe, FGV e IBFC).
- **Conteúdo Didático de Elite (Framework C.E.D.E.A)**: Aulas ricas e densas compostas por 10 módulos estruturados, com explicações práticas e consolidação multimídia (áudio/vídeo/sínteses visuais).
- **Arquitetura Dinâmica & Scalable**: Plataforma preparada para escalabilidade multi-concurso (Petrobras, Transpetro, Bancos, Carreiras Administrativas e Federais).

---

## 2. Público-Alvo & Personas

1. **Candidato Focado em Concursos de Elite (Ex: Petrobras / Transpetro)**:
   - Profissionais de nível técnico ou superior (Engenharias, Administração, TI, Operação).
   - Necessitam de otimização de tempo devido a rotinas de trabalho ou estudos paralelos.
2. **Concurseiro Iniciante / Intermediário**:
   - Busca orientação clara através de cronogramas automatizados e simulados rápidos para medir evolução.
3. **Assinante PRO (Early Adopters / Alunos Fundadores)**:
   - Estudantes engajados que buscam suporte 24/7 com Tutor IA, questões ilimitadas e planos de estudo adaptativos.

---

## 3. Stack Tecnológico & Arquitetura

```
               [ FRONTEND / FULLSTACK ]
               Next.js 15 (App Router) + React 19
               Tailwind CSS (Skins System) + Framer Motion + GSAP
                                  │
                                  ▼
      ┌───────────────────────────┼───────────────────────────┐
      │                           │                           │
[ AUTENTICAÇÃO & DB ]     [ INTELIGÊNCIA ARTIFICIAL ]   [ GATEWAYS PAGAMENTO ]
 Supabase Postgres DB       Anthropic API (Claude 3.5)   InfinitePay (Pix/Cartão)
 Supabase Auth & Storage    Google Gemini API            Efí (Pix Transparente)
 Prisma / Server Actions    Podcast & Audio Engine       Stripe (Assinaturas PRO)
```

### 3.1 Tecnologias Core:
- **Framework Web:** Next.js 15 (React 19, Server Components & Server Actions).
- **Estilização & Design:** Tailwind CSS com suporte total a temas/skins dinâmicos (`useTheme`, variáveis CSS `--primary`, `--primary-gradient`). *Restrição estrita da marca: "Purple Ban" (sem roxo genérico).*
- **Tipografia Oficial:**
  - **Títulos, Logos, Badges e Botões:** `Khand` (Fonte de alto impacto).
  - **Corpo de Texto & Leitura:** `Poppins` e `Inter`.
- **Banco de Dados & Autenticação:** Supabase (PostgreSQL, Auth com RLS, Storage para mídias).
- **Integração de IA:**
  - `Anthropic Claude 3.5 / 3.7`: Geração de simulados, resoluções comentadas passo a passo e diagnósticos de desempenho.
  - `Google Gemini API`: Geração de áudio-aulas, podcasts dinâmicos e sínteses didáticas.
- **Processamento de Pagamentos:** InfinitePay, Efí Pix e Stripe para gestão de checkout transparente e assinaturas.

---

## 4. Estrutura de Módulos & Funcionalidades da Plataforma

A plataforma é dividida em dois grandes ecossistemas: **Área do Aluno (B2C)** e **Painel Administrativo & CMS White-Label (B2B/Admin)**.

### 4.1 Área do Aluno (B2C)

#### A. Landing Page & Vitrines Dinâmicas (`/`, `/cursos/petrobras`, `/cursos/[slug]`)
- **Cabeçalho Fixo Flutuante**: `<StickyHeader alwaysVisible={true} />` integrado ao sistema de skins.
- **Hero Composição Centralizada**: Banner com gradientes radiais, apresentação do curso e estatísticas dinâmicas do sistema.
- **Seção de Resultados & Demonstração**: Showcase do NaVeiaLingo, comparativo de métodos de estudo e depoimentos de aprovados.
- **Rodapé Oficial & Botão de Rolagem**: `<HomeFooter />` e `<ScrollToTop />`.

#### B. Dashboard do Aluno (`/dashboard`)
- Central de controle com indicador de progresso do edital, tarefas do dia, métricas de desempenho e acesso rápido a simulados.

#### C. NaVeiaLingo (`/NaVeiaLingo`)
- Módulo gamificado de micro-estudo por cartões rápidos, vidas, ofensiva (streaks), sons com Web Audio API e feedback imediato de fixação.

#### D. Motor de Simulados (`/simulado-rapido`, `/simulado-especifico`, `/maratona-100`)
- **Simulado Rápido**: Questões personalizadas por disciplina/banca para treinos rápidos de 5 a 10 minutos.
- **Simulado Específico / Maratona 100**: Provas completas com contagem regressiva, filtro por cargo/nível, histórico detalhado e gabarito comentado pela IA.

#### E. Aulas Premium Didáticas (`/aulas`, `/aulas/[materia]`)
Cada aula é desenvolvida respeitando rigorosamente a **Diretriz de Geração de Aulas Premium**:
- **10 Módulos Integros**: Conteúdo completo divididos em tópicos progressivos.
- **Framework C.E.D.E.A**: Cada introdução contém textos densos de Contexto, Explicação, Demonstração, Expansão e Aplicação focada na banca.
- **FlipCards Interativos**: 6 Flashcards Premium por módulo (3 de Detalhamento Técnico e 3 de Análise Prática/Memorização) com ícones Lucide e cabeçalho `LuCheck`.
- **Consolidação Multimídia**: Componente `ModuleConsolidation` com `sinteseEstrategica` e suporte a áudio-aulas e vídeos integrados.
- **Quizzes de Fixação**: Questões de múltipla escolha com 5 alternativas (A a E) no padrão CESGRANRIO.

#### F. Plano de Estudos Adaptativo (`/plano-estudos`)
- Cronograma gerado pela IA com base nos dias disponíveis do aluno até a data da prova.

#### G. Assinatura & Monetização (`/seja-pro`)
- Checkout transparente com os planos Mensal, Semestral e Anual (Acesso PRO).

---

### 4.2 Painel Administrativo & CMS White-Label (`/admin`)

#### A. Gestão de Concursos & Cursos (`/admin/cursos`, `/admin/editais-base`)
- **Engine Edital-to-Course (White Label)**: Capacidade de cadastrar novos concursos (ex: Banco do Brasil, INSS, Caixa) através do upload e parsing automático de edital em PDF por IA.
- **ScoreLessonRenderer (Motor Universal JSON)**: Componente de renderização que lê a estrutura JSON gerada pelo parser e constrói a aula completa mantendo o Design System sem necessidade de codificar novos arquivos `.tsx`.

#### B. Gestão de Usuários & Suporte (`/admin/usuarios`, `/admin/tickets`)
- Controle de acessos por papéis (`ALUNO`, `ADMIN`, `COORDENADOR`, `SYSADMIN`).
- Central de suporte e abertura de chamados.

#### C. Painel Financeiro & Telemetria (`/admin/financeiro`, `/api/telemetry`)
- Métricas de faturamento, novos cadastros, taxa de conversão e logs de auditoria dos servidores.

---

## 5. Diretrizes de Design & Experiência do Usuário (UI/UX)

### 5.1 Sistema de Themes & Skins (Dynamic Skin System)
A plataforma suporta múltiplos temas visuais adaptáveis ao concurso ativo (ex: Petrobras com pele de gradientes verde/esmeralda/indigo):
- Variáveis CSS nativas: `var(--primary)`, `var(--primary-gradient)`, `bg-primary`, `border-primary/30`.
- Suporte nativo a Modo Claro (Light) e Modo Escuro (Dark).

### 5.2 Regras Estritas de Design (MANDATÓRIO)
1. **Purple Ban**: Proibição total de tons roxos/violeta genéricos como cor primária ou secundária.
2. **Sem Placeholders Genéricos**: Todos os ícones utilizam `lucide-react`, imagens geradas via IA/SVG e gráficos interativos via Recharts/Framer Motion.
3. **Navegação Consistente**: Todas as subpáginas reutilizam a estrutura oficial estabelecida em `/cursos/petrobras`.

---

## 6. Métricas Principais & KPIs do Produto

| Categoria | KPI / Métrica | Meta / Indicador |
| :--- | :--- | :--- |
| **Aquisição** | Primeiros Alunos Fundadores | 500 Inscritos Ativos no Lançamento |
| **Engajamento** | Questões Resolvidas por Usuário | > 25 questões / dia por aluno ativo |
| **Retenção** | Ofensiva Média no NaVeiaLingo | > 5 dias consecutivos de estudo |
| **Monetização** | Taxa de Conversão Free -> PRO | > 4.5% dos inscritos |
| **Performance** | Tempo de Carregamento (Lighthouse) | Performance > 90, SEO = 100 |

---

## 7. Roadmap de Desenvolvimento (Visão 2026)

- [x] **Fase 1 (Concluída)**: Estruturação das Aulas Premium Didáticas e Design System da Petrobras.
- [x] **Fase 2 (Concluída)**: Motor de Simulados com IA, NaVeiaLingo e Integração de Pagamentos.
- [ ] **Fase 3 (Em Andamento)**: Finalização do Dashboard Admin White-Label e Parser de Edital via IA.
- [ ] **Fase 4 (Próxima)**: Lançamento oficial da Turma Fundadores (Primeiros 500 Alunos) e expansão para concursos bancários.
- [ ] **Fase 5 (Futuro)**: Aplicativo Mobile Nativo (React Native / Expo) com sincronização offline de questões.

---
*Documento mantido e sincronizado pelo time de engenharia e produto do Concurso Na Veia.*
