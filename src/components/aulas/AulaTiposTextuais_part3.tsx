
// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function AulaTiposTextuais({ onComplete, currentProgress, onUpdateProgress }: AulaProps) {
    const [activeTab, setActiveTab] = useState('modulo-1');
    const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

    const [qMod1, setQMod1] = useState<QuizQuestion[]>([]);
    const [qMod2, setQMod2] = useState<QuizQuestion[]>([]);
    const [qMod3, setQMod3] = useState<QuizQuestion[]>([]);
    const [qMod4, setQMod4] = useState<QuizQuestion[]>([]);
    const [qLab, setQLab] = useState<QuizQuestion[]>([]);

    useEffect(() => {
        setQMod1(getRandomQuestions(QUIZ_MOD1_POOL, 6));
        setQMod2(getRandomQuestions(QUIZ_MOD2_POOL, 6));
        setQMod3(getRandomQuestions(QUIZ_MOD3_POOL, 6));
        setQMod4(getRandomQuestions(QUIZ_MOD4_POOL, 6));
        setQLab(getRandomQuestions([...QUIZ_MOD1_POOL, ...QUIZ_MOD2_POOL, ...QUIZ_MOD3_POOL, ...QUIZ_MOD4_POOL, ...QUIZ_MOD5_POOL], 20));

        const saved = localStorage.getItem('aula_tipostextuais_progress');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.completedModules) {
                    setCompletedModules(new Set(parsed.completedModules));
                }
            } catch (e) {
                console.error('Erro ao ler progresso', e);
            }
        }
    }, []);

    const isModuleUnlocked = useCallback((moduleIndex: number) => {
        if (moduleIndex === 0) return true;
        const prevModuleId = MODULE_DEFS[moduleIndex - 1]?.id;
        return prevModuleId ? completedModules.has(prevModuleId) : false;
    }, [completedModules]);

    const handleModuleComplete = (moduleId: string, score: number) => {
        if (score >= 60) {
            const newSet = new Set(completedModules).add(moduleId);
            setCompletedModules(newSet);
            localStorage.setItem('aula_tipostextuais_progress', JSON.stringify({
                completedModules: Array.from(newSet)
            }));

            const index = MODULE_DEFS.findIndex(m => m.id === moduleId);
            if (index < MODULE_DEFS.length - 1) {
                setActiveTab(MODULE_DEFS[index + 1].id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                onComplete();
            }
        }
    };

    return (
        <div className="space-y-8 pb-20 animate-in fade-in duration-500">
            <main className="container mx-auto px-6 py-4 max-w-6xl space-y-10">

                <Tabs value={activeTab} onValueChange={(val) => {
                    const idx = MODULE_DEFS.findIndex(m => m.id === val);
                    if (isModuleUnlocked(idx)) setActiveTab(val);
                }} className="w-full">

                    <StickyModuleNav
                        modules={Array.from(MODULE_DEFS)}
                        activeTab={activeTab}
                        completedModules={completedModules}
                        isModuleUnlocked={isModuleUnlocked}
                    />

                    {/* =======================================================
                        MÓDULO 1: Narrativo & Descritivo
                    ======================================================= */}
                    <TabsContent value="modulo-1" className="space-y-16 mt-6 focus-visible:outline-none">
                        <ModuleBanner
                            numero={1}
                            titulo="Narrativo & Descritivo"
                            descricao="Estudo sistemático da evolução temporal (ação) contraposta à observação espacial (fotografia)."
                            gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
                        />

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={1} title="A Dinâmica da Narração" variant="emerald" />

                            <ContentAccordion
                                mode="stacked"
                                titulo="Elementos e Estrutura Narrativas"
                                icone={<LuBookOpen />}
                                corIndicador="bg-emerald-500"
                                defaultOpen={true}
                                slidesPerView={1}
                                slides={[
                                    {
                                        titulo: '1. O que é Narrar?', icone: '📖', conteudo: (
                                            <div className="space-y-4">
                                                <p className="text-muted-foreground"><strong>Conceito:</strong> Narrar é relatar uma sucessão de acontecimentos num determinado <strong>espaço</strong> e <strong>tempo</strong> (seja ele real ou cronológico). Exige mudança de estado: algo <em>era</em> de um jeito e <em>passou a ser</em> de outro.</p>
                                                <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 text-sm space-y-2">
                                                    <p>✅ <em>"Às 8h, o técnico apertou o botão de emergência. Imediatamente a válvula fechou e a sirene tocou."</em></p>
                                                    <p className="text-muted-foreground pt-2">Temos <strong>tempo</strong> (às 8h, imediatamente), <strong>personagem</strong> (técnico) e <strong>ação no passado</strong> (apertou, fechou, tocou), caracterizando clara mudança de estado.</p>
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        titulo: '2. Foco Narrativo', icone: '👀', conteudo: (
                                            <div className="space-y-4">
                                                <p className="text-muted-foreground"><strong>Conceito:</strong> É a perspectiva de quem conta a história (o narrador). Pode ser em 1ª Pessoa ou 3ª Pessoa.</p>
                                                <div className="space-y-3">
                                                    <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm">
                                                        <p className="font-bold text-emerald-700 dark:text-emerald-400">1ª Pessoa (Narrador Personagem)</p>
                                                        <p>Participa da história. A visão é parcia e subjetiva.</p>
                                                        <p className="mt-2 text-muted-foreground italic">"<strong>Eu notei</strong> que o manômetro tremia quando <strong>me aproximei</strong>."</p>
                                                    </div>
                                                    <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm">
                                                        <p className="font-bold text-emerald-700 dark:text-emerald-400">3ª Pessoa (Narrador Observador / Onisciente)</p>
                                                        <p>Não participa. Se for 'Observador', vê de fora. Se for 'Onisciente', sabe até os pensamentos.</p>
                                                        <p className="mt-2 text-muted-foreground italic">"Ele notou o vazamento, mas no fundo, <strong>sentia que a culpa era sua</strong>." (Onisciente)</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        titulo: '3. Tipos de Discurso', icone: '💬', conteudo: (
                                            <div className="space-y-4">
                                                <p className="text-muted-foreground">Como o narrador reproduz a fala ou pensamento da personagem.</p>
                                                <ul className="space-y-4">
                                                    <li className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm">
                                                        <strong>Discurso Direto:</strong> A própria personagem fala. (Usa verbo de elocução + aspas/travessão).<br />
                                                        <span className="text-muted-foreground italic">Ex: O gerente gritou: — Parem as máquinas!</span>
                                                    </li>
                                                    <li className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm">
                                                        <strong>Discurso Indireto:</strong> O narrador conta o que a personagem falou. (Usa conjunção integrante "que" ou "se").<br />
                                                        <span className="text-muted-foreground italic">Ex: O gerente gritou que eles parassem as máquinas.</span>
                                                    </li>
                                                    <li className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm border-l-4 border-l-emerald-500">
                                                        <strong>Discurso Indireto Livre:</strong> A mais cobrada! A fala/pensamento da personagem se confunde com a narração, sem verbo de elocução. Fundem-se narrador e personagem.<br />
                                                        <span className="text-muted-foreground italic">Ex: Ele olhava o painel soando o alarme. Meu Deus, o que eu faço agora? Onde está o supervisor?</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={2} title="O Quadro Estático: Descrição" variant="emerald" />

                            <AlertBox tipo="info" titulo="O Conceito Central">
                                Enquanto a narração é um "filme" (progressão temporal de ações), a <strong>descrição</strong> é uma "fotografia" (caracterização simultânea, sem tempo passando). Predominam verbos de estado (ser, estar, parecer) e muitos adjetivos.
                            </AlertBox>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                <FlipCard
                                    frente={
                                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                                            <span className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                                                Descrição Objetiva
                                            </span>
                                            <span className="text-muted-foreground mt-2">Foca na realidade visível.</span>
                                        </div>
                                    }
                                    verso={
                                        <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
                                            <p>Fiel à realidade, neutra, exata. Usa palavras no sentido denotativo. Muito comum em manuais técnicos.</p>
                                            <div className="bg-emerald-500/10 p-3 rounded text-left">
                                                <p className="italic text-muted-foreground">"A tubulação tem 30 polegadas de diâmetro externo, revestimento epóxi cinza-escuro e apresenta duas válvulas amarelas no topo."</p>
                                            </div>
                                        </div>
                                    }
                                />
                                <FlipCard
                                    frente={
                                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                                            <span className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                                Descrição Subjetiva
                                            </span>
                                            <span className="text-muted-foreground mt-2">Foca no "sentir" do narrador.</span>
                                        </div>
                                    }
                                    verso={
                                        <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
                                            <p>Passa pelo "filtro" da emoção de quem descreve. Usa linguagem conotativa e juízos de valor. Comum na literatura.</p>
                                            <div className="bg-teal-500/10 p-3 rounded text-left">
                                                <p className="italic text-muted-foreground">"A tubulação parecia um monstro cinzento e cansado, cujos braços amarelos no topo erguiam-se como súplicas ao teto opressivo."</p>
                                            </div>
                                        </div>
                                    }
                                />
                            </div>
                        </section>

                        <section className="space-y-16">
                            <LessonTabs
                                variant="emerald"
                                title="Resumo: Narrativo & Descritivo"
                                tabs={[
                                    {
                                        id: 'video', label: 'Vídeo Resumo', icon: LuVideo,
                                        content: (
                                            <div className="max-w-4xl mx-auto w-full px-4 text-center space-y-6">
                                                <div className="space-y-2">
                                                    <h4 className="text-2xl font-bold">Revisão Estratégica</h4>
                                                    <p className="text-muted-foreground">Diferencie Narração de Descrição sem pensar duas vezes.</p>
                                                </div>
                                                <VideoModal videoId="dQw4w9WgXcQ" title="Narração x Descrição" duration="12 min" thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" />
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'audio', label: 'Áudio Revisão', icon: LuHeadphones,
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
                                        id: 'visual', label: 'Mapa Mental', icon: LuImage,
                                        content: (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                                                <div className="aspect-[4/3] w-full bg-emerald-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-emerald-500/20 p-8">
                                                    <h5 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">Narrar é Ação</h5>
                                                    <p className="text-sm text-muted-foreground text-center">Tempo avança. Pretérito Perfeito manda.</p>
                                                </div>
                                                <div className="aspect-[4/3] w-full bg-teal-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-teal-500/20 p-8">
                                                    <h5 className="text-xl font-bold text-teal-700 dark:text-teal-400 mb-2">Descrever é Foto</h5>
                                                    <p className="text-sm text-muted-foreground text-center">Tempo pára. Pretérito Imperfeito e Verbos de Ligação dominam.</p>
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'macete', label: 'Macete', icon: LuZap,
                                        content: (
                                            <div className="max-w-3xl mx-auto p-12 text-center space-y-8 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 rounded-[40px] border border-yellow-500/20">
                                                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                    <LuEye className="w-10 h-10 text-yellow-600" />
                                                </div>
                                                <h4 className="text-2xl font-bold text-amber-700">A Prova do Vídeo</h4>
                                                <p className="text-lg text-muted-foreground">
                                                    "Se ao imaginar a cena você se vê apertando <strong>▶ PLAY</strong> (há movimento e ação se desenrolando), é <strong>Narração</strong>. Se você precisou apertar <strong>⏸ PAUSE</strong> para observar detalhes (cor, tamanho, do que é feito), é <strong>Descrição</strong>!"
                                                </p>
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </section>

                        <section className="mt-16">
                            <QuizInterativo questoes={qMod1} titulo="Quiz — Narrar e Descrever" icone="📝" numero={3} onComplete={(score) => handleModuleComplete('modulo-1', score)} />
                        </section>
                    </TabsContent>
