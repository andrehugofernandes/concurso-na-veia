# 📘 MODELO DE CRIAÇÃO DE AULA — Referência: Classes Gramaticais

> **Objetivo:** Este documento é o blueprint definitivo, baseado em TODAS as iterações e refinamentos feitos na aula **"Classes de Palavras"** (`AulaClassesPalavras.tsx`). Ele deve ser seguido à risca para toda nova aula do sistema.

---

## 🏗️ ARQUITETURA DO COMPONENTE

### Estrutura de Arquivos

```
src/components/aulas/AulaNomeDaAula.tsx   ← Componente da aula
src/components/aulas/shared.tsx           ← Componentes reutilizáveis (NÃO ALTERE)
```

### Imports Obrigatórios

```tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
    QuizQuestion,
    getRandomQuestions,
    AlertBox,
    FlipCard,
    QuizInterativo,
    TimelineItem,
    ModuleBanner,
    CardCarousel,
    StickyModuleNav,
    ModuleSectionHeader,  // 🔴 OBRIGATÓRIO para cabeçalhos de seção
    ContentAccordion,
    LessonTabs,           // 🔴 OBRIGATÓRIO para resumos de módulo
    AulaProps,
    VideoModal
} from './shared';
// Ícones Lucide (use conforme necessário)
import { LuCheck, LuBookOpen, LuZap, LuVideo, LuHeadphones, LuImage /* ... */ } from 'react-icons/lu';
```

---

## 🧱 MÓDULOS — Definição e Locking

### 1. Constante `MODULE_DEFS` (Configuração Central)

Cada módulo tem um `id`, `label` e `titulo`. Exemplo real de Classes Gramaticais com 5 módulos:

```tsx
const MODULE_DEFS = [
    { id: 'modulo-1', label: 'Módulo 1', titulo: 'Verbo & Substantivo' },
    { id: 'modulo-2', label: 'Módulo 2', titulo: 'Pronome & Adjetivo' },
    { id: 'modulo-3', label: 'Módulo 3', titulo: 'Conjunção & Preposição' },
    { id: 'modulo-4', label: 'Módulo 4', titulo: 'Advérbio & Artigo' },
    { id: 'modulo-5', label: 'Módulo 5', titulo: 'Numeral, Interjeição & Lab' }
] as const;
```

> [!IMPORTANT]
> **Regra:** NUNCA hardcodar condições de progresso (`currentProgress < 50`). Use `completedModules: Set<string>` e `isModuleUnlocked(index)`.

### 2. Sistema de Locking (Desbloqueio Sequencial)

```tsx
const isModuleUnlocked = useCallback((moduleIndex: number) => {
    if (moduleIndex === 0) return true; // Módulo 1 sempre aberto
    const prevModuleId = MODULE_DEFS[moduleIndex - 1]?.id;
    return prevModuleId ? completedModules.has(prevModuleId) : false;
}, [completedModules]);
```

### 3. Salvamento de Progresso via `localStorage`

```tsx
const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) { // 🔴 Mínimo de 60% para avançar
        const newSet = new Set(completedModules).add(moduleId);
        setCompletedModules(newSet);
        localStorage.setItem('aula_[ID_UNICO]_progress', JSON.stringify({
            completedModules: Array.from(newSet)
        }));
        // Auto-navegar para próximo módulo
        const index = MODULE_DEFS.findIndex(m => m.id === moduleId);
        if (index < MODULE_DEFS.length - 1) {
            setActiveTab(MODULE_DEFS[index + 1].id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            onComplete();
        }
    }
};
```

---

## 🎨 LAYOUT GERAL DA AULA

### Container Principal

```tsx
<div className="space-y-8 pb-20 animate-in fade-in duration-500">
    <main className="container mx-auto px-6 py-4 max-w-6xl space-y-10">
        {/* Badge de conclusão (condicional) */}
        {/* <Tabs> wrapper */}
        {/* <StickyModuleNav /> */}
        {/* <TabsContent> para cada módulo */}
    </main>
</div>
```

> [!IMPORTANT]
> **Layout ENAP:** `max-w-6xl`, `px-6`, `py-4`. Nunca full-width.

### Ordem dos Elementos Raiz

