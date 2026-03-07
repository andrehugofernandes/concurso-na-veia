import { QuizQuestion } from '../../shared';

export const QUIZ_M1_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "O relatório diário de turno da RPBC afirma: 'A bomba de sucção 04 apresentou vibração acima do limite (5.2 mm/s), sendo desligada preventivamente às 14h00.' Segundo a COMPREENSÃO do texto, o que motivou o desligamento?",
    opcoes: [
      { label: "A", valor: "O fato de a bomba estar muito velha." },
      { label: "B", valor: "A decisão do supervisor de poupar o equipamento." },
      { label: "C", valor: "A vibração excessiva registrada, que ultrapassou o limite aceitável." },
      { label: "D", valor: "A falta de energia na refinaria às 14h00." },
      { label: "E", valor: "O acionamento prévio da equipe de manutenção." },
    ],
    correta: "C",
    explicacao: "Questão de COMPREENSÃO: os dados estão explícitos no texto ('vibração acima do limite')."
  },
  {
    id: 102,
    pergunta: "Considere o mesmo relatório. A partir do texto, é possível INTERPRETAR que:",
    opcoes: [
      { label: "A", valor: "O plano de manutenção da RPBC está defasado." },
      { label: "B", valor: "A bomba 04 precisará ser substituída por uma nova." },
      { label: "C", valor: "A equipe agiu conforme os protocolos de segurança ao detectar a anomalia." },
      { label: "D", valor: "A produção foi interrompida completamente." },
      { label: "E", valor: "A vibração foi causada pela má qualidade do óleo." },
    ],
    correta: "C",
    explicacao: "INTERPRETAÇÃO (dedução lógica): O desligamento 'preventivo' após a falha indica cumprimento de protocolos."
  },
  {
    id: 103,
    pergunta: "Qual a diferença fundamental entre compreensão e interpretação na ótica da banca CESGRANRIO?",
    opcoes: [
      { label: "A", valor: "Compreensão foca na intenção; interpretação foca na gramática." },
      { label: "B", valor: "Compreensão decodifica o explícito; interpretação deduz o implícito com base no texto." },
      { label: "C", valor: "Interpretação é subjetiva; compreensão é objetiva." },
      { label: "D", valor: "Não há diferença prática para a banca." },
      { label: "E", valor: "Compreensão exige conhecimento de mundo; interpretação não." },
    ],
    correta: "B",
    explicacao: "A banca exige que a compreensão seja literal e a interpretação seja uma dedução autorizada pelo texto."
  },
  {
    id: 104,
    pergunta: "Em 'A nova política visa minimizar incidentes como um compromisso com a vida', o que se compreende?",
    opcoes: [
      { label: "A", valor: "A Petrobras ignorava a vida anteriormente." },
      { label: "B", valor: "A vida é o valor central que motiva a nova política." },
      { label: "C", valor: "A política é meramente burocrática." },
      { label: "D", valor: "Incidentes são inevitáveis na estatal." },
      { label: "E", valor: "O texto é um manual de instruções técnicas." },
    ],
    correta: "B",
    explicacao: "COMPREENSÃO: O texto associa diretamente a política ao 'compromisso com a vida'."
  },
  {
    id: 105,
    pergunta: "Ao encontrar o enunciado 'Infere-se do texto que...', você deve realizar um processo de:",
    opcoes: [
      { label: "A", valor: "Cópia literal de um parágrafo." },
      { label: "B", valor: "Busca por sinônimos no dicionário." },
      { label: "C", valor: "Dedução lógica do que não está dito, mas pode ser provado pelo que está escrito." },
      { label: "D", valor: "Crítica pessoal ao estilo do autor." },
      { label: "E", valor: "Análise exclusiva de erros gramaticais." },
    ],
    correta: "C",
    explicacao: "Inferir é interpretar. É o 'além do texto', mas com os pés no texto."
  },
  {
    id: 106,
    pergunta: "No trecho 'A purga do tanque deve ser feita com N2 para evitar atmosfera explosiva', qual o motivo direto?",
    opcoes: [
      { label: "A", valor: "Reduzir custos." },
      { label: "B", valor: "Seguir ordens do supervisor." },
      { label: "C", valor: "Prevenir o risco de explosão." },
      { label: "D", valor: "Testar a pureza do nitrogênio." },
      { label: "E", valor: "Limpar as válvulas de alívio." },
    ],
    correta: "C",
    explicacao: "Compreensão pura: o texto diz explicitamente 'para evitar atmosfera explosiva'."
  }
];

