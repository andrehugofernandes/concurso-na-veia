import { QuizQuestion } from "../../shared";

// Pool de Questões - Aula: Reescritura de Frases (Padrão 2026 Cesgranrio)

export const QUIZ_M1_REESCRITA: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "Segundo o padrão Cesgranrio, o que define uma reescritura como 'correta'?",
    opcoes: [
      { label: "A", valor: "Apenas a manutenção do sentido original, mesmo com desvios gramaticais." },
      { label: "B", valor: "Apenas a correção gramatical rigorosa, independentemente da semântica." },
      { label: "C", valor: "O binômio indissociável: Sentido Original Intacto + Norma Culta Plena." },
      { label: "D", valor: "A simplificação do texto para torná-lo mais acessível ao leigo." },
      { label: "E", valor: "O uso obrigatório de sinônimos eruditos para elevar o nível do texto." },
    ],
    correta: "C",
    explicacao: "A banca exige que a nova frase diga EXATAMENTE o que a original disse, sem perder um átomo de sentido, e que esteja 100% dentro das regras gramaticais.",
  },
  {
    id: 102,
    pergunta: "Num relatório de segurança da Petrobras, a frase 'O incidente ocorreu devido à falha humana' é reescrita. Qual opção preserva o sentido?",
    opcoes: [
      { label: "A", valor: "A falha humana causou, talvez, o incidente." },
      { label: "B", valor: "O incidente foi provocado pela falha humana." },
      { label: "C", valor: "Houve um incidente e, após, uma falha humana." },
      { label: "D", valor: "A falha humana é uma consequência do incidente." },
      { label: "E", valor: "Devido ao incidente, ocorreu a falha humana." },
    ],
    correta: "B",
    explicacao: "A opção B mantém a relação de causa (falha humana) e efeito (incidente) usando a voz passiva, preservando a certeza do fato.",
  },
  {
    id: 103,
    pergunta: "Ao reescrever 'Talvez a sonda apresente defeito', qual alteração é FATAL para o sentido?",
    opcoes: [
      { label: "A", valor: "É possível que a sonda apresente defeito." },
      { label: "B", valor: "Pode ser que a sonda venha a apresentar defeito." },
      { label: "C", valor: "A sonda apresentará defeito." },
      { label: "D", valor: "Quiçá a sonda apresente defeito." },
      { label: "E", valor: "Existe a chance de a sonda apresentar defeito." },
    ],
    correta: "C",
    explicacao: "O original expressa DÚVIDA (talvez). A opção C expressa CERTEZA (apresentará). Na Cesgranrio, mudar o modo verbal (certeza vs dúvida) invalida a reescrita.",
  },
  {
    id: 104,
    pergunta: "Na frase 'Conquanto o lucro tenha subido, as ações caíram', a reescrita correta é:",
    opcoes: [
      { label: "A", valor: "Como o lucro subiu, as ações caíram." },
      { label: "B", valor: "Já que o lucro subiu, as ações caíram." },
      { label: "C", valor: "Embora o lucro tenha subido, as ações caíram." },
      { label: "D", valor: "As ações caíram porque o lucro subiu." },
      { label: "E", valor: "Sempre que o lucro sobe, as ações caem." },
    ],
    correta: "C",
    explicacao: "'Conquanto' é uma conjunção concessiva, exatamente como 'embora'. As outras opções indicam causa (A, B, D) ou tempo (E).",
  },
  {
    id: 105,
    pergunta: "Qual o maior 'pecado' cometido em reescritas de textos técnicos industriais?",
    opcoes: [
      { label: "A", valor: "O uso de siglas conhecidas no setor." },
      { label: "B", valor: "A inversão da ordem sujeito-verbo." },
      { label: "C", valor: "A extrapolação (adicionar informações não contidas no original)." },
      { label: "D", valor: "A manutenção do mesmo tempo verbal." },
      { label: "E", valor: "O uso de voz passiva pronominal." },
    ],
    correta: "C",
    explicacao: "Extrapolar é 'viajar' na interpretação, adicionando detalhes que o autor não deu. A reescrita deve ser fiel aos limites do texto original.",
  },
  {
    id: 106,
    pergunta: "A frase 'O projeto visa ao lucro' é reescrita corretamente em:",
    opcoes: [
      { label: "A", valor: "O projeto visa o lucro." },
      { label: "B", valor: "O projeto tem como objetivo o lucro." },
      { label: "C", valor: "O lucro é visado pelo projeto." },
      { label: "D", valor: "Visa-se o lucro com o projeto." },
      { label: "E", valor: "O projeto enxerga o lucro." },
    ],
    correta: "B",
    explicacao: "A opção B preserva a ideia de finalidade e mantém a correção gramatical. A opção A erra a regência do verbo 'visar' (sentido de almejar exige preposição 'a').",
  }
];

