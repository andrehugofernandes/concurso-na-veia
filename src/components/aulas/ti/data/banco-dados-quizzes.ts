import { QuizQuestion } from "../../shared";

// Questionário para a Aula Premium de Banco de Dados
// Focado no Perfil CESGRANRIO / Petrobras

export const quizM1: QuizQuestion[] = [
  {
    id: "m1-q1",
    pergunta: "No Modelo Entidade-Relacionamento (ER), um atributo que pode ser decomposto em partes menores (ex: Endereço em Rua, Número, CEP) é chamado de:",
    opcoes: [
      { label: "A", valor: "Atributo Simples" },
      { label: "B", valor: "Atributo Composto" },
      { label: "C", valor: "Atributo Multivalorado" },
      { label: "D", valor: "Atributo Derivado" }
    ],
    correta: "B",
    explicacao: "Atributos compostos são aqueles que possuem subpartes com significados independentes."
  },
  {
    id: "m1-q2",
    pergunta: "Em um diagrama ER, a cardinalidade (1,N) indica que:",
    opcoes: [
      { label: "A", valor: "Uma entidade se relaciona com exatamente uma ocorrência de outra." },
      { label: "B", valor: "Uma entidade pode se relacionar com várias ocorrências de outra, sendo pelo menos uma obrigatória." },
      { label: "C", valor: "A participação no relacionamento é opcional para ambas as entidades." },
      { label: "D", valor: "Trata-se de um relacionamento de auto-referência." }
    ],
    correta: "B",
    explicacao: "O prefixo (1,N) significa participação mínima de 1 (obrigatória) e máxima de N (muitos)."
  }
];

export const quizM2: QuizQuestion[] = [
  {
    id: "m2-q1",
    pergunta: "No Modelo Relacional, a restrição que garante que uma chave estrangeira (FK) deve referenciar uma chave primária (PK) existente é a:",
    opcoes: [
      { label: "A", valor: "Integridade de Entidade" },
      { label: "B", valor: "Integridade Referencial" },
      { label: "C", valor: "Integridade de Domínio" },
      { label: "D", valor: "Restrição de Not Null" }
    ],
    correta: "B",
    explicacao: "A Integridade Referencial garante a consistência entre tabelas relacionadas, impedindo 'órfãos' no banco de dados."
  }
];

export const quizM3: QuizQuestion[] = [
  {
    id: "m3-q1",
    pergunta: "Para uma tabela estar na 2ª Forma Normal (2FN), ela deve obrigatoriamente estar na 1FN e:",
    opcoes: [
      { label: "A", valor: "Não possuir dependências transitivas." },
      { label: "B", valor: "Não possuir dependências parciais (todo atributo não chave deve depender da PK inteira)." },
      { label: "C", valor: "Não possuir atributos multivalorados." },
      { label: "D", valor: "Ter apenas chaves primárias numéricas." }
    ],
    correta: "B",
    explicacao: "A 2FN foca em eliminar dependências parciais, onde um atributo depende apenas de parte de uma chave primária composta."
  },
  {
    id: "m3-q2",
    pergunta: "Qual forma normal é violada quando um atributo não-chave depende de outro atributo não-chave?",
    opcoes: [
      { label: "A", valor: "1FN" },
      { label: "B", valor: "2FN" },
      { label: "C", valor: "3FN" },
      { label: "D", valor: "4FN" }
    ],
    correta: "C",
    explicacao: "A 3FN proíbe dependências transitivas, ou seja, atributos que dependem de outros atributos que não são a chave primária."
  }
];

export const quizM4: QuizQuestion[] = [
  {
    id: "m4-q1",
    pergunta: "Qual comando SQL é utilizado para modificar a estrutura de uma tabela, como adicionar uma nova coluna?",
    opcoes: [
      { label: "A", valor: "UPDATE TABLE" },
      { label: "B", valor: "MODIFY TABLE" },
      { label: "C", valor: "ALTER TABLE" },
      { label: "D", valor: "CHANGE TABLE" }
    ],
    correta: "C",
    explicacao: "O comando ALTER TABLE faz parte da DDL (Data Definition Language) e serve para alterar o esquema do banco de dados."
  }
];