1. **Badge de Conclusão** (condicional: `showCompletionBadge`)
2. **`<Tabs>`** wrapper
3. **`<StickyModuleNav />`** (navegação sticky entre módulos)
4. **`<TabsContent>`** para cada módulo

---

## 📐 ANATOMIA DE UM MÓDULO (Blueprint Inviolável)

Cada `<TabsContent>` segue esta sequência EXATA:

### Passo 1: Banner do Módulo

```tsx
<ModuleBanner 
    numero={1} 
    titulo="Verbo & Substantivo" 
    descricao="Descrição acadêmica/científica do conteúdo."
    gradiente="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700" 
/>
```

**Paleta de cores por progressão pedagógica:**
| Módulo | Gradiente | Variante |
|--------|-----------|----------|
| Base/Fundamentos | `from-emerald-600 via-teal-600 to-cyan-700` | `emerald` |
| Prática/Complexidade | `from-blue-600 via-indigo-600 to-sky-700` | `blue` / `indigo` |
| Síntese/Revisão | `from-violet-600 via-purple-600 to-fuchsia-700` | `violet` |

### Passo 2: Seções de Conteúdo (Cards `bg-card`)

Cada conceito é encapsulado em um card:

```tsx
<section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
    <ModuleSectionHeader index={1} title="Título da Seção" variant="indigo" />
    {/* Conteúdo da seção */}
</section>
```

> [!IMPORTANT]
> - **`ModuleSectionHeader`** é OBRIGATÓRIO para o título de toda seção. NUNCA use `<h2>` com badge manual.
> - **Numeração REINICIA** em cada módulo (1, 2, 3... e não continua do módulo anterior).
> - `variant` deve corresponder à cor do módulo (emerald, blue, indigo, violet, etc.).
> - Espaçamento entre seções: `space-y-16` no `TabsContent`.
> - Padding interno: `p-8 md:p-12`.

### Passo 3: Resumo com `LessonTabs`

**OBRIGATÓRIO ao final de cada módulo, ANTES do Quiz.** Substitui o antigo `CardCarousel` de resumo.

```tsx
<section className="space-y-16">
    <LessonTabs
        variant="indigo"       // Cor do módulo
        title="Resumo: [Tema do Módulo]"
        tabs={[
            {
                id: 'video',
                label: 'Vídeo Resumo',
                icon: LuVideo,
                content: (
                    <div className="max-w-4xl mx-auto w-full px-4 text-center space-y-6">
                        <div className="space-y-2">
                            <h4 className="text-2xl font-bold">Revisão Estratégica</h4>
                            <p className="text-muted-foreground">Assista à revisão em vídeo.</p>
                        </div>
                        <VideoModal videoId="ID" title="Título" duration="15 min" thumbnail="URL" />
                    </div>
                )
            },
            {
                id: 'audio',
                label: 'Áudio Revisão',
                icon: LuHeadphones,
                content: (
                    <div className="max-w-2xl mx-auto w-full px-6 py-12 text-center space-y-8">
                        <div className="space-y-3">
                            <h4 className="text-2xl font-bold">Podcast do Aprovado</h4>
                            <p className="text-muted-foreground">Ouça o resumo sempre que não puder ver a tela.</p>
                        </div>
                        <div className="bg-muted/50 p-8 rounded-3xl border border-border/50 shadow-inner">
                            <audio src="#" controls className="w-full" />
                        </div>
                    </div>
                )
            },
            {
                id: 'visual',
                label: 'Mapa Mental',
                icon: LuImage,
                content: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                        {/* Placeholders visuais com aspect-[4/3] */}
                    </div>
                )
            },
            {
                id: 'macete',
                label: 'Macete',
                icon: LuZap,
                content: (
                    <div className="max-w-3xl mx-auto p-12 text-center space-y-8 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 rounded-[40px] border border-yellow-500/20">
                        {/* Macete visual com ícone grande + texto destaque */}
                    </div>
                )
            }
        ]}
    />
</section>
```

> [!IMPORTANT]
> - As 4 abas são **OBRIGATÓRIAS**: Vídeo, Áudio, Mapa Mental, Macete.
> - A aba `macete` tem fundo temático com `rounded-[40px]` e ícone grande centralizado.
> - No último módulo, use `variant="violet"` para o resumo final.

### Passo 4: Quiz Interativo

