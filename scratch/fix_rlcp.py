import os

path = r'c:\Workspace\petrobras-quest\src\components\aulas\administracao\AulaRLCP.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Novo conteudo do modulo 2
new_modulo_2 = '''  const renderModulo2 = () => {
    const variant = mv[1];
    return (
      <TabsContent value="modulo-2" className="space-y-6">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            variant={mv[2]}
            title="Procedimento Licitatório: Rito Comum e Contratação Direta"
            description="A Lei das Estatais extinguiu as modalidades da Lei 8.666/93. Entenda o rito comum, os modos de disputa e as hipóteses de dispensa e inexigibilidade."
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              A Lei 13.303/16 e o <strong>RLCP (Regulamento de Licitações e Contratos da Petrobras)</strong> romperam com a antiga estrutura de modalidades licitatórias (como Tomada de Preços e Convite). Atualmente, a Petrobras realiza suas contratações por meio de um <strong>Rito Comum</strong> (preferencialmente sob a forma eletrônica via Petronect) ou por meio do <strong>Pregão</strong>, quando o objeto for caracterizado como bem ou serviço comum.
            </p>
            <p>
              A banca CESGRANRIO exige a distinção entre os <strong>modos de disputa</strong> adotados no rito: o modo <strong>aberto</strong> (com lances públicos e sucessivos) e o modo <strong>fechado</strong> (onde as propostas permanecem em sigilo até a abertura).
            </p>
            <p>
              O rito comum pode adotar critérios de julgamento variados para a seleção da proposta mais vantajosa: menor preço, maior desconto, melhor técnica, técnica e preço, ou maior retorno econômico. Nas licitações da Petrobras, os lances de preços são julgados antes da abertura da documentação de habilitação dos licitantes, no mecanismo conhecido como <strong>inversão de fases</strong>.
            </p>
            <p>
              A contratação direta sem licitação compreende as hipóteses de <strong>dispensa</strong> (onde há viabilidade de competição, mas a lei desobriga o certame, como em casos de baixo valor ou emergência) e <strong>inexigibilidade</strong> (quando há inviabilidade de competição, como fornecedor exclusivo).
            </p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">
                ⚖️ Modos de Disputa e Critérios
              </span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>
                  ✓ <strong>Rito Comum Eletrônico:</strong> Centralizado no portal Petronect.
                </li>
                <li>
                  ✓ <strong>Modo Aberto:</strong> Lances públicos e sucessivos (com possibilidade de prorrogação).
                </li>
                <li>
                  ✓ <strong>Modo Fechado:</strong> Propostas secretas apresentadas em envelope ou portal seguro.
                </li>
                <li>
                  ✓ <strong>Inversão de Fases:</strong> O julgamento de preços ocorre antes da habilitação documental.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={variant}
            title="Detalhamento Técnico"
          />
          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "Rito Comum Eletrônico",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Ao invés de criar várias modalidades burocráticas baseadas no valor estimado, a Lei das Estatais instituiu um procedimento simplificado em rito comum. O certame é processado eletronicamente no portal <strong>Petronect</strong>, ampliando a transparência e a concorrência global.
                    </p>
                    <AlertBox tipo="info" titulo="Celeridade Administrativa">
                      A simplificação reduz os prazos de publicação e julgamento das propostas em comparação ao antigo regime jurídico da Lei 8.666/93.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Modos de Disputa: Aberto vs. Fechado",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      A disputa nas licitações da Petrobras pode seguir três desenhos:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-semibold text-gray-800 dark:text-gray-200">1. Aberto</h5>
                        <p className="text-sm text-gray-650 dark:text-gray-400 mt-1">Lances sucessivos, visíveis a todos os licitantes. Fomenta a concorrência em tempo real.</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-semibold text-gray-800 dark:text-gray-200">2. Fechado</h5>
                        <p className="text-sm text-gray-650 dark:text-gray-400 mt-1">Propostas sigilosas até a abertura. Impede a cartelização e a combinação de preços.</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-semibold text-gray-800 dark:text-gray-200">3. Combinado</h5>
                        <p className="text-sm text-gray-650 dark:text-gray-400 mt-1">Associa fases fechadas e abertas para qualificar e refinar os lances.</p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Critérios de Julgamento",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      No RLCP, o julgamento das propostas pode se basear nos seguintes critérios definidos no edital:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-350">
                      <li><strong>Menor preço ou maior desconto:</strong> Critério padrão para bens e serviços comuns.</li>
                      <li><strong>Melhor técnica ou técnica e preço:</strong> Usado para projetos de engenharia complexos de exploração offshore.</li>
                      <li><strong>Maior retorno econômico:</strong> O licitante oferece uma proposta de economia de custos operacionais para a estatal, recebendo um percentual do ganho real.</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "⚡ Raio-X CESGRANRIO — Contratação Direta (Dispensa vs. Inexigibilidade)",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      A banca CESGRANRIO adora confundir as hipóteses de contratação direta da Lei das Estatais:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl space-y-2">
                        <h5 className="font-bold text-red-700 dark:text-red-300">
                          Dispensa de Licitação
                        </h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          A competição <strong>é viável</strong>, mas a lei desobriga a licitação por conveniência pública (rol taxativo):
                        </p>
                        <ul className="list-disc pl-4 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          <li><strong>Valor:</strong> Limites dinâmicos estabelecidos em regulamento da estatal para contratações diretas de pequenos valores.</li>
                          <li><strong>Emergência:</strong> Contratos limitados a 180 dias consecutivos (vedada a prorrogação baseada na mesma emergência). Exemplo: reparo urgente em dutos de plataformas de exploração offshore da Petrobras.</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-2">
                        <h5 className="font-bold text-emerald-700 dark:text-emerald-300">
                          Inexigibilidade de Licitação
                        </h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          A competição <strong>é inviável</strong> devido a características específicas do objeto ou fornecedor (rol exemplificativo):
                        </p>
                        <ul className="list-disc pl-4 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          <li><strong>Fornecedor Exclusivo:</strong> Comprovação por meio de atestado fornecido por órgão competente (exemplo: concessionários de serviços públicos).</li>
                          <li><strong>Singularidade do Serviço:</strong> Contratação de profissionais de notória especialização para serviços técnicos especializados (sendo <strong>vedado</strong> para serviços de publicidade e divulgação).</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />

          <ModuleConsolidation
            index={2}
            variant={variant}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Procedimentos do RLCP",
              duration: "08:15",
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Ritos e Contratação Direta",
              materia: "RLCP",
              images: [
                {
                  title: "Rito Comum",
                  type: "Destaque",
                  placeholderColor: "blue",
                  imageUrl: "https://images.unsplash.com/photo-1454165833767-131435bb4496?auto=format&fit=crop&q=80&w=800",
                },
                {
                  title: "Contratação Direta",
                  type: "Exceção",
                  placeholderColor: "rose",
                  imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Destaque Estratégico: Dispensa vs. Inexigibilidade",
              content: (
                <div className="space-y-2 text-left text-sm text-muted-foreground">
                  <p>
                    <strong>D</strong>ispensa: Competição viável, rol taxativo. Obras e serviços em emergência têm limite de 180 dias.
                  </p>
                  <p>
                    <strong>I</strong>nexigibilidade: Competição inviável, rol exemplificativo. Proibido contratar publicidade por inexigibilidade!
                  </p>
                  <p>
                    <strong>P</strong>regão: Modalidade obrigatória para aquisição de bens e serviços comuns na estatal.
                  </p>
                </div>
              ),
            }}
            audio={{
              audioUrl: "#",
              titulo: "Ritos e Prazos do RLCP",
              artista: "Auditório Petrobras",
            }}
          />

          <QuizInterativo
            questoes={toQQ(quizM2)}
            titulo="QUIZ: Rito Comum e Contratação Direta"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>
    );
  };

'''

start_marker = '  const renderModulo2 = () => {'
end_marker = '  const renderModulo3 = () => {'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_modulo_2 + content[end_idx:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Sucesso: Modulo 2 atualizado com python string manipulation!")
else:
    print(f"Erro: Marcadores nao encontrados! start_idx={start_idx}, end_idx={end_idx}")