export const QUIZ_M2_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "O 'Tópico Frasal' de um parágrafo técnico costuma ser:",
    opcoes: [
      { label: "A", valor: "A última palavra do texto." },
      { label: "B", valor: "Uma frase que resume a ideia central daquele parágrafo." },
      { label: "C", valor: "Um erro de digitação comum." },
      { label: "D", valor: "A assinatura do autor." },
      { label: "E", valor: "A lista de referências bibliográficas." },
    ],
    correta: "B",
    explicacao: "O tópico frasal orienta o leitor sobre o assunto principal que será desenvolvido no parágrafo."
  },
  {
    id: 202,
    pergunta: "Em um parágrafo que começa com 'A segurança operacional é prioridade absoluta', o restante do texto deve:",
    opcoes: [
      { label: "A", valor: "Falar sobre o preço do barril de petróleo." },
      { label: "B", valor: "Descrever a paisagem da Bacia de Santos." },
      { label: "C", valor: "Desenvolver, exemplificar ou justificar a importância da segurança citada." },
      { label: "D", valor: "Mudar de assunto para confundir o leitor." },
      { label: "E", valor: "Criticar os sindicatos da categoria." },
    ],
    correta: "C",
    explicacao: "A estrutura do parágrafo exige coerência com a ideia núcleo (tópico frasal)."
  },
  {
    id: 203,
    pergunta: "Qual o benefício de identificar o tópico frasal durante a prova?",
    opcoes: [
      { label: "A", valor: "Ganhar tempo na leitura macro (Skimming)." },
      { label: "B", valor: "Saber a ortografia correta das palavras." },
      { label: "C", valor: "Somar os pontos de pontuação." },
      { label: "D", valor: "Identificar o autor do texto." },
      { label: "E", valor: "Nenhuma das alternativas." },
    ],
    correta: "A",
    explicacao: "Ao ler o início de cada parágrafo, você entende a 'espinha dorsal' do texto rapidamente."
  },
  {
    id: 204,
    pergunta: "Um parágrafo que apresenta 'Por um lado... Por outro lado...' está geralmente:",
    opcoes: [
      { label: "A", valor: "Brincando com as palavras." },
      { label: "B", valor: "Contrastando dois pontos de vista ou situações." },
      { label: "C", valor: "Indicando o fim do texto." },
      { label: "D", valor: "Descrevendo uma peça mecânica circular." },
      { label: "E", valor: "Dando ordens de cima para baixo." },
    ],
    correta: "B",
    explicacao: "Essa estrutura indica oposição ou comparação dentro do parágrafo."
  },
  {
    id: 205,
    pergunta: "Se o tópico frasal é uma pergunta, o parágrafo será focado em:",
    opcoes: [
      { label: "A", valor: "Deixar o leitor sem resposta." },
      { label: "B", valor: "Responder ou discutir aquela dúvida inicial." },
      { label: "C", valor: "Pedir ajuda externa." },
      { label: "D", valor: "Criticar o sistema educacional." },
      { label: "E", valor: "Dizer que não sabe o assunto." },
    ],
    correta: "B",
    explicacao: "A 'pergunta retórica' ou diretiva abre espaço para o desenvolvimento da resposta."
  },
  {
    id: 206,
    pergunta: "Em textos da Cesgranrio, a ideia principal do texto (Tese) costuma estar no:",
    opcoes: [
      { label: "A", valor: "Rodapé." },
      { label: "B", valor: "Primeiro parágrafo (introdução)." },
      { label: "C", valor: "Meio de cada palavra." },
      { label: "D", valor: "Último anexo técnico." },
      { label: "E", valor: "Anúncio lateral." },
    ],
    correta: "B",
    explicacao: "Em textos dissertativos, o autor apresenta o tema e sua posição logo no início."
  }
];

