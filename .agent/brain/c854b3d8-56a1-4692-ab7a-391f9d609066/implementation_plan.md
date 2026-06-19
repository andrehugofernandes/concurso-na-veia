# Plano de Unificação e Padronização ULTIMATE (Matemática)

Este plano visa criar um script mestre (`ultimate-math-fixer.js`) para consolidar todas as melhorias recentes e corrigir a quebra de consistência visual relatada.

## User Review Required

> [!IMPORTANT]
> **Lógica de Preservação (Princípio da Não-Intervenção):** Conforme solicitado, o script incluirá um motor de auditoria prévia. Ele comparará o estado atual do arquivo com o padrão desejado e **SÓ** aplicará mudanças se houver necessidade (Ex: Índice errado ou inconsistência de cor). Se a aula já estiver 100% conforme o padrão, nada será alterado.

> [!IMPORTANT]
> **Consistência de Cores:** Vou sincronizar o `ModuleBanner` com a variante `mv[N]` apenas se ele ainda estiver usando gradientes manuais que divirjam do padrão do módulo.

> [!NOTE]
> **Indexação:** Seguirei a regra: Headers (1, 2, 3...) -> Consolidation (Próximo número) -> Quiz (Último número).

## Mudanças Propostas

### 1. Script Mestre: `ultimate-math-fixer.js` [NEW]

Criação de um script Robusto que realizará os seguintes passos por aula:

#### A. Limpeza e Consolidação
- Remove cards legados de "Resumo e Multimídia".
- Injeta/Atualiza o componente `ModuleConsolidation` com as 4 abas (Vídeo, Resumo Virtual, Macete, Música).
- Realoca imagens do "Resumo" antigo para o "Resumo Virtual" (prop `resumoVisual`).

#### B. Sincronização Estética (Master Fix)
- Localiza todos os `ModuleBanner`.
- **Remove** a prop `gradiente` (que estava causando a discrepância).
- **Adiciona/Mantém** a prop `variant={mv[N]}`.
- Isso fará com que o Banner use o gradiente oficial do sistema, combinando perfeitamente com os `ModuleSectionHeader` e o `ModuleConsolidation`.

#### C. Indexação Numérica Sequencial
- Reinicia a contagem em cada `TabsContent`.
- Atribui índices incrementais para:
  1. `ModuleSectionHeader`
  2. `ModuleConsolidation`
  3. `QuizInterativo`
- Garante que não haja saltos ou duplicidade na numeração dos círculos.

#### D. Correção de Sintaxe (JSX Scaping)
- Localiza caracteres `{` e `}` usados em notação de conjuntos e os envolve em strings `{"{"}` e `{"}"}` para evitar erros de compilação TypeScript.

### 2. Execução Massiva
- O script será executado em todas as 19 aulas de matemática em `src/components/aulas/matematica/`.

## Plano de Verificação

### Verificação Automatizada
- Execução do script com logs detalhados de cada arquivo modificado.
- Verificação visual via `npm run dev` na aula `AulaConjuntos.tsx` (Módulo 1 e Módulo 10).

### Verificação Manual
- Validar se o círculo numérico do Quiz final agora segue a sequência (ex: Módulo 10 terminando em 5 em vez de 4).
- Confirmar se o banner e os cards agora possuem a mesma cor (ex: ambos Âmbar no Módulo 1).

## Perguntas Abertas
- Existe alguma aula de matemática que NÃO deva seguir este padrão?
- Você tem alguma preferência de cor específica para algum módulo que fuja do padrão `amber, blue, emerald, rose, violet` (repetido)?
