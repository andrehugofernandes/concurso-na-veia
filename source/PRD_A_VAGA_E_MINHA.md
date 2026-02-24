# PRD — "A Vaga É Minha"
## Product Requirements Document (Análise Competitiva + Benchmarking)

---

## 1. Visão Geral do Produto

**Nome:** A Vaga É Minha  
**Categoria:** EdTech / SaaS de Preparação para Concursos Públicos  
**Público-alvo:** Candidatos ao concurso da **Petrobras 2026** (foco inicial) — expandível para outros concursos públicos brasileiros de alto impacto  
**Modelo de negócio:** SaaS B2C — assinatura mensal ou acesso vitalício  
**Plataforma:** Web (Next.js 15 / Vercel) — Mobile-responsive  
**Sede:** Brasil  
**Status atual:** MVP funcional em produção

---

## 2. Problema Que Resolve

Candidatos a concursos públicos de alto nível (ex: Petrobras, Correios, Banco do Brasil) enfrentam:

1. **Conteúdo fragmentado** — material espalhado em PDFs, YouTube, cursinhos presenciais e apostilas físicas
2. **Falta de personalização** — cursos genéricos que não focam no edital do concurso específico
3. **Ausência de prática gamificada** — material estático, sem feedback imediato e sem engajamento
4. **Alto custo dos cursinhos tradicionais** — R$ 1.000–R$ 5.000 por pacote presencial
5. **Dificuldade de revisão visual** — conceitos complexos de gramática, matemática e conhecimentos específicos sem suporte visual de alta qualidade

---

## 3. Solução Proposta

Plataforma EAD premium e interativa que combina:

| Componente | Descrição |
|---|---|
| **Aulas EAD Interativas** | Módulos por competência (Português, Matemática, Conhecimentos Específicos) com componentes HTML avançados: accordions, flip cards, carrosséis, mapas mentais |
| **Simulados com IA** | Geração de questões sob demanda via API (Claude/Gemini), com diferentes dificuldades e tópicos |
| **Resumos Visuais Premium** | Infográficos, mapas mentais, tabelas e cards gerados por IA, exportáveis em PDF |
| **Gamificação** | Sistema de XP, conquistas, progresso por módulo, desbloqueio sequencial de conteúdo |
| **Audio Resumos** | Cards de áudio com letras (rap pedagógico) para revisão enquanto se desloca |
| **Skin System** | Sistema de personalização visual da interface (temas de cores) |
| **Dashboard Analítico** | Acompanhamento de desempenho, histórico de simulados, pontos fracos identificados |

---

## 4. Funcionalidades Core (MVP)

### 4.1 Módulo de Aulas EAD
- **Estrutura por módulos** com tabs: Vídeo Aula, Resumo Visual, Macete Visual, Áudio Resumo
- **Componentes interativos:** ContentAccordion, FlipCard, CardCarousel, QuizInterativo, ModuleSummaryCarousel
- **Progresso rastreado:** Cada módulo tem % de conclusão e desbloqueio sequencial
- **Navegação sticky:** StickyModuleNav para controle de posição na aula longa

### 4.2 Simulados Inteligentes
- Tipos: Simulado Rápido (5 questões), Simulado Específico por tópico, Maratona 100 questões
- **Dificuldades:** Fácil, Médio, Difícil, "Casca de Banana" (armadilhas de banca)
- **Seleção de tópico** via dropdown categorizado por matéria
- Resultado detalhado com score e feedback por questão

### 4.3 Sistema de Conteúdo Visual
- Imagens educacionais geradas por IA com padrão **Modern Light Premium**
- Exportação de resumo visual em **PDF** (jsPDF integrado com guias de corte e branding)
- Lightbox full-screen para visualização ampliada

### 4.4 Dashboard
- Métricas: % completado por matéria, score médio nos simulados, XP acumulado
- Histórico de simulados com performance timeline
- Configuração de perfil e profissão (área de atuação da Petrobras)

---

## 5. Matérias / Conteúdo (Petrobras 2026)

### Português (Nível concurseiro avançado)
- ✅ Interpretação de Texto
- ✅ Reescrita de Frases
- ✅ Concordância Verbal e Nominal
- ✅ Coesão e Coerência
- ✅ Classes de Palavras (10 classes)
- ✅ Sintaxe
- ✅ Regência Verbal e Nominal
- ✅ Crase
- ✅ Pontuação
- ✅ Ortografia
- ✅ Tipos Textuais

### Matemática / Raciocínio Lógico
- 🔄 Em desenvolvimento

