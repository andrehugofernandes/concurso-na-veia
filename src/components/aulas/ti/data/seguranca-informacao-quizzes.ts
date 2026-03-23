import { QuizQuestion } from "../../shared";

// Questionário para a Aula Premium de Segurança da Informação
// Focado no Perfil CESGRANRIO / Petrobras

export const quizM1: QuizQuestion[] = [
  {
    id: "m1-q1",
    pergunta: "Qual pilar da segurança da informação garante que a informação só seja acessível por pessoas autorizadas?",
    opcoes: [
      { label: "A", valor: "Integridade" },
      { label: "B", valor: "Disponibilidade" },
      { label: "C", valor: "Confidencialidade" },
      { label: "D", valor: "Autenticidade" }
    ],
    correta: "C",
    explicacao: "Confidencialidade é a propriedade que limita o acesso à informação apenas a quem tem permissão explícita."
  },
  {
    id: "m1-q2",
    pergunta: "A propriedade que garante que o emissor de uma mensagem não possa negar tê-la enviado é chamada de:",
    opcoes: [
      { label: "A", valor: "Confidencialidade" },
      { label: "B", valor: "Não-repúdio (Irretratabilidade)" },
      { label: "C", valor: "Disponibilidade" },
      { label: "D", valor: "Privacidade" }
    ],
    correta: "B",
    explicacao: "O Não-repúdio impede que o autor de uma ação/mensagem negue a autoria da mesma, sendo garantido geralmente por assinaturas digitais."
  }
];

export const quizM2: QuizQuestion[] = [
  {
    id: "m2-q1",
    pergunta: "Sobre a criptografia assimétrica, qual afirmação está correta?",
    opcoes: [
      { label: "A", valor: "Utiliza a mesma chave para cifrar e decifrar." },
      { label: "B", valor: "É muito mais rápida que a criptografia simétrica para grandes volumes de dados." },
      { label: "C", valor: "Utiliza um par de chaves (pública e privada)." },
      { label: "D", valor: "O algoritmo DES é o principal exemplo de criptografia assimétrica." }
    ],
    correta: "C",
    explicacao: "A criptografia assimétrica (ou de chave pública) utiliza um par de chaves relacionadas matematicamente: o que uma cifra, a outra decifra."
  }
];

export const quizM3: QuizQuestion[] = [
  {
    id: "m3-q1",
    pergunta: "Na infraestrutura brasileira de chaves públicas (ICP-Brasil), qual entidade é responsável por emitir, renovar e revogar certificados digitais de usuários finais?",
    opcoes: [
      { label: "A", valor: "AC-Raiz (ITI)" },
      { label: "B", valor: "AR (Autoridade de Registro)" },
      { label: "C", valor: "AC (Autoridade Certificadora)" },
      { label: "D", valor: "ACT (Autoridade de Carimbo de Tempo)" }
    ],
    correta: "C",
    explicacao: "As ACs são as entidades que emitem os certificados. As ARs servem apenas para conferir a identidade física do usuário."
  }
];

export const quizM4: QuizQuestion[] = [
  {
    id: "m4-q1",
    pergunta: "Para garantir a INTEGRIDADE e o NÃO-REPÚDIO de uma mensagem, o emissor deve:",
    opcoes: [
      { label: "A", valor: "Cifrar a mensagem com a chave pública do destinatário." },
      { label: "B", valor: "Cifrar o hash da mensagem com sua própria chave privada." },
      { label: "C", valor: "Cifrar a mensagem com sua própria chave pública." },
      { label: "D", valor: "Enviar a mensagem sem criptografia, apenas com hash simples." }
    ],
    correta: "B",
    explicacao: "Assinar digitalmente significa cifrar o hash do documento com a chave PRIVADA do emissor. Qualquer alteração no arquivo invalidará o hash."
  }
];

