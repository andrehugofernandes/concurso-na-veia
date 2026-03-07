import { QuizQuestion } from "../../shared";

export const QUIZ_M1_REGENCIA: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "Na frase 'O técnico é favorável ___ novas normas de segurança', qual preposição completa a regência nominal?",
    opcoes: [
      { label: "A", valor: "com" },
      { label: "B", valor: "às" },
      { label: "C", valor: "nas" },
      { label: "D", valor: "por" },
    ],
    correta: "B",
    explicacao: "O nome 'favorável' exige a preposição 'a'. Como 'novas normas' é feminino plural, ocorre a crase.",
  },
  {
    id: 102,
    pergunta: "Qual dos nomes abaixo exige a preposição 'de' em sua regência?",
    opcoes: [
      { label: "A", valor: "Acessível" },
      { label: "B", valor: "Atento" },
      { label: "C", valor: "Passível" },
      { label: "D", valor: "Útil" },
    ],
    correta: "C",
    explicacao: "'Passível' rege a preposição 'de' (ex: Passível de punição).",
  },
];

export const QUIZ_M2_REGENCIA: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Com o sentido de 'pretender, objetivar', qual o padrão de regência do verbo visar?",
    opcoes: [
      { label: "A", valor: "Visar o êxito (Transitivo Direto)." },
      { label: "B", valor: "Visar ao êxito (Transitivo Indireto)." },
      { label: "C", valor: "Visar pelo êxito (Regência com 'por')." },
      { label: "D", valor: "Visar com o êxito (Regência com 'com')." },
    ],
    correta: "B",
    explicacao: "Como VTI (Verbo Transitivo Indireto), com o sentido de 'objetivar', o verbo 'visar' exige a preposição 'A'.",
  },
  {
    id: 202,
    pergunta: "Em qual frase o verbo 'Assistir' significa prestar socorro?",
    opcoes: [
      { label: "A", valor: "Assistimos ao jogo no estádio." },
      { label: "B", valor: "O médico assistiu o ferido na ambulância." },
      { label: "C", valor: "Eles assistem em Brasília atualmente." },
      { label: "D", valor: "Assiste ao cidadão o direito de defesa." },
    ],
    correta: "B",
    explicacao: "Como VTD (Verbo Transitivo Direto), 'assistir' significa ajudar ou socorrer.",
  },
];

export const QUIZ_M3_REGENCIA: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Sobre o verbo 'Preferir', assinale a única estrutura aceita pela norma culta:",
    opcoes: [
      { label: "A", valor: "Prefiro mais o turno da manhã do que o da noite." },
      { label: "B", valor: "Prefiro o turno da manhã antes que o da noite." },
      { label: "C", valor: "Prefiro o turno da manhã ao da noite." },
      { label: "D", valor: "Prefiro mil vezes o turno da manhã do que o da noite." },
    ],
    correta: "C",
    explicacao: "O Verbo Transitivo Direto e Indireto 'Preferir' rege a forma 'Preferir algo a outra coisa'.",
  },
  {
    id: 302,
    pergunta: "Qual a regência correta dos verbos 'Esquecer' e 'Lembrar' quando pronominais (esquecer-se / lembrar-se)?",
    opcoes: [
      { label: "A", valor: "Esqueci-me o documento." },
      { label: "B", valor: "Lembrei o compromisso." },
      { label: "C", valor: "Esqueci-me do documento." },
      { label: "D", valor: "Lembrei-me o compromisso." },
    ],
    correta: "C",
    explicacao: "Quando acompanhados de pronome reflexivo, os verbos 'esquecer' e 'lembrar' exigem a preposição DE.",
  },
];

export const QUIZ_M4_REGENCIA: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Em qual alternativa o pronome relativo respeita a regência do verbo na oração subordinada?",
    opcoes: [
      { label: "A", valor: "O cargo que aspiros é muito concorrido." },
      { label: "B", valor: "O cargo a que aspiro é muito concorrido." },
      { label: "C", valor: "As normas onde obedecemos são rígidas." },
      { label: "D", valor: "O filme que assistimos foi ótimo." },
    ],
    correta: "B",
    explicacao: "O verbo 'aspirar' (desejar) exige a preposição 'A', que deve ser anteposta ao pronome relativo 'que'.",
  },
  {
    id: 402,
    pergunta: "Complete corretamente: 'Este é o projeto ___ confio'.",
    opcoes: [
      { label: "A", valor: "que" },
      { label: "B", valor: "o qual" },
      { label: "C", valor: "em que" },
      { label: "D", valor: "a que" },
    ],
    correta: "C",
    explicacao: "Quem confia, confia EM algo. Por isso, a preposição 'em' deve ser usada antes do pronome relativo.",
  },
];

export const QUIZ_FINAL_REGENCIA: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "A regência do verbo 'IMPLICAR' com sentido de 'acarretar' foi corretamente empregada em:",
    opcoes: [
      { label: "A", valor: "O erro implicará em punição severa." },
      { label: "B", valor: "A mudança implicará novos custos operacionais." },
      { label: "C", valor: "O atraso implicou na demissão do funcionário." },
      { label: "D", valor: "Mudar as regras implica aos trabalhadores novos deveres." },
    ],
    correta: "B",
    explicacao: "No sentido de 'acarretar', IMPLICAR é Verbo Transitivo Direto (sem preposição).",
  },
  {
    id: 502,
    pergunta: "Assinale a alternativa que apresenta erro de regência verbal segundo a norma gramática:",
    opcoes: [
      { label: "A", valor: "Informamos os candidatos da data da prova." },
      { label: "B", valor: "Informamos aos candidatos a data da prova." },
      { label: "C", valor: "Esqueci dos meus livros." },
      { label: "D", valor: "Lembrei o nome do novo supervisor." },
    ],
    correta: "C",
    explicacao: "Sem o pronome (esqueci-me), o verbo 'esquecer' deve ser direto (Esqueci os meus livros). 'Esqueci dos' é uma mistura incorreta.",
  },
];
