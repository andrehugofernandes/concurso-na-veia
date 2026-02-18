# 🎓 AULA COMPLETA - CONCORDÂNCIA VERBAL E NOMINAL (HTML V2.0)

---

## 🎨 PADRÕES DE INTERFACE (UI/UX) - ATUALIZADO
> [!IMPORTANT]
> **Padrões de Layout (Inspiração ENAP):** 
> 1. **Container principal:** `space-y-12` (respiração generosa entre blocos).
> 2. **Container da aula:** `max-w-6xl mx-auto`.
> 3. **Banner de Módulo:** Gradientes distintos para cada módulo.
>    - M1: `from-blue-600 via-indigo-600 to-violet-700`
>    - M2: `from-emerald-600 via-teal-600 to-cyan-700`
>    - M3: `from-violet-600 via-purple-600 to-indigo-700`
> 4. **Cards de Conteúdo:** `bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm`.
> 5. **Numeração de Seções:** Badge circular colorida com número (`w-12 h-12`).
> 6. **Interatividade:** Timeline, FlipCards, CompareSide, QuizInterativo.

## 📄 COMPONENTE REACT: AULA_CONCORDANCIA.TSX

```tsx
import { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from "@/components/ui/card";
import { 
    QuizQuestion, 
    getRandomQuestions, 
    AlertBox, 
    VideoModal, 
    ImageCarousel, 
    ProgressIndicator, 
    FlipCard, 
    QuizInterativo, 
    TimelineItem, 
    ComparisonSide, 
    ModuleBanner 
} from './shared';
// ... imports de ícones lucide-react

// ── DEFINIÇÃO DOS MÓDULOS ──
const MODULE_DEFS = [
    { id: 'modulo-1', label: 'Módulo 1', titulo: 'Concordância Verbal' },
    { id: 'modulo-2', label: 'Módulo 2', titulo: 'Concordância Nominal' },
    { id: 'modulo-3', label: 'Módulo 3', titulo: 'Prática e Estratégia' },
] as const;

const PROGRESS_PER_MODULE = Math.floor(100 / MODULE_DEFS.length);

export default function AulaConcordancia({
    onComplete,
    isCompleted,
    loading,
    xpGanho = 50,
    currentProgress,
    onUpdateProgress,
}: any) { // Tipagem simplificada para referência
    // State
    const [activeTab, setActiveTab] = useState('modulo-1');
    const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
    const [quizVerbalQuestions, setQuizVerbalQuestions] = useState<QuizQuestion[]>([]);
    const [quizNominalQuestions, setQuizNominalQuestions] = useState<QuizQuestion[]>([]);
    const [quizPraticoQuestions, setQuizPraticoQuestions] = useState<QuizQuestion[]>([]);

    // Load Effect (Simulado)
    useEffect(() => {
        // Randomização dos pools
        setQuizVerbalQuestions(getRandomQuestions(QUIZ_VERBAL_POOL, 10));
        setQuizNominalQuestions(getRandomQuestions(QUIZ_NOMINAL_POOL, 10));
        setQuizPraticoQuestions(getRandomQuestions(QUIZ_PRATICO_POOL, 10));

        // Load localStorage logic...
    }, []);

    const isModuleUnlocked = useCallback((moduleIndex: number) => {
        if (moduleIndex === 0) return true;
        const prevModuleId = MODULE_DEFS[moduleIndex - 1]?.id;
        return prevModuleId ? completedModules.has(prevModuleId) : false;
    }, [completedModules]);

    return (
        <div className="space-y-12 pb-20">
            <ProgressIndicator scrollProgress={0} />
            
            {/* ... Header ... */}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full mb-10 h-auto p-1.5 bg-muted/30 border border-border/50 rounded-2xl gap-2 shadow-inner grid-cols-1 md:grid-cols-3">
                    {MODULE_DEFS.map((mod, index) => (
                        <TabsTrigger
                            key={mod.id}
                            value={mod.id}
                            disabled={!isModuleUnlocked(index)}
                            className="..." // Estilos ENAP
                        >
                            {/* Conteúdo da Tab */}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* MÓDULO 1 */}
                <TabsContent value="modulo-1" className="space-y-16">
                    <ModuleBanner 
                        numero={1} 
                        titulo="Concordância Verbal" 
                        descricao="..." 
                        gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700"
                    />
                    
                    {/* Seção 1: Regra Geral */}
                    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                        <h2 className="...">1. A Regra de Ouro</h2>
                        <FlipCard 
                            frente={<div>Encontre o sujeito!</div>}
                            verso={<div>O verbo concorda com ele.</div>}
                        />
                    </section>

                    {/* Quiz Módulo 1 */}
                    <section>
                        <QuizInterativo 
                            questoes={quizVerbalQuestions}
                            onComplete={() => handleModuleComplete('modulo-1', 0)}
                        />
                    </section>
                </TabsContent>

                {/* MÓDULO 2 */}
                <TabsContent value="modulo-2" className="space-y-16">
                     <ModuleBanner 
                        numero={2} 
                        titulo="Concordância Nominal" 
                        descricao="..." 
                        gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
                    />
                    {/* Conteúdo Nominal (Adjetivos, Anexo, Bastante) */}
                </TabsContent>

                {/* MÓDULO 3 */}
                <TabsContent value="modulo-3" className="space-y-16">
                     <ModuleBanner 
                        numero={3} 
                        titulo="Prática e Estratégia" 
                        descricao="..." 
                        gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
                    />
                    {/* Timeline de Estratégia */}
                    <TimelineItem passo={1} titulo="Ache o Verbo" />
                    <TimelineItem passo={2} titulo="Quem?" />
                    
                    {/* Comparison Side */}
                    <section>
                        <div className="grid grid-cols-2">
                             <div>❌ Fazem dois anos</div>
                             <div>✅ Faz dois anos</div>
                        </div>
                    </section>
                </TabsContent>
            </Tabs>
        </div>
    )
}

// ── POOLS DE QUESTÕES ──
const QUIZ_VERBAL_POOL = [ ... ];
const QUIZ_NOMINAL_POOL = [ ... ];
const QUIZ_PRATICO_POOL = [ ... ];
```
