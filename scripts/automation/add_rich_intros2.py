import re

file_path = "src/components/aulas/portugues/AulaInterpretacaoTexto.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

rich_intros = {
    "1": """
      {/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="A Fronteira entre o Fato e a Suposição" description="A base fundamental da interpretação CESGRANRIO: o respeito absoluto aos limites do texto." variant={mv[1]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            O domínio da interpretação de textos técnicos (como os cobrados em concursos da Petrobras) começa pela distinção implacável entre dois processos: <strong>compreender</strong> e <strong>interpretar</strong>. Muitos candidatos perdem pontos preciosos por confundirem o que está literalmente escrito com o que se pode deduzir ou, pior, por trazerem conhecimentos prévios para preencher lacunas do texto.
          </p>
          <p>
            A <strong>compreensão</strong> é um ato passivo e objetivo. Ela mapeia os dados explícitos, os números, os conceitos e os fatos declarados pelo autor. Quando o examinador utiliza comandos como "Segundo o texto", "O autor afirma que", ou "De acordo com o parágrafo", sua única função é localizar a paráfrase correta no documento analítico. Não há espaço para julgamentos.
          </p>
          <p>
            Por outro lado, a <strong>interpretação</strong> é dedução autorizada. Ela reside no terreno do implícito estruturado. Comandos como "Depreende-se", "Infere-se", ou "As entrelinhas sugerem" exigem que você conecte duas ou mais informações (por exemplo, cause e consequência) ou que use conectivos para tirar conclusões lógicas incontestáveis, que, embora não ditas abertamente, estão "amarradas" ao texto original.
          </p>
          <p>
            Na CESGRANRIO, as alternativas erradas de provas de nível médio e técnico habitualmente usam afirmações factualmente verdadeiras no "mundo real", mas que não foram contempladas no parágrafo em questão. A banca tenta sequestrar a atenção do candidato técnico usando lógicas empíricas do dia a dia industrial (e.g., segurança do trabalho ou dinâmicas do pré-sal). Isso converte uma questão lógica em uma "pegadinha".
          </p>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
            <h4 className="font-bold text-foreground flex items-center gap-2">⚠️ O Princípio do Guardião: Extrapolação e Limite Textual</h4>
            <p>
              Toda vez que uma alternativa trouxer fatos <strong>além</strong> dos bordos do texto, descarte-a imediatamente, por mais correta que soe na vida real. A alternativa correta de interpretação atua por <em>dedução necessária</em> – ela tem obrigatoriedade lógica diante das evidências textuais documentadas.
            </p>
          </div>
        </div>
      </section>""",
    "2": """
      {/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="O Coração Estrutural da Mensagem" description="Localize e extraia a ideia central (O Tópico Frasal) sem ser consumido por desvios e distrações." variant={mv[2]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            A velocidade com a qual um profissional técnico compreende um memorando ou laudo em uma refinaria deve ser a mesma aplicada na hora da prova. O grande acelerador dessa clareza analítica chama-se <strong>Tópico Frasal</strong>: o elemento central de um parágrafo que resume a carga semântica ou argumentativa inteira do bloco textual, servindo de viga mestra.
          </p>
          <p>
            Em linhas gerais, um parágrafo argumentativo bem construído não é uma mistura aleatória de ideias; ele é, de certa forma, uma mini-dissertação. Ele possui sua própria introdução, corpo e desfecho argumentativo. Descobrir a sua "âncora" inicial impede que você se perca nas informações subsidiárias (adornos) ou nos exemplos apresentativos que o autor insere para ganhar credibilidade descritiva.
          </p>
          <p>
            Seja em um modelo analítico ou dissertativo, os tópicos frasais assumem dinâmicas múltiplas: pode ser uma <em>declaração contundente inicial</em> (modelo adotado em cerca de 70% dos ensaios examinados pela CESGRANRIO); uma <em>definição</em> conceitual; um eixo de <em>comparação/contraste</em>; ou uma formulação em tom de interrogação seguida da tese.
          </p>
          <p>
            Muitas questões disparam o comando: "O segundo parágrafo constitui-se a partir da seguinte diretriz..." – nesses casos, a banca ignorou todos os rodeios estéticos e está validando unicamente a capacidade do candidato de extrair e sintetizar o Tópico Frasal subjacente. Confundir o miolo ou um exemplo solto com a verdadeira tese gera perda quase certa de pontuação.
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
            <h4 className="font-bold text-foreground">🎯 Tática de Radar: Encontrando a Viga Primária</h4>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>Passo 1:</strong> Leia a primeira frase do parágrafo, pois ela costuma ser a declaração nuclear.</li>
              <li><strong>Passo 2:</strong> Submeta-a a um teste de isolamento. Se as frases subsequentes parecem "responder" ou "exemplificar" essa primeira linha, este é o seu Tópico Frasal.</li>
              <li><strong>Passo 3:</strong> Em caso positivo baseie qualquer resumo de ideias centralizadas apenas nessa chave lógica.</li>
            </ul>
          </div>
        </div>
      </section>""",
    "3": """
      {/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="As Engrenagens do Argumento" description="Como autores costuram palavras para induzir lógicas e provar teorias." variant={mv[3]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            Um texto argumentativo assemelha-se a uma rede de alta precisão lógica. Cada afirmação precisa de cabos de sustentação para não ruir, e esses cabos assumem a forma de <strong>coesão argumentativa</strong> (ou coesão sequencial), gerada de modo estruturado através de conjunções, advérbios e expressões conectivas que evidenciam qual a progressão das ideias.
          </p>
          <p>
            A compreensão de nível sênior ignora a superficialidade e vai direto à espinha dorsal do autor. O que ele está fazendo? Ele está apresentando uma consequência inevitável ("Portanto"), demonstrando uma oposição técnica ("Contudo"), introduzindo uma concessão tolerável ("Embora") ou apenas sinalizando um acréscimo ("Além disso")? Cada conectivo opera como uma "placa de trânsito" para o fluxo do raciocínio.
          </p>
          <p>
            O erro capital é ler buscando reter "somente o assunto principal". Na CESGRANRIO, o modo como as informações se entrelaçam cria a interpretação final. Uma questão clássica pedirá a reescritura de um trecho alterando as conjunções sem prejudicar a lógica global. Memorizar todos os tipos de conectivos das gramáticas tradicionais é fundamental.
          </p>
          <p>
            Pense em um manual que diga: "<strong>Dado que</strong> a corrosão aumenta, <strong>torna-se vital</strong> substituir as ligas, <strong>ainda que</strong> a operação demande atrasos". "Dado que" marca a causa. "Ainda que" prevê e quebra uma oposição pré-fabricada pelo autor (o incômodo do atraso), garantindo vitória para a ideia de substituição.
          </p>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
            <h4 className="font-bold text-foreground">A Tríade de Conectivos Perigosos CESGRANRIO</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-3">
              <div className="bg-white dark:bg-black/20 p-3 rounded-lg shadow-sm border border-border">
                <strong className="block text-indigo-600 dark:text-indigo-400">Embora / Conquanto</strong>
                (Concessão) Permite a realidade de um obstáculo sem que este impeça o fato principal.
              </div>
              <div className="bg-white dark:bg-black/20 p-3 rounded-lg shadow-sm border border-border">
                <strong className="block text-rose-600 dark:text-rose-400">Portanto / Por conseguinte</strong>
                (Conclusão) Cimenta o peso prático do argumento preexistente.
              </div>
              <div className="bg-white dark:bg-black/20 p-3 rounded-lg shadow-sm border border-border">
                <strong className="block text-emerald-600 dark:text-emerald-400">Pois / Visto que</strong>
                (Causa/Explicação) Justificam, na base técnica e lógica, a adoção de um evento antecedente.
              </div>
            </div>
          </div>
        </div>
      </section>""",
    "4": """
      {/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="Identidade do Documento: A Tipologia" description="Dissertação versus Descrição versus Injunção: as intenções matrizes de escrita." variant={mv[4]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            Não existe texto desprovido de finalidade. Quando um autor decide redigir, ele o faz guiado por um <strong>Tipo Textual</strong> predominante: narrar o curso de eventos, descrever os traços de um material, expor conceituações abstratas de forma impessoal, defender uma tese por via de argumentos rígidos (dissertativo-argumentativo) ou incitar procedimentos sob forma de instruções (injunção).
          </p>
          <p>
            Muitos candidatos falham no crivo CESGRANRIO por confundirem domínios. Um documento puramente <em>expositivo</em> muitas vezes é confundido com documentação argumentativa simplesmente porque usa tons acadêmicos rigorosos. O diferencial é o "ponto de vista": há um viés e uma tese exigindo defesa e convencimento do leitor cético? Se sim, a estrutura saltou de exposição para <em>argumentação</em>.
          </p>
          <p>
            Raramente um texto de fato ostentará apenas uma matriz tipológica de ponta a ponta. Um memorando poderá ter traços narrativos, injuntivos e argumentativos. Mas atente-se ao comando de prova: frequentemente ele exige a identificação do tipo <strong>predominante</strong> ao longo de um fragmento específico.
          </p>
          <p>
            Para cargos técnicos operacionais predominam textos Expositoras (manuais, laudos) e Injuntivas (procedimentos, NR). Contudo, nas provas de português da instituição o texto motivador de Língua Portuguesa quase sempre trará crônicas ou textos dissertativos-argumentativos para cobrar um posicionamento ativo por parte do candidato.
          </p>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
            <h4 className="font-bold text-foreground">Marcadores Estruturais</h4>
            <p>
              Em textos Injuntivos, procure a preponderância contundente de verbos em <strong>imperativo</strong> e infinitivo de ordem (Abra, Conecte, Realizar). Textos argumentativos orbitarão em torno de juízos de valor ("é inegável", "a principal desvantagem") e foco na sustentação de premissas abstratas.
            </p>
          </div>
        </div>
      </section>""",
    "5": """
      {/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="Mapeamento Dêitico: Quem é Quem" description="Pronomes relativos e referenciação como chaves de leitura estruturada." variant={mv[5]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            Raramente um bom autor repete os mesmos vocábulos indiscriminadamente. Ele opera a <strong>Coesão Referencial</strong>, acionando pronomes oblíquos, demonstrativos e <em>pronomes relativos</em> como "que", "o qual" e "cujo", estabelecendo caminhos invisíveis entre o núcleo sintático e outras instâncias textuais.
          </p>
          <p>
            "A palavra destacada em 'onde <em>ele</em> aplicou sanções' refere-se no parágrafo a...". Esta técnica vai muito além do simples pronome. Autores habilidosos executam a <em>substituição lexical</em>: em vez de dizer repetidamente "o petróleo bruto", ele substitui por "o combustível negro" ou por hiperônimos como "o insumo produtivo".
          </p>
          <p>
            Isso significa que você precisará operar constantemente no eixo da <strong>Anáfora</strong> (referência a algo que já foi citado no passado textualmente) e <strong>Catáfora</strong> (referência a algo que será listado adiante e que está sendo apenas introduzido: "A ordem de serviço orienta <em>isto</em>: preencher a ficha."). Confundir esses eixos na hora da prova desmorona toda a inteligibilidade lógica da frase.
          </p>
          <p>
            A CESGRANRIO adora induzir confusão de múltiplos protagonistas. "Diretor e Operador relataram o fato; aquele cobrava os custos, já este a integridade." Se os operadores do discurso desconhecerem as regras gramaticais limitadoras de referenciais remotos ou imediatos (aquele vs este), vão escorregar invariavelmente numa armadilha básica.
          </p>
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
            <h4 className="font-bold text-foreground">Regra Prática: "Este" vs "Esse" no Texto</h4>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>ESTE(s), ESTA(s), ISTO:</strong> Pode retomar de imediato a ocorrência anterior mais próxima no texto, ou iniciar processo de <strong>catáfora</strong> (referir-se ao que vai ser revelado à frente).</li>
              <li><strong>ESSE(s), ESSA(s), ISSO:</strong> É o coringa <strong>anafórico</strong> resumidor ("As oscilações do dólar geraram demissões. Diante dESSE panorama..."). Referem-se ao passado sem falhas.</li>
            </ul>
          </div>
        </div>
      </section>""",
    "6": """
      {/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="O Detetive Linguístico: O Subentendido e o Pressuposto" description="Mapeando tons vitais que a matriz adjetiva e adverbial escondem nos bastidores." variant={mv[6]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            Engajar-se com o óbvio e o literal, embora seguro e funcional, expõe o candidato a lacunas para lidar com certas alternativas onde a tese exigia a detecção de <strong>conteúdos implícitos</strong>. Estamos abordando aqui o cume da análise textual madura: identificação de informações via polissemia, modalizadores (infelizmente, meramente) e a implacabilidade da <em>pressuposição adverbial</em> e estrutural em certas correntes sintáticas.
          </p>
          <p>
            Uma palavra como "Ainda" encerra sentenças com um fardo tremendo. "A subsidiária local <em>ainda</em> opera em defasagem". Isso declara que há falha atual (explícito), mas traz um pressuposto cristalino não dito: a defasagem vem de longa data e já existia antes dessa aferição temporal. Estas marcações limitam as possíveis interpretações posteriores que a prova pode lhe exigir julgar.
          </p>
          <p>
            A ironia e a hipérbole são sistematicamente alvos em crônicas (muito incidentes na CESGRANRIO). Exigem que se enxergue por trás do espelho argumentativo da alternativa de modo que o aluno repare que a adjetivação em "gestor sublime que comanda estragos assombrosos" embute a verdadeira face sarcástica que o autor utilizou sem fazer advertências antecipadas óbvias do tipo 'atenção, reparem nesta crítica ácida'.
          </p>
          <p>
            É imperioso apartar <strong>Pressupostos</strong> de <strong>Subentendidos</strong>. Um pressuposto é algo matematicamente inegável gerado por um vocábulo (ex: "Pedro deixou de fumar" inegavelmente pressupõe que ele fumava. Inegociável!). Um subentendido é apenas inferência provável dependente da flexibilidade de uma conversa (Alguém diz "Faz frio aqui" =&gt; pode ser ordem para fechar janela, e apenas pode). Provas balizam a certeza usando sempre focos de pressupostos.
          </p>
          <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 dark:from-cyan-950/30 dark:to-emerald-950/30 rounded-lg border border-cyan-200 dark:border-cyan-800 p-6 space-y-4">
            <h4 className="font-bold text-foreground">Teste do Advogado: Negativa Perfeita</h4>
            <p>
              Para conferir se a informação em sua tela na prova é "Apenas um achismo seu" ou um verdadeiro Pressuposto Irrefutável, <em>Negue vigorosamente o trecho escrito</em>. "O vazamento NÃO tornou a acontecer." O que perdura magicamente? O fato original inegociável de que ele já havia ocorrido previamente resiste em sua mente, provando tratar-se de pressuposto textualmente ancorado.
            </p>
          </div>
        </div>
      </section>""",
    "7": """
      {/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="Engenharia do Erro: Os Fantasmas CESGRANRIO" description="As três artimanhas unânimes criadas por todas as bancas em erratas interpretativas." variant={mv[7]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            Alcançamos o ponto onde mera desenvoltura interpretativa em concursos públicos cede lugar a blindagem puramente tática defensiva. É mandatório agir contra modelos pré-fabricados de falsidades e equívocos nas respostas da CESGRANRIO. Três estratégias obscuras são responsáveis pela ruína generalizada da pontuação do candidato na linguagem: a Extrapolação, a Contradição Absoluta e a Redução (ou Restrição/Omissão Injustificada).
          </p>
          <p>
            Começamos com o perigo mais sub-reptício ao aluno das áreas tecnológicas avançadas: <strong>Extrapolação</strong>. O gabarito adentra as esferas profundas da experiência de campo industrial aplicável, usando "o mundo real" contra você (Ex: citando protocolos modernos amplamente reais nas sondas, mas omissos totalmente no corpo do papel base que baseou aquela questão estrita). Se as provas não atestam via texto tal conduta, o item constitui extrapolação, sem remorso e choro!
          </p>
          <p>
            A ameaça sequente repousa sobre a descarada <strong>Contradição</strong>. Essa armadilha reveste blocos quase inteiriços copiados com perfeição e "Ctrl+C" do primeiro parágrafo, todavia encerra sua tese subalternando o advérbio que existia ou invertendo em essência seu caráter final (O elogio virou censura, ou a desregulamentação exposta migrou à hiper-regulamentação falsa). Ler aceleradamente e superficialmente as duas tramas finais consagra este ardil da banca sobre sua nota final.
          </p>
          <p>
            Por fim e como vilã camuflada constante: a tática de <strong>Redução</strong>. Um artigo científico robusto debruçávase profundamente sobre políticas renováveis. E o erro aponta que a reflexão "centrou-se incansavelmente e focou num nicho reduzido específico das pálices propulsoras laterais". Destaca um tema subsidiário ou lateral ocorrido acidentalmente tornando-o tese absolutista sem a abrangência matricial requerida para validá-lo como Resumo Certo.
          </p>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 rounded-lg border border-red-200 dark:border-red-800 p-6 space-y-4">
            <h4 className="font-bold text-foreground">Como Varrer as Armadilhas na Prova (Regra Crítica)</h4>
            <p>
              Ao julgar e filtrar opções em questões CESGRANRIO (Nível Médio e Técnico) preste absoluta e minuciosa atenção na escalada e severidade de palavras absolutistas utilizadas pelo examinador irredutíveis ("Sempre", "Sem chance e jamais", "Somente por" e "Invariavelmente"). Vocabulário imperativo-extremista engatilha enorme presunção e tendência altíssima à Redução/Extrapolação e merecerão sua máxima eliminação analítica frente a escolhas resguardadas por ponderações sensatas.
            </p>
          </div>
        </div>
      </section>""",
    "8": """
      {/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="Dissecando a Psicologia do Examinador CESGRANRIO" description="Construa familiaridade avançada identificando a sintaxe mecânica e estética preferida nas provas." variant={mv[8]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            Uma preparação e intervenção analítica da prova da língua portuguesa para seleções logísticas da Transpetro e da Petrobras via CESGRANRIO providenciam vantagens imensuráveis. Antes de esmiuçar o núcleo de semântica linguística restrita, dominar a mentalidade do examinador revela atalhos. A Fundação exibe devoção à reescritura, priorizando a coesão de vocábulos sintéticos de cunho conectivo para medir quem alcança a essência fluida perante discursos de cronistas complexos e não a decoragem isolada de tabulações irreais.
          </p>
          <p>
            Como textos bases predominantes, espere abordagens de fragmentos e enquadramentos socioculturais do Modernismo brando. Contos e opiniões metafóricas crônicas de Lya Luft e cronistas focando as ansiedades modernas, consumismo vazio urbano e impessoalidades digitais. Eles tentarão obscurecer seu pragmatismo frio sob narrativas de camadas melancólicas carregadas ou provocativas para despistar o caçador das armações analíticas nas perguntas subsequentes.
          </p>
          <p>
            O perigo supremo e absoluto repousa no "Comando Limitador de Campo" nos enunciados: as opções exalam coerências válidas para porções difusas e dispersas e factuais espalhadas em folhas 2 ou 3 da crônica. A Banca, porém, havia especificado inflexivelmente: "Seguindo aos preceitos rigorosos restritos contidos tão somente nas linhas do SEGUNDO PARÁGRAFO..." As vítimas engolem iscas que confirmam impressões corretas da íntegra em esferas ilegais proibidas do parágrafo 2 cobradas na demanda da cabeça e comando das respostas. Cuidado máximo aos comandos geográficos.
          </p>
          <p>
            Igualmente valiosa é a técnica clássica examinadora de exigir a <em>"Mecânica Equivalente Alternativa"</em>. Exige-se escolher de qual alternativa reescreve a sentença preservando ileso a integridade nuclear (a coerência e intenção discursiva da matriz), onde "devido aos apontamentos listados" mudará sutil e livremente para "visto que ocorrera", assegurando que haja uma permutação e substituição matemática livre da perda e isenta de fissuras coesivas da matriz causal.
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
            <h4 className="font-bold text-foreground">Modus Operandi Tático da Seleção de Campo</h4>
            <p>
              Ao enfrentar o caderno final em minutos de prova: ative de forma inexorável o recurso do 'Reconhecimento Cego Antecipado'. Mergulhe imediatamente sobre os enunciados nus de todas as questões antes de encostar visualmente no parágrafo temático literário das páginas. Essa estratégia instaura um escudo de proteção para seu viés de leitura global já procurando e processando se "X" e o conector "Y", previamente sondados nos enunciados, surgirão ao longo de cada parágrafo ou se deveremos priorizar o referencial anafórico do último quadrante do texto.
            </p>
          </div>
        </div>
      </section>""",
    "9": """
      {/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="Algoritmo da Aprovação: Checklist Operacional" description="Passe do olhar selvagem para uma arquitetura robótica inabalável de validação analítica." variant={mv[9]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            O segredo das performances extremas na leitura da CESGRANRIO se deve à automação de metodologias procedimentais, descartando fluxos de genialidade natural, adotando engrenagens matemáticas rígidas para lidar com "achismos". É fundamental possuir o próprio Framework/Protocolo validatório da alternativa correta para evitar perdas cognitivas e hesitações durante provas imersas em grandes perdas de carga de bateria metabólica de exauridos examinandos.
          </p>
          <p>
            O Procedimento se instaura logo na Leitura Diagnóstica. Não leia como ler um romance (passivo interativo agradável); realize escaneamento agressivo e utilitário, com lápis grafite a punho atacando conjunções vitais e Tópicos Frasais, traçando boxes marcadores naqueles núcleos duros que revelam, sem ressalvas, se o Autor inclina sua defesa à pauta X ou apoia a refutação por argumentação baseada em Y. O resumo parágrafo a parágrafo de três vocábulos sela tudo isso metodologicamente!
          </p>
          <p>
            Avance posteriormente na dissecação modular do Problema de Prova. Quando questionado sobre interpretações inferidoras, evite reprocessar fragmentos amplos em tela cheia na sua mente. Delimite as demarcações exatas de escopo! Refutem premissas isoladamente em cada "letra": verifique a baliza e o eixo ("Se citou evento A do texto sendo justificado pelo viés de C da Letra K" - a menção central ocorreu? Sim. O referencial temporal se confirma? Sim. A motivação declarada é espelho do texto originário? Não). Conclusão: "X" nessa assertiva sem sofrimento!
          </p>
          <p>
            Pela mecânica das grandes estatais como Petrobras e Transpetro, a disciplina técnica rege a perfeição. Ao duvidar furiosamente entre duas alternativas paradoxais, execute sempre à Lei do Tribunal Textual Evidenciatório (O lastro). O examinador o ataca com interpretações dúbias altamente possíveis... não discuta; apenas demande imediatamente a palavra "escrita" textualmente (Pista Material Base) capaz de abalizar perante um júri racional qual opção reside verdadeiramente sob um ancoradouro dissecável.
          </p>
          <div className="bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-800/80 dark:to-gray-900/80 rounded-lg border border-slate-300 dark:border-slate-700 p-6 space-y-4">
            <h4 className="font-bold text-foreground">Checklist das Boas Práticas Absolutas de Concurso</h4>
            <ul className="list-disc list-inside space-y-2 mt-2 font-medium">
              <li>Inspecione enunciados identificando a demanda restritiva geográfica ou tipológica ANTES.</li>
              <li>A detecção das sinalizações coesivas (conectivos causais e de transição e oposição).</li>
              <li>Vigilância máxima e total às ameaças universalistas do léxico e alternativas reducionistas.</li>
              <li>Sustentação na matriz explícita de "Tribunal Textual Base" diante do perigo inferidor difuso.</li>
            </ul>
          </div>
        </div>
      </section>""",
    "10": """
      {/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="A Glória da Avaliação Máxima Integral e Integrada" description="Laboratórios Simuladores de altíssimo estresse CESGRANRIO demandam sua excelência unificada imediata." variant={mv[10]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            As engrenagens montadas durantes sucessivos degraus da pirâmide intelectiva analítica não perdoam hiatos no topo da preparação: eis a consolidação tática na Arena. Mapeamento, contenções, filtrações rigorosas entre Anáforas retroativas longínquas ou saltos vertiginosos semânticos nos pressupostos subjacentes não constituem apenas esferas estanques nos processos mentais, devendo agir orquestradamente a cada leitura imposta nos desafios finais propostos e formatados pelos cadernos de seleção avançados operacionais e operatórios da Instituição da Petrobras.
          </p>
          <p>
            Em contextos de alta demanda onde falhas ou dispersões semânticas ocasionam prejuízos matemáticos generalizados de frações ínfimas percentuais do placar geral de aprovados no radar do edital, o profissional técnico que avança na liderança se desvencilha dessas amarrações puristas emocionais em crônicas com maestria pragmática matemática interpretativa irrefutável de blocos lógicos rígidos sob a batuta precisa dos tópicos restritivos e não flexíveis das sentenças conjunturais complexas impostas pelas teses e paradoxos mistos literários das avaliações longas!
          </p>
          <p>
            Não negligencie que simulações plenas carregam viés induzidor híbrido proposital. A Banca elaboradora o atacará exigindo a habilitação em identificar o Tópico e o Reducionismo no mesmo gabarito! Alternativas misturam verdades coesas a anacronismos cronológicos letais imperceptíveis de pronto, encobrindo e dissimulando ambiguidades na subalternidade oracional com exatidão predatória perante candidatos fragilizados por sobrecargas analíticas do decorrer prolongado da grande tarde competitiva técnica global imposta à sua especialidade de engenharia.
          </p>
          <p>
            Ao executar a bateria resolutiva que este módulo de encerramento se compromete, acolha as frustrações heurísticas de acertos flutuantes como bússolas indicadoras do aperfeiçoamento minucioso do que restou do "check-up orgânico interpretativo": identifique imediatamente o ponto basal gramatical onde a engrenagem inferidora rompeu e desregulou! Avance perfeitamente aos próximos patamares e gabaritos de combate. Apenas mentes em calibragem continuada asseguram sua hegemonia inabalável inata diante do rigoroso tribunal das letrinhas lógicas discursivas de exata ciência concurseira!
          </p>
        </div>
      </section>"""
}

# Now for each module, substitute what's between <ModuleBanner and the first <ContentAccordion / <FlipCard / <TextAnalysisLab
new_content = content
for mock in range(1, 11):
    mod = str(mock)
    pattern = r"(<ModuleBanner[\s\S]*?numero=\{" + mod + r"\}.*?/>)[\s\S]*?(?=<ContentAccordion|<TextAnalysisLab|<div className=\"grid grid-cols-1 md:grid-cols-2|<div className=\"grid grid-cols-1 md:grid-cols-3)"
    
    # We will replace the middle matching string entirely.
    new_intro = r"\1\n" + rich_intros[mod].replace("\\", "\\\\") + "\n\n"
    new_content = re.sub(pattern, new_intro, new_content, count=1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Insertion Done")