export const QUIZ_M2_TECNICAS: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Ao substituir 'O gerente ratificou a decisão' por 'O gerente retificou a decisão', o que ocorre?",
    opcoes: [
      { label: "A", valor: "O sentido é preservado integralmente." },
      { label: "B", valor: "O sentido é invertido (confirmar vira corrigir)." },
      { label: "C", valor: "Apenas o som da palavra muda, mas o campo semântico é o mesmo." },
      { label: "D", valor: "A frase torna-se agramatical." },
      { label: "E", valor: "A regência do verbo muda obrigatoriamente." },
    ],
    correta: "B",
    explicacao: "Ratificar = Confirmar. Retificar = Corrigir. São parônimos perigosos em provas de reescrita.",
  },
  {
    id: 202,
    pergunta: "Num manual de operação, a palavra 'Intermitente' pode ser reescrita sem perda de sentido como:",
    opcoes: [
      { label: "A", valor: "Contínuo." },
      { label: "B", valor: "Ininterrupto." },
      { label: "C", valor: "Descontínuo ou em intervalos." },
      { label: "D", valor: "Permanente." },
      { label: "E", valor: "Acelerado." },
    ],
    correta: "C",
    explicacao: "Intermitente refere-se ao que para e volta, ou seja, descontínuo. As outras opções são antônimas.",
  },
  {
    id: 203,
    pergunta: "Qual das palavras abaixo NÃO substitui 'Paulatinamente' preservando o sentido original?",
    opcoes: [
      { label: "A", valor: "Gradualmente." },
      { label: "B", valor: "Aos poucos." },
      { label: "C", valor: "Celeremente." },
      { label: "D", valor: "Passo a passo." },
      { label: "E", valor: "De forma progressiva." },
    ],
    correta: "C",
    explicacao: "Paulatinamente = devagar, aos poucos. Celeremente = rápido, com pressa.",
  },
  {
    id: 204,
    pergunta: "A troca de registro linguístico de 'O pessoal tá vindo' para 'Os colaboradores estão chegando' é:",
    opcoes: [
      { label: "A", valor: "Inválida por mudar o significado de 'pessoal'." },
      { label: "B", valor: "Válida em termos de reescritura de sentido e obrigatória para a norma culta." },
      { label: "C", valor: "Inválida por mudar o tempo verbal." },
      { label: "D", valor: "Válida apenas em textos poéticos." },
      { label: "E", valor: "Errada, pois 'pessoal' é substantivo abstrato neste caso." },
    ],
    correta: "B",
    explicacao: "A reescrita frequentemente exige a subida do nível de registro (do informal para o formal) mantendo o nexo semântico.",
  },
  {
    id: 205,
    pergunta: "Substituir 'Ao meu ver' por 'A meu ver' numa reescrita:",
    opcoes: [
      { label: "A", valor: "Muda o sentido da frase." },
      { label: "B", valor: "Corrige um vício de linguagem mantendo o sentido." },
      { label: "C", valor: "É indiferente, ambas são aceitas pela banca." },
      { label: "D", valor: "É um erro de regência nominal." },
      { label: "E", valor: "Torna a frase excessivamente coloquial." },
    ],
    correta: "B",
    explicacao: "A forma correta na norma culta é 'A meu ver' (sem artigo). A reescrita que remove o 'o' é considerada enriquecimento gramatical.",
  },
  {
    id: 206,
    pergunta: "O termo 'Inexorável' numa reescrita sobre o tempo pode ser trocado por:",
    opcoes: [
      { label: "A", valor: "Incontestável." },
      { label: "B", valor: "Inevitável / que não se pode evitar." },
      { label: "C", valor: "Lento." },
      { label: "D", valor: "Rápido." },
      { label: "E", valor: "Passageiro." },
    ],
    correta: "B",
    explicacao: "Inexorável é aquilo que não cede a rogos, ou seja, implacável ou inevitável.",
  }
];

