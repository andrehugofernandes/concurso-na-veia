import { QuizQuestion } from "../../shared";

export const QUIZ_MOD1_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "A palavra 'Paraguai' apresenta qual tipo de encontro vocálico?",
    opcoes: [
      { label: "A", valor: "Ditongo crescente" },
      { label: "B", valor: "Ditongo decrescente" },
      { label: "C", valor: "Tritongo (SV + V + SV)" },
      { label: "D", valor: "Hiato" },
    ],
    correta: "C",
    explicacao:
      "No tritongo, temos uma semivogal, uma vogal e outra semivogal na mesma sílaba (Pa-ra-guai).",
  },
  {
    id: 2,
    pergunta:
      "Na separação silábica da palavra 'Saúde', as vogais A e U ficam em sílabas diferentes. Isso é um:",
    opcoes: [
      { label: "A", valor: "Ditongo oral" },
      { label: "B", valor: "Tritongo nasal" },
      { label: "C", valor: "Hiato" },
      { label: "D", valor: "Digrama vocálico" },
    ],
    correta: "C",
    explicacao:
      "Hiato ocorre quando duas vogais aparecem juntas na palavra, mas ficam em sílabas separadas na pronúncia (sa-ú-de).",
  },
  {
    id: 3,
    pergunta:
      "Em 'Pai' e 'Caixa', temos encontros vocálicos que não se separam. Eles são:",
    opcoes: [
      { label: "A", valor: "Hiatos tônicos" },
      { label: "B", valor: "Ditongos decrescentes (Vogal + Semivogal)" },
      { label: "C", valor: "Ditongos crescentes (Semivogal + Vogal)" },
      { label: "D", valor: "Tritongos orais" },
    ],
    correta: "B",
    explicacao:
      "Ditongo decrescente começa com a vogal (mais forte) e termina com a semivogal (mais fraca).",
  },
  {
    id: 4,
    pergunta: "Qual das alternativas abaixo apresenta apenas HIATOS?",
    opcoes: [
      { label: "A", valor: "Poeta, Luar, Dia" },
      { label: "B", valor: "Lei, Noite, Aula" },
      { label: "C", valor: "Uruguai, Quais, Saguão" },
      { label: "D", valor: "Glória, Série, Água" },
    ],
    correta: "A",
    explicacao:
      "Po-e-ta, Lu-ar, Di-a. Em todos os casos, as vogais se separam.",
  },
  {
    id: 5,
    pergunta: "A palavra 'Pão' apresenta um tipo de encontro vocálico chamado:",
    opcoes: [
      { label: "A", valor: "Ditongo nasal" },
      { label: "B", valor: "Ditongo oral" },
      { label: "C", valor: "Hiato nasal" },
      { label: "D", valor: "Tritongo decrescente" },
    ],
    correta: "A",
    explicacao:
      "A presença do til (~) torna o som nasal, e a junção de 'a' e 'o' na mesma sílaba forma o ditongo.",
  },
  {
    id: 6,
    pergunta:
      "Na palavra 'Espécie', o encontro final '-ie' pode ser pronunciado de duas formas, mas na separação padrão de concursos é um:",
    opcoes: [
      { label: "A", valor: "Ditongo crescente (SV + V)" },
      { label: "B", valor: "Hiato obrigatório" },
      { label: "C", valor: "Tritongo eventual" },
      { label: "D", valor: "Ditongo nasal forte" },
    ],
    correta: "A",
    explicacao:
      "Terminações em -ea, -eo, -ia, -ie, -io são ditongos crescentes (paroxítonas terminadas em ditongo).",
  },
];