export const QUIZ_M3_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "A técnica de 'Skimming' consiste em:",
    opcoes: [
      { label: "A", valor: "Ler o texto de trás para frente." },
      { label: "B", valor: "Fazer uma leitura rápida para captar o sentido geral e o tema." },
      { label: "C", valor: "Grifar todas as palavras que você não conhece." },
      { label: "D", valor: "Contar quantas vezes a palavra 'Petrobras' aparece." },
      { label: "E", valor: "Ler apenas os conectivos." },
    ],
    correta: "B",
    explicacao: "Skimming é o 'vôo de pássaro' sobre o texto para entender o 'o que' e o 'para onde'."
  },
  {
    id: 302,
    pergunta: "Já o 'Scanning' é útil para:",
    opcoes: [
      { label: "A", valor: "Apreciação poética do texto." },
      { label: "B", valor: "Localizar informações específicas (datas, valores, nomes)." },
      { label: "C", valor: "Entender a filosofia do autor." },
      { label: "D", valor: "Traduzir o texto para outra língua." },
      { label: "E", valor: "Nenhuma das anteriores." },
    ],
    correta: "B",
    explicacao: "Scanning é a busca 'raio-x' por um dado isolado solicitado pela questão."
  },
  {
    id: 303,
    pergunta: "Qual a recomendação de elite para a primeira leitura da prova?",
    opcoes: [
      { label: "A", valor: "Ler o texto profundamente e decorar os números." },
      { label: "B", valor: "Ler as questões primeiro para saber o que buscar no texto." },
      { label: "C", valor: "Ignorar o título do texto." },
      { label: "D", valor: "Grifar 100% das linhas." },
      { label: "E", valor: "Ler em voz alta no local de prova." },
    ],
    correta: "B",
    explicacao: "Conhecer o enunciado direciona o seu 'Scanning' e otimiza o tempo."
  },
  {
    id: 304,
    pergunta: "Durante o Skimming, o que deve ser observado com prioridade?",
    opcoes: [
      { label: "A", valor: "As notas de rodapé." },
      { label: "B", valor: "Título, subtítulos e as aberturas de parágrafos." },
      { label: "C", valor: "A fonte tipográfica utilizada." },
      { label: "D", valor: "O número de páginas." },
      { label: "E", valor: "O nome da banca organizadora." },
    ],
    correta: "B",
    explicacao: "Esses elementos dão a estrutura lógica completa do argumento do autor."
  },
  {
    id: 305,
    pergunta: "Se uma questão pede o ano de fundação de uma unidade, você usa:",
    opcoes: [
      { label: "A", valor: "Skimming." },
      { label: "B", valor: "Scanning." },
      { label: "C", valor: "Telepatia." },
      { label: "D", valor: "Interpretação profunda." },
      { label: "E", valor: "Dedução gramatical." },
    ],
    correta: "B",
    explicacao: "Para localizar '2025' ou '1953', você varre o texto em busca do padrão numérico."
  },
  {
    id: 306,
    pergunta: "A leitura 'Vertical' do texto ajuda a identificar:",
    opcoes: [
      { label: "A", valor: "O gênero textual (ex: carta, edital, notícia)." },
      { label: "B", valor: "A quantidade de adjetivos." },
      { label: "C", valor: "O humor do fiscal de sala." },
      { label: "D", valor: "A validade do seu RG." },
      { label: "E", valor: "A cor da caneta usada pelo autor." },
    ],
    correta: "A",
    explicacao: "A forma visual do texto (mancha gráfica) já denuncia se é um poema, um diálogo ou um manual."
  }
];

export const QUIZ_M4_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Qual a tipologia predominante em um manual de segurança da Petrobras?",
    opcoes: [
      { label: "A", valor: "Narrativa." },
      { label: "B", valor: "Injuntiva (Instrucional)." },
      { label: "C", valor: "Descritiva poética." },
      { label: "D", valor: "Religiosa." },
      { label: "E", valor: "Ficcional." },
    ],
    correta: "B",
    explicacao: "Manuais dão ordens e instruções, usando verbos no imperativo ou infinitivo ('aperte', 'fazer')."
  },
  {
    id: 402,
    pergunta: "Um texto que defende a ampliação da frota de navios com base em dados é:",
    opcoes: [
      { label: "A", valor: "Dissertativo-Argumentativo." },
      { label: "B", valor: "Meramente Narrativo." },
      { label: "C", valor: "Uma crônica de costumes." },
      { label: "D", valor: "Um conto de fadas." },
      { label: "E", valor: "Explicação biográfica." },
    ],
    correta: "A",
    explicacao: "A defesa de uma ideia (Tese) com base em argumentos define a dissertação-argumentativa."
  },
  {
    id: 403,
    pergunta: "A tipologia 'Descritiva' é marcada por:",
    opcoes: [
      { label: "A", valor: "Muitos verbos de ação e movimento." },
      { label: "B", valor: "Adjetivação abundante e foco em detalhes estáticos." },
      { label: "C", valor: "Diálogos entre personagens." },
      { label: "D", valor: "Expressões de tempo (ontem, hoje, amanhã)." },
      { label: "E", valor: "Instruções de como montar algo." },
    ],
    correta: "B",
    explicacao: "A descrição 'pinta' um quadro, focando no 'como algo é'."
  },
  {
    id: 404,
    pergunta: "Qual tipologia foca na progressão de eventos no tempo?",
    opcoes: [
      { label: "A", valor: "Narrativa." },
      { label: "B", valor: "Expositiva." },
      { label: "C", valor: "Descritiva." },
      { label: "D", valor: "Argumentativa." },
      { label: "E", valor: "Publicitária." },
    ],
    correta: "A",
    explicacao: "A narração conta uma história ou sequência de fatos."
  },
  {
    id: 405,
    pergunta: "O edital da Petrobras é um gênero que pertence ao tipo:",
    opcoes: [
      { label: "A", valor: "Narrativo épico." },
      { label: "B", valor: "Injuntivo." },
      { label: "C", valor: "Lírico." },
      { label: "D", valor: "Dramático." },
      { label: "E", valor: "Científico puro." },
    ],
    correta: "B",
    explicacao: "O edital prescreve regras e comportamentos (instrucional)."
  },
  {
    id: 406,
    pergunta: "Em um artigo de opinião, o autor busca:",
    opcoes: [
      { label: "A", valor: "Apenas listar fatos sem julgamento." },
      { label: "B", valor: "Persuadir o leitor a aceitar seu ponto de vista." },
      { label: "C", valor: "Contar uma piada." },
      { label: "D", valor: "Escrever uma receita de bolo." },
      { label: "E", valor: "Nenhuma das alternativas." },
    ],
    correta: "B",
    explicacao: "Artigos de opinião são ferramentas de persuasão (argumentativos)."
  }
];