export const QUIZ_M3_VOZES: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Transpondo 'A equipe de manutenção realizou a inspeção' para a voz passiva, obtemos:",
    opcoes: [
      { label: "A", valor: "A inspeção seria realizada pela equipe." },
      { label: "B", valor: "A inspeção foi realizada pela equipe." },
      { label: "C", valor: "Realizou-se a inspeção pela equipe." },
      { label: "D", valor: "A equipe havia realizado a inspeção." },
      { label: "E", valor: "Estará sendo realizada a inspeção." },
    ],
    correta: "B",
    explicacao: "O verbo 'realizou' está no pretérito perfeito. A voz passiva correspondente exige o auxiliar 'ser' no pretérito perfeito (foi realizada).",
  },
  {
    id: 302,
    pergunta: "Qual a reescrita em voz passiva pronominal de 'Injetaram produtos químicos no poço'?",
    opcoes: [
      { label: "A", valor: "Produtos químicos foram injetados no poço." },
      { label: "B", valor: "Injetou-se produtos químicos no poço." },
      { label: "C", valor: "Injetaram-se produtos químicos no poço." },
      { label: "D", valor: "Tinha-se injetado produtos químicos." },
      { label: "E", valor: "Produtos químicos injetaram-se no poço." },
    ],
    correta: "C",
    explicacao: "Voz passiva pronominal com sujeito plural (produtos químicos) exige verbo no plural: Injetaram-se.",
  },
  {
    id: 303,
    pergunta: "Ao passar 'As metas serão alcançadas' para a voz ativa, o sentido original é mantido em:",
    opcoes: [
      { label: "A", valor: "Alcançaremos as metas." },
      { label: "B", valor: "Alcançariam as metas." },
      { label: "C", valor: "Alcançamos as metas." },
      { label: "D", valor: "Tínhamos alcançado as metas." },
      { label: "E", valor: "Alcançava-se as metas." },
    ],
    correta: "A",
    explicacao: "Voz passiva no futuro (serão alcançadas) converte-se em voz ativa também no futuro (alcançaremos - sujeito indeterminado ou oculto subentendido).",
  },
  {
    id: 304,
    pergunta: "A frase 'Ouvem-se vozes no pátio' é a reescrita de:",
    opcoes: [
      { label: "A", valor: "Vozes são ouvidas no pátio." },
      { label: "B", valor: "Alguém ouve vozes no pátio." },
      { label: "C", valor: "Ouviu-se vozes no pátio." },
      { label: "D", valor: "A e B estão corretas e mantêm o sentido passivo." },
      { label: "E", valor: "Apenas B está correta." },
    ],
    correta: "D",
    explicacao: "A voz passiva pronominal (Ouvem-se vozes) equivale tanto à passiva analítica (Vozes são ouvidas) quanto à ativa com sujeito indeterminado.",
  },
  {
    id: 305,
    pergunta: "Por que 'Precisa-se de técnicos' não admite a forma 'Técnicos são precisados'?",
    opcoes: [
      { label: "A", valor: "Porque o verbo é intransitivo." },
      { label: "B", valor: "Porque há preposição protegendo o objeto, tornando o 'se' um índice de indeterminação." },
      { label: "C", valor: "Porque a frase está no plural." },
      { label: "D", valor: "Porque o sentido de 'precisar' muda na passiva." },
      { label: "E", valor: "É permitido, mas a banca não gosta." },
    ],
    correta: "B",
    explicacao: "Verbos com preposição (VTI) + SE não admitem voz passiva. O 'se' é IIs e a frase é ativa com sujeito indeterminado.",
  },
  {
    id: 306,
    pergunta: "Reescrevendo 'O engenheiro deu a ordem', a passiva deve ser:",
    opcoes: [
      { label: "A", valor: "Deu-se a ordem." },
      { label: "B", valor: "A ordem foi dada pelo engenheiro." },
      { label: "C", valor: "Fora dada a ordem pelo engenheiro." },
      { label: "D", valor: "A e B mantêm o sentido, embora B seja mais completa." },
      { label: "E", valor: "Tinha sido dado a ordem." },
    ],
    correta: "D",
    explicacao: "Ambas as formas são passivas. A 'A' oculta o agente, mas mantém a estrutura de sentido passivo do objeto original.",
  }
];

