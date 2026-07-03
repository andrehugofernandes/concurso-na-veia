# 🏆 GUIA MESTRE DE CRIAÇÃO DE AULAS PREMIUM — PETROBRAS QUEST

Este guia serve como a especificação técnica e pedagógica definitiva (Super Prompt) para a geração de novos componentes de aula no **Petrobras Quest**. Siga estas diretrizes de ponta a ponta para construir aulas que unam estética visual espetacular, conformidade com TypeScript e preparação direcionada para a banca **CESGRANRIO**.

---

## 📖 1. DIRETRIZ PEDAGÓGICA (Framework C.E.D.E.A)

Cada um dos **10 módulos** obrigatórios de uma aula deve iniciar com uma seção introdutória densa de **pelo menos 10 parágrafos** no formato **C.E.D.E.A** (mínimo de 2 parágrafos por letra/pilar):

| Parágrafos   | Pilar            | Objetivo Didático                                                                        | Exemplo de Foco                                              |
| :----------- | :--------------- | :--------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| **1º e 2º**  | **C**ontexto     | Situar o conceito no universo da disciplina e justificar sua importância para concursos. | Relevância no edital e estatísticas da banca.                |
| **3º e 4º**  | **E**xplicação   | Detalhar cientificamente o mecanismo, regra teórica ou fórmula com rigor.                | Termos técnicos destacados em `<strong>`.                    |
| **5º e 6º**  | **D**emonstração | Exibir contrastes claros de aplicação prática (Certo vs. Errado).                        | Exemplos de sentenças gramaticais ou resoluções matemáticas. |
| **7º e 8º**  | **E**xpansão     | Apresentar exceções, nuances de alto nível ou conexões com outros tópicos.               | Casos em que a regra geral falha ou se flexibiliza.          |
| **9º e 10º** | **A**plicação    | Instruir diretamente como a banca **CESGRANRIO** explora e arma pegadinhas sobre o tema. | "O que a banca quer que você confunda".                      |

### Regras de Escrita:

- **Tom**: Treinamento operacional técnico de elite, mantendo a formalidade e evitando coloquialismo.
- **Tamanho**: Mínimo de 3 linhas densas por parágrafo.
- **Wrapper HTML obrigatório**:
  ```tsx
  <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
    <p>
      parágrafo 1...
    </p>
    <p>
      parágrafo 2...
    </p>
    <p>
      parágrafo 3...
    </p>
    <p>
      parágrafo 4...
    </p>
    <p>
      parágrafo 5...
    </p>
    <p>
      parágrafo 6...
    </p>
    <p>
      parágrafo 7...
    </p>
    <p>
      parágrafo 8...
    </p>
    <p>
      parágrafo 9...
    </p>
    <p>
      parágrafo 10...
    </p>
  </div>
  ```

---

## 🎨 2. SISTEMA DE DESIGN & CORES POR CONTEXTO

Não utilize classes genéricas de cor (como `bg-primary/10`). O Petrobras Quest exige cores semânticas e consistentes com o contexto didático do módulo:

| Contexto Didático                   | Cores Recomendadas (Tailwind) |
| :---------------------------------- | :---------------------------- |
| **Regras Gerais / Positivas**       | `emerald` / `teal` / `cyan`   |
| **Alertas / Proibições / Exceções** | `red` / `amber` / `orange`    |
| **Estruturas Técnicas / Métodos**   | `blue` / `indigo` / `slate`   |
| **Cenários Facultativos / Dúvidas** | `yellow` / `amber` / `lime`   |
| **Revisão e Consolidação Final**    | `slate` / `emerald` / `blue`  |

---

## 🧩 3. COMPONENTES DIDÁTICOS DE INTERAÇÃO (shared.tsx)

Todos os componentes interativos são importados de `../shared` (ou `@/components/aulas/shared`).

### A. ModuleBanner (Banner de Introdução do Módulo)

Fica no topo de cada aba de módulo. Utiliza variantes de cor automáticas baseadas no index (via `getModuleVariant(numero)`).

```tsx
<ModuleBanner
  numero={1}
  titulo="Nome do Módulo"
  descricao="Breve resumo da meta de aprendizado do módulo."
  gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700"
/>
```

### B. ModuleSectionHeader (Cabeçalho da Seção)

