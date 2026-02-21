
{/* =======================================================
                        MÓDULO 2: Dissertativo
                    ======================================================= */}
<TabsContent value="modulo-2" className="space-y-16 mt-6 focus-visible:outline-none">
    <ModuleBanner
        numero={2}
        titulo="Dissertativo"
        descricao="A arte de expor a realidade e usar argumentos lógicos para convencer o leitor."
        gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-700"
    />

    <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
        <ModuleSectionHeader index={1} title="Expor vs. Argumentar" variant="blue" />

        <AlertBox tipo="warning" titulo="O Ponto de Virada">
            O erro número 1 em provas de Interpretação da CESGRANRIO é confundir a Dissertação <strong>Expositiva</strong> (foco na isenção) com a Dissertação <strong>Argumentativa</strong> (foco na defesa da tese). A banca testará seu discernimento sobre isso.
        </AlertBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <FlipCard
                frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                        <span className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                            Dissertar = Expor
                        </span>
                        <span className="text-muted-foreground mt-2">Apenas informar (Apresentador de Telejornal)</span>
                    </div>
                }
                verso={
                    <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
                        <p>Apresenta fatos, teorias, dados, de modo neutro e impessoal. Não tenta mudar sua opinião, apenas acrescenta conhecimento.</p>
                        <div className="bg-blue-500/10 p-3 rounded text-left">
                            <p className="italic text-muted-foreground">"A perfuração em águas ultraprofundas começou em 2006, atingindo 7 mil metros de profundidade com navios-sonda de posicionamento dinâmico."</p>
                        </div>
                    </div>
                }
            />
            <FlipCard
                frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                        <span className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
                            Dissertar = Argumentar
                        </span>
                        <span className="text-muted-foreground mt-2">Defender ideia (Advogado de Defesa)</span>
                    </div>
                }
                verso={
                    <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
                        <p>Apresenta um posicionamento pessoal (Tese) e tenta persuadir o leitor usando provas, causas/consequências e exemplos.</p>
                        <div className="bg-indigo-500/10 p-3 rounded text-left">
                            <p className="italic text-muted-foreground">"É inegável que a tecnologia de águas rasas está obsoleta e, portanto, investir nela atualmente é um erro estratégico imenso para qualquer petroleira."</p>
                        </div>
                    </div>
                }
            />
        </div>
    </section>

    <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
        <ModuleSectionHeader index={2} title="A Estrutura do Texto Argumentativo" variant="blue" />

        <ContentAccordion
            mode="stacked"
            titulo="Os Três Pilares da Persuasão"
            icone={<LuFileText />}
            corIndicador="bg-blue-500"
            defaultOpen={true}
            slidesPerView={1}
            slides={[
                {
                    titulo: '1. A Tese (Introdução)', icone: '🎯', conteudo: (
                        <div className="space-y-4">
                            <p className="text-muted-foreground"><strong>Conceito:</strong> É a ideia central, o posicionamento, a espinha dorsal de todo o discurso. Todo o texto existirá apenas para provar que a Tese é verdadeira.</p>
                            <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/20 text-sm space-y-2">
                                <p>✅ <em>"A falta de investimento na reciclagem preventiva nos pólos industriais <strong>condena a empresa a prejuízos irreversíveis</strong>."</em></p>
                                <p className="text-muted-foreground pt-2">A expressão valorativa ("condena", "irreversíveis") não é um fato matemático puro, mas uma opinião rigorosa sendo plantada para debate.</p>
                            </div>
                        </div>
                    )
                },
                {
                    titulo: '2. Os Argumentos (Desenvolvimento)', icone: '⚖️', conteudo: (
                        <div className="space-y-4">
                            <p className="text-muted-foreground">São as provas utilizadas para validar a tese. A CESGRANRIO gosta de cobrar quais <strong>tipos de argumento</strong> foram usados num parágrafo.</p>
                            <ul className="space-y-4">
                                <li className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-sm">
                                    <strong>Autoridade:</strong> "Como atesta o relatório do IBAMA de 2025, os vazamentos..." (Citar especialista/órgão).
                                </li>
                                <li className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-sm">
                                    <strong>Exemplificação:</strong> "...isso já ocorreu antes, a exemplo do desastre no terminal X ocorrido na década passada..."
                                </li>
                                <li className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-sm">
                                    <strong>Causa e Consequência:</strong> "As tubulações não foram limpas (causa), culminando na pressão máxima (consequência)."
                                </li>
                            </ul>
                        </div>
                    )
                },
                {
                    titulo: '3. Conclusão', icone: '🏁', conteudo: (
                        <div className="space-y-4">
                            <p className="text-muted-foreground">Não se adiciona teoria nova. O autor retoma a tese inicial, amarra as ideias e geralmente faz um fechamento crítico (ou apresenta uma solução/proposta de intervenção).</p>
                        </div>
                    )
                }
            ]}
        />
    </section>

    <section className="space-y-16">
        <LessonTabs
            variant="blue"
            title="Resumo: O Tipo Dissertativo"
            tabs={[
                {
                    id: 'video', label: 'Vídeo Resumo', icon: LuVideo,
                    content: (
                        <div className="max-w-4xl mx-auto w-full px-4 text-center space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-2xl font-bold">Resumo: Dissertar</h4>
                            </div>
                            <VideoModal videoId="dQw4w9WgXcQ" title="Dissertação: Expor x Argumentar" duration="15 min" thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" />
                        </div>
                    )
                },
                {
                    id: 'audio', label: 'Áudio Revisão', icon: LuHeadphones,
                    content: (
                        <div className="max-w-2xl mx-auto w-full px-6 py-12 text-center space-y-8">
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
                            <div className="aspect-[4/3] w-full bg-blue-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-blue-500/20 p-8">
                                <h5 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">Expor</h5>
                                <p className="text-sm text-muted-foreground text-center">Fatos, Conceitos, Dados, Ausência quase total de "Eu".</p>
                            </div>
                            <div className="aspect-[4/3] w-full bg-indigo-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-indigo-500/20 p-8">
                                <h5 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">Argumentar</h5>
                                <p className="text-sm text-muted-foreground text-center">Opinião, Tese, Por Quês, Objetivo final: Convencer o outro.</p>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'macete', label: 'Macete', icon: LuZap,
                    content: (
                        <div className="max-w-3xl mx-auto p-12 text-center space-y-8 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 rounded-[40px] border border-yellow-500/20">
                            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <LuZap className="w-10 h-10 text-yellow-600" />
                            </div>
                            <h4 className="text-2xl font-bold text-amber-700">A Busca pela Culpa</h4>
                            <p className="text-lg text-muted-foreground">
                                "Para saber se o texto na prova é <strong>expositivo</strong> (apenas informa) ou <strong>argumentativo</strong> (defende ideia), procure pelos <strong>adjetivos opinativos</strong> e por quem o autor <strong>culpa</strong>. Se o texto diz 'Houve vazamento...', foca no <strong>FATO</strong> (expositivo). Se diz 'O lamentável vazamento decorreu de grave negligência...', foca no <strong>JULGAMENTO</strong> (argumentativo)."
                            </p>
                        </div>
                    )
                }
            ]}
        />
    </section>

    <section className="mt-16">
        <QuizInterativo questoes={qMod2} titulo="Quiz — Dissertação" icone="🎓" numero={3} onComplete={(score) => handleModuleComplete('modulo-2', score)} />
    </section>
</TabsContent>

{/* =======================================================
                        MÓDULO 3: Injuntivo e Dialogal
                    ======================================================= */}
<TabsContent value="modulo-3" className="space-y-16 mt-6 focus-visible:outline-none">
    <ModuleBanner
        numero={3}
        titulo="Injuntivo & Dialogal"
        descricao="A técnica das instruções, manuais, procedimentos normativos industriais e do diálogo."
        gradiente="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700"
    />

    <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
        <ModuleSectionHeader index={1} title="Tipo Injuntivo (Instrucional)" variant="indigo" />

        <AlertBox tipo="success" titulo="Muito comum num ambiente operacional">
            Para quem faz concurso Petrobras ou Transpetro, os textos que regulamentam a área (Normas NR, Procedimentos de Operação Padrão - POP, Manuais de Ferramentas) são predominantemente do tipo <strong>Injuntivo</strong>.
        </AlertBox>

        <CardCarousel
            titulo="Características da Injunção"
            subtitulo="O texto que altera comportamentos"
            cards={[
                {
                    icone: <LuAlertTriangle className="text-indigo-500" />,
                    titulo: "Objetivo Final",
                    descricao: (
                        <div className="space-y-2 text-sm">
                            <p>Instruir, ordenar, aconselhar ou modificar o comportamento do receptor da mensagem externa.</p>
                        </div>
                    )
                },
                {
                    icone: <LuCheck className="text-indigo-500" />,
                    titulo: "A Marca do Imperativo",
                    descricao: (
                        <div className="space-y-2 text-sm">
                            <p>O <strong>Verbo no Imperativo</strong> (Faça, Desligue, Mantenha) é o grande rastro deste tipo. Também se aceita o infinitivo impessoal (Desligar, Manter).</p>
                        </div>
                    )
                },
                {
                    icone: <LuBookOpen className="text-indigo-500" />,
                    titulo: "Gêneros Associados",
                    descricao: (
                        <div className="space-y-2 text-sm">
                            <p>Manuais, Manuais de calibração, Regimentos, Receitas, Editais de concurso, Bulas.</p>
                        </div>
                    )
                }
            ]}
        />
    </section>

    <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
        <ModuleSectionHeader index={2} title="Tipo Dialogal (Conversacional)" variant="indigo" />

        <ContentAccordion
            mode="stacked"
            titulo="A Troca de Turnos"
            icone={<LuMessageCircle />}
            corIndicador="bg-indigo-500"
            defaultOpen={true}
            slidesPerView={1}
            slides={[
                {
                    titulo: 'A Dança da Comunicação Direta', icone: '🗨️', conteudo: (
                        <div className="space-y-4">
                            <p className="text-muted-foreground">O tipo <strong>dialogal</strong> baseia-se na troca sucessiva de "turnos de fala" (quem fala e quem escuta invertem os papéis constantemente). É a transcrição da interação.</p>
                            <div className="bg-indigo-500/10 p-5 rounded-xl border border-indigo-500/20 text-sm space-y-2">
                                <p>— Você isolou a válvula três?</p>
                                <p>— Sim, senhor. A pressão zerou às quatorze.</p>
                                <p>— Perfeito. Iniciaremos o expurgo.</p>
                            </div>
                            <p className="text-muted-foreground text-sm pt-2">Na interpretação cesgranrio, a conversa transcrita (entrevista, peça de teatro) constitui este tipo autônomo. É repleto de <strong>tópicos e interrupções</strong>.</p>
                        </div>
                    )
                }
            ]}
        />
    </section>

    <section className="space-y-16">
        <LessonTabs
            variant="indigo"
            title="Resumo: Injunção e Diálogo"
            tabs={[
                {
                    id: 'video', label: 'Vídeo Resumo', icon: LuVideo,
                    content: (
                        <div className="max-w-4xl mx-auto w-full px-4 text-center space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-2xl font-bold">O Texto da Ação Direta</h4>
                            </div>
                            <VideoModal videoId="dQw4w9WgXcQ" title="Tipos Textuais" duration="15 min" thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" />
                        </div>
                    )
                },
                {
                    id: 'audio', label: 'Áudio Revisão', icon: LuHeadphones,
                    content: (
                        <div className="max-w-2xl mx-auto w-full px-6 py-12 text-center space-y-8">
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
                            <div className="aspect-[4/3] w-full bg-indigo-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-indigo-500/20 p-8">
                                <h5 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">Injunção</h5>
                                <p className="text-sm text-muted-foreground text-center">Modo Imperativo + Manual/Regra.</p>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'macete', label: 'Macete', icon: LuZap,
                    content: (
                        <div className="max-w-3xl mx-auto p-12 text-center space-y-8 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 rounded-[40px] border border-yellow-500/20">
                            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <LuShield className="w-10 h-10 text-yellow-600" />
                            </div>
                            <h4 className="text-2xl font-bold text-amber-700">Identificando o Imperativo (Ordem)</h4>
                            <p className="text-lg text-muted-foreground">
                                "A prova trará um texto híbrido. Leia as sentenças, mesmo se houver explicações de como algo funciona, procure pelos verbos 'Ligue', 'Aplique', 'Cuidado', 'Descreva', 'Subscreva'. Dois a três desses e já tem tipologia Injuntiva puxando a rédea."
                            </p>
                        </div>
                    )
                }
            ]}
        />
    </section>

    <section className="mt-16">
        <QuizInterativo questoes={qMod3} titulo="Quiz — Injunção" icone="📋" numero={3} onComplete={(score) => handleModuleComplete('modulo-3', score)} />
    </section>
</TabsContent>
