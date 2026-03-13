import { QuizQuestion, CarouselCard } from "../../shared";
import { ReactNode } from "react";

export interface ConceptExample {
  frente: ReactNode;
  verso: ReactNode;
}

export interface ChallengeQuestion {
  id: number;
  wrong: string;
  correct: string;
  explanation: string;
}

// ── QUIZ POOLS ──────────────────────────────────────────────────────────

export const QUIZ_VERBAL_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Qual a frase correta quanto à concordância verbal?",
    opcoes: [
      { label: "A", valor: "Fazem cinco anos que não o vejo." },
      { label: "B", valor: "Houveram muitos problemas na obra." },
      { label: "C", valor: "Deve haver muitas pessoas interessadas." },
      { label: "D", valor: "Aluga-se quartos para estudantes." },
      { label: "E", valor: "Tratam-se de questões complexas." },
    ],
    correta: "C",
    explicacao:
      "O verbo 'haver' (sentido de existir) é impessoal e transmite a impessoalidade para o auxiliar 'deve'. Logo, 'Deve haver' fica no singular. Opção E está errada pois 'tratar-se de' é impessoal (VTI+SE).",
  },
  {
    id: 2,
    pergunta: "Assinale a alternativa INCORRETA quanto à concordância verbal:",
    opcoes: [
      { label: "A", valor: "Vossa Excelência agiu com prudência." },
      { label: "B", valor: "Os Estados Unidos são uma potência." },
      { label: "C", valor: "Minas Gerais produzem muito queijo." },
      { label: "D", valor: "Fui eu que fiz o relatório." },
      { label: "E", valor: "Fomos nós quem pagou a conta." },
    ],
    correta: "C",
    explicacao:
      "Nomes de lugar no plural SEM artigo (Minas Gerais) pedem verbo no singular: 'Minas Gerais PRODUZ'. Se tivesse artigo ('As Minas Gerais'), seria plural.",
  },
  {
    id: 3,
    pergunta: "Complete corretamente: '______-se de estratégias que ______ os resultados.'",
    opcoes: [
      { label: "A", valor: "Tratam / melhorem" },
      { label: "B", valor: "Trata / melhorem" },
      { label: "C", valor: "Tratam / melhora" },
      { label: "D", valor: "Trata / melhora" },
      { label: "E", valor: "Trata-se / melhoram" },
    ],
    correta: "B",
    explicacao:
      "'Tratar-se' (VTI + SE) é índice de indeterminação, sempre 3ª do singular ('Trata-se'). 'Estratégias' é antecedente de 'que' (sujeito de melhorar), então 'melhorem' (plural).",
  },
  {
    id: 4,
    pergunta: "Em 'Precisa-se de operadores', a concordância deve ser no singular porque:",
    opcoes: [
      { label: "A", valor: "O sujeito é 'operadores'." },
      { label: "B", valor: "O verbo é transitivo direto." },
      { label: "C", valor: "O termo 'de operadores' é objeto indireto e não sujeito." },
      { label: "D", valor: "O verbo está na voz passiva analítica." },
      { label: "E", valor: "É um caso de sujeito composto posposto." },
    ],
    correta: "C",
    explicacao:
      "'Precisar' é VTI (quem precisa, precisa DE algo). VTI + SE = Índice de Indeterminação do Sujeito. O sujeito é indeterminado, e o verbo fica na 3ª do singular. O termo preposicionado não pode ser sujeito.",
  },
  {
    id: 5,
    pergunta: "Assinale a opção correta sobre o verbo HAVER:",
    opcoes: [
      { label: "A", valor: "No sentido de 'existir', ele varia para o plural." },
      { label: "B", valor: "Como auxiliar ('haviam dito'), ele não varia." },
      { label: "C", valor: "No sentido de tempo decorrido, ele vai para o plural." },
      { label: "D", valor: "No sentido de 'existir', é impessoal e fica no singular." },
      { label: "E", valor: "Todas estão incorretas." },
    ],
    correta: "D",
    explicacao:
      "Regra de ouro: HAVER com sentido de existir ou tempo transcorrido é IMPESSOAL (sem sujeito) e fica sempre no SINGULAR. Ex: 'Havia muitas pessoas'.",
  },
  {
    id: 6,
    pergunta: "'A maioria dos técnicos ______ satisfeitos.' Escolha a opção que completa a frase conforme a norma culta:",
    opcoes: [
      { label: "A", valor: "estão (apenas)" },
      { label: "B", valor: "está (apenas)" },
      { label: "C", valor: "está ou estão (ambas aceitas)" },
      { label: "D", valor: "estavam (apenas)" },
      { label: "E", valor: "nenhuma das anteriores" },
    ],
    correta: "C",
    explicacao:
      "Sujeito partitivo ('A maioria de', 'Parte de') + especificador no plural ('os técnicos') aceita concordância lógica (singular, com 'maioria') ou atrativa (plural, com 'técnicos').",
  },
  {
    id: 7,
    pergunta: "Concordância com porcentagem: '25% do orçamento ______ aprovados.'",
    opcoes: [
      { label: "A", valor: "foi" },
      { label: "B", valor: "foram" },
      { label: "C", valor: "será" },
      { label: "D", valor: "é" },
      { label: "E", valor: "têm sido" },
    ],
    correta: "B",
    explicacao:
      "O verbo concorda com o número (25 = plural). Se houvesse artigo ('Os 25%'), concordaria com o artigo. Se houvesse especificador ('25% da verba'), poderia concordar com o especificador singular. Sem especificador, 25% = Plural.",
  },
  {
    id: 8,
    pergunta: "Identifique a frase correta quanto à concordância do verbo SER:",
    opcoes: [
      { label: "A", valor: "Hoje é dia 15 de março." },
      { label: "B", valor: "Hoje são 15 de março." },
      { label: "C", valor: "Daqui à refinaria é dois quilômetros." },
      { label: "D", valor: "Tudo são flores." },
      { label: "E", valor: "B e D estão corretas." },
    ],
    correta: "E",
    explicacao:
      "Nas datas, o verbo SER pode concordar com a palavra implícita 'dia' (singular) ou com o número (plural). 'Hoje é (dia) 15' ou 'Hoje são 15'. Em 'Tudo são flores', o verbo ser tende a concordar com o predicativo no plural quando o sujeito é pronome indefinido (tudo, isso, aquilo).",
  },
  {
    id: 9,
    pergunta: "Complete as lacunas: '______-se de novas regras.' / '______-se novas regras.'",
    opcoes: [
      { label: "A", valor: "Trata / Criou" },
      { label: "B", valor: "Tratam / Criaram" },
      { label: "C", valor: "Trata / Criaram" },
      { label: "D", valor: "Tratam / Criou" },
      { label: "E", valor: "Trata / Cria" },
    ],
    correta: "C",
    explicacao:
      "'Trata-se de' (VTI) → Verbo no Singular. 'Criaram-se novas regras' (VTD, voz passiva, sujeito 'novas regras' no plural) → Verbo no Plural.",
  },
  {
    id: 10,
    pergunta: "Em qual opção o verbo 'fazer' está empregado INCORRETAMENTE?",
    opcoes: [
      { label: "A", valor: "Faz dez anos que trabalho na Petrobras." },
      { label: "B", valor: "Fazem muitos dias que chove." },
      { label: "C", valor: "Vai fazer duas semanas que enviei o relatório." },
      { label: "D", valor: "Fez muito calor no verão passado." },
      { label: "E", valor: "Faz invernos rigorosos no sul." },
    ],
    correta: "B",
    explicacao:
      "Verbo FAZER indicando tempo decorrido ou fenômeno natural é IMPESSOAL. Deve ficar sempre no SINGULAR. O correto é: 'Faz muitos dias'.",
  },
  {
    id: 11,
    pergunta: "Sobre a frase 'Mais de um engenheiro analisou o projeto', é correto afirmar:",
    opcoes: [
      { label: "A", valor: "O verbo deveria estar no plural pois 'mais de um' indica pluralidade semântica." },
      { label: "B", valor: "A concordância é feita com o numeral 'um', logo o verbo fica no singular." },
      { label: "C", valor: "Se fosse 'Mais de um engenheiro se abraçaram', o verbo continuaria no singular." },
      { label: "D", valor: "A frase está incorreta segundo a norma culta." },
      { label: "E", valor: "Nenhuma das anteriores." },
    ],
    correta: "B",
    explicacao:
      "A expressão 'mais de um' concorda com o numeral. 'Mais de UM... analisou'. Exceção: 'Mais de um engenheiro se abraçaram' (reciprocidade) ou repetição ('Mais de um professor, mais de um aluno disseram...').",
  },
  {
    id: 12,
    pergunta: "Assinale a frase gramaticalmente correta:",
    opcoes: [
      { label: "A", valor: "Seguem anexo os documentos." },
      { label: "B", valor: "Seguem anexos, os documentos." },
      { label: "C", valor: "Seguem anexos os documentos." },
      { label: "D", valor: "Segue anexo os documentos." },
      { label: "E", valor: "Seguem em anexo os documentos." },
    ],
    correta: "C",
    explicacao:
      "'Anexo' é adjetivo e deve concordar com o substantivo 'documentos'. Documentos (masc. pl.) -> Anexos (masc. pl.). 'Em anexo' é expressão invariável (mas modernos preferem evitar). A melhor resposta é C.",
  },
  {
    id: 13,
    pergunta: "'Não ______ haver dúvidas de que ______ soluções inovadoras.'",
    opcoes: [
      { label: "A", valor: "podem / existe" },
      { label: "B", valor: "pode / existem" },
      { label: "C", valor: "pode / existe" },
      { label: "D", valor: "podem / existem" },
      { label: "E", valor: "pode / existi" },
    ],
    correta: "B",
    explicacao:
      "1ª lacuna: 'haver' (sentido existir) é impessoal -> auxiliar 'pode' fica no singular. 2ª lacuna: 'existir' é verbo pessoal, tem sujeito ('soluções inovadoras' = plural) -> 'existem'.",
  },
  {
    id: 14,
    pergunta: "Qual das formas verbais completa corretamente: '1% dos candidatos ______ aprovado.'",
    opcoes: [
      { label: "A", valor: "foi" },
      { label: "B", valor: "foram" },
      { label: "C", valor: "serão" },
      { label: "D", valor: "seriam" },
      { label: "E", valor: "têm sido" },
    ],
    correta: "A",
    explicacao:
      "Note que aqui há especificador 'dos candidatos' (plural). A regra de porcentagem diz: concorda com o número OU com o especificador. MAS quando o número é 1, a atração pelo número (singular) é predominante se o predicativo ('aprovado') está no singular.",
  },
  {
    id: 15,
    pergunta: "Assinale a opção correta:",
    opcoes: [
      { label: "A", valor: "O relógio deu duas horas." },
      { label: "B", valor: "Deram duas horas no relógio." },
      { label: "C", valor: "Soaram dez badaladas." },
      { label: "D", valor: "Bateu três horas o sino." },
      { label: "E", valor: "Todas, exceto D, estão corretas." },
    ],
    correta: "E",
    explicacao:
      "Verbos dar, bater e soar concordam com o sujeito (horas/badaladas) ou com o instrumento (relógio/sino) se este for o sujeito.",
  },
];