export const QUIZ_MOD2_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta:
      "Assinale a alternativa em que todas as palavras são acentuadas pela mesma regra:",
    opcoes: [
      { label: "A", valor: "História, Água, Cenário" },
      { label: "B", valor: "Armazém, Café, Vintém" },
      { label: "C", valor: "Médico, Pássaro, Caju" },
      { label: "D", valor: "Aí, Baú, Jibóia" },
    ],
    correta: "A",
    explicacao:
      "História, Água e Cenário são todas paroxítonas terminadas em ditongo oral.",
  },
  {
    id: 102,
    pergunta: "Qual é a regra que justifica o acento na palavra 'Saúde'?",
    opcoes: [
      { label: "A", valor: "Paroxítona terminada em 'e'." },
      { label: "B", valor: "Proparoxítona aparente." },
      {
        label: "C",
        valor:
          "Regra do hiato (vogais 'i' ou 'u' tônicas sozinhas ou com 's').",
      },
      {
        label: "D",
        valor: "Nova Ortografia que exige acento em vogais abertas.",
      },
    ],
    correta: "C",
    explicacao:
      "A letra 'u' faz hiato com o 'a' anterior (sa-ú-de) e está sozinha na sílaba. Por isso leva acento agudo.",
  },
  {
    id: 103,
    pergunta:
      "Segundo a norma-padrão da Língua Portuguesa, as palavras proparoxítonas devem:",
    opcoes: [
      {
        label: "A",
        valor: "Ser acentuadas apenas se terminarem em L, N, R, X ou PS.",
      },
      {
        label: "B",
        valor: "Ser acentuadas obrigatoriamente, sem exceção (regra geral).",
      },
      {
        label: "C",
        valor: "Ser isentas de acento se possuírem mais de três sílabas.",
      },
      { label: "D", valor: "Perderam o acento com o Novo Acordo Ortográfico." },
    ],
    correta: "B",
    explicacao:
      "A regra de ouro da acentuação: TODAS as proparoxítonas são acentuadas graficamente.",
  },
  {
    id: 104,
    pergunta: "Qual das seguintes palavras **não** leva acento e por quê?",
    opcoes: [
      { label: "A", valor: "Cipo (Planta / oxítona terminada em O)." },
      { label: "B", valor: "Hifen (Paroxítona terminada em N, leva acento)." },
      { label: "C", valor: "Caju (Oxítona terminada em U, não leva acento)." },
      { label: "D", valor: "Vovo (Precisa de acento agudo ou circunflexo)." },
    ],
    correta: "C",
    explicacao:
      "Oxítonas terminadas em U e I (como caju, saci, tatu) não são acentuadas, a menos que formem hiato tônico.",
  },
  {
    id: 105,
    pergunta: "As palavras rubrica, pudico e avaro são, na norma-padrão:",
    opcoes: [
      { label: "A", valor: "Proparoxítonas." },
      { label: "B", valor: "Paroxítonas." },
      { label: "C", valor: "Oxítonas." },
      { label: "D", valor: "Monossílabos admitidos por derivarem de verbos." },
    ],
    correta: "B",
    explicacao:
      "Um erro muito comum de prosódia (pronúncia). A sílaba forte dessas palavras é a penúltima: ruBRIca, puDIco, aVAro. Logo, são paroxítonas.",
  },
  {
    id: 106,
    pergunta:
      "Os monossílabos tônicos são acentuados sempre que terminarem em:",
    opcoes: [
      { label: "A", valor: "Qualquer vogal." },
      { label: "B", valor: "I, U, e consoantes O, L, R." },
      { label: "C", valor: "A, E, O, seguidos ou não de S." },
      { label: "D", valor: "M, N ou ditongos nasais." },
    ],
    correta: "C",
    explicacao:
      "Acentuam-se os monossílabos tônicos quando terminados em A(s), E(s), O(s). Exemplos: Pás, Pé, Pó, Nós.",
  },
  {
    id: 107,
    pergunta: "A palavra 'órfão' leva acento agudo porque é uma:",
    opcoes: [
      { label: "A", valor: "Proparoxítona que foge à regra do hiato." },
      { label: "B", valor: "Paroxítona terminada em ditongo 'ão'." },
      { label: "C", valor: "Oxítona de três sílabas terminada em til." },
      { label: "D", valor: "Exceção à Nova Ortografia." },
    ],
    correta: "B",
    explicacao:
      "O acento agudo se justifica por ser paroxítona terminada em '-ão'. O til (~) não é considerado um acento gráfico de tonicidade na primeira sílaba, mas uma marca de nasalização da última.",
  },
  {
    id: 108,
    pergunta:
      "No contexto da Petrobras, a palavra 'petróleo' é acentuada por que regra?",
    opcoes: [
      {
        label: "A",
        valor: "Paroxítona terminada em um ditongo crescente 'eo'.",
      },
      { label: "B", valor: "Oxítona seguida de vogal tônica 'o'." },
      { label: "C", valor: "Monossílabo tônico ligado ao radical." },
      { label: "D", valor: "Proparoxítona com acento diferencial." },
    ],
    correta: "A",
    explicacao:
      "Pe-tró-leo é uma paroxítona (sílaba tônica 'tró') terminada no ditongo oral 'eo'. Muitos autores a classificam também como 'proparoxítona aparente ou eventual'.",
  },
];

