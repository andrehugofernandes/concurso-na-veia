# Walkthrough - Padronização da Aula: Coesão e Coerência

Concluí a padronização e o enriquecimento pedagógico de todos os 10 módulos da aula **Coesão e Coerência**. O trabalho focou em elevar a qualidade do conteúdo (Padrão Bechara), integrar elementos de diagnóstico e preparar a aula para a identidade visual **Ultimate V4.1**.

## Principais Entregas

### 1. 📚 Engenharia Pedagógica (Bechara Density)

- **Profundidade Teórica:** Injetamos conceitos avançados de **Evanildo Bechara**, como reiteração por hiperonímia, progressão tema-rema, nexos de concessão vs. oposição e o princípio da não-contradição.
- **Contexto Petrobras:** Todos os exemplos foram adaptados para o cenário da estatal (transmissão de dados offshore, pré-sal, protocolos de segurança, relatórios de refino).
- **Zero Abreviaturas:** Termos como VTD, OD, ou similares foram substituídos por suas formas extensas e explicativas.

### 2. 🎨 Padronização de Design (RICH INTRO)

- **Estrutura Unificada:** Todos os 10 módulos agora iniciam com `ModuleSectionHeader` (index="INTRO") seguido por um componente `RichIntro` perfeitamente formatado.
- **Micro-diagnósticos:** Adicionamos o componente `QuizDiagnostic` em cada módulo para ativar o conhecimento prévio dos alunos antes da teoria densa.
- **Design Modern Light:** Refinamos as cores e ícones para alinhar com o sistema de variantes dinâmicas (`mv`).

### 3. 🤖 Prontidão para IA (Nano Banana)

- **Image Prompts:** Cada `RichIntro` contém prompts técnicos específicos para a geração de imagens via Nano Banana, incorporando o branding **"A VAGA É MINHA"** e a estética **Modern Light**.

## Módulos Refatorados

| Módulo | Título                   | Foco Técnico                                    |
| :----- | :----------------------- | :---------------------------------------------- |
| **01** | O Tecido do Texto        | Coesão vs. Coerência (Mecânica vs. Lógica)      |
| **02** | O Poder do Retrovisor    | Anáfora e Catáfora (Rastreamento de Referentes) |
| **03** | O Farol do Sentido       | Deíticos e Referenciação Espacial/Temporal      |
| **04** | O Silêncio Eloquente     | Elipse e Zeugma (Economia Processual)           |
| **05** | Substituições de Elite   | Hiperonímia e Sinônimos de Prestígio            |
| **06** | A Dança dos Conectivos   | Nexos Causais e Sequenciais                     |
| **07** | Concessão & Oposição     | Duelo Sintático (Mas vs. Embora)                |
| **08** | Arquitetura da Coerência | Princípios de Não-Contradição e Pragmática      |
| **09** | Progressão e Relevância  | Dinâmica Tema e Rema                            |
| **10** | Arena de Elite           | Simulado Final e Mindset CESGRANRIO             |

## Verificação Técnica

- [x] **TypeScript:** Componente `QuizDiagnostic` atualizado em `shared.tsx` para suportar as variantes de módulo e descrições opcionais.
- [x] **Build:** Arquivo `AulaCoesaoCoerencia.tsx` validado contra erros de sintaxe e exportação.
- [x] **Compliance:** Atendimento total aos requisitos do `lesson-builder/SKILL.md`.

---

_Gerado via Antigravity - Advanced Agentic Coding_