Utilizado para organizar as seções dentro do módulo.

- **Na Introdução (Seção C.E.D.E.A)**: Use obrigatoriamente `index="INTRO"`.
- **Nas Seções Teóricas/Práticas**: Use índices numéricos `index={1}`, `index={2}`, etc.

```tsx
<ModuleSectionHeader
  index="INTRO"
  title="Introdução Estratégica"
  variant="indigo"
/>
```

### C. ContentAccordion (Acordeão de Teoria)

Para detalhar os tópicos passo a passo. Sempre utilize a prop `mode="stacked"`.

```tsx
<ContentAccordion
  mode="stacked"
  slides={[
    {
      title: "1. Tópico Inicial",
      content: "Explicação formal...",
      visual: <div className="p-4 bg-muted rounded-xl">Exemplo Visual</div>,
    },
  ]}
/>
```

### D. FlipCard Premium (Cartões de Memorização)

Todos os FlipCards devem usar exclusivamente ícones Lucide (importados de `lucide-react` ou `react-icons/lu`), com a cor temática e header no verso.

```tsx
<FlipCard
  frente={
    <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
      <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
        <LuCheckCircle className="w-12 h-12 text-emerald-500" />
      </div>
      <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
        Caso Geral
      </span>
      <span className="text-sm text-emerald-500/80 font-medium">
        Regra Principal
      </span>
    </div>
  }
  verso={
    <div className="space-y-4 p-4 flex flex-col justify-center h-full">
      <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
        <LuCheck className="w-5 h-5 shrink-0" />
        <span className="tracking-widest uppercase text-xs">Regra de Ouro</span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Definição detalhada do caso.
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        ✅ "Exemplo correto em <strong>destaque</strong>."
      </p>
    </div>
  }
  categoria="Gramática Aplicada"
/>
```

### E. ModuleConsolidation (Mesa de Revisão Multimídia)

Seção obrigatória de encerramento de cada módulo (antes do Quiz). Consiga fixação com Vídeo, Áudio e Síntese Estratégica.

> [!TIP]
> **EXCEÇÃO DO MACETE VISUAL**: Diferente dos FlipCards, o campo `sinteseEstrategica` (Macete Visual) **incentiva** o uso de emojis de alto impacto (tamanho `text-6xl`, animações) para criar âncoras mnemônicas poderosas. O objetivo aqui é o "impacto visual imediato".

> ⚠️ **ATENÇÃO:** O campo de macete visual foi refatorado e deve usar exclusivamente a propriedade `sinteseEstrategica` (nunca o legado `maceteVisual`).

```tsx
<ModuleConsolidation
  index={1}
  variant="indigo"
  video={{
    videoId: "CODIGO_YOUTUBE",
    title: "Revisão Rápida do Módulo",
    duration: "3:45",
  }}
  resumoVisual={{
    moduloNome: "Nome do Módulo",
    tituloAula: "Título da Aula",
    materia: "Matéria",
    images: [
      {
        title: "Esquema Resumo",
        type: "infografico",
        placeholderColor: "from-blue-500/20 to-indigo-500/20",
        imageUrl: "/images/aulas/resumo-m1.png",
      },
    ],
  }}
  sinteseEstrategica={{
    title: "Mnemônico de Prova",
    content: (
      <div className="space-y-3">
        <p className="text-sm">Gatilho de memorização:</p>
        <div className="p-4 bg-indigo-500/10 rounded-lg font-mono text-center text-indigo-500 font-bold">
          BI-ZU-DE-PRO-VA
        </div>
      </div>
    ),
  }}
  audio={{
    audioUrl: "https://exemplo.com/audio.mp3",
    titulo: "Podcast de Fixação",
    artista: "Professor Avatar",
  }}
/>
```

### F. QuizInterativo (Quiz do Módulo)

Fica ao final de cada módulo. Importa o pool de questões de um arquivo de dados local para manter o arquivo `.tsx` limpo.

```tsx
<QuizInterativo
  questoes={QUIZ_M1_TOPICO}
  titulo="Pratique e Valide"
  numero={1}
  onComplete={(score) => handleModuleComplete("modulo-1", score)}
/>
```

---

## 🚀 4. ANATOMIA DE UMA AULA COMPLETA (BOILERPLATE)

