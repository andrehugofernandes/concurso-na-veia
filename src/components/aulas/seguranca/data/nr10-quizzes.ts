import { QuizQuestion } from "../../shared";

export const QUIZ_M1_NR10_INTRO: QuizQuestion[] = [
  {
    id: "q_nr10_m1_01",
    pergunta: "A qual das seguintes situações a NR-10 NÃO se aplica de forma obrigatória?",
    opcoes: [
        { label: "A", valor: "Apenas em etapas de construção e montagem de uma planta industrial." },
        { label: "B", valor: "Nas frotas de veículos terrestres de uso geral não interligados no Sistema Elétrico de Potência (SEP)." },
        { label: "C", valor: "Em redes elétricas de baixa tensão em ambiente administrativo." },
        { label: "D", valor: "Durante a elaboração de projetos de uma subestação de alta tensão." },
        { label: "E", valor: "Qualquer instalação elétrica que requeira intervenção humana direta." }
    ],
    correta: "Nas frotas de veículos terrestres de uso geral não interligados no Sistema Elétrico de Potência (SEP).",
    explicacao: "Segundo os conceitos basilares e as exclusões tácitas da NR-10, as instalações de uso unicamente em veículos (como bateria e alternador de um carro normal de frota administrativa) não inseridas num sistema elétrico de potência não são tratadas"
  },
  {
    id: "q_nr10_m1_02",
    pergunta: "A NR-10 adota um viés prevencionista amplo. Assinale a alternativa que elenca corretamente o escopo estabelecido pelo item 10.1.1 da referida norma.",
    opcoes: [
        { label: "A", valor: "Objetiva implementar medidas de controle e sistemas unicamente nas fases de manutenção e operação." },
        { label: "B", valor: "Aplica-se às fases de geração, transmissão, distribuição e consumo, incluindo as etapas de projeto, construção, montagem, operação e manutenção." },
        { label: "C", valor: "Limita-se a garantir a segurança em trabalhos em Alta Tensão (AT), eximindo a Baixa Tensão (BT) das regras preventivas mais rigorosas." },
        { label: "D", valor: "Obriga apenas empresas do setor elétrico e petroquímicas a adotá-la." },
        { label: "E", valor: "A norma aborda a proteção dos trabalhadores independentemente da implantação de medidas de proteção coletiva." }
    ],
    correta: "Aplica-se às fases de geração, transmissão, distribuição e consumo, incluindo as etapas de projeto, construção, montagem, operação e manutenção.",
    explicacao: "A norma é taxativa no seu item de campo de aplicação (10.1.2) que a aplicabilidade atinge absolutamente TODAS as fases (gera/transm/dist/cons) incluindo projeto, montagem, operação, manutenção etc. e quaisquer trabalhos realizados em suas proximidades."
  },
  {
    id: "q_nr10_m1_03",
    pergunta: "Em relação ao campo de aplicação da NR-10, o que se entende por 'trabalhos em proximidade'?",
    opcoes: [
        { label: "A", valor: "Apenas trabalhos realizados dentro da Zona de Risco." },
        { label: "B", valor: "Trabalhos realizados em qualquer lugar da empresa onde haja eletricidade." },
        { label: "C", valor: "Trabalhos durante os quais o trabalhador pode penetrar na Zona Controlada." },
        { label: "D", valor: "Trabalhos realizados exclusivamente por eletricistas formados." },
        { label: "E", valor: "Qualquer atividade administrativa realizada no mesmo prédio da subestação." }
    ],
    correta: "Trabalhos durante os quais o trabalhador pode penetrar na Zona Controlada.",
    explicacao: "Trabalho em proximidade é aquele durante o qual o trabalhador, mesmo não interagindo diretamente com a instalação elétrica, pode penetrar na Zona Controlada com qualquer parte do corpo ou com ferramentas/equipamentos manipulados."
  },
  {
    id: "q_nr10_m1_04",
    pergunta: "As medidas de segurança da NR-10 visam a proteção dos trabalhadores e:",
    opcoes: [
        { label: "A", valor: "Apenas dos equipamentos de alto valor da estatal." },
        { label: "B", valor: "De terceiros que possam ser afetados pelas atividades direta ou indiretamente." },
        { label: "C", valor: "Exclusivamente dos engenheiros responsáveis pelo projeto." },
        { label: "D", valor: "Apenas dos funcionários concursados, excluindo terceirizados." },
        { label: "E", valor: "Do patrimônio físico da união apenas em caso de incêndio." }
    ],
    correta: "De terceiros que possam ser afetados pelas atividades direta ou indiretamente.",
    explicacao: "O objetivo da norma (10.1.1) é garantir a segurança e a saúde dos trabalhadores E de terceiros que possam ser afetados pelas atividades."
  },
  {
    id: "q_nr10_m1_06",
    pergunta: "Segundo a NR-10, o que caracteriza um trabalhador 'Qualificado'?",
    opcoes: [
        { label: "A", valor: "Aquele que trabalha na área elétrica há mais de 10 anos sem acidentes." },
        { label: "B", valor: "Aquele que comprova conclusão de curso específico na área elétrica reconhecido pelo Sistema Oficial de Ensino." },
        { label: "C", valor: "Aquele que recebeu treinamento interno da empresa de 40 horas." },
        { label: "D", valor: "O profissional que possui apenas o curso de NR-10 básico." },
        { label: "E", valor: "Qualquer engenheiro, independente da sua especialidade acadêmica." }
    ],
    correta: "Aquele que comprova conclusão de curso específico na área elétrica reconhecido pelo Sistema Oficial de Ensino.",
    explicacao: "O item 10.8.1 define trabalhador qualificado como aquele que comprova conclusão de curso específico na área elétrica reconhecido pelo Sistema Oficial de Ensino (MEC/Escolas Técnicas)."
  },
  {
    id: "q_nr10_m1_07",
    pergunta: "A NR-10 estabelece responsabilidades aos trabalhadores. Qual das abaixo é uma delas?",
    opcoes: [
        { label: "A", valor: "Comprar seus próprios equipamentos de proteção se os da empresa forem desconfortáveis." },
        { label: "B", valor: "Zelar pela sua segurança e saúde e a de outras pessoas que possam ser afetadas por suas ações." },
        { label: "C", valor: "Ignorar procedimentos de segurança caso o prazo da obra esteja atrasado." },
        { label: "D", valor: "Treinar outros colegas sem autorização formal da empresa." },
        { label: "E", valor: "Alterar os dispositivos de segurança para facilitar a operação das máquinas." }
    ],
    correta: "Zelar pela sua segurança e saúde e a de outras pessoas que possam ser afetadas por suas ações.",
    explicacao: "Conforme o item 10.13.2, cabe aos trabalhadores zelar pela sua segurança e saúde e a de outras pessoas que possam ser afetadas por suas ações ou omissões no trabalho."
  },
  {
    id: "q_nr10_m1_08",
    pergunta: "O 'Prontuário de Instalações Elétricas' (PIE) deve ser organizado e mantido por:",
    opcoes: [
        { label: "A", valor: "Apenas pelo sindicato da categoria." },
        { label: "B", valor: "Pelo estabelecimento, sob responsabilidade do contratante." },
        { label: "C", valor: "Individualmente por cada eletricista em sua pasta pessoal." },
        { label: "D", valor: "Pelo corpo de bombeiros local." },
        { label: "E", valor: "Apenas em formato físico, sendo proibido o meio digital." }
    ],
    correta: "Pelo estabelecimento, sob responsabilidade do contratante.",
    explicacao: "O prontuário (PIE) deve ser organizado e mantido pelo estabelecimento, ficando à disposição dos trabalhadores e autoridades competentes."
  }
];