export const quizM5: QuizQuestion[] = [
  {
    id: "m5-q1",
    pergunta: "Na cláusula SELECT, qual função é utilizada para contar o número de registros não nulos em uma coluna específica?",
    opcoes: [
      { label: "A", valor: "SUM()" },
      { label: "B", valor: "TOTAL()" },
      { label: "C", valor: "COUNT()" },
      { label: "D", valor: "LENGTH()" }
    ],
    correta: "C",
    explicacao: "COUNT(coluna) conta apenas valores não nulos. COUNT(*) conta todas as linhas."
  }
];

export const quizM6: QuizQuestion[] = [
  {
    id: "m6-q1",
    pergunta: "Ao realizar um JOIN entre as tabelas A e B, qual tipo de junção retorna todos os registros de A, mesmo que não haja correspondência em B?",
    opcoes: [
      { label: "A", valor: "INNER JOIN" },
      { label: "B", valor: "RIGHT JOIN" },
      { label: "C", valor: "LEFT JOIN" },
      { label: "D", valor: "CROSS JOIN" }
    ],
    correta: "C",
    explicacao: "O LEFT (OUTER) JOIN prioriza a tabela da esquerda, trazendo nulos para os campos da direita onde não houver match."
  }
];

export const quizM7: QuizQuestion[] = [
  {
    id: "m7-q1",
    pergunta: "Na sigla ACID, a propriedade que garante que uma transação seja executada 'tudo ou nada' é a:",
    opcoes: [
      { label: "A", valor: "Atomicidade" },
      { label: "B", valor: "Consistência" },
      { label: "C", valor: "Isolamento" },
      { label: "D", valor: "Durabilidade" }
    ],
    correta: "A",
    explicacao: "Atomicidade garante que se qualquer parte da transação falhar, toda a transação seja revertida (rollback)."
  }
];

export const quizM8: QuizQuestion[] = [
  {
    id: "m8-q1",
    pergunta: "Qual das seguintes categorias de NoSQL é mais adequada para armazenar redes sociais onde os relacionamentos são tão importantes quanto os dados?",
    opcoes: [
      { label: "A", valor: "Document Store (ex: MongoDB)" },
      { label: "B", valor: "Key-Value Store (ex: Redis)" },
      { label: "C", valor: "Graph Store (ex: Neo4j)" },
      { label: "D", valor: "Column Family Store (ex: Cassandra)" }
    ],
    correta: "C",
    explicacao: "Bancos de Grafos são otimizados para navegar em relacionamentos complexos entre nós."
  }
];

export const quizM9: QuizQuestion[] = [
  {
    id: "m9-q1",
    pergunta: "Em Data Warehousing, a operação de detalhar um dado, indo do nível de resumo para o nível mais granular (ex: de Ano para Mês), chama-se:",
    opcoes: [
      { label: "A", valor: "Roll-up" },
      { label: "B", valor: "Drill-down" },
      { label: "C", valor: "Slice and Dice" },
      { label: "D", valor: "Pivot" }
    ],
    correta: "B",
    explicacao: "Drill-down é a navegação no sentido de maior detalhamento. Roll-up é o inverso (agregação)."
  }
];

export const quizM10: QuizQuestion[] = [
  {
    id: "m10-q1",
    pergunta: "O uso de índices em um banco de dados tem como principal desvantagem:",
    opcoes: [
      { label: "A", valor: "Tornar as consultas SELECT mais lentas." },
      { label: "B", valor: "Aumentar o tempo de execução de operações de escrita (INSERT/UPDATE/DELETE)." },
      { label: "C", valor: "Impedir a utilização de chaves estrangeiras." },
      { label: "D", valor: "Não possuir impacto no consumo de disco." }
    ],
    correta: "B",
    explicacao: "Como o índice precisa ser atualizado a cada alteração nos dados, ele impacta a performance das escritas (overhead)."
  }
];
