
{/* =======================================================
                        MÓDULO 4: Gêneros vs. Tipos
                    ======================================================= */}
<TabsContent value="modulo-4" className="space-y-16 mt-6 focus-visible:outline-none">
    <ModuleBanner
        numero={4}
        titulo="Gêneros vs. Tipos"
        descricao="A armadilha clássica da CESGRANRIO: diferenciar a base estrutural (tipo) do uso social (gênero)."
        gradiente="bg-gradient-to-br from-yellow-500 via-amber-600 to-orange-700"
    />

    <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
        <ModuleSectionHeader index={1} title="A Grande Confusão" variant="amber" />

        <AlertBox tipo="warning" titulo="Terminologia da CESGRANRIO">
            Se a questão disser: "O texto pertence ao <strong>gênero</strong>...", procure opções como Crônica, Artigo de Opinião, Reportagem, Ofício.<br />
            Se a questão disser: "O texto tem <strong>tipologia / sequência / modo de organização</strong>...", procure opções como Narrativo, Descritivo, Dissertativo ou Injuntivo.
        </AlertBox>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {GENERO_VS_TIPO_FLIPS.map((flip, idx) => (
                <FlipCard
                    key={`flip-genero-${idx}`}
                    frente={flip.frente}
                    verso={flip.verso}
                />
            ))}
        </div>
    </section>

    <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
        <ModuleSectionHeader index={2} title="A Sobreposição (Hibridismo)" variant="amber" />

        <ContentAccordion
            mode="stacked"
            titulo="Os Gêneros são Misturas"
            icone={<LuBookOpen />}
            corIndicador="bg-amber-500"
            defaultOpen={true}
            slidesPerView={1}
            slides={[
                {
                    titulo: 'Crônica (Gênero)', icone: '☕', conteudo: (
                        <div className="space-y-4">
                            <p className="text-muted-foreground">Normalmente, uma crônica parte de um fato do cotidiano (Narração) e depois o autor emite opiniões e reflexões sobre esse fato (Dissertação Argumentativa). Logo, a crônica é um gênero híbrido com <strong>Tipo Narrativo + Dissertativo</strong>.</p>
                        </div>
                    )
                },
                {
                    titulo: 'Relatório Técnico (Gênero)', icone: '📊', conteudo: (
                        <div className="space-y-4">
                            <p className="text-muted-foreground">Muito usado na Petrobras. Tem como base o <strong>Tipo Descritivo</strong> (para caracterizar o equipamento/furo) mas pode conter <strong>Tipo Dissertativo-Expositivo</strong> para relatar fatos técnicos, e até <strong>Injuntivo</strong> se recomendar manutenções.</p>
                        </div>
                    )
                }
            ]}
        />
    </section>

    <section className="space-y-16">
        <LessonTabs
            variant="amber"
            title="Resumo: Gêneros e Tipos"
            tabs={[
                {
                    id: 'video', label: 'Vídeo Resumo', icon: LuVideo,
                    content: (
                        <div className="max-w-4xl mx-auto w-full px-4 text-center space-y-6">
                            <VideoModal videoId="dQw4w9WgXcQ" title="Gênero x Tipo" duration="8 min" thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" />
                        </div>
                    )
                },
                {
                    id: 'audio', label: 'Áudio Revisão', icon: LuHeadphones,
                    content: (
                        <div className="max-w-2xl mx-auto w-full px-6 py-12 text-center space-y-8">
                            <audio src="#" controls className="w-full" />
                        </div>
                    )
                },
                {
                    id: 'visual', label: 'Mapa Mental', icon: LuImage,
                    content: (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                            <div className="aspect-[4/3] w-full bg-amber-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-amber-500/20 p-8">
                                <h5 className="text-xl font-bold text-amber-700 dark:text-amber-400 mb-2">TIPO</h5>
                                <p className="text-sm text-muted-foreground text-center">Narrar (ação), Descrever (foto), Dissertar (ideia), Injungir (ordem).</p>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'macete', label: 'Macete', icon: LuZap,
                    content: (
                        <div className="max-w-3xl mx-auto p-12 text-center space-y-8 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 rounded-[40px] border border-yellow-500/20">
                            <h4 className="text-2xl font-bold text-amber-700">O Guarda Chuva</h4>
                            <p className="text-lg text-muted-foreground">
                                "Imagine o Gênero como a carcaça de um carro (Picape, Sedan, SUV - infinitos designs). O Tipo é o motor (só existem poucos: elétrico, a combustão). A prova não quer saber o nome do carro, quer saber como o motor funciona (se é narração fechada, dissertação expositiva, etc)."
                            </p>
                        </div>
                    )
                }
            ]}
        />
    </section>

    <section className="mt-16">
        <QuizInterativo questoes={qMod4} titulo="Quiz — Diferenciando" icone="🔍" numero={3} onComplete={(score) => handleModuleComplete('modulo-4', score)} />
    </section>
</TabsContent>

{/* =======================================================
                        MÓDULO 5: Laboratório Final
                    ======================================================= */}
<TabsContent value="modulo-5" className="space-y-16 mt-6 focus-visible:outline-none">
    <ModuleBanner
        numero={5}
        titulo="Laboratório CESGRANRIO"
        descricao="Revisão geral e simulado final cruzando todos os tipos textuais operacionais."
        gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700"
    />

    <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
        <ModuleSectionHeader index={1} title="Revisão Final Turbo" variant="violet" />

        <div className="space-y-6">
            <TimelineItem passo={1} titulo="Focou no passado e tem Personagem?" descricao="Temos Narração. Procure verbos no Pretérito Perfeito." />
            <TimelineItem passo={2} titulo="Paralisou a cena para detalhar objetos ou sentimentos?" descricao="Temos Descrição. Adjetivos reinam." />
            <TimelineItem passo={3} titulo="Está dando ordem com verbo imperativo (Ligue/Aperte)?" descricao="Temos Injunção. É o manual técnico de operação." />
            <TimelineItem passo={4} titulo="Sobra a Dissertação. Tem opinião (bom/ruim)?" descricao="Sim: Argumentativa (Tese). Não: Expositiva (Apenas informa)." isLast />
        </div>
    </section>

    <section className="space-y-16">
        <LessonTabs
            variant="violet"
            title="Resumo Geral: Tipologia"
            tabs={[
                {
                    id: 'video', label: 'Vídeo Resumo', icon: LuVideo,
                    content: (
                        <div className="max-w-4xl mx-auto w-full px-4 text-center space-y-6">
                            <VideoModal videoId="dQw4w9WgXcQ" title="Revisão Turbo 5 Tipos" duration="15 min" thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" />
                        </div>
                    )
                },
                {
                    id: 'audio', label: 'Áudio Revisão', icon: LuHeadphones,
                    content: (
                        <div className="max-w-2xl mx-auto w-full px-6 py-12 text-center space-y-8">
                            <audio src="#" controls className="w-full" />
                        </div>
                    )
                },
                {
                    id: 'visual', label: 'Mapa Mental', icon: LuImage,
                    content: (
                        <div className="grid grid-cols-1 gap-6 p-4">
                            <div className="aspect-[16/9] w-full bg-violet-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-violet-500/20 p-8">
                                <h5 className="text-xl font-bold text-violet-700 dark:text-violet-400 mb-2">Quadro Mestre</h5>
                                <p className="text-sm text-muted-foreground text-center">Narrar, Descrever, Dissertar, Injungir, Dialogar.</p>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'macete', label: 'Macete', icon: LuZap,
                    content: (
                        <div className="max-w-3xl mx-auto p-12 text-center space-y-8 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 rounded-[40px] border border-violet-500/20">
                            <h4 className="text-2xl font-bold text-violet-700">Hora do Show</h4>
                            <p className="text-lg text-muted-foreground">
                                "A Cesgranrio AMA perguntar o tipo predominante em textos da Petrobras. Lembre: se o texto ensina o funcionário a usar a EPI, é INJUNTIVO. Se explica o que é o Pré-Sal sem opinar, é DISSERTATIVO-EXPOSITIVO."
                            </p>
                        </div>
                    )
                }
            ]}
        />
    </section>

    <section className="mt-16">
        <QuizInterativo questoes={qLab} titulo="Simulado Final — Tipologia (Cesgranrio)" icone="🏆" numero={5} onComplete={(score) => handleModuleComplete('modulo-5', score)} />
    </section>

    {/* Botão de Conclusão */}
    <section className="flex justify-center pt-8 pb-12">
        <Button
            size="lg"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-12 py-6 rounded-2xl text-lg font-bold shadow-xl shadow-violet-500/20 hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105"
            onClick={onComplete}
            disabled={completedModules.size < MODULE_DEFS.length}
        >
            <LuCheck className="mr-2" /> Concluir Aula de Tipos Textuais
        </Button>
    </section>
</TabsContent>

                </Tabs >
            </main >
        </div >
    );
}