export const QUIZ_M2_NR10_MEDIDAS_CONTROLE: QuizQuestion[] = [
  {
    id: "q_nr10_m2_01",
    pergunta: "Segundo a NR-10, no planejamento e projeto da instalação já devem ser previstas as medidas de proteção coletiva. Qual delas é a prioritária estabelecida pela norma?",
    opcoes: [
        { label: "A", valor: "Sinalização de segurança e a adoção de vestimentas ignífugas." },
        { label: "B", valor: "A desenergização elétrica e, na sua impossibilidade, o emprego de tensão de segurança." },
        { label: "C", valor: "Isolação das partes vivas, seccionamento automático e EPIs isolantes como prioridade." },
        { label: "D", valor: "A elaboração de procedimentos de trabalho rigorosos com duplo bloqueio." },
        { label: "E", valor: "O uso de aterramento temporário antes mesmo da verificação de ausência de tensão." }
    ],
    correta: "A desenergização elétrica e, na sua impossibilidade, o emprego de tensão de segurança.",
    explicacao: "Conforme item 10.2.8.2 da NR-10, as medidas de proteção coletiva (EPCs) compreendem, prioritariamente, a desenergização elétrica conforme estabelece a Norma e, na sua impossibilidade, o emprego de tensão de segurança."
  },
  {
    id: "q_nr10_m2_02",
    pergunta: "Em todos os serviços executados em instalações elétricas devem ser previstas e adotadas as medidas de proteção...",
    opcoes: [
        { label: "A", valor: "...sendo facultativo o treinamento conforme carga horária mínima, caso o empregado comprove 5 anos de CLT." },
        { label: "B", valor: "...coletiva, sendo priorizada sempre sobre as de uso individual." },
        { label: "C", valor: "...onde o uso de EPI substitui, sem ressalvas complementares, o seccionamento adequado caso a desenergização não ocorra." },
        { label: "D", valor: "...sempre vinculadas obrigatoriamente à presença do empregador ou preposto durante o manuseio das partes energizadas." },
        { label: "E", valor: "...priorizando apenas as situações em Baixa Tensão (BT) superior a 50 volts em CA." }
    ],
    correta: "...coletiva, sendo priorizada sempre sobre as de uso individual.",
    explicacao: "A regra de ouro da NR-10, e de praticamente todas as NRs fundamentais (especialmente NR-10 e NR-35), dita que as medidas de proteção coletiva têm absoluta precedência e prioridade em relação às medidas de proteção individual (EPI)."
  },
  {
    id: "q_nr10_m2_03",
    pergunta: "Caso as medidas de proteção coletiva sejam tecnicamente inviáveis ou insuficientes, qual a próxima etapa na hierarquia da NR-10?",
    opcoes: [
        { label: "A", valor: "Cancelar o serviço permanentemente." },
        { label: "B", valor: "Contratar uma empresa terceirizada para assumir o risco." },
        { label: "C", valor: "Adotar medidas de proteção individual e administrativas." },
        { label: "D", valor: "Aumentar a distância de segurança sem usar EPI." },
        { label: "E", valor: "Realizar o trabalho apenas durante o dia com luz natural." }
    ],
    correta: "Adotar medidas de proteção individual e administrativas.",
    explicacao: "Quando as medidas de proteção coletiva não forem suficientes ou integras, devem ser adotadas medidas de proteção individual e outras medidas administrativas (procedimentos, treinamentos)."
  },
  {
    id: "q_nr10_m2_04",
    pergunta: "O 'Trabalho em Linha Viva' (energizada) exige:",
    opcoes: [
        { label: "A", valor: "Apenas que o trabalhador tenha coragem e experiência." },
        { label: "B", valor: "Procedimento específico, autorização e treinamento SEP se envolver alta tensão." },
        { label: "C", valor: "Uso de ferramentas manuais comuns sem isolamento." },
        { label: "D", valor: "Trabalho isolado (sozinho) para reduzir o número de vítimas em caso de arco." },
        { label: "E", valor: "Autorização verbal do mestre de obras apenas." }
    ],
    correta: "Procedimento específico, autorização e treinamento SEP se envolver alta tensão.",
    explicacao: "Intervir em instalações energizadas exige protocolos rigorosos, procedimentos detalhados e trabalhadores especificamente autorizados e treinados."
  },
  {
    id: "q_nr10_m2_05",
    pergunta: "Sobre as cinco etapas da desenergização (item 10.5.1), qual a ordem correta das três primeiras?",
    opcoes: [
        { label: "A", valor: "Sinalização, Aterramento, Seccionamento." },
        { label: "B", valor: "Seccionamento, Impedimento de religamento, Constatação de ausência de tensão." },
        { label: "C", valor: "Aterramento, Seccionamento, Travamento." },
        { label: "D", valor: "Constatação de ausência de tensão, Seccionamento, Aterramento." },
        { label: "E", valor: "Bloqueio, Sinalização, Verificação." }
    ],
    correta: "Seccionamento, Impedimento de religamento, Constatação de ausência de tensão.",
    explicacao: "A sequência legal é: 1. Seccionamento; 2. Impedimento de religamento; 3. Constatação de ausência de tensão; 4. Aterramento; 5. Proteção de elementos vizinhos; 6. Sinalização."
  },
  {
    id: "q_nr10_m2_06",
    pergunta: "A 'Extra-Baixa Tensão' (EBT) é definida pela NR-10 como tensão não superior a:",
    opcoes: [
        { label: "A", valor: "24 volts em CA ou 50 volts em CC." },
        { label: "B", valor: "50 volts em CA ou 120 volts em CC." },
        { label: "C", valor: "110 volts em CA ou 220 volts em CC." },
        { label: "D", valor: "1000 volts em CA ou 1500 volts em CC." },
        { label: "E", valor: "5 volts em qualquer sistema." }
    ],
    correta: "50 volts em CA ou 120 volts em CC.",
    explicacao: "Segundo o glossário da NR-10, Extra-Baixa Tensão (EBT) é a tensão não superior a 50 volts em corrente alternada ou 120 volts em corrente contínua, entre fases ou entre fase e terra."
  },
  {
    id: "q_nr10_m2_07",
    pergunta: "Todo serviço em instalação elétrica que for desativado para manutenção deve ser precedido de:",
    opcoes: [
        { label: "A", valor: "Apenas um aviso verbal ao porteiro." },
        { label: "B", valor: "Análise de Risco (AR) e emissão de Permissão de Trabalho (PT)." },
        { label: "C", valor: "Oração ou pensamento positivo apenas." },
        { label: "D", valor: "Troca compulsória de todos os disjuntores." },
        { label: "E", valor: "Pintura de toda a sala elétrica na cor verde." }
    ],
    correta: "Análise de Risco (AR) e emissão de Permissão de Trabalho (PT).",
    explicacao: "Trabalhos em eletricidade exigem planejamento formal através de Análise de Risco e, em muitos casos, a formalização via Permissão de Trabalho (Checklist/Liberação)."
  },
  {
    id: "q_nr10_m2_08",
    pergunta: "Em relação ao aterramento temporário, o que a norma determina ao finalizar o trabalho?",
    opcoes: [
        { label: "A", valor: "Deve ser deixado no local para proteger o próximo eletricista." },
        { label: "B", valor: "Deve ser retirado somente após a energização da rede." },
        { label: "C", valor: "Deve ser retirado e os dispositivos de impedimento de religamento removidos antes de sinalizar a liberação." },
        { label: "D", valor: "Pode ser cortado e descartado se estiver muito sujo." },
        { label: "E", valor: "Deve ser enterrado permanentemente no pátio da subestação." }
    ],
    correta: "Deve ser retirado e os dispositivos de impedimento de religamento removidos antes de sinalizar a liberação.",
    explicacao: "O processo de reenergização inverte os passos de segurança: retira-se o aterramento, depois o bloqueio, e por fim libera-se para energizar."
  }
];

