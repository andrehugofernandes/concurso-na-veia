import { QuizQuestion } from '../../shared';

export const QUIZ_M1_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "O relatório diário de turno da RPBC afirma: 'A bomba de sucção 04 apresentou vibração acima do limite (5.2 mm/s), sendo desligada preventivamente às 14h00. A manutenção foi acionada e o equipamento ficou inoperante até o final do turno.' Segundo a COMPREENSÃO do texto, o que motivou o desligamento da bomba?",
    opcoes: [
      { label: "A", valor: "O fato de a bomba estar muito velha e necessitar de manutenção preventiva." },
      { label: "B", valor: "A decisão do supervisor de turno de poupar o equipamento." },
      { label: "C", valor: "A vibração excessiva registrada, que ultrapassou o limite aceitável." },
      { label: "D", valor: "A falta de energia na refinaria às 14h00." },
      { label: "E", valor: "O acionamento prévio da equipe de manutenção." },
    ],
    correta: "C",
    explicacao: "Esta é uma questão de COMPREENSÃO. O texto diz: 'apresentou vibração acima do limite (...), sendo desligada preventivamente'."
  },
  {
    id: 102,
    pergunta: "Considere o mesmo relatório do turno anterior. A partir do texto, é possível INTERPRETAR que:",
    opcoes: [
      { label: "A", valor: "O plano de manutenção da RPBC está defasado." },
      { label: "B", valor: "A bomba 04 precisará ser substituída por uma nova." },
      { label: "C", valor: "A equipe agiu de acordo com os protocolos de segurança ao detectar a anomalia." },
      { label: "D", valor: "A produção da refinaria foi interrompida completamente após as 14h00." },
      { label: "E", valor: "A vibração foi causada pela má qualidade do óleo bombeado." },
    ],
    correta: "C",
    explicacao: "Esta é uma questão de INTERPRETAÇÃO (dedução lógica). O desligamento foi 'preventivo' após registrar uma falha técnica, logo conclui-se que agiram segundo protocolos de segurança."
  },
  {
    id: 103,
    pergunta: "Um manual de operação orienta: 'Em caso de vazamento de H2S, os operadores devem colocar imediatamente as máscaras de fuga e abandonar a área perpendicularmente à direção do vento.' Evidencia-se, pelo texto, uma restrição quanto:",
    opcoes: [
      { label: "A", valor: "Ao modelo de máscara utilizado." },
      { label: "B", valor: "À forma como a equipe de resgate deve entrar no perímetro." },
      { label: "C", valor: "À trajetória ou rota para fugir do gás." },
      { label: "D", valor: "Ao número de pessoas que podem evacuar por vez." },
      { label: "E", valor: "À utilização de rádios de comunicação." },
    ],
    correta: "C",
    explicacao: "O texto impõe restrição expressa e específica à trajetória ('perpendicularmente à direção do vento')."
  },
  {
    id: 104,
    pergunta: "Em uma comunicação interna: 'A nova política de segurança no trabalho visa minimizar incidentes, não apenas por obrigação legal, mas como um compromisso com a vida dos colaboradores da Petrobras.' Podemos inferir a partir do texto que:",
    opcoes: [
      { label: "A", valor: "Houve graves acidentes recentes que obrigaram a criação da política." },
      { label: "B", valor: "A legislação é o único motivo das políticas de segurança na companhia." },
      { label: "C", valor: "A empresa quer enfatizar o valor humano como motivação da segurança, acima da burocracia." },
      { label: "D", valor: "As regras anteriores eram ineficientes para salvar vidas." },
      { label: "E", valor: "Os colaboradores não se importavam com as obrigações legais." },
    ],
    correta: "C",
    explicacao: "A expressão 'não apenas por obrigação legal, mas como um compromisso com a vida' enfatiza o valor humano."
  },
  {
    id: 105,
    pergunta: "Qual a principal diferença entre COMPREENSÃO de texto e INTERPRETAÇÃO de texto focada em editais como da CESGRANRIO?",
    opcoes: [
      { label: "A", valor: "A compreensão foca na intenção secreta do autor, a interpretação foca na resposta direta." },
      { label: "B", valor: "A compreensão decodifica os fatos explícitos, enquanto a interpretação estabelece conclusões lógicas sobre o que está implícito." },
      { label: "C", valor: "Saber compreensão é saber a gramática, saber interpretação é entender crase." },
      { label: "D", valor: "A compreensão substitui o texto, a interpretação não." },
      { label: "E", valor: "A interpretação não usa o texto, apenas a criatividade." },
    ],
    correta: "B",
    explicacao: "Compreensão foca na leitura nua e crua; Interpretação engloba subentendidos, elipses e pressupostos lógicos suportados pelo texto."
  },
  {
    id: 106,
    pergunta: "No trecho do manual técnico: 'A purga do tanque 02 deve ser feita com N2 para evitar atmosfera explosiva', de acordo com a decodificação exata do texto (compreensão), qual o motivo da utilização do Gás Nitrogênio (N2)?",
    opcoes: [
      { label: "A", valor: "Para que o gás mais leve escape rapidamente pelas válvulas de alívio." },
      { label: "B", valor: "Para reduzir o custo da operação no curto prazo." },
      { label: "C", valor: "Para evitar a formação de uma atmosfera com risco de explosão." },
      { label: "D", valor: "Para resfriar a parede metálica do tanque 02." },
      { label: "E", valor: "Para sinalizar a conclusão do esvaziamento." },
    ],
    correta: "C",
    explicacao: "Compreensão pura: 'para evitar atmosfera explosiva', conforme literalmente expresso."
  }
];