export const QUIZ_NOMINAL_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Complete: 'Ela estava ______ nervosa e tomou ______ água.'",
    opcoes: [
      { label: "A", valor: "meio / meia" },
      { label: "B", valor: "meia / meio" },
      { label: "C", valor: "meio / meio" },
      { label: "D", valor: "meia / meia" },
      { label: "E", valor: "meios / meias" },
    ],
    correta: "A",
    explicacao:
      "'Meio' = 'um pouco' (advérbio) -> Invariável ('meio nervosa'). 'Meia' = 'metade' (numeral/adjetivo) -> Concorda com o substantivo ('meia água').",
  },
  {
    id: 2,
    pergunta: "'Seguem ______ as faturas e os recibos.'",
    opcoes: [
      { label: "A", valor: "anexo" },
      { label: "B", valor: "anexos" },
      { label: "C", valor: "anexa" },
      { label: "D", valor: "anexas" },
      { label: "E", valor: "em anexo" },
    ],
    correta: "B",
    explicacao:
      "'Anexo' é adjetivo, concorda com os substantivos. 'Faturas e recibos' (fem + masc = masc. plural) -> 'Anexos'.",
  },
  {
    id: 3,
    pergunta: "Assinale a frase CORRETA:",
    opcoes: [
      { label: "A", valor: "É proibido entrada." },
      { label: "B", valor: "É proibida entrada." },
      { label: "C", valor: "É proibido a entrada." },
      { label: "D", valor: "É proibida a entrada." },
      { label: "E", valor: "A entrada é proibido." },
    ],
    correta: "D",
    explicacao:
      "Expressões como 'É proibido', 'É bom': Sem determinante = masculino singular. Com determinante ('A'), concorda ('É proibida A entrada').",
  },
  {
    id: 4,
    pergunta: "'Elas ______ fizeram o relatório.'",
    opcoes: [
      { label: "A", valor: "mesmo" },
      { label: "B", valor: "mesmos" },
      { label: "C", valor: "mesmas" },
      { label: "D", valor: "mesma" },
      { label: "E", valor: "n.d.a" },
    ],
    correta: "C",
    explicacao:
      "'Mesmo' (sentido de 'próprio') é pronome adjetivo e concorda com o sujeito. Elas mesmas.",
  },
  {
    id: 5,
    pergunta: "'Os soldados ficaram ______.'",
    opcoes: [
      { label: "A", valor: "alerta" },
      { label: "B", valor: "alertas" },
      { label: "C", valor: "alertos" },
      { label: "D", valor: "em alerta" },
      { label: "E", valor: "A e D" },
    ],
    correta: "A",
    explicacao:
      "'Alerta' (sentido de atenção) é advérbio, portanto INVARIÁVEL. 'Os soldados ficaram alerta.'",
  },
  {
    id: 6,
    pergunta: "Havia ______ razões para ele não ir.",
    opcoes: [
      { label: "A", valor: "bastante" },
      { label: "B", valor: "bastantes" },
      { label: "C", valor: "muito" },
      { label: "D", valor: "pouco" },
      { label: "E", valor: "meio" },
    ],
    correta: "B",
    explicacao:
      "Troque 'bastante' por 'muitos/muitas'. 'Havia MUITAS razões' -> 'Havia BASTANTES razões'.",
  },
  {
    id: 7,
    pergunta: "'Os documentos foram enviados ______.'",
    opcoes: [
      { label: "A", valor: "o mais rápido possível" },
      { label: "B", valor: "os mais rápidos possíveis" },
      { label: "C", valor: "o mais rápidos possível" },
      { label: "D", valor: "os mais rápidos possível" },
      { label: "E", valor: "o mais rápido possíveis" },
    ],
    correta: "B",
    explicacao:
      "Em 'o mais... possível', se o artigo for plural ('os'), 'possível' também vai para o plural ('possíveis').",
  },
  {
    id: 8,
    pergunta: "Escolha a concordância INCORRETA:",
    opcoes: [
      { label: "A", valor: "Haja vista os problemas." },
      { label: "B", valor: "Haja vista aos problemas." },
      { label: "C", valor: "Hajam vista os problemas." },
      { label: "D", valor: "Menos pessoas vieram hoje." },
      { label: "E", valor: "Ela estava toda suja." },
    ],
    correta: "C",
    explicacao:
      "A expressão 'Haja vista' é invariável em 'vista' e no verbo 'haver' (embora alguns aceitem variação do haver, é evitado). 'Hajam vista' é incorreta.",
  },
  {
    id: 9,
    pergunta: "Ela disse: 'Muito ______'.",
    opcoes: [
      { label: "A", valor: "obrigado" },
      { label: "B", valor: "obrigados" },
      { label: "C", valor: "obrigada" },
      { label: "D", valor: "obrigadas" },
      { label: "E", valor: "gradecida" },
    ],
    correta: "C",
    explicacao:
      "'Obrigado' concorda com quem fala. Se é ELA, ela diz 'obrigada'.",
  },
  {
    id: 10,
    pergunta: "'Terno e camisa ______.'",
    opcoes: [
      { label: "A", valor: "velhos" },
      { label: "B", valor: "velha" },
      { label: "C", valor: "velho" },
      { label: "D", valor: "velhas" },
      { label: "E", valor: "B e C" },
    ],
    correta: "A",
    explicacao:
      "Substantivo Masc + Substantivo Fem = Adjetivo no Masculino Plural ('velhos') OU concorda com o mais próximo.",
  },
  {
    id: 11,
    pergunta: "'Cerveja é ______ para o calor.'",
    opcoes: [
      { label: "A", valor: "bom" },
      { label: "B", valor: "boa" },
      { label: "C", valor: "bons" },
      { label: "D", valor: "boas" },
      { label: "E", valor: "ótima" },
    ],
    correta: "A",
    explicacao:
      "Sujeito sem artigo. Adjetivo 'bom' fica no masculino singular (neutro). 'Cerveja é bom'.",
  },
  {
    id: 12,
    pergunta: "'Estamos ______ com a tesouraria.'",
    opcoes: [
      { label: "A", valor: "quite" },
      { label: "B", valor: "quites" },
      { label: "C", valor: "quito" },
      { label: "D", valor: "quitas" },
      { label: "E", valor: "em dia" },
    ],
    correta: "B",
    explicacao:
      "'Quite' é adjetivo e concorda com o sujeito. 'Nós estamos QUITES'.",
  },
  {
    id: 13,
    pergunta: "'Água, óleo e gasolina ______.'",
    opcoes: [
      { label: "A", valor: "importada" },
      { label: "B", valor: "importados" },
      { label: "C", valor: "importado" },
      { label: "D", valor: "importadas" },
      { label: "E", valor: "importadxs" },
    ],
    correta: "B",
    explicacao:
      "Substantivos mistos (fem + masc + fem). Prevalece o masculino plural: 'importados'.",
  },
  {
    id: 14,
    pergunta: "'Os formandos disseram ______.'",
    opcoes: [
      { label: "A", valor: "menas palavras" },
      { label: "B", valor: "menos palavras" },
      { label: "C", valor: "menos palavra" },
      { label: "D", valor: "menas palavra" },
      { label: "E", valor: "pouca palavras" },
    ],
    correta: "B",
    explicacao: "'Menos' é advérbio, INVARIÁVEL. Não existe 'menas'.",
  },
  {
    id: 15,
    pergunta: "'Ela prefere ______ blusas.'",
    opcoes: [
      { label: "A", valor: "marrom" },
      { label: "B", valor: "marrons" },
      { label: "C", valor: "marromes" },
      { label: "D", valor: "marron" },
      { label: "E", valor: "marones" },
    ],
    correta: "B",
    explicacao:
      "Adjetivo simples 'marrom' faz plural ('marrons').",
  },
];