export const QUIZ_M4_DISCURSO: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Ao transpor 'Eu pretendo investir agora' para o discurso indireto, temos:",
    opcoes: [
      { label: "A", valor: "Ele disse que eu pretendo investir agora." },
      { label: "B", valor: "Ele afirmou que pretendia investir naquele momento." },
      { label: "C", valor: "Ele declarou que pretende investir ontem." },
      { label: "D", valor: "Dizia ele que pretendia investir agora." },
      { label: "E", valor: "A e B são sinônimos." },
    ],
    correta: "B",
    explicacao: "No discurso indireto, o tempo 'presente' vira 'pretérito imperfeito' e o advérbio 'agora' vira 'naquele momento'.",
  },
  {
    id: 402,
    pergunta: "O discurso direto 'Iremos amanhã' vira, no indireto:",
    opcoes: [
      { label: "A", valor: "Eles disseram que iriam amanhã." },
      { label: "B", valor: "Eles disseram que iriam no dia seguinte." },
      { label: "C", valor: "Eles afirmaram que foram amanhã." },
      { label: "D", valor: "Eles disseram que vão amanhã." },
      { label: "E", valor: "No dia seguinte eles foram." },
    ],
    correta: "B",
    explicacao: "Futuro do presente (iremos) vira futuro do pretérito (iriam). Amanhã vira dia seguinte.",
  },
  {
    id: 403,
    pergunta: "Qual o ajuste pronominal em 'Comprei este livro aqui' para o discurso indireto?",
    opcoes: [
      { label: "A", valor: "Disse que comprou este livro aqui." },
      { label: "B", valor: "Disse que comprara aquele livro ali." },
      { label: "C", valor: "Afirmou que tínhamos comprado este livro aqui." },
      { label: "D", valor: "Disse: comprei este livro aqui." },
      { label: "E", valor: "Nenhum ajuste é necessário." },
    ],
    correta: "B",
    explicacao: "Este -> Aquele. Aqui -> Ali. Pretérito Perfeito -> Pretérito Mais-Que-Perfeito.",
  },
  {
    id: 404,
    pergunta: "Na frase 'O diretor gritou: — Saiam todos!', a reescrita indireta é:",
    opcoes: [
      { label: "A", valor: "O diretor gritou que saiam todos." },
      { label: "B", valor: "O diretor ordenou que todos saíssem." },
      { label: "C", valor: "O diretor pediu que saiam todos." },
      { label: "D", valor: "Todos saíram quando o diretor gritou." },
      { label: "E", valor: "O grito do diretor fez todos saírem." },
    ],
    correta: "B",
    explicacao: "O imperativo (saiam) converte-se no pretérito imperfeito do subjuntivo (saíssem) no discurso indireto.",
  },
  {
    id: 405,
    pergunta: "Qual o tempo verbal do discurso direto que NÃO muda no indireto (se o verbo de elocução for passado)?",
    opcoes: [
      { label: "A", valor: "Presente do Indicativo." },
      { label: "B", valor: "Pretérito Perfeito." },
      { label: "C", valor: "Pretérito Mais-Que-Perfeito." },
      { label: "D", valor: "Futuro do Presente." },
      { label: "E", valor: "Todos mudam obrigatoriamente." },
    ],
    correta: "C",
    explicacao: "O mais-que-perfeito já é o tempo mais 'atrás' na linha do tempo, por isso ele se mantém estável na transposição.",
  },
  {
    id: 406,
    pergunta: "'Estaremos lá hoje', disse ela. Indireto:",
    opcoes: [
      { label: "A", valor: "Ela disse que estariam lá aquele dia." },
      { label: "B", valor: "Ela disse que estarão lá hoje." },
      { label: "C", valor: "Ela afirmara que estavam lá hoje." },
      { label: "D", valor: "Estaríamos lá hoje, disse ela." },
      { label: "E", valor: "Ela disse que hoje estariam lá." },
    ],
    correta: "A",
    explicacao: "Hoje -> Aquele dia. Estaremos -> Estariam.",
  }
];

export const QUIZ_M5_NOMINALIZACAO: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "A frase 'É fundamental que o Brasil produza energia' vira:",
    opcoes: [
      { label: "A", valor: "Fundamental é produzir energia no Brasil." },
      { label: "B", valor: "A produção de energia pelo Brasil é fundamental." },
      { label: "C", valor: "O Brasil deve produzir energia fundamentalmente." },
      { label: "D", valor: "Energia o Brasil produz fundamentalmente." },
      { label: "E", valor: "O Brasil produzindo energia é algo fundamental." },
    ],
    correta: "B",
    explicacao: "A oração subjetiva 'que o Brasil produza' foi convertida no sintagma nominal 'A produção... pelo Brasil'.",
  },
  {
    id: 502,
    pergunta: "Nominalizar 'Ocorreram erros durante a perfuração' resulta em:",
    opcoes: [
      { label: "A", valor: "A ocorrência de erros durante a perfuração." },
      { label: "B", valor: "Erros ocorridos na perfuração." },
      { label: "C", valor: "Durante a perfuração, erros houve." },
      { label: "D", valor: "A e B estão corretas, dependendo do contexto." },
      { label: "E", valor: "Apenas A é a nominalização pura." },
    ],
    correta: "E",
    explicacao: "Nominalizar é transformar o verbo principal (ocorreram) em substantivo (ocorrência).",
  },
  {
    id: 503,
    pergunta: "Qual o benefício da nominalização em textos da Petrobras?",
    opcoes: [
      { label: "A", valor: "Torna o texto mais poético." },
      { label: "B", valor: "Confere impessoalidade e objetividade técnica." },
      { label: "C", valor: "Aumenta o número de palavras do texto." },
      { label: "D", valor: "Permite usar gírias do campo de petróleo." },
      { label: "E", valor: "Obriga o uso de crase." },
    ],
    correta: "B",
    explicacao: "Substantivar ações remove o foco do agente e foca no fato, padrão essencial do texto técnico e burocrático.",
  },
  {
    id: 504,
    pergunta: "Reescrevendo 'Decidiram adiar a obra', temos:",
    opcoes: [
      { label: "A", valor: "A decisão do adiamento da obra." },
      { label: "B", valor: "Adiaram a obra por decisão." },
      { label: "C", valor: "Ficou resolvido o adiamento." },
      { label: "D", valor: "A obra foi adiada por eles." },
      { label: "E", valor: "A decisão foi adiar a obra." },
    ],
    correta: "A",
    explicacao: "A nominalização de 'decidiram' é 'decisão' e de 'adiar' é 'adiamento'.",
  },
  {
    id: 505,
    pergunta: "'A empresa investiu pesado'. Nominalizada para virar sujeito de outra frase:",
    opcoes: [
      { label: "A", valor: "O investimento pesado da empresa..." },
      { label: "B", valor: "Investindo pesado, a empresa..." },
      { label: "C", valor: "A empresa, que investiu pesado..." },
      { label: "D", valor: "Dado o investimento pesado..." },
      { label: "E", valor: "Se a empresa investiu..." },
    ],
    correta: "A",
    explicacao: "O substantivo 'investimento' encapsula a ação original.",
  },
  {
    id: 506,
    pergunta: "A nominalização de 'resistir' é:",
    opcoes: [
      { label: "A", valor: "Resistido." },
      { label: "B", valor: "Resistência." },
      { label: "C", valor: "Resistente." },
      { label: "D", valor: "Resistência-se." },
      { label: "E", valor: "Resistindo." },
    ],
    correta: "B",
    explicacao: "Resistência é o substantivo correspondente ao verbo resistir.",
  }
];

