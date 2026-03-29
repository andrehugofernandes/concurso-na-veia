# Protocolo de Expansão Premium — Contexto para Claude Code

Este documento serve como a "memória de longo prazo" para a evolução do conteúdo pedagógico do projeto Petrobras Quest.

## 1. O Salto de Qualidade (5 → 10 Módulos)

Originalmente, as aulas eram limitadas a 5 módulos curtos. **O novo padrão exige profundidade.**

- **Meta:** Transformar materiais rasos em jornadas de 8 a 12 módulos.
- **Volume:** Cada arquivo `.tsx` de aula deve ter, em média, **1500 a 3000 linhas de código rico**.
- **Quizzes:** Mínimo de 30 questões por aula (pool de 6 por módulo principal).

## 2. Pedagogia "Mestre Petrobras" (CESGRANRIO)

- **Contextualização Industrial:** NUNCA use "Joãozinho comprou maçãs". Use "O operador da RPBC identificou um desvio no sensor..." ou "Um petroleiro atracando no Terminal de Suape...".
- **Estilo CESGRANRIO:** Questões de múltipla escolha (A-E), com **Explicação Detalhada** (por que a certa é certa e por que a errada é errada).
- **Escalabilidade:** Do nível 0 (Vocabulário) ao Nível 3 (Mestria/Engenharia).

## 3. Protocolo C.E.D.E. (Crivo de Conteúdo Imperativo)

Nenhum componente (`ContentAccordion`, `FlipCard`, `CardCarousel`) ou introdução de módulo deve ser criado sem passar por este crivo obrigatório:

- **C (Conceituação):** Definição técnica formal e explicação intuitiva (analogia).
- **E (Exemplificação):** No mínimo 2 exemplos práticos e reais (foco Petrobras/Indústria).
- **D (Dicas):** Macetes táticos, "pulos do gato" ou gatilhos mentais para a prova.
- **E (Exceções):** Casos onde a regra muda, pegadinhas comuns da CESGRANRIO ou cenários limite.

---

## 4. Design Tokens & UI (The "Purple Ban")

Seguimos rigorosamente o **Purple Ban** (Proibição do Roxo/Violeta):

- **Cores Permitidas:** Indigo-950 (Fundo), Indigo-400/500 (Primária), Emerald (Sucesso/Check), Rose (Erro/Alerta), Cyan (Técnico/Poisson).
- **Glassmorphism:** `bg-muted/30 backdrop-blur-md` e bordas com `border-white/5` ou `border-border/20`.
- **Componentes Chave:**
  - `ContentAccordion`: Para agrupar teoria densa. **(OBRIGATÓRIO: Sempre construir usando o padrão da skill `@[.agent/skills/acordeon-carrossel]`)**
  - `FlipCard`: Ricos em conteúdo no verso (mini-aulas). **Padrão Premium (Skin-Aware):** Ícones do sistema (`primary`), categoria no rodapé e estrutura densa. Frente: Ícone + Título + Pergunta; Verso: Ícone Check + Título Resposta + Explicação Densa + Dica de Elite em destaque.
  - `CardCarousel`: Para roadmaps de estudo.
  - `StickyModuleNav`: Novo menu em carrossel (ajustado para suportar até 15 módulos).
  - `ModuleConsolidation`: **(MANDATÓRIO)** Componente de fechamento de cada módulo. Substitui a estrutura manual de abas de resumo. Contém 4 abas pré-definidas:
    1. **Vídeo Aula**
    2. **Resumo Virtual** (usa `ModuleSummaryCarouselNew` internamente)
    3. **Macete Visual** (JSX livre para macetes táticos)
    4. **Música do Módulo** (Player de áudio)
    *   **Título:** Deve seguir o padrão: `"Resumo do Módulo ${index}"`.

## 4. Onde encontrar a "Receita"?

- **Workflow:** `.agent/workflows/aula.md` contém o script de criação.
- **Shared Components:** `src/components/aulas/shared.tsx` é a bíblia dos componentes reutilizáveis.
- **Padrão de Ouro:** `src/components/aulas/matematica/AulaProbabilidade.tsx` é a aula que atingiu o ápice do design e conteúdo. Use-a como `.reference`.

## 5. Protocolo de Imagem Prescrita (Claude Code → Antigravity)

Você (Claude) não gera imagens binárias. Siga este protocolo para prescrever imagens que o Antigravity irá gerar posteriormente.

### 5.1 Regras de Ouro (MANDATÓRIO)

- **[PROIBIÇÃO]**: NUNCA coloque prompts dentro do atributo `alt="..."` de uma tag `img`. Isso é um anti-padrão que gera erro semântico.
- **[DENTRO DO RESUMO]**: Imagens de resumo do módulo DEVEM ser construídas dentro do componente `ModuleSummaryCarouselNew`, localizado na aba **Resumo Visual** da seção de Resumo.
- **[PROMPT NO COMENTÁRIO]**: O prompt deve ser inserido como um comentário JS/TSX ao lado da propriedade que recebe a URL.