### A. Arquivo de Quizzes (`src/components/aulas/[materia]/data/[topico]-quizzes.ts`)

```typescript
import { QuizQuestion } from "../../shared";

export const QUIZ_M1_TOPICO: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "Questão clássica da CESGRANRIO contendo cenário industrial...",
    opcoes: [
      { label: "A", valor: "Opção A incorreta" },
      { label: "B", valor: "Opção B correta" },
    ],
    correta: "B",
    explicacao: "A alternativa B está correta porque...",
  },
];

export const QUIZ_M2_TOPICO: QuizQuestion[] = [
  /* ... */
];
// Repita para os 10 módulos
```

### B. Arquivo da Aula (`src/components/aulas/[materia]/Aula[Nome].tsx`)

```tsx
"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { LuBookOpen } from "react-icons/lu";
import {
  AlertBox, QuizInterativo, ModuleBanner, AulaProps,
  ContentAccordion, AulaTemplate, ModuleSectionHeader,
  FlipCard, CardCarousel, ModuleConsolidation
} from "../shared";

// Quizzes locais
import { QUIZ_M1_TOPICO, QUIZ_M2_TOPICO } from "./data/[topico]-quizzes";

export default function Aula[Nome]({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress,
  onUpdateProgress,
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Teoria e Fundamentos" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Aplicações Práticas" },
    // Adicione exatamente os 10 módulos aqui...
  ];

  const totalModulos = MODULE_DEFS.length;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) { // Mínimo de 70% de aproveitamento
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });

      const idx = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      const novoProgresso = Math.round(((idx + 1) / totalModulos) * 100);
      onUpdateProgress?.(novoProgresso);

      // Transição automática para o próximo módulo após 1.5s
      if (idx < totalModulos - 1) {
        setTimeout(() => {
          setActiveTab(MODULE_DEFS[idx + 1].id);
        }, 1500);
      }
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * totalModulos);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress, totalModulos]);

  return (
    <div className="w-full">
      <AulaTemplate
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedModules={completedModules}
        moduleDefs={MODULE_DEFS}
        currentProgress={currentProgress}
        materiaId={materiaId}
        materiaNome={materiaNome}
        materiaCor={materiaCor}
        titulo={titulo}
        descricao={descricao}
        duracao={duracao}
        prevTopico={prevTopico}
        nextTopico={nextTopico}
        showCompletionBadge={showCompletionBadge}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {MODULE_DEFS.map((modulo, mIdx) => (
            <TabsContent key={modulo.id} value={modulo.id} className="space-y-16">
              <ModuleBanner
                numero={mIdx + 1}
                titulo={modulo.titulo}
                descricao={`Domine os conceitos e pegadinhas de ${modulo.titulo}.`}
                gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700"
              />

              {/* Seção 1: INTRO (C.E.D.E.A) */}
              <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
                <ModuleSectionHeader index="INTRO" title="Introdução Direcionada" variant="indigo" />
                <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
                  <p><strong>[Contexto]</strong> parágrafo 1...</p>
                  <p><strong>[Explicação]</strong> parágrafo 2...</p>
                  <p><strong>[Demonstração]</strong> parágrafo 3...</p>
                  <p><strong>[Expansão]</strong> parágrafo 4...</p>
                  <p><strong>[Aplicação]</strong> parágrafo 5...</p>
                </div>
              </section>

              {/* Seção 2: Teoria Interativa */}
              <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                <ModuleSectionHeader index={1} title="Detalhamento Técnico" variant="indigo" />
                <ContentAccordion
                  mode="stacked"
                  slides={[
                    {
                      title: "Regra Fundamental",
                      content: "Definição detalhada do conceito...",
                      visual: (
                        <div className="p-5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                          Fórmula ou Esquema Explicativo
                        </div>
                      )
                    }
                  ]}
                />
              </section>

              {/* Seção 3: Cartões de Fixação */}
              <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                <ModuleSectionHeader index={2} title="Cardápio de Memorização" variant="indigo" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FlipCard
                    frente={
                      <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                        <div className="p-4 bg-indigo-500/10 rounded-full">
                          <LuBookOpen className="w-12 h-12 text-indigo-500" />
                        </div>
                        <span className="text-lg font-bold uppercase tracking-tight text-foreground">Atenção</span>
                      </div>
                    }
                    verso={
                      <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                        <p className="text-sm text-muted-foreground">Explicação rápida do verso...</p>
                      </div>
                    }
                    categoria="Fixação Rápida"
                  />
                </div>
              </section>

              {/* Seção 4: Consolidação Multimídia */}
              <ModuleConsolidation
                index={mIdx + 1}
                variant="indigo"
                video={{
                  videoId: "exemplo_video",
                  title: `Vídeo de Revisão: ${modulo.titulo}`,
                  duration: "5:00"
                }}
                resumoVisual={{
                  moduloNome: modulo.titulo,
                  tituloAula: titulo || "",
                  materia: materiaNome || "",
                  images: []
                }}
                sinteseEstrategica={{
                  title: "Resumo do Módulo",
                  content: <p className="text-sm">Resumo estratégico do módulo aqui.</p>
                }}
              />

              {/* Seção 5: Quiz */}
              <section id={`quiz-${modulo.id}`} className="space-y-6">
                <QuizInterativo
                  questoes={mIdx === 0 ? QUIZ_M1_TOPICO : QUIZ_M2_TOPICO /* Mapeie cada módulo com seu respectivo quiz */}
                  titulo="Desafio de Módulo"
                  numero={mIdx + 1}
                  onComplete={(score) => handleModuleComplete(modulo.id, score)}
                />
              </section>
            </TabsContent>
          ))}

          {/* Módulo Conclusivo com Botão Final */}
          {completedModules.size === totalModulos && (
            <div className="mt-12 mb-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-2xl p-10 text-center space-y-6 max-w-4xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold text-foreground">🎉 Parabéns! Você concluiu toda a teoria!</h3>
              <p className="text-muted-foreground">Marque como concluída para registrar no seu histórico.</p>
              <Button
                size="lg"
                onClick={() => {
                  setShowCompletionBadge(true);
                  if (onComplete) onComplete();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg px-10 py-6 rounded-full"
              >
                Concluir Aula (+{xpGanho} XP)
              </Button>
            </div>
          )}
        </Tabs>
      </AulaTemplate>
    </div>
  );
}
```