export const QUIZ_M6_CONECTIVOS: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "A substituição de 'Portanto' por 'Por conseguinte' mantém o sentido?",
    opcoes: [
      { label: "A", valor: "Sim, ambos são conclusivos." },
      { label: "B", valor: "Não, um é conclusivo e o outro causal." },
      { label: "C", valor: "Sim, mas um pede vírgula e o outro não." },
      { label: "D", valor: "Não, 'por conseguinte' indica tempo." },
      { label: "E", valor: "Varia conforme o sujeito da frase." },
    ],
    correta: "A",
    explicacao: "São conectivos sinônimos de valor conclusivo.",
  },
  {
    id: 602,
    pergunta: "Trocar 'Mas' por 'Embora' na reescrita exige:",
    opcoes: [
      { label: "A", valor: "Apenas a troca das palavras." },
      { label: "B", valor: "Mudança do verbo para o modo subjuntivo." },
      { label: "C", valor: "Inversão da ordem das orações." },
      { label: "D", valor: "B e C estão corretas." },
      { label: "E", valor: "Não é possível fazer essa troca." },
    ],
    correta: "D",
    explicacao: "'Mas' liga orações independentes (indicativo), 'embora' liga subordinadas (subjuntivo) e geralmente exige reposicionamento para manter a ênfase.",
  },
  {
    id: 603,
    pergunta: "'Como choveu, não fomos'. Reescrita causal válida:",
    opcoes: [
      { label: "A", valor: "Embora chovesse, não fomos." },
      { label: "B", valor: "Não fomos posto que choveu." },
      { label: "C", valor: "Não fomos porquanto chovera." },
      { label: "D", valor: "B e C estão corretas no sentido causal." },
      { label: "E", valor: "Apenas B está correta." },
    ],
    correta: "D",
    explicacao: "Ambos 'posto que' (em alguns contextos causais, mas cuidado com a banca!) e 'porquanto' podem indicar causa, substituindo o 'como' inicial.",
  },
  {
    id: 604,
    pergunta: "Conectivos que indicam FINALIDADE:",
    opcoes: [
      { label: "A", valor: "A fim de que / Para que." },
      { label: "B", valor: "Visto que / Já que." },
      { label: "C", valor: "Contanto que / Desde que." },
      { label: "D", valor: "Embora / conquanto." },
      { label: "E", valor: "Logo / Portanto." },
    ],
    correta: "A",
    explicacao: "Finalidade é o objetivo. A opção A traz os nexos corretos.",
  },
  {
    id: 605,
    pergunta: "A locução 'Haja vista' pode ser substituída sem erro por:",
    opcoes: [
      { label: "A", valor: "Devido aos." },
      { label: "B", valor: "Tendo em vista." },
      { label: "C", valor: "Na medida em que." },
      { label: "D", valor: "Visto que." },
      { label: "E", valor: "A e B." },
    ],
    correta: "E",
    explicacao: "'Haja vista' indica causa/exemplo, assim como 'devido a' ou 'tendo em vista'.",
  },
  {
    id: 606,
    pergunta: "O valor de 'Entretanto' é o mesmo de:",
    opcoes: [
      { label: "A", valor: "Todavia." },
      { label: "B", valor: "No entanto." },
      { label: "C", valor: "Contudo." },
      { label: "D", valor: "Mas." },
      { label: "E", valor: "Todas as anteriores." },
    ],
    correta: "E",
    explicacao: "Todos são nexos coordenativos adversativos.",
  }
];