export const QUIZ_MOD3_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "A principal alteração do Novo Acordo nos ditongos abertos (EI e OI) foi:",
    opcoes: [
      {
        label: "A",
        valor: "Foram abolidos em todas as palavras (Ideia, Heroi, Ceu).",
      },
      {
        label: "B",
        valor:
          "Perderam o acento SOMENTE nas palavras paroxítonas (ex: ideia, jiboia).",
      },
      {
        label: "C",
        valor:
          "Perderam o acento SOMENTE nas palavras oxítonas (ex: papéis, herói não têm mais acento).",
      },
      { label: "D", valor: "Passaram a receber trema." },
    ],
    correta: "B",
    explicacao:
      "Atenção CESGRANRIO: Ditongos abertos EI e OI perderam o acento NAS PAROXÍTONAS (i-dei-a, ji-boi-a, pla-tei-a). Nas oxítonas e monossílabos, continua (pa-péIS, he-rói, dói).",
  },
  {
    id: 202,
    pergunta: "Com a Nova Ortografia, o trema (¨) ainda existe?",
    opcoes: [
      {
        label: "A",
        valor: "Foi 100% abolido da Língua Portuguesa sem nenhuma exceção.",
      },
      {
        label: "B",
        valor:
          "Existe apenas em palavras estranjeiras e seus derivados (Müller, mülleriano).",
      },
      {
        label: "C",
        valor: "Foi mantido para palavras agudas terminadas em u (agüentar).",
      },
      {
        label: "D",
        valor: "Existe em textos jurídicos antes do Acordo que são revalidados.",
      },
    ],
    correta: "B",
    explicacao:
      "O trema caiu totalmente para palavras brasileiras e aportuguesadas (aguentar, cinquenta, bilíngue). Porém, foi mantido para nomes próprios estrangeiros e derivados.",
  },
  {
    id: 203,
    pergunta:
      "Uma regra de hiato mudou. Assinale a palavra que GRAFA corretamente (sem acento) pelo Acordo:",
    opcoes: [
      { label: "A", valor: "Saúde." },
      { label: "B", valor: "Juíza." },
      { label: "C", valor: "Feiura." },
      { label: "D", valor: "Egoísta." },
    ],
    correta: "C",
    explicacao:
      "As vogais 'i/u' nos hiatos que vêm APOŚ DITONGO nas PAROXÍTONAS perderam o acento. Fei-u-ra, bo-cai-u-va, bai-u-ca. Note que Saúde e Juíza continuam normais porque não vêm de um ditongo imediatamente anterior.",
  },
  {
    id: 204,
    pergunta: "E sobre o hiato 'OO' e 'EE'?",
    opcoes: [
      { label: "A", valor: "Ganharam acento agudo (Vôo -> Vóo)." },
      { label: "B", valor: "Não se acentuam mais (Vôo -> Voo; Lêem -> Leem)." },
      { label: "C", valor: "Continuam com o circunflexo (Vôo, Enjôo, Dêem)." },
      { label: "D", valor: "Foram trocados por I e U (Vou, Leim)." },
    ],
    correta: "B",
    explicacao:
      "Macete: as letras duplas perderam o chapéu! Voo, enjoo, perdoo, leem, deem, creem, veem.",
  },
  {
    id: 205,
    pergunta:
      "Os acentos diferenciais. Qual par abaixo AINDA mantém o acento diferencial para distinguir palavras?",
    opcoes: [
      { label: "A", valor: "Para (verbo) x Para (preposição)." },
      { label: "B", valor: "Pêlo (cabelo) x Pelo (por + o)." },
      { label: "C", valor: "Pôde (pretérito) x Pode (presente)." },
      { label: "D", valor: "Pólo (extremidade) x Polo (jogo)." },
    ],
    correta: "C",
    explicacao:
      "O acento em 'pôde' (passado de poder, 3ª pes. sing.) continua para não confundir com 'pode'. O acento diferencial também continua em: Pôr x Por, Têm x Tem (plural e singular), Vêm x Vem (plural e singular).",
  },
  {
    id: 206,
    pergunta:
      "A palavra 'Bocaiuva' não leva acento por causa da mesma regra aplicada em qual outra palavra?",
    opcoes: [
      { label: "A", valor: "Jiboia (ditongo aberto nas paraxítonas)." },
      { label: "B", valor: "Voo (hiato de mesma letra nas paroxítonas)." },
      { label: "C", valor: "Guaíba (hiato após ditongo em oxítona)." },
      {
        label: "D",
        valor: "Baiuca (u/i tônico fazendo hiato após ditongo nas paroxítonas).",
      },
    ],
    correta: "D",
    explicacao:
      "Baiuca e Bocaiuva sofrem da mesma regra: i e u precedidos de ditongo na penúltima sílaba (paroxítonas) perderam o acento.",
  },
];

export const QUIZ_MOD4_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "A regra principal para uso do hífen com prefixos é a dos opostos. Assinale a alternativa correta:",
    opcoes: [
      {
        label: "A",
        valor:
          "Vogais iguais se juntam (microondas). Vogais diferentes se separam com hífen (auto-escola).",
      },
      {
        label: "B",
        valor:
          "Vogais iguais se separam com hífen (micro-ondas). Vogais diferentes se juntam (autoescola).",
      },
      {
        label: "C",
        valor: "Todas as vogais repetidas são aglutinadas (antiinflamatório).",
      },
      { label: "D", valor: "Nenhuma alternativa está correta." },
    ],
    correta: "B",
    explicacao:
      "Os opostos se atraem e os iguais se repelem. Vogais IGUAIS = separa com hífen (micro-ondas, anti-inflamatório). Vogais DIFERENTES = junta tudo (autoescola, infraestrutura).",
  },
  {
    id: 302,
    pergunta:
      "Como se escreve o prefixo terminado em vogal quando a próxima palavra começa por 'R' ou 'S'?",
    opcoes: [
      { label: "A", valor: "Com hífen. Ex: mini-saia, ultra-som." },
      {
        label: "B",
        valor: "Sem hífen, mas dobra-se o R ou S. Ex: minissaia, ultrassom.",
      },
      { label: "C", valor: "Sem hífen e sem dobrar. Ex: minisaia, ultrasom." },
      { label: "D", valor: "Com hífen e dobra-se o R ou S. Ex: mini-ssaia." },
    ],
    correta: "B",
    explicacao:
      "Se o prefixo terminar em VOGAL e a segunda palavra começar com R/S, não tem hífen, junta-se e dobra-se a consoante. Ex: minissaia, antissocial, macrorregião.",
  },
  {
    id: 303,
    pergunta:
      "Palavras compostas que PERDERAM a noção de composition pelo uso consagrado devem ser separadas por hífen?",
    opcoes: [
      {
        label: "A",
        valor: "Sempre, porque a história da palavra dita a regra.",
      },
      { label: "B", valor: "Não, perdem o hífen e aglutinam-se." },
      { label: "C", valor: "Apenas se tiverem mais de 3 sílabas." },
      {
        label: "D",
        valor: "Apenas palavras ligadas por preposição, como 'pé-de-moleque'.",
      },
    ],
    correta: "B",
    explicacao:
      "Se a palavra já é vista como uma só (Ex: girassol, mandachuva, passatempo, pontapé, paraquedas), ela perdeu o hífen pelo Acordo Ortográfico.",
  },
  {
    id: 304,
    pergunta:
      "Sobre as palavras ligadas por elementos de ligação (ex: prep. 'de'), marca a ERRADA segundo a nova regra:",
    opcoes: [
      { label: "A", valor: "Pé de moleque (sem hífen)." },
      { label: "B", valor: "Cara de pau (sem hífen)." },
      { label: "C", valor: "Dia a dia (sem hífen)." },
      { label: "D", valor: "Mão-de-obra (com hífen)." },
    ],
    correta: "D",
    explicacao:
      "A regra dice: Caiu o hífen em palavras compostas com elemento de ligação (de, a, do). O correto é MÃO DE OBRA, PÉ DE MOLEQUE, DIA A DIA. Exceções clássicas são nomes de plantas/animais (bico-de-papagaio) e palavras consagradas (água-de-colônia, arco-da-velha, mais-que-perfeito, cor-de-rosa).",
  },
  {
    id: 305,
    pergunta: "A palavra 'sub-reino' usa hífen porque:",
    opcoes: [
      {
        label: "A",
        valor: "Prefixos SUB ou SOB seguidos de R mantêm o hífen.",
      },
      {
        label: "B",
        valor: "Todo prefixo tem hífen obrigatoriamente quando não dobra a letra.",
      },
      { label: "C", valor: "Foi padronizado pela literatura." },
      { label: "D", valor: "O hífen substituiu o acento." },
    ],
    correta: "A",
    explicacao:
      "Os prefixos SUB e SOB exigem hífen se a segunda palavra começar com R (sub-raça, sub-região) ou B (sob-base). Ah, e SUB-HUMANO também ganha o hífen se mantivermos o H, mas 'subumano' (sem H e junto) também é aceito.",
  },
  {
    id: 306,
    pergunta:
      "Prefixos como 'ex', 'vice', 'aquém', 'além' e 'recém' seguem que regra para o hífen?",
    opcoes: [
      { label: "A", valor: "Sem hífen." },
      { label: "B", valor: "Apenas com vogais oponentes." },
      { label: "C", valor: "SEMPRE têm hífen." },
      { label: "D", valor: "Somente com nomes próprios." },
    ],
    correta: "C",
    explicacao:
      "Famosa 'Regra do Ex e do Vice'. Com 'ex', 'vice' (no sentido de posição anterior ou substituta), 'além', 'aquém' e 'recém', o hífen é sempre obrigatório. Ex: ex-namorado, vice-presidente, recém-casado.",
  },
];

