export const MODULE_CONTENTS: Record<number, any> = {
  1: {
    title: "O Paradigma da Negociação Organizacional",
    paragraphs: [
      {
        index: "INTRO",
        text: `No complexo ambiente da Administração Pública e de empresas de capital misto como a Petrobras, a tomada de decisão raramente é um ato unilateral de força. Ela depende de um processo de comunicação bilateral profundo e constante: a **Negociação**. A negociação não é uma guerra onde um lado deve aniquilar o outro, tampouco é a submissão total onde um lado acata todas as ordens (o que seria apenas obediência hierárquica). A negociação só existe porque há um espaço de 'tensão criativa' onde duas ou mais partes possuem interesses convergentes (motivos para estarem na mesma mesa) e interesses divergentes (conflitos de preço, prazo, escopo ou método).

A evolução das teorias organizacionais nos mostra que o negociador moderno não é o "tubarão de Wall Street" das décadas passadas, que esmagava fornecedores. A banca CESGRANRIO costuma testar o candidato sobre a diferença entre o modelo *Tradicional (Posicional)* e o modelo de *Harvard*. A Negociação Posicional é o famoso "cabo de guerra": eu exijo a posição A, você defende a posição B, e ficamos cedendo frações (regateando) até fechar no meio termo ou desistir. É um jogo de atrito, que frequentemente danifica a relação de longo prazo.

Em contrapartida, as grandes corporações utilizam negociações para construir parcerias estratégicas (Supply Chain Management). A visão puramente transacional e de curto prazo deu lugar à necessidade de estabilidade contratual, mitigação de riscos e Compliance, onde o acordo final deve parecer justo, sustentável e lucrativo para ambos os lados, garantindo o suprimento no longo prazo.`
      }
    ],
    flipCards: [
      {
        id: "fc-1-1",
        front: { title: "Negociação", icon: "Handshake" },
        back: { content: "Processo de comunicação focado em alcançar um acordo viável quando existem interesses comuns e divergentes simultaneamente." }
      },
      {
        id: "fc-1-2",
        front: { title: "Barganha Posicional", icon: "Swords" },
        back: { content: "Estilo antigo e desgastante. O foco fica no ego (a posição assumida), forçando um lado a recuar milímetro a milímetro." }
      },
      {
        id: "fc-1-3",
        front: { title: "Interesses Convergentes", icon: "Link" },
        back: { content: "É o que mantém as pessoas na mesa. Exemplo: Eu quero vender, e a Petrobras precisa comprar o meu aço." }
      },
      {
        id: "fc-1-4",
        front: { title: "Interesses Divergentes", icon: "Split" },
        back: { content: "É o que gera o conflito que exige negociação. Exemplo: Eu quero vender por 100 hoje, a Petrobras quer pagar 80 daqui a 60 dias." }
      },
      {
        id: "fc-1-5",
        front: { title: "Relação de Longo Prazo", icon: "TrendingUp" },
        back: { content: "Premissa da negociação moderna (B2B): O acordo não pode sangrar o fornecedor, sob risco dele falir e o ciclo logístico quebrar amanhã." }
      },
      {
        id: "fc-1-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "A banca gosta de contrapor a rigidez posicional (focada no orgulho) com a flexibilidade moderna (focada na resolução mútua)." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Negociar não é vencer debates ou gritar mais alto. É um processo racional de troca, desenhado para transformar um conflito em um contrato sustentável.",
      videoLink: "https://www.youtube.com/embed/placeholder-negociacao-paradigma",
      audioLink: "https://open.spotify.com/embed/track/placeholder-negociacao-paradigma"
    }
  },
  2: {
    title: "Abordagens: Distributiva vs Integrativa",
    paragraphs: [
      {
        index: "INTRO",
        text: `A literatura de administração divide a negociação em duas macro-abordagens: a Distributiva e a Integrativa. Na **Negociação Distributiva**, as partes estão diante de um recurso rígido, inflexível e limitado (o chamado 'bolo fixo' ou Jogo de Soma Zero). Pense na compra de um carro usado: se você conseguir um desconto de 5 mil reais, esse mesmo valor saiu do bolso do vendedor. É matemática pura: cada fatia a mais para mim é uma fatia a menos para você. Essa abordagem é altamente competitiva, onde a ocultação de informações e a tática do 'blefe' são utilizadas para testar o limite da outra parte no curtíssimo prazo.

Do outro lado, o grande Santo Graal das escolas de negócio é a **Negociação Integrativa (Ganha-Ganha)**. Nessa abordagem, as partes assumem que o tamanho do 'bolo' não é estático. Através da criatividade, honestidade (compartilhamento seletivo de informações) e análise dos interesses subjacentes, os negociadores tentam *aumentar o tamanho do bolo antes de fatiá-lo*. Se o fornecedor não consegue baixar o preço (distributiva), ele pode estender a garantia de 1 para 3 anos ou oferecer treinamento gratuito à equipe da Petrobras (integrativa).

As provas da CESGRANRIO testam a identificação dessas duas escolas em estudos de caso. A chave é ler a tensão do cenário. Se a questão mostra duas partes brigando exclusivamente pelo centavo em uma relação que nunca mais vai ocorrer (compra isolada), o viés é Distributivo. Se a questão enfatiza a criação de valor, troca de informações abertas, resolução conjunta de problemas e contratos complexos, trata-se inequivocamente do modelo Integrativo.`
      }
    ],
    flipCards: [
      {
        id: "fc-2-1",
        front: { title: "Distributiva", icon: "PieChart" },
        back: { content: "Abordagem Ganha-Perde. O recurso é escasso e fixo (soma zero). O foco é reclamar a maior fatia de valor possível." }
      },
      {
        id: "fc-2-2",
        front: { title: "Integrativa", icon: "Expand" },
        back: { content: "Abordagem Ganha-Ganha. Foca em criar valor mútuo (aumentar o bolo) adicionando variáveis como prazos, fretes e garantias na mesa." }
      },
      {
        id: "fc-2-3",
        front: { title: "Soma Zero", icon: "Scale" },
        back: { content: "Na distributiva, o saldo matemático das vitórias e perdas das partes é zero (+5 para mim, -5 para você)." }
      },
      {
        id: "fc-2-4",
        front: { title: "Informação (Distributiva)", icon: "EyeOff" },
        back: { content: "Neste modelo, a informação é uma arma. Ocultam-se vulnerabilidades (blefe) para não demonstrar desespero por fechar negócio." }
      },
      {
        id: "fc-2-5",
        front: { title: "Informação (Integrativa)", icon: "Eye" },
        back: { content: "Neste modelo, as informações são compartilhadas. Apenas revelando a dor real as partes conseguem ser criativas na solução conjunta." }
      },
      {
        id: "fc-2-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Identifique palavras-chave no enunciado: 'Partilha de recurso fixo' (Distributiva) x 'Resolução Criativa de Problemas' (Integrativa)." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Na negociação distributiva nós lutamos pela fatia. Na integrativa, viramos parceiros e lutamos juntos contra o problema para assar um bolo maior.",
      videoLink: "https://www.youtube.com/embed/placeholder-distributiva-integrativa",
      audioLink: "https://open.spotify.com/embed/track/placeholder-distributiva-integrativa"
    }
  },
  3: {
    title: "A Escola de Harvard (Negociação Baseada em Princípios) - Pilares 1 e 2",
    paragraphs: [
      {
        index: "INTRO",
        text: `O Projeto Harvard de Negociação, eternizado no livro 'Como Chegar ao Sim' (Roger Fisher e William Ury), mudou para sempre a forma como corporações e governos lidam com conflitos. Eles desenharam a "Negociação Baseada em Princípios", sustentada em quatro pilares. O primeiro pilar exige uma ruptura psicológica cirúrgica: **Separe as Pessoas do Problema**. O ego, o rancor ou o humor do negociador (pessoa) não podem contaminar a essência técnica do contrato (problema). Seja empático e suave com a pessoa humana (escuta ativa), mas seja um 'trator' lógico e implacável com os méritos do problema na mesa.

O segundo pilar de Harvard ataca o vício da barganha posicional: **Concentre-se nos Interesses, não nas Posições**. A 'Posição' é aquilo que o negociador declara na mesa: "Eu exijo um aumento salarial de 30%". O 'Interesse' é a força motriz oculta, o medo, a dor ou a necessidade real: "Não consigo pagar o tratamento médico do meu filho". Brigar contra posições leva a um impasse de orgulhos.

Ao descobrir os Interesses subjacentes (através de boas perguntas e escuta), abre-se a porta para soluções criativas. Se a empresa não pode dar os 30% (posição), mas entende que a dor é a saúde do filho (interesse), ela pode pagar integralmente o plano de saúde da criança. O problema foi resolvido de forma mais barata para a empresa, e o interesse real do funcionário foi suprido a 100%. A CESGRANRIO frequentemente explora a diferença tática entre a teimosia posicional e a flexibilidade baseada em interesses.`
      }
    ],
    flipCards: [
      {
        id: "fc-3-1",
        front: { title: "O Modelo de Harvard", icon: "BookOpen" },
        back: { content: "Negociação Baseada em Princípios. Oposto da barganha posicional. Foca em mérito, lógica e interesses vitais, gerando acordos sábios." }
      },
      {
        id: "fc-3-2",
        front: { title: "Pessoas vs Problemas", icon: "UserCheck" },
        back: { content: "1º Pilar: Não ataque o oponente pessoalmente. Ataque o problema em conjunto com ele. Suave com a pessoa, duro com o problema." }
      },
      {
        id: "fc-3-3",
        front: { title: "Interesses vs Posições", icon: "Lightbulb" },
        back: { content: "2º Pilar: Abandone a superficialidade do pedido inicial (Posição) e escave o real motivo (Interesse/Necessidade) para poder agir." }
      },
      {
        id: "fc-3-4",
        front: { title: "A Posição", icon: "Shield" },
        back: { content: "É o que o negociador *diz* que quer. Geralmente é inflexível, ancorada no orgulho e gera atrito estático." }
      },
      {
        id: "fc-3-5",
        front: { title: "O Interesse", icon: "Heart" },
        back: { content: "É o motivo *pelo qual* ele quer a posição (medo, segurança, status, necessidade). Satisfazer o interesse resolve o conflito." }
      },
      {
        id: "fc-3-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Memorize a diferença: Posição (Reivindicação rígida) e Interesse (Necessidade Subjacente)." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Harvard ensina a desarmar o ego. Ao separar a raiva humana dos números da planilha, e focar no que o outro realmente precisa, a negociação flui da guerra para a engenharia de soluções.",
      videoLink: "https://www.youtube.com/embed/placeholder-harvard-1",
      audioLink: "https://open.spotify.com/embed/track/placeholder-harvard-1"
    }
  },
  4: {
    title: "A Escola de Harvard (Negociação Baseada em Princípios) - Pilares 3 e 4",
    paragraphs: [
      {
        index: "INTRO",
        text: `Continuando com o Modelo de Harvard, o terceiro pilar ataca a premissa restritiva do bolo fixo: **Invente Opções de Ganhos Mútuos**. Antes de bater o martelo para decidir como o recurso será dividido, as partes devem criar um ambiente seguro de "brainstorming" (tempestade de ideias) livre de julgamentos prematuros. A ansiedade de apontar falhas na proposta alheia assassina a criatividade. O objetivo é ampliar o escopo da negociação, criando múltiplas opções que atendam partes dos interesses de ambos. Em vez de escolher entre A ou B, constrói-se um plano C, D ou E superadores.

O quarto pilar é a âncora de salvação contra chantagistas e truculentos: **Insista em Usar Critérios Objetivos**. Se um sindicato afirma que o aumento deve ser de 50%, e a direção acha que 0% é justo, a discussão baseada no achismo (subjetiva) resultará em greve. Harvard orienta a retirada da emoção ancorando a decisão num critério externo incontestável, científico ou normativo: a inflação do IPCA do ano, laudos técnicos, preços médios de mercado ou a legislação vigente.

Quando você embasa sua negociação num 'critério objetivo', você não cede à pressão do outro e nem tenta impor a sua vontade. Você se submete humildemente a um padrão justo reconhecido por ambos. Para a banca CESGRANRIO, o uso do critério objetivo é a antítese do uso da Força/Coação. É a ferramenta que permite que o negociador mais fraco argumentativamente não seja engolido pela lábia do oponente mais ardiloso.`
      }
    ],
    flipCards: [
      {
        id: "fc-4-1",
        front: { title: "Opções de Ganhos Mútuos", icon: "Wand" },
        back: { content: "3º Pilar: Inventar soluções criativas *antes* de decidir. Suspender o julgamento inicial para permitir o nascimento da inovação." }
      },
      {
        id: "fc-4-2",
        front: { title: "Julgamento Prematuro", icon: "XOctagon" },
        back: { content: "É o assassino da criatividade. Cortar imediatamente a ideia do outro na mesa gera retração defensiva e mata a fase de geração de opções." }
      },
      {
        id: "fc-4-3",
        front: { title: "Critérios Objetivos", icon: "Scale" },
        back: { content: "4º Pilar: Fundamentar o acordo não em vontades/teimosias, mas em padrões justos, técnicos, legais ou mercadológicos incontestáveis." }
      },
      {
        id: "fc-4-4",
        front: { title: "Vontade vs Princípio", icon: "ShieldAlert" },
        back: { content: "Ceder à vontade do oponente significa fraqueza (ele venceu você). Ceder a um critério objetivo demonstra inteligência (a técnica venceu ambos)." }
      },
      {
        id: "fc-4-5",
        front: { title: "Exemplos de Critérios", icon: "BookOpenCheck" },
        back: { content: "Laudos de engenharia (Petrobras), Tabela FIPE para veículos, índices IPCA/IGPM, jurisprudência de tribunais ou cotação na Bolsa (Commodities)." }
      },
      {
        id: "fc-4-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Os 4 pilares: 1) Pessoas/Problemas, 2) Interesses/Posições, 3) Opções Mútuas, 4) Critérios Objetivos." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Harvard ensina a inovar nas alternativas (Opções) e a ser frio na hora de avaliar os números (Critérios Objetivos). Nunca decida nada baseado na 'teimosia' da contraparte.",
      videoLink: "https://www.youtube.com/embed/placeholder-harvard-2",
      audioLink: "https://open.spotify.com/embed/track/placeholder-harvard-2"
    }
  },
  5: {
    title: "Mecanismos de Poder: BATNA e ZOPA",
    paragraphs: [
      {
        index: "INTRO",
        text: `Nenhuma negociação ocorre num vácuo de poder. O elemento que confere verdadeiro poder não é o volume da voz do executivo nem a agressividade do sindicato. O poder provém da qualidade da sua alternativa externa caso a mesa seja abandonada. Esse conceito em Harvard é batizado de **BATNA (Best Alternative to a Negotiated Agreement)**, ou MAPAN (Melhor Alternativa Para um Acordo Negociado). A BATNA é o seu "Plano B". Se você tem uma entrevista de emprego, mas já possui três outras propostas irrecusáveis aprovadas (BATNA forte), você negocia o salário na primeira com uma serenidade granítica. Sem BATNA (desespero), você aceita qualquer migalha.

O negociador deve proteger a sua BATNA a todo custo e simultaneamente investigar e enfraquecer a BATNA do oponente. Uma vez definida a sua alternativa externa, estabelece-se o **Ponto de Resistência (ou Ponto de Reserva)**: é a 'linha final'. É o pior valor que você ainda aceita assinar antes de virar as costas, levantar e usar a sua BATNA. Se a proposta ofender esse limite mínimo, a mesa é encerrada.

Da interação entre as resistências das duas partes nasce a **ZOPA (Zona de Possível Acordo)**. A ZOPA é estritamente o intervalo matemático de sobreposição entre o valor máximo que o Comprador topa pagar e o valor mínimo que o Vendedor aceita receber. Exemplo de ZOPA: Vendedor aceita vender por 80; Comprador topa pagar até 100. A ZOPA é de 80 a 100. Qualquer número neste intervalo finaliza o contrato. Se não houver sobreposição matemática, a CESGRANRIO pode chamar de ZOPA negativa: a negociação morre tecnicamente sem acordo.`
      }
    ],
    flipCards: [
      {
        id: "fc-5-1",
        front: { title: "BATNA (MAPAN)", icon: "DoorOpen" },
        back: { content: "Best Alternative to a Negotiated Agreement. A sua melhor opção de fuga se aquele negócio na mesa fracassar." }
      },
      {
        id: "fc-5-2",
        front: { title: "O Poder da BATNA", icon: "Dumbbell" },
        back: { content: "Quem tem a melhor BATNA é quem não precisa fechar o acordo de forma desesperada, tendo o maior poder psicológico de barganha." }
      },
      {
        id: "fc-5-3",
        front: { title: "Ponto de Resistência (Reserva)", icon: "Shield" },
        back: { content: "O limite numérico imposto pela BATNA. É a fronteira final: abaixo dali (ou acima, dependendo do lado) o negócio dá prejuízo irracional." }
      },
      {
        id: "fc-5-4",
        front: { title: "ZOPA", icon: "Map" },
        back: { content: "Zone Of Possible Agreement. O espaço em comum onde há a sobreposição do máximo do comprador com o mínimo do vendedor." }
      },
      {
        id: "fc-5-5",
        front: { title: "ZOPA Negativa", icon: "XCircle" },
        back: { content: "Quando o limite do comprador é matematicamente inferior ao piso do vendedor. Não há área cinzenta; o acordo é impossível sem mudança das premissas." }
      },
      {
        id: "fc-5-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Confusões comuns: BATNA é uma ação/caminho alternativo lá fora. Ponto de Reserva é o *valor financeiro* limite aqui dentro." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "O sucesso da negociação é decidido fora da sala. Se o seu plano B (BATNA) for fraco, a outra parte vai ler o seu desespero e engolir toda a ZOPA.",
      videoLink: "https://www.youtube.com/embed/placeholder-batna-zopa",
      audioLink: "https://open.spotify.com/embed/track/placeholder-batna-zopa"
    }
  },
  6: {
    title: "Táticas de Ancoragem e Concessões",
    paragraphs: [
      {
        index: "INTRO",
        text: `Dentro da ZOPA, como o valor final é decidido? A psicologia econômica e a teoria dos jogos explicam que o cérebro humano é vulnerável à primeira informação numérica lançada na mesa. Essa tática é chamada de **Ancoragem**. Se um vendedor pede R$ 100.000 por um terreno que vale R$ 50.000, esse número absurdo torna-se a 'âncora' da negociação. A partir daí, qualquer contraproposta (mesmo que seja R$ 70.000) parecerá um desconto enorme, induzindo o comprador a fechar um negócio supervalorizado. O bom negociador deve neutralizar a âncora imediatamente (geralmente usando dados de mercado ou a tática do 'descarte ruidoso' da proposta).

Uma vez estabelecida a área de debate, inicia-se a dança das **Concessões**. A forma como você cede valor comunica a sua força na mesa. Negociadores inexperientes, movidos pela ansiedade de agradar, fazem grandes concessões rapidamente e de graça. Isso é um erro fatal. A outra parte interpretará que o seu preço inicial era um blefe gigantesco e pedirá ainda mais. A regra de ouro distributiva é: as concessões devem ser dolorosas, lentas e decrecentes. Se você baixar o preço, baixe 10 na primeira rodada, 5 na segunda e 1 na terceira. Essa curva decrescente avisa subliminarmente à contraparte que você está chegando ao seu limite (Ponto de Resistência).

Outra regra vital da concessão, muito cobrada pela CESGRANRIO, é a **Condicionalidade**. Jamais dê algo de graça. Se o cliente exige um desconto no preço, você deve dizer: "Eu posso te dar os 5% de desconto, SE você dobrar o volume do pedido ou SE você pagar à vista". Ao amarrar a concessão a uma contrapartida (tática do 'Se... Então...'), você preserva o seu valor, desestimula pedidos frívolos e empurra a negociação para a zona integrativa (Ganha-Ganha).`
      }
    ],
    flipCards: [
      {
        id: "fc-6-1",
        front: { title: "Ancoragem", icon: "Anchor" },
        back: { content: "Tática psicológica. O primeiro número forte jogado na mesa puxa todas as propostas seguintes para a sua órbita." }
      },
      {
        id: "fc-6-2",
        front: { title: "Padrão de Concessão", icon: "TrendingDown" },
        back: { content: "Deve ser decrescente (ex: ceder 10, depois 5, depois 2). Ceder o mesmo valor repetidamente avisa que você tem margem infinita." }
      },
      {
        id: "fc-6-3",
        front: { title: "Concessão Gratuita", icon: "ThumbsDown" },
        back: { content: "Dar algo sem pedir nada em troca demonstra desespero, inflaciona o ego do oponente e destrói o seu poder de barganha." }
      },
      {
        id: "fc-6-4",
        front: { title: "Concessão Condicional", icon: "Lock" },
        back: { content: "A tática do 'Se... Então'. Se eu te der mais prazo, você assume o frete. Protege o valor total do acordo." }
      },
      {
        id: "fc-6-5",
        front: { title: "O Poder do Silêncio", icon: "MicOff" },
        back: { content: "Após fazer a oferta ou a recusa, cale a boca. O silêncio cria pressão psicológica que muitas vezes força o oponente a ceder." }
      },
      {
        id: "fc-6-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Se a prova falar sobre 'a primeira oferta definir os limites', ela está cobrando o conceito de Ancoragem." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Não negocie com o seu próprio medo. Toda âncora alta é um convite para você ceder, mas toda concessão condicional é um freio no oportunismo do outro.",
      videoLink: "https://www.youtube.com/embed/placeholder-ancoragem",
      audioLink: "https://open.spotify.com/embed/track/placeholder-ancoragem"
    }
  },
  7: {
    title: "As Etapas do Processo de Negociação",
    paragraphs: [
      {
        index: "INTRO",
        text: `A negociação não acontece apenas quando as partes sentam à mesa; ela é um processo de longo prazo, geralmente dividido em quatro a cinco fases. A primeira e, de longe, a mais crítica, é o **Planejamento (Preparação)**. Negociadores de elite vencem o embate antes de entrarem na sala. Nesta fase, define-se a BATNA, calcula-se o Ponto de Reserva próprio e o do oponente, mapeia-se a ZOPA provável e traça-se a estratégia (distributiva ou integrativa). Ir para a mesa sem planejamento é operar na base do improviso e do ego.

A segunda fase é a **Abertura (Aquecimento ou Contato)**. É a construção do 'Rapport' (conexão interpessoal). O objetivo não é falar de negócios, mas quebrar o gelo, estabelecer o clima (hostil ou colaborativo) e ler a linguagem corporal do oponente. Na sequência, entra-se na fase de **Exploração (Debate)**. Aqui os interesses ocultos começam a ser mapeados através de perguntas abertas e escuta ativa. É o momento de testar as premissas formuladas no planejamento e ancorar a primeira proposta. 

A quarta fase é o **Fechamento (Acordo)**. Chegou-se a um consenso na ZOPA. No entanto, o erro mais comum ocorre aqui: as partes relaxam excessivamente e permitem ambiguidades. A CESGRANRIO cobra a noção de que o fechamento exige formalização rígida. Quem faz o quê, quando, onde e por qual valor? É a fase do Controle. Se o acordo for firmado vagamente ("vamos nos ajudando ao longo da obra"), a negociação não resolveu o problema, apenas adiou o conflito e garantiu um litígio futuro nas varas cíveis.`
      }
    ],
    flipCards: [
      {
        id: "fc-7-1",
        front: { title: "Planejamento (Preparação)", icon: "ClipboardList" },
        back: { content: "Fase 1: Ocorre antes do encontro. Mapeia-se interesses, BATNA e ZOPA. É onde 80% do sucesso da negociação é garantido." }
      },
      {
        id: "fc-7-2",
        front: { title: "Abertura (Rapport)", icon: "Smile" },
        back: { content: "Fase 2: Quebra-gelo, construção de confiança e leitura do clima emocional. Calibragem para o embate." }
      },
      {
        id: "fc-7-3",
        front: { title: "Exploração (Debate)", icon: "Search" },
        back: { content: "Fase 3: Troca de informações. Fase das perguntas, da identificação real de necessidades (Harvard) e das ancoragens iniciais." }
      },
      {
        id: "fc-7-4",
        front: { title: "Barganha", icon: "ArrowLeftRight" },
        back: { content: "A fase de troca propriamente dita (muitos a embutem na Exploração). É o momento das concessões condicionais." }
      },
      {
        id: "fc-7-5",
        front: { title: "Fechamento (Controle)", icon: "FileSignature" },
        back: { content: "Fase Final: Formalização milimétrica do acordo. Acabar com as zonas cinzentas para garantir que o contrato seja executável." }
      },
      {
        id: "fc-7-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Nas questões, se o executivo vai para a reunião apenas com a 'cara e a coragem', a banca apontará falha na fase de Planejamento." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Suor no treinamento, pouco sangue na batalha. O planejamento profundo transforma a ansiedade da mesa de negociação em um roteiro calculado de execução.",
      videoLink: "https://www.youtube.com/embed/placeholder-etapas-negociacao",
      audioLink: "https://open.spotify.com/embed/track/placeholder-etapas-negociacao"
    }
  },
  8: {
    title: "Perfis Comportamentais do Negociador",
    paragraphs: [
      {
        index: "INTRO",
        text: `Não existe uma técnica mágica que funcione em todas as mesas, porque o ser humano do outro lado varia enormemente. A literatura classifica os negociadores em alguns perfis comportamentais (frequentemente baseados no método DISC). O primeiro é o **Competitivo (Tubarão / Controlador)**. Ele é impaciente, pragmático e focado em resultados rápidos e poder. Se você usar muita conversa mole ou empatia emocional, ele vai te atropelar. Negocie com ele indo direto ao ponto, usando números e permitindo que ele sinta que está no controle da decisão final.

O segundo perfil é o **Analítico (Pragmático / Calculista)**. Muito comum em engenheiros e auditores. Ele é metódico, avesso ao risco, não demonstra emoções facilmente e desconfia de "promessas grandiosas". Para fechar negócio com o analítico, o carisma é inútil. Você precisa de provas: laudos, gráficos, manuais técnicos e garantias contratuais sólidas. O terceiro é o **Expressivo (Extrovertido / Carismático)**. Ele decide pela emoção, pelo status e pelo relacionamento. Ele gosta da visão geral (Big Picture) e odeia os pequenos detalhes burocráticos.

Por fim, temos o **Amável (Integrador / Cooperativo)**. Ele prioriza a harmonia e o relacionamento acima do dinheiro. Ele foge do conflito (não gosta de negociações distributivas e ancoragens duras) e busca segurança em relacionamentos de longo prazo. O risco do negociador amável é virar "Acomodado" e ceder demais na mesa. A CESGRANRIO exige que o candidato entenda que a falha de muitos executivos é o 'Viés de Projeção' (negociar com o outro usando o SEU próprio perfil). O negociador de elite age como um camaleão: ele lê o perfil do oponente (na fase de Abertura) e ajusta a sua abordagem à linguagem que o outro compreende.`
      }
    ],
    flipCards: [
      {
        id: "fc-8-1",
        front: { title: "Competitivo (Controlador)", icon: "Swords" },
        back: { content: "Focado em resultado e poder. Direto ao ponto. Use argumentos rápidos e dê opções para ele 'escolher' a vitória." }
      },
      {
        id: "fc-8-2",
        front: { title: "Analítico (Calculista)", icon: "LineChart" },
        back: { content: "Focado em dados, regras e precisão. Lento para decidir. Apresente provas técnicas (Critérios Objetivos) e planilhas." }
      },
      {
        id: "fc-8-3",
        front: { title: "Expressivo (Carismático)", icon: "Sparkles" },
        back: { content: "Focado em inovação, status e emoção. Odeia minúcias operacionais. Venda a 'grande visão' do projeto." }
      },
      {
        id: "fc-8-4",
        front: { title: "Amável (Integrador)", icon: "HeartHandshake" },
        back: { content: "Focado em pessoas e harmonia. Foge de conflitos duros. Crie confiança, mostre garantias e não force a barra." }
      },
      {
        id: "fc-8-5",
        front: { title: "Efeito Camaleão", icon: "Blend" },
        back: { content: "A habilidade de ler o perfil comportamental do outro e espelhar o seu estilo de comunicação para gerar rapport." }
      },
      {
        id: "fc-8-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "A alternativa correta nunca apoiará tratar todos de forma idêntica. A comunicação deve ser adaptada ao perfil de quem escuta." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Se você tentar vender emoção para um engenheiro (Analítico) ou planilha para um vendedor nato (Expressivo), a mesa quebra. Negocie no idioma mental do oponente.",
      videoLink: "https://www.youtube.com/embed/placeholder-perfis-negociador",
      audioLink: "https://open.spotify.com/embed/track/placeholder-perfis-negociador"
    }
  },
  9: {
    title: "Fatores de Pressão: Tempo e Impasse (Deadlocks)",
    paragraphs: [
      {
        index: "INTRO",
        text: `O Tempo não é apenas uma métrica de relógio na negociação, é uma arma de destruição em massa. Existe um provérbio no mundo dos negócios: "Se você tiver um prazo rígido, e eu souber qual é, eu fico com o seu dinheiro". Isso ocorre porque a negociação segue uma dinâmica não linear: cerca de 80% das concessões são feitas e o acordo é finalmente modelado nos últimos 20% do tempo disponível (a síndrome do fechamento). Se o seu voo para o exterior sai em 1 hora, você não tem tempo para procurar outra casa de câmbio; o atendente no aeroporto sabe disso e ancora a taxa de conversão nas alturas. O prazo fatal (Deadline) comprime as opções e aniquila a BATNA.

Quando a mesa esquenta e o ego toma conta, as posições cristalizam-se. Chega-se ao **Impasse (Deadlock)**. É o momento em que ninguém cede, o silêncio domina, e a negociação ameaça romper com danos milionários (ex: uma greve que pararia a Refinaria). Como quebrar o deadlock sem perder a honra? Uma técnica clássica é a pausa tática (ir tomar um café e respirar). Outra é mudar os negociadores físicos, tirando os 'brigões' da sala. Mas a ferramenta mais poderosa na administração pública para quebrar o impasse é chamar uma Terceira Parte neutra.

Podemos utilizar a **Mediação**, onde um profissional neutro facilita a comunicação e ajuda as partes a enxergarem opções, mas o poder de decisão continua na mão dos negociadores (ele não impõe nada). Ou podemos partir para a **Arbitragem** (cada vez mais comum em grandes contratos estatais). Na arbitragem, as partes abrem mão do poder de decisão e entregam o problema para um árbitro (um juiz técnico independente), cuja decisão final será obrigatória e vinculativa. A CESGRANRIO testa sua capacidade de diferenciar Mediação (foco no diálogo voluntário) de Arbitragem (foco na decisão forçada técnica).`
      }
    ],
    flipCards: [
      {
        id: "fc-9-1",
        front: { title: "O Fator Tempo", icon: "Hourglass" },
        back: { content: "Quem tem menos tempo tem menos poder. A pressão do Deadline força concessões desesperadas e ilógicas." }
      },
      {
        id: "fc-9-2",
        front: { title: "Regra do 80/20 no Tempo", icon: "PieChart" },
        back: { content: "Quase todos os acordos e flexibilizações complexas ocorrem nos minutos finais da negociação." }
      },
      {
        id: "fc-9-3",
        front: { title: "Impasse (Deadlock)", icon: "Lock" },
        back: { content: "Ruptura do diálogo onde ambas as partes se recusam a fazer novas concessões e a ZOPA parece bloqueada pelo orgulho." }
      },
      {
        id: "fc-9-4",
        front: { title: "Mediação", icon: "Users" },
        back: { content: "Terceiro neutro auxilia a reabrir o diálogo e gerar opções. *Ele não decide*. O controle do acordo segue com as partes." }
      },
      {
        id: "fc-9-5",
        front: { title: "Arbitragem", icon: "Gavel" },
        back: { content: "Terceiro técnico escuta as partes e toma uma decisão *vinculativa* (obrigatória). As partes perdem o controle sobre o resultado." }
      },
      {
        id: "fc-9-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Sempre que a questão disser 'O terceiro ajudou a conversar, mas não impôs solução', a resposta é Mediação, nunca Arbitragem." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Nunca revele o seu prazo fatal se puder evitar. E se o impasse técnico parecer invencível, engula o orgulho e chame a Mediação antes de declarar guerra total.",
      videoLink: "https://www.youtube.com/embed/placeholder-tempo-impasse",
      audioLink: "https://open.spotify.com/embed/track/placeholder-tempo-impasse"
    }
  },
  10: {
    title: "Táticas Sujas de Negociação e Imunidade",
    paragraphs: [
      {
        index: "INTRO",
        text: `Infelizmente, nem todo mundo leu Harvard. Muitos negociadores agem com extrema má fé, utilizando as "Dirty Tricks" (Táticas Sujas). Elas são divididas em três categorias: Mentiras, Guerra Psicológica e Pressão Posicional. A tática da *Autoridade Limitada* é um clássico: o comprador aperta você por três horas, você reduz seu preço até o sangue, e na hora de assinar ele diz: "Ótimo. Agora preciso da aprovação da minha diretoria" (que vai pedir mais desconto). Outra tática suja é o *Bom Policial, Mau Policial*, onde um parceiro grita e ameaça, e o outro oferece um acordo "salvador" (que ainda é péssimo para você) simulando bondade.

Também há a tática da *Mordidinha (The Nibble)*. No exato momento do Fechamento, quando você já gastou toda a sua energia psicológica e só quer ir embora, o oponente pede: "Ah, e claro, você assume o frete grátis, certo?". Ele se aproveita da sua exaustão e do medo de perder todo o acordo por um 'detalhe'. Como se imunizar contra a sujeira? O método é claro: **Reconheça a tática, traga-a à luz, e negocie a própria regra do jogo.** 

Não revide a mentira com outra mentira, e não se irrite. Se identificar a tática do 'Bom policial', sorria e diga: "Estão usando a técnica do mau policial comigo? Vamos ser francos". Ao nomear a tática, você a desarma, pois ela só funciona na escuridão da manipulação. Para a banca CESGRANRIO, a prova para o cargo de Suprimentos exige um comprador estatal íntegro, que baseie o preço em planilhas paramétricas (Critérios Objetivos) e recuse o blefe do fornecedor através de sólida pesquisa prévia (preparação).`
      }
    ],
    flipCards: [
      {
        id: "fc-10-1",
        front: { title: "Táticas Sujas", icon: "Skull" },
        back: { content: "Mentiras descaradas, ataques psicológicos, assentos desconfortáveis na sala e ultimatos ('Pegar ou Largar') visando coação." }
      },
      {
        id: "fc-10-2",
        front: { title: "Autoridade Limitada", icon: "UserMinus" },
        back: { content: "O negociador suga suas concessões e no final avisa que não tem caneta para assinar. Solução: Pergunte *antes* se ele é o decisor final." }
      },
      {
        id: "fc-10-3",
        front: { title: "Good Cop / Bad Cop", icon: "Drama" },
        back: { content: "Teatro onde um agride para criar medo e o outro acalma para extrair a concessão. Solução: Nomeie a tática na mesa." }
      },
      {
        id: "fc-10-4",
        front: { title: "Mordidinha (Nibble)", icon: "MousePointerClick" },
        back: { content: "Pedido extra absurdo feito nos 45 minutos do segundo tempo, apostando no seu cansaço e no seu medo de rasgar o contrato." }
      },
      {
        id: "fc-10-5",
        front: { title: "Desarmando a Bomba", icon: "ShieldCheck" },
        back: { content: "Nunca revide. Traga a tática explicitamente para as regras da mesa. 'Percebo que vocês estão tentando um ultimato, mas minha BATNA não permite'." }
      },
      {
        id: "fc-10-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "A prova de Administração (Compliance) exige que o funcionário estatal jamais use táticas sujas, devendo combatê-las com técnica e isonomia." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "As táticas sujas de negociação são como truques de mágica: perdem totalmente o seu poder assim que o público descobre como são feitas.",
      videoLink: "https://www.youtube.com/embed/placeholder-taticas-sujas",
      audioLink: "https://open.spotify.com/embed/track/placeholder-taticas-sujas"
    }
  }
};