export const QUIZ_M7_PONTUACAO: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "Ao remover as vírgulas de 'Os técnicos, que usam EPI, estão seguros', o sentido:",
    opcoes: [
      { label: "A", valor: "Não muda." },
      { label: "B", valor: "Muda: de 'todos os técnicos' para 'apenas os que usam EPI'." },
      { label: "C", valor: "Muda: 'estão seguros' torna-se uma dúvida." },
      { label: "D", valor: "Torna-se gramaticalmente errado." },
      { label: "E", valor: "Enfatiza a segurança." },
    ],
    correta: "B",
    explicacao: "Com vírgula = Explicativa (generaliza). Sem vírgula = Restritiva (especifica um grupo).",
  },
  {
    id: 702,
    pergunta: "A vírgula antes do 'e' na reescrita é obrigatória quando:",
    opcoes: [
      { label: "A", valor: "Temos sujeitos diferentes nas orações." },
      { label: "B", valor: "A frase é muito longa." },
      { label: "C", valor: "O 'e' tem valor de adição pura." },
      { label: "D", valor: "Nunca se usa vírgula antes de 'e'." },
      { label: "E", valor: "Sempre que houver um advérbio depois." },
    ],
    correta: "A",
    explicacao: "Sujeitos distintos admitem (e a banca gosta de) vírgula para clareza da coordenação.",
  },
  {
    id: 703,
    pergunta: "Reescrever trocando o ponto final por vírgula em 'Saiu cedo. Chegou tarde.' exigiria:",
    opcoes: [
      { label: "A", valor: "Um conectivo: 'Saiu cedo, porém chegou tarde'." },
      { label: "B", valor: "Nada, apenas trocar o ponto por vírgula." },
      { label: "C", valor: "Mudança dos verbos." },
      { label: "D", valor: "Uso de aspas." },
      { label: "E", valor: "É impossível fazer isso." },
    ],
    correta: "A",
    explicacao: "Vírgulas sozinhas não ligam orações com independência semântica forte sem um nexo (conjunção).",
  },
  {
    id: 704,
    pergunta: "Na reescrita de enumerações, o ponto-e-vírgula serve para:",
    opcoes: [
      { label: "A", valor: "Finalizar o texto." },
      { label: "B", valor: "Separar itens complexos que já possuem vírgulas internas." },
      { label: "C", valor: "Substituir dois pontos." },
      { label: "D", valor: "Mostrar que o autor está em dúvida." },
      { label: "E", valor: "Chamar a atenção para o próximo item." },
    ],
    correta: "B",
    explicacao: "O ponto-e-vírgula organiza a hierarquia da pontuação em listas longas.",
  },
  {
    id: 705,
    pergunta: "Transformar 'O Brasil, país tropical, produz café' em 'O Brasil produz café por ser um país tropical' é:",
    opcoes: [
      { label: "A", valor: "Uma reescrita explicativa para causal válida." },
      { label: "B", valor: "Inválida por mudar o sentido." },
      { label: "C", valor: "Certa, mas o tempo verbal mudou." },
      { label: "D", valor: "Errada, café não é tropical." },
      { label: "E", valor: "Válida apenas entre parênteses." },
    ],
    correta: "A",
    explicacao: "O aposto explicativo muitas vezes carrega um valor causal implícito que pode ser verbalizado.",
  },
  {
    id: 706,
    pergunta: "O uso do travessão duplo em vez de vírgulas na reescrita de um comentário do autor:",
    opcoes: [
      { label: "A", valor: "É um erro gramatical." },
      { label: "B", valor: "É uma opção estilística válida que enfatiza o termo intercalado." },
      { label: "C", valor: "Muda o significado da frase." },
      { label: "D", valor: "Obriga o uso de aspas na sequência." },
      { label: "E", valor: "É proibido em textos técnicos." },
    ],
    correta: "B",
    explicacao: "Travessões e parênteses podem substituir vírgulas de interrupção (intercalação) com ganho de ênfase.",
  }
];