```tsx
<section className="mt-16">
    <QuizInterativo 
        questoes={qModN} 
        titulo="Quiz — [Tema]" 
        icone="📝" 
        numero={N}   // 🔴 OBRIGATÓRIO: número sequencial ao conteúdo
        onComplete={(score) => handleModuleComplete('modulo-N', score)} 
    />
</section>
```

---

## 📝 QUIZ — Regras de Elaboração

### Pool de Questões por Módulo

Cada módulo tem seu PRÓPRIO pool separado fora do componente:

```tsx
const QUIZ_MOD1_POOL: QuizQuestion[] = [
    {
        id: 101, // IDs com prefixo do módulo (101-110 = mod1, 201-208 = mod2...)
        pergunta: "Em 'A broca **perfurou** o solo', o verbo está no:",
        opcoes: [
            { label: 'A', valor: "Pretérito Imperfeito do Indicativo" },
            { label: 'B', valor: "Pretérito Perfeito do Indicativo" },
            { label: 'C', valor: "Futuro do Pretérito" },
            { label: 'D', valor: "Presente do Indicativo" }
        ],
        correta: 'B',
        explicacao: "A ação está totalmente concluída no passado. Logo, é Pretérito Perfeito."
    },
    // ... mais questões
];
```

> [!IMPORTANT]
> **Regras Invioláveis dos Quizzes:**
> 1. **Mínimo 6 questões por pool**, com 6 selecionadas aleatoriamente: `getRandomQuestions(POOL, 6)`.
> 2. **Módulo final (laboratório):** 20 questões cruzando TODOS os tópicos: `getRandomQuestions(POOL_FINAL, 20)`.
> 3. **ZERO abreviaturas** nos enunciados e explicações. Escreva SEMPRE por extenso.
> 4. **Destaques visuais:** Quando pedir para identificar um termo, use `**negrito**` no enunciado da questão.
> 5. **Contexto Petrobras:** Use frases sobre plataformas, refino, segurança industrial.
> 6. **Coerência pedagógica:** NUNCA cobre conceitos que NÃO foram ensinados no módulo.
> 7. **Explicação OBRIGATÓRIA** na prop `explicacao`: deve justificar POR QUE a resposta está certa e POR QUE as erradas estão erradas.
> 8. **IDs prefixados** por módulo: 101-110 (mod1), 201-210 (mod2), 301-310 (mod3), etc.

---

## 🧩 COMPONENTES DE CONTEÚDO E QUANDO USAR

### `ContentAccordion` — Para Conteúdo Denso

**Quando:** Explicar regras, flexões verbais, classificações com mais de 2 parágrafos.

```tsx
<ContentAccordion 
    mode="stacked"          // 🔴 "stacked" = vertical, "carousel" = horizontal
    titulo="As 5 Flexões Verbais" 
    icone={<LuZap />} 
    corIndicador="bg-emerald-500" 
    defaultOpen={true}      // Primeiro item sempre aberto
    slidesPerView={1}       // 1 slide visível por vez
    slides={[
        {
            titulo: '1. Pessoa', 
            icone: '👤', 
            conteudo: (
                <div className="space-y-4">
                    <p className="text-muted-foreground">
                        <strong>Conceito:</strong> Explicação clara e direta.
                    </p>
                    <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 text-sm space-y-2">
                        {/* Exemplos práticos com frases */}
                    </div>
                </div>
            )
        },
        // ... mais slides
    ]} 
/>
```

> [!IMPORTANT]
> - Use `mode="stacked"` para conteúdo que precisa ser lido sequencialmente (regras, classificações).
> - Cada slide DEVE ter exemplo prático em frase. Teoria pura é PROIBIDO.
> - `corIndicador` deve seguir a cor temática do módulo.

### `CardCarousel` — Para Listas de Regras/Casos

**Quando:** Apresentar múltiplos casos (exceções, regras paralelas, vozes verbais) de forma horizontal.

```tsx
<CardCarousel 
    titulo="Verbos Impessoais — Regras" 
    subtitulo="Decore: impessoal = singular SEMPRE" 
    cards={[
        { 
            icone: <LuShield className="text-emerald-500" />, 
            titulo: "HAVER = Existir", 
            descricao: (
                <div className="space-y-2 text-sm">
                    <p>✅ "Havia muitos candidatos."</p>
                    <p>❌ "Haviam muitos candidatos."</p>
                    <p className="text-muted-foreground italic">Macete: troque por "existir".</p>
                </div>
            ) 
        },
        // ... mais cards
    ]} 
/>
```

