import { QuizQuestion } from "../../shared";

// Questionário para a Aula Premium de Desenvolvimento Web
// Focado no Perfil CESGRANRIO / Petrobras

export const quizM1: QuizQuestion[] = [
  {
    id: "m1-q1",
    pergunta: "Qual método HTTP deve ser utilizado para atualizar parcialmente um recurso existente no servidor?",
    opcoes: [
      { label: "A", valor: "PUT" },
      { label: "B", valor: "POST" },
      { label: "C", valor: "PATCH" },
      { label: "D", valor: "UPDATE" }
    ],
    correta: "C",
    explicacao: "PATCH é utilizado para modificações parciais. PUT é geralmente utilizado para substituição total do recurso."
  },
  {
    id: "m1-q2",
    pergunta: "O código de status HTTP '403 Forbidden' indica que:",
    opcoes: [
      { label: "A", valor: "O recurso não foi encontrado." },
      { label: "B", valor: "O servidor entende a requisição, mas se recusa a autorizá-la." },
      { label: "C", valor: "O usuário precisa se autenticar primeiro (Não logado)." },
      { label: "D", valor: "Houve um erro interno no servidor." }
    ],
    correta: "B",
    explicacao: "403 ocorre quando o usuário está autenticado, mas não possui permissão para aquele recurso específico. (401 é para não autenticados)."
  }
];

export const quizM2: QuizQuestion[] = [
  {
    id: "m2-q1",
    pergunta: "Qual tag HTML5 é a mais adequada para envolver o conteúdo principal e único de uma página para fins de acessibilidade e SEO?",
    opcoes: [
      { label: "A", valor: "<section>" },
      { label: "B", valor: "<article>" },
      { label: "C", valor: "<main>" },
      { label: "D", valor: "<div>" }
    ],
    correta: "C",
    explicacao: "A tag <main> deve conter o conteúdo central e único da página, não devendo haver mais de uma por documento."
  }
];

export const quizM3: QuizQuestion[] = [
  {
    id: "m3-q1",
    pergunta: "No CSS Flexbox, qual propriedade é utilizada no container pai para definir como os itens devem ser distribuídos ao longo do eixo principal (horizontal por padrão)?",
    opcoes: [
      { label: "A", valor: "align-items" },
      { label: "B", valor: "justify-content" },
      { label: "C", valor: "flex-direction" },
      { label: "D", valor: "grid-template" }
    ],
    correta: "B",
    explicacao: "justify-content controla o alinhamento no eixo principal (main axis). align-items controla o eixo transversal (cross axis)."
  }
];

export const quizM4: QuizQuestion[] = [
  {
    id: "m4-q1",
    pergunta: "Qual a principal diferença entre os operadores '==' e '===' em JavaScript?",
    opcoes: [
      { label: "A", valor: "Não há diferença, ambos comparam valor e tipo." },
      { label: "B", valor: "== compara apenas o valor (com coerção), enquanto === compara valor e tipo." },
      { label: "C", valor: "=== é utilizado apenas para objetos." },
      { label: "D", valor: "== é mais performático que ===." }
    ],
    correta: "B",
    explicacao: "O operador === (estritamente igual) evita bugs de coerção automática de tipos, sendo a prática recomendada."
  }
];

export const quizM5: QuizQuestion[] = [
  {
    id: "m5-q1",
    pergunta: "No DOM JavaScript, a técnica de anexar um único ouvinte de evento a um elemento pai para gerenciar eventos de seus filhos é chamada de:",
    opcoes: [
      { label: "A", valor: "Event Bubbling" },
      { label: "B", valor: "Event Delegation (Delegação de Evento)" },
      { label: "C", valor: "Event Capturing" },
      { label: "D", valor: "Event Stopping" }
    ],
    correta: "B",
    explicacao: "A delegação de eventos aproveita o 'bubbling' (propagação) para tratar eventos de forma eficiente em listas dinâmicas."
  }
];

export const quizM6: QuizQuestion[] = [
  {
    id: "m6-q1",
    pergunta: "No React, qual Hook é utilizado para realizar 'efeitos colaterais', como chamadas de API ou subscrições?",
    opcoes: [
      { label: "A", valor: "useState" },
      { label: "B", valor: "useMemo" },
      { label: "C", valor: "useEffect" },
      { label: "D", valor: "useContext" }
    ],
    correta: "C",
    explicacao: "useEffect permite executar lógica após a renderização do componente, lidando com sincronização de dados externos."
  }
];

export const quizM7: QuizQuestion[] = [
  {
    id: "m7-q1",
    pergunta: "Ao consumir uma API RESTful, o formato de dados mais amplamente utilizado para intercâmbio de mensagens é o:",
    opcoes: [
      { label: "A", valor: "XML" },
      { label: "B", valor: "YAML" },
      { label: "C", valor: "JSON" },
      { label: "D", valor: "CSV" }
    ],
    correta: "C",
    explicacao: "JSON (JavaScript Object Notation) é o padrão de facto para APIs modernas por ser leve e nativo para o JavaScript."
  }
];

export const quizM8: QuizQuestion[] = [
  {
    id: "m8-q1",
    pergunta: "Qual ataque web consiste na inserção de scripts maliciosos em páginas visualizadas por outros usuários, geralmente tirando proveito da falta de sanitização de inputs?",
    opcoes: [
      { label: "A", valor: "SQL Injection" },
      { label: "B", valor: "Cross-Site Scripting (XSS)" },
      { label: "C", valor: "CSRF (Cross-Site Request Forgery)" },
      { label: "D", valor: "DDoS" }
    ],
    correta: "B",
    explicacao: "XSS foca em executar código no navegador da vítima. SQL Injection foca no banco de dados do servidor."
  }
];

export const quizM9: QuizQuestion[] = [
  {
    id: "m9-q1",
    pergunta: "Em aplicações progressivas (PWA), qual tecnologia é responsável por permitir funcionalidades offline e cache avançado?",
    opcoes: [
      { label: "A", valor: "Web Workers" },
      { label: "B", valor: "Service Workers" },
      { label: "C", valor: "Local Storage" },
      { label: "D", valor: "IndexedDB" }
    ],
    correta: "B",
    explicacao: "Service Workers funcionam como um proxy entre o navegador e a rede, interceptando requisições e gerenciando o cache."
  }
];

export const quizM10: QuizQuestion[] = [
  {
    id: "m10-q1",
    pergunta: "Qual atributo ARIA deve ser utilizado para identificar um elemento cujos conteúdos são atualizados de forma dinâmica (como um feed ou alerta)?",
    opcoes: [
      { label: "A", valor: "aria-hidden" },
      { label: "B", valor: "aria-live" },
      { label: "C", valor: "aria-label" },
      { label: "D", valor: "role='button'" }
    ],
    correta: "B",
    explicacao: "aria-live informa aos leitores de tela que o conteúdo daquela região mudou espontaneamente."
  }
];
