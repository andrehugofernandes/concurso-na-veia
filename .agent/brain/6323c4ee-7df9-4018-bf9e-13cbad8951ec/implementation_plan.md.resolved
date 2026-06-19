# Plano de Implementação: Reordenação e Nova Introdução Premium do Módulo 1 em `AulaOrtografia.tsx`

Este plano detalha a reestruturação e a reordenação das seções do **Módulo 1** de `AulaOrtografia.tsx` para seguir rigorosamente o padrão visual **Rich Intro & Premium FlipCards Builder**, respeitando a progressão aritmética de razão 1 e o framework **C.E.D.E.A**.

---

## 🎯 Objetivos

1. **Nova INTRO Geral de Ortografia e Fonologia (C.E.D.E.A):** Adicionar uma seção introdutória premium com exatamente 5 parágrafos densos e formais no topo do Módulo 1.
2. **Preservar o Conteúdo Original:** Remanejar a introdução antiga de *"Fundamentos da Fonética e Sílabas"* (que estava na INTRO) para ser a Seção 1 (`index={1}`).
3. **Reordenar Sequencialmente (Progressão Aritmética de Razão 1):**
   * **INTRO:** Nova Introdução de Ortografia e Fonologia Geral (C.E.D.E.A)
   * **Seção 1 (`index={1}`):** *"Fundamentos da Fonética e Sílabas"* (Anteriormente INTRO)
   * **Seção 2 (`index={2}`):** *"Encontros Vocálicos"* (Anteriormente Seção 1)
   * **Seção 3 (`index={3}`):** *"Classificação dos Encontros"* (Anteriormente Seção 2, contendo os 3 FlipCards Premium)
   * **Seção 4 (`index={4}`):** *"Resumo e Multimídia"* (Anteriormente Seção 3, contendo o LessonTabs)
   * **QuizInterativo (`numero={5}`):** (Anteriormente `numero={3}`)
4. **Respeitar os Padrões de Design:**
   * Cores temáticas consistentes do Módulo 1: `mv[1]` (`amber`).
   * Ausência de emojis nas introduções técnicas.
   * Regra estrita do *Purple Ban* (nenhum matiz roxo ou violeta).

---

## ⚙️ Alterações Propostas

### [Componente Português] (src/components/aulas/portugues)

#### [MODIFY] [AulaOrtografia.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaOrtografia.tsx)

*   **Refatoração da Primeira Seção (INTRO):**
    *   Substituir a seção atual (linhas 935–960) pela **Nova INTRO Geral**:
        *   `ModuleSectionHeader index="INTRO"`
        *   Título: `"Introdução à Fonologia e Ortografia"`
        *   Descrição: `"Compreenda as bases fundamentais do sistema de sons e grafia da Língua Portuguesa."`
        *   Inserir os 5 novos parágrafos densos desenvolvidos no padrão **C.E.D.E.A** focados na Petrobras e na CESGRANRIO.

*   **Refatoração da Segunda Seção (Seção 1):**
    *   Substituir a seção das linhas 962–987 para abrigar os *"Fundamentos da Fonética e Sílabas"*:
        *   `ModuleSectionHeader index={1}`
        *   Título: `"Fundamentos da Fonética e Sílabas"`
        *   Descrição: `"A base fonológica indispensável para compreender a acentuação e a grafia das palavras."`
        *   Reinjetar aqui os 5 parágrafos de *"Fundamentos da Fonética e Sílabas"* originais para garantir que o conteúdo não seja perdido.

*   **Refatoração da Terceira Seção (Seção 2):**
    *   Mudar a numeração e inserir a seção *"Encontros Vocálicos"*:
        *   `ModuleSectionHeader index={2}`
        *   Título: `"Encontros Vocálicos"`
        *   Descrição: `"A união e a separação de sons vocálicos nas palavras e o comportamento fonético clássico."`
        *   Reinjetar aqui os 5 parágrafos originais de *"Encontros Vocálicos"* que antes estavam na Seção 1 (linhas 971–985).

*   **Refatoração da Quarta Seção (Seção 3):**
    *   Ajustar a numeração da seção contendo os FlipCards:
        *   `ModuleSectionHeader index={3}`
        *   Título: `"Classificação dos Encontros"`
        *   (Manter o grid `gap-6` e os 3 FlipCards Premium intactos).

*   **Refatoração da Quinta Seção (Seção 4):**
    *   Ajustar a numeração da seção contendo as abas multimídia:
        *   `ModuleSectionHeader index={4}`
        *   Título: `"Resumo e Multimídia"`
        *   (Manter os `LessonTabs` e seus conteúdos intactos).

*   **Ajuste do Quiz:**
    *   Alterar a prop de número do Quiz para `numero={5}` (linha 1176).

---

## 🔬 Plano de Verificação

### Compilação do Código
- Executar `npx tsc --noEmit` para assegurar que a integridade sintática e de tipos do arquivo TypeScript/JSX esteja 100% correta.

### Inspeção Visual das Diretrizes
- [ ] Grid de FlipCards do Módulo 1 permanece usando `gap-6`.
- [ ] Progresso das seções está em progressão aritmética de razão 1 (INTRO -> 1 -> 2 -> 3 -> 4).
- [ ] Quiz está configurado como número 5.
- [ ] Ausência completa de emojis nas seções de texto corrido.
- [ ] Nenhuma cor roxa/violeta adicionada.