export const QUIZ_M2_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "No trecho: 'Em 2024, a Petrobras reduziu em 15% as emissões atmosféricas em suas plataformas do pré-sal devido à modernização dos compressores principais.' Qual das seguintes alternativas apresenta um erro de Extrapolação?",
    opcoes: [
      { label: "A", valor: "O ano de 2024 registrou uma diminuição nas emissões nessas plataformas." },
      { label: "B", valor: "Os compressores principais passaram por um processo tecnológico." },
      { label: "C", valor: "A modernização dos compressores foi capaz de eliminar por completo a poluição das plataformas do pré-sal." },
      { label: "D", valor: "A Petrobras agiu para minimizar o impacto ambiental em algumas instalações." },
      { label: "E", valor: "A modernização de um equipamento teve correlação com o índice de emissões." },
    ],
    correta: "C",
    explicacao: "Afirmar que 'eliminou por completo' ultrapassa a marca de 'reduziu em 15%'. Isso é extrapolar a leitura."
  },
  {
    id: 202,
    pergunta: "Ao concluir que 'Um acidente ocorreu na refinaria pois as regras de segurança são inúteis' a partir de um relatório sobre falha humana em procedimento de solda, comete-se principalmente erro de:",
    opcoes: [
      { label: "A", valor: "Redução." },
      { label: "B", valor: "Concordância." },
      { label: "C", valor: "Explicitação." },
      { label: "D", valor: "Incoerência argumentativa." },
      { label: "E", valor: "Extrapolação severa." },
    ],
    correta: "E",
    explicacao: "Concluir pela 'inutilidade' de regras em decorrência de 'falha humana' cria conclusões para além das evidências dadas."
  },
  {
    id: 203,
    pergunta: "Texto: 'A plataforma P-70 demonstrou eficiência devido aos seus potentes geradores, apesar das frequentes falhas no sistema de telecomunicações'. Das inferências abaixo, qual constitui um ERRO por REDUÇÃO?",
    opcoes: [
      { label: "A", valor: "A plataforma P-70 possui múltiplos geradores eficientes." },
      { label: "B", valor: "A eficiência da plataforma P-70 se deve fundamentalmente ao sistema de telecomunicações ser quebrado." },
      { label: "C", valor: "As telecomunicações formam um sistema imune neste cenário." },
      { label: "D", valor: "A plataforma P-70 é uma unidade essencial e globalmente problemática falida puramente por suas telecomunicações." },
      { label: "E", valor: "O texto afirma que gerador é inútil." },
    ],
    correta: "D",
    explicacao: "Considerar a ilha como inteiramente problemática e basear o juízo apenas na falha de telecomunicações, reduzindo o todo a uma parte pequena referida com 'Apesar de'."
  },
  {
    id: 204,
    pergunta: "A Contradição (outro vício de interpretação) ocorre quando:",
    opcoes: [
      { label: "A", valor: "Conclui-se o oposto do que foi afirmado pelo texto." },
      { label: "B", valor: "O tempo verbal no passado é alterado para o futuro." },
      { label: "C", valor: "O autor usa palavras feias." },
      { label: "D", valor: "Citam-se números do PIB." },
      { label: "E", valor: "O tema se espalha demasiadamente." },
    ],
    correta: "A",
    explicacao: "Simples, contradizer é defender o oposto lógico do postulado no texto."
  },
  {
    id: 205,
    pergunta: "Qual destas partículas em alternativas de simulados CESGRANRIO costumam caracterizar armadilhas de extrapolação em interpretação?",
    opcoes: [
      { label: "A", valor: "Sempre, Nunca, Exclusivamente, Totalmente, Apenas." },
      { label: "B", valor: "Talvez, Possivelmente, Pode ser." },
      { label: "C", valor: "Conecta, Relaciona, Sugere." },
      { label: "D", valor: "Eventualmente, Aparentemente." },
      { label: "E", valor: "No geral, Parte de." },
    ],
    correta: "A",
    explicacao: "Palavras de restrição universal fecham a margem do raciocínio, e o CESGRANRIO usa muito o 'APENAS' pra tornar uma opção incorreta por Extrapolação excludente."
  },
  {
    id: 206,
    pergunta: "Leia o erro: Texto 'Todos os novatos farão treinamento de Risco Level 2'. Conclusão do aluno: 'Apenas os novatos lidarão com riscos na filial'. Esse erro é categorizado como:",
    opcoes: [
      { label: "A", valor: "Dedução perdoável." },
      { label: "B", valor: "Restrição Extrapolativa indevida." },
      { label: "C", valor: "Compreensão de elite." },
      { label: "D", valor: "Sintaxe desbalanceada." },
      { label: "E", valor: "Interpretação coerente." },
    ],
    correta: "B",
    explicacao: "Concluir que 'APENAS' os novatos farão, simplesmente pelo fato do texto avisar aos novatos que devem ir fazer o curso, consiste na inclusão da restrição, quando o autor não restringiu."
  }
];

