import re

def refactor():
    filepath = "src/components/aulas/administracao/AulaAdministracaoGeralSuprimento.tsx"
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Módulo 1 Refactor Block
    m1_new = """      {/* ==================== MÓDULO 1 ==================== */}
      {activeTab === "modulo-1" && (
        <TabsContent value="modulo-1" className="space-y-12 mt-0">
          <ModuleBanner
            numero={1}
            titulo="Fundamentos de Administração"
            descricao="Entenda a essência da administração como processo de planejar, organizar, dirigir e controlar recursos para atingir objetivos organizacionais."
            variant={mv[1]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[1]}
              title="Definição e Pilares da Administração"
              description="Os conceitos fundamentais que sustentam toda a prática administrativa moderna."
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              {/* C — Contexto (parágrafos 1 e 2) */}
              <p>A ciência da administração consolidou-se ao longo do último século como uma das disciplinas fundamentais para a viabilização e longevidade das organizações complexas. Nos exames de admissão de nível superior da Petrobras, elaborados tradicionalmente pela banca CESGRANRIO, os conceitos introdutórios de administração geral não são cobrados de forma puramente teórica, mas sim contextualizados nas rotinas de gerenciamento de recursos e planejamento estratégico. O entendimento claro desses alicerces é a primeira barreira de conhecimento que separa o candidato da aprovação.</p>
              <p>Gerenciar, portanto, deixa de ser uma atividade empírica e improvisada para tornar-se um processo sistemático de tomada de decisão e coordenação integrada. O ambiente corporativo de uma grande estatal de energia, caracterizado pela alta complexidade regulatória e por pressões globais de mercado, exige de seus técnicos e gerentes uma sólida formação conceitual. Sem essa base conceitual, a aplicação de ferramentas mais avançadas de logística e governança torna-se inócua ou disfuncional.</p>

              {/* E — Explicação (parágrafos 3 e 4) */}
              <p>No núcleo das teorias fundamentais da administração encontra-se a conceituação clássica de <strong>eficiência</strong> e <strong>eficácia</strong>. A eficiência refere-se estritamente aos meios e métodos de execução, buscando a otimização dos recursos com foco na minimização do desperdício de insumos, tempo e capital. A eficácia, por outro lado, foca de forma exclusiva nos fins, resultados e metas planejadas, representando a capacidade da empresa de cumprir de fato os objetivos estabelecidos com o mercado.</p>
              <p>Complementando este pilar, destaca-se a modelagem das <strong>habilidades gerenciais</strong> de Robert Katz (técnica, humana e conceitual) e os **10 papéis gerenciais** formulados por Henry Mintzberg (subdivididos em categorias interpessoais, informacionais e decisórias). De acordo com a divisão conceitual tradicional, enquanto a habilidade técnica é o requisito básico para o nível operacional da empresa, a habilidade conceitual, caracterizada pela visão sistêmica integrada, assume papel preponderante e mandatório nas lideranças situadas no topo estratégico.</p>

              {/* D — Demonstração (parágrafos 5 e 6) */}
              <p>Para ilustrar graficamente esses conceitos na prática corporativa, considere a atividade de compras de tubulações de aço para o escoamento de gás natural de um consórcio petrolífero. Se a equipe de suprimentos realiza cotações ágeis, reduz custos administrativos do processo licitatório em 30% e otimiza a logística de transporte das tubulações até a base portuária, ela atuou com extrema <strong>eficiência operacional</strong> (melhor aproveitamento de recursos).</p>
              <p>No entanto, se as tubulações adquiridas não atenderem às normas técnicas de resistência de pressão e, consequentemente, impedirem o início da operação do gasoduto na data planejada, o processo falhou em sua <strong>eficácia</strong> (não atingimento do resultado estratégico). A verdadeira excelência administrativa reside no equilíbrio dinâmico entre ambas as frentes: comprar com economia de recursos (eficiência) assegurando a integridade técnica e o cumprimento fiel do cronograma de implantação da infraestrutura de gás (eficácia).</p>

              {/* E — Expansão (parágrafos 7 e 8) */}
              <p>Os desdobramentos dessas teorias apontam para a importância de compreender a organização como um sistema aberto, cujos níveis hierárquicos (estratégico, tático e operacional) interagem continuamente. A transição entre esses níveis exige do administrador uma mudança na proporção de suas habilidades: o gerente tático (intermediário) atua como a ponte de conversão das diretrizes corporativas em planos de ação de curto prazo, demandando alta habilidade de comunicação humana para integrar equipes horizontais distintas.</p>
              <p>Além das habilidades individuais, a atuação gerencial concretiza-se por meio dos papéis interpessoais (onde o gestor atua como líder e elo com o ambiente externo), informacionais (coleta e disseminação de conhecimentos essenciais) e decisórios. Nos papéis decisórios (empreendedor, solucionador de conflitos, alocador de recursos e negociador), o administrador exerce de fato o arbítrio sobre os rumos corporativos, aplicando a governança necessária para arbitrar disputas internas de prioridades.</p>

              {/* A — Aplicação (parágrafos 9 e 10) */}
              <p>Nas avaliações aplicadas pela CESGRANRIO, as questões costumam contrapor cenários práticos e induzir o candidato ao erro por meio da inversão sistemática das definições de eficiência e eficácia. Outra pegadinha clássica consiste em afirmar que as habilidades humanas pertencem exclusivamente ao nível intermediário, quando, na verdade, o modelo clássico de Katz estabelece de forma clara que as **habilidades humanas possuem relevância crítica e igual proporção** em todos os níveis da hierarquiaorganizacional.</p>
              <p>Para o cargo de suprimentos da Petrobras, a aplicação prática do conceito de efetividade relaciona-se com o cumprimento do papel socioeconômico da companhia no abastecimento de combustíveis nacionais sem descuidar da eficiência operacional de refino e distribuição de derivados. O técnico em suprimentos deve agir sob essa mentalidade integrada, percebendo que a rotina burocrática de conferência documental é o alicerce operacional que viabiliza a soberania energética de longo prazo do país.</p>
            </div>
            
            <CardCarousel
              cards={[
                {
                  titulo: "O que é Administração?",
                  descricao: "Processo integrado de planejar, organizar, dirigir e controlar recursos (humanos, financeiros, materiais, informacionais) para alcançar objetivos organizacionais de forma eficiente e eficaz.",
                  icone: <LuBriefcase />,
                  corFundo: "bg-emerald-500/10",
                },
                {
                  titulo: "Eficiência vs Eficácia",
                  descricao: "Eficiência: fazer certo (foco nos meios e processos, menor custo). Eficácia: fazer o certo (foco nos fins e resultados). Ambos são críticos na cadeia de suprimentos da Petrobras.",
                  icone: <LuCheck />,
                  corFundo: "bg-blue-500/10",
                },
                {
                  titulo: "Universalidade e Níveis",
                  descricao: "A administração é universal: aplica-se a todas as organizações e áreas. Distribui-se em três níveis organizacionais: estratégico, tático e operacional.",
                  icone: <LuNetwork />,
                  corFundo: "bg-cyan-500/10",
                },
                {
                  titulo: "Importância Estratégica",
                  descricao: "Em um mercado competitivo de energia global, a qualidade administrativa diferencia entre líderes e seguidores. Para a Petrobras, é questão de sobrevivência e soberania.",
                  icone: <LuTrendingUp />,
                  corFundo: "bg-amber-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[1]}
              title="Habilidades e Papéis Gerenciais no Contexto Administrativo"
              description="Explorando a profundidade pedagógica dos fundamentos de administração."
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "Conceituação: O Processo Administrativo e Habilidades de Katz",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A administração moderna é definida como uma ciência social aplicada, cujo objeto de estudo é a atividade organizacional. Para compreender a atuação do administrador em qualquer esfera, recorre-se clássicamente ao modelo de <strong>Habilidades Administrativas de Robert Katz</strong>, extremamente cobrado pela banca CESGRANRIO:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-lg">
                        <li>
                          <strong>Habilidades Técnicas:</strong> Envolvem o uso de conhecimento especializado e facilidade na execução de técnicas relacionadas ao trabalho e aos procedimentos. São cruciais no <em>nível operacional</em> (onde as coisas são feitas fisicamente, como na logística de armazenamento).
                        </li>
                        <li>
                          <strong>Habilidades Humanas:</strong> Relacionam-se com a capacidade de trabalhar com pessoas, compreender suas atitudes e motivações, liderar e comunicar de forma eficaz. São igualmente distribuídas e fundamentais em <em>todos os níveis hierárquicos</em> (operacional, tático e estratégico), pois toda administração é feita com e por meio de pessoas.
                        </li>
                        <li>
                          <strong>Habilidades Conceituais:</strong> Consistem na capacidade de enxergar a organização como um todo, compreender a complexidade sistêmica, entender como as várias funções se integram e como a empresa se relaciona com o ambiente externo. São a prioridade máxima no <em>nível estratégico</em> (diretoria e conselho de administração da Petrobras).
                        </li>
                      </ul>
                      <div className="bg-emerald-500/5 p-5 rounded-xl border border-emerald-500/20 mt-4">
                        <span className="font-bold text-xl text-emerald-800 dark:text-emerald-400 block mb-2">Os 10 Papéis Gerenciais de Henry Mintzberg</span>
                        <p className="text-lg">
                          Mintzberg identificou que os administradores desempenham 10 papéis específicos, subdivididos em três categorias fundamentais:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-lg">
                          <div className="p-4 bg-card border rounded-lg">
                            <span className="font-bold text-blue-600 dark:text-blue-400 text-xl block mb-1">1. Interpessoais:</span>
                            <ul className="list-disc pl-5 mt-1 space-y-1 text-base text-muted-foreground">
                              <li>Símbolo (representação formal)</li>
                              <li>Líder (motivação e orientação)</li>
                              <li>Ligação (rede de contatos)</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-card border rounded-lg">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xl block mb-1">2. Informacionais:</span>
                            <ul className="list-disc pl-5 mt-1 space-y-1 text-base text-muted-foreground">
                              <li>Monitor (coleta de informações)</li>
                              <li>Disseminador (partilha interna)</li>
                              <li>Porta-voz (comunicação externa)</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-card border rounded-lg">
                            <span className="font-bold text-amber-600 dark:text-amber-400 text-xl block mb-1">3. Decisórios:</span>
                            <ul className="list-disc pl-5 mt-1 space-y-1 text-base text-muted-foreground">
                              <li>Empreendedor (iniciador de projetos)</li>
                              <li>Solucionador de Conflitos</li>
                              <li>Alocador de Recursos</li>
                              <li>Negociador (defesa de interesses)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: Os Níveis Organizacionais na Petrobras",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Para visualizar como a teoria se reflete na realidade prática da Petrobras, observe o desdobramento das atividades de suprimento em cada nível organizacional:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="p-5 bg-muted rounded-lg border border-border">
                          <h5 className="font-bold flex items-center gap-2 text-xl text-blue-600 dark:text-blue-400">
                            <LuTarget /> Nível Estratégico
                          </h5>
                          <p className="text-lg mt-2">
                            <strong>Quem atua:</strong> Conselho de Administração e Diretores Executivos da holding.
                          </p>
                          <p className="text-base text-muted-foreground mt-2">
                            Define o Plano de Negócios de Longo Prazo, a política ESG e as metas globais de transição energética para a próxima década.
                          </p>
                        </div>
                        <div className="p-5 bg-muted rounded-lg border border-border">
                          <h5 className="font-bold flex items-center gap-2 text-xl text-emerald-600 dark:text-emerald-400">
                            <LuBriefcase /> Nível Tático (Intermediário)
                          </h5>
                          <p className="text-lg mt-2">
                            <strong>Quem atua:</strong> Gerentes de Suprimento, Logística e Infraestrutura.
                          </p>
                          <p className="text-base text-muted-foreground mt-2">
                            Traduz as diretrizes globais em planos de ação específicos, gerencia os centros de distribuição e desenha as estratégias de compras locais.
                          </p>
                        </div>
                        <div className="p-5 bg-muted rounded-lg border border-border">
                          <h5 className="font-bold flex items-center gap-2 text-xl text-cyan-600 dark:text-cyan-400">
                            <LuFactory /> Nível Operacional
                          </h5>
                          <p className="text-lg mt-2">
                            <strong>Quem atua:</strong> Técnicos de Suprimento de Bens e Serviços, supervisores de pátio.
                          </p>
                          <p className="text-base text-muted-foreground mt-2">
                            Executa fisicamente as tarefas diárias: recebe materiais nas bases de Macaé, confere notas fiscais e alimenta os sistemas de estoque.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBuilding />,
                },
                {
                  titulo: "Dicas Táticas: Pegadinhas Frequentes da CESGRANRIO",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A CESGRANRIO possui um repertório clássico de distorções conceituais criadas para confundir o candidato apressado. Memorize estas distinções cruciais:
                      </p>
                      <div className="bg-amber-500/5 p-5 rounded-xl border border-amber-500/20 space-y-4 mt-4">
                        <div className="flex items-start gap-3">
                          <LuCheck className="text-emerald-600 mt-1 flex-shrink-0 w-6 h-6" />
                          <div>
                            <strong className="text-xl text-amber-800 dark:text-amber-400 block mb-1">Eficiência vs. Eficácia:</strong>
                            <p className="text-lg text-slate-700 dark:text-slate-300">
                              A banca costuma inverter as definições. Lembre-se: se a questão fala sobre "reduzir custos", "otimizar processos", "relação insumo-produto", ela está falando de <strong>Eficiência</strong> (meios). Se fala sobre "bater metas", "concluir o projeto", "satisfazer o cliente", refere-se a <strong>Eficácia</strong> (fins).
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <LuCheck className="text-emerald-600 mt-1 flex-shrink-0 w-6 h-6" />
                          <div>
                            <strong className="text-xl text-amber-800 dark:text-amber-400 block mb-1">Efetividade (O Impacto):</strong>
                            <p className="text-lg text-slate-700 dark:text-slate-300">
                              A <strong>Efetividade</strong> mede o impacto social ou institucional de longo prazo. Exemplo: A eficiência da refinaria é produzir gasolina com menor custo por barril; a eficácia é atingir a meta mensal de refino; a efetividade é garantir a soberania energética e o abastecimento contínuo do país.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <LuCheck className="text-emerald-600 mt-1 flex-shrink-0 w-6 h-6" />
                          <div>
                            <strong className="text-xl text-amber-800 dark:text-amber-400 block mb-1">Habilidade Humana em Todos os Níveis:</strong>
                            <p className="text-lg text-slate-700 dark:text-slate-300">
                              Cuidado com afirmações que dizem que habilidades humanas pertencem apenas ao nível tático. O gráfico clássico de Katz mostra que a habilidade humana possui a <strong>mesma proporção</strong> e importância crítica no nível operacional, tático e estratégico!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: O Contexto da Administração Indireta",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Como Sociedade de Economia Mista sob controle da União, a Petrobras integra a Administração Pública Indireta. Isso cria um regime jurídico híbrido:
                      </p>
                      <AlertBox tipo="danger" titulo="Atenção à Dupla Natureza Jurídica">
                        <span className="text-lg">
                          Diferente de uma petroleira privada como a Shell, a Petrobras deve observar estritamente princípios constitucionais (Art. 37 da CF/88): Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência. No entanto, ela atua sob o regime de livre concorrência econômica (Art. 173 da CF), exigindo agilidade comercial. Conciliar a rigidez de uma estatal com a velocidade exigida pelo mercado de commodities petrolíferas é o maior desafio administrativo e de suprimentos de sua governança.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={3}
              variant={mv[1]}
              title="Exemplos Práticos Petrobras"
              description="Como esses conceitos fundamentais se aplicam na realidade da empresa."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-foreground text-xl mb-3 flex items-center gap-2">
                  <LuFactory className="text-emerald-500" />
                  Decisões no Pré-Sal
                </h4>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A exploração em águas ultraprofundas é um teste de fogo de eficiência e eficácia: a construção de um navio-plataforma (FPSO) exige planejamento tático rigoroso de suprimentos para coordenar milhares de peças e garantir que a meta de primeiro óleo (eficácia) seja cumprida no menor custo operacional possível (eficiência).
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-foreground text-xl mb-3 flex items-center gap-2">
                  <LuUsers className="text-blue-500" />
                  Papéis de Ligação na Logística
                </h4>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Os profissionais de Suprimentos na Petrobras atuam fortemente no papel de ligação de Mintzberg, conectando a diretoria com parceiros internacionais de engenharia e prestadores de serviços de helicópteros e embarcações de apoio às plataformas.
                </p>
              </div>
            </div>
          </div>

          <ModuleConsolidation
            index={1}
            variant={mv[1]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Fundamentos de Administração - Visão Geral",
              duration: "12:45",
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Os 4 Pilares (PODC)",
                  type: "Esquema Conceitual",
                  placeholderColor: "bg-emerald-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Diretrizes Críticas de Fundamentos",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">🎯 🔍</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                      <p className="font-bold text-emerald-600 mb-1 text-xl">Habilidades de Katz</p>
                      <p className="text-base text-muted-foreground">Conceituais no topo estratégico, Técnicas na base operacional, e Humanas necessárias igualmente em todos os níveis organizacionais.</p>
                    </div>
                    <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                      <p className="font-bold text-cyan-600 mb-1 text-xl">Papéis de Mintzberg</p>
                      <p className="text-base text-muted-foreground">10 papéis divididos em decisórios, informacionais e interpessoais que descrevem o comportamento diário real do gestor.</p>
                    </div>
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                      <p className="font-bold text-blue-600 mb-1 text-xl">Eficiência vs Eficácia</p>
                      <p className="text-base text-muted-foreground">Eficiência é o foco nos meios e menor consumo de recursos. Eficácia é o cumprimento das metas globais planejadas.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• Não confunda: Dinheiro, salário ou benefício básico nunca gera motivação duradoura; apenas previne a insatisfação corporativa.</p>
                    <p>• O ruído semântico decorre unicamente de variações de repertórios linguísticos de diferentes departamentos.</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Fundamentos de Administração",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-1")}
            titulo="QUIZ: Fundamentos de Administração"
            numero={1}
            variant={mv[1]}
            onComplete={(score: number) => handleModuleComplete("modulo-1", score)}
          />
        </TabsContent>
      )}"""

    # Módulo 2 Refactor Block
    m2_new = """      {/* ==================== MÓDULO 2 ==================== */}
      {activeTab === "modulo-2" && (
        <TabsContent value="modulo-2" className="space-y-12 mt-0">
          <ModuleBanner
            numero={2}
            titulo="Funções Administrativas PODC"
            descricao="Aprofunde nas quatro funções que sustentam a administração: Planejamento, Organização, Direção e Controle."
            variant={mv[2]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[2]}
              title="Dossiê das Funções Administrativas"
              description="Entenda como cada função se desdobra em técnicas e ferramentas específicas."
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              {/* C — Contexto (parágrafos 1 e 2) */}
              <p>O ciclo integrado das funções administrativas, consolidado pela sigla <strong>PODC</strong> (Planejamento, Organização, Direção e Controle), constitui o arcabouço metodológico sobre o qual se estrutura toda a atividade de gerenciar. Na banca CESGRANRIO, as questões comumente exigem do candidato a capacidade de mapear as atividades operacionais cotidianas dentro de cada um desses quatro pilares funcionais da administração clássica. O domínio destas divisões é vital para compreender como os objetivos abstratos da organização ganham corpo e execução.</p>
              <p>Historicamente derivadas das clássicas funções propostas por Henri Fayol no início do século passado, as funções administrativas de hoje operam de forma contínua, sistêmica e interdependente. O gerenciamento de uma grande sociedade de economia mista, como a Petrobras, demonstra que essas funções não ocorrem em etapas estanques, mas sim como um ciclo perpétuo e interligado de diagnóstico, alocação, liderança humana e verificação rigorosa de desvios.</p>

              {/* E — Explicação (parágrafos 3 e 4) */}
              <p>O <strong>Planejamento</strong> é a função que define as metas de longo prazo da organização e os meios adequados para alcançá-las, projetando cenários futuros de forma a reduzir a incerteza do ambiente externo. A <strong>Organização</strong> é a função de estruturação dos recursos, responsável por dividir o trabalho, definir a hierarquia de cargos, agrupar as tarefas em departamentos, definir as linhas formais de autoridade e alocar o capital humano e físico disponível.</p>
              <p>A <strong>Direção</strong>, considerada a função mais dinâmica, foca na liderança direta, motivação e orientação ativa das pessoas para que executem as tarefas planejadas com empenho e engajamento voluntário. Por fim, o <strong>Controle</strong> é a atividade de monitoramento contínuo dos resultados reais, confrontando o desempenho com os padrões e metas estabelecidos, visando identificar desvios operacionais e aplicar correções tempestivas para evitar ineficiências.</p>

              {/* D — Demonstração (parágrafos 5 e 6) */}
              <p>Para visualizar a interação prática dessas funções na cadeia logística, imagine o suprimento de sobressalentes para uma refinaria de petróleo. O <strong>Planejamento</strong> define a meta anual de estoque de contingência de válvulas de segurança. A <strong>Organização</strong> estrutura o armazém central, dividindo as tarefas de conferência entre os técnicos de suprimento de plantão e alocando empilhadeiras para a movimentação rápida de cargas.</p>
              <p>A <strong>Direção</strong> manifesta-se quando o supervisor reúne a equipe de almoxarifado, esclarecendo procedimentos de segurança SMS e motivando o grupo a zerar acidentes de trabalho. O **Controle** atua na contagem física cíclica de inventário, cruzando os dados reais com as quantidades registradas no sistema SAP Petronect. Se for detectada uma divergência física no número de válvulas armazenadas, a gerência de controle aciona o comitê de suprimentos para abrir uma ação corretiva imediata.</p>

              {/* E — Expansão (parágrafos 7 e 8) */}
              <p>As funções administrativas desdobram-se ao longo da pirâmide organizacional em níveis de abrangência bem delimitados. O Planejamento Estratégico, focado no longo prazo e na empresa como um todo, é conduzido pela diretoria executiva, enquanto o Planejamento Tático atua em médio prazo focando em departamentos isolados (como a diretoria de compras). O Planejamento Operacional, por sua vez, é detalhado no nível diário das tarefas executivas e operacionais.</p>
              <p>Da mesma forma, o Controle ocorre de forma estratégica (monitorando o atingimento do Plano de Negócios global), tática (avaliando o desempenho orçamentário setorial) e operacional (verificando o tempo de atendimento de requisições de compras e ordens de descarga). A eficácia organizacional depende da perfeita coerência vertical entre essas funções: os planos operacionais de suprimentos devem servir de sustentáculo direto para a execução das metas estratégicas da holding.</p>

              {/* A — Aplicação (parágrafos 9 e 10) */}
              <p>A banca CESGRANRIO costuma elaborar pegadinhas trocando os verbos que caracterizam cada uma das funções administrativas. Afirmações que envolvem "liderar equipes", "motivar colaboradores" ou "coordenar esforços de pessoas" pertencem exclusivamente à função de <strong>Direção</strong>, embora a banca tente rotulá-las como Organização. Da mesma forma, associar a "definição de prioridades" ou a "alocação física de equipamentos" ao Planejamento é um erro comum, pois tratam-se de atividades de <strong>Organização</strong>.</p>
              <p>Na Petrobras, a simbiose entre Planejamento e Controle é instrumentalizada por meio do Plano de Negócios e Gestão (PNG). O PNG estabelece a carteira quinquenal de investimentos da holding (Planejamento), cuja execução orçamentária é monitorada mensalmente pelo conselho de administração com apoio de auditorias externas (Controle). A governança de suprimentos utiliza essa sinergia funcional para negociar contratos globais de longo prazo de plataformas, reduzindo custos operacionais sob conformidade legal.</p>
            </div>

            <CardCarousel
              cards={[
                {
                  titulo: "Planejamento (Metas)",
                  descricao: "Define objetivos, analisa cenários internos e externos, e estabelece o melhor plano de ação para atingir o futuro desejado.",
                  icone: <LuTarget />,
                  corFundo: "bg-emerald-500/10",
                },
                {
                  titulo: "Organização (Recursos)",
                  descricao: "Estrutura as atividades, aloca os recursos humanos e físicos, divide as tarefas em cargos e estabelece as linhas de autoridade.",
                  icone: <LuBuilding />,
                  corFundo: "bg-teal-500/10",
                },
                {
                  titulo: "Direção (Pessoas)",
                  descricao: "Orienta, lidera e motiva o capital humano rumo aos objetivos. É a função mais dinâmica e focada nas relações humanas.",
                  icone: <LuUserPlus />,
                  corFundo: "bg-cyan-500/10",
                },
                {
                  titulo: "Controle (Padrões)",
                  descricao: "Define padrões de desempenho, monitora as atividades reais, compara com o planejado e inicia ações corretivas imediatas.",
                  icone: <LuActivity />,
                  corFundo: "bg-blue-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[2]}
              title="Aprofundamento Funcional do Ciclo Administrativo"
              description="Desdobramentos técnicos de cada função administrativa."
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "Conceituação: Ciclo Integrado de Planejamento e Controle",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        As funções administrativas representam um processo cíclico e sistêmico, onde o <strong>Planejamento</strong> e o <strong>Controle</strong> são considerados as duas faces da mesma moeda administrativa. Não é possível controlar sem um planejamento prévio que defina as metas (padrões), e um planejamento sem controle torna-se inútil por falta de acompanhamento.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-muted rounded-lg border">
                          <h6 className="font-bold text-emerald-700 dark:text-emerald-400 text-xl mb-2">1. Desdobramento do Planejamento:</h6>
                          <ul className="list-disc pl-5 text-lg space-y-2">
                            <li><strong>Estratégico:</strong> Longo prazo, visão sistêmica, focado no topo da hierarquia, alto nível de incerteza.</li>
                            <li><strong>Tático:</strong> Médio prazo, focado em departamentos ou áreas específicas (como Suprimentos).</li>
                            <li><strong>Operacional:</strong> Curto prazo, detalhado no nível da execução diária das tarefas.</li>
                          </ul>
                        </div>
                        <div className="p-5 bg-muted rounded-lg border">
                          <h6 className="font-bold text-blue-700 dark:text-blue-400 text-xl mb-2">2. Etapas do Controle:</h6>
                          <ul className="list-disc pl-5 text-lg space-y-2">
                            <li><strong>Estabelecimento de Padrões:</strong> Definição de KPIs de custo, tempo, qualidade e quantidade.</li>
                            <li><strong>Medição do Desempenho:</strong> Coleta ativa de dados do andamento das operações de compras.</li>
                            <li><strong>Comparação:</strong> Contrastar o desempenho real com a meta/padrão pré-estabelecido.</li>
                            <li><strong>Ação Corretiva:</strong> Ajustar desvios e prevenir a reincorrência de ineficiências no processo.</li>
                          </ul>
                        </div>
                      </div>
                      <p className="mt-2 text-lg">
                        Na função de <strong>Organização</strong>, define-se a centralização (decisões no topo) ou descentralização (decisões delegadas), a amplitude de controle (número de subordinados por gerente) e a divisão de departamentos. Na função de <strong>Direção</strong>, aplicam-se estilos de liderança situacional para engajar a força de trabalho.
                      </p>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: Planejamento Estratégico, Tático e Operacional em Energia",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Observe a aplicação prática do desdobramento do planejamento na Petrobras:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-4 mt-4">
                        <div>
                          <strong className="text-xl text-teal-600 block mb-1">Estratégico (Longa Duração):</strong>
                          <p className="text-lg">
                            O Conselho Executivo aprova o investimento de US$ 10 bilhões na descarbonização das refinarias.
                          </p>
                        </div>
                        <div>
                          <strong className="text-xl text-cyan-600 block mb-1">Tático (Média Duração):</strong>
                          <p className="text-lg">
                            A gerência de suprimentos corporativa renegocia contratos de longo prazo com fornecedores de tecnologia ambiental.
                          </p>
                        </div>
                        <div>
                          <strong className="text-xl text-blue-600 block mb-1">Operacional (Curta Duração):</strong>
                          <p className="text-lg">
                            O técnico de suprimentos emite a ordem de recebimento físico para descarregar o novo catalisador na unidade de refino.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: A Tabela de Verbos das Funções Administrativas",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Para a prova da CESGRANRIO, memorize esta correspondência direta para evitar pegadinhas clássicas de troca de funções:
                      </p>
                      <div className="overflow-x-auto mt-4 font-sans text-lg">
                        <table className="w-full text-left border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-3 border border-border font-bold">Função</th>
                              <th className="p-3 border border-border font-bold">Ações e Verbos Principais</th>
                              <th className="p-3 border border-border font-bold">Foco Crítico</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-3 font-bold border border-border text-emerald-600">Planejamento</td>
                              <td className="p-3 border border-border">Definir objetivos, prever cenários, traçar metas, programar atividades.</td>
                              <td className="p-3 border border-border">O futuro e as diretrizes estratégicas.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-teal-600">Organização</td>
                              <td className="p-3 border border-border">Alocar recursos, estruturar trabalho, dividir tarefas, desenhar cargos.</td>
                              <td className="p-3 border border-border">A estrutura e a hierarquia funcional.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-cyan-600">Direção</td>
                              <td className="p-3 border border-border">Liderar equipes, motivar trabalhadores, orientar tarefas, comunicar decisões.</td>
                              <td className="p-3 border border-border">A coordenação das pessoas e atitudes.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-blue-600">Controle</td>
                              <td className="p-3 border border-border">Monitorar desempenho, medir resultados, corrigir desvios, avaliar KPIs.</td>
                              <td className="p-3 border border-border">A conformidade e ações corretivas.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: Controle Prévio, Simultâneo e Posterior",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        O controle organizacional não é executado apenas no final de cada processo ou trimestre de faturamento:
                      </p>
                      <AlertBox tipo="warning" titulo="Os Três Tipos de Controle Temporal">
                        <span className="text-lg">
                          1. <strong>Prévio (Preventivo):</strong> Realizado antes da atividade iniciar. Exemplo: A exigência de atestados e garantias financeiras no edital de licitação da Petrobras.<br />
                          2. <strong>Simultâneo (Concorrente):</strong> Realizado durante o andamento da tarefa. Exemplo: A fiscalização diária exercida pelo engenheiro sobre a montagem física da tubulação na refinaria.<br />
                          3. <strong>Posterior (Feedback):</strong> Realizado após o encerramento da tarefa. Exemplo: O relatório final de auditoria que apura o custo total do contrato de compras.
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
            index={2}
            variant={mv[2]}
            video={{
              videoId: "7c-YVly_C9o",
              title: "PODC - Desdobramento Prático",
              duration: "15:20",
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Ciclo Administrativo PODC",
                  type: "Fluxograma",
                  placeholderColor: "bg-emerald-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Diretrizes Críticas de PODC",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">⚙️ 🔄</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <p className="font-bold text-emerald-600 mb-1 text-xl">Planejamento & Controle</p>
                      <p className="text-base text-muted-foreground">Duas faces da mesma moeda. Planejamento define as metas (padrões); Controle mede desvios e executa correções.</p>
                    </div>
                    <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20">
                      <p className="font-bold text-teal-600 mb-1 text-xl">Organização & Direção</p>
                      <p className="text-base text-muted-foreground">Organização foca em alocar recursos de forma estrutural; Direção lida diretamente com a liderança e motivação de pessoas.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• O controle preventivo atua antes do processo começar (ex: qualificação de fornecedores).</p>
                    <p>• As habilidades conceituais são prioritárias para a função de Planejamento Estratégico global.</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              titulo: "Funções Administrativas PODC",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-2")}
            titulo="QUIZ: Funções Administrativas PODC"
            numero={2}
            variant={mv[2]}
            onComplete={(score: number) => handleModuleComplete("modulo-2", score)}
          />
        </TabsContent>
      )}"""

    # Módulo 3 Refactor Block
    m3_new = """      {/* ==================== MÓDULO 3 ==================== */}
      {activeTab === "modulo-3" && (
        <TabsContent value="modulo-3" className="space-y-12 mt-0">
          <ModuleBanner
            numero={3}
            titulo="Estruturas Organizacionais"
            descricao="Conheça os principais modelos de estrutura organizacional e como a Petrobras se organiza para otimizar processos e decisões."
            variant={mv[3]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[3]}
              title="Dossiê de Modelos Estruturais"
              description="Das estruturas clássicas às contemporâneas: compreendendo as linhas de força e as escolhas de design organizacional."
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              {/* C — Contexto (parágrafos 1 e 2) */}
              <p>A definição da estrutura organizacional constitui uma das decisões de design corporativo mais estratégicas a serem tomadas pelo topo decisório estratégico. Nos concursos públicos da Petrobras elaborados pela banca CESGRANRIO, as estruturas organizacionais são exploradas tanto em suas definições clássicas e burocráticas quanto em seus desdobramentos flexíveis e modernos. Compreender como os cargos, as linhas de autoridade e a comunicação horizontal são desenhados é essencial para gabaritar a disciplina.</p>
              <p>A estrutura de uma corporação funciona de forma análoga ao esqueleto de um organismo biológico: ela provê o suporte físico básico para as atividades organizacionais, define o direcionamento dos fluxos e delimita as esferas de atuação de cada departamento. Sendo a Petrobras uma holding de economia mista de atuação global integrada, seu modelo estrutural deve equilibrar a conformidade jurídica burocrática com a alta adaptabilidade operacional do setor petrolífero.</p>

              {/* E — Explicação (parágrafos 3 e 4) */}
              <p>A departamentalização expressa o critério utilizado para agrupar tarefas semelhantes em unidades organizacionais específicas. Entre as modelagens tradicionais, destaca-se a <strong>estrutura funcional</strong> (agrupamento baseado em especialidades profissionais, como engenharia ou compras) e a <strong>estrutura divisional</strong> (agrupamento baseado em produtos, serviços ou divisões territoriais semiautônomas).</p>
              <p>Divergindo da linearidade tradicional, a <strong>estrutura matricial</strong> sobrepõe a especialização funcional clássica a um desenho focado em projetos ou produtos horizontais. Esse modelo hibridizado visa capturar o melhor de dois mundos: a profundidade e eficiência técnica dos departamentos especializados aliada à alta integração e velocidade de entrega dos comitês de projetos. Para funcionar, contudo, esse design exige grande maturidade de liderança de equipes e controle de prioridades.</p>

              {/* D — Demonstração (parágrafos 5 e 6) */}
              <p>Para visualizar esses conceitos em um cenário de compras, considere a implantação de uma nova sonda de perfuração marítima de alta profundidade. Sob o regime de uma <strong>estrutura puramente funcional</strong>, o analista de compras dependeria de submeter relatórios técnicos a diversos chefes de engenharia de materiais de diferentes divisões verticais antes de emitir a nota fiscal, gerando lentidão extrema e burocracia por conta de silos comunicativos.</p>
              <p>Adotando o design da <strong>estrutura matricial</strong>, o analista de suprimentos é designado para integrar o grupo de implantação da sonda. Ele passa a responder simultaneamente ao gerente de projetos da sonda (focado em prazo e conclusão física da montagem) e ao gerente do departamento de suprimentos (focado em conformidade legal da Lei das Estatais e negociação de contratos). O conflito de prioridades é contornado pela governança interna, garantindo a celeridade do projeto sem descuidar da legalidade administrativa da estatal.</p>

              {/* E — Expansão (parágrafos 7 e 8) */}
              <p>A amplitude de controle refere-se de forma direta ao número de subordinados que um único gerente ou supervisor consegue comandar de forma eficiente. Estruturas organizacionais caracterizadas por uma amplitude de controle reduzida (poucos subordinados por chefe) tendem a apresentar um desenho verticalizado (alto), com múltiplos níveis hierárquicos, gerando custos elevados de coordenação de cargos e lentidão nos fluxos comunicativos corporativos.</p>
              <p>Por outro lado, estruturas caracterizadas por uma grande amplitude de controle (muitos subordinados por supervisor) apresentam um desenho achatado (plano/horizontal), que estimula a descentralização decisória e delegação de autoridade, mas exige alta competência e autonomia operacional das equipes. A seleção entre centralizar a autoridade no topo estratégico ou descentralizá-la na base operacional depende da instabilidade do ambiente de mercado e da previsibilidade tecnológica das operações.</p>

              {/* A — Aplicação (parágrafos 9 e 10) */}
              <p>Nas avaliações objetivas da CESGRANRIO, a estrutura matricial é frequentemente rotulada por sua principal característica de design: a <strong>quebra planejada do princípio Fayolista de unidade de comando</strong>. Questões costumam propor cenários onde colaboradores lidam com a dupla subordinação hierárquica e demandam do gestor habilidades humanas avançadas de mediação de atritos. A banca também gosta de associar a estrutura em rede a empresas virtuais focadas unicamente em core business com terceirização extrema.</p>
              <p>Na Petrobras, a coexistência de diretorias operacionais regionalizadas (E&P Bacia de Campos, Refino Regap) e assessorias jurídicas e de suprimentos integradas na sede corporativa configura uma macroestrutura híbrida com alta presença matricial. Esse desenho organizacional assegura que, embora as operações de mar gozem de autonomia para responder a eventos operacionais dinâmicos, o rito de contratação de bens permaneça sob rigorosa governança impessoal e controle legal do comitê central.</p>
            </div>

            <CardCarousel
              cards={[
                {
                  titulo: "Estrutura Funcional",
                  descricao: "Agrupa os profissionais por especialidades e competências afins (ex. Contratos, Logística, Engenharia). Simples, especializada, mas cria ilhas de isolamento de comunicação.",
                  icone: <LuBuilding />,
                  corFundo: "bg-cyan-500/10",
                },
                {
                  titulo: "Estrutura Divisional",
                  descricao: "Agrupa atividades por divisões semiautônomas de produtos, serviços ou regiões (ex. E&P, Refino, Gás). Focada no mercado, flexível, mas aumenta a redundância de funções corporativas.",
                  icone: <LuChartBar />,
                  corFundo: "bg-indigo-500/10",
                },
                {
                  titulo: "Estrutura Matricial",
                  descricao: "Sobrepõe a estrutura funcional tradicional a uma estrutura de projetos ou produtos. Estabelece a dupla subordinação: quebra a unidade de comando clássica em prol da alta integração.",
                  icone: <LuNetwork />,
                  corFundo: "bg-emerald-500/10",
                },
                {
                  titulo: "Estrutura por Processos",
                  descricao: "Estrutura as equipes de forma horizontal ao longo de fluxos de valor integrados (ex. Processo Completo de Suprimentos). Reduz fronteiras internas e maximiza a orientação para o cliente.",
                  icone: <LuActivity />,
                  corFundo: "bg-amber-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[3]}
              title="Modelagem e Análise do Design Organizacional"
              description="Análise profunda de cada modelo estrutural."
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "Conceituação: Comparação Crítica e Departamentalização",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A estruturação de uma organização envolve decidir como as tarefas serão divididas, agrupadas e coordenadas. Esse agrupamento é chamado de <strong>Departamentalização</strong>. A CESGRANRIO cobra maciçamente as distinções clássicas entre os tipos de estrutura, especialmente a quebra de paradigmas dos modelos contemporâneos:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-lg">
                        <li>
                          <strong>Estrutura Linear (Tradicional):</strong> Baseada no princípio da unidade de comando e na rigidez militar. Centralizada, com linhas formais rígidas de comunicação. Ideal para ambientes extremamente estáveis, mas ineficiente diante de mudanças rápidas de mercado.
                        </li>
                        <li>
                          <strong>Estrutura Funcional:</strong> Baseada na especialização de funções (Fayol). Promove economia de escala e desenvolvimento de conhecimentos profundos nas áreas funcionais. Suas maiores falhas são os conflitos entre áreas e a falta de visão global do negócio (efeito 'silo').
                        </li>
                        <li>
                          <strong>Estrutura Matricial (Grade):</strong> Combina o melhor de dois mundos (funcional e por projetos). Os colaboradores reportam-se a um gerente funcional (ex: Chefe de TI) e a um gerente de projeto (ex: Líder da Implantação do ERP). Exige alta maturidade e habilidades humanas para resolver o conflito inerente de autoridade ("dois chefes").
                        </li>
                        <li>
                          <strong>Estrutura em Rede:</strong> Virtual, baseada na terceirização de atividades não-críticas, focando internamente apenas nas competências essenciais. Altamente adaptável e de baixíssimo custo fixo, mas apresenta riscos sérios de perda de controle operacional e de qualidade.
                        </li>
                      </ul>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: Como a Petrobras Estrutura a Holding e suas Subsidiárias",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A Petrobras é uma corporação complexa de dimensões gigantescas. Sua estrutura combina características <strong>Divisionais</strong> e <strong>Matriciais</strong>:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border mt-4">
                        <span className="font-bold text-xl text-emerald-800 dark:text-emerald-400 block mb-2">Estrutura Divisional e Matricial Petrobras</span>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                          <li>
                            <strong>Divisões Semiautônomas (Segmentos de Negócio):</strong> A holding organiza-se em torno de diretorias finalísticas focadas na cadeia produtiva do petróleo: Exploração e Produção (Upstream), Refino, Transporte e Comercialização (Downstream), Transição Energética e Sustentabilidade.
                          </li>
                          <li>
                            <strong>Matriz de Funções Corporativas:</strong> Setores transversais como a Diretoria Financeira, Jurídico, Recursos Humanos e a própria estrutura corporativa de Suprimentos atuam de forma matricial, prestando serviços e exercendo governança e controle sobre todas as divisões operacionais de forma integrada.
                          </li>
                          <li>
                            <strong>Subsidiárias Integrais:</strong> Entidades corporativas distintas (ex: Transpetro, Petrobras Biocombustíveis) operam com estrutura própria, mas alinhadas às diretrizes e ao planejamento estratégico do grupo corporativo.
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: Tabela de Vantagens e Desvantagens para Concurso",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Memorize este quadro técnico para resolver de forma rápida e segura as questões clássicas da banca sobre vantagens e desvantagens de cada tipo de estrutura:
                      </p>
                      <div className="overflow-x-auto mt-4 font-sans text-lg">
                        <table className="w-full text-left border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-2 border border-border font-bold">Tipo</th>
                              <th className="p-2 border border-border font-bold">Vantagens Principais</th>
                              <th className="p-2 border border-border font-bold">Desvantagens Principais</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2 font-bold border border-border text-cyan-600">Funcional</td>
                              <td className="p-2 border border-border">Especialização técnica, alta clareza de carreira, economias de escala intra-departamentais.</td>
                              <td className="p-2 border border-border">Isolamento entre áreas (silos), lentidão nas decisões interdepartamentais, perda da visão sistêmica.</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border text-indigo-600">Divisional</td>
                              <td className="p-2 border border-border">Foco total no cliente/região/produto, rápida resposta a mudanças, descentralização decisória.</td>
                              <td className="p-2 border border-border">Duplicação desnecessária de recursos, competição destrutiva entre divisões, perda de economias de escala.</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border text-emerald-600">Matricial</td>
                              <td className="p-2 border border-border">Uso compartilhado e flexível de especialistas, coordenação interdisciplinar excelente, resposta ágil.</td>
                              <td className="p-2 border border-border">Conflito de lealdade (dupla subordinação), custo elevado de coordenação, estresse emocional nos subordinados.</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border text-amber-600">Em Rede</td>
                              <td className="p-2 border border-border">Flexibilidade extrema, custo fixo irrisório, rápido escalonamento global.</td>
                              <td className="p-2 border border-border">Vulnerabilidade jurídica, dependência extrema de terceiros, perda de know-how interno estratégico.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: A Queda do Princípio de Unidade de Comando",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        O princípio clássico de Henri Fayol ditava a **unidade de comando**: cada trabalhador deve receber ordens de apenas um único supervisor direto para evitar atritos e direções conflitantes.
                      </p>
                      <AlertBox tipo="warning" titulo="A Quebra da Unidade de Comando na Matricial">
                        <span className="text-lg">
                          Nas provas, a banca costuma classificar a estrutura **Matricial** especificamente por sua quebra voluntária da unidade de comando. A coexistência de uma autoridade funcional (eixo vertical) e uma autoridade de projeto (eixo horizontal) exige habilidades gerenciais maduras de negociação para que os conflitos intrínsecos de prioridades e alocações de recursos humanos não levem ao colapso operacional da equipe.
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
            index={3}
            variant={mv[3]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Estruturas Organizacionais",
              duration: "14:30",
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Modelos de Estrutura",
                  type: "Organograma Comparativo",
                  placeholderColor: "bg-cyan-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Diretrizes Críticas de Estruturas",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">🏢 🔗</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                    <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                      <p className="font-bold text-cyan-600 mb-1 text-xl">Estrutura Funcional</p>
                      <p className="text-base text-muted-foreground">Foco na especialização técnica interna por departamentos (RH, TI, Compras). Desenvolve excelência técnica, mas cria barreiras de comunicação horizontais.</p>
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <p className="font-bold text-emerald-600 mb-1 text-xl">Estrutura Matricial</p>
                      <p className="text-base text-muted-foreground">Sobreposição de departamentos funcionais e gerência de projetos. Exige dupla subordinação hierárquica e quebra a unidade de comando de Fayol.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• A estrutura divisional duplica recursos corporativos desnecessariamente, mas foca no mercado ou no cliente final.</p>
                    <p>• A amplitude de controle estreita verticaliza a hierarquia, aumentando a cadeia de comando da estatal.</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              titulo: "Estruturas Organizacionais",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-3")}
            titulo="QUIZ: Estruturas Organizacionais"
            numero={3}
            variant={mv[3]}
            onComplete={(score: number) => handleModuleComplete("modulo-3", score)}
          />
        </TabsContent>
      )}"""

    # Módulo 4 Refactor Block
    m4_new = """      {/* ==================== MÓDULO 4 ==================== */}
      {activeTab === "modulo-4" && (
        <TabsContent value="modulo-4" className="space-y-12 mt-0">
          <ModuleBanner
            numero={4}
            titulo="Comportamento Organizacional"
            descricao="Entenda como as pessoas atuam dentro das organizações: motivação, liderança, comunicação, trabalho em equipe e cultura organizacional."
            variant={mv[4]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[4]}
              title="Dossiê Comportamental"
              description="Os fatores psicossociais que impactam desempenho e satisfação nas organizações."
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              {/* C — Contexto (parágrafos 1 e 2) */}
              <p>O comportamento organizacional atua como o pilar integrador que estuda o impacto de indivíduos, grupos e da cultura sobre o desempenho funcional das corporações. Nas provas elaboradas pela banca CESGRANRIO, os fatores psicossociais não são avaliados sob viés clínico, mas sim associados a resultados de engajamento operacional, estilos gerenciais e atitudes de liderança situacional. Compreender esses mecanismos comportamentais é indispensável para gabaritar a prova.</p>
              <p>Diferente de um ambiente físico de fábrica puramente mecânico, as organizações contemporâneas expressam ecossistemas orgânicos complexos constituídos por interações humanas. O bom funcionamento dos fluxos de compras de uma empresa do porte da Petrobras depende não apenas do desenho formal dos fluxos de trabalho, mas da atitude proativa, do alinhamento ético e do clima de cooperação existente entre seus analistas e equipes operacionais de campo.</p>

              {/* E — Explicação (parágrafos 3 e 4) */}
              <p>No centro dos estudos comportamentais encontram-se as <strong>teorias de motivação</strong>, tradicionalmente divididas em teorias de conteúdo (focadas em mapear as necessidades internas que orientam as ações, como Maslow e Herzberg) e teorias de processo (focadas em decodificar como a motivação se desenvolve e se mantém, como a teoria da expectativa de Victor Vroom). A motivação é compreendida como a força e a direção que orientam o esforço individual rumo às metas.</p>
              <p>Paralelamente, a <strong>liderança</strong> expressa o processo de influenciar as atitudes e comportamentos das pessoas para a persecução voluntária de objetivos organizacionais comuns. As abordagens clássicas de liderança evoluíram dos traços inatos para estilos comportamentais básicos (autocrático, democrático e liberal), culminando na modelagem da <strong>liderança situacional</strong> de Hersey e Blanchard, que estabelece que o estilo gerencial deve ser moldado com base na maturidade técnica dos liderados.</p>

              {/* D — Demonstração (parágrafos 5 e 6) */}
              <p>Para visualizar a dinâmica desses conceitos na prática, considere o aumento emergencial da meta de expedição de sobressalentes em uma base de apoio offshore. Sob a ótica da **teoria dos dois fatores de Frederick Herzberg**, se o supervisor operacional aumentar em 20% o valor do salário básico (fator higiênico), ele apenas conseguirá evitar a insatisfação imediata e prevenir reclamações formais da equipe, mas não gerará motivação ativa de longo prazo.</p>
              <p>Para obter um engajamento ativo e proativo diante do novo desafio, o supervisor deve aplicar fatores motivadores (intrínsecos): reconhecer publicamente o esforço dos técnicos mais eficientes, delegar responsabilidades táticas de organização e prover perspectivas claras de crescimento profissional. Simultaneamente, se os operários possuírem alta autonomia técnica (maturidade elevada), o líder deve aplicar o estilo delegador, evitando microgerenciar o trabalho de forma autocrática.</p>

              {/* E — Expansão (parágrafos 7 e 8) */}
              <p>Os estudos de comportamento avançam para a compreensão da cultura organizacional, entendida como o conjunto de valores compartilhados, crenças internas, ritos formais e normas que determinam como os membros atuam e resolvem problemas. A cultura constitui a identidade duradoura da empresa, ditando regras não escritas de conduta social. O clima organizacional, diferentemente da cultura, expressa a percepção temporária das pessoas sobre o ambiente de trabalho.</p>
              <p>O gerenciamento de equipes de suprimento em grandes empresas estatais exige do líder o monitoramento constante do clima para evitar atritos que decolam sob a forma de ruídos de comunicação e lentidão em negociações. O desenvolvimento de equipes de alto desempenho requer um estilo gerencial focado em motivar e construir segurança psicológica, permitindo que a divergência saudável de ideias (conflito funcional) seja canalizada para a melhoria de processos de compras.</p>

              {/* A — Aplicação (parágrafos 9 e 10) */}
              <p>A banca CESGRANRIO adora explorar as armadilhas conceituais da teoria de Herzberg, tentando classificar o salário e os benefícios sociais básicos como fatores motivadores, quando na verdade constituem **fatores higiênicos (extrínsecos)** que apenas previnem a insatisfação. A banca também costuma propor cenários práticos envolvendo a teoria de liderança situacional de Hersey e Blanchard, exigindo que o candidato associe a baixa maturidade técnica da equipe ao estilo diretivo ou direcionador.</p>
              <p>Na Petrobras, a cultura de segurança SMS (Saúde, Meio Ambiente e Segurança) atua como o valor cultural máximo e inegociável que guia as decisões comportamentais de todos os níveis. Os técnicos de suprimentos devem internalizar essa cultura de forma que o rigor das especificações contratuais e a integridade no descarregamento de produtos químicos reflitam a postura preventiva da companhia contra acidentes industriais, combinando excelência logística e preservação da vida.</p>
            </div>

            <CardCarousel
              cards={[
                {
                  titulo: "Motivação",
                  descricao: "Forças internas e externas que iniciam, direcionam e sustentam o esforço individual. Abrange teorias de conteúdo (Maslow, Herzberg) e de processo (Vroom).",
                  icone: <LuLightbulb />,
                  corFundo: "bg-rose-500/10",
                },
                {
                  titulo: "Liderança",
                  descricao: "Habilidade de influenciar pessoas para o alcance voluntário de metas organizacionais. Abrange estilos autocrático, democrático, liberal e teorias situacionais.",
                  icone: <LuUsers />,
                  corFundo: "bg-pink-500/10",
                },
                {
                  titulo: "Comunicação",
                  descricao: "Fluxo e intercâmbio de informações e sentidos entre emissor e receptor. Crucial para prevenir conflitos e engajar equipes.",
                  icone: <LuHandshake />,
                  corFundo: "bg-red-500/10",
                },
                {
                  titulo: "Cultura Organizacional",
                  descricao: "Conjunto de crenças, valores, ritos e normas compartilhados que determinam como os membros se comportam e resolvem problemas.",
                  icone: <LuShield />,
                  corFundo: "bg-orange-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[4]}
              title="Vetores da Dinâmica Humana nas Organizações"
              description="Aprofundamento em conceitos de comportamento organizacional."
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "Conceituação: Teorias de Motivação (Conteúdo vs. Processo)",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A motivação é um estado interno que conduz o comportamento. A literatura divide as teorias motivacionais em dois grandes blocos, cuja diferenciação é exigida de forma recorrente em concursos:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-muted rounded-lg border">
                          <h6 className="font-bold text-rose-700 dark:text-rose-400 text-xl mb-2">Teorias de Conteúdo (O QUE motiva):</h6>
                          <p className="text-base text-muted-foreground mb-2">Identificam as necessidades internas das pessoas.</p>
                          <ul className="list-disc pl-5 text-lg space-y-2">
                            <li><strong>Maslow (Hierarquia):</strong> Necessidades fisiológicas, segurança, sociais, estima, autorrealização (as inferiores devem ser satisfeitas primeiro).</li>
                            <li><strong>Herzberg (Dois Fatores):</strong> Fatores Higiênicos (evitam insatisfação, mas não motivam - ex: salário, estrutura física) vs. Fatores Motivadores (geram real motivação - ex: trabalho desafiador, crescimento).</li>
                            <li><strong>McClelland:</strong> Três necessidades dominantes adquiridas socialmente: Realização, Afiliação e Poder.</li>
                          </ul>
                        </div>
                        <div className="p-5 bg-muted rounded-lg border">
                          <h6 className="font-bold text-pink-700 dark:text-pink-400 text-xl mb-2">Teorias de Processo (COMO motiva):</h6>
                          <p className="text-base text-muted-foreground mb-2">Explicam como o comportamento se inicia e é mantido.</p>
                          <ul className="list-disc pl-5 text-lg space-y-2">
                            <li><strong>Vroom (Expectativa):</strong> A motivação é o produto de três variáveis: Valência (valor da recompensa) x Instrumentalidade (crença no ganho) x Expectativa (crença no próprio esforço).</li>
                            <li><strong>Skinner (Reforço):</strong> Comportamentos reforçados positivamente tendem a se repetir, enquanto punições extinguem comportamentos.</li>
                            <li><strong>Adams (Equidade):</strong> O indivíduo compara seus esforços e recompensas com os dos colegas; disparidades geram insatisfação motivacional.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBrain />,
                },
                {
                  titulo: "Exemplificação: Análise de Caso de Liderança Situacional na Petrobras",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A teoria de **Liderança Situacional de Hersey e Blanchard** defende que não existe um estilo único e correto de liderança. O estilo deve se adaptar à maturidade e competência dos liderados:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-4 mt-4 text-lg">
                        <p>
                          Imagine duas equipes diferentes sob gestão do Técnico de Suprimentos Sênior na Petrobras:
                        </p>
                        <div className="flex gap-2 items-start">
                          <LuChevronRight className="mt-1 text-emerald-600 flex-shrink-0 w-6 h-6" />
                          <p>
                            <strong>Cenário A (Equipe de Recém-Admitidos):</strong> Sem conhecimento prático das normas da Lei 13.303. O líder deve aplicar o estilo <strong>Direcionador (M1)</strong>, fornecendo instruções claras e supervisionando rigidamente a elaboração técnica de cada edital.
                          </p>
                        </div>
                        <div className="flex gap-2 items-start">
                          <LuChevronRight className="mt-1 text-emerald-600 flex-shrink-0 w-6 h-6" />
                          <p>
                            <strong>Cenário B (Equipe de Analistas de Contratos Veteranos):</strong> Com profundo domínio da legislação e anos de experiência. O líder deve aplicar o estilo **Delegador (M4)**, conferindo autonomia total para elaboração e assinatura das licitações sob sua responsabilidade, atuando apenas como apoio em situações complexas.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: A Pegadinha Frequente do Fator Higiênico de Herzberg",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        O Fator Higiênico de Frederick Herzberg é o maior alvo de pegadinhas das provas de Comportamento Organizacional. Cuidado extremo com a seguinte lógica:
                      </p>
                      <AlertBox tipo="info" titulo="O Paradoxo dos Fatores Higiênicos">
                        <span className="text-lg">
                          Nas provas, a banca costuma dizer que "para motivar os trabalhadores, a empresa aumentou o salário básico ou comprou cadeiras ergonômicas". **Isso é incorreto sob a teoria de Herzberg.** Salário, benefícios, políticas da empresa, segurança no trabalho e infraestrutura física são **Fatores Higiênicos** (extrínsecos). Sua presença apenas previne a insatisfação, mas **não gera motivação ativa**. A motivação real só é obtida por **Fatores Motivacionais** (intrínsecos), como reconhecimento profissional, delegação de responsabilidades desafiadoras e perspectiva de crescimento na carreira.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: A Disfunção da Cultura de Segurança",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Na Petrobras, a Cultura Organizacional é ancorada no valor inegociável da **Segurança e SMS** (Saúde, Meio Ambiente e Segurança). No entanto, toda cultura forte possui potenciais pontos de atenção secundárias:
                      </p>
                      <AlertBox tipo="danger" titulo="Alerta de Rigidez Cultural">
                        <span className="text-lg">
                          Uma cultura de conformidade extrema com a segurança pode, se não for bem administrada pelo comportamento de liderança, criar um clima de aversão total ao risco em processos de suprimento, onde a inovação é tolhida pelo receio de desviar de ritos analógicos tradicionais, tornando o processo de contratação excessivamente burocrático e lento. O equilíbrio exige uma liderança que estimule a segurança sem matar a inovação no processo de suprimento.
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
            index={4}
            variant={mv[4]}
            video={{
              videoId: "7c-YVly_C9o",
              title: "Comportamento Organizacional",
              duration: "13:15",
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Fatores Comportamentais",
                  type: "Mapa Mental",
                  placeholderColor: "bg-rose-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Diretrizes Críticas de Comportamento",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">💡 🤝</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                    <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center">
                      <p className="font-bold text-rose-600 mb-1 text-xl">Dois Fatores</p>
                      <p className="text-base text-muted-foreground">Fatores higiênicos (salário, infraestrutura) apenas evitam insatisfação. Fatores motivadores (reconhecimento, desafio) geram satisfação ativa.</p>
                    </div>
                    <div className="p-4 bg-pink-500/10 rounded-xl border border-pink-500/20 text-center">
                      <p className="font-bold text-pink-600 mb-1 text-xl">Liderança Situacional</p>
                      <p className="text-base text-muted-foreground">O líder deve modular seu estilo de gestão (Direcionar, Apoiar, Delegar) conforme o grau de competência técnica e maturidade do liderado.</p>
                    </div>
                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                      <p className="font-bold text-red-600 mb-1 text-xl">Cultura vs Clima</p>
                      <p className="text-base text-muted-foreground">Cultura expressa a identidade profunda e valores compartilhados históricos; Clima expressa a percepção passageira imediata do time.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• A teoria da expectativa de Vroom afirma que a motivação baseia-se na valência, instrumentalidade e expectativa individual.</p>
                    <p>• Herzberg estabelece de forma clara que a satisfação e a insatisfação organizacionais constituem dimensões totalmente independentes.</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "Comportamento Organizacional",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-4")}
            titulo="QUIZ: Comportamento Organizacional"
            numero={4}
            variant={mv[4]}
            onComplete={(score: number) => handleModuleComplete("modulo-4", score)}
          />
        </TabsContent>
      )}"""

    # Módulo 5 Refactor Block
    m5_new = """      {/* ==================== MÓDULO 5 ==================== */}
      {activeTab === "modulo-5" && (
        <TabsContent value="modulo-5" className="space-y-12 mt-0">
          <ModuleBanner
            numero={5}
            titulo="Gestão por Processos"
            descricao="Aprenda a mapear, analisar e otimizar processos de negócios corporativos, promovendo a integração horizontal e eliminando gargalos."
            variant={mv[5]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[5]}
              title="Dossiê de Gestão de Processos BPM"
              description="A quebra de silos e o gerenciamento horizontal voltado à entrega de valor."
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              {/* C — Contexto (parágrafos 1 e 2) */}
              <p>A gestão de processos de negócio, amplamente referida pela sigla <strong>BPM</strong> (Business Process Management), expressa um marco estrutural no desenho das organizações modernas. Nos concursos promovidos pela Petrobras sob a coordenação da banca CESGRANRIO, a gestão por processos é avaliada sob a ótica da quebra de barreiras departamentais e da modelagem de fluxogramas funcionais baseados na notação padrão BPMN. Dominar este tema habilita o candidato a resolver questões complexas de otimização integrada.</p>
              <p>Diferente do modelo tradicional de divisões verticais (silos), onde cada departamento preocupa-se de forma egoísta apenas com suas tarefas internas, a gestão por processos estabelece um fluxo de trabalho horizontal e contínuo focado na agregação de valor para o cliente final. A cadeia de suprimentos da Petrobras expressa essa horizontalidade conceitual, onde o trâmite de compras atravessa diversas diretorias finalísticas de forma unificada.</p>

              {/* E — Explicação (parágrafos 3 e 4) */}
              <p>Os processos organizacionais são divididos pela literatura clássica de BPM em três categorias funcionais integradas: <strong>processos primários</strong> (ou finalísticos, que tocam e geram valor direto ao cliente externo), <strong>processos de suporte</strong> (ou de apoio, que fornecem recursos internos para viabilizar os primários, como a área de TI ou suprimentos) e <strong>processos gerenciais</strong> (focados no controle de metas e governança).</p>
              <p>O ciclo integrado de BPM inicia-se pelo mapeamento do estado atual dos fluxos, denominado modelagem <strong>As-Is</strong> (como o processo realmente ocorre no presente). A partir do diagnóstico de ineficiências e pontos de atrito, desenha-se o estado futuro otimizado, denominado modelagem <strong>To-Be</strong>. A notação padrão BPMN (Business Process Model and Notation) atua como o alfabeto visual padrão constituído por raias, piscinas, eventos e desvios (gateways) para desenhar graficamente essas rotinas.</p>

              {/* D — Demonstração (parágrafos 5 e 6) */}
              <p>Para visualizar a dinâmica desses conceitos na aquisição de materiais, considere o processo de requisição de tubulações especiais. No mapeamento <strong>As-Is</strong>, identifica-se que o processo passa por três validações manuais redundantes de engenharia em diferentes bases operacionais, gerando um tempo de fila de 25 dias e atrasando a compra.</p>
              <p>No redesenho <strong>To-Be</strong>, a gerência automatiza as validações integrando as assinaturas eletrônicas e eliminando a etapa física do papel, reduzindo o tempo de ciclo total para 3 dias. A piscina representa o processo corporativo integrado de suprimentos, enquanto as raias (swim lanes) demarcam as responsabilidades funcionais distintas de cada agente (técnico operacional, analista financeiro e o fornecedor externo de tubos de aço).</p>

              {/* E — Expansão (parágrafos 7 e 8) */}
              <p>Para otimizar o fluxo de um processo de compras, a administração deve identificar e contornar os gargalos operacionais (bottlenecks), definidos como a atividade de menor capacidade de processamento que limita a vazão e a velocidade de todo o circuito de tarefas. A melhoria contínua dos processos pode ser conduzida por meio da metodologia **Kaizen** (mudanças graduais, de baixo custo e incrementais executadas de forma colaborativa).</p>
              <p>Contudo, se o processo estiver sob obsolescência extrema e ineficiência sistêmica generalizada, a organização deve recorrer à **Reengenharia**, caracterizada pelo descarte absoluto do modelo atual e reconstrução radical de processos do zero. A modelagem To-Be de reengenharia não busca melhorar o fluxo atual, mas sim inventar um novo fluxo operacional de alto desempenho apoiado em novos paradigmas de TI e automação de sistemas.</p>

              {/* A — Aplicação (parágrafos 9 e 10) */}
              <p>A banca CESGRANRIO costuma induzir o candidato ao erro ao confundir a terminologia de gerenciar <strong>OS</strong> processos (atividade de rotina e controle de métricas tradicionais) com gerenciar <strong>POR</strong> processos (reestruturação radical da cultura da empresa para que a hierarquia formal perca força em relação à fluidez horizontal do valor). A banca também cobra a classificação de compras e suprimentos como um clássico processo de **suporte**, pois apoia a atividade-fim de refino e exploração de petróleo.</p>
              <p>Na Petrobras, a gestão de processos de compras é centralizada no portal Petronect, estruturando um fluxo horizontal transparente que atende aos requisitos de compliance da Lei 13.303. O mapeamento contínuo de processos e o treinamento tático de técnicos de suprimentos asseguram que a emissão de notas, a contratação de sondas e a descarga logística de lubrificantes ocorram de forma integrada e sob o menor tempo de ciclo de aquisição possível.</p>
            </div>

            <CardCarousel
              cards={[
                {
                  titulo: "Processos Primários",
                  descricao: "Processos finalísticos de ponta a ponta que geram valor diretamente para o cliente externo da organização (ex: Produção e Refino de Combustíveis).",
                  icone: <LuFactory />,
                  corFundo: "bg-emerald-500/10",
                },
                {
                  titulo: "Processos de Suporte",
                  descricao: "Processos transversais que garantem os recursos necessários para a execução das atividades finalísticas (ex: Tecnologia da Informação, Suprimentos).",
                  icone: <LuBuilding />,
                  corFundo: "bg-teal-500/10",
                },
                {
                  titulo: "BPMN e Modelagem",
                  descricao: "Notaçao gráfica padrão para modelar fluxos de processos de forma visual. Divide-se em pools (piscinas), raias (responsabilidades) e gateways (decisão).",
                  icone: <LuNetwork />,
                  corFundo: "bg-cyan-500/10",
                },
                {
                  titulo: "As-Is e To-Be",
                  descricao: "As-Is: Mapeamento detalhado da situação operacional real no presente. To-Be: Modelagem desenhada para o estado ideal futuro otimizado.",
                  icone: <LuActivity />,
                  corFundo: "bg-blue-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[5]}
              title="Metodologia e Ciclos de Melhoria BPM"
              description="Estruturação, mapeamento e modelagem horizontal de fluxos de valor."
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "Conceituação: O Ciclo BPM e a Notação Gráfica BPMN",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A modelagem de processos permite visualizar a sequência de atividades de ponta a ponta. A notação gráfica padrão mundial é o <strong>BPMN (Business Process Model and Notation)</strong>, composto por elementos bem definidos:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-xl text-teal-600 block mb-2">Pools e Lanes:</strong>
                          <p className="text-lg">
                            A Piscina (Pool) representa o processo organizacional como um todo. As Raias (Lanes) subdividem a piscina para identificar quem executa cada tarefa específica (departamentos ou cargos).
                          </p>
                        </div>
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-xl text-cyan-600 block mb-2">Gateways (Decisão):</strong>
                          <p className="text-lg">
                            Losangos que indicam pontos de desvio no fluxo (decisões). Podem ser exclusivos (uma única rota), paralelos (rotas simultâneas) ou inclusivos (múltiplas rotas condicionais).
                          </p>
                        </div>
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-xl text-blue-600 block mb-2">Eventos e Atividades:</strong>
                          <p className="text-lg">
                            Círculos indicam o início, intermediários e fim do processo. Retângulos com cantos arredondados representam tarefas físicas ou lógicas executadas pelos agentes.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: O Fluxo de Compras (Procure-to-Pay) na Petrobras",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        No Procure-to-Pay da Petrobras, o processo transita de forma contínua através das raias do fluxograma corporativo:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border mt-4 text-lg space-y-3">
                        <p>1. <strong>Raia de Operações (Macaé):</strong> O técnico de suprimentos identifica que o estoque de brocas especiais de perfuração atingiu o ponto de ressuprimento no SAP.</p>
                        <p>2. <strong>Raia de Suprimentos (Rio de Janeiro):</strong> O analista de licitações publica o edital no Petronect conforme as exigências e ritos da Lei 13.303.</p>
                        <p>3. <strong>Raia Financeira:</strong> A auditoria interna valida a regularidade fiscal do fornecedor vencedor e emite a ordem de pagamento integrada.</p>
                        <p>A otimização integrada dessas interfaces elimina gargalos operacionais e evita paradas de sondas de perfuração.</p>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: Melhoria Contínua (Kaizen) vs. Reengenharia Radical",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A CESGRANRIO adora cobrar a diferenciação clássica de metodologias de aprimoramento de processos de negócio:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-emerald-800 dark:text-emerald-400 mb-2">Kaizen (Melhoria Incremental):</h6>
                          <p className="text-lg">
                            Evolução gradual, contínua e de baixo custo financeiro. Parte da premissa de eliminar desperdícios a partir da participação ativa e colaborativa de todos os colaboradores da base fabril (baixo risco).
                          </p>
                        </div>
                        <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-rose-800 dark:text-rose-400 mb-2">Reengenharia (Mudança Radical):</h6>
                          <p className="text-lg">
                            Descarte completo e absoluto do processo existente. Reconstrução radical do zero ("folha em branco"), redesenhando fluxos apoiados em novas tecnologias (alto custo, risco e impacto gerencial).
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: O Perigo da Otimização Localizada",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Um erro clássico de modeladores inexperientes é tentar melhorar de forma isolada a eficiência de uma única raia departamental:
                      </p>
                      <AlertBox tipo="danger" titulo="A Armadilha dos Subprocessos Isolados">
                        <span className="text-lg">
                          Apressar o tempo de triagem física de notas no almoxarifado em 50% de nada adiantará se a raia de auditoria jurídica central estiver sobrecarregada, acumulando processos de homologação. O gargalo continuará limitando a velocidade de entrega total da cadeia de compras. A visão de BPM deve abranger o processo de ponta a ponta, de forma que as melhorias locais não gerem excesso de estoque intermediário por descompasso de capacidade.
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
            index={5}
            variant={mv[5]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Gestão por Processos",
              duration: "13:45",
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Mapeamento As-Is e To-Be",
                  type: "Fluxograma BPMN",
                  placeholderColor: "bg-teal-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Diretrizes Críticas de Processos",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">⚙️ 🔄</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                    <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center">
                      <p className="font-bold text-teal-600 mb-1 text-xl">Mapeamento As-Is</p>
                      <p className="text-base text-muted-foreground">Documentar a realidade real atual de como os processos rodam no dia a dia da plataforma para identificar ineficiências.</p>
                    </div>
                    <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                      <p className="font-bold text-cyan-600 mb-1 text-xl">Redesenho To-Be</p>
                      <p className="text-base text-muted-foreground">Modelagem ideal desenhada para o futuro, livre de trâmites redundantes e papéis lentos.</p>
                    </div>
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                      <p className="font-bold text-blue-600 mb-1 text-xl">Kaizen vs Reengenharia</p>
                      <p className="text-base text-muted-foreground">Kaizen propõe evolução contínua incremental e barata. Reengenharia propõe quebra radical e recomeço do zero.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• Suprimentos e almoxarifado classificam-se como processos de suporte, fornecendo recursos à atividade-fim.</p>
                    <p>• Pools indicam a organização; Lanes subdividem responsabilidades hierárquicas no fluxograma.</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              titulo: "Gestão por Processos",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-5")}
            titulo="QUIZ: Gestão por Processos"
            numero={5}
            variant={mv[5]}
            onComplete={(score: number) => handleModuleComplete("modulo-5", score)}
          />
        </TabsContent>
      )}"""

    # Módulo 6 Refactor Block
    m6_new = """      {/* ==================== MÓDULO 6 ==================== */}
      {activeTab === "modulo-6" && (
        <TabsContent value="modulo-6" className="space-y-12 mt-0">
          <ModuleBanner
            numero={6}
            titulo="Teoria das Organizações"
            descricao="Evolução histórica do pensamento administrativo: de Taylor à Contingência. Escolas, correntes e como elas moldaram a administração moderna."
            variant={mv[6]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[6]}
              title="Dossiê Histórico-Teórico"
              description="As grandes escolas e teorias que fundamentam a administração contemporânea."
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              {/* C — Contexto (parágrafos 1 e 2) */}
              <p>A evolução histórica das teorias administrativas constitui o pilar científico básico sobre o qual se assenta toda a moderna gestão das corporações complexas. Nos exames aplicados pela banca CESGRANRIO para o nível superior, a compreensão cronológica e o foco estratégico de cada escola de pensamento são avaliados recorrentemente por meio de questões conceituais profundas. O domínio dessas teorias é a chave fundamental para evitar confusões e armadilhas estruturais na prova.</p>
              <p>O estudo da evolução administrativa funciona de forma semelhante a escavar camadas arqueológicas: cada teoria ou escola de pensamento (Clássica, Humanista, Burocrática, Sistêmica e Contingencial) respondeu aos dilemas econômicos e tecnológicos de sua respectiva época histórica. Em uma empresa de grande complexidade estrutural como a Petrobras, essas escolas de pensamento convivem simultaneamente, orientando rotinas fabris e comitês de inovação de forma híbrida.</p>

              {/* E — Explicação (parágrafos 3 e 4) */}
              <p>A <strong>Administração Científica</strong> (Taylor) iniciou a era clássica focando na eficiência das tarefas operacionais do chão de fábrica, otimizando tempos, movimentos e recursos com base na Organização Racional do Trabalho (ORT). Simultaneamente, a <strong>Teoria Clássica</strong> (Fayol) desenhou os princípios formais da gerência a partir da estrutura global, definindo a cadeia de comando linear e as funções originais do administrador.</p>
              <p>Contrapondo-se ao foco puramente técnico da era clássica, Elton Mayo conduziu os estudos de Hawthorne, fundando a **Escola de Relações Humanas** (que enfatiza os grupos informais, a motivação social, a liderança participativa e as atitudes humanas). Posteriormente, Max Weber consolidou a **Teoria da Burocracia**, propondo um modelo racional-legal ideal baseado na impessoalidade jurídica, meritocracia, especialização de cargos e regras exaustivamente escritas para coibir fraudes.</p>

              {/* D — Demonstração (parágrafos 5 e 6) */}
              <p>Para visualizar a coexistência prática dessas escolas em uma estatal de energia, considere o gerenciamento de refino de petróleo. Nas unidades operacionais de destilação de derivados da Petrobras, aplicam-se a impessoalidade weberiana e os princípios de Taylor para cronometrar a eficiência física do refino e garantir a conformidade documental das licitações (Burocracia Racional-Legal).</p>
              <p>No entanto, no Centro de Pesquisas e Desenvolvimento da Petrobras (CENPES), onde cientistas desenvolvem combustíveis alternativos sustentáveis, a rigidez burocrática é relaxada. Adota-se o estilo da <strong>Escola Contingencial</strong> (adaptabilidade dinâmica ao ambiente externo) e da Escola de Relações Humanas, estimulando a liderança informal participativa e a autonomia criativa das equipes multidisciplinares. Não existe uma única melhor maneira universal de gerir (<em>one best way</em>): a estrutura depende do contexto tecnológico e ambiental.</p>

              {/* E — Expansão (parágrafos 7 e 8) */}
              <p>A Burocracia, embora projetada por Weber para atingir a máxima eficiência técnica através da racionalidade de processos, é frequentemente corrompida na prática cotidiana por disfunções comportamentais sistemáticas descritas por Robert Merton. Dentre as disfunções mais cobradas pela CESGRANRIO, destaca-se o excesso de formalismo (apego cego a papéis e assinaturas que atrasam trâmites de compras) e a resistência crônica a mudanças (inabilidade de aceitar inovações sistêmicas).</p>
              <p>Destaca-se também a categorização dos regulamentos como fins em si mesmos, onde o servidor cumpre a risca a rotina em prejuízo da própria eficácia organizacional do projeto. Para contornar essas disfunções, a moderna governança de suprimentos da Petrobras adota a **Teoria de Sistemas**, compreendendo a empresa como um sistema aberto que interage de forma dinâmica e contínua com fornecedores internacionais, acionistas e agências reguladoras (ANP).</p>

              {/* A — Aplicação (parágrafos 9 e 10) */}
              <p>Nas provas objetivas de concurso, a banca CESGRANRIO costuma induzir o candidato ao erro invertendo a direção metodológica da escola científica e da clássica. Lembre-se: Taylor adota uma abordagem de baixo para cima (<strong>bottom-up</strong>, focando na tarefa do operário para atingir a gerência). Já Fayol adota uma abordagem de cima para baixo (<strong>top-down</strong>, partindo da estrutura global da diretoria para descer até as bases da empresa). A banca também foca na identificação de disfunções burocráticas clássicas.</p>
              <p>Na Petrobras, o técnico de suprimentos lida no cotidiano com a Burocracia Weberiana em sua feição mais rígida ao aplicar o Regulamento Licitatório Petronect derivado da Lei das Estatais. Ao fiscalizar a regularidade cadastral de fornecedores e registrar processos em sistema, ele evita atritos de impessoalidade e garante a isonomia concorrencial de compras. O profissional deve ter o discernimento de seguir a burocracia preventiva sem permitir que o formalismo excessivo de papelada degenere em ineficiência logística.</p>
            </div>

            <CardCarousel
              cards={[
                {
                  titulo: "Administração Científica",
                  descricao: "Frederick Taylor (~1911). Foco no 'chão de fábrica', estudo de tempos e movimentos, divisão de tarefas, máxima especialização. Foco nos meios.",
                  icone: <LuSearchCode />,
                  corFundo: "bg-blue-500/10",
                },
                {
                  titulo: "Teoria Clássica e Burocracia",
                  descricao: "Fayol (~1916) e Weber. Foco na estrutura formal da organização, princípios universais de administração e rigidez burocrática dos regulamentos.",
                  icone: <LuBuilding />,
                  corFundo: "bg-indigo-500/10",
                },
                {
                  titulo: "Relações Humanas",
                  descricao: "Elton Mayo (~1932). Hawthorne. Reconhece os grupos informais, fatores emocionais, o trabalhador social (*homo socialis*) e as condições humanas.",
                  icone: <LuUsers />,
                  corFundo: "bg-emerald-500/10",
                },
                {
                  titulo: "Abordagem Contingencial",
                  descricao: "Lawrence, Lorsch e Woodward. Não há uma única forma ideal de administrar (*one best way*). Tudo depende do ambiente externo e da tecnologia.",
                  icone: <LuZap />,
                  corFundo: "bg-amber-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[6]}
              title="Fundamentos Históricos e Escolas de Pensamento"
              description="Comparação crítica entre as grandes escolas administrativas."
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "Conceituação: A Burocracia Weberiana e suas Disfunções Clássicas",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A **Teoria da Burocracia de Max Weber** fundamenta a estrutura formal do serviço público brasileiro e das estatais. Weber projetou a burocracia como o modelo racional-legal ideal de eficiência baseado na impessoalidade, mérito e regras escritas claras. Contudo, na prática organizacional surgem desvios patológicos chamados de **Disfunções da Burocracia** (propostos por Robert Merton), assunto recorrente em provas:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-lg">
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-xl text-blue-600 dark:text-blue-400 block mb-2">Características Ideais de Weber:</strong>
                          <ul className="list-disc pl-5 space-y-2 text-lg">
                            <li><strong>Caráter Legal:</strong> Regras, rotinas e normas exaustivamente escritas em estatutos.</li>
                            <li><strong>Impessoalidade:</strong> Tratamento sem favorecimento ou protecionismo pessoal.</li>
                            <li><strong>Hierarquia Funcional:</strong> Divisão estrita de esferas de competência e subordinação de chefia.</li>
                            <li><strong>Profissionalização:</strong> Escolha técnica e meritocrática dos agentes públicos.</li>
                          </ul>
                        </div>
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-xl text-amber-600 dark:text-amber-400 block mb-2">Disfunções Reais (Patologias):</strong>
                          <ul className="list-disc pl-5 space-y-2 text-lg">
                            <li><strong>Excesso de Formalismo (Papelório):</strong> Apego exagerado a carimbos, assinaturas e rotinas lentas.</li>
                            <li><strong>Resistência a Mudanças:</strong> Inabilidade crônica de se adaptar a novas tecnologias ou realidades de mercado.</li>
                            <li><strong>Despersonalização:</strong> Tratar as demandas individuais de forma puramente abstrata e cega.</li>
                            <li><strong>Regras como Fins em Si Mesmas:</strong> Cumprir a regra cegamente, mesmo que impeça o alcance do objetivo real.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: Como a Petrobras Gerencia o Choque Burocracia vs. Contingência",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Para a Petrobras, operar a cadeia de suprimentos exige um equilíbrio cirúrgico entre duas escolas aparentemente contraditórias:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-lg">
                        <li>
                          <strong>Burocracia Racional-Legal:</strong> Exigida mandatoriamente pela Lei 13.303, que rege as contratações públicas para coibir fraudes, nepotismo e garantir tratamento isonômico. Todo processo de compra deve deixar trilhas estritas de auditoria (impessoalidade e formalidade weberianas).
                        </li>
                        <li>
                          <strong>Abordagem Contingencial (Adaptabilidade):</strong> Quando ocorre um vazamento imprevisto ou a falha mecânica de uma broca em plataforma isolada a 200 km da costa, a Petrobras não pode esperar os prazos normais de uma licitação tradicional burocrática. Aplica-se a contingência situacional por meio das cláusulas de compra emergencial (dispensa regulamentar), priorizando a segurança e o fornecimento contínuo.
                        </li>
                      </ul>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: A Linha do Tempo e Conceitos-Chave da CESGRANRIO",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Nas provas objetivas, a banca cobra a associação direta de autores, teorias e seus focos principais de estudo. Decore este mapa conceitual para responder instantaneamente:
                      </p>
                      <div className="overflow-x-auto mt-4 font-sans text-lg">
                        <table className="w-full text-left border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-3 border border-border font-bold">Escola</th>
                              <th className="p-3 border border-border font-bold">Foco Principal</th>
                              <th className="p-3 border border-border font-bold">Conceito e Termo Curinga</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-3 font-bold border border-border text-blue-600">Administração Científica (Taylor)</td>
                              <td className="p-3 border border-border">Nas Tarefas e Tempos (Chão de fábrica).</td>
                              <td className="p-3 border border-border">ORT (Organização Racional do Trabalho), Divisão do trabalho, Peça-Preço, *Homo Economicus*.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-indigo-600">Teoria Clássica (Fayol)</td>
                              <td className="p-3 border border-border">Na Estrutura formal global.</td>
                              <td className="p-3 border border-border">14 Princípios universais, Funções Administrativas originais, unidade de comando, linearidade.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-emerald-600">Relações Humanas (Elton Mayo)</td>
                              <td className="p-3 border border-border">Nas Pessoas e Grupos informais.</td>
                              <td className="p-3 border border-border">Hawthorne, *Homo Socialis*, liderança informal, dinâmica de grupos, fatores motivacionais sociais.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-cyan-600">Teoria de Sistemas (Ludwig)</td>
                              <td className="p-3 border border-border">Na Visão Sistêmica integrada.</td>
                              <td className="p-3 border border-border">Entropia negativa, sinergia, homeostase, limites dinâmicos, organização como sistema aberto.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-amber-600">Contingencial (Woodward)</td>
                              <td className="p-3 border border-border">No Ambiente e Tecnologia.</td>
                              <td className="p-3 border border-border">"Não há uma única forma correta de gerir", imperativo tecnológico, flexibilidade orgânica vs mecânica.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: Teoria Clássica vs. Científica",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Muitos candidatos acham que a Escola Científica e a Clássica são sinônimos por pertencerem à Era Clássica da Administração. **A direção do olhar metodológico é uma pegadinha recorrente nas provas.**
                      </p>
                      <AlertBox tipo="warning" titulo="A Direção do Olhar Metodológico">
                        <span className="text-lg">
                          A **Administração Científica** de Frederick Taylor adota uma abordagem de baixo para cima (*bottom-up*), partindo da análise minuciosa da tarefa do operário para depois chegar à gerência global. Por outro lado, a **Teoria Clássica** de Henri Fayol adota uma abordagem de cima para baixo (*top-down*), partindo da estrutura global da diretoria e descendo até as divisões de base. A banca adora inverter estes dois fluxos!
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
            index={6}
            variant={mv[6]}
            video={{
              videoId: "7c-YVly_C9o",
              title: "Escolas Administrativas - Linha do Tempo",
              duration: "15:45",
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Evolução Histórica",
                  type: "Timeline",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Diretrizes Críticas das Escolas",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">📜 🏆</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                      <p className="font-bold text-blue-600 mb-1 text-xl">Escola Científica & Clássica</p>
                      <p className="text-base text-muted-foreground">Taylor foca na tarefa e tempos (bottom-up). Fayol foca na estrutura formal global da empresa (top-down).</p>
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                      <p className="font-bold text-emerald-600 mb-1 text-xl">Burocracia & Sistemas</p>
                      <p className="text-base text-muted-foreground">Burocracia (Weber) foca em impessoalidade legal e mérito. Sistemas foca na organização como um sistema aberto no ambiente.</p>
                    </div>
                    <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                      <p className="font-bold text-amber-600 mb-1 text-xl">Escola Contingencial</p>
                      <p className="text-base text-muted-foreground">Não existe receita de gestão única ideal absoluta. Tudo depende dos imperativos da tecnologia e ambiente externo.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• As disfunções descritas por Merton expressam patologias práticas como o excesso de papelório e regras como fins em si mesmas.</p>
                    <p>• A experiência de Hawthorne (Mayo) provou a primazia das forças sociais informais sobre as condições de iluminação física.</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              titulo: "Teoria das Organizações",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-6")}
            titulo="QUIZ: Teoria das Organizações"
            numero={6}
            variant={mv[6]}
            onComplete={(score: number) => handleModuleComplete("modulo-6", score)}
          />
        </TabsContent>
      )}"""

    # Vamos fazer o split e as substituições
    blocks = content.split('      {/* ==================== MÓDULO 1 ==================== */}')
    if len(blocks) != 2:
        print("Erro: Marcador do Módulo 1 não é único!")
        return

    part_before = blocks[0]
    rest = blocks[1]

    blocks2 = rest.split('      {/* ==================== MÓDULO 2 ==================== */}')
    if len(blocks2) != 2:
        print("Erro: Marcador do Módulo 2 não é único!")
        return
    
    part_m1_old = blocks2[0]
    rest2 = blocks2[1]

    blocks3 = rest2.split('      {/* ==================== MÓDULO 3 ==================== */}')
    if len(blocks3) != 2:
        print("Erro: Marcador do Módulo 3 não é único!")
        return

    part_m2_old = blocks3[0]
    rest3 = blocks3[1]

    blocks4 = rest3.split('      {/* ==================== MÓDULO 4 ==================== */}')
    if len(blocks4) != 2:
        print("Erro: Marcador do Módulo 4 não é único!")
        return

    part_m3_old = blocks4[0]
    rest4 = blocks4[1]

    blocks5 = rest4.split('      {/* ==================== MÓDULO 5 ==================== */}')
    if len(blocks5) != 2:
        print("Erro: Marcador do Módulo 5 não é único!")
        return

    part_m4_old = blocks5[0]
    rest5 = blocks5[1]

    blocks6 = rest5.split('      {/* ==================== MÓDULO 6 ==================== */}')
    if len(blocks6) != 2:
        print("Erro: Marcador do Módulo 6 não é único!")
        return

    part_m5_old = blocks6[0]
    rest6 = blocks6[1]

    blocks7 = rest6.split('      {/* ==================== MÓDULO 7 ==================== */}')
    if len(blocks7) != 2:
        print("Erro: Marcador do Módulo 7 não é único!")
        return

    part_m6_old = blocks7[0]
    part_after = blocks7[1]

    # Remonta o arquivo completo
    new_content = (
        part_before +
        m1_new + "\n\n" +
        m2_new + "\n\n" +
        m3_new + "\n\n" +
        m4_new + "\n\n" +
        m5_new + "\n\n" +
        m6_new + "\n\n" +
        "      {/* ==================== MÓDULO 7 ==================== */}" +
        part_after
    )

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print("Sucesso! Módulos 1 a 6 refatorados com precisão absoluta de string.")

if __name__ == "__main__":
    refactor()
