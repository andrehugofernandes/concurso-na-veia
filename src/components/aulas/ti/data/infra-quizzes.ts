import { QuizQuestion } from "../../shared";

// Questionário para a Aula Premium de Infraestrutura de TI
// Focado no Perfil CESGRANRIO / Petrobras

export const quizM1: QuizQuestion[] = [
  {
    id: "m1-q1",
    pergunta: "Em uma rede TCP/IP, qual o papel do protocolo ARP (Address Resolution Protocol)?",
    opcoes: [
      { label: "A", valor: "Mapear um endereço IP conhecido para um endereço MAC físico." },
      { label: "B", valor: "Traduzir nomes de domínio em endereços IP." },
      { label: "C", valor: "Garantir a entrega confiável de pacotes na camada de transporte." },
      { label: "D", valor: "Atribuir endereços IP dinâmicos para máquinas na rede." }
    ],
    correta: "A",
    explicacao: "O ARP opera entre a camada de rede e a de enlace para descobrir o endereço MAC (físico) de um host quando se conhece apenas o seu endereço IP."
  },
  {
    id: "m1-q2",
    pergunta: "Qual campo do cabeçalho IPv4 é utilizado para evitar que um pacote circule indefinidamente na rede (looping)?",
    opcoes: [
      { label: "A", valor: "Checksum" },
      { label: "B", valor: "Offset" },
      { label: "C", valor: "TTL (Time to Live)" },
      { label: "D", valor: "Type of Service" }
    ],
    correta: "C",
    explicacao: "O TTL é um contador que decrementa a cada salto (roteador). Quando chega a zero, o pacote é descartado, evitando loops infinitos."
  },
  {
    id: "m1-q3",
    pergunta: "Sobre o IPv6, qual afirmação está correta em relação ao seu endereçamento?",
    opcoes: [
      { label: "A", valor: "Utiliza 64 bits em formato decimal." },
      { label: "B", valor: "Utiliza 128 bits e é representado em formato hexadecimal." },
      { label: "C", valor: "O campo Checksum foi mantido para garantir integridade sobre o IPv4." },
      { label: "D", valor: "Não suporta endereços do tipo anycast." }
    ],
    correta: "B",
    explicacao: "O IPv6 expande o espaço de endereçamento para 128 bits (8 grupos de 16 bits), representados em hexadecimal, eliminando a dependência do NAT no futuro."
  }
];

export const quizM2: QuizQuestion[] = [
  {
    id: "m2-q1",
    pergunta: "Qual o principal objetivo da implementação de VLANs (Virtual Local Area Networks) em um switch?",
    opcoes: [
      { label: "A", valor: "Aumentar a velocidade física das portas do switch." },
      { label: "B", valor: "Reduzir o tamanho dos domínios de colisão." },
      { label: "C", valor: "Segmentar domínios de broadcast de forma lógica." },
      { label: "D", valor: "Substituir a necessidade de roteamento entre redes diferentes." }
    ],
    correta: "C",
    explicacao: "VLANs permitem criar redes lógicas separadas dentro de uma mesma infraestrutura física, isolando o tráfego de broadcast de cada setor/grupo."
  },
  {
    id: "m2-q2",
    pergunta: "O protocolo STP (Spanning Tree Protocol) é essencial em topologias com redundância para:",
    opcoes: [
      { label: "A", valor: "Acelerar o roteamento entre VLANs." },
      { label: "B", valor: "Evitar loops de camada 2 (broadcast storms)." },
      { label: "C", valor: "Priorizar o tráfego de voz sobre o tráfego de dados." },
      { label: "D", valor: "Criptografar os dados entre switches trunk." }
    ],
    correta: "B",
    explicacao: "O STP detecta caminhos redundantes de camada 2 e bloqueia portas específicas para garantir que haja apenas um caminho lógico ativo, evitando 'tempestades de broadcast'."
  }
];

export const quizM3: QuizQuestion[] = [
  {
    id: "m3-q1",
    pergunta: "Qual tipo de Firewall opera especificamente analisando o contexto da conexão e o estado das sessões, não apenas pacotes isolados?",
    opcoes: [
      { label: "A", valor: "Packet Filter (Filtro de Pacotes Simples)" },
      { label: "B", valor: "Stateful Inspection (Inspeção de Estados)" },
      { label: "C", valor: "Application Gateway (Proxy de Aplicação)" },
      { label: "D", valor: "NAT (Network Address Translation)" }
    ],
    correta: "B",
    explicacao: "Firewalls de inspeção de estado mantêm uma tabela de 'estados' de conexão, permitindo o retorno de tráfego apenas se ele pertencer a uma sessão já estabelecida e legítima."
  },
  {
    id: "m3-q2",
    pergunta: "Um ataque de DoS (Denial of Service) que inunda o servidor com requisições de abertura de conexão incompletas é conhecido como:",
    opcoes: [
      { label: "A", valor: "Ping of Death" },
      { label: "B", valor: "SYN Flood" },
      { label: "C", valor: "SQL Injection" },
      { label: "D", valor: "Man-in-the-Middle" }
    ],
    correta: "B",
    explicacao: "O SYN Flood explora o 'three-way handshake' do TCP, enviando múltiplos pacotes SYN e não respondendo ao SYN-ACK, esgotando os recursos de conexão do servidor."
  }
];