export const quizM5: QuizQuestion[] = [
  {
    id: "m5-q1",
    pergunta: "Qual tipo de malware se propaga automaticamente pela rede, explorando vulnerabilidades de serviços, sem necessidade de interação humana ou arquivo hospedeiro?",
    opcoes: [
      { label: "A", valor: "Vírus" },
      { label: "B", valor: "Worm (Verme)" },
      { label: "C", valor: "Cavalo de Troia (Trojan)" },
      { label: "D", valor: "Rootkit" }
    ],
    correta: "B",
    explicacao: "O Worm é autopropagável e foca em consumir recursos da rede ou infectar outros sistemas via rede, ao contrário do vírus que precisa infectar um arquivo."
  },
  {
    id: "m5-q2",
    pergunta: "O malware que sequestra dados através de criptografia e exige pagamento para a liberação da chave é o:",
    opcoes: [
      { label: "A", valor: "Spyware" },
      { label: "B", valor: "Adware" },
      { label: "C", valor: "Ransomware" },
      { label: "D", valor: "Keylogger" }
    ],
    correta: "C",
    explicacao: "Ransomware é focado em extorsão financeira, tornando os dados do usuário inacessíveis."
  }
];

export const quizM6: QuizQuestion[] = [
  {
    id: "m6-q1",
    pergunta: "Um sistema que monitora o tráfego de rede e possui a capacidade de BLOQUEAR um pacote malicioso automaticamente é classificado como:",
    opcoes: [
      { label: "A", valor: "IDS (Intrusion Detection System)" },
      { label: "B", valor: "IPS (Intrusion Prevention System)" },
      { label: "C", valor: "Proxy reverso" },
      { label: "D", valor: "Honeypot" }
    ],
    correta: "B",
    explicacao: "O IPS (Prevenção) toma ações ativas contra ataques, enquanto o IDS (Detecção) apenas gera alertas."
  }
];

export const quizM7: QuizQuestion[] = [
  {
    id: "m7-q1",
    pergunta: "No controle de acesso baseado em papéis (RBAC), as permissões são concedidas baseando-se em:",
    opcoes: [
      { label: "A", valor: "Identidade única do usuário." },
      { label: "B", valor: "Nível de sigilo do documento (Totalmente confidencial, etc)." },
      { label: "C", valor: "Função ou cargo exercido pelo usuário na organização." },
      { label: "D", valor: "Critério de tempo e localização." }
    ],
    correta: "C",
    explicacao: "Role-Based Access Control define permissões por cargo/grupo, facilitando a gestão quando um funcionário muda de setor."
  }
];

export const quizM8: QuizQuestion[] = [
  {
    id: "m8-q1",
    pergunta: "A norma ISO/IEC 27001 foca em:",
    opcoes: [
      { label: "A", valor: "Apenas controles técnicos de criptografia." },
      { label: "B", valor: "Gestão do Sistema de Gestão de Segurança da Informação (SGSI)." },
      { label: "C", valor: "Segurança apenas de datacenters físicos." },
      { label: "D", valor: "Desenvolvimento de software seguro." }
    ],
    correta: "B",
    explicacao: "A 27001 é uma norma de gestão (SGSI), enquanto a 27002 detalha o guia de boas práticas e controles."
  }
];

export const quizM9: QuizQuestion[] = [
  {
    id: "m9-q1",
    pergunta: "Em um Plano de Continuidade de Negócios (PCN/BCP), o objetivo principal do Plano de Recuperação de Desastres (DRP) é:",
    opcoes: [
      { label: "A", valor: "Evitar que incidentes aconteçam através de manutenção preventiva." },
      { label: "B", valor: "Restaurar os serviços de TI críticos após uma interrupção catastrófica." },
      { label: "C", valor: "Apenas realizar o backup diário dos dados." },
      { label: "D", valor: "Treinar os funcionários para não caírem em phishing." }
    ],
    correta: "B",
    explicacao: "O DRP foca na retomada técnica dos serviços de TI em caso de desastres."
  }
];

export const quizM10: QuizQuestion[] = [
  {
    id: "m10-q1",
    pergunta: "De acordo com a LGPD (Lei Geral de Proteção de Dados), o dado que revela origem racial, convicção religiosa ou opinião política é classificado como:",
    opcoes: [
      { label: "A", valor: "Dado Pessoal Comum" },
      { label: "B", valor: "Dado Pessoal Sensível" },
      { label: "C", valor: "Dado Anonimizado" },
      { label: "D", valor: "Dado restrito" }
    ],
    correta: "B",
    explicacao: "Dados sensíveis recebem proteção especial da lei por possuírem maior potencial discriminatório."
  }
];