export const QUIZ_M5_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "O que é 'Referenciação' em um texto?",
    opcoes: [
      { label: "A", valor: "A lista de livros no final do trabalho." },
      { label: "B", valor: "O uso de termos para retomar ou antecipar outros no texto." },
      { label: "C", valor: "O uso de citações diretas entre aspas." },
      { label: "D", valor: "A contagem de parágrafos." },
      { label: "E", valor: "O nome do autor citado." },
    ],
    correta: "B",
    explicacao: "Mecanismos de coesão que evitam repetições desnecessárias (pronomes, sinônimos)."
  },
  {
    id: 502,
    pergunta: "Em 'O engenheiro chegou. ELE verificou a bomba', o termo 'ELE' é:",
    opcoes: [
      { label: "A", valor: "Catafórico (antecipa)." },
      { label: "B", valor: "Anafórico (retoma)." },
      { label: "C", valor: "Exofórico (fora do texto)." },
      { label: "D", valor: "Um erro gramatical." },
      { label: "E", valor: "Um advérbio de tempo." },
    ],
    correta: "B",
    explicacao: "Anafora retoma algo que já foi dito anteriormente ('o engenheiro')."
  },
  {
    id: 503,
    pergunta: "Qual exemplo apresenta uma 'Catáfora'?",
    opcoes: [
      { label: "A", valor: "Joana saiu. Ela estava triste." },
      { label: "B", valor: "Só queremos ISTO: segurança e salário." },
      { label: "C", valor: "A Refinaria fechou. O prédio está vazio." },
      { label: "D", valor: "Choveu ontem." },
      { label: "E", valor: "O Brasil é grande." },
    ],
    correta: "B",
    explicacao: "Catáfora antecipa a informação que virá depois ('segurança e salário')."
  },
  {
    id: 504,
    pergunta: "A substituição por sinônimos serve para manter a:",
    opcoes: [
      { label: "A", valor: "Confusão do leitor." },
      { label: "B", valor: "Coesão e evitar a monotonia." },
      { label: "C", valor: "Ortografia antiga." },
      { label: "D", valor: "Distância entre parágrafos." },
      { label: "E", valor: "Rima entre as frases." },
    ],
    correta: "B",
    explicacao: "Variar o vocabulário (ex: 'plataforma' -> 'unidade') mantém o texto fluído."
  },
  {
    id: 505,
    pergunta: "O pronome 'ESTE' (com T) em contraposição a 'AQUELE' refere-se ao elemento:",
    opcoes: [
      { label: "A", valor: "Mais distante no texto." },
      { label: "B", valor: "Mais próximo no texto (último citado)." },
      { label: "C", valor: "De fora do texto." },
      { label: "D", valor: "De outro parágrafo." },
      { label: "E", valor: "Nenhum deles." },
    ],
    correta: "B",
    explicacao: "Este (proximidade), esse (referência média), aquele (distância)."
  },
  {
    id: 506,
    pergunta: "A coesão por 'Elipse' ocorre quando:",
    opcoes: [
      { label: "A", valor: "Omitimos um termo que o leitor consegue recuperar pelo contexto." },
      { label: "B", valor: "Usamos palavras em excesso." },
      { label: "C", valor: "Escrevemos em círculos (redundância)." },
      { label: "D", valor: "O texto é interrompido por um anúncio." },
      { label: "E", valor: "A página acaba." },
    ],
    correta: "A",
    explicacao: "Ex: 'Nós fomos à refinaria e [nós] entramos'. Omissão elegante do sujeito."
  }
];

