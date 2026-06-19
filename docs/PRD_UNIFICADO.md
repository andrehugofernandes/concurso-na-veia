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

## Próximos Passos
1. Concluir extração das mensagens antigas.
2. Construir scripts CLI para pesquisa rápida no `context_history.db`.
3. Validar a geração das primeiras aulas utilizando os novos scripts e baseando-se neste PRD.
