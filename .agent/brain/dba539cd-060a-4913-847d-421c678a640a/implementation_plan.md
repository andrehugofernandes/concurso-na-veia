# Plano de Implementação - Padronização das RICH intros (Coesão e Coerência)

Este plano visa padronizar e elevar a qualidade pedagógica das seções de introdução de todos os 10 módulos da aula de **Coesão e Coerência**, garantindo conformidade com o `lesson-builder/SKILL.md` e o padrão Bechara.

## Mudanças Propostas

### 📚 Padronização Pedagógica (Padrão Bechara)

- Injeção de conteúdo profundo baseado em **Evanildo Bechara**.
- Eliminação de abreviaturas e adoção de termos técnicos por extenso.
- Foco na "engenharia do sentido" e "cadeia de relações".
- Adaptação de exemplos para o contexto da **Petrobras** (offshore, refino, segurança).

### 🎨 Design & UI (Ultimate V4.1)

- Garantir que cada módulo inicie com um `ModuleSectionHeader` usando `index="INTRO"`.
- Implementar o componente `RichIntro` em todos os módulos, com layout de 2 colunas.
- Adicionar um elemento de **Diagnóstico Rápido** (pergunta reflexiva ou mini-quiz) em cada introdução.
- Incorporar **Prompts Técnicos (Modern Light)** para geração de imagens via Nano Banana.

### 🛠️ Arquitetura de Módulos (Chunked Work)

A refatoração será feita de forma modular para evitar estouro de contexto:

#### [MODIFY] [AulaCoesaoCoerencia.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaCoesaoCoerencia.tsx)

- Refatoração dos Módulos 1 a 10 com foco nas seções de introdução.
- Verificação do branding "A VAGA É MINHA".

## Plano de Verificação

### Verificação Manual

1. **Auditoria de Conformidade**: Revisão manual do código gerado para garantir que:
   - Todos os 10 módulos possuem `index="INTRO"`.
   - Não existem abreviaturas (ex: VTD, OD).
   - O tom de voz é direto e encorajador.
   - Todos os `RichIntro` possuem diagnóstico.
2. **Build Test**: Verificar se o arquivo `AulaCoesaoCoerencia.tsx` continua compilando sem erros no ambiente Next.js (pnpm dev).

### Scripts de Vistoria

- Executar `python .agent/scripts/checklist.py` (se disponível) para auditoria de prioridade.