export const QUIZ_MOD5_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "A frase: 'Não sei _____ tudo deu errado. Você concorda _____?' Os pronomes correspondentes são:",
    opcoes: [
      { label: "A", valor: "por que / porquê" },
      { label: "B", valor: "por que / com o por que" },
      { label: "C", valor: "porque / porque" },
      { label: "D", valor: "porquê / por quê" },
    ],
    correta: "A",
    explicacao:
      "A primeira frase usa 'por que' (separado e sem acento) como equivalente a 'por qual motivo'. A segunda, no final da pergunta ('Você concorda por quê?'), é separado e COM acento pois precede ponto de interrogação.",
  },
  {
    id: 402,
    pergunta: "Marque a opção onde ONDE / AONDE estão usados corretamente:",
    opcoes: [
      { label: "A", valor: "Aonde você mora agora?" },
      { label: "B", valor: "Onde vamos na sexta-feira?" },
      { label: "C", valor: "Não sei aonde você quer chegar." },
      { label: "D", valor: "Aonde estávamos mesmo?" },
    ],
    correta: "C",
    explicacao:
      "ONDE é lugar fixo, ideia de permanência (Onde você mora?). AONDE indica movimento/destino, equivale a 'para onde' e acompanha verbos como Ir, Chegar. (Aonde = para onde você quer chegar).",
  },
  {
    id: 403,
    pergunta:
      "Preencha a lacuna: 'O navio estava a _____ de 5 quilômetros do cais.'",
    opcoes: [
      { label: "A", valor: "cerca" },
      { label: "B", valor: "acerca" },
      { label: "C", valor: "ha cerca" },
      { label: "D", valor: "a cerca" },
    ],
    correta: "A",
    explicacao:
      "A expressão é 'Cerca de' (que indica aproximadamente). Ex: Estava a cerca de 5 km. Já 'Acerca de' significa 'sobre/a respeito de' (Ex: Falamos ACERCA DE política). E 'Há cerca de' indica tempo passado.",
  },
  {
    id: 404,
    pergunta: "Marque a certa. 'Ele é um _____ profissional; foi muito _____ no teste.'",
    opcoes: [
      { label: "A", valor: "mau / mal" },
      { label: "B", valor: "mau / mau" },
      { label: "C", valor: "mal / mau" },
      { label: "D", valor: "mal / mal" },
    ],
    correta: "A",
    explicacao:
      "Macete: MAU é o oposto de BOM. MAL é o oposto de BEM. Ele é um BOM profissional (então é MAU). Ele foi muito BEM no teste (então foi MAL).",
  },
  {
    id: 405,
    pergunta: "A expressão SENÃO é usada toda junta quando:",
    opcoes: [
      { label: "A", valor: "Puder ser substituída por 'caso não'." },
      {
        label: "B",
        valor: "Puder ser substituída por 'a não ser', 'do contrário', 'mas sim' ou significar um 'defeito'.",
      },
      { label: "C", valor: "Vem depois da palavra 'estudo'." },
      { label: "D", valor: "Estiver acompanhada do pronome ELA. (só se não...)" },
    ],
    correta: "B",
    explicacao:
      "Junto: Senão (a não ser, mas sim, caso contrário, defeito). Separado: Se não (condição -> caso não chova, iremos).",
  },
  {
    id: 406,
    pergunta: "Em frases declarativas afirmativas (respostas justiticativas), usa-se qual tipo de por quê?",
    opcoes: [
      { label: "A", valor: "Por que (separado e s/ acento)" },
      { label: "B", valor: "Porque (junto e s/ acento)" },
      { label: "C", valor: "Porquê (junto e c/ acento)" },
      { label: "D", valor: "Por quê (separado e c/ acento)" },
    ],
    correta: "B",
    explicacao:
      "Respostas = PORQUE (junto e sem acento), tem valor de 'pois'. Quando o 'porquê' vier acompanhado de artigo (O porquê), será um substantivo, junto COM acento.",
  },
];

