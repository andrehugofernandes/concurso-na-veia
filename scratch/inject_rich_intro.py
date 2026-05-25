import re

filepath = r"c:\Workspace\petrobras-quest\src\components\aulas\administracao\AulaAdministracaoGeralSuprimento.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add FlipCard to import
if "FlipCard" not in content:
    content = content.replace("ModuleBanner,", "ModuleBanner,\n  FlipCard,")

mod_content = {
    1: {
        "title": "Fundamentos de AdministraÃ§Ã£o",
        "intro": [
            "A **AdministraÃ§Ã£o** Ã© a ciÃªncia e a arte de gerir recursos (humanos, financeiros, materiais e informacionais) para atingir os objetivos organizacionais com **eficiÃªncia** (fazer certo) e **eficÃ¡cia** (fazer o certo). Ã‰ o motor que transforma insumos em resultados valiosos para a sociedade e para os acionistas.",
            "Imagine a administraÃ§Ã£o como o maestro de uma grande orquestra. Os mÃºsicos (recursos humanos) e seus instrumentos (recursos materiais) podem ser excelentes isoladamente, mas sem a coordenaÃ§Ã£o do maestro (administraÃ§Ã£o), o resultado seria ruÃ­do, nÃ£o mÃºsica. A administraÃ§Ã£o sincroniza esforÃ§os rumo a um propÃ³sito comum.",
            "As abordagens administrativas evoluÃ­ram desde a Ãªnfase nas tarefas (Taylor) atÃ© a visÃ£o sistÃªmica e contingencial moderna. Hoje, a administraÃ§Ã£o nÃ£o busca uma \"Ãºnica melhor maneira\" universal, mas sim a adaptaÃ§Ã£o contÃ­nua Ã s variÃ¡veis do ambiente externo e interno, equilibrando inovaÃ§Ã£o e controle.",
            "Na **Petrobras**, a administraÃ§Ã£o ganha uma dimensÃ£o continental. Gerir a exploraÃ§Ã£o no prÃ©-sal, o refino e a logÃ­stica requer uma coordenaÃ§Ã£o impecÃ¡vel. A eficiÃªncia administrativa direta reflete no custo de extraÃ§Ã£o e na capacidade da companhia de manter-se competitiva no cenÃ¡rio global de energia, enfrentando volatilidades geopolÃ­ticas e transiÃ§Ã£o energÃ©tica.",
            "**Dica CESGRANRIO:** A banca adora cobrar a diferenÃ§a clÃ¡ssica entre **eficiÃªncia** (meios, processos, custos) e **eficÃ¡cia** (fins, resultados, metas). Sempre que a questÃ£o falar em \"reduzir desperdÃ­cios\", Ã© eficiÃªncia. Quando falar em \"alcanÃ§ar a meta de produÃ§Ã£o\", Ã© eficÃ¡cia. E **efetividade** Ã© o impacto social de longo prazo."
        ],
        "flips": [
            ("EficiÃªncia", "Fazer as coisas de maneira certa, focando nos meios e na reduÃ§Ã£o de custos/desperdÃ­cios."),
            ("EficÃ¡cia", "Fazer a coisa certa, focando nos fins, nos resultados e no atingimento das metas."),
            ("Efetividade", "Impacto positivo de longo prazo no ambiente ou na sociedade."),
            ("NÃ­vel EstratÃ©gico", "Alta administraÃ§Ã£o, visÃ£o de longo prazo, envolve a organizaÃ§Ã£o como um todo.")
        ]
    },
    2: {
        "title": "FunÃ§Ãµes Administrativas PODC",
        "intro": [
            "As **FunÃ§Ãµes Administrativas**, tambÃ©m conhecidas pela sigla **PODC** (Planejar, Organizar, Dirigir e Controlar), formam o ciclo vital do processo administrativo. Elas sÃ£o interdependentes e contÃ­nuas, moldando como a organizaÃ§Ã£o define seu futuro e executa seu presente.",
            "Pense no PODC como a construÃ§Ã£o e navegaÃ§Ã£o de um navio. O **Planejamento** define o destino e a rota. A **OrganizaÃ§Ã£o** distribui a tripulaÃ§Ã£o e os recursos pelo navio. A **DireÃ§Ã£o** Ã© a lideranÃ§a do capitÃ£o motivando os marinheiros, e o **Controle** Ã© a verificaÃ§Ã£o constante do radar e da bÃºssola para garantir que o navio nÃ£o saiu da rota.",
            "Cada funÃ§Ã£o atua em trÃªs nÃ­veis: estratÃ©gico, tÃ¡tico e operacional. O Planejamento EstratÃ©gico Ã© amplo e de longo prazo; o TÃ¡tico foca em departamentos; e o Operacional em tarefas. O Controle tambÃ©m segue essa lÃ³gica, indo desde o controle corporativo global atÃ© o controle de qualidade da linha de produÃ§Ã£o.",
            "No contexto da **Petrobras**, o Planejamento (P) define o Plano EstratÃ©gico quinquenal; a OrganizaÃ§Ã£o (O) estrutura as diretorias de E&P e Refino; a DireÃ§Ã£o (D) engloba a lideranÃ§a das equipes offshore; e o Controle (C) utiliza KPIs rigorosos de seguranÃ§a e produÃ§Ã£o para monitorar o desempenho global.",
            "**Dica CESGRANRIO:** Fique atento aos verbos! **Planejar** = definir, programar, antecipar. **Organizar** = alocar, estruturar, distribuir. **Dirigir** = liderar, motivar, comunicar, orientar. **Controlar** = monitorar, avaliar, corrigir, mensurar. Trocar esses verbos Ã© a pegadinha mais comum."
        ],
        "flips": [
            ("Planejamento", "Define os objetivos e os meios para alcanÃ§Ã¡-los. Voltado para o futuro."),
            ("OrganizaÃ§Ã£o", "AlocaÃ§Ã£o de recursos e estruturaÃ§Ã£o do trabalho. DivisÃ£o de tarefas."),
            ("DireÃ§Ã£o", "LideranÃ§a, motivaÃ§Ã£o e comunicaÃ§Ã£o com as pessoas para executar o planejado."),
            ("Controle", "Monitoramento, avaliaÃ§Ã£o e correÃ§Ã£o do desempenho em relaÃ§Ã£o Ã s metas.")
        ]
    },
    3: {
        "title": "Estruturas Organizacionais",
        "intro": [
            "A **Estrutura Organizacional** Ã© a forma como a empresa divide, agrupa e coordena suas atividades. Ela define a hierarquia, a amplitude de controle, a centralizaÃ§Ã£o ou descentralizaÃ§Ã£o das decisÃµes e a departamentalizaÃ§Ã£o, sendo o esqueleto que suporta a estratÃ©gia.",
            "Imagine a estrutura de um prÃ©dio: as fundaÃ§Ãµes, vigas e paredes determinam o formato e a capacidade de carga. Se o prÃ©dio precisar de flexibilidade contra terremotos (mercados dinÃ¢micos), precisarÃ¡ de uma estrutura diferente de um bunker rÃ­gido (burocracia mecanicista). A estrutura deve seguir a estratÃ©gia.",
            "Existem estruturas clÃ¡ssicas (Linear, Funcional, Linha-Staff) e modernas (Matricial, Projetos, Redes). A escolha depende do ambiente. Ambientes estÃ¡veis favorecem estruturas mecanicistas (rÃ­gidas, centralizadas). Ambientes dinÃ¢micos exigem estruturas orgÃ¢nicas (flexÃ­veis, descentralizadas, equipes multifuncionais).",
            "A **Petrobras** historicamente utiliza uma macroestrutura complexa, com forte traÃ§o **matricial**, cruzando diretorias funcionais (FinanÃ§as, RH) com diretorias de negÃ³cios (ExploraÃ§Ã£o & ProduÃ§Ã£o, Refino). Essa complexidade exige grande capacidade de coordenaÃ§Ã£o, mas permite eficiÃªncia tÃ©cnica aliada ao foco no resultado do negÃ³cio.",
            "**Dica CESGRANRIO:** A estrutura **Matricial** viola o PrincÃ­pio da Unidade de Comando ClÃ¡ssico (onde cada funcionÃ¡rio tem apenas um chefe). Na matricial, o funcionÃ¡rio responde a dois chefes (ex: gerente de projeto e gerente funcional). Isso gera conflitos de prioridade, mas melhora a integraÃ§Ã£o."
        ],
        "flips": [
            ("Linear", "Autoridade Ãºnica, formato piramidal, tÃ­pica de pequenas empresas."),
            ("Funcional", "Baseada na especializaÃ§Ã£o (RH, FinanÃ§as). Foca na eficiÃªncia tÃ©cnica."),
            ("Matricial", "HÃ­brida: cruza estrutura funcional com estrutura por projetos/produtos."),
            ("Amplitude de Controle", "NÃºmero de subordinados que um chefe consegue gerenciar com eficiÃªncia.")
        ]
    },
    4: {
        "title": "Comportamento Organizacional",
        "intro": [
            "O **Comportamento Organizacional** estuda a dinÃ¢mica entre indivÃ­duos, grupos e a estrutura da organizaÃ§Ã£o. Ele explora temas como motivaÃ§Ã£o, lideranÃ§a, cultura, clima e poder, compreendendo o lado humano (e complexo) que faz a empresa funcionar.",
            "Se a estrutura Ã© o esqueleto, o comportamento organizacional Ã© a alma e o sistema nervoso. VocÃª pode ter a melhor mÃ¡quina (processos) e o melhor projeto (planejamento), mas se as pessoas nÃ£o estiverem motivadas e bem lideradas (comportamento), a mÃ¡quina simplesmente nÃ£o vai andar na velocidade desejada.",
            "A **MotivaÃ§Ã£o** Ã© impulsionada por necessidades (Maslow, Herzberg) e processos (Expectativa de Vroom, Equidade). A **LideranÃ§a** evoluiu dos traÃ§os inatos para estilos comportamentais (AutocrÃ¡tico, DemocrÃ¡tico) e, mais recentemente, para a lideranÃ§a contingencial e transformacional, que se adapta Ã  situaÃ§Ã£o e inspira mudanÃ§as.",
            "Na **Petrobras**, liderar equipes em plataformas offshore exige um estilo situacional e forte foco em seguranÃ§a (Cultura de SeguranÃ§a SMS). A motivaÃ§Ã£o em estatais e sociedades de economia mista muitas vezes baseia-se em propÃ³sito, estabilidade e desafios tÃ©cnicos grandiosos, alÃ©m do sistema de remuneraÃ§Ã£o e benefÃ­cios.",
            "**Dica CESGRANRIO:** Na Teoria dos Dois Fatores de Herzberg, salÃ¡rio e condiÃ§Ãµes de trabalho sÃ£o fatores **higiÃªnicos** (evitam insatisfaÃ§Ã£o, mas nÃ£o geram motivaÃ§Ã£o duradoura). O que gera motivaÃ§Ã£o real sÃ£o os fatores **motivacionais**: reconhecimento, responsabilidade e o trabalho em si."
        ],
        "flips": [
            ("Fatores HigiÃªnicos", "Segundo Herzberg: SalÃ¡rio, ambiente fÃ­sico, chefia. Previnem insatisfaÃ§Ã£o."),
            ("Fatores Motivacionais", "Segundo Herzberg: Reconhecimento, crescimento, trabalho em si. Geram motivaÃ§Ã£o."),
            ("LÃ­der Transformacional", "Inspira os seguidores a transcenderem seus prÃ³prios interesses pelo bem da equipe."),
            ("Clima Organizacional", "PercepÃ§Ã£o passageira e mensurÃ¡vel que as pessoas tÃªm do ambiente de trabalho.")
        ]
    },
    5: {
        "title": "GestÃ£o por Processos",
        "intro": [
            "A **GestÃ£o por Processos** (BPM - Business Process Management) foca na cadeia de atividades que transforma insumos em resultados de valor para o cliente. Ela quebra os \"silos\" departamentais, promovendo uma visÃ£o horizontal de ponta a ponta na organizaÃ§Ã£o.",
            "Imagine um hospital: o processo de \"Cuidar do Paciente\" passa pela recepÃ§Ã£o, triagem, mÃ©dicos, exames e farmÃ¡cia. Se cada um pensar sÃ³ no seu departamento (visÃ£o funcional/silos), o paciente sofre na fila. A gestÃ£o por processos otimiza a jornada inteira, garantindo que o valor flua sem barreiras entre as Ã¡reas.",
            "Os processos sÃ£o classificados em: **PrimÃ¡rios** (Core/FinalÃ­sticos - geram valor direto ao cliente externo), **De Suporte** (Apoio - viabilizam os primÃ¡rios, como RH e TI) e **Gerenciais** (medem e controlam). O mapeamento, modelagem (ex: fluxogramas, BPMN) e a melhoria contÃ­nua sÃ£o os pilares dessa disciplina.",
            "Na **Petrobras**, a GestÃ£o por Processos Ã© crÃ­tica. O \"Processo de Suprimentos\", por exemplo, comeÃ§a na identificaÃ§Ã£o de uma necessidade de engenharia, passa por licitaÃ§Ãµes, contrataÃ§Ã£o, logÃ­stica e termina na entrega na plataforma. Falhas nas interfaces geram paradas de produÃ§Ã£o carÃ­ssimas.",
            "**Dica CESGRANRIO:** A banca costuma cobrar a diferenÃ§a entre gerenciar **OS** processos (melhoria contÃ­nua do dia a dia) e gerenciar **POR** processos (mudanÃ§a de paradigma estrutural onde a empresa se organiza horizontalmente, focada no fluxo de valor, e nÃ£o nos departamentos verticais)."
        ],
        "flips": [
            ("Processos PrimÃ¡rios", "Processos finalÃ­sticos que entregam valor diretamente ao cliente externo."),
            ("Processos de Suporte", "Apoiam os processos primÃ¡rios. Ex: GestÃ£o de RH, TI, Suprimentos."),
            ("BPMN", "NotaÃ§Ã£o padrÃ£o global usada para modelar processos de negÃ³cio de forma grÃ¡fica."),
            ("Gargalo (Bottleneck)", "Atividade com a menor capacidade no processo, que limita a velocidade do fluxo total.")
        ]
    },
    6: {
        "title": "Teoria das OrganizaÃ§Ãµes",
        "intro": [
            "A **Teoria das OrganizaÃ§Ãµes** engloba as diversas escolas do pensamento administrativo que evoluÃ­ram desde o inÃ­cio do sÃ©culo XX. Cada escola (ClÃ¡ssica, RelaÃ§Ãµes Humanas, Sistemas, ContingÃªncia) trouxe uma 'lente' diferente para resolver os problemas de sua Ã©poca.",
            "Pense nas teorias como camadas de uma cebola que foram sendo adicionadas com o tempo. Taylor focou no centro (a tarefa e o cronÃ´metro). Fayol focou na estrutura. Elton Mayo adicionou a camada das emoÃ§Ãµes humanas. E a Teoria de Sistemas/ContingÃªncia englobou tudo isso e conectou a cebola ao ambiente externo.",
            "As principais escolas sÃ£o: **AdministraÃ§Ã£o CientÃ­fica** (Taylor: tempos e movimentos, tarefa), **ClÃ¡ssica** (Fayol: estrutura, PODC), **RelaÃ§Ãµes Humanas** (Mayo: motivaÃ§Ã£o, grupos informais), **Burocracia** (Weber: regras, impessoalidade) e **ContingÃªncia** (nÃ£o hÃ¡ receita Ãºnica, depende do ambiente).",
            "A **Petrobras** Ã© um laboratÃ³rio vivo de todas essas teorias. Em refinarias, aplicam-se princÃ­pios da AdministraÃ§Ã£o CientÃ­fica para eficiÃªncia e Burocracia para seguranÃ§a. No centro de pesquisas (CENPES), prevalecem estruturas orgÃ¢nicas e Teorias Contingenciais voltadas Ã  inovaÃ§Ã£o tecnolÃ³gica.",
            "**Dica CESGRANRIO:** Memorize a \"Ãªnfase\" de cada escola. Taylor = ÃŠnfase nas **Tarefas**. Fayol = ÃŠnfase na **Estrutura**. Mayo (RelaÃ§Ãµes Humanas) = ÃŠnfase nas **Pessoas**. Teoria dos Sistemas = ÃŠnfase no **Ambiente**. Teoria da ContingÃªncia = ÃŠnfase no **Ambiente e na Tecnologia**."
        ],
        "flips": [
            ("Homo Economicus", "VisÃ£o ClÃ¡ssica/Taylorista de que o homem Ã© motivado apenas por ganhos financeiros."),
            ("Homo Social", "VisÃ£o das RelaÃ§Ãµes Humanas de que o homem Ã© motivado por interaÃ§Ãµes e grupos sociais."),
            ("DisfunÃ§Ãµes da Burocracia", "Apego exagerado a regras, excesso de formalismo, resistÃªncia a mudanÃ§as (Merton)."),
            ("Teoria da ContingÃªncia", "\"Tudo depende\". A estrutura e gestÃ£o adequadas dependem do ambiente e tecnologia.")
        ]
    },
    7: {
        "title": "ComunicaÃ§Ã£o e Conflitos",
        "intro": [
            "A **ComunicaÃ§Ã£o e a GestÃ£o de Conflitos** sÃ£o habilidades interpessoais essenciais. A comunicaÃ§Ã£o eficaz garante que a mensagem enviada seja idÃªntica Ã  compreendida, enquanto a gestÃ£o de conflitos lida com as inevitÃ¡veis divergÃªncias de ideias, interesses e recursos nas organizaÃ§Ãµes.",
            "A comunicaÃ§Ã£o Ã© como o sistema circulatÃ³rio da empresa. Se houver um coÃ¡gulo (ruÃ­do, barreira semÃ¢ntica, omissÃ£o), o \"sangue\" da informaÃ§Ã£o nÃ£o chega ao Ã³rgÃ£o correto, causando falhas graves. O conflito, por outro lado, pode ser tanto uma febre que sinaliza infecÃ§Ã£o, quanto o calor gerado pelos mÃºsculos na hora do exercÃ­cio (crescimento).",
            "Os conflitos podem ser **Funcionais** (geram inovaÃ§Ã£o e melhorias) ou **Disfuncionais** (destroem a coesÃ£o da equipe). As abordagens para resoluÃ§Ã£o incluem: CompetiÃ§Ã£o (ganha-perde), ColaboraÃ§Ã£o (ganha-ganha), EvitaÃ§Ã£o (fuga), AcomodaÃ§Ã£o (ceder) e Compromisso (meio-termo).",
            "Na **Petrobras**, a comunicaÃ§Ã£o de seguranÃ§a Ã© uma questÃ£o de vida ou morte em operaÃ§Ãµes offshore. AlÃ©m disso, gerenciar conflitos entre Ã¡reas tÃ©cnicas (engenharia que quer o melhor equipamento) e Ã¡reas de suprimento/finanÃ§as (que focam em orÃ§amento e prazos legais) requer forte negociaÃ§Ã£o integrativa.",
            "**Dica CESGRANRIO:** A banca adora a nova visÃ£o sobre conflitos. A visÃ£o clÃ¡ssica via o conflito como ruim e a ser evitado a todo custo. A visÃ£o interacionista moderna diz que um nÃ­vel moderado de conflito Ã© **necessÃ¡rio** para evitar a estagnaÃ§Ã£o e estimular a criatividade na organizaÃ§Ã£o."
        ],
        "flips": [
            ("RuÃ­do na ComunicaÃ§Ã£o", "Qualquer interferÃªncia que prejudique a compreensÃ£o da mensagem original."),
            ("NegociaÃ§Ã£o Integrativa", "Focada no \"Ganha-Ganha\". Busca expandir o bolo e satisfazer ambos os lados."),
            ("Conflito Funcional", "Conflito que apoia os objetivos do grupo e melhora seu desempenho/inovaÃ§Ã£o."),
            ("Barreira SemÃ¢ntica", "Falha de comunicaÃ§Ã£o causada por palavras que tÃªm significados diferentes para as partes.")
        ]
    },
    8: {
        "title": "DecisÃ£o e InovaÃ§Ã£o",
        "intro": [
            "O **Processo DecisÃ³rio e a InovaÃ§Ã£o** lidam com a forma como os gestores escolhem alternativas para resolver problemas ou aproveitar oportunidades, e como as organizaÃ§Ãµes criam o novo em ambientes de mudanÃ§a tecnolÃ³gica e ruptura de mercado.",
            "Decidir Ã© como jogar xadrez com um tabuleiro parcialmente invisÃ­vel. Racionalmente, gostarÃ­amos de ver todas as peÃ§as (racionalidade absoluta), mas na vida real, temos tempo limitado e informaÃ§Ãµes incompletas, operando sob **Racionalidade Limitada** (Herbert Simon), escolhendo nÃ£o o \"Ã³timo\", mas o \"satisfatÃ³rio\".",
            "As decisÃµes podem ser **Programadas** (rotineiras, com regras claras) ou **NÃ£o Programadas** (inÃ©ditas, complexas, alto risco). A inovaÃ§Ã£o pode ser **Incremental** (melhoria contÃ­nua, passo a passo) ou **Radical/Disruptiva** (mudanÃ§a de paradigma que cria novos mercados e destrÃ³i antigos).",
            "A **Petrobras** toma decisÃµes nÃ£o-programadas multibilionÃ¡rias na exploraÃ§Ã£o de novos blocos. E a inovaÃ§Ã£o Ã© seu DNA: a tecnologia de extraÃ§Ã£o em Ã¡guas ultraprofundas (PrÃ©-Sal) foi uma inovaÃ§Ã£o radical que rendeu Ã  empresa o prÃªmio mÃ¡ximo da OTC (Offshore Technology Conference).",
            "**Dica CESGRANRIO:** A banca frequentemente cobra o conceito de **HeurÃ­stica**. HeurÃ­sticas sÃ£o \"atalhos mentais\" que usamos para tomar decisÃµes rÃ¡pidas sob incerteza (ex: heurÃ­stica da disponibilidade). Elas sÃ£o Ãºteis, mas podem levar a **vieses** e erros sistemÃ¡ticos de julgamento."
        ],
        "flips": [
            ("Racionalidade Limitada", "Herbert Simon: limites cognitivos e de informaÃ§Ã£o impedem a decisÃ£o perfeitamente Ã³tima."),
            ("DecisÃ£o Programada", "Repetitiva e rotineira, conta com um procedimento padrÃ£o definido (Regras/PolÃ­ticas)."),
            ("InovaÃ§Ã£o Disruptiva", "InovaÃ§Ã£o que cria um novo mercado e desestabiliza lÃ­deres consolidados (ex: CÃ¢mera digital)."),
            ("HeurÃ­stica", "Atalhos mentais ou regras prÃ¡ticas usadas para simplificar e agilizar a tomada de decisÃ£o.")
        ]
    },
    9: {
        "title": "AdministraÃ§Ã£o na Petrobras",
        "intro": [
            "A **AdministraÃ§Ã£o na AdministraÃ§Ã£o PÃºblica e na Petrobras** envolve a aplicaÃ§Ã£o das teorias gerais sob a Ã³tica do Direito PÃºblico, do controle estatal, das licitaÃ§Ãµes e da GovernanÃ§a Corporativa exigida de uma Sociedade de Economia Mista.",
            "Administrar uma empresa privada Ã© correr em uma pista livre: tudo que nÃ£o Ã© proibido Ã© permitido. Administrar uma estatal como a Petrobras Ã© correr em uma pista com barreiras e regras rÃ­gidas (PrincÃ­pio da Legalidade): sÃ³ se pode fazer o que a lei expressamente autoriza ou determina.",
            "A Petrobras estÃ¡ sujeita a regras especÃ­ficas como a **Lei das Estatais (Lei 13.303/16)**, que trouxe maior rigor na GovernanÃ§a Corporativa, gestÃ£o de riscos, compliance, nomeaÃ§Ã£o de diretores e, crucialmente, regras prÃ³prias de licitaÃ§Ãµes e contratos, afastando a antiga Lei 8.666 em seu negÃ³cio principal.",
            "Nesse contexto, os profissionais da **Petrobras** operam sob intensa fiscalizaÃ§Ã£o do TCU, CGU e conselhos de administraÃ§Ã£o. A busca por eficiÃªncia deve andar de mÃ£os dadas com a transparÃªncia, conformidade e respeito aos rÃ­gidos cÃ³digos de Ã©tica e programas de integridade pÃ³s-Lava Jato.",
            "**Dica CESGRANRIO:** A banca adora a Lei 13.303. Saiba que a Petrobras possui um **Regulamento LicitatÃ³rio e de Contratos (RLCF)** prÃ³prio derivado desta lei. Diferente da regra geral pÃºblica, o regime de licitaÃ§Ã£o das estatais adota, como regra, a **inversÃ£o de fases** (julga-se a proposta primeiro, depois analisa-se a habilitaÃ§Ã£o de quem ganhou)."
        ],
        "flips": [
            ("Sociedade de Economia Mista", "Empresa com capital pÃºblico (maioria com direito a voto) e privado. Sujeita a regras de estatais."),
            ("Lei das Estatais (13.303)", "Regulamenta o estatuto jurÃ­dico da empresa pÃºblica e sociedade de economia mista no Brasil."),
            ("Compliance", "Estar em conformidade absoluta com as leis, normas internas, Ã©tica e regulamentos vigentes."),
            ("InversÃ£o de Fases", "Na Lei 13.303, a regra Ã© julgar a proposta ANTES da habilitaÃ§Ã£o, acelerando a licitaÃ§Ã£o.")
        ]
    },
    10: {
        "title": "Simulado Geral - AdministraÃ§Ã£o",
        "intro": [
            "Chegamos ao **MÃ³dulo de Simulado Geral**. Este Ã© o momento de testar seus conhecimentos e consolidar a vasta quantidade de conceitos de AdministraÃ§Ã£o Geral, cobrindo de PODC e Estruturas atÃ© Cultura e InovaÃ§Ã£o.",
            "O aprendizado real nÃ£o acontece apenas lendo ou assistindo vÃ­deos, mas ao forÃ§ar o cÃ©rebro a resgatar a informaÃ§Ã£o atravÃ©s da resoluÃ§Ã£o de questÃµes. O simulado simula a pressÃ£o e o formato da banca, sendo a melhor ferramenta de calibragem.",
            "A CESGRANRIO em provas da Petrobras exige nÃ£o apenas decoreba de conceitos, mas a interpretaÃ§Ã£o de situaÃ§Ãµes prÃ¡ticas. Eles descrevem um cenÃ¡rio de um gestor e perguntam qual teoria ele estÃ¡ aplicando, ou descrevem uma falha de estrutura e pedem o diagnÃ³stico.",
            "Muitas questÃµes envolvem o ambiente de **Suprimentos**, contratos, lideranÃ§a de equipes operacionais e tomada de decisÃ£o com impacto financeiro. Leia cada enunciado com a atenÃ§Ã£o que um analista teria ao aprovar um grande contrato de sondas.",
            "**Dica CESGRANRIO:** No simulado, foque em identificar o erro das alternativas incorretas. Muitas vezes a banca tenta confundir teorias vizinhas (ex: misturando elementos da burocracia de Weber com a administraÃ§Ã£o cientÃ­fica de Taylor). O domÃ­nio estÃ¡ em saber por que as outras opÃ§Ãµes estÃ£o erradas."
        ],
        "flips": [
            ("TÃ©cnica de Prova", "Leia o comando da questÃ£o antes de ler o texto gigante. Economiza tempo precioso."),
            ("RevisÃ£o Ativa", "Focar nos erros cometidos no simulado e revisar o conceito exato na teoria."),
            ("GestÃ£o de Tempo", "NÃ£o 'brigue' com questÃµes difÃ­ceis. Pule, garanta as fÃ¡ceis e volte nas complicadas depois."),
            ("CESGRANRIO", "Banca que valoriza autores clÃ¡ssicos da administraÃ§Ã£o (Chiavenato, Robbins, Maximiano).")
        ]
    }
}