export const QUIZ_M6_POOL: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "O que é um 'Pressuposto' em interpretação?",
    opcoes: [
      { label: "A", valor: "Uma mentira deslavada." },
      { label: "B", valor: "Uma informação implicitamente sugerida por um marcador gramatical." },
      { label: "C", valor: "A opinião do vizinho." },
      { label: "D", valor: "A data de validade da prova." },
      { label: "E", valor: "O nome do fiscal." },
    ],
    correta: "B",
    explicacao: "Marcadores como 'ainda', 'já', 'parou de' trazem informações 'escondidas' que não podem ser negadas."
  },
  {
    id: 602,
    pergunta: "Em 'Pedro CONTINUA estudando', o que se pressupõe?",
    opcoes: [
      { label: "A", valor: "Pedro parou de estudar agora." },
      { label: "B", valor: "Pedro já estudava anteriormente." },
      { label: "C", valor: "Pedro nunca estudou na vida." },
      { label: "D", valor: "Pedro é um gênio." },
      { label: "E", valor: "Pedro vai passar." },
    ],
    correta: "B",
    explicacao: "O verbo 'continuar' pressupõe um estado anterior que se mantém."
  },
  {
    id: 603,
    pergunta: "Qual a diferença de um 'Subentendido' para um pressuposto?",
    opcoes: [
      { label: "A", valor: "O subentendido é garantido pela gramática; o pressuposto é palpite." },
      { label: "B", valor: "O pressuposto é garantido pelo texto; o subentendido depende do contexto e malícia do leitor." },
      { label: "C", valor: "São exatamente a mesma coisa." },
      { label: "D", valor: "Subentendido só existe em poesia." },
      { label: "E", valor: "Pressuposto é sempre falso." },
    ],
    correta: "B",
    explicacao: "O subentendido não tem 'prova' literal no texto, mas é uma intenção que se percebe (ironia, por exemplo)."
  },
  {
    id: 604,
    pergunta: "Na frase 'FELIZMENTE, o motor ligou', a palavra em destaque indica:",
    opcoes: [
      { label: "A", valor: "Apenas o modo como ligou." },
      { label: "B", valor: "Um julgamento de valor positivo do autor sobre o fato." },
      { label: "C", valor: "Um erro de pressuposto." },
      { label: "D", valor: "Que o motor estava muito limpo." },
      { label: "E", valor: "Nenhuma das anteriores." },
    ],
    correta: "B",
    explicacao: "Advérbios modalizadores (como felizmente) revelam a postura do emissor."
  },
  {
    id: 605,
    pergunta: "O marcador 'AINDA' na frase 'Não passamos no teste AINDA' pressupõe que:",
    opcoes: [
      { label: "A", valor: "Nunca passaremos." },
      { label: "B", valor: "Há uma expectativa ou possibilidade de passar no futuro." },
      { label: "C", valor: "O teste foi cancelado." },
      { label: "D", valor: "O teste era fácil demais." },
      { label: "E", valor: "Ninguém estudou." },
    ],
    correta: "B",
    explicacao: "O 'ainda' sinaliza algo que não ocorreu, mas que se espera que ocorra."
  },
  {
    id: 606,
    pergunta: "Marcadores de oposição como 'MAS' servem para desviar a atenção para:",
    opcoes: [
      { label: "A", valor: "A ideia que vem antes do 'Mas'." },
      { label: "B", valor: "A ideia que vem depois do 'Mas' (ideia principal)." },
      { label: "C", valor: "A caligrafia do autor." },
      { label: "D", valor: "O título do texto." },
      { label: "E", valor: "A nota de rodapé." },
    ],
    correta: "B",
    explicacao: "A ideia que segue o conectivo adversativo é a que o autor quer enfatizar."
  }
];