export const QUIZ_MOD6_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta:
      "Em relação ao Acordo Ortográfico vigente, observe as palavras: I. Pinguim; II. Voos; III. Boia. Assinale a correta:",
    opcoes: [
      { label: "A", valor: "Todas perderam o acento gráfico/trema." },
      {
        label: "B",
        valor: "Pinguim (trema), Voos (acento no hiato) e Boia (ditongo de oxítona) perderam seus sinais.",
      },
      { label: "C", valor: "Apenas 'Boia' perdeu o acento." },
      { label: "D", valor: "Voos mantém o acento pois é exceção." },
    ],
    correta: "A",
    explicacao:
      "PINGUIM perdeu o trema (ü). VOOS (hiato oo) perdeu o circunflexo. E BÓIA virou BOIA porque o ditongo aberto OI em palavras paroxítonas perdeu o acento.",
  },
  {
    id: 502,
    pergunta: "A palavra 'micro-ondas' tem hífen pela mesma regra que obriga o hífen em:",
    opcoes: [
      { label: "A", valor: "Microcomputador" },
      { label: "B", valor: "Anti-inflamatório" },
      { label: "C", valor: "Autossustentável" },
      { label: "D", valor: "Inter-regional" },
    ],
    correta: "B",
    explicacao:
      "Micro-ondas tem hífen pois a vogal final do prefixo (o) é igual à inicial da segunda palavra (o). O mesmo ocorre em anti-inflamatório (i-i).",
  },
  {
    id: 503,
    pergunta: "Identifique a frase correta quanto ao uso dos porquês:",
    opcoes: [
      { label: "A", valor: "Não sei por que a sonda falhou." },
      { label: "B", valor: "Ele chorou porque?" },
      { label: "C", valor: "Eis o por que da demora." },
      { label: "D", valor: "Porquê você não veio trabalhar?" },
    ],
    correta: "A",
    explicacao:
      "Em A, equivale a 'por qual motivo' (separado e sem acento). B: 'por quê' (interrogação). C: 'o porquê' (substantivado, tem acento). D: 'Por que' (início de pergunta, não tem acento).",
  },
  {
    id: 504,
    pergunta: "Qual dupla está 100% correta no uso de acentuação?",
    opcoes: [
      { label: "A", valor: "Eles pôdem vir amanhã / O vôo atrasou" },
      { label: "B", valor: "Eles vêm cedo / Ele intervém sempre" },
      { label: "C", valor: "Ideía brilhante / Heroi fraco" },
      { label: "D", valor: "Pêlo do cão / Péra madura" },
    ],
    correta: "B",
    explicacao:
      "Vêm (plural de vir recebe circunflexo); Intervém (derivado de terceira pessoa do singular, recebe acento agudo, virando oxítona). O plural seria intervêm.",
  },
  {
    id: 505,
    pergunta: "A conjugação 'Eles creem' e 'Ele cre' (verbo crer) estão grafadas corretamente?",
    opcoes: [
      { label: "A", valor: "Sim, faltou acento apenas na plural." },
      { label: "B", valor: "O correto é crêem e crê." },
      { label: "C", valor: "O correto é creem e crê." },
      { label: "D", valor: "Nenhuma das anteriores." },
    ],
    correta: "C",
    explicacao:
      "'Creem' (hiato 'ee' perdeu acento com o Novo Acordo). Já 'crê' (monossílabo tônico finalizado em E ganha circunflexo, independentemente do acordo).",
  },
  {
    id: 506,
    pergunta: "Complete corretamente: 'Os técnicos agiram _____ e por isso o equipamento sofreu um _____ irreparável.'",
    opcoes: [
      { label: "A", valor: "mau / mau" },
      { label: "B", valor: "mal / mal" },
      { label: "C", valor: "mau / mal" },
      { label: "D", valor: "mal / mau" },
    ],
    correta: "D",
    explicacao:
      "Eles agiram BEM (oposto de MAL na ação adverbial). O equipamento sofreu um BOM defeito(?) Não, oposto de BOM é MAU (adjetivo qualificando o substantivo irreparável). Logo MAL / MAU.",
  },
];