export const QUIZ_PRATICO_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "(CESGRANRIO Adaptada) A concordância verbal está correta em:",
    opcoes: [
      { label: "A", valor: "Sobrava razões para a demissão." },
      { label: "B", valor: "Faltam resolver os problemas." },
      { label: "C", valor: "Deve haver soluções melhores." },
      { label: "D", valor: "Podem haver soluções melhores." },
      { label: "E", valor: "Houveram muitos acidentes." },
    ],
    correta: "C",
    explicacao:
      "C: Correta (Haver sentido existir = impessoal + auxiliar singular 'deve').",
  },
  {
    id: 2,
    pergunta: "Em 'A pauta das reuniões ____ disposta no quadro', complete:",
    opcoes: [
      { label: "A", valor: "foram" },
      { label: "B", valor: "foi" },
      { label: "C", valor: "serão" },
      { label: "D", valor: "eram" },
      { label: "E", valor: "estavam" },
    ],
    correta: "B",
    explicacao: "O núcleo do sujeito é 'pauta' (singular).",
  },
  {
    id: 3,
    pergunta: "'______-se a todas as solicitações.'",
    opcoes: [
      { label: "A", valor: "Atendeu" },
      { label: "B", valor: "Atenderam" },
      { label: "C", valor: "Atenderão" },
      { label: "D", valor: "Atendiam" },
      { label: "E", valor: "Atendes" },
    ],
    correta: "A",
    explicacao: "'Atender-se a...' (VTI + SE = sujeito indeterminado). Verbo no singular.",
  },
  {
    id: 5,
    pergunta: "Complete corretamente: '______ anos que não ______ acidentes.'",
    opcoes: [
      { label: "A", valor: "Fazem / ocorrem" },
      { label: "B", valor: "Faz / ocorre" },
      { label: "C", valor: "Fazem / ocorre" },
      { label: "D", valor: "Faz / ocorrem" },
      { label: "E", valor: "Fez / ocorria" },
    ],
    correta: "D",
    explicacao: "'Faz' (tempo) = singular. 'Ocorrem' (pessoal) = concorda com 'acidentes'.",
  },
  {
    id: 7,
    pergunta: "Qual frase está correta?",
    opcoes: [
      { label: "A", valor: "Haviam dois carros na rua." },
      { label: "B", valor: "Fazem meses que não chove." },
      { label: "C", valor: "Devem fazer dez dias que cheguei." },
      { label: "D", valor: "Vai haver problemas sérios." },
      { label: "E", valor: "Vão haver mudanças." },
    ],
    correta: "D",
    explicacao: "D: 'Vai haver' está correto (auxiliar no singular).",
  },
  {
    id: 8,
    pergunta: "'Os responsáveis pela operação ______ tomar providências urgentes.'",
    opcoes: [
      { label: "A", valor: "devem" },
      { label: "B", valor: "deve" },
      { label: "C", valor: "devia" },
      { label: "D", valor: "deveriam" },
      { label: "E", valor: "deveria" },
    ],
    correta: "A",
    explicacao: "O sujeito 'Os responsáveis' é plural, o verbo concorda no plural: 'devem'.",
  },
  {
    id: 9,
    pergunta: "'Cada um dos engenheiros ______ sua expertise no projeto.'",
    opcoes: [
      { label: "A", valor: "contribui" },
      { label: "B", valor: "contribuem" },
      { label: "C", valor: "contribuímos" },
      { label: "D", valor: "contribuiam" },
      { label: "E", valor: "contribuirão" },
    ],
    correta: "A",
    explicacao: "'Cada um' (expressão distributiva) exige verbo no singular: 'contribui'.",
  },
  {
    id: 10,
    pergunta: "'Nem todos os documentos ______ aprovados no conselho.'",
    opcoes: [
      { label: "A", valor: "foi" },
      { label: "B", valor: "foram" },
      { label: "C", valor: "será" },
      { label: "D", valor: "serão" },
      { label: "E", valor: "era" },
    ],
    correta: "B",
    explicacao: "'Nem todos' (plural) concorda com verbo no plural: 'foram'.",
  },
  {
    id: 11,
    pergunta: "'Os dados do relatório ______ inconsistências gravíssimas.'",
    opcoes: [
      { label: "A", valor: "apresenta" },
      { label: "B", valor: "apresentam" },
      { label: "C", valor: "apresentarem" },
      { label: "D", valor: "apresentasse" },
      { label: "E", valor: "apresentaram" },
    ],
    correta: "B",
    explicacao: "O núcleo do sujeito 'dados' é plural, o verbo concorda no plural.",
  },
  {
    id: 12,
    pergunta: "'A maioria dos candidatos ______ bom desempenho na prova.'",
    opcoes: [
      { label: "A", valor: "teve" },
      { label: "B", valor: "tiveram" },
      { label: "C", valor: "tive" },
      { label: "D", valor: "ter" },
      { label: "E", valor: "teria" },
    ],
    correta: "A",
    explicacao: "'A maioria' (noun head) concorda com o verbo no singular: 'teve'.",
  },
];