export const quizM4: QuizQuestion[] = [
  {
    id: "m4-q1",
    pergunta: "No Windows Server, qual funcionalidade do Active Directory (AD) é responsável por replicar o banco de dados entre os Controladores de Domínio?",
    opcoes: [
      { label: "A", valor: "DNS" },
      { label: "B", valor: "KDC" },
      { label: "C", valor: "FRS / DFSR (Distributed File System Replication)" },
      { label: "D", valor: "GPO" }
    ],
    correta: "C",
    explicacao: "O DFSR é o motor moderno utilizado pelo Windows Server para replicar conteúdos do SYSVOL e outros dados entre Domain Controllers."
  },
  {
    id: "m4-q2",
    pergunta: "Para aplicar restrições de segurança idênticas a um grupo de 500 computadores de uma só vez no AD, o administrador deve utilizar:",
    opcoes: [
      { label: "A", valor: "OU (Organizational Units)" },
      { label: "B", valor: "GPO (Group Policy Objects)" },
      { label: "C", valor: "NTFS Permissions" },
      { label: "D", valor: "Domain Trees" }
    ],
    correta: "B",
    explicacao: "GPOs são o meio centralizado de gerenciar configurações de usuários e computadores em larga escala em um domínio Windows."
  }
];

export const quizM5: QuizQuestion[] = [
  {
    id: "m5-q1",
    pergunta: "No Linux, qual comando é utilizado para alterar o dono e o grupo de um diretório de forma recursiva?",
    opcoes: [
      { label: "A", valor: "chmod -R" },
      { label: "B", valor: "chown -r" },
      { label: "C", valor: "chown -R" },
      { label: "D", valor: "chgrp -all" }
    ],
    correta: "C",
    explicacao: "O comando chown (change owner) aceita a flag -R para operação recursiva em toda a subárvore de diretórios."
  },
  {
    id: "m5-q2",
    pergunta: "Qual diretório no Linux é tradicionalmente utilizado para armazenar arquivos de configuração do sistema?",
    opcoes: [
      { label: "A", valor: "/var" },
      { label: "B", valor: "/opt" },
      { label: "C", valor: "/etc" },
      { label: "D", valor: "/usr" }
    ],
    correta: "C",
    explicacao: "O diretório /etc contém praticamente todos os arquivos de configuração do sistema e de serviços instalados."
  }
];

export const quizM6: QuizQuestion[] = [
  {
    id: "m6-q1",
    pergunta: "A virtualização do tipo 'Bare Metal' (Tipo 1) se caracteriza por:",
    opcoes: [
      { label: "A", valor: "O hypervisor rodar sobre um sistema operacional convencional (ex: Windows)." },
      { label: "B", valor: "O hypervisor rodar diretamente sobre o hardware físico." },
      { label: "C", valor: "Não permitir a interface gráfica para o usuário." },
      { label: "D", valor: "Ser utilizada apenas em desktops pessoais." }
    ],
    correta: "B",
    explicacao: "Hipervisores Tipo 1 (como VMware ESXi ou Xen) rodam diretamente no hardware, oferecendo muito mais performance para servidores de datacenter."
  }
];

export const quizM7: QuizQuestion[] = [
  {
    id: "m7-q1",
    pergunta: "Diferente de uma Máquina Virtual (VM), um Contêiner Docker:",
    opcoes: [
      { label: "A", valor: "Possui seu próprio núcleo de sistema operacional (Kernel)." },
      { label: "B", valor: "É muito mais pesado em termos de recursos de CPU." },
      { label: "C", valor: "Compartilha o Kernel do sistema operacional hospedeiro." },
      { label: "D", valor: "Requer hardware específico para ser executado." }
    ],
    correta: "C",
    explicacao: "Contêineres isolam apenas os processos e bibliotecas, compartilhando o Kernel do host, o que os torna leves e rápidos de iniciar."
  }
];

export const quizM8: QuizQuestion[] = [
  {
    id: "m8-q1",
    pergunta: "Um serviço de nuvem onde o provedor gerencia servidores, storage e rede, mas o cliente instala seu próprio SO e aplicações, é classificado como:",
    opcoes: [
      { label: "A", valor: "SaaS (Software as a Service)" },
      { label: "B", valor: "PaaS (Platform as a Service)" },
      { label: "C", valor: "IaaS (Infrastructure as a Service)" },
      { label: "D", valor: "Serverless" }
    ],
    correta: "C",
    explicacao: "IaaS (Infraestrutura como Serviço) fornece os blocos fundamentais (computação, storage e rede) mantendo o controle do SO com o cliente."
  }
];

export const quizM9: QuizQuestion[] = [
  {
    id: "m9-q1",
    pergunta: "De acordo com o ITIL 4, o que define um 'Incidente'?",
    opcoes: [
      { label: "A", valor: "Uma interrupção não planejada ou redução na qualidade de um serviço." },
      { label: "B", valor: "A causa raiz de um problema recorrente." },
      { label: "C", valor: "Uma solicitação de acesso a um novo arquivo." },
      { label: "D", valor: "Uma mudança planejada na infraestrutura de TI." }
    ],
    correta: "A",
    explicacao: "No ITIL 4, incidentes são falhas ou degradações que afetam a operação normal dos serviços e precisam ser restaurados rapidamente."
  }
];

export const quizM10: QuizQuestion[] = [
  {
    id: "m10-q1",
    pergunta: "Em um backup do tipo DIFERENCIAL, o que é copiado?",
    opcoes: [
      { label: "A", valor: "Todos os arquivos criados ou alterados desde o último backup FULL." },
      { label: "B", valor: "Todos os arquivos criados ou alterados desde o último backup INCREMENTAL." },
      { label: "C", valor: "Toda a partição de dados do servidor." },
      { label: "D", valor: "Apenas os blocos de dados que mudaram desde ontem." }
    ],
    correta: "A",
    explicacao: "O backup diferencial acumula todas as mudanças desde o último backup completo, facilitando a restauração (Full + o último Dif)."
  }
];