export const QUIZ_MOD7_POOL: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "Complete corretamente: 'Sua ______ ao conselho foi muito ______.'",
    opcoes: [
      { label: "A", valor: "cessão / bem-vinda" },
      { label: "B", valor: "sessão / bem vinda" },
      { label: "C", valor: "seção / bem-vinda" },
      { label: "D", valor: "cessão / bem vinda" },
    ],
    correta: "A",
    explicacao:
      "CESSÃO (ato de ceder/transferir). BEM-VINDA (com hífen quando adjetivo composto). Ambas devem ser acentuadas/hifenadas corretamente.",
  },
  {
    id: 702,
    pergunta: "Qual das palavras está grafada INCORRETAMENTE?",
    opcoes: [
      { label: "A", valor: "Exceção" },
      { label: "B", valor: "Detenção" },
      { label: "C", valor: "Contenção" },
      { label: "D", valor: "Intinção" },
    ],
    correta: "D",
    explicacao: "O correto é INTENÇÃO (do verbo intencionar). INTINÇÃO não existe.",
  },
  {
    id: 703,
    pergunta: "'Beiju', 'Caatinga' e 'Sertanejo' têm qual característica em comum?",
    opcoes: [
      { label: "A", valor: "Todas têm hiato" },
      { label: "B", valor: "Todas têm ditongo" },
      { label: "C", valor: "Todas têm hiato E ditongo" },
      { label: "D", valor: "Todas têm tritongo" },
    ],
    correta: "C",
    explicacao:
      "Beiju (ei=ditongo, u isolado), Caatinga (aa=hiato, in=ditongo), Sertanejo (e isolado=hiato, ei=ditongo).",
  },
  {
    id: 704,
    pergunta: "Complete: 'O ______ do equipamento foi ______ ao técnico.'",
    opcoes: [
      { label: "A", valor: "concerto / comunícado" },
      { label: "B", valor: "conserto / comunicado" },
      { label: "C", valor: "conserto / comunícado" },
      { label: "D", valor: "concerto / comunicado" },
    ],
    correta: "B",
    explicacao:
      "CONSERTO (reparo). COMUNICADO (informação, sem acento em -ado).",
  },
  {
    id: 705,
    pergunta: "Qual palavra precisa de acento gráfico?",
    opcoes: [
      { label: "A", valor: "Criterio" },
      { label: "B", valor: "Policia" },
      { label: "C", valor: "Geologia" },
      { label: "D", valor: "Biologia" },
    ],
    correta: "A",
    explicacao:
      "CRITÉRIO (proparoxítona). POLÍCIA e BIOLOGIA têm acento no proparoxítono, mas BIOLOGIA não é proparoxítona. O correto é CRITÉRIO.",
  },
  {
    id: 706,
    pergunta: "'Pré-escolar' e 'pré-moldado' são grafados com hífen. Qual NÃO deveria ter?",
    opcoes: [
      { label: "A", valor: "Pré-primário" },
      { label: "B", valor: "Pré-aviso" },
      { label: "C", valor: "Preposição" },
      { label: "D", valor: "Pré-aquecimento" },
    ],
    correta: "C",
    explicacao:
      "PREPOSIÇÃO não tem hífen porque o 'pré' é parte integrante da palavra (prefixo fusionado). As outras têm hífen antes de vogal.",
  },
  {
    id: 707,
    pergunta: "Qual palavra tem acento diferencial OBRIGATÓRIO segundo o Novo Acordo?",
    opcoes: [
      { label: "A", valor: "Pêlo (cabelo) / Pelo (mediante)" },
      { label: "B", valor: "Pôr (verbo) / Por (preposição)" },
      { label: "C", valor: "Côco (árvore) / Coco (bebida)" },
      { label: "D", valor: "Forma" },
    ],
    correta: "B",
    explicacao:
      "Apenas PÔR (verbo) mantém acento diferencial. PÊLO e CÔCO perderam o acento após o Novo Acordo.",
  },
  {
    id: 708,
    pergunta: "Complete corretamente: 'O ______ foi encontrado ______ nas águas.'",
    opcoes: [
      { label: "A", valor: "navio / ancorado" },
      { label: "B", valor: "navio / ancorado" },
      { label: "C", valor: "navío / ancorádó" },
      { label: "D", valor: "navio / ancorádó" },
    ],
    correta: "A",
    explicacao:
      "NAVIO (oxítona em 'a'). ANCORADO (paroxítona, sem acento em '-ado').",
  },
];