> [!IMPORTANT]
> - `descricao` pode ser `string` ou `ReactNode` (JSX rico).
> - Use `itemsPerView={2}` ou `itemsPerView={3}` para controlar quantos cards visíveis.
> - Dentro do carousel, use ícones Lucide com cor semântica (emerald = positivo, rose = negativo, etc.).

### `FlipCard` — Para Conceitos Interativos (Pergunta/Resposta)

**Quando:** Derivação imprópria ("Efeito Rei Midas"), pares conceituais, transformações.

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <FlipCard
        frente={
            <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    Verbo
                </span>
                <LuArrowDown className="w-10 h-10 text-muted-foreground/40 animate-bounce" />
                <span className="font-bold text-2xl md:text-3xl text-foreground/90">
                    Substantivo
                </span>
            </div>
        }
        verso={
            <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-2">
                <div>
                    <p><strong>O cantar</strong> dos pássaros encanta.</p>
                    <p className="text-xs text-muted-foreground">(O = artigo + cantar = verbo)</p>
                </div>
                {/* Separador + mais exemplos */}
            </div>
        }
    />
</div>
```

> [!IMPORTANT]
> - **Mínimo 3 FlipCards** quando usados para exemplificação visual.
> - O `frente` deve ter gradiente de texto e seta animada (`animate-bounce`).
> - O `verso` deve ter exemplos concretos em frases.

### `TimelineItem` — Para Passos Sequenciais

**Quando:** Macete de resolução, estratégia passo-a-passo.

```tsx
<TimelineItem passo={1} titulo="Ache o verbo" descricao="Grife o verbo principal." />
<TimelineItem passo={2} titulo="Pergunte 'Quem?'" descricao="A resposta é o sujeito." />
<TimelineItem passo={3} titulo="Tem 'SE'?" descricao="VTD + SE = Passiva. VTI + SE = Indeterminação." />
<TimelineItem passo={4} titulo="É impessoal?" descricao="Haver, fazer (tempo) = singular SEMPRE." isLast />
```

> [!IMPORTANT]
> O último item DEVE ter `isLast={true}`.

### `AlertBox` — Para Destaques e Avisos

```tsx
<AlertBox tipo="info" titulo="Título do Alerta">
    Texto do alerta com <strong>destaques</strong>.