export const QUIZ_M7_POOL: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "O vício da 'Extrapolação' ocorre quando:",
    opcoes: [
      { label: "A", valor: "O leitor entende menos do que o texto diz." },
      { label: "B", valor: "O leitor traz ideias externas que não estão na base textual." },
      { label: "C", valor: "O leitor contradiz o autor." },
      { label: "D", valor: "O leitor pula parágrafos." },
      { label: "E", valor: "O leitor grifa palavras." },
    ],
    correta: "B",
    explicacao: "Dica de ouro: se o texto não afirmou, não marque como verdade da prova!"
  },
  {
    id: 702,
    pergunta: "A 'Redução' é perigosa porque:",
    opcoes: [
      { label: "A", valor: "Ela toma um detalhe/exemplo como se fosse o tema central." },
      { label: "B", valor: "Ela diminui o tamanho da letra." },
      { label: "C", valor: "Ela exclui as conjunções." },
      { label: "D", valor: "Ela faz o tempo de prova acabar mais cedo." },
      { label: "E", valor: "Ela ignora os adjetivos." },
    ],
    correta: "A",
    explicacao: "Alternativas que restringem o tema a apenas um ponto citado costumam ser distratores (respostas erradas)."
  },
  {
    id: 703,
    pergunta: "A 'Contradição' na prova da Cesgranrio se manifesta quando:",
    opcoes: [
      { label: "A", valor: "A alternativa diz exatamente o oposto do que o texto afirmou." },
      { label: "B", valor: "O autor usa palavras difíceis." },
      { label: "C", valor: "Duas pessoas brigam no texto." },
      { label: "D", valor: "A questão não tem gabarito." },
      { label: "E", valor: "O texto é chato." },
    ],
    correta: "A",
    explicacao: "É o erro mais fácil de detectar: a negação direta das evidências textuais."
  },
  {
    id: 704,
    pergunta: "Qual palavra absoluta costuma indicar uma 'extrapolação' incorreta?",
    opcoes: [
      { label: "A", valor: "Alguns." },
      { label: "B", valor: "Muitos." },
      { label: "C", valor: "APENAS / EXCLUSIVAMENTE." },
      { label: "D", valor: "Pode ser." },
      { label: "E", valor: "Em parte." },
    ],
    correta: "C",
    explicacao: "Generalizações ou exclusões totais raramente são a resposta correta se o texto for equilibrado."
  },
  {
    id: 705,
    pergunta: "Para evitar a armadilha da Redução, você deve:",
    opcoes: [
      { label: "A", valor: "Ler apenas o final do texto." },
      { label: "B", valor: "Entender o objetivo macro do autor antes de olhar os detalhes." },
      { label: "C", valor: "Decorar todos os substantivos." },
      { label: "D", valor: "Marcar a alternativa mais curta." },
      { label: "E", valor: "Marcar a alternativa mais longa." },
    ],
    correta: "B",
    explicacao: "A visão do todo (espinha dorsal) protege o candidato de distrações específicas."
  },
  {
    id: 706,
    pergunta: "Se o texto diz 'A segurança é importante para evitar mortes', a opção 'A segurança serve APENAS para evitar mortes' está:",
    opcoes: [
      { label: "A", valor: "Correta (é sinônimo)." },
      { label: "B", valor: "Incorreta por Extrapolação Restritiva." },
      { label: "C", valor: "Incorreta por Redução semântica." },
      { label: "D", valor: "Dizendo que mortes são inevitáveis." },
      { label: "E", valor: "Correta pois a vida é tudo." },
    ],
    correta: "B",
    explicacao: "Transformar uma utilidade ('evitar mortes') na ÚNICA ('apenas') é um erro clássico de extrapolação."
  }
];

export const QUIZ_M8_POOL: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "A banca Cesgranrio prefere textos de que natureza?",
    opcoes: [
      { label: "A", valor: "Poemas abstratos de autores vivos." },
      { label: "B", valor: "Textos informativos, jornalísticos ou ensaísticos reais." },
      { label: "C", valor: "Roteiros de teatro de comédia." },
      { label: "D", valor: "Lendas urbanas e mitos." },
      { label: "E", valor: "Receitas culinárias regionais." },
    ],
    correta: "B",
    explicacao: "A banca busca textos com linguagem padrão e argumentos estruturados."
  },
  {
    id: 802,
    pergunta: "Questões que pedem o 'Sentido Equivalente' de um conectivo testam:",
    opcoes: [
      { label: "A", valor: "Sua criatividade." },
      { label: "B", valor: "Seu domínio do vocabulário de coesão (conjunções)." },
      { label: "C", valor: "Sua caligrafia." },
      { label: "D", valor: "Seu conhecimento de física química." },
      { label: "E", valor: "Sua velocidade de digitação." },
    ],
    correta: "B",
    explicacao: "Saber que 'Embora' = 'Conquanto' é ponto ganho certo na Cesgranrio."
  },
  {
    id: 803,
    pergunta: "A expressão 'De acordo com o texto' sinaliza uma questão de:",
    opcoes: [
      { label: "A", valor: "Interpretação (dedução)." },
      { label: "B", valor: "Compreensão (literalidade)." },
      { label: "C", valor: "História do Brasil." },
      { label: "D", valor: "Geografia regional." },
      { label: "E", valor: "Ortografia oficial." },
    ],
    correta: "B",
    explicacao: "Se o enunciado diz 'De acordo...', a resposta está 'esparramada' nas linhas do texto."
  },
  {
    id: 804,
    pergunta: "Quando a Cesgranrio pergunta sobre a 'Intenção do Autor', ela quer:",
    opcoes: [
      { label: "A", valor: "O endereço residencial do autor." },
      { label: "B", valor: "O objetivo principal ou tese defendida." },
      { label: "C", valor: "O salário do autor." },
      { label: "D", valor: "A cor preferida do autor." },
      { label: "E", valor: "Nenhuma das anteriores." },
    ],
    correta: "B",
    explicacao: "Todo texto nasce para cumprir uma função sociocomunicativa (informar, criticar, sugerir)."
  },
  {
    id: 805,
    pergunta: "Em questões de nível médio da Petrobras, o vocabulário técnico da estatal:",
    opcoes: [
      { label: "A", valor: "Sempre cai e você deve saber de cor termos de engenharia." },
      { label: "B", valor: "Pode aparecer, mas o foco é na estrutura da língua, não no conhecimento técnico." },
      { label: "C", valor: "É proibido por lei." },
      { label: "D", valor: "Define 100% da prova de português." },
      { label: "E", valor: "Só cai para o cargo de médico." },
    ],
    correta: "B",
    explicacao: "O texto pode ser sobre petróleo, mas a questão será sobre o 'Mas' ou sobre o 'Apenas'."
  },
  {
    id: 806,
    pergunta: "As alternativas da Cesgranrio costumam ter que tamanho?",
    opcoes: [
      { label: "A", valor: "Uma única palavra." },
      { label: "B", valor: "Frases médias ou longas que reescrevem trechos do texto." },
      { label: "C", valor: "Páginas inteiras de leitura." },
      { label: "D", valor: "Emojis." },
      { label: "E", valor: "Listas de compras." },
    ],
    correta: "B",
    explicacao: "A banca trabalha muito com 'paráfrase' (dizer a mesma coisa com outras palavras)."
  }
];