export const QUIZ_MOD8_POOL: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "Qual é a forma correta de pluralizar 'pão-de-queijo'?",
    opcoes: [
      { label: "A", valor: "Pães-de-queijos" },
      { label: "B", valor: "Pão-de-queijos" },
      { label: "C", valor: "Pães-de-queijo" },
      { label: "D", valor: "Pão-de-quejo" },
    ],
    correta: "C",
    explicacao:
      "Em palavras compostas com hífen, pluraliza-se o primeiro e último elemento quando ambos são nomes. Mas aqui 'de' é preposição, então só primeiro: PÃES-DE-QUEIJO.",
  },
  {
    id: 802,
    pergunta: "'Colégio', 'Correio', 'Boleia' - qual está INCORRETAMENTE grafada?",
    opcoes: [
      { label: "A", valor: "Colégio" },
      { label: "B", valor: "Correio" },
      { label: "C", valor: "Boleia" },
      { label: "D", valor: "Nenhuma" },
    ],
    correta: "D",
    explicacao:
      "Todas estão corretas. COLÉGIO, CORREIO (da Administração), BOLEIA (banco do carroceiro ou reboque).",
  },
  {
    id: 803,
    pergunta: "Complete: 'O ______ do banco ______ a operação ______.'",
    opcoes: [
      { label: "A", valor: "diretor / parou / indevidamente" },
      { label: "B", valor: "diretor / pàrou / indevidamente" },
      { label: "C", valor: "diretur / parou / indevidamente" },
      { label: "D", valor: "diretor / parou / indévidamente" },
    ],
    correta: "A",
    explicacao:
      "DIRETOR (oxítona). PAROU (pretérito, sem acento). INDEVIDAMENTE (advérbio, sem acento).",
  },
  {
    id: 804,
    pergunta: "Qual sequência está TODA grafada corretamente?",
    opcoes: [
      { label: "A", valor: "Éxecução, Receção, Ação" },
      { label: "B", valor: "Execução, Recepção, Ação" },
      { label: "C", valor: "Execução, Receção, Ação" },
      { label: "D", valor: "Execução, Recepção, Ação" },
    ],
    correta: "D",
    explicacao:
      "EXECUÇÃO (com 'x'), RECEPÇÃO (com 'c' antes de 'ç'), AÇÃO (sem acento). Opção D está completa e correta.",
  },
  {
    id: 805,
    pergunta: "'Voo', 'Zoo', 'Crochê' - qual segue corretamente o Novo Acordo?",
    opcoes: [
      { label: "A", valor: "Voo (2 oo)" },
      { label: "B", valor: "Zoo (2 oo)" },
      { label: "C", valor: "Crochê (com acento)" },
      { label: "D", valor: "Todas corretas" },
    ],
    correta: "D",
    explicacao:
      "Todas estão certas. VOO e ZOO mantêm duplo 'o'. CROCHÊ mantém o acento (monossílaba tônica em 'ê').",
  },
  {
    id: 806,
    pergunta: "Complete: 'O ______ estava ______ ao novo software.'",
    opcoes: [
      { label: "A", valor: "técnico / alheio" },
      { label: "B", valor: "técnico / alheio" },
      { label: "C", valor: "tecnico / alheio" },
      { label: "D", valor: "técnico / alheo" },
    ],
    correta: "B",
    explicacao:
      "TÉCNICO (proparoxítona, sempre com acento). ALHEIO (díitongo 'ei', sem acento como paroxítona).",
  },
  {
    id: 807,
    pergunta: "Qual palavra teve sua grafia alterada APENAS pelo Novo Acordo?",
    opcoes: [
      { label: "A", valor: "Côco → Coco" },
      { label: "B", valor: "Pêlo → Pelo" },
      { label: "C", valor: "Pôr → Por" },
      { label: "D", valor: "Nenhuma (todas mantêm acentos)" },
    ],
    correta: "A",
    explicacao:
      "Apenas CÔCO perdeu o acento, virando COCO. PÔR mantém diferencial (verbo). PÊLO também perdeu.",
  },
  {
    id: 808,
    pergunta: "Complete: 'A ______ entre as ______ foi ______.'",
    opcoes: [
      { label: "A", valor: "discusão / proposições / polêmica" },
      { label: "B", valor: "discussão / proposições / polêmica" },
      { label: "C", valor: "discussão / propozições / polêmica" },
      { label: "D", valor: "discusão / proposições / polémica" },
    ],
    correta: "B",
    explicacao:
      "DISCUSSÃO (duplo 's'). PROPOSIÇÕES (com 's'). POLÊMICA (paroxítona com 'e').",
  },
];

export const QUIZ_MOD9_POOL: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "Em textos técnicos Petrobras, qual é a grafia padrão?",
    opcoes: [
      { label: "A", valor: "Operação off-shore" },
      { label: "B", valor: "Operação offshore" },
      { label: "C", valor: "Operação off shore" },
      { label: "D", valor: "Operação Offshore" },
    ],
    correta: "B",
    explicacao:
      "Em português, offshore é escrito sem hífen e em minúscula (quando não é início de frase).",
  },
  {
    id: 902,
    pergunta: "'Poço', 'Cabeça de poço' - qual está INCORRETAMENTE grafada?",
    opcoes: [
      { label: "A", valor: "Poço" },
      { label: "B", valor: "Cabeça-de-poço" },
      { label: "C", valor: "Cabeça de poço" },
      { label: "D", valor: "Nenhuma" },
    ],
    correta: "D",
    explicacao:
      "Todas corretas. A designação técnica pode usar hífen (padrão em compostos técnicos) ou não.",
  },
  {
    id: 903,
    pergunta: "Complete com a grafia técnica correta: 'O ______ do sistema foi ______.'",
    opcoes: [
      { label: "A", valor: "diagnóstico / satisfató­rio" },
      { label: "B", valor: "diagnóstico / satisfatório" },
      { label: "C", valor: "diagnostico / satisfatório" },
      { label: "D", valor: "diagnóstico / satisfatório" },
    ],
    correta: "B",
    explicacao:
      "DIAGNÓSTICO (proparoxítona). SATISFATÓRIO (paroxítona, sem acento).",
  },
  {
    id: 904,
    pergunta: "'Protocolo', 'Procedimento', 'Medida' - qual precisa de acento?",
    opcoes: [
      { label: "A", valor: "Protocolo" },
      { label: "B", valor: "Procedimento" },
      { label: "C", valor: "Medida" },
      { label: "D", valor: "Nenhuma" },
    ],
    correta: "D",
    explicacao:
      "Nenhuma. PROTOCOLO (paroxítona não acentuada). PROCEDIMENTO (paroxítona). MEDIDA (paroxítona).",
  },
  {
    id: 905,
    pergunta: "Complete: 'A ______ foi estabelecida com ______.'",
    opcoes: [
      { label: "A", valor: "rotina / critério" },
      { label: "B", valor: "rotina / crtiério" },
      { label: "C", valor: "rotína / critério" },
      { label: "D", valor: "rotina / criterio" },
    ],
    correta: "A",
    explicacao:
      "ROTINA (paroxítona comum). CRITÉRIO (proparoxítona, sempre com acento).",
  },
  {
    id: 906,
    pergunta: "Qual é a forma correta em contexto formal/técnico?",
    opcoes: [
      { label: "A", valor: "Relatório" },
      { label: "B", valor: "Relatorio" },
      { label: "C", valor: "Relátório" },
      { label: "D", valor: "Relatóre" },
    ],
    correta: "A",
    explicacao:
      "RELATÓRIO (proparoxítona, sempre acentuada). Única forma correta.",
  },
  {
    id: 907,
    pergunta: "Complete: 'O sistema ______ foi ______ em ______.'",
    opcoes: [
      { label: "A", valor: "eletrônico / implantado / 2024" },
      { label: "B", valor: "eletrônico / implantado / 2.024" },
      { label: "C", valor: "eletrônico / implantado / dois mil vinte e quatro" },
      { label: "D", valor: "eletrônico / implantado / 2024" },
    ],
    correta: "D",
    explicacao:
      "ELETRÔNICO (paroxítona, mantém acento). IMPLANTADO (paroxítona, sem acento). Ano: 2024 (sem ponto).",
  },
  {
    id: 908,
    pergunta: "Qual palavra está INCORRETAMENTE grafada?",
    opcoes: [
      { label: "A", valor: "Essencial" },
      { label: "B", valor: "Potencial" },
      { label: "C", valor: "Resíduo" },
      { label: "D", valor: "Imediáto" },
    ],
    correta: "D",
    explicacao:
      "IMEDIATO (paroxítona, sem acento). Deveria ser escrito assim, não com acento em 'á'.",
  },
];