</AlertBox>
```

| `tipo` | Uso | Cor |
|--------|-----|-----|
| `info` | Dica do professor, contexto | Azul |
| `warning` | Pegadinha da banca, atenção | Amarelo |
| `danger` | Erro comum, armadilha | Vermelho |
| `success` | Macete memorável, acerto | Verde |

> [!IMPORTANT]
> **Toda AlertBox DEVE conter exemplo prático em frase.** Nunca use AlertBox apenas com texto teórico sem exemplificação.

---

## 🎨 REGRAS DE ESTILO (Refinamentos Consolidados)

### Contraste Light/Dark

- **NUNCA** use `gray-300`, `muted` diretamente que fiquem invisíveis no modo claro.
- **SEMPRE** use variantes `dark:` para garantir contraste dual.
- Padrão para cards de exemplo: `bg-emerald-500/10 border border-emerald-500/20`.

### Espaçamento (Padrão ENAP)

| Elemento | Valor |
|----------|-------|
| Container principal | `space-y-8` |
| Container `<main>` | `container mx-auto px-6 py-4 max-w-6xl space-y-10` |
| Dentro de `TabsContent` | `space-y-16 mt-6` |
| Padding de `<section>` | `p-8 md:p-12` |
| Espaço entre seções internas | `space-y-12` |

### Fontes

| Elemento | Tamanho |
|----------|---------|
| Corpo | `text-base md:text-lg` |
| `ModuleSectionHeader` | `text-3xl md:text-4xl` (auto pelo componente) |
| Badge numérico | `w-14 h-14 text-3xl` (auto pelo componente) |
| Sub-labels / callouts | `text-lg` |
| Texto de exemplo em card | `text-sm` |
| Texto explicativo muted | `text-muted-foreground leading-relaxed text-justify` |

### StickyModuleNav

- Layout de **DUAS linhas** (Label + Título) — NUNCA compacte.
- `py-3` no container — não reduzir.
- Tabs bloqueadas: `disabled:opacity-40 disabled:cursor-not-allowed` + 🔒.
- Tabs concluídas: ✓ verde.

---

## 🔎 DIRETRIZES DE CONTEÚDO PEDAGÓGICO

### Hierarquia Científica (OBRIGATÓRIO)

1. **Ciência primeiro:** Norma culta, definição formal (Bechara/Cunha), tabelas de classificação.
2. **Floreio depois:** Storytelling Petrobras, macetes, analogias.
3. **O Banner** deve ter descrição acadêmica/científica (ex: "Estudo sistemático das relações de dependência...").

### Zero Abreviaturas

- **ERRADO:** "O VTD pede OD."
- **CORRETO:** "O **Verbo Transitivo Direto** pede **Objeto Direto**."

### Tom de Voz

- Direta, ativa, encorajadora.
- Fale COM o aluno: "Você vai perceber...", "Anote isso..."
- Use contexto **Petrobras**: plataformas, refino, segurança, ética corporativa.

### Regra de Ouro da Exemplificação

> Toda explicação teórica DEVE ser validada por um exemplo em frase (Antes/Depois, Certo/Errado ou Aplicação Real). NUNCA gere teoria pura sem exemplificação textual.

---

## 📊 CHECKLIST FINAL DE QUALIDADE

Antes de considerar a aula pronta, verifique:

### Estrutura
- [ ] `MODULE_DEFS` definido com `as const`
- [ ] `StickyModuleNav` no topo (duas linhas, espaçoso)
- [ ] `ModuleBanner` em cada `TabsContent`
- [ ] `ModuleSectionHeader` em toda seção (numeração reiniciada por módulo)
- [ ] `LessonTabs` (4 abas: Vídeo, Áudio, Mapa, Macete) antes do Quiz em cada módulo
- [ ] `QuizInterativo` com `numero={N}` ao final de cada módulo
- [ ] Badge de conclusão no topo (condicional)

### Conteúdo
- [ ] Zero abreviaturas em TODO o texto
- [ ] Exemplos em frases em TODA explicação teórica
- [ ] Contexto Petrobras nos exemplos
- [ ] Destaques `**negrito**` nos termos analisados nas questões
- [ ] Explicações completas em cada questão de quiz
- [ ] Pool mínimo de 6 questões por módulo (20 no final)

### Visual
- [ ] Contraste dual (light + dark) testado
- [ ] Espaçamento ENAP respeitado (`max-w-6xl`, `p-8 md:p-12`)
- [ ] Cores por progressão pedagógica (emerald → blue/indigo → violet)
- [ ] `ContentAccordion` em `mode="stacked"` para conteúdo denso
- [ ] `CardCarousel` com ícones Lucide e descrições ricas
- [ ] `FlipCard` com mínimo 3 exemplos quando para conceitos
- [ ] `TimelineItem` com `isLast` no último item

### Integração Técnica
- [ ] Arquivo salvo em `src/components/aulas/Aula[Nome].tsx`
- [ ] Registrado em `src/data/conteudo.ts`
- [ ] Import dinâmico em `src/app/(dashboard)/aulas/[materia]/[topico]/page.tsx`
- [ ] Condição de roteamento adicionada no `return`

---

## ⚙️ PADRÃO DE DADOS ESTÁTICOS (Otimização)

Para conteúdo repetitivo como tabelas de conjugação, extraia para constantes FORA do componente:

```tsx
// Fora do componente principal:
const renderConj = (p1, p2, p3, p4, p5, p6, prefixo = '') => (
    <div className="text-base space-y-2 font-mono">
        {/* 6 pronomes com formatação alinhada */}
    </div>
);

const criarCard = (icone, titulo, conj, tipo = 'reg') => ({
    icone,
    titulo: <span>{titulo} {tipo === 'irreg' && <span className="text-[10px] badge">Irregular</span>}</span>,
    descricao: conj,
    corFundo: tipo === 'irreg' ? 'bg-red-500/5' : undefined
});