export const QUIZ_M8_PARAFRASES: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "Qual dessas reescritas de 'Embora fizesse calor, ele corria' mantém a oposição?",
    opcoes: [
      { label: "A", valor: "Apesar de fazer calor, ele corria." },
      { label: "B", valor: "Visto que fazia calor, ele corria." },
      { label: "C", valor: "Caso fizesse calor, ele corria." },
      { label: "D", valor: "Conforme fazia calor, ele corria." },
      { label: "E", valor: "Pelo fato de fazer calor, ele corria." },
    ],
    correta: "A",
    explicacao: "A oposição (concessão) é mantida pela locução 'Apesar de'.",
  },
  {
    id: 802,
    pergunta: "Reescreva: 'Se todos chegarem, haverá festa'.",
    opcoes: [
      { label: "A", valor: "Quando todos chegarem, haverá festa." },
      { label: "B", valor: "Haveria festa se todos chegassem." },
      { label: "C", valor: "Caso todos cheguem, ocorrerá a festividade." },
      { label: "D", valor: "A e C estão corretas." },
      { label: "E", valor: "Apenas B está correta." },
    ],
    correta: "C",
    explicacao: "A reescrita 'C' mantém a condição (Caso) e o sentido futuro, usando sinônimos.",
  },
  {
    id: 803,
    pergunta: "'Assim que ele entrou, saiu'. O valor é temporal. Substituição correta:",
    opcoes: [
      { label: "A", valor: "Logo que ele entrou, saiu." },
      { label: "B", valor: "Mal ele entrou, saiu." },
      { label: "C", valor: "Entrando ele, saiu logo." },
      { label: "D", valor: "Todas as anteriores estão corretas." },
      { label: "E", valor: "Nenhuma está correta." },
    ],
    correta: "D",
    explicacao: "Todos os nexos acima expressam a simultaneidade ou sucessão imediata no tempo.",
  },
  {
    id: 804,
    pergunta: "A frase 'Não só trabalha, mas também estuda' reescrita para 'Trabalha e estuda':",
    opcoes: [
      { label: "A", valor: "Perde o sentido de adição." },
      { label: "B", valor: "Mantém o sentido, mas perde o valor enfático." },
      { label: "C", valor: "Torna-se errada gramaticalmente." },
      { label: "D", valor: "Vira uma concessão." },
      { label: "E", valor: "Enfatiza o estudo." },
    ],
    correta: "B",
    explicacao: "As estruturas correlativas (não só... mas também) são mais enfáticas que a conjunção simples 'e'.",
  },
  {
    id: 805,
    pergunta: "Reescrevendo 'O livro que comprei é bom' por 'O livro comprado por mim é bom':",
    opcoes: [
      { label: "A", valor: "Ocorre a redução da oração adjetiva." },
      { label: "B", valor: "Houve erro de regência." },
      { label: "C", valor: "O sentido mudou para posse." },
      { label: "D", valor: "A frase ficou informal." },
      { label: "E", valor: "Só é válido se o livro for técnico." },
    ],
    correta: "A",
    explicacao: "A oração 'que comprei' foi reduzida de particípio ('comprado'). É uma técnica de concisão.",
  },
  {
    id: 806,
    pergunta: "Qual das opções abaixo altera o campo semântico na reescrita?",
    opcoes: [
      { label: "A", valor: "Casa -> Lar." },
      { label: "B", valor: "Extinguir -> Eliminar." },
      { label: "C", valor: "Inibir -> Proibir." },
      { label: "D", valor: "Aumentar -> Expandir." },
      { label: "E", valor: "Pedir -> Ordenar." },
    ],
    correta: "E",
    explicacao: "Pedir (solicitação) é muito diferente de Ordenar (imposição). Essa mudança de intensidade invalida a reescrita.",
  }
];

export const QUIZ_M9_CESGRANRIO: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "A banca costuma trocar 'Onde' por 'Aonde' em frases de lugar fixo. Isso é:",
    opcoes: [
      { label: "A", valor: "Uma reescrita válida." },
      { label: "B", valor: "Um erro de regência (Aonde exige movimento)." },
      { label: "C", valor: "Apenas uma variação regional." },
      { label: "D", valor: "Correto se houver preposição 'para' oculta." },
      { label: "E", valor: "Obrigatório no início de frases." },
    ],
    correta: "B",
    explicacao: "Aonde = Para onde (movimento). Onde = Em que lugar (estático). A banca adora testar essa troca.",
  },
  {
    id: 902,
    pergunta: "O nexo 'Conquanto' em reescritas da Cesgranrio equivale a:",
    opcoes: [
      { label: "A", valor: "Portanto." },
      { label: "B", valor: "Pois." },
      { label: "C", valor: "Contanto que." },
      { label: "D", valor: "Embora." },
      { label: "E", valor: "Ao passo que." },
    ],
    correta: "D",
    explicacao: "Conquanto é concessivo (= embora). É a pegadinha clássica para confundir com 'contanto que' (condicional).",
  },
  {
    id: 303,
    pergunta: "Trocar 'Faz anos' por 'Fazem anos' na reescrita é:",
    opcoes: [
      { label: "A", valor: "Correto, concorda com os anos." },
      { label: "B", valor: "Um erro grave de concordância (Fazer tempo é impessoal)." },
      { label: "C", valor: "Facultativo pela nova ortografia." },
      { label: "D", valor: "Válido apenas em textos literários." },
      { label: "E", valor: "Aceitável se houver número antes." },
    ],
    correta: "B",
    explicacao: "Verbo fazer indicando tempo não tem sujeito, fica sempre no singular.",
  },
  {
    id: 304,
    pergunta: "O 'Que' funcionando como pronome relativo pode ser reescrito como:",
    opcoes: [
      { label: "A", valor: "O qual / A qual / Os quais / As quais." },
      { label: "B", valor: "Onde." },
      { label: "C", valor: "Cujo." },
      { label: "D", valor: "A e B." },
      { label: "E", valor: "Apenas C." },
    ],
    correta: "A",
    explicacao: "Para evitar a repetição de 'que', a banca aceita a troca pelas formas flexionadas de 'o qual'.",
  },
  {
    id: 305,
    pergunta: "A locução 'Ao passo que' indica:",
    opcoes: [
      { label: "A", valor: "Causa." },
      { label: "B", valor: "Proporcionalidade ou Contraste Simultâneo." },
      { label: "C", valor: "Conclusão." },
      { label: "D", valor: "Condição." },
      { label: "E", valor: "Finalidade." },
    ],
    correta: "B",
    explicacao: "Indica ações que ocorrem ao mesmo tempo em proporção ou oposição.",
  },
  {
    id: 306,
    pergunta: "Na Cesgranrio, 'Já que' é semanticamente equivalente a:",
    opcoes: [
      { label: "A", valor: "Visto que." },
      { label: "B", valor: "Porquanto (causal)." },
      { label: "C", valor: "Como (no início da frase)." },
      { label: "D", valor: "Todas as anteriores." },
      { label: "E", valor: "Apenas A e B." },
    ],
    correta: "D",
    explicacao: "Todos são nexos causais clássicos.",
  }
];