export const QUIZ_M9_POOL: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "Qual o primeiro passo do 'Checklist Tático' ao abrir a prova?",
    opcoes: [
      { label: "A", valor: "Ler o texto 5 vezes seguidas." },
      { label: "B", valor: "Ler o enunciado da questão para identificar o que é pedido." },
      { label: "C", valor: "Pedir para ir ao banheiro." },
      { label: "D", valor: "Entregar a prova." },
      { label: "E", valor: "Fechar os olhos e meditar." },
    ],
    correta: "B",
    explicacao: "Ler o comando da questão cria um 'filtro' mental para sua leitura."
  },
  {
    id: 902,
    pergunta: "Ao encontrar uma palavra desconhecida, você deve:",
    opcoes: [
      { label: "A", valor: "Entrar em pânico e desistir." },
      { label: "B", valor: "Tentar inferir o sentido pelo contexto (palavras vizinhas)." },
      { label: "C", valor: "Inventar um significado qualquer." },
      { label: "D", valor: "Perguntar ao fiscal." },
      { label: "E", valor: "Pular o parágrafo inteiro." },
    ],
    correta: "B",
    explicacao: "Dificilmente uma única palavra isolada trava a interpretação macro."
  },
  {
    id: 903,
    pergunta: "A técnica de 'Eliminação' nas alternativas foca em buscar:",
    opcoes: [
      { label: "A", valor: "As alternativas que parecem mais bonitas." },
      { label: "B", valor: "Erros de extrapolação, redução ou contradição nas opções incorretas." },
      { label: "C", valor: "A alternativa com menos erros de ortografia." },
      { label: "D", valor: "A alternativa 'C' de 'Certo'." },
      { label: "E", valor: "A alternativa que cita o presidente." },
    ],
    correta: "B",
    explicacao: "Marcar o que está errado torna o caminho para o acerto muito mais seguro."
  },
  {
    id: 904,
    pergunta: "O checklist manda você SEMPRE voltar ao texto para:",
    opcoes: [
      { label: "A", valor: "Confirmar se a alternativa escolhida tem base literal ou inferencial válida." },
      { label: "B", valor: "Recordar o nome do autor." },
      { label: "C", valor: "Treinar a visão." },
      { label: "D", valor: "Perder tempo de propósito." },
      { label: "E", valor: "Dormir por 5 minutos." },
    ],
    correta: "A",
    explicacao: "A memória pode trair o candidato; o texto é a única prova."
  },
  {
    id: 905,
    pergunta: "Se duas alternativas parecem corretas, em 90% dos casos uma delas é:",
    opcoes: [
      { label: "A", valor: "Verdadeira mas INCOMPLETA (Redução)." },
      { label: "B", valor: "Escrita em latim." },
      { label: "C", valor: "Um erro de impressão da banca." },
      { label: "D", valor: "Copiada de outra prova." },
      { label: "E", valor: "Sobre outra matéria." },
    ],
    correta: "A",
    explicacao: "A Cesgranrio ama colocar uma verdade parcial para testar a sua atenção ao 'todo'."
  },
  {
    id: 906,
    pergunta: "O 'visto final' no comando da questão evita:",
    opcoes: [
      { label: "A", valor: "Marcar a INCORRETA quando se pede a CORRETA (e vice-versa)." },
      { label: "B", valor: "Errar a conta de luz." },
      { label: "C", valor: "Suar demais." },
      { label: "D", valor: "Sentir fome." },
      { label: "E", valor: "Esquecer o nome." },
    ],
    correta: "A",
    explicacao: "Muitos candidatos perdem a questão por não lerem o 'NÃO' ou 'EXCETO' no enunciado."
  }
];