export const QUIZ_MOD10_POOL: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "Qual é a única grafia correta em português?",
    opcoes: [
      { label: "A", valor: "Reumatismo / Reomatismo" },
      { label: "B", valor: "Reumatismo" },
      { label: "C", valor: "Rumatismo" },
      { label: "D", valor: "Reomatismo" },
    ],
    correta: "B",
    explicacao:
      "REUMATISMO (com 'eu'). O 'eu' é um díitongo crescente no início da palavra.",
  },
  {
    id: 1002,
    pergunta: "Complete corretamente: 'O ______ do equipamento exigia ______.'",
    opcoes: [
      { label: "A", valor: "manutensão / atenção" },
      { label: "B", valor: "manutenção / atenção" },
      { label: "C", valor: "manutensão / atensão" },
      { label: "D", valor: "manutenção / atensão" },
    ],
    correta: "B",
    explicacao:
      "MANUTENÇÃO e ATENÇÃO (ambas terminadas em '-ção', sem acento em palavras paroxítonas).",
  },
  {
    id: 1003,
    pergunta: "Qual sequência está COMPLETAMENTE correta?",
    opcoes: [
      { label: "A", valor: "Ação, Reação, Intenção" },
      { label: "B", valor: "Ação, Reação, Intenção" },
      { label: "C", valor: "Ação, Reação, Intensão" },
      { label: "D", valor: "Ação, Reação, Intenção" },
    ],
    correta: "A",
    explicacao:
      "AÇÃO, REAÇÃO, INTENÇÃO (todas paroxítonas em '-ção', sem acentos).",
  },
  {
    id: 1004,
    pergunta: "Complete o texto técnico: 'O ______ foi ______ e seu ______ foi _______.'",
    opcoes: [
      { label: "A", valor: "ensaio / concluído / resultado / satisfatório" },
      { label: "B", valor: "ensaio / concluído / resultado / satisfatório" },
      { label: "C", valor: "ensaio / concluído / resultado / satisfatório" },
      { label: "D", valor: "ensaio / concluso / resultado / satisfatório" },
    ],
    correta: "A",
    explicacao:
      "ENSAIO (paroxítona, sem acento). CONCLUÍDO (verbo no particípio, acentuado). RESULTADO (paroxítona). SATISFATÓRIO (paroxítona, sem acento).",
  },
  {
    id: 1005,
    pergunta: "Qual das palavras NÃO é um proparoxítona?",
    opcoes: [
      { label: "A", valor: "Médico" },
      { label: "B", valor: "Técnico" },
      { label: "C", valor: "Dúvida" },
      { label: "D", valor: "Público" },
    ],
    correta: "C",
    explicacao:
      "DÚVIDA é paroxítona (acento na 2ª sílaba). MÉDICO, TÉCNICO, PÚBLICO são proparoxítonas.",
  },
  {
    id: 1006,
    pergunta: "Complete: 'A ______ entre as ______ gerou muita _______.'",
    opcoes: [
      { label: "A", valor: "confusão / conclusões / controvérsia" },
      { label: "B", valor: "confusão / conclusões / controvérsea" },
      { label: "C", valor: "confusão / conclusões / controvérsia" },
      { label: "D", valor: "confusão / conclusões / controversia" },
    ],
    correta: "A",
    explicacao:
      "CONFUSÃO (paroxítona em '-ão'). CONCLUSÕES (plural paroxítona). CONTROVÉRSIA (proparoxítona).",
  },
  {
    id: 1007,
    pergunta: "Qual é a forma correta de escrever a palavra com prefixo?",
    opcoes: [
      { label: "A", valor: "Antiaéreo" },
      { label: "B", valor: "Anti-aéreo" },
      { label: "C", valor: "Antí-aéreo" },
      { label: "D", valor: "Anti-aéreo" },
    ],
    correta: "A",
    explicacao:
      "ANTIAÉREO (sem hífen quando o prefixo termina em vogal diferente da vogal inicial da palavra seguinte).",
  },
  {
    id: 1008,
    pergunta: "Complete corretamente: 'A ______ do projeto foi ______ com _______.'",
    opcoes: [
      { label: "A", valor: "execução / comunicada / precisão" },
      { label: "B", valor: "execução / comunicada / precisão" },
      { label: "C", valor: "execução / comunicada / precisão" },
      { label: "D", valor: "execução / comunicada / precisão" },
    ],
    correta: "A",
    explicacao:
      "EXECUÇÃO (com 'x'). COMUNICADA (particípio). PRECISÃO (paroxítona em '-ão').",
  },
];