export const QUIZ_FINAL_REESCRITA: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "Qual dessas reescritas de 'Embora a refinaria seja moderna, precisa de ajustes' é a MAIS completa e correta?",
    opcoes: [
      { label: "A", valor: "A refinaria é moderna, mas precisa de ajustes." },
      { label: "B", valor: "Pelo fato de ser moderna, a refinaria precisa de ajustes." },
      { label: "C", valor: "Malgrado a modernidade da refinaria, ajustes são necessários." },
      { label: "D", valor: "A refinaria precisa de ajustes pois é moderna." },
      { label: "E", valor: "Se a refinaria for moderna, precisará de ajustes." },
    ],
    correta: "C",
    explicacao: "A reescrita 'C' usa nominalização ('modernidade'), mantém a concessão ('malgrado') e a passiva ('são necessários'). É o nível 'Elite' da banca.",
  },
  {
    id: 1002,
    pergunta: "A frase 'Ele não só cumpriu a meta, como também superou as expectativas' mantém o sentido em:",
    opcoes: [
      { label: "A", valor: "Ele cumpriu a meta e superou as expectativas." },
      { label: "B", valor: "Ele cumpriu a meta ou superou as expectativas." },
      { label: "C", valor: "Ele superou as expectativas superando a meta." },
      { label: "D", valor: "Além de cumprir a meta, ele superou as expectativas." },
      { label: "E", valor: "A e D preservam o sentido aditivo." },
    ],
    correta: "E",
    explicacao: "Tanto a conjunção 'e' quanto a premissa 'Além de' preservam a soma de ações positivas.",
  },
  {
    id: 1003,
    pergunta: "Assinale a alternativa que apresenta ERRO de reescrita por mudança do modo verbal:",
    opcoes: [
      { label: "A", valor: "Talvez chova -> É possível que chova." },
      { label: "B", valor: "Ele ordena que saiam -> Ele manda sair." },
      { label: "C", valor: "Ele faria o teste -> Ele fará o teste." },
      { label: "D", valor: "Se ele viesse -> Caso ele viesse." },
      { label: "E", valor: "Quero que você seja feliz -> Desejo sua felicidade." },
    ],
    correta: "C",
    explicacao: "Faria (Futuro do Pretérito - hipótese) vs Fará (Futuro do Presente - certeza). Mudança imperdoável na Cesgranrio.",
  },
  {
    id: 1004,
    pergunta: "Qual das reescritas abaixo peca pela EXTRAPOLAÇÃO?",
    opcoes: [
      { label: "A", valor: "'O poço produziu mil barris' -> 'Mil barris foram produzidos pelo poço'." },
      { label: "B", valor: "'O poço produziu mil barris' -> 'A produção do poço atingiu mil barris'." },
      { label: "C", valor: "'O poço produziu mil barris' -> 'O poço produziu mil barris de excelente qualidade'." },
      { label: "D", valor: "'O poço produziu mil barris' -> 'Houve produção de mil barris no poço'." },
      { label: "E", valor: "'O poço produziu mil barris' -> 'Contabilizou-se a produção de mil barris'." },
    ],
    correta: "C",
    explicacao: "O original não diz nada sobre a 'qualidade'. Adicionar esse adjetivo é extrapolar os limites do texto.",
  },
  {
    id: 1005,
    pergunta: "Reescrevendo 'Posto que estivesse frio, fomos à praia'.",
    opcoes: [
      { label: "A", valor: "Como estava frio, fomos à praia." },
      { label: "B", valor: "Embora estivesse frio, fomos à praia." },
      { label: "C", valor: "Visto que estava frio, fomos à praia." },
      { label: "D", valor: "Já que estava frio, fomos à praia." },
      { label: "E", valor: "Porquanto estivesse frio, fomos à praia." },
    ],
    correta: "B",
    explicacao: "'Posto que' é concessivo (embora). As outras são causais.",
  }
];
