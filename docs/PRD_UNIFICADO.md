# Petrobras Quest: PRD Unificado

## Visão Geral
O **Petrobras Quest** é uma plataforma de estudo gamificada focada na preparação para o concurso da Petrobras 2026. A aplicação utiliza inteligência artificial avançada para geração de simulados, trilhas de aprendizagem dinâmicas e conteúdos ricos para engajar e preparar os candidatos com alta performance.

## Stack Tecnológico
- **Frontend / Fullstack:** Next.js 15 (App Router).
- **Integração de IA:** Anthropic API (Claude) para a engine de simulação, análise de desempenho e construção de conteúdos complexos.
- **Estilização:** Tailwind CSS (sem uso da cor roxa, conforme diretrizes da marca - "Purple Ban").
- **Tipografia:** Khand (Títulos/Logo/Botões) e Poppins (Corpo de Texto). Orbitron como display alternativo.

## Arquitetura de Agentes (Antigravity IDE)
O projeto faz uso intensivo do framework de agentes autônomos para desenvolvimento e operação:
- `.agent/workflows/criar-aula-premium.md`: Workflow principal para criação de aulas ricas, dinâmicas e que utilizam micro-interações.
- `.agent/skills/rich-intro-premium-flips-builder/SKILL.md`: Skill específica focada na construção de "Premium Flips" (flashcards dinâmicos).
- **Sistema de Log:** Conversas com agentes e o estado do sistema são salvos em um banco de dados SQLite local na IDE (`context_history.db`) para perenidade.

## Diretrizes de Design (BRAND_DESIGN_GUIDE)
- Estética moderna, dinâmica e focada em engajamento.
- **Cores principais:** Paleta própria focada em Laranja, Azul, Verde, Verde-claro, Amarelo e Azul-claro. Para o Petrobras Quest especificamente: Indigo, Emerald, Rose e Cyan.
- Nenhuma funcionalidade deve utilizar templates genéricos; todos os componentes devem refletir uma marca premium (UI/UX de elite).

## Diretrizes de Conteúdo (GUIA_CRIACAO_AULAS)
- O conteúdo deve ser redigido como treinamento operacional técnico de elite.
- É mandatório o foco em "O que a banca quer que você confunda", com dicas de pegadinhas da banca CESGRANRIO.
- Uso de componentes visuais, quizzes intermediários e explicações profundas.

## Banco de Dados de Contexto
As conversas anteriores do usuário e dos agentes foram migradas e processadas a partir de arquivos `.pb` (Protobuf/binários) do IDE e consolidadas no banco de dados **SQLite (`context_history.db`)** na raiz do projeto. Esse banco servirá de "cérebro persistente" para recuperar rapidamente o histórico de intenções do projeto em sessões futuras.

## Visão de Futuro: Arquitetura White Label (Edital -> Curso)
Para escalar a aplicação de forma autônoma (Multi-tenant), a arquitetura adotará o padrão **Content-Driven Architecture (CMS + JSON Schema)** sob uma estratégia de **Coexistência Híbrida**:
- **Criação de Cursos Inteligente:** O novo fluxo administrativo permitirá o upload de um Edital. A Inteligência Artificial fará o parse do documento e gerará um JSON estruturado com todo o conteúdo das aulas e matriz de simulados.
- **ScoreLessonRenderer:** Um componente de renderização universal que lerá esse JSON e montará as aulas em tempo de execução, injetando os dados estáticos nos mesmos componentes premium do Design System (ModuleBanner, Flashcards, etc).
- **Legado Blindado (Estratégia Híbrida):** As aulas já desenvolvidas nativamente em código (`.tsx`) para o curso da Petrobras permanecerão intocadas em suas rotas. O novo renderizador atuará apenas nas rotas dinâmicas dos *novos concursos* criados pelo Dashboard Admin, garantindo **Risco Zero** de quebra do que já está validado.

## Próximos Passos
1. Modelagem e construção do Admin Dashboard (Tabelas de Usuários, Tickets e Concursos).
2. Desenvolvimento do `ScoreLessonRenderer` (Motor Universal de renderização de JSON para Aulas).
3. Construção do Parser de Edital com IA para preenchimento automático do Banco de Dados.