---

## 🔗 5. FLUXO DE REGISTRO E ROTEAMENTO DA NOVA AULA

Para que a nova aula seja reconhecida no sistema, siga estritamente estas etapas:

1. **Adicionar Metadados no Conteúdo**:
   Abra `src/data/conteudo.ts` e associe o novo `topicoId` à rota e ao título correto.

2. **Configurar o Roteamento Dinâmico**:
   Abra `src/app/(dashboard)/aulas/[materia]/[topico]/page.tsx`:
   - Adicione o import dinâmico com Next.js `dynamic` para a nova aula (evitando carregamento desnecessário de bundle):
     ```tsx
     const Aula[Nome] = dynamic<AulaProps>(
       () => import('@/components/aulas/[materia]/Aula[Nome]'),
       { ssr: false, loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" /> }
     );
     ```
   - No bloco de renderização do componente `AulasPage`, adicione a rota correspondente:
     ```tsx
     ) : materiaId === '[id_materia]' && topicoId === '[id_topico]' ? (
       <Aula[Nome]
         onComplete={handleCompleteAula}
         isCompleted={isCompleted}
         loading={loading}
         xpGanho={xpGanho}
         currentProgress={progress}
         onUpdateProgress={updateProgress}
         titulo={topico.titulo}
         descricao={topico.descricao}
         duracao={topico.duracao}
         materiaNome={materia.nome}
         materiaCor={materia.cor}
         materiaId={materiaId}
         prevTopico={prevTopico}
         nextTopico={nextTopico}
       />
     ```

---

## 🚫 6. LISTA DE ANTI-PATTERNS (O QUE NÃO FAZER)

- **NÃO** use emojis em FlipCards. Use obrigatoriamente ícones Lucide.
- **NÃO** adote a propriedade legada `maceteVisual` em `ModuleConsolidation`. Use exclusivamente `sinteseEstrategica`.
- **NÃO** crie menos de 10 módulos em aulas de alta complexidade. A consistência de módulos garante que o aluno cumpra a trilha completa do edital.
- **NÃO** importe componentes usando referências absolutas ou de pastas externas ao diretório da aula (como `from "./shared"`). Use a referência correta de import: `from "../shared"`.