export const QUIZ_M10_POOL: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "Texto: 'A despeito da crise global, a empresa manteve o lucro via corte de custos severo.' Pode-se concluir validamente que:",
    opcoes: [
      { label: "A", valor: "A crise global não afetou os custos da empresa." },
      { label: "B", valor: "O lucro foi consequência direta da estratégia interna, superando a barreira externa da crise." },
      { label: "C", valor: "A empresa faliu." },
      { label: "D", valor: "Corte de custos é sempre a melhor opção em qualquer situação." },
      { label: "E", valor: "O texto é um elogio ao capitalismo selvagem." },
    ],
    correta: "B",
    explicacao: "'A despeito de' indica concessão (obstáculo superado pela ação principal)."
  },
  {
    id: 1002,
    pergunta: "Em um texto sobre 'Desenvolvimento Sustentável', o autor cita 'O uso do etanol...'. Esse dado é:",
    opcoes: [
      { label: "A", valor: "O tema central do texto de forma absoluta." },
      { label: "B", valor: "Um argumento exemplificativo para sustentar a tese maior da sustentabilidade." },
      { label: "C", valor: "Uma propaganda paga da indústria de cana." },
      { label: "D", valor: "Um erro de tipologia narrativo." },
      { label: "E", valor: "O tópico frasal do último parágrafo obrigatoriamente." },
    ],
    correta: "B",
    explicacao: "Distinguir o TEMA (geral) do EXEMPLO (específico) é habilidade de elite."
  },
  {
    id: 1003,
    pergunta: "Analise: 'A transição energética requer tempo, MAS a urgência climática exige pressa.' O autor:",
    opcoes: [
      { label: "A", valor: "Invalida a necessidade de tempo." },
      { label: "B", valor: "Pesa dois fatores contraditórios, dando maior peso à 'pressa' pela posição do 'Mas'." },
      { label: "C", valor: "Diz que o clima não importa." },
      { label: "D", valor: "Apoia o uso de carvão mineral." },
      { label: "E", valor: "Está indeciso sobre o que fazer." },
    ],
    correta: "B",
    explicacao: "A oração adversativa (com mas) carrega a tônica do pensamento do autor."
  },
  {
    id: 1004,
    pergunta: "A Petrobras divulga: 'Alcançamos metas, EMBORA desafios logísticos persistam.' Infere-se que:",
    opcoes: [
      { label: "A", valor: "As metas foram fáceis." },
      { label: "B", valor: "O sucesso ocorreu apesar das dificuldades, que ainda não foram totalmente resolvidas." },
      { label: "C", valor: "Não houve desafios logísticos." },
      { label: "D", valor: "As metas serão canceladas em breve." },
      { label: "E", valor: "Persistir é o mesmo que desistir." },
    ],
    correta: "B",
    explicacao: "'Embora' + 'Persistam' indica que os problemas existem, mas não impediram o resultado."
  },
  {
    id: 1005,
    pergunta: "Qual questão de interpretação exigiria maior nível cognitivo?",
    opcoes: [
      { label: "A", valor: "Identificar o nome de um navio no primeiro parágrafo." },
      { label: "B", valor: "Relacionar a tese do autor com o uso de ironia em um advérbio modalizador." },
      { label: "C", valor: "Contar o número de vírgulas." },
      { label: "D", valor: "Saber se o texto tem título." },
      { label: "E", valor: "Achar o ano da prova." },
    ],
    correta: "B",
    explicacao: "Relacionar intenção (tese) com escolha estilística (ironia/tom) é o topo da pirâmide de leitura."
  },
  {
    id: 1006,
    pergunta: "Último passo para o gabarito garantido:",
    opcoes: [
      { label: "A", valor: "Marcar pela intuição da cor da alternativa." },
      { label: "B", valor: "Revisar se a sua escolha não infringe nenhuma das 'Três Ameaças Triplas'." },
      { label: "C", valor: "Chutar tudo na letra 'B'." },
      { label: "D", valor: "Sair correndo quando o fiscal anunciar 5 minutos." },
      { label: "E", valor: "Nenhuma das anteriores." },
    ],
    correta: "B",
    explicacao: "O filtro de Extrapolação/Redução/Contradição é o seu escudo final contra o erro."
  }
];

export const QUIZ_FINAL_POOL: QuizQuestion[] = [
  ...QUIZ_M1_POOL,
  ...QUIZ_M2_POOL,
  ...QUIZ_M3_POOL,
  ...QUIZ_M4_POOL,
  ...QUIZ_M5_POOL,
  ...QUIZ_M6_POOL,
  ...QUIZ_M7_POOL,
  ...QUIZ_M8_POOL,
  ...QUIZ_M9_POOL,
  ...QUIZ_M10_POOL
].sort(() => 0.5 - Math.random());