export const QUIZ_M3_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Texto: 'Apesar de ter concluído o conserto mecânico do gerador antes do anoitecer, João notou que as luzes do painel secundário ainda permaneciam vermelhas.' O verbo 'permanecer' atua como marcador que PRESSUPÕE logicamente que:",
    opcoes: [
      { label: "A", valor: "O painel apresentava status de emergência novinho em folha." },
      { label: "B", valor: "A noite chegou e acendeu luzes extras." },
      { label: "C", valor: "As luzes do painel já estavam vermelhas antes mesmo do conserto." },
      { label: "D", valor: "O conserto causou o curto-circuito vermelho." },
      { label: "E", valor: "O painel indicava superaquecimento solar." },
    ],
    correta: "C",
    explicacao: "'Permanecer' indica continuidade. Se a luz continuou vermelha é porque ANTES também estava vermelha."
  },
  {
    id: 302,
    pergunta: "A frase 'Os estagiários de instrumentação JÁ começaram a ler os manuais.' permite pressupor validamente (pela presença de 'JÁ') que:",
    opcoes: [
      { label: "A", valor: "Eles deveriam ter lido de manhã, e não agora." },
      { label: "B", valor: "Até algum momento imediatamente anterior a essa fala, os manuais não estavam sendo lidos por eles." },
      { label: "C", valor: "Eles leram absurdamente rápido." },
      { label: "D", valor: "A chefia os pressionou duramente." },
      { label: "E", valor: "Instrumentação é a área mais focada na estatal." },
    ],
    correta: "B",
    explicacao: "O advérbio 'já' nesse contexto funciona como marcador de transição para uma nova ação que anteriormente não acontecia."
  },
  {
    id: 303,
    pergunta: "O Tópico Frasal de um parágrafo focado no ensino CESGRANRIO é tipicamente:",
    opcoes: [
      { label: "A", valor: "A junção de três pontos de interrogação aleatórios." },
      { label: "B", valor: "O fim do parágrafo, invariavelmente, para chocar o receptor." },
      { label: "C", valor: "A ideia nuclear e diretiva na qual o restante daquele bloco de texto repousa." },
      { label: "D", valor: "Sempre uma piada amena quebra ganchos." },
      { label: "E", valor: "O resumo do conto final de Machado de Assis." },
    ],
    correta: "C",
    explicacao: "Tópico Frasal (frequentemente na abertura) ancora a tese / ideia principal do parágrafo servindo de bússola."
  },
  {
    id: 304,
    pergunta: "Texto corporativo da norma: 'FELIZMENTE, a inspeção não detectou microfissuras'. O advérbio destacado demonstra SUBENTENDIDO do autor que:",
    opcoes: [
      { label: "A", valor: "Desejava que o equipamento se rompesse por vingança corporativa." },
      { label: "B", valor: "Temia a consequência da quebra de microfissuras e avalia isso como positivo." },
      { label: "C", valor: "Festeja o erro de inspeção." },
      { label: "D", valor: "Despreza o time de manutenção do gasoduto." },
      { label: "E", valor: "Enfatiza que inspeção visual manual é uma maravilha técnica." },
    ],
    correta: "B",
    explicacao: "Advérbio modalizador que traduz ALÍVIO, deixando subentendido que o diagnóstico oposto era um cenário que devia instigar temores graves e catastróficos."
  },
  {
    id: 305,
    pergunta: "O texto dissertativo argumentativo difere do texto narrativo em qual pilar crucial?",
    opcoes: [
      { label: "A", valor: "A presença de diálogos (só argumentativos exibem muito)." },
      { label: "B", valor: "No emprego esmagador do passado épico." },
      { label: "C", valor: "No compromisso com a defesa de uma Tese (ponto de vista), em detrimento da mera evolução temporal de personagens." },
      { label: "D", valor: "No uso de figuras de estilo." },
      { label: "E", valor: "Em utilizar exclusivamente ordens absolutas de manual." },
    ],
    correta: "C",
    explicacao: "O texto dissertativo busca CONVENCER você de uma ideia ou fato; o Narrativo retrata evolução de personagens no tempo e espaço."
  },
  {
    id: 306,
    pergunta: "Uma instrução na bomba diz: 1) Quebre o vidro, 2) Aperte o botão vermelho. Pertence ao tipo textual predominante:",
    opcoes: [
      { label: "A", valor: "Dissertativo." },
      { label: "B", valor: "Injuntivo (ou instrucional)." },
      { label: "C", valor: "Descritivo poético." },
      { label: "D", valor: "Narrativo épico." },
      { label: "E", valor: "Retrato social." },
    ],
    correta: "B",
    explicacao: "O caráter injuntivo obriga / ensina caminhos (imperativo verbal presente como 'Aperte', 'Quebre')."
  }
];