export const QUIZ_M3_NR10_PIE: QuizQuestion[] = [
  {
    id: "q_nr10_m3_01",
    pergunta: "Sobre o Prontuário de Instalações Elétricas (PIE) previsto na NR-10, é correto afirmar que:",
    opcoes: [
        { label: "A", valor: "É exigido apenas de empresas com instalações cujo Sistema Elétrico de Potência (SEP) supere 69 kV." },
        { label: "B", valor: "A documentação do PIE fica integralmente arquivada exclusivamente na sede do Ministério do Trabalho." },
        { label: "C", valor: "O PIE é facultativo caso a equipe inteira possua certificação máxima na NR-10 e comprovação de capacitação plena." },
        { label: "D", valor: "Estabelecimentos com carga instalada superior a 75 kW devem constituir e manter o PIE atualizado." },
        { label: "E", valor: "Deve conter unicamente o memorial descritivo dos equipamentos do aterramento e laudos do SPDA." }
    ],
    correta: "Estabelecimentos com carga instalada superior a 75 kW devem constituir e manter o PIE atualizado.",
    explicacao: "Regra clássica da NR-10: Cargas com potência final (instalada) > 75 kW impõem a obrigação da manutenção do Prontuário de Instalações Elétricas contendo o conjunto de procedimentos, laudos de SPDA, descrição de EPIs e muito mais."
  },
  {
    id: "q_nr10_m3_02",
    pergunta: "Quais documentos devem obrigatoriamente integrar o PIE em empresas com carga > 75kW?",
    opcoes: [
        { label: "A", valor: "Apenas as notas fiscais de compra de lâmpadas." },
        { label: "B", valor: "Conjunto de procedimentos e instruções técnicas, laudos de inspeção do SPDA e aterramentos, e especificações de EPIs/EPCs." },
        { label: "C", valor: "Somente a lista de nomes dos funcionários autorizados." },
        { label: "D", valor: "O histórico de consumo de energia dos últimos 10 anos." },
        { label: "E", valor: "Contratos de prestação de serviço com a concessionária de energia." }
    ],
    correta: "Conjunto de procedimentos e instruções técnicas, laudos de inspeção do SPDA e aterramentos, e especificações de EPIs/EPCs.",
    explicacao: "O PIE é um repositório técnico completo que garante que a gestão da segurança elétrica é sistemática e documentada."
  },
  {
    id: "q_nr10_m3_03",
    pergunta: "O Prontuário de Instalações Elétricas (PIE) deve estar:",
    opcoes: [
        { label: "A", valor: "Sempre na casa do engenheiro responsável." },
        { label: "B", valor: "Disponível para os trabalhadores que interagem nas instalações e serviços." },
        { label: "C", valor: "Guardado em cofre fora do alcance dos funcionários para não perder os documentos." },
        { label: "D", valor: "Apenas em formato físico, sendo proibido o formato digital." },
        { label: "E", valor: "Aberto apenas em caso de fiscalização do Ministério do Trabalho." }
    ],
    correta: "Disponível para os trabalhadores que interagem nas instalações e serviços.",
    explicacao: "A transparência e o acesso à informação de segurança são garantidos pela norma; os trabalhadores devem ter acesso ao PIE."
  },
  {
    id: "q_nr10_m3_04",
    pergunta: "A revisão do PIE deve ocorrer:",
    opcoes: [
        { label: "A", valor: "Nunca, uma vez feito é eterno." },
        { label: "B", valor: "Sempre que houver modificações na instalação elétrica ou na estrutura de segurança." },
        { label: "C", valor: "Obedecendo obrigatoriamente o intervalo de 10 anos." },
        { label: "D", valor: "Apenas se o fiscal da Petrobras solicitar via e-mail." },
        { label: "E", valor: "Semestralmente, mesmo sem alterações na planta." }
    ],
    correta: "Sempre que houver modificações na instalação elétrica ou na estrutura de segurança.",
    explicacao: "O PIE deve ser um documento vivo, refletindo a realidade atual da instalação. Modificações na planta exigem atualização do prontuário."
  },
  {
    id: "q_nr10_m3_05",
    pergunta: "Em relação ao memorial descritivo do projeto, o que a NR-10 exige?",
    opcoes: [
        { label: "A", valor: "Apenas o nome do autor do projeto." },
        { label: "B", valor: "Especificação das características de proteção contra choques e arcos elétricos." },
        { label: "C", valor: "Preço estimado da obra e custo dos materiais." },
        { label: "D", valor: "Apenas a cor das fiações segundo o padrão NBR." },
        { label: "E", valor: "Lista de fornecedores de luminárias." }
    ],
    correta: "Especificação das características de proteção contra choques e arcos elétricos.",
    explicacao: "O memorial descritivo do projeto (item 10.3.9) deve contemplar os itens de segurança previstos na instalação."
  },
  {
    id: "q_nr10_m3_06",
    pergunta: "As empresas que operam em Proximidade do SEP (Sistema Elétrico de Potência) devem conter no PIE:",
    opcoes: [
        { label: "A", valor: "Apenas fotos dos geradores." },
        { label: "B", valor: "Descrição dos procedimentos para emergências e resgate de vítimas." },
        { label: "C", valor: "A lista de presença do café da manhã da equipe." },
        { label: "D", valor: "O comprovante de pagamento do IPTU da usina." },
        { label: "E", valor: "Cópia dos manuais de instrução de furadeiras comuns." }
    ],
    correta: "Descrição dos procedimentos para emergências e resgate de vítimas.",
    explicacao: "No PIE de empresas que interagem com o SEP, é obrigatório haver o plano de emergência e instruções de resgate (item 10.2.4 alínea 'e')."
  },
  {
    id: "q_nr10_m3_07",
    pergunta: "Os diagramas unifilares das instalações elétricas dos estabelecimentos devem ser:",
    opcoes: [
        { label: "A", valor: "Feitos à mão livre em papel jornal." },
        { label: "B", valor: "Mantidos atualizados com a especificação do sistema de aterramento." },
        { label: "C", valor: "Pintados nas paredes da entrada da empresa." },
        { label: "D", valor: "Apenas guardados no computador do estagiário de TI." },
        { label: "E", valor: "Destruídos após 1 ano de uso para evitar espionagem." }
    ],
    correta: "Mantidos atualizados com a especificação do sistema de aterramento.",
    explicacao: "O item 10.2.3 exige diagramas atualizados com detalhes do aterramento e demais equipamentos de proteção."
  },
  {
    id: "q_nr10_m3_08",
    pergunta: "Qual o objetivo de manter o histórico de inspeções no PIE?",
    opcoes: [
        { label: "A", valor: "Para preencher espaço nos arquivos mortos." },
        { label: "B", valor: "Permitir a rastreabilidade da segurança e garantir a manutenção da integridade das proteções." },
        { label: "C", valor: "Monitorar a produtividade dos eletricistas apenas." },
        { label: "D", valor: "Guardar provas contra os ex-funcionários em caso de processo." },
        { label: "E", valor: "Economizar papel ao não imprimir novos relatórios." }
    ],
    correta: "Permitir a rastreabilidade da segurança e garantir a manutenção da integridade das proteções.",
    explicacao: "A documentação técnica permite a continuidade da gestão de segurança ao longo do tempo, independentemente de trocas de equipe."
  }
];