### Conhecimentos Específicos (por área Petrobras)
- 🔄 Em desenvolvimento

---

## 6. Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 15 (App Router), React, TypeScript |
| Estilização | Tailwind CSS v4 + shadcn/ui |
| Backend/API | Next.js Route Handlers |
| IA Geradora de Questões | Google Gemini API / Anthropic Claude API |
| IA de Imagens | Gemini 3 Pro Image (Nano Imagen) |
| Banco de Dados | Supabase (PostgreSQL) |
| Autenticação | Supabase Auth |
| Deploy | Vercel |
| PDF | jsPDF |

---

## 7. Diferencial Competitivo (Hipótese)

| Fator | A Vaga É Minha | Concurso típico |
|---|---|---|
| Personalização por edital | ✅ Ultra-específico (Petrobras) | ❌ Genérico |
| Gamificação profunda | ✅ XP, conquistas, desbloqueios | ⚠️ Parcial |
| IA para questões ilimitadas | ✅ Simulados sob demanda | ❌ Banco fixo |
| Resumos visuais gerados por IA | ✅ Infográficos premium exportáveis | ❌ PDFs padrão |
| Design de última geração | ✅ Premium, interativo, dark/light mode | ⚠️ Básico |
| Preço acessível | ✅ SaaS vs R$ 3-5k cursinho | ✅ |
| Audio resumo | ✅ Rap pedagógico | ❌ Raro |

---

## 8. Métricas de Sucesso (KPI)

- **Engajamento:** Tempo médio por sessão > 25 min
- **Retenção:** Churn mensal < 8%
- **Aprendizado:** Score médio nos simulados aumentando semana a semana
- **NPS:** > 50
- **Conversão:** Free trial → Pago > 15%
- **Receita:** MRR crescente mês a mês

---

## 9. Roadmap (Próximos 6 meses)

| Fase | Entregas |
|---|---|
| **P0 (Agora)** | Completar conteúdo Português, lançar MVP, primeiros 50 usuários beta |
| **P1 (Mês 2-3)** | Adicionar Matemática e Raciocínio Lógico, Sistema de pagamento (Stripe/Pagar.me) |
| **P2 (Mês 3-4)** | Conhecimentos Específicos por área (Engenharia, Administração, TI...) |
| **P3 (Mês 4-6)** | App Mobile (React Native), Outros concursos (BB, Correios, BNDES), Comunidade |

---

## 10. Concorrentes a Pesquisar (Para o Manus.im)

> **Instrução para Manus:** Pesquise na web os seguintes tipos de produtos e crie uma análise comparativa detalhada:

### Concorrentes Diretos (EdTech Concursos Brasil)
- Gran Cursos Online (grancursosonline.com.br)
- Estratégia Concursos (estrategiaconcursos.com.br)
- Alfacon (alfacon.com.br)
- QConcursos (qconcursos.com)
- Direção Concursos (direcaoconcursos.com.br)
- Tec Concursos (tecconcursos.com.br)
- Aprova Concursos (aprovaconcursos.com.br)

### Concorrentes Internacionais / Referências
- Duolingo (gamificação + aprendizado)
- Khan Academy (EAD gratuito estruturado)
- Brilliant.org (gamificação para STEM)
- Coursera / Udemy (cursos online)
- Anki (flashcards + memorização espaçada)

### SaaS de Quiz/Simulados com IA
- Quizlet (EUA — AI-generated flashcards)
- Khanmigo / Khanacademy AI
- Photomath (AI para Matemática)
- Studocu (material colaborativo)

### O que pesquisar por concorrente:
1. Funcionalidades principais
2. Modelo de preço (freemium / assinatura / vitalício)
3. Avaliações de usuários (App Store / Trustpilot / Google)
4. Diferenciais e pontos fracos relatados pelos usuários
5. Design e UX (moderno ou datado?)
6. Uso de IA (tem ou não? como?)
7. Gamificação (XP, conquistas, ranking?)
8. Oportunidades que nenhum deles está capturando

---

## 11. Perguntas-Chave para Posicionamento

1. Qual concorrente tem melhor **gamificação** e como eles fazem?
2. Qual usa **IA de forma mais inteligente** para personalização?
3. Há alguma plataforma com **resumos visuais** de qualidade?
4. Qual o **preço médio** do mercado e qual o modelo mais popular?
5. Existe gap de mercado em **Petrobras especificamente**?
6. O que os usuários mais **reclamam** dos concorrentes existentes?