### 5.2 Como inserir no código (Resumo Visual)

Dentro dos módulos, na aba de resumo, siga este template:

```tsx
<ModuleSummaryCarouselNew
  images={[
    {
      title: "Título Técnico da Imagem",
      type: "Diagrama / Mapa Mental / Infográfico",
      placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
      imageUrl: "/temp-img.png", // PROMPT: [MANDATÓRIO] Descreva aqui para o Nano Banana o que deve aparecer. Estilo Dark Premium, cores Petrobras (Verde/Azul/Ciano), detalhes industriais/matemáticos específicos.
    },
  ]}
  moduloNome="..."
  tituloAula="..."
  materia="..."
/>
```

### 5.3 Imagens Inline (FlipCards e Accordions)

Se precisar de uma imagem fora do carrossel de resumo (ex: dentro de um `FlipCard`), use a tag `img` mas com o prompt em comentário:

```tsx
<img
  src="/temp-img.png" // PROMPT: Descrição detalhada da ilustração técnica...
  alt="Descrição amigável para acessibilidade (NÃO O PROMPT)"
  className="w-full rounded-2xl"
/>
```

### 5.4 Workflow de geração

1. Claude escreve o código com `/temp-img.png` e os comentários `// PROMPT: ...`.
2. Claude avisa ao usuário: _"Prescrevi X imagens nesta aula. Peça ao Antigravity para 'Dar vida às imagens prescritas'."_
3. O Antigravity processa os arquivos de imagem e atualiza os caminhos reais.

## 6. Próximos Passos — Fila de Upgrade (Matemática)

Seguir a ordem cronológica do `src/data/conteudo.ts`. Aulas marcadas com ✓ atingiram o padrão premium (10 módulos, 1500+ linhas).

| Ordem | Tópico                   | Arquivo                         | Status                                         |
| ----- | ------------------------ | ------------------------------- | ---------------------------------------------- |
| 1     | Teoria dos Conjuntos     | `AulaConjuntos.tsx`             | 5 mod, 1347 lin — **PRÓXIMO**                  |
| 2     | Razão e Proporção        | `AulaRazaoProporcao.tsx`        | 5 mod, 628 lin — aguarda                       |
| 3     | Porcentagem              | `AulaPorcentagem.tsx`           | 5 mod, 962 lin — aguarda                       |
| 4     | Equações 1º Grau         | `AulaEquacoes1Grau.tsx`         | 5 mod, 603 lin — aguarda                       |
| 5     | Equações 2º Grau         | `AulaEquacoes2Grau.tsx`         | 5 mod, 604 lin — aguarda                       |
| 6     | Funções Afim/Quadrática  | `AulaFuncoesAfimQuadratica.tsx` | 5 mod, 629 lin — aguarda                       |
| 7     | Funções Exponenciais     | `AulaFuncoesExponenciais.tsx`   | 5 mod, 541 lin — aguarda                       |
| 8     | Funções Logarítmicas     | `AulaFuncoesLogaritmicas.tsx`   | 5 mod, 510 lin — **NÃO registrada no router!** |
| 9     | PA                       | `AulaProgressoesPa.tsx`         | CRIAR DO ZERO                                  |
| 10    | PG                       | `AulaProgressoesPg.tsx`         | CRIAR DO ZERO                                  |
| 11    | Matrizes e Determinantes | `AulaMatrizesDeterminantes.tsx` | CRIAR DO ZERO                                  |
| 12    | Sistemas Lineares        | `AulaSistemasLineares.tsx`      | CRIAR DO ZERO                                  |
| 13    | Análise Combinatória     | `AulaAnaliseCombinatoriaou.tsx` | CRIAR DO ZERO                                  |
| 14    | Probabilidade            | `AulaProbabilidade.tsx`         | ✓ 10 mod, 1913 lin — **FEITO**                 |
| 15–19 | Trigonometria…Financeira | —                               | CRIAR DO ZERO                                  |

## 7. Fila de Upgrade (Língua Portuguesa - 10 Módulos)

| Ordem | Tópico                 | Arquivo                      | Status                                     |
| ----- | ---------------------- | ---------------------------- | ------------------------------------------ |
| 1     | Interpretação de Texto | `AulaInterpretacaoTexto.tsx` | 10 mod, enrichment in progress — **ATUAL** |
| 2     | Reescritura de Frases  | `AulaReescritaFrases.tsx`    | 10 mod, quizzes generated — **PRÓXIMO**    |
| 3     | Coesão e Coerência     | `AulaCoesaoCoerencia.tsx`    | 10 mod — aguarda                           |
| 4     | Concordância           | `AulaConcordancia.tsx`       | 10 mod — aguarda                           |
| 5     | Regência               | `AulaRegencia.tsx`           | 10 mod — aguarda                           |

---

**Após Matemática:**

1. Aplicar upgrade de 10 módulos em **Língua Portuguesa**
2. Iniciar **Conhecimentos Específicos** baseado nos PDFs do NotebookLM