for mod_num, data in mod_content.items():
    intro_paragraphs = "\n".join([f"          <p>{p}</p>" for p in data['intro']])
    
    # Create the RichIntro HTML block
    rich_intro_html = f"""
        <div className="space-y-6 text-lg leading-relaxed text-foreground">
{intro_paragraphs}
          <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-3">ðŸŽ¯ Pontos CrÃ­ticos para Prova</p>
            <p>Os conceitos acima formam a base desta Ã¡rea do conhecimento. Compreender os fundamentos, as aplicaÃ§Ãµes reais na Petrobras e o estilo de cobranÃ§a da CESGRANRIO Ã© sua vantagem competitiva.</p>
          </div>
        </div>
"""

    # Create the FlipCard HTML block
    flip_cards_html = "        <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-8\">\n"
    for frente, verso in data['flips']:
        flip_cards_html += f"          <FlipCard frente=\"{frente}\" verso=\"{verso}\" />\n"
    flip_cards_html += "        </div>\n"

    # Inject RichIntro into the function
    # The function looks like:
    # const renderModuloX = () => (
    #   <div className="space-y-12 mt-0">
    #     <ModuleBanner ... />
    #     <div className="space-y-6">
    #       <ModuleSectionHeader ... />
    
    # We want to inject `rich_intro_html` right after `ModuleSectionHeader`
    func_def = f"const renderModulo{mod_num} = () => ("
    
    # Let's find the SectionHeader in the block
    header_pattern = r'(<ModuleSectionHeader[^>]*/>)'
    
    def replace_header(match):
        return match.group(1) + "\n" + rich_intro_html
    
    # We will search within the function block
    start_idx = content.find(func_def)
    if start_idx != -1:
        end_idx = content.find("const renderModulo", start_idx + 10)
        if end_idx == -1:
            end_idx = content.find("return (", start_idx)
            
        block = content[start_idx:end_idx]
        
        # Inject RichIntro right after ModuleSectionHeader if it's not already there
        if "text-lg leading-relaxed text-foreground" not in block:
            new_block = re.sub(header_pattern, replace_header, block, count=1)
            
            # Inject FlipCards before QuizInterativo
            if "FlipCard" not in new_block:
                quiz_idx = new_block.find("<QuizInterativo")
                if quiz_idx != -1:
                    # we insert flip_cards_html before <QuizInterativo
                    
                    section_title = f"""
        <ModuleSectionHeader
          index="PRATICA"
          variant={{mv[{mod_num} if {mod_num} < 10 else 9] as any}}
          title="Flashcards de RevisÃ£o"
          description="MemorizaÃ§Ã£o ativa dos principais termos do mÃ³dulo."
        />
"""
                    new_block = new_block[:quiz_idx] + section_title + flip_cards_html + "\n" + new_block[quiz_idx:]
            
            content = content[:start_idx] + new_block + content[end_idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected RichIntro and FlipCards successfully.")