export const QUIZ_APROFUNDAMENTO_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Em 'Fui eu quem ... o projeto', qual a forma correta?",
    opcoes: [
      { label: "A", valor: "aprovou" },
      { label: "B", valor: "aprovei" },
      { label: "C", valor: "aprovamos" },
      { label: "D", valor: "A e B estão corretas" },
      { label: "E", valor: "aprovasses" },
    ],
    correta: "D",
    explicacao: "Com 'QUEM', o verbo pode concordar com o antecedente ou ficar na 3ª do singular.",
  },
  {
    id: 404,
    pergunta: "Assinale a alternativa em que a concordância verbal está correta:",
    opcoes: [
      { label: "A", valor: "Fazem dez anos que não vejo meu primo." },
      { label: "B", valor: "Houveram muitos incidentes na refinaria." },
      { label: "C", valor: "Deveria haver mais investimentos em segurança." },
      { label: "D", valor: "Aluga-se casas e apartamentos naquela rua." },
      { label: "E", valor: "Estão havendo sérios problemas." },
    ],
    correta: "C",
    explicacao: "Haver (existir) é impessoal. 'Deveria haver' fica no singular.",
  },
  {
    id: 402,
    pergunta: "'Somos nós quem ______ responsáveis pelos resultados.'",
    opcoes: [
      { label: "A", valor: "somos" },
      { label: "B", valor: "é" },
      { label: "C", valor: "são" },
      { label: "D", valor: "A e B" },
      { label: "E", valor: "éramos" },
    ],
    correta: "D",
    explicacao: "Com 'quem', o verbo pode concordar com o antecedente ('somos') ou ficar na 3ª do singular ('é').",
  },
  {
    id: 403,
    pergunta: "'O professor com seus alunos ______ a sala de aula.'",
    opcoes: [
      { label: "A", valor: "enche" },
      { label: "B", valor: "enchem" },
      { label: "C", valor: "encheu" },
      { label: "D", valor: "encherão" },
      { label: "E", valor: "encheria" },
    ],
    correta: "B",
    explicacao: "Sujeito: 'O professor com seus alunos' = sujeito plural (professor + alunos). Verbo plural: 'enchem'.",
  },
  {
    id: 405,
    pergunta: "'Um ou outro candidato ______ a vaga disponível.'",
    opcoes: [
      { label: "A", valor: "ocupam" },
      { label: "B", valor: "ocupa" },
      { label: "C", valor: "ocupará" },
      { label: "D", valor: "ocuparão" },
      { label: "E", valor: "ocuparia" },
    ],
    correta: "B",
    explicacao: "'Um ou outro' = singular. O verbo fica no singular: 'ocupa'.",
  },
  {
    id: 406,
    pergunta: "'Tanto o engenheiro quanto o técnico ______ os problemas.'",
    opcoes: [
      { label: "A", valor: "identificou" },
      { label: "B", valor: "identificaram" },
      { label: "C", valor: "identificaria" },
      { label: "D", valor: "identificaria" },
      { label: "E", valor: "identificar" },
    ],
    correta: "B",
    explicacao: "'Tanto... quanto' = sujeito composto = verbo plural: 'identificaram'.",
  },
  {
    id: 407,
    pergunta: "'Qual dos engenheiros ______ cargo de supervisor?'",
    opcoes: [
      { label: "A", valor: "assume" },
      { label: "B", valor: "assomem" },
      { label: "C", valor: "assumem" },
      { label: "D", valor: "assumi" },
      { label: "E", valor: "assuma" },
    ],
    correta: "A",
    explicacao: "'Qual dos engenheiros' (singular) = verbo singular: 'assume'.",
  },
  {
    id: 408,
    pergunta: "'Os problemas de ordem política e social ______ da Constituição.'",
    opcoes: [
      { label: "A", valor: "decorre" },
      { label: "B", valor: "decorrem" },
      { label: "C", valor: "decorreria" },
      { label: "D", valor: "decoraria" },
      { label: "E", valor: "decorriam" },
    ],
    correta: "B",
    explicacao: "'Problemas' (plural) = verbo no plural: 'decorrem'.",
  },
  {
    id: 409,
    pergunta: "'Aqueles que se dedicam ______ sucesso garantido.'",
    opcoes: [
      { label: "A", valor: "tem" },
      { label: "B", valor: "têm" },
      { label: "C", valor: "tém" },
      { label: "D", valor: "tinha" },
      { label: "E", valor: "ter" },
    ],
    correta: "B",
    explicacao: "'Aqueles' (plural) = sujeito plural = 'têm' (com acento diferencial).",
  },
  {
    id: 410,
    pergunta: "'Não ______ dúvida de que ______ soluções inovadoras em pauta.'",
    opcoes: [
      { label: "A", valor: "há / existe" },
      { label: "B", valor: "há / existem" },
      { label: "C", valor: "hão / existe" },
      { label: "D", valor: "hão / existem" },
      { label: "E", valor: "tenham / exista" },
    ],
    correta: "B",
    explicacao: "'Há' (impessoal) = singular. 'Existem soluções' = 'existem' plural.",
  },
];