export const QUIZ_M4_NR10_VESTIMENTAS: QuizQuestion[] = [
  {
    id: "q_nr10_m4_01",
    pergunta: "No que se refere aos EPIs e vestimentas de trabalho (item 10.2.9 da NR-10), a principal característica obrigatória exigida...",
    opcoes: [
        { label: "A", valor: "É que as vestimentas devem contemplar as características da instalação no tocante à inflamabilidade, sendo proibido o uso de adereços pessoais nas atividades." },
        { label: "B", valor: "Reside no fato de que o empregado pode optar pelo uso de relógios de ouro se cobertos por luva isolante ATPV." },
        { label: "C", valor: "Exige material cem por cento em lã fina no setor de transmissão devido a arco elétrico." },
        { label: "D", valor: "Determina unicamente que sejam do tamanho exato da fita métrica do trabalhador sem requerer laudos antichama (RF) se os painéis tiverem barreira física." },
        { label: "E", valor: "Nenhuma das alternativas." }
    ],
    correta: "É que as vestimentas devem contemplar as características da instalação no tocante à inflamabilidade, sendo proibido o uso de adereços pessoais nas atividades.",
    explicacao: "A inflamabilidade e condutibilidade de partes são fatores cruciais. Além disso, a NR-10 traz a proibição taxativa de uso de adornos e adereços pessoais (como anéis, alianças, colares) durante os trabalhos com instalações elétricas ou suas proximidades."
  },
  {
    id: "q_nr10_m4_02",
    pergunta: "O uso de adornos pessoais (anéis, relógios, etc) é proibido porque:",
    opcoes: [
        { label: "A", valor: "Eles podem ser roubados durante o trabalho." },
        { label: "B", valor: "Podem se tornar pontos de arco elétrico ou condução acidental de corrente pelo corpo." },
        { label: "C", valor: "O patrão não quer ostentação na fábrica." },
        { label: "D", valor: "A norma quer padronizar o visual dos eletricistas." },
        { label: "E", valor: "Eles estragam as luvas de borracha rapidamente." }
    ],
    correta: "Podem se tornar pontos de arco elétrico ou condução acidental de corrente pelo corpo.",
    explicacao: "Metais próximos ao corpo aumentam drasticamente o risco de queimaduras graves e caminhos indesejados para a eletricidade."
  },
  {
    id: "q_nr10_m4_03",
    pergunta: "As vestimentas de trabalho (uniformes) para eletricitários devem ter qual nível de proteção térmica?",
    opcoes: [
        { label: "A", valor: "Nível zero, pois farda não protege contra choque." },
        { label: "B", valor: "Adequado ao estudo de energia incidente de arco elétrico da instalação." },
        { label: "C", valor: "Sendo de algodão 100%, qualquer uma serve." },
        { label: "D", valor: "Deve ser impermeável para evitar suor." },
        { label: "E", valor: "Apenas cor clara para refletir o arco." }
    ],
    correta: "Adequado ao estudo de energia incidente de arco elétrico da instalação.",
    explicacao: "A proteção (ATPV) deve ser calculada com base no risco real daquela barra ou painel específico."
  },
  {
    id: "q_nr10_m4_04",
    pergunta: "Em relação aos EPIs elétricos, qual a validade que deve ser observada rigorosamente?",
    opcoes: [
        { label: "A", valor: "Apenas a validade de fabricação." },
        { label: "B", valor: "O CA (Certificado de Aprovação) e os testes periódicos de isolação (ensaios dielétricos)." },
        { label: "C", valor: "A validade do contrato do funcionário." },
        { label: "D", valor: "Não há validade se o equipamento for bem guardado." },
        { label: "E", valor: "A validade definida pelo sindicato local." }
    ],
    correta: "O CA (Certificado de Aprovação) e os testes periódicos de isolação (ensaios dielétricos).",
    explicacao: "Luvas isolantes, por exemplo, exigem testes periódicos para garantir que a borracha não perdeu propriedades protetoras."
  },
  {
    id: "q_nr10_m4_05",
    pergunta: "Quem deve fornecer os EPIs e garantir que os trabalhadores os utilizem?",
    opcoes: [
        { label: "A", valor: "O próprio trabalhador deve comprar com seu salário." },
        { label: "B", valor: "A empresa (empregador), de forma gratuita e adequada ao risco." },
        { label: "C", valor: "O governo federal através de subsídios." },
        { label: "D", valor: "A CIPA através de vaquinha interna." },
        { label: "E", valor: "O fabricante do equipamento, como brinde de venda." }
    ],
    correta: "A empresa (empregador), de forma gratuita e adequada ao risco.",
    explicacao: "Responsabilidade clássica do empregador (NR-1 e NR-6): fornecer EPI gratuito, treinar o uso e fiscalizar a utilização."
  },
  {
    id: "q_nr10_m4_06",
    pergunta: "As ferramentas manuais utilizadas em trabalhos em instalações elétricas devem ser:",
    opcoes: [
        { label: "A", valor: "As mais baratas do mercado para reduzir custos." },
        { label: "B", valor: "Isoladas de acordo com a tensão de trabalho e submetidas a inspeções." },
        { label: "C", valor: "Apenas pintadas com tinta vermelha para indicar perigo." },
        { label: "D", valor: "Usadas sem cabos plásticos para não acumular sujeira." },
        { label: "E", valor: "Lixadas regularmente para manter o brilho metálico." }
    ],
    correta: "Isoladas de acordo com a tensão de trabalho e submetidas a inspeções.",
    explicacao: "O item 10.4.3 exige que ferramentas sejam isoladas conforme a tensão e compatíveis com a atividade."
  },
  {
    id: "q_nr10_m4_07",
    pergunta: "Em relação ao uso de luvas isolantes de borracha, o que deve ser feito antes do uso?",
    opcoes: [
        { label: "A", valor: "Nada, apenas colocá-las nas mãos." },
        { label: "B", valor: "Teste de inflação manual para detectar furos ou rasgos." },
        { label: "C", valor: "Lavar com água e sabão em pó." },
        { label: "D", valor: "Passar perfume para evitar cheiro de borracha." },
        { label: "E", valor: "Cortar as pontas dos dedos para melhorar o tato." }
    ],
    correta: "Teste de inflação manual para detectar furos ou rasgos.",
    explicacao: "A verificação visual e o teste de ar são essenciais para garantir que a barreira dielétrica não está rompida."
  },
  {
    id: "q_nr10_m4_08",
    pergunta: "As vestimentas de proteção contra arco elétrico devem ser higienizadas:",
    opcoes: [
        { label: "A", valor: "Apenas uma vez por ano." },
        { label: "B", valor: "Seguindo rigorosamente as instruções do fabricante para não perder as propriedades de resistência ao fogo (RF)." },
        { label: "C", valor: "Com qualquer alvejante forte para tirar manchas de graxa." },
        { label: "D", valor: "Apenas se o trabalhador quiser." },
        { label: "E", valor: "Pelo próprio funcionário em sua casa usando sabão comum." }
    ],
    correta: "Seguindo rigorosamente as instruções do fabricante para não perder as propriedades de resistência ao fogo (RF).",
    explicacao: "O uso de produtos químicos inadequados pode remover o tratamento químico do tecido que retarda as chamas."
  }
];

