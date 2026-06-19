# Plano de Implementação: Expansão de Aulas Premium Petrobras

Este plano detalha a criação das aulas pendentes para todos os cargos almejados, seguindo estritamente o workflow `@.agent/workflows/aula.md` e o padrão visual premium estabelecido.

## User Review Required

> [!IMPORTANT]
> - A aula de **Inglês** será a primeira a ser criada, servindo como base comum para todos os cargos de nível superior.
> - O cargo **Suprimento - Administração (Nível Médio)** não será alterado, conforme solicitado.
> - As aulas serão estruturadas com 5 a 10 módulos cada, garantindo 2500+ linhas de conteúdo didático denso.

## Proposed Changes

### 1. Conhecimentos Básicos - Língua Inglesa (Nível Superior)
Criação dos componentes e dados de quiz para a matéria de Inglês, abrangendo os tópicos do edital.

#### [NEW] [reading-strategies-quizzes.ts](file:///c:/Workspace/petrobras-quest/src/components/aulas/ingles/data/reading-strategies-quizzes.ts)
- Pool de questões estilo CESGRANRIO (A-E) focado em técnicas de leitura (Skimming, Scanning).

#### [NEW] [AulaReadingStrategies.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/ingles/AulaReadingStrategies.tsx)
- Componente premium com módulos de Skimming, Scanning, Prediction e Contextual Clues.

#### [MOD] [page.tsx](file:///c:/Workspace/petrobras-quest/src/app/(dashboard)/aulas/[materia]/[topico]/page.tsx)
- Registro da nova aula de Inglês no roteador dinâmico.

### 2. Conhecimentos Específicos (Próximas Etapas)
Após a conclusão de Inglês, seguiremos para os Blocos I, II e III dos cargos:
- **Nível Superior**: Tecnologia (TI), Engenharia de Petróleo, Engenharia Mecânica, etc.
- **Nível Técnico**: Operação, Manutenção (Mecânica, Elétrica, Instrumentação), etc.

## Verification Plan

### Automated Tests
- Execução de `python fix_count.py` e `python fix_tags.py` após cada aula criada.
- Verificação de build com `pnpm dev`.

### Manual Verification
- Teste de navegação com os usuários de teste (ex: `andrehugo-analista-sistemas-sup`) para validar se a matéria de Inglês aparece e funciona corretamente.
- Validação visual do placeholder premium em cargos ainda não implementados.