export const QUIZ_M4_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "O que caracteriza a TIPOLOGIA Descritiva em relatórios de ocorrências da refinaria?",
    opcoes: [
      { label: "A", valor: "Progressão estática focada nas características precisas e imagéticas do maquinário sob estudo." },
      { label: "B", valor: "Um vai e volta no tempo para descrever heróis míticos." },
      { label: "C", valor: "Apelo moral e retórico na ordem direta sobre segurança de laboratório." },
      { label: "D", valor: "Exaltação de hipóteses contrárias do chefe da equipe." },
      { label: "E", valor: "Ausência absurda de adjetivos técnicos ou de localidade." },
    ],
    correta: "A",
    explicacao: "A Descrição pinta um 'quadro fotográfico' pautado em substantivos, adjetivos e estado estático."
  },
  {
    id: 402,
    pergunta: "Relacionando Tipo vs Gênero: Um 'Editorial' publicado por uma revista especializada na área fóssil sobre tendências de energia representa predominantemente...",
    opcoes: [
      { label: "A", valor: "Qualquer tipo textual aleatório. O Gênero Editorial não é regrado." },
      { label: "B", valor: "O Tipo Textual Injunção. É feito pra forçar compra de equipamentos." },
      { label: "C", valor: "O Tipo Textual Dissertativo-Argumentativo, pois reflete e defende ativamente o peso das visões estruturais do dono/revista." },
      { label: "D", valor: "A Narrativa Descritiva." },
      { label: "E", valor: "O Esclarecimento Biográfico dos jornalistas." },
    ],
    correta: "C",
    explicacao: "Editorial é um Gênero cujo escopo formal primário e núcleo repousa na TESE do conselho de veículo sobre algum eixo; logo pauta-se no tipo Dissertativo-Argumentativo."
  },
  {
    id: 403,
    pergunta: "A técnica de 'Skimming' num texto sobre exploração profunda nas águas do pré-sal para prova requer...",
    opcoes: [
      { label: "A", valor: "Grifo integral minucioso traduzindo vocábulo por vocábulo num dicionário bilíngue ausente na caneta." },
      { label: "B", valor: "Que a leitura passeie e capture velozmente títulos, subtítulos, primeira frase do parágrafo, apurando TÓPICO e DIREÇÃO GLOBAL antes das minúcias." },
      { label: "C", valor: "Sistematização métrica poética." },
      { label: "D", valor: "Ler só as conjunções que existam e nada mais do vocabulário industrial ali presente." },
      { label: "E", valor: "Pular três parágrafos para confundir sua mente." },
    ],
    correta: "B",
    explicacao: "Essa é a exata tradução procedimental da estratégia rápida Skimming da compreensão macro da CESGRANRIO."
  },
  {
    id: 404,
    pergunta: "Um erro muito grave do aluno diante de afirmações de gabarito CESGRANRIO em 'Interpretação' se dá quando...",
    opcoes: [
      { label: "A", valor: "Busca justificar suas inferências nas pressões do prefixo ou conjunções." },
      { label: "B", valor: "Substitui e infere a resposta sobre a Tese por meros exemplos menores usados para provar um ponto, praticando o erro de Redução da espinha ideológica." },
      { label: "C", valor: "Analisou o conector Adversativo e tirou deduções contrárias da primeira sentenca da frase de cima." },
      { label: "D", valor: "Faz marcações no Tópico Frasal de cada parágrafo com a caneta azul do edital de Petrobras para ganhar agilidade posterior em releituras lógicas." },
      { label: "E", valor: "Revisa se leu adequadamente as partículas restritivas como SÓ, APENAS, e EXCLUSIVAMENTE nas perguntas sem ver o gabarito." },
    ],
    correta: "B",
    explicacao: "Tomar o 'exemplo / exceção' narrado em três linhas para ilustrar algo como SE ELE FOSSE O TEMA ÚNICO do texto todo e marcar que 'Fala exclusivamente sobre...' "
  },
  {
    id: 405,
    pergunta: "'A petroquímica vive um revés, ***POR conseguinte*** haverá contenção severa...'. O conector em destaque aponta para:",
    opcoes: [
      { label: "A", valor: "Exceção." },
      { label: "B", valor: "Causa base no pretérito atrelado." },
      { label: "C", valor: "Concessão inútil." },
      { label: "D", valor: "Finalidade intencional (A fim de)." },
      { label: "E", valor: "Conclusão ou efeito submetido, atestando caráter ilativo ou causal entre a contingência." },
    ],
    correta: "E",
    explicacao: "'Por conseguinte' e 'logo', 'portanto' ligam efeitos conclusivos entre os blocos discursivos. Fundamental na coesão argumentativa progressiva das análises de prova."
  },
  {
    id: 406,
    pergunta: "A CESGRANRIO costuma questionar 'Qual a função da palavra X destacada na oração do parágrafo 3'. Para o candidato responder correto... ele precisará:",
    opcoes: [
      { label: "A", valor: "Deixá-la ser definida no seu próprio juizado morfológico avulso sem regresso ao texto antes do concurso." },
      { label: "B", valor: "Examinar a articulação que ela desempenha ligando termos de suborno entre frases de referência cruzada, buscando Coesão Referencial atestada dentro de sua frase ou afora referindo-se atrás ou pra frente. O famigerado Referencial CATAfórico ou Anafórico nas provas de nível médio Petrobras, mesmo as polimórficas técnicas da Engenharia que demandam análise lógica." },
      { label: "C", valor: "Saber só a sílaba tônica final da mesma pra fins sintáticos avulsos no escopo do texto, descartando a interpretação crua ou seu eixo interpretativo." },
      { label: "D", valor: "Somar os acentos agudos e separar pela divisão verbal totalitária contínua." },
      { label: "E", valor: "Nada; marcar D e fugir em pânico." },
    ],
    correta: "B",
    explicacao: "A CESGRANRIO atesta que funções de classe de palavras remetem, na Intertextualidade, na Interpretação de pronomes ou conectivos, nas articulações endofóricas e dêiticas; buscando a força e quem tal sujeito aponta na narrativa pregressa."
  }
];

export const QUIZ_FINAL_POOL: QuizQuestion[] = [
  ...QUIZ_M1_POOL,
  ...QUIZ_M2_POOL,
  ...QUIZ_M3_POOL,
  ...QUIZ_M4_POOL
].sort(() => 0.5 - Math.random()).slice(0, 10);