export const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 503,
    pergunta: "Assinale a alternativa com concordância verbal CORRETA:",
    opcoes: [
      { label: "A", valor: "Haviam muitos riscos na operação." },
      { label: "B", valor: "Fazem duas semanas que o navio partiu." },
      { label: "C", valor: "Devem haver soluções imediatas." },
      { label: "D", valor: "Trata-se de novas diretrizes de segurança." },
      { label: "E", valor: "A e C estão corretas." },
    ],
    correta: "D",
    explicacao: "'Trata-se' (VTI + SE) é impessoal.",
  },
  {
    id: 504,
    pergunta: "'Os dados estatísticos ______ que as operações offshore ______ rigor técnico.'",
    opcoes: [
      { label: "A", valor: "comprova / requer" },
      { label: "B", valor: "comprovam / requerem" },
      { label: "C", valor: "comprova / requerem" },
      { label: "D", valor: "comprovam / requer" },
      { label: "E", valor: "comprovaria / requeria" },
    ],
    correta: "B",
    explicacao: "'Dados' (plural) = 'comprovam'. 'Operações' (plural) = 'requerem'.",
  },
  {
    id: 505,
    pergunta: "'Entre os executivos da empresa, ______ quem ______ coragem de implementar mudanças radicais.'",
    opcoes: [
      { label: "A", valor: "há / tem" },
      { label: "B", valor: "hão / têm" },
      { label: "C", valor: "há / têm" },
      { label: "D", valor: "hão / tem" },
      { label: "E", valor: "haveria / teria" },
    ],
    correta: "A",
    explicacao: "'Há' (impessoal, singular). 'Quem' (singular) = 'tem'.",
  },
  {
    id: 506,
    pergunta: "Complete: '______ de ser enfrentados os desafios da indústria de petróleo.'",
    opcoes: [
      { label: "A", valor: "Trata-se" },
      { label: "B", valor: "Tratam-se" },
      { label: "C", valor: "Tratava-se" },
      { label: "D", valor: "Tratar-se-á" },
      { label: "E", valor: "Tratarão-se" },
    ],
    correta: "A",
    explicacao: "'Tratar-se de' (VTI + SE) é impessoal, sempre singular: 'Trata-se'.",
  },
  {
    id: 507,
    pergunta: "'As iniciativas de sustentabilidade assim como os projetos de inovação ______ transformação.'",
    opcoes: [
      { label: "A", valor: "representa" },
      { label: "B", valor: "representam" },
      { label: "C", valor: "representaria" },
      { label: "D", valor: "representariam" },
      { label: "E", valor: "representam ou representa" },
    ],
    correta: "B",
    explicacao: "'Assim como' une dois sujeitos, exigindo verbo plural: 'representam'.",
  },
  {
    id: 508,
    pergunta: "'À empresa ______ responsabilidade pelos danos ambientais causados na operação.'",
    opcoes: [
      { label: "A", valor: "cabe" },
      { label: "B", valor: "cabem" },
      { label: "C", valor: "cabia" },
      { label: "D", valor: "caberiam" },
      { label: "E", valor: "caberia" },
    ],
    correta: "A",
    explicacao: "Com sujeito singular posposto ('À empresa cabe...'), o verbo fica no singular.",
  },
  {
    id: 509,
    pergunta: "'A maioria dos técnicos e engenheiros ______ de que são necessárias inovações tecnológicas.'",
    opcoes: [
      { label: "A", valor: "concorda" },
      { label: "B", valor: "concordam" },
      { label: "C", valor: "concordaria" },
      { label: "D", valor: "concordariam" },
      { label: "E", valor: "concorde" },
    ],
    correta: "A",
    explicacao: "'A maioria de' (noun head no singular) concorda com o verbo no singular: 'concorda'.",
  },
  {
    id: 510,
    pergunta: "'Nem os investimentos maciços nem os programas de treinamento ______ erradicar completamente os problemas estruturais.'",
    opcoes: [
      { label: "A", valor: "consegue" },
      { label: "B", valor: "conseguem" },
      { label: "C", valor: "conseguiram" },
      { label: "D", valor: "conseguiria" },
      { label: "E", valor: "conseguiriam" },
    ],
    correta: "B",
    explicacao: "'Nem... nem' (sujeito composto) exige verbo no plural: 'conseguem'.",
  },
  {
    id: 511,
    pergunta: "'Os procedimentos de segurança, bem como o acompanhamento regulatório, ______ essenciais para a conformidade.'",
    opcoes: [
      { label: "A", valor: "é" },
      { label: "B", valor: "são" },
      { label: "C", valor: "será" },
      { label: "D", valor: "seria" },
      { label: "E", valor: "fosse" },
    ],
    correta: "B",
    explicacao: "'Bem como' une sujeitos, gerando concordância plural: 'são'.",
  },
  {
    id: 512,
    pergunta: "'A equipe de especialistas responsável pelos testes ______ seus certificados e ______ participação em todas as etapas.'",
    opcoes: [
      { label: "A", valor: "apresenta / garante" },
      { label: "B", valor: "apresentam / garantem" },
      { label: "C", valor: "apresenta / garantem" },
      { label: "D", valor: "apresentam / garante" },
      { label: "E", valor: "apresentaria / garantiria" },
    ],
    correta: "A",
    explicacao: "'Equipe' (singular) = verbo singular em ambas as lacunas.",
  },
];