export const QUIZ_M5_NR10_MESTRE: QuizQuestion[] = [
  {
    id: "q_nr10_m5_01",
    pergunta: "Em um procedimento de Manutenção em Zona Livre (ZL), a equipe da Petrobras realiza a etapa de verificação para 'Zona de Risco' e 'Zona Controlada'. Quando uma pessoa não autorizada entra numa sala elétrica, em qual zona ela, por definição NR-10, não pode penetrar sem EPI ou autorização?",
    opcoes: [
        { label: "A", valor: "Somente a Zona de Risco, podendo permanecer na Zona Controlada à vontade." },
        { label: "B", valor: "Zona Livre e Zona Controlada." },
        { label: "C", valor: "Apenas Zonas com tensão de segurança inferior a 50 Volts." },
        { label: "D", valor: "A Zona Controlada, pois o acesso a esta, assim como à Zona de Risco, é restrito aos trabalhadores autorizados (sendo a Zona de Risco mais rigorosa dependendo do EPI adequados)." },
        { label: "E", valor: "Ela pode adentrar até a barreira protetora direta, tocando os invólucros." }
    ],
    correta: "A Zona Controlada, pois o acesso a esta, assim como à Zona de Risco, é restrito aos trabalhadores autorizados (sendo a Zona de Risco mais rigorosa dependendo do EPI adequados).",
    explicacao: "Tanto a Zona Controlada (ZC) quanto a Zona de Risco (ZR) impõem restrições de acesso a pessoas não-autorizadas e inadvertidas. A zona onde o público em geral pode ficar de forma totalmente irrestrita é a Zona Livre (ZL)."
  },
  {
    id: "q_nr10_m5_02",
    pergunta: "A distância do raio da Zona de Risco (Rr) e da Zona Controlada (Rc) varia conforme:",
    opcoes: [
        { label: "A", valor: "O humor do supervisor de segurança no dia." },
        { label: "B", valor: "O nível de tensão nominal da instalação." },
        { label: "C", valor: "A cor dos fios fase e neutro." },
        { label: "D", valor: "A altitude do local da instalação." },
        { label: "E", valor: "Apenas se for corrente alternada; em contínua as zonas são fixas." }
    ],
    correta: "O nível de tensão nominal da instalação.",
    explicacao: "Quanto maior a tensão (voltagem), maiores os raios de isolamento e as zonas de perigo virtuais."
  },
  {
    id: "q_nr10_m5_03",
    pergunta: "Entende-se por Zona de Risco o entorno de parte condutora energizada, não segregada, acessível inclusivamente por:",
    opcoes: [
        { label: "A", valor: "Somente contato direto físico." },
        { label: "B", valor: "Aproximação, dependendo da tensão." },
        { label: "C", valor: "Pessoas com óculos de grau." },
        { label: "D", valor: "Apenas se houver umidade no ar elevada." },
        { label: "E", valor: "Vácuo total." }
    ],
    correta: "Aproximação, dependendo da tensão.",
    explicacao: "Não precisa tocar para morrer; entrar na zona de risco já estabelece o potencial de arco elétrico letal por aproximação."
  },
  {
    id: "q_nr10_m5_04",
    pergunta: "O que caracteriza uma pessoa 'Inadvertida' segundo a NR-10?",
    opcoes: [
        { label: "A", valor: "Alguém que esqueceu a chave da sala elétrica." },
        { label: "B", valor: "Pessoa que não possui conhecimento ou não foi informada sobre os riscos elétricos do local." },
        { label: "C", valor: "Funcionista que está de férias." },
        { label: "D", valor: "O eletricista que dormiu durante o treinamento." },
        { label: "E", valor: "Pessoa que trabalha apenas em áreas administrativas externas." }
    ],
    correta: "Pessoa que não possui conhecimento ou não foi informada sobre os riscos elétricos do local.",
    explicacao: "Pessoas inadvertidas são o público leigo em relação ao risco específico daquele recinto elétrico; devem ser mantidas na Zona Livre."
  },
  {
    id: "q_nr10_m5_05",
    pergunta: "A Zona Controlada é uma zona:",
    opcoes: [
        { label: "A", valor: "Totalmente segura para qualquer pessoa sem camisa." },
        { label: "B", valor: "Intermediária entre a Zona de Risco e a Zona Livre, acessível apenas por trabalhadores autorizados." },
        { label: "C", valor: "Onde ficam guardados os EPIs no almoxarifado." },
        { label: "D", valor: "Destinada apenas a equipamentos de iluminação de emergência." },
        { label: "E", valor: "Onde o risco elétrico é nulo por definição." }
    ],
    correta: "Intermediária entre a Zona de Risco e a Zona Livre, acessível apenas por trabalhadores autorizados.",
    explicacao: "A ZC serve como barreira de segurança para impedir que leigos (inadvertidos) se aproximem demais da ZR."
  },
  {
    id: "q_nr10_m5_06",
    pergunta: "Qual a principal diferença entre os procedimentos para Zona de Risco (ZR) e Zona Controlada (ZC)?",
    opcoes: [
        { label: "A", valor: "Na ZC não precisa de autorização." },
        { label: "B", valor: "Na ZR os trabalhos só podem ser realizados sob condições muito específicas e por trabalhadores altamente qualificados (Linha Viva ou Desenergizado)." },
        { label: "C", valor: "A ZC é apenas para engenheiros e a ZR para técnicos." },
        { label: "D", valor: "Não há diferença legal, são apenas nomes diferentes." },
        { label: "E", valor: "A ZC é medida em metros e a ZR em centímetros sempre." }
    ],
    correta: "Na ZR os trabalhos só podem ser realizados sob condições muito específicas e por trabalhadores altamente qualificados (Linha Viva ou Desenergizado).",
    explicacao: "A ZR representa o risco direto de arco elétrico, exigindo o mais alto nível de controle e proteção individual/coletiva."
  },
  {
    id: "q_nr10_m5_07",
    pergunta: "Sobre a sinalização de segurança, a NR-10 determina que:",
    opcoes: [
        { label: "A", valor: "Deve ser feita apenas se sobrar verba no orçamento." },
        { label: "B", valor: "Destina-se à advertência e identificação de dispositivos e áreas elétricas." },
        { label: "C", valor: "Basta pintar o chão de qualquer cor." },
        { label: "D", valor: "As placas devem ser escritas apenas em inglês para padrão internacional." },
        { label: "E", valor: "A sinalização é opcional em ambientes fechados." }
    ],
    correta: "Destina-se à advertência e identificação de dispositivos e áreas elétricas.",
    explicacao: "A sinalização (item 10.10) é um EPC vital para informar trabalhadores sobre impedimentos, riscos e identificação de circuitos."
  },
  {
    id: "q_nr10_m5_08",
    pergunta: "O que deve ocorrer com o trabalhador que se sente em 'Risco Grave e Iminente' de acidente elétrico?",
    opcoes: [
        { label: "A", valor: "Deve ser demitido por ser medroso." },
        { label: "B", valor: "Tem o direito de recusa, interrompendo as atividades e comunicando imediatamente o fato." },
        { label: "C", valor: "Deve continuar o serviço guardando silêncio." },
        { label: "D", valor: "Pode ir para casa mas sem receber o dia." },
        { label: "E", valor: "Deve pedir permissão ao sindicato antes de parar." }
    ],
    correta: "Tem o direito de recusa, interrompendo as atividades e comunicando imediatamente o fato.",
    explicacao: "O Direito de Recusa (item 10.14.1) garante que o trabalhador interrompa a atividade se constatar evidências de riscos graves que não podem ser controlados naquele momento."
  }
];