const CONJ_SLIDES = [
    { titulo: '1. Presente do Indicativo', icone: '🕒', conteudo: (
        <CardCarousel titulo="" itemsPerView={3} cards={[
            criarCard(i1, "Estudar", renderConj("estudo", "estudas", ...)),
            criarCard(iIr, "Ser", renderConj("sou", "és", ...), "irreg"),
        ]} />
    )},
    // ... mais tempos verbais
];
```

> [!IMPORTANT]
> Isso limpa o JSX principal e facilita manutenção. SEMPRE extraia arrays de dados estáticos para constantes no topo do arquivo.

---

## 🚫 PROIBIÇÕES ABSOLUTAS

| Proibido | Por quê | Alternativa |
|----------|---------|-------------|
| Hero Section com botão "Começar" | Padrão panfletário, descontinuado | `ModuleBanner` + `StickyModuleNav` |
| `<h2>` manual com badge | Inconsistência visual | `<ModuleSectionHeader />` |
| Texto corrido sem encapsulamento | Desengajante, sem indexação | `ContentAccordion` ou `CardCarousel` |
| Abreviaturas (VTD, OD, etc.) | Confunde aluno iniciante | Escreva por extenso |
| Quiz sobre conceito não ensinado | Frustra o aluno | Coerência pedagógica total |
| Numeral continuando entre módulos | Confusão de referência | Numeração reinicia em cada módulo |
| `CardCarousel` nos resumos | Substituído por sistema de abas | `LessonTabs` com 4 abas |
| Layout compacto no sticky nav | Prejudica legibilidade | 2 linhas, `py-3`, fontes grandes |
| Cores claras sem `dark:` | Invisível no modo claro | Variar com `dark:text-gray-300` etc. |
| Nome "Petrobras Quest" em branding | Descontinuado | Use **"A Vaga É Minha"** |

---

## 📋 RESUMO EXECUTIVO DAS ALTERAÇÕES FEITAS NA AULA

### Componentes

1. **`ModuleSectionHeader`** — Criado e padronizado. Substitui todo `<h2>` manual com badge numérico. Props: `index`, `title`, `variant`.
2. **`LessonTabs`** — Criado para substituir `CardCarousel` nos resumos. Sistema de 4 abas (Vídeo, Áudio, Mapa Mental, Macete) com variante de cor.
3. **`ContentAccordion mode="stacked"`** — Modo empilhado adicionado para conteúdo sequencial (flexões verbais, classificações).
4. **`StickyModuleNav`** — Restaurado para duas linhas com altura generosa. NUNCA compactar.
5. **`FlipCard`** — Tons de cinza suavizados no modo light (~50% mais leve).
6. **`CardCarousel`** — Refinado com `corFundo` por card e suporte a `descricao: ReactNode`.

### Conteúdo Pedagógico

1. **5 módulos** cobrindo as 10 classes gramaticais em pares lógicos.
2. **Conjugação verbal** em tabela visual com `renderConj()` cobrindo 9 tempos verbais, verbos regulares + irregulares.
3. **Verbos impessoais** com alertbox `danger` e cardcarousel de regras (Haver, Fazer, auxiliar + Haver, Existir ≠ Haver).
4. **Derivação Imprópria** ("Efeito Rei Midas") com 3 FlipCards (Verbo→Subst., Advérbio→Subst., Adjetivo→Subst.).
5. **Macete de Resolução** via `TimelineItem` com 4 passos estratégicos.
6. **Pool de 50+ questões** distribuídas por módulo com IDs prefixados + pool final de laboratório com 20 questões.
7. **Mnemônico "CIA P"** para classes invariáveis (Conjunção, Interjeição, Advérbio, Preposição).
8. **Tabela-resumo** das 10 classes na seção final do módulo 5 com cards colorizados.

### Design Visual

1. **Progressão cromática**: Indigo (M1) → Blue (M2) → Emerald (M3) → Amber (M4) → Violet (M5).
2. **Espaçamento ENAP**: `max-w-6xl`, `p-8 md:p-12`, `space-y-16` entre blocos.
3. **Contraste dual** verificado em toda a aula.
4. **Cards de conjugação**: tags "Irregular" em `bg-red-500/10`, ícones coloridos por conjugação (-ar = blue, -er = emerald, -ir = rose, irregular = amber).