export const CHALLENGE_POOL: ChallengeQuestion[] = [
  {
    id: 1,
    wrong: "Fazem dois anos que não a vejo.",
    correct: "Faz dois anos que não a vejo.",
    explanation: "O verbo FAZER indicando tempo decorrido é impessoal.",
  },
  {
    id: 2,
    wrong: "Aluga-se casas no centro.",
    correct: "Alugam-se casas no centro.",
    explanation: "VTD (Alugar) + SE = Voz Passiva Sintética. O sujeito (casas) concorda com o verbo.",
  },
  {
    id: 3,
    wrong: "Houveram muitos acidentes aqui.",
    correct: "Houve muitos acidentes aqui.",
    explanation: "O verbo HAVER com sentido de existir é impessoal.",
  },
];

// ── PALAVRAS PERIGOSAS ──────────────────────────────────────────────────

export const PALAVRAS_PERIGOSAS_CARDS: CarouselCard[] = [
  {
    icone: "📎",
    title: "Anexo / Incluso",
    corFundo: "bg-blue-100 dark:bg-blue-900/30",
    descricao: "São adjetivos. Concordam com o substantivo. ✅ Seguem anexas as faturas.",
  },
  {
    icone: "⚖️",
    title: "Bastante",
    corFundo: "bg-orange-100 dark:bg-orange-900/30",
    descricao: "Macete: troque por 'muito/muitos'. ✅ Havia bastantes dúvidas.",
  },
  {
    icone: "½",
    title: "Meio",
    corFundo: "bg-amber-100 dark:bg-amber-900/30",
    descricao: "Troque por 'um pouco' (invariável) ou 'metade' (varia). ✅ Ela está meio cansada.",
  },
];
