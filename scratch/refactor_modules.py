import re

def refactor():
    filepath = "src/components/aulas/administracao/AulaAdministracaoGeralSuprimento.tsx"
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Módulo 7 Refactor Block
    m7_new = """      {/* ==================== MÓDULO 7 ==================== */}
      {activeTab === "modulo-7" && (
        <TabsContent value="modulo-7" className="space-y-12 mt-0">
          <ModuleBanner
            numero={7}
            titulo="Comunicação e Conflitos"
            descricao="A comunicação como processo vital. Canais, barreiras, feedback. Conflitos: naturais, necessários, podem ser construtivos ou destrutivos."
            variant={mv[7]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[7]}
              title="Dossiê de Comunicação e Conflitos"
              description="Fundamentos teóricos e dinâmicas relacionais nas organizações contemporâneas."
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              {/* C — Contexto (parágrafos 1 e 2) */}
              <p>A comunicação organizacional atua como o verdadeiro sistema circulatório das corporações modernas, ligando gerências, equipes de campo e a alta diretoria em uma rede contínua de compartilhamento de significados. Sem fluxos comunicacionais estruturados e transparentes, o alinhamento estratégico, a sinergia departamental e a própria execução das tarefas operacionais cotidianas tornam-se virtualmente impossíveis. O desempenho coletivo está intrinsecamente atrelado à qualidade, precisão e tempestividade da informação disseminada.</p>
              <p>Nesse ecossistema dinâmico de interações humanas, a divergência e o conflito emergem como fenômenos naturais e inevitáveis da vida organizacional. Longe de representarem uma patologia que deve ser eliminada a qualquer custo, os conflitos expressam a pluralidade de visões, backgrounds e prioridades legítimas das diferentes gerências. O grande desafio administrativo contemporâneo não é banir as divergências, mas desenvolver competências de liderança e mediação capazes de transformá-las em vetores de inovação e melhoria contínua.</p>

              {/* E — Explicação (parágrafos 3 e 4) */}
              <p>O processo de comunicação é composto por um circuito integrado de elementos essenciais: o emissor (quem origina a ideia), a codificação (conversão da ideia em símbolos ou linguagem), a mensagem (o conteúdo transmitido), o canal (o meio físico ou virtual de transmissão), a decodificação (interpretação da mensagem pelo destinatário), o receptor (a quem a mensagem se destina) e o feedback (a resposta que confirma a decodificação bem-sucedida). Ao longo de todo esse circuito, atuam os ruídos, entendidos como qualquer barreira ou distorção que degrade a integridade da mensagem.</p>
              <p>Os conflitos, por sua vez, desenvolvem-se em fases contínuas, iniciando-se pela incompatibilidade latente de objetivos (conflito percebido), progredindo para o sentimento de tensão interpessoal (conflito sentido), até manifestar-se por meio de atitudes e confrontos explícitos (conflito manifesto). Para mediar essas situações, a metodologia clássica de Thomas-Kilmann identifica cinco estilos de resolução pautados pela combinação entre assertividade (busca pelos próprios objetivos) e cooperação (busca pelos objetivos do outro): competição, colaboração, compromisso, evitação e acomodação.</p>

              {/* D — Demonstração (parágrafos 5 e 6) */}
              <p>Para visualizar a dinâmica prática desses conceitos, considere a especificação técnica de um contrato de fornecimento de válvulas de controle de pressão para uma plataforma de refino. O emissor (gerente de operações) codifica os requisitos técnicos em um e-mail formal (mensagem e canal) e o envia ao receptor (analista de suprimentos). Se o analista utilizar jargões puramente mercadológicos para responder e o gerente interpretar isso como desinteresse técnico, ocorreu um clássico ruído semântico decorrente de diferenças de repertório vocacional.</p>
              <p>Neste mesmo cenário, se o analista de compras exigir o cumprimento rigoroso dos prazos administrativos (estilo competitivo de assertividade legal) e o gerente operacional focar unicamente na urgência da parada de manutenção da plataforma (estilo competitivo de urgência técnica), o conflito se manifestará. Se os dois agentes se fecharem em suas defesas, a compra será atrasada. A resolução exige uma abordagem integrativa (estilo colaborativo), onde ambos debatam em conjunto alternativas que cumpram a legislação sem comprometer a integridade e segurança da refinaria.</p>

              {/* E — Expansão (parágrafos 7 e 8) */}
              <p>O intercâmbio de mensagens nas organizações transita por fluxos formais estruturados (comunicação descendente, que flui da chefia com ordens e diretrizes; ascendente, que sobe com sugestões e relatórios; horizontal, que conecta gerências de mesmo nível; e diagonal, que cruza níveis hierárquicos e setores distintos). No entanto, de forma paralela, a comunicação informal (rádio-corredor) opera de forma orgânica, rápida e descentralizada, preenchendo as lacunas de informação deixadas pelos canais formais da organização.</p>
              <p>Gerenciar o rádio-corredor requer transparência corporativa. Quando a comunicação oficial é falha, ambígua ou excessivamente lenta, o ecossistema informal tende a preencher o espaço gerando boatos e pânico que minam o clima organizacional e potencializam o surgimento de conflitos destrutivos. Líderes de alta performance monitoram as redes informais de comunicação não para censurá-las, mas para avaliar o nível de ansiedade das equipes e produzir respostas oficiais rápidas, precisas e humanizadas que restabeleçam a segurança psicológica.</p>

              {/* A — Aplicação (parágrafos 9 e 10) */}
              <p>Na Petrobras, a eficácia na comunicação e no manejo de conflitos é de suma importância em suas operações integradas offshore. Nas trocas de turnos em plataformas de petróleo na bacia de Campos, engenheiros e técnicos operam sob escalas de confinamento exaustivas, onde ruídos de comunicação podem representar riscos reais de acidentes graves de segurança. O uso de protocolos de comunicação repetitivos (escuta ativa e confirmação obrigatória de comandos operacionais) atua como uma barreira preventiva contra acidentes.</p>
              <p>Paralelamente, a resolução integrada de atritos entre o departamento logístico em terra e os coordenadores de operações de mar em relação aos navios de apoio (supply boats) é vital. Sendo a Petrobras regulada pela Lei de Estatais, os técnicos de suprimentos devem aplicar negociações com base em critérios objetivos de eficiência de frota, contornando atritos operacionais por meio do compromisso negociado. A cultura de segurança SMS atua como o valor superlativo que pacifica divergências de metas, garantindo que o interesse na preservação da vida oriente a solução de conflitos.</p>
            </div>
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[7]}
              title="Mecanismos de Diálogo e Gestão de Conflitos"
              description="Aprofundamento técnico nos processos comunicacionais e na mediação corporativa."
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "Comunicação: O Circuito e seus Componentes Críticos",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A comunicação eficaz só ocorre quando o destinatário de fato compreende o significado da mensagem de forma idêntica à planejada pelo emissor.
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-3 mt-4">
                        <span className="font-bold text-xl text-teal-600 block">Os 7 Elementos do Circuito Comunicativo:</span>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                          <li><strong>Emissor:</strong> A fonte que inicia a transmissão da ideia ou pensamento.</li>
                          <li><strong>Codificação:</strong> Conversão da ideia em linguagem, símbolos, gestos ou imagens padronizadas.</li>
                          <li><strong>Mensagem:</strong> O conteúdo físico ou conceitual codificado e transmitido.</li>
                          <li><strong>Canal:</strong> O veículo de mídia físico, digital ou presencial por onde viaja a mensagem.</li>
                          <li><strong>Decodificação:</strong> A interpretação e tradução dos símbolos realizada pelo receptor.</li>
                          <li><strong>Receptor:</strong> O destinatário final que absorve a informação decodificada.</li>
                          <li><strong>Feedback:</strong> O retorno que atesta a correta recepção e entendimento da ideia original.</li>
                        </ul>
                      </div>
                    </div>
                  ),
                  icone: <LuHandshake />,
                },
                {
                  titulo: "Canais e Direcionamento dos Fluxos Comunicacionais",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        As redes de informação estruturam-se em fluxos formais (organograma) e informais, transitando em diferentes direções hierárquicas essenciais:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="p-5 bg-teal-500/5 border border-teal-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-teal-800 dark:text-teal-400 mb-2">Descendente:</h6>
                          <p className="text-lg">
                            Da alta gerência para os níveis operacionais. Transmite metas, diretrizes organizacionais, ordens de tarefas e rotinas formais escritas.
                          </p>
                        </div>
                        <div className="p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-cyan-800 dark:text-cyan-400 mb-2">Ascendente:</h6>
                          <p className="text-lg">
                            Dos colaboradores para a liderança. Traz relatórios de desempenho, dúvidas, sugestões de melhoria contínua Kaizen e queixas.
                          </p>
                        </div>
                        <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-blue-800 dark:text-blue-400 mb-2">Horizontal e Diagonal:</h6>
                          <p className="text-lg">
                            Conecta setores de mesmo nível ou cruza departamentos de níveis diferentes, otimizando o tempo e a coordenação integrada.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuNetwork />,
                },
                {
                  titulo: "Gestão de Conflitos: Abordagens e Estilos Organizacionais",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        O conflito é um processo em que uma das partes percebe que a outra afeta negativamente seus interesses. Os estilos de gestão variam conforme assertividade e cooperação:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-3 mt-4">
                        <span className="font-bold text-xl text-cyan-600 block">Os 5 Estilos de Thomas-Kilmann:</span>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                          <li><strong>Competição (Ganhar-Perder):</strong> Assertivo e não cooperativo. Focado em impor a própria vontade a qualquer custo. Útil em emergências rápidas de segurança.</li>
                          <li><strong>Colaboração (Ganhar-Ganhar):</strong> Assertivo e cooperativo. Busca integrar as visões de forma holística para obter uma solução consensual ideal.</li>
                          <li><strong>Compromisso (Acordo Médio):</strong> Meio-termo onde ambas as partes cedem parcialmente para fechar um acordo viável rápido.</li>
                          <li><strong>Evitação (Perder-Perder):</strong> Não assertivo e não cooperativo. O gestor ignora, adia ou evita ativamente lidar com o conflito latente.</li>
                          <li><strong>Acomodação (Perder-Ganhar):</strong> Não assertivo e cooperativo. Ceder à vontade alheia para manter a harmonia social imediata do grupo.</li>
                        </ul>
                      </div>
                    </div>
                  ),
                  icone: <LuUsers />,
                },
                {
                  titulo: "Negociação: Estratégias Distributivas vs. Integrativas",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A negociação é o principal rito formal para a pacificação de conflitos de interesses. Divide-se em duas abordagens metodológicas clássicas:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-amber-800 dark:text-amber-400 mb-2">Negociação Distributiva (Soma Zero):</h6>
                          <p className="text-lg">
                            Focada na divisão de recursos fixados. O ganho de uma das partes representa necessariamente a perda direta da outra (foco competitivo de curto prazo).
                          </p>
                        </div>
                        <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-emerald-800 dark:text-emerald-400 mb-2">Negociação Integrativa (Consensual):</h6>
                          <p className="text-lg">
                            Focada na expansão dos recursos por meio de cooperação, buscando criar soluções de valor agregado mútuo que satisfaçam ambos (foco colaborativo de longo prazo).
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuHandshake />,
                },
                {
                  titulo: "Conceituação: Elementos, Ruídos e Barreiras no Fluxo de Informação",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Para a CESGRANRIO, o candidato deve dominar os fatores que bloqueiam ou distorcem a eficácia da comunicação organizacional (Barreiras de Comunicação):
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-blue-600 dark:text-blue-400 block text-xl mb-2">Tipos de Ruído e Distorções:</strong>
                          <ul className="list-disc pl-5 space-y-2 text-lg">
                            <li><strong>Filtragem:</strong> A manipulação deliberada da informação pelo emissor para torná-la mais favorável aos olhos da chefia.</li>
                            <li><strong>Percepção Seletiva:</strong> O receptor seleciona, lê ou ouve apenas o que lhe interessa com base em seus valores pessoais prévios.</li>
                            <li><strong>Sobrecarga de Informação:</strong> Excesso de dados que ultrapassa a capacidade de processamento do cérebro.</li>
                          </ul>
                        </div>
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-amber-600 dark:text-amber-400 block text-xl mb-2">Barreiras de Linguagem e Emoção:</strong>
                          <ul className="list-disc pl-5 space-y-2 text-lg">
                            <li><strong>Semântica:</strong> O uso de palavras, jargões técnicos ou siglas cujo sentido varia entre diferentes especialidades profissionais.</li>
                            <li><strong>Emoção:</strong> O estado emocional no momento da troca bloqueia a racionalidade na decodificação e na escuta.</li>
                            <li><strong>Ruído Físico:</strong> Interferências acústicas no ambiente fabril ou problemas técnicos de conexão na rede.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: O Rito de Alinhamento de SMS em Operações Off-Shore",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Nas plataformas de exploração offshore da Petrobras, a comunicação eficiente é uma barreira de segurança vital:
                      </p>
                      <AlertBox tipo="info" titulo="Protocolo 'Three-Way Communication' (Circuito Fechado)">
                        <span className="text-lg">
                          Para coibir acidentes fatais, adota-se o rito formal de três etapas:
                          1. O emissor (gerente de mar) transmite o comando operacional técnico.
                          2. O receptor (operador) repete verbalmente o comando como o interpretou para verificação.
                          3. O emissor confirma verbalmente ("Correto") ou corrige se houver ruído semântico de decodificação.
                          Esse protocolo simples do feedback obrigatório garante a eliminação completa de ruídos nas operações críticas da plataforma.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: As 5 Estratégias de Thomas-Kilmann para Provas",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Nas provas objetivas de administração geral da CESGRANRIO, as questões costumam propor cenários de conflitos e pedir o estilo mais adequado de mediação. Decore esta regra de ouro:
                      </p>
                      <div className="overflow-x-auto mt-4">
                        <table className="w-full text-lg text-left border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-3 border border-border font-bold">Estilo de Resolução</th>
                              <th className="p-3 border border-border font-bold">Cenário Ideal na Prova</th>
                              <th className="p-3 border border-border font-bold">Compromisso / Perda Parcial</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-3 font-bold border border-border text-red-600">Competição</td>
                              <td className="p-3 border border-border">Decisões rápidas, impopulares e cruciais de segurança operacional.</td>
                              <td className="p-3 border border-border">Nenhum. Apenas uma parte vence.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-emerald-600">Colaboração</td>
                              <td className="p-3 border border-border">Conciliar interesses diversos de longo prazo integrando visões.</td>
                              <td className="p-3 border border-border">Soma positiva (Ganhar-Ganhar). Ambos ganham de forma plena.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-cyan-600">Compromisso</td>
                              <td className="p-3 border border-border">Prazos curtos, metas temporárias sob poder equivalente das partes.</td>
                              <td className="p-3 border border-border">Partilha equitativa. Ambos cedem um pouco para avançar.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-amber-600">Acomodação</td>
                              <td className="p-3 border border-border">Quando o tema é mais importante para o outro ou para manter harmonia social.</td>
                              <td className="p-3 border border-border">Submissão pacífica. Uma parte cede por completo.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: Supressão ≠ Resolução Real",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Um erro frequente de gestores inexperientes é tentar suprimir ativamente qualquer manifestação de conflito em suas equipes.
                      </p>
                      <AlertBox tipo="danger" titulo="Os Perigos da Evitação Sistemática">
                        <span className="text-lg">
                          Adotar a <strong>evitação</strong> (fingir que o conflito não existe) ou a <strong>acomodação rápida</strong> (dar razão sempre a um reclamante) apenas silencia provisoriamente os sintomas visíveis. As causas reais da divergência permanecem latentes e acumulam-se, gerando um ambiente de desconfiança e ressentimento que explodirá de forma muito mais grave no futuro sob a forma de ruídos de comunicação e ineficiência.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

          <ModuleConsolidation
            index={7}
            variant={mv[7]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Comunicação e Conflitos Organizacionais",
              duration: "13:30",
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Modelo de Comunicação",
                  type: "Diagrama",
                  placeholderColor: "bg-teal-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Diretrizes Críticas de Comunicação e Conflitos",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">💬 🤝</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                    <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center">
                      <p className="font-bold text-teal-600 mb-1 text-xl">Circuito Fechado</p>
                      <p className="text-base text-muted-foreground">O feedback obrigatório garante a sintonia conceitual e elimina ruídos semânticos e distorções.</p>
                    </div>
                    <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                      <p className="font-bold text-cyan-600 mb-1 text-xl">Estilos Situacionais</p>
                      <p className="text-base text-muted-foreground">Competição em emergências operacionais. Colaboração para integrar objetivos de longo prazo.</p>
                    </div>
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                      <p className="font-bold text-blue-600 mb-1 text-xl">Riqueza de Canal</p>
                      <p className="text-base text-muted-foreground">Assuntos ambíguos ou sensíveis demandam canais de alta riqueza de mídia (presencial síncrono).</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• O ruído semântico é provocado por diferença de vocabulário e repertório técnico ou profissional.</p>
                    <p>• A evitação e a acomodação silenciam conflitos mas mantêm sua causa latente e acumulada.</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "Comunicação e Conflitos",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-7")}
            titulo="QUIZ: Comunicação e Conflitos"
            numero={7}
            variant={mv[7]}
            onComplete={(score: number) => handleModuleComplete("modulo-7", score)}
          />
        </TabsContent>
      )}"""

    # Módulo 8 Refactor Block
    m8_new = """      {/* ==================== MÓDULO 8 ==================== */}
      {activeTab === "modulo-8" && (
        <TabsContent value="modulo-8" className="space-y-12 mt-0">
          <ModuleBanner
            numero={8}
            titulo="Decisão e Inovação"
            descricao="Processo decisório nas organizações: tipos, modelos, técnicas. Inovação: necessidade estratégica na era do conhecimento."
            variant={mv[8]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[8]}
              title="Dossiê Decisório e Inovação"
              description="Racionalidade limitada, espiral do conhecimento e armadilhas mentais na tomada de decisão."
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              {/* C — Contexto (parágrafos 1 e 2) */}
              <p>A tomada de decisão constitui o verdadeiro núcleo dinâmico da ação administrativa, sendo a atividade por meio da qual os gestores definem o rumo estratégico e a alocação de recursos da corporação. Em cenários de negócios marcados pela volatilidade e pela complexidade tecnológica, a capacidade de selecionar alternativas viáveis sob forte pressão de tempo e riscos determina a sobrevivência de qualquer empresa. Compreender a teoria por trás do ato de decidir é a ferramenta mais eficaz contra a intuição cega e o empirismo ingênuo.</p>
              <p>Historicamente, a teoria clássica de decisão postulava a existência de um tomador de decisão absolutamente racional, dotado de informações perfeitas e tempo ilimitado para calcular matematicamente a melhor opção global. Contudo, a inserção da psicologia e a observação empírica da rotina corporativa revelaram que essa racionalidade perfeita é uma ficção analítica. Nas organizações reais, a tomada de decisão transita por limites impostos pela mente humana, pela escassez de tempo e pela incompletude estrutural das bases de dados disponíveis.</p>

              {/* E — Explicação (parágrafos 3 e 4) */}
              <p>Para decodificar esse cenário, Herbert Simon formulou a revolucionária teoria da <strong>Racionalidade Limitada</strong>, demonstrando que os administradores operam sob restrições cognitivas severas. Sendo impossível mapear exaustivamente todas as opções e antever todas as suas consequências, os tomadores de decisão abandonam a busca pela otimização absoluta (a decisão perfeita). No lugar dela, adotam o modelo da <strong>decisão satisfatória</strong>, selecionando a primeira alternativa viável que atenda aos requisitos mínimos de segurança estabelecidos.</p>
              <p>Intimamente conectada à capacidade de decidir e resolver problemas complexos está a inovação, estruturada conceitualmente por Nonaka e Takeuchi através da <strong>Espiral do Conhecimento</strong>. Os autores demonstram que a inovação resulta do intercâmbio contínuo e cíclico entre o conhecimento tácito (pessoal, subjetivo e fruto da vivência prática) e o conhecimento explícito (formalizado, codificado e estruturado em manuais ou sistemas). Essa espiral desenvolve-se através da socialização, externalização, combinação e internalização.</p>

              {/* D — Demonstração (parágrafos 5 e 6) */}
              <p>Para visualizar a interação desses conceitos, considere a contratação emergencial de um fornecedor de válvulas industriais sob suspeita de falha estrutural generalizada. Sob a premissa da racionalidade absoluta, o gestor de compras deveria cotar o preço e avaliar o balanço de todas as fundições de válvulas do planeta e realizar testes metalúrgicos em todos os protótipos antes de assinar. Sob a Racionalidade Limitada de Simon, o gestor define três critérios essenciais (prazo de entrega de 5 dias, certificação técnica mínima e preço compatível com o histórico).</p>
              <p>Ao analisar as três primeiras cotações recebidas e constatar que a segunda atende a todos os três critérios de segurança estabelecidos, o gestor assina imediatamente a contratação, obtendo uma decisão satisfatória e tempestiva que evita a interrupção da produção fabril. Na sequência, para disseminar esse aprendizado, o conhecimento tácito do analista que resolveu a compra é externalizado na forma de um manual de contingência (conhecimento explícito), integrando-se à base sistêmica da empresa (combinação) para posterior aprendizado da equipe (internalização).</p>

              {/* E — Expansão (parágrafos 7 e 8) */}
              <p>O processo decisório, contudo, é frequentemente sabotado por vieses cognitivos e armadilhas mentais sistemáticas cometidas pelos administradores. Dentre os mais cobrados pela CESGRANRIO, destaca-se o viés de ancoragem (fixar-se excessivamente na primeira informação ou estimativa recebida e ajustar de forma insuficiente os dados subsequentes). Paralelamente, o viés de confirmação faz com que o decisor busque e valorize apenas dados que corroborem sua opinião inicial, ignorando ativamente evidências contrárias de riscos.</p>
              <p>Destaca-se também o viés de disponibilidade, onde a probabilidade de um evento é estimada com base na facilidade com que exemplos semelhantes são recuperados da memória recente (por exemplo, superestimar o risco de falha de um equipamento por conta de um acidente recente, em vez de avaliar as estatísticas históricas reais). Por fim, a armadilha do custo afundado (<em>sunk cost</em>) descreve a inércia patológica de continuar aportando fundos e esforços em projetos claramente fracassados apenas para tentar justificar os investimentos já realizados.</p>

              {/* A — Aplicação (parágrafos 9 e 10) */}
              <p>Na Petrobras, a dualidade da racionalidade decisória é observada na divisão entre decisões programadas e não-programadas. Decisões programadas referem-se às atividades rotineiras e padronizadas, como a reposição de estoques de segurança de sobressalentes operacionais. O analista de suprimentos não precisa tomar decisões ativas: quando o estoque atinge o ponto de ressuprimento no sistema SAP Petronect, dispara-se automaticamente a emissão da nota de compras sob as condições de atas de registro de preços vigentes.</p>
              <p>Já decisões não-programadas referem-se a cenários inéditos e de alta complexidade estratégica, como a definição de fornecedores globais para a implantação de plantas experimentais de hidrogênio verde. Não havendo dados históricos de edital ou preços padronizados, a Petrobras mitiga a racionalidade limitada e as armadilhas de ancoragem por meio de comitês multidisciplinares de engenharia, consultas públicas ao mercado internacional e governança de auditoria integrada. O foco de suprimento desloca-se da mera barganha de preço para a matriz de compartilhamento de riscos contratuais.</p>
            </div>
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[8]}
              title="Racionalidade Decisória e Vetores de Inovação"
              description="Modelos de tomada de decisão e gestão estratégica do conhecimento."
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "Racionalidade Limitada: A Teoria Decisória de Herbert Simon",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A tomada de decisão é a essência do trabalho administrativo. Contrapondo-se ao modelo econômico clássico de racionalidade absoluta, <strong>Herbert Simon</strong> formulou a teoria da <strong>Racionalidade Limitada</strong>:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-3 mt-4">
                        <span className="font-bold text-xl text-blue-600 block">Os 3 Limites Decisórios:</span>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                          <li><strong>Capacidade Cognitiva:</strong> O cérebro humano possui limites biológicos na quantidade de informações e variáveis que pode processar simultaneamente.</li>
                          <li><strong>Informação Incompleta:</strong> Nunca há acesso a todos os dados do ambiente de mercado ou às consequências futuras de cada escolha.</li>
                          <li><strong>Tempo Finito:</strong> Os prazos operacionais impedem o cálculo infinito de múltiplos cenários alternativos.</li>
                        </ul>
                      </div>
                      <p className="mt-2 text-lg">
                        Como consequência dessas limitações, os administradores buscam uma decisão <strong>satisfatória</strong> (suficientemente boa para resolver o problema prático) em vez da decisão ótima (ideal absoluta).
                      </p>
                    </div>
                  ),
                  icone: <LuSearch />,
                },
                {
                  titulo: "Decisões Programadas vs. Não-Programadas no Contexto Gerencial",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Os problemas organizacionais variam em termos de previsibilidade e estruturação, exigindo dois tipos distintos de respostas decisórias:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-blue-800 dark:text-blue-400 mb-2">Decisão Programada:</h6>
                          <p className="text-lg">
                            Rotineira, repetitiva e previsível. É guiada por procedimentos operacionais padronizados (POPs) ou regras automáticas de sistema. O custo decisório é mínimo.
                          </p>
                        </div>
                        <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-emerald-800 dark:text-emerald-400 mb-2">Decisão Não-Programada:</h6>
                          <p className="text-lg">
                            Única, complexa e sem precedentes históricos exatos. Demanda análise de risco, criatividade da gerência e soluções customizadas. Alto custo e risco decisório.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "A Espiral do Conhecimento: Socialização e Externalização",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A inovação depende da conversão dinâmica do conhecimento organizacional. Nonaka e Takeuchi dividem o saber em <strong>Tácito</strong> (pessoal, fruto de experiência) e <strong>Explícito</strong> (formalizado, escrito).
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-blue-600 block text-xl mb-2">Socialização (Tácito para Tácito):</strong>
                          <p className="text-lg">
                            Ocorre por meio do compartilhamento direto de experiências, observação prática e mentoria presencial no dia a dia, sem formalização escrita.
                          </p>
                        </div>
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-emerald-600 block text-xl mb-2">Externalização (Tácito para Explícito):</strong>
                          <p className="text-lg">
                            A etapa mais crítica da espiral, onde o conhecimento prático subjetivo é traduzido e documentado em manuais, relatórios, fluxogramas ou normas oficiais.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuLightbulb />,
                },
                {
                  titulo: "Combinação e Internalização: Reter e Disseminar Saberes",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Para consolidar o conhecimento como um ativo corporativo permanente, a espiral de Nonaka avança para as etapas de fechamento do ciclo integrado:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-cyan-600 block text-xl mb-2">Combinação (Explícito para Explícito):</strong>
                          <p className="text-lg">
                            Agrupamento, síntese e sistematização de múltiplos conhecimentos explícitos diferentes (ex: cruzar dois manuais técnicos distintos para desenhar um novo rito de segurança).
                          </p>
                        </div>
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-amber-600 block text-xl mb-2">Internalização (Explícito para Tácito):</strong>
                          <p className="text-lg">
                            Ocorre quando a equipe lê, treina e coloca em prática as novas diretrizes formais escritas, absorvendo-as até virar rotina de trabalho espontânea (aprender fazendo).
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuClipboardList />,
                },
                {
                  titulo: "Conceituação: Vieses Cognitivos e Armadilhas do Processo Decisório",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Os administradores estão sujeitos a vieses e distorções mentais que comprometem sistematicamente a qualidade lógica das decisões:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-3 mt-4">
                        <span className="font-bold text-xl text-rose-600 block">Os 4 Vieses Críticos Cobrados em Concursos:</span>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                          <li><strong>Ancoragem:</strong> Fixar-se desproporcionalmente na primeira informação recebida e reajustar de forma insuficiente estimativas posteriores.</li>
                          <li><strong>Confirmação:</strong> Buscar seletivamente informações que confirmem hipóteses prévias e ignorar dados contrários.</li>
                          <li><strong>Disponibilidade:</strong> Avaliar a probabilidade de eventos com base no quão facilmente lembranças semelhantes surgem na memória recente.</li>
                          <li><strong>Custo Afundado (Sunk Cost):</strong> Continuar aportando fundos em projetos fracassados apenas para tentar "justificar" perdas passadas.</li>
                        </ul>
                      </div>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
                {
                  titulo: "Exemplificação: Processo Decisório na Escolha de Fornecedor Crítico na Petrobras",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Veja o contraste da tomada de decisão programada e não-programada na Petrobras:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-muted border rounded-lg space-y-2">
                          <h6 className="font-bold text-xl text-blue-600">Decisão Programada (Operacional):</h6>
                          <p className="text-lg">
                            O estoque de óleo lubrificante de turbinas na base offshore caiu abaixo do limite de segurança (ponto de ressuprimento).
                          </p>
                          <p className="text-slate-500 text-base mt-2">
                            A ação corretiva é automática: o sistema Petronect dispara a emissão de pedido de compras direcionada ao fornecedor vencedor do contrato de gaveta pré-aprovado. Não exige novas análises ou debates estratégicos.
                          </p>
                        </div>
                        <div className="p-5 bg-muted border rounded-lg space-y-2">
                          <h6 className="font-bold text-xl text-emerald-600">Decisão Não-Programada (Estratégica):</h6>
                          <p className="text-lg">
                            A Petrobras decide investir em tecnologia de hidrogênio verde, exigindo a contratação de fornecedores globais de engenharia disruptiva.
                          </p>
                          <p className="text-slate-500 text-base mt-2">
                            Não existe edital anterior padronizado ou referências exatas. Exige reuniões interdisciplinares na diretoria, consultas públicas ao mercado, profunda análise de risco financeiro e aprovação pelo comitê executivo da holding.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: Armadilhas e Vieses Decisórios em Concursos",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A CESGRANRIO adora cobrar os vieses cognitivos e falhas sistemáticas cometidas pelos administradores no processo decisório:
                      </p>
                      <AlertBox tipo="warning" titulo="O Viés da Confirmação nas Questões">
                        <span className="text-lg">
                          Nas provas, a banca descreve um gerente que já tomou uma decisão e pede a sua equipe que realize uma "pesquisa" para embasá-la, instruindo-os a focar apenas em dados positivos. O candidato deve identificar imediatamente que esse gerente está sob o **Viés de Confirmação**, rejeitando qualquer evidência científica contraditória para blindar sua opinião prévia.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: A Ilusão do Modelo Racional Puro de Decisão",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Muitos candidatos de engenharia ou finanças acreditam que, com computadores modernos e algoritmos avançados, o modelo racional de decisão absoluta é atingível.
                      </p>
                      <AlertBox tipo="warning" titulo="Limites Físicos e Políticos">
                        <span className="text-lg">
                          Na Petrobras real, as grandes decisões estratégicas nunca são tomadas sob racionalidade computacional matemática pura. Existem fatores geopolíticos mutáveis de mercado, pressões institucionais do acionista majoritário (Governo Federal), tensões ambientais locais e flutuações extremas da cotação internacional do petróleo (Brent) que tornam o cenário decisório altamente incerto e político. A decisão bem-sucedida equilibra a modelagem estatística com o discernimento político do cenário estratégico externo.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

          <ModuleConsolidation
            index={8}
            variant={mv[8]}
            video={{
              videoId: "7c-YVly_C9o",
              title: "Decisão Administrativa e Inovação",
              duration: "14:15",
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Processo Decisório",
                  type: "Fluxograma",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Diretrizes Críticas de Tomada de Decisão",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">🎯 💡</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-lg">
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                      <p className="font-bold text-blue-600 mb-1 text-xl">Racionalidade Limitada</p>
                      <p className="text-base text-muted-foreground">O decisor busca alternativas satisfatórias devido a limites cognitivos e tempo finito.</p>
                    </div>
                    <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center">
                      <p className="font-bold text-teal-600 mb-1 text-xl">Espiral do Saber</p>
                      <p className="text-base text-muted-foreground">Inovação pelo intercâmbio contínuo e cíclico de conhecimento tácito e explícito.</p>
                    </div>
                    <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                      <p className="font-bold text-amber-600 mb-1 text-xl">Vieses Cognitivos</p>
                      <p className="text-base text-muted-foreground">Cuidado com ancoragem e viés de confirmação nas avaliações de riscos.</p>
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                      <p className="font-bold text-emerald-600 mb-1 text-xl">Tipo Decisório</p>
                      <p className="text-base text-muted-foreground">Programada para rotinas operacionais; não-programada para estratégia complexa.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• Herbert Simon introduziu a decisão satisfatória como alternativa realista à impossibilidade física da otimização ideal.</p>
                    <p>• A armadilha do custo afundado faz o decisor verter recursos adicionais em um erro só para não assumir prejuízos passados.</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "Decisão e Inovação",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-8")}
            titulo="QUIZ: Decisão e Inovação"
            numero={8}
            variant={mv[8]}
            onComplete={(score: number) => handleModuleComplete("modulo-8", score)}
          />
        </TabsContent>
      )}"""

    # Módulo 9 Refactor Block
    m9_new = """      {/* ==================== MÓDULO 9 ==================== */}
      {activeTab === "modulo-9" && (
        <TabsContent value="modulo-9" className="space-y-12 mt-0">
          <ModuleBanner
            numero={9}
            titulo="Administração na Petrobras"
            descricao="Aplicação prática: desafios únicos de suprimento em uma estatal de energia. Leis 13.303 e 14.133, processos, fornecedores, sustentabilidade."
            variant={mv[9]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[9]}
              title="Dossiê Petrobras: Marco Regulatório Legal"
              description="Domine a complexidade jurídica e a comparação crítica dos regimes de contratações estatais e públicas."
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              {/* C — Contexto (parágrafos 1 e 2) */}
              <p>A Petrobras, na qualidade de Sociedade de Economia Mista sob controle da União, opera sob um regime jurídico híbrido de extrema complexidade. Ao mesmo tempo em que disputa espaço no mercado internacional de óleo e gás concorrendo diretamente com gigantes privadas globais, a companhia deve observar com absoluto rigor os princípios constitucionais da Administração Pública. Essa natureza ambivalente exige ferramentas de governança de suprimentos robustas, combinando agilidade comercial com controles jurídicos estritos.</p>
              <p>A operacionalização dessa engrenagem corporativa baseia-se no estatuto de licitações específico das estatais, o que afasta a incidência das normas gerais de concorrência impostas à administração pública direta. Para o cargo de Técnico de Suprimentos, compreender o desenho legislativo aplicável às compras públicas é pré-requisito fundamental para a prevenção de irregularidades administrativas. A banca CESGRANRIO prioriza exaustivamente a diferenciação dos limites legais e das modalidades contratuais vigentes no país.</p>

              {/* E — Explicação (parágrafos 3 e 4) */}
              <p>O marco legal que disciplina as aquisições da Petrobras é a <strong>Lei das Estatais (Lei nº 13.303/16)</strong>, que outorga às empresas estatais um regulamento próprio de licitações mais dinâmico que a lei comum de contratos. Esse estatuto foi desenhado para assegurar flexibilidade comercial frente à concorrência privada. Assim sendo, a Petrobras **não** submete seus certames de compras à Nova Lei de Licitações (Lei nº 14.133/21), exceto nos limites expressos de aplicação de crimes licitatórios tipificados no Código Penal brasileiro.</p>
              <p>Na estrutura licitatória da Lei 13.303/16, destaca-se a obrigatoriedade da **Inversão de Fases** como regra absoluta. Diferente do rito analógico clássico das autarquias federais, nas estatais o processamento inicia-se diretamente com a apresentação e o julgamento das propostas de preços financeiros de todos os licitantes. Apenas após a definição do vencedor do certame financeiro é que a comissão realiza a abertura e a análise exaustiva dos documentos de habilitação jurídica, fiscal e contábil deste primeiro colocado.</p>

              {/* D — Demonstração (parágrafos 5 e 6) */}
              <p>Para visualizar o ganho de eficiência operacional gerado por essa regra, imagine uma licitação para aquisição de sobressalentes mecânicos com a participação de 40 empresas concorrentes. No modelo tradicional de licitação da administração direta, a comissão de licitação seria forçada a abrir, analisar e julgar as centenas de certidões negativas e balanços de todas as 40 empresas antes mesmo de olhar os envelopes de preços. Esse rito burocrático gerava atrasos de meses e recorrentes disputas judiciais sobre documentação.</p>
              <p>No rito especial próprio da Lei das Estatais, abre-se e julga-se de imediato o preço ofertado. Se a empresa Alfa apresenta a melhor proposta financeira e atende a todos os requisitos do edital, a comissão abre **apenas a documentação de habilitação da Alfa**. Caso suas certidões estejam regulares, ela é declarada vencedora e o certame é homologado. Os envelopes das outras 39 empresas derrotadas permanecem fechados e são devolvidos, economizando centenas de horas administrativas de verificação burocrática.</p>

              {/* E — Expansão (parágrafos 7 e 8) */}
              <p>Além da celeridade processual, o estatuto das estatais introduziu mecanismos de blindagem e gestão de integridade institucional sob a égide do ESG (Environmental, Social, and Governance). Nas grandes contratações integradas de engenharia, a Petrobras deve obrigatoriamente formalizar uma **Matriz de Riscos** detalhada no edital, partilhando previamente as responsabilidades de riscos geotécnicos e flutuações cambiais entre a estatal e o consórcio vencedor, reduzindo litígios contratuais futuros.</p>
              <p>A governança corporativa da Petrobras é reforçada por canais de compliance rigorosos baseados na Lei Anticorrupção. Toda contratação estratégica passa pela devida auditoria DDI (Devida Diligência de Integridade) contra fraudes, lavagem de dinheiro e nepotismo de fornecedores. Essa verificação confere ao rito licitatório um caráter preventivo que blinda a companhia contra reveses de imagem internacional, mantendo a Petronect (portal eletrônico de compras) sob os limites éticos constitucionais da moralidade e da isonomia.</p>

              {/* A — Aplicação (parágrafos 9 e 10) */}
              <p>Na rotina de contratações diretas, o Técnico de Suprimentos deve prestar atenção aos limites e às justificativas técnicas exigidas. A Lei 13.303 fixa limites de alçada específicos para a dispensa de licitação por valor (R$ 100.000,00 para obras de engenharia e R$ 50.000,00 para aquisições gerais de bens). Qualquer compra direta fundamentada em dispensa ou inexigibilidade (por inviabilidade de competição frente a fornecedor exclusivo ou fabricante único) requer parecer de justificativa técnica e ateste de compatibilidade de preço.</p>
              <p>Nas provas da CESGRANRIO, o candidato deve memorizar as diferenças capitais de limites e modalidades entre as leis. A banca tenta induzir o concorrente ao erro afirmando que a Petrobras pode aplicar o rito de "Diálogo Competitivo" (modalidade da 14.133) ou que está sujeita à homologação prévia da União. O candidato atento deve saber que a Lei das Estatais possui regulamento de licitações próprio e flexível, e que a Petronect opera ritos rápidos baseados no pregão eletrônico e no procedimento licitatório próprio.</p>
            </div>
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index="LICITAÇÕES"
              variant={mv[9]}
              title="Lei das Estatais (13.303) vs. Nova Lei de Licitações (14.133)"
              description="Comparativo definitivo exigido pela banca CESGRANRIO para o cargo de Técnico de Suprimentos."
            />

            {/* Layout responsivo premium (Opção B): Tabela rolável no Desktop, Cards empilhados no Mobile */}
            <div className="block lg:hidden space-y-4">
              <AlertBox tipo="info" titulo="Modo Mobile Ativo">
                Abaixo, a tabela comparativa premium foi adaptada para cards empilhados de alta legibilidade para telas menores.
              </AlertBox>

              <div className="p-4 bg-card border rounded-xl space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-600">Critério 1</span>
                <h5 className="font-bold text-foreground text-xl">Âmbito de Aplicação</h5>
                <div className="space-y-1 text-lg text-slate-700 dark:text-slate-300">
                  <p><strong>Lei das Estatais (13.303/2016):</strong> Sociedades de Economia Mista (ex: Petrobras, Banco do Brasil), Empresas Públicas (ex: Caixa Econômica) e suas subsidiárias.</p>
                  <p><strong>Nova Lei de Licitações (14.133/2021):</strong> Administração Direta, Autárquica e Fundacional da União, Estados, DF e Municípios.</p>
                  <p className="text-base text-amber-600 mt-1 font-bold italic">💡 CESGRANRIO: Estatais NÃO usam a Lei 14.133, exceto se expressamente indicado em crimes licitatórios do Código Penal.</p>
                </div>
              </div>

              <div className="p-4 bg-card border rounded-xl space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-600">Critério 2</span>
                <h5 className="font-bold text-foreground text-xl">Modalidades de Licitação</h5>
                <div className="space-y-1 text-lg text-slate-700 dark:text-slate-300">
                  <p><strong>Lei das Estatais (13.303/2016):</strong> Não adota modalidades rígidas de nomes da 14.133. Aplica o <strong>Procedimento Licitatório Próprio</strong> e o <strong>Pregão</strong> (para bens e serviços comuns).</p>
                  <p><strong>Nova Lei de Licitações (14.133/2021):</strong> Modalidades estritas de lei: Pregão, Concorrência, Concurso, Leilão e <strong>Diálogo Competitivo</strong>.</p>
                  <p className="text-base text-amber-600 mt-1 font-bold italic">💡 CESGRANRIO: A Lei 13.303 não possui a modalidade de Diálogo Competitivo ou Concorrência nos moldes tradicionais.</p>
                </div>
              </div>

              <div className="p-4 bg-card border rounded-xl space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-600">Critério 3</span>
                <h5 className="font-bold text-foreground text-xl">Inversão de Fases de Habilitação</h5>
                <div className="space-y-1 text-lg text-slate-700 dark:text-slate-300">
                  <p><strong>Lei das Estatais (13.303/2016):</strong> <strong>Regra Geral Obrigatória:</strong> Julgamento financeiro primeiro. Somente o licitante 1º colocado tem a documentação de habilitação analisada.</p>
                  <p><strong>Nova Lei de Licitações (14.133/2021):</strong> Regra geral: proposta e depois habilitação. Mas a inversão é permitida apenas mediante justificativa expressa no edital.</p>
                  <p className="text-base text-amber-600 mt-1 font-bold italic">💡 CESGRANRIO: A inversão obrigatória nas estatais economiza tempo considerável de tramitação dos certames.</p>
                </div>
              </div>

              <div className="p-4 bg-card border rounded-xl space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-600">Critério 4</span>
                <h5 className="font-bold text-foreground text-xl">Limites para Dispensa de Licitação</h5>
                <div className="space-y-1 text-lg text-slate-700 dark:text-slate-300">
                  <p><strong>Lei das Estatais (13.303/2016):</strong> R$ 100.000,00 para obras/engenharia e R$ 50.000,00 para compras/serviços comuns (atualizável por decreto interno).</p>
                  <p><strong>Nova Lei de Licitações (14.133/2021):</strong> R$ 100.000,00 para engenharia/manutenção e R$ 50.000,00 para outros serviços e compras (reajustados anualmente).</p>
                  <p className="text-base text-amber-600 mt-1 font-bold italic">💡 CESGRANRIO: Cuidado com a alteração recente de limites e regras de publicidade de compras diretas.</p>
                </div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/80 text-foreground text-lg font-bold border-b border-border">
                    <th className="p-4">Critério Técnico</th>
                    <th className="p-4 w-1/3">Lei das Estatais (Lei 13.303/16)</th>
                    <th className="p-4 w-1/3">Nova Lei de Licitações (Lei 14.133/21)</th>
                    <th className="p-4">Dica Tática CESGRANRIO</th>
                  </tr>
                </thead>
                <tbody className="text-lg text-slate-700 dark:text-slate-300 divide-y divide-border">
                  <tr>
                    <td className="p-4 font-bold bg-muted/20 text-xl">Âmbito de Aplicação</td>
                    <td className="p-4">Empresas Públicas e Sociedades de Economia Mista federais, estaduais e municipais (ex: Petrobras, Banco do Brasil).</td>
                    <td className="p-4">Administração Direta, autarquias, fundações públicas e órgãos especiais da federação.</td>
                    <td className="p-4 text-emerald-600 font-semibold">Petrobras usa unicamente a 13.303 para compras de atividades-fim e meio. Nunca a 14.133.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-muted/20 text-xl">Modalidades</td>
                    <td className="p-4">Adota o <strong>Procedimento Licitatório Próprio</strong> regulado por regulamento interno, mais a adoção do <strong>Pregão</strong> para bens comuns.</td>
                    <td className="p-4">Pregão, Concorrência, Concurso, Leilão e <strong>Diálogo Competitivo</strong> (extinguiu tomada de preço).</td>
                    <td className="p-4 text-emerald-600 font-semibold">Estatais não possuem a modalidade formal de Diálogo Competitivo.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-muted/20 text-xl">Fase de Habilitação</td>
                    <td className="p-4"><strong>Regra Geral:</strong> Ocorre a inversão de fases obrigatória. Abre-se o preço, julga-se e <strong>apenas o licitante 1º colocado</strong> envia a habilitação.</td>
                    <td className="p-4">Propostas de preço antecedem a habilitação, mas permite-se o rito inverso clássico sob forte motivação legal.</td>
                    <td className="p-4 text-emerald-600 font-semibold">Nas estatais, a inversão é regra legal expressa. Poupa tempo e burocracia de arquivo.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-muted/20 text-xl">Dispensa de Licitação</td>
                    <td className="p-4">Valores de alçada: <strong>R$ 100 mil</strong> para obras e engenharia; <strong>R$ 50 mil</strong> para compras e serviços comuns (atualizáveis).</td>
                    <td className="p-4">Valores de alçada: <strong>R$ 100 mil</strong> para engenharia/manutenções e <strong>R$ 50 mil</strong> para outras aquisições (reajustáveis).</td>
                    <td className="p-4 text-emerald-600 font-semibold">Os valores originais nominalmente coincidem, mas as estatais usam índice de reajuste próprio.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-muted/20 text-xl">Matriz de Riscos</td>
                    <td className="p-4"><strong>Obrigatória</strong> em todos os contratos de empreitada integrada e semi-integrada para dividir responsabilidades.</td>
                    <td className="p-4">Opcional como regra geral, mas obrigatória em contratações de grande escala financeira ou complexidade técnica.</td>
                    <td className="p-4 text-emerald-600 font-semibold">A matriz de risco da Petrobras blinda a estatal contra reequilíbrios contratuais abusivos de fornecedores.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[9]}
              title="Direito Administrativo Aplicado à Sociedade de Economia Mista"
              description="Desafios e soluções administrativas na realidade Petrobras."
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "Lei das Estatais (13.303): O Regime Jurídico das Compras Públicas",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A <strong>Lei 13.303/16</strong> representou um marco de governança para as empresas públicas e sociedades de economia mista brasileiras. Ela rege todas as compras de bens, obras, serviços de engenharia e alienações da Petrobras.
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-3 mt-4">
                        <span className="font-bold text-xl text-teal-600 block">Objetivos e Vantagens da Lei 13.303/16:</span>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                          <li><strong>Liberdade Comercial:</strong> Permite flexibilidade operacional nas contratações para garantir competitividade de mercado perante a livre concorrência.</li>
                          <li><strong>Combate à Corrupção:</strong> Regras estritas de conformidade, compliance e auditoria interna de integridade corporativa.</li>
                          <li><strong>Controle de Riscos:</strong> Divisão antecipada de responsabilidades de riscos econômico-financeiros no edital (matriz de riscos).</li>
                        </ul>
                      </div>
                    </div>
                  ),
                  icone: <LuScale />,
                },
                {
                  titulo: "A Petronect e o Princípio Constitucional da Publicidade",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A Petrobras realiza a esmagadora maioria de suas licitações de bens e serviços através do portal eletrônico <strong>Petronect</strong> (regime eletrônico de compras). Isso cumpre o princípio constitucional da <strong>Publicidade</strong> e da <strong>Isonomia</strong>:
                      </p>
                      <AlertBox tipo="info" titulo="Vantagens do Petronect">
                        <span className="text-lg">
                          O sistema Petronect garante que fornecedores de qualquer porte ou localização geográfica possam concorrer em igualdade de condições. Todas as propostas de preço de sobressalentes, cotações e atas de julgamento ficam registradas digitalmente, impedindo manipulações manuais de compras e otimizando a velocidade das transações.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Inversão de Fases: Otimização de Tempo na Cadeia de Suprimentos",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        No rito licitatório regulado pela Lei das Estatais, a <strong>inversão de fases é obrigatória</strong> como regra processual geral, o que gera economia brutal de tempo operacional:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-3 mt-4">
                        <span className="font-bold text-xl text-emerald-600 block">Como Funciona a Inversão:</span>
                        <p className="text-lg">
                          Primeiramente, são abertas, analisadas e classificadas apenas as propostas financeiras de preço de todos os concorrentes. Somente o licitante vencedor (1º colocado) tem sua documentação de habilitação aberta e avaliada.
                        </p>
                        <p className="text-lg text-slate-500 italic">
                          💡 Se os documentos da empresa vencedora estiverem regulares, o certame é homologado sem que os envelopes dos outros concorrentes perdedores tenham sido sequer abertos.
                        </p>
                      </div>
                    </div>
                  ),
                  icone: <LuFileCheck />,
                },
                {
                  titulo: "Conceituação: A Dispensa de Licitação e os Limites de Alçada",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A contratação direta ocorre de forma excepcional quando o certame licitatório formal é dispensado ou inexigível por inviabilidade de concorrência.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-teal-500/5 border border-teal-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-teal-800 dark:text-teal-400 mb-2">Limites de Dispensa por Valor:</h6>
                          <p className="text-lg">
                            R$ 100.000,00 para obras de engenharia e reformas. R$ 50.000,00 para compras gerais de bens e contratações de serviços comuns (reajustados periodicamente por decreto interno).
                          </p>
                        </div>
                        <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-amber-800 dark:text-amber-400 mb-2">Inexigibilidade de Licitação:</h6>
                          <p className="text-lg">
                            Ocorre quando a licitação formal é logicamente inviável (ex: contratação de representante exclusivo de sobressalentes importados, ou serviços técnicos de notória especialização sem similares no país).
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuScale />,
                },
                {
                  titulo: "Exemplificação: Processo de Compra de Itens Estratégicos vs. Commodities",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        O setor de suprimento da Petrobras atua na classificação matricial das compras em duas grandes categorias:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-muted rounded border border-border">
                          <strong className="text-emerald-700 text-xl block mb-2">1. Itens Estratégicos (Customizados):</strong>
                          <p className="text-lg">
                            Equipamentos submarinos complexos (ex: Árvores de Natal Molhadas - ANM, linhas flexíveis).
                          </p>
                          <p className="mt-4 font-semibold text-lg text-slate-600">Ação de Suprimento:</p>
                          <p className="text-lg mt-1 text-slate-500">Exige qualificação restrita técnica rigorosa prévia do fornecedor e longas negociações de engenharia sob regime de matriz de riscos complexa.</p>
                        </div>
                        <div className="p-5 bg-muted rounded border border-border">
                          <strong className="text-blue-700 text-xl block mb-2">2. Itens de Prateleira (Commodities):</strong>
                          <p className="text-lg">
                            Parafusos, tubulações padrão, óleo comum, equipamentos de escritório, uniformes.
                          </p>
                          <p className="mt-4 font-semibold text-lg text-slate-600">Ação de Suprimento:</p>
                          <p className="text-lg mt-1 text-slate-500">Contratação ágil por pregão eletrônico na Petronect, focada única e exclusivamente no menor preço e prazos céleres de entrega nos pátios de refino.</p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: Questões Clássicas sobre Inversão de Fases nas Provas",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A inversão de fases é o calcanhar de Aquiles de muitos candidatos. Memorize o fluxo oficial ditado pela Lei das Estatais em contratações:
                      </p>
                      <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20 text-lg">
                        <span className="font-bold text-amber-800 text-xl block mb-3">Fluxo Licitatório Oficial da Lei 13.303:</span>
                        <div className="flex flex-wrap items-center gap-2 mt-2 font-bold text-slate-800 text-lg">
                          <span>1. Edital</span> <LuChevronRight className="text-amber-500" />
                          <span>2. Propostas</span> <LuChevronRight className="text-amber-500" />
                          <span>3. Julgamento</span> <LuChevronRight className="text-amber-500" />
                          <span>4. Recursos</span> <LuChevronRight className="text-amber-500" />
                          <span className="bg-emerald-500/20 text-emerald-800 p-2 rounded">5. Habilitação (Apenas do Vencedor)</span> <LuChevronRight className="text-amber-500" />
                          <span>6. Homologação</span>
                        </div>
                        <p className="mt-4 text-base text-slate-600">
                          Note que os envelopes de documentação fiscal e trabalhista (habilitação) de todos os perdedores <strong>nunca são abertos</strong>, economizando centenas de horas de conferência burocrática de certidões.
                        </p>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: A Dispensa em Licitação Fracassada ou Deserta",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Um cenário delicado em Suprimentos é a ocorrência de licitações vazias (sem interessados) ou fracassadas (todas as propostas foram desclassificadas por preços abusivos ou descumprimento de especificações).
                      </p>
                      <AlertBox tipo="warning" titulo="A Dispensa Técnica Motivada">
                        <span className="text-lg">
                          A Lei das Estatais prevê a exceção de <strong>Contratação Direta (Dispensa)</strong> caso a licitação anterior tenha sido fracassada ou deserta e sua repetição possa causar sérios prejuízos à operação da Petrobras. Contudo, a gerência de suprimentos deve documentar de forma inequívoca que as condições de mercado originais do edital fracassado foram mantidas e que o preço contratado diretamente está em consonância com as médias de mercado locais.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

          <ModuleConsolidation
            index={9}
            variant={mv[9]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Administração Pública e Lei 13.303",
              duration: "13:00",
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Processo de Compras Petrobras",
                  type: "Fluxograma",
                  placeholderColor: "bg-slate-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Lei 13.303 - Princípios",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">⚖️ 🏢</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                    <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center">
                      <p className="font-bold text-teal-600 mb-1 text-xl">Regime Licitatório</p>
                      <p className="text-base text-muted-foreground">Regulado pela Lei das Estatais (13.303/16), blindado de regras da lei comum de licitações 14.133/21.</p>
                    </div>
                    <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                      <p className="font-bold text-cyan-600 mb-1 text-xl">Petronect</p>
                      <p className="text-base text-muted-foreground">Portal eletrônico de compras que operacionaliza a publicidade, isonomia e agilidade comercial das compras.</p>
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                      <p className="font-bold text-emerald-600 mb-1 text-xl">Governança ESG</p>
                      <p className="text-base text-muted-foreground">Compliance, matriz de riscos obrigatória e auditoria DDI integrada para blindar parcerias de suprimentos.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• A inversão de fases (proposta antes de habilitação) é a regra legal impositiva das compras das estatais.</p>
                    <p>• As estatais usam o Pregão e o Procedimento Licitatório Próprio, não possuindo modalidade de Diálogo Competitivo.</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "Administração na Petrobras",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-9")}
            titulo="QUIZ: Administração na Petrobras"
            numero={9}
            variant={mv[9]}
            onComplete={(score: number) => handleModuleComplete("modulo-9", score)}
          />
        </TabsContent>
      )}"""

    # Módulo 10 Refactor Block (Simulado Geral - sem carrossel, com introdução limpa e fontes grandes)
    m10_new = """      {/* ==================== MÓDULO 10 ==================== */}
      {activeTab === "modulo-10" && (
        <TabsContent value="modulo-10" className="space-y-12 mt-0">
          <ModuleBanner
            numero={10}
            titulo="Simulado Geral"
            descricao="Consolidação de todos os 9 módulos anteriores. 10 questões integradas cobrindo fundamentos, teorias, processos e contexto Petrobras."
            variant={mv[10]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[10]}
              title="Síntese Integradora"
              description="Antes do simulado: revise os conceitos-chave de cada módulo."
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed bg-muted/30 p-6 rounded-2xl border border-border">
              <p>O Simulado Geral representa o coroamento de sua jornada de estudos em Administração Geral para o cargo de Técnico de Suprimentos da Petrobras. Ao longo dos nove módulos anteriores, você percorreu desde os fundamentos básicos do ato de gerenciar (eficiência versus eficácia e os papéis de Mintzberg) até a complexidade legal e de conformidade imposta pela Lei das Estatais (Lei 13.303/16) e o monitoramento estratégico de processos (BPM/BPMN).</p>
              <p>A prova elaborada pela banca CESGRANRIO exige do candidato não apenas a memorização abstrata dos termos, mas a capacidade prática de aplicar teorias de comportamento (vieses decisórios de Simon, fatores motivadores de Herzberg) e design organizacional (estruturas matriciais e unidade de comando) na resolução de casos práticos ambientados no ecossistema de compras de uma grande estatal de energia. Utilize este simulado como termômetro de sua preparação final.</p>
            </div>
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[10]}
              title="Checklist de Preparação"
              description="Antes de iniciar o simulado, certifique-se que você domina os pilares estratégicos:"
            />
            <div className="space-y-4">
              <AlertBox tipo="success" titulo="Metas de Aprendizado Consolidadas (Revisão Crítica)">
                <ul className="list-disc pl-6 space-y-3 mt-2 text-lg text-justify">
                  <li><strong>Robert Katz:</strong> Habilidade conceitual predomina no topo estratégico; humanas em todos os níveis; técnicas na base operacional.</li>
                  <li><strong>Mintzberg:</strong> Diferenciar com precisão os papéis interpessoais (liderança, ligação), informacionais (monitor, porta-voz) e decisórios (empreendedor, negociador).</li>
                  <li><strong>Fatores de Herzberg:</strong> Condições físicas de trabalho, políticas da empresa e salário básico são Fatores Higiênicos (extrínsecos, apenas previnem a insatisfação). Reconhecimento e crescimento são Fatores Motivadores (intrínsecos, geram motivação ativa).</li>
                  <li><strong>Estrutura Organizacional:</strong> A estrutura Matricial quebra de forma planejada o princípio de unidade de comando de Fayol para gerenciar projetos integrados sob dupla subordinação.</li>
                  <li><strong>Gestão por Processos:</strong> Modelagem horizontal focada no fluxo de valor de ponta a ponta (As-Is/To-Be). Kaizen realiza melhorias incrementais; Reengenharia promove reestruturações radicais do zero.</li>
                  <li><strong>Lei 13.303/16 (Estatais):</strong> Rito licitatório próprio por meio do portal Petronect, com inversão de fases obrigatória e adoção de matriz de riscos em contratações de engenharia.</li>
                </ul>
              </AlertBox>
            </div>
          </div>

          <ModuleConsolidation
            index={10}
            variant={mv[10]}
            video={{
              videoId: "7c-YVly_C9o",
              title: "Revisão Geral - Administração Completa",
              duration: "20:00",
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Mapa Mental - Todos os Módulos",
                  type: "Síntese Integradora",
                  placeholderColor: "bg-emerald-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "As 10 Diretrizes de Ouro do Candidato de Elite",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">🎓 🏆</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                    <div className="p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-xl space-y-2">
                      <p className="font-bold text-indigo-700 dark:text-indigo-400 text-xl">1. Habilidades & Papéis</p>
                      <ul className="list-disc pl-5 space-y-1 text-base text-muted-foreground">
                        <li>Katz: Conceitual é vital no nível de diretoria estratégica.</li>
                        <li>Mintzberg: Interpessoais, informacionais e decisórios.</li>
                      </ul>
                    </div>
                    <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-xl space-y-2">
                      <p className="font-bold text-rose-700 dark:text-rose-400 text-xl">2. Vetor Comportamental</p>
                      <ul className="list-disc pl-5 space-y-1 text-base text-muted-foreground">
                        <li>Herzberg: Salário básico e benefícios evitam insatisfação.</li>
                        <li>Liderança: O estilo deve se adaptar à maturidade da equipe.</li>
                      </ul>
                    </div>
                    <div className="p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-xl space-y-2">
                      <p className="font-bold text-cyan-700 dark:text-cyan-400 text-xl">3. Desenho & Processos</p>
                      <ul className="list-disc pl-5 space-y-1 text-base text-muted-foreground">
                        <li>Matricial: Quebra a unidade de comando linear de Fayol.</li>
                        <li>BPMN: Modelagem horizontal As-Is (atual) e To-Be (futura).</li>
                      </ul>
                    </div>
                    <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-2">
                      <p className="font-bold text-emerald-700 dark:text-emerald-400 text-xl">4. Tomada de Decisão & Lei 13.303</p>
                      <ul className="list-disc pl-5 space-y-1 text-base text-muted-foreground">
                        <li>Simon: Decisões satisfatórias sob Racionalidade Limitada.</li>
                        <li>Lei 13.303: Inversão de fases poupa tempo administrativo.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Diretriz de Ouro CESGRANRIO:</p>
                    <p>• O simulado final reúne 10 questões robustas integrando todos os temas estruturais de administração geral. Resolva com foco nos limites conceituais das teorias.</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              titulo: "Síntese Administração Geral",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={quizM10}
            titulo="Simulado Geral: Administração Geral Completa"
            numero={10}
            variant={mv[10]}
            onComplete={(score: number) => handleModuleComplete("modulo-10", score)}
          />
        </TabsContent>
      )}"""

    # Vamos substituir o bloco do Módulo 7 no arquivo
    # Procuramos o padrão do Módulo 7
    m7_pattern = r'\{\/\* ==================== MÓDULO 7 ==================== \*\/\s+\{activeTab === "modulo-7" && \([\s\S]+?QuizInterativo[\s\S]+?modulo-7"[\s\S]+?\/>\s+<\/TabsContent>\s+\)\s*\}'
    
    # Mas como o regex pode ser instável, vamos buscar por comentários literais de início de tabs.
    # Vamos fazer o split confiável:
    blocks = content.split('      {/* ==================== MÓDULO 7 ==================== */}')
    if len(blocks) != 2:
        print("Erro: Marcador do Módulo 7 não é único!")
        return
        
    part_before_m7 = blocks[0]
    rest = blocks[1]
    
    # Agora dividimos o resto no marcador do Módulo 8
    blocks8 = rest.split('      {/* ==================== MÓDULO 8 ==================== */}')
    if len(blocks8) != 2:
        print("Erro: Marcador do Módulo 8 não é único!")
        return
        
    part_m7_old = blocks8[0]
    rest8 = blocks8[1]
    
    # Dividimos o resto no marcador do Módulo 9
    blocks9 = rest8.split('      {/* ==================== MÓDULO 9 ==================== */}')
    if len(blocks9) != 2:
        print("Erro: Marcador do Módulo 9 não é único!")
        return
        
    part_m8_old = blocks9[0]
    rest9 = blocks9[1]
    
    # Dividimos o resto no marcador do Módulo 10
    blocks10 = rest9.split('      {/* ==================== MÓDULO 10 ==================== */}')
    if len(blocks10) != 2:
        print("Erro: Marcador do Módulo 10 não é único!")
        return
        
    part_m9_old = blocks10[0]
    rest10 = blocks10[1]
    
    # E o resto10 termina no fechamento do template e final do arquivo
    # O Módulo 10 termina onde acaba o TabsContent do Módulo 10 e fecha o AulaTemplate
    blocks_end = rest10.split('    </AulaTemplate>')
    if len(blocks_end) != 2:
        print("Erro: Fechamento de AulaTemplate não é único!")
        return
        
    part_m10_old = blocks_end[0]
    part_after = blocks_end[1]
    
    # Monta o novo conteúdo
    new_content = (
        part_before_m7 +
        m7_new + "\n\n" +
        m8_new + "\n\n" +
        m9_new + "\n\n" +
        m10_new + "\n" +
        "    </AulaTemplate>" +
        part_after
    )
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print("Sucesso! Módulos 7, 8, 9 e 10 refatorados com precisão absoluta de string.")

if __name__ == "__main__":
    refactor()
