import { Question } from "../../shared";

export const QUIZ_M1_NR35_INTRO: Question[] = [
  {
    id: "nr35-m1-q1",
    enunciado: "Segundo a NR-35 (Trabalho em Altura), considera-se trabalho em altura toda atividade executada acima de que nível, onde haja risco de queda?",
    alternativas: [
      { id: "a", texto: "1,50 m (um metro e cinquenta centímetros)" },
      { id: "b", texto: "2,00 m (dois metros)", correta: true },
      { id: "c", texto: "2,50 m (dois metros e cinquenta centímetros)" },
      { id: "d", texto: "3,00 m (três metros)" }
    ],
    explicacao: "Conforme o item 35.1.2, considera-se trabalho em altura toda atividade executada acima de 2,00 m (dois metros) do nível inferior, onde haja risco de queda."
  },
  {
    id: "nr35-m1-q2",
    enunciado: "A NR-35, revisada em 2023, estabelece que a organização deve garantir que o trabalho em altura só tenha início após a adoção das medidas de proteção. Qual a hierarquia CORRETA a ser seguida?",
    alternativas: [
      { id: "a", texto: "EPI > EPC > Planejamento" },
      { id: "b", texto: "EPC > EPI > Treinamento" },
      { id: "c", texto: "Evitar o trabalho > Eliminar o risco de queda > Minimizar as consequências", correta: true },
      { id: "d", texto: "Sinalização > Barreiras > Cinto paraquedista" }
    ],
    explicacao: "A hierarquia de controle de riscos exige primeiro evitar o trabalho em altura; se não for possível, eliminar o risco de queda por meio de proteção coletiva; e por último, minimizar as consequências da queda (EPI)."
  },
  {
    id: "nr35-m1-q3",
    enunciado: "Quanto à abrangência da NR-35, é correto afirmar que ela se aplica:",
    alternativas: [
      { id: "a", texto: "Exclusivamente para a indústria da construção civil." },
      { id: "b", texto: "A todas as atividades executadas acima de 2 metros do nível inferior.", correta: true },
      { id: "c", texto: "Somente para atividades em plataformas offshore." },
      { id: "d", texto: "Apenas quando o trabalhador utiliza cinto tipo paraquedista." }
    ],
    explicacao: "A norma é geral e se aplica a toda e qualquer atividade acima de 2 metros onde haja risco de queda, independente do setor econômico."
  },
  {
    id: "nr35-m1-q4",
    enunciado: "A atualização de 2023 da NR-35 trouxe uma mudança na terminologia. O termo 'Empregador' foi substituído por qual termo, visando harmonização com a NR-01?",
    alternativas: [
      { id: "a", texto: "Contratante" },
      { id: "b", texto: "Empresa" },
      { id: "c", texto: "Organização", correta: true },
      { id: "d", texto: "Gestor de Risco" }
    ],
    explicacao: "Para harmonizar com a NR-01 (PGR), a NR-35 agora utiliza o termo 'Organização' para se referir ao ente responsável pelas medidas de segurança."
  },
  {
    id: "nr35-m1-q5",
    enunciado: "O trabalho em altura deve ser planejado, organizado e executado sob a responsabilidade de quem?",
    alternativas: [
      { id: "a", texto: "Do próprio trabalhador, por sua experiência." },
      { id: "b", texto: "De trabalhador capacitado e autorizado pela organização.", correta: true },
      { id: "c", texto: "Do sindicato da categoria." },
      { id: "d", texto: "Do fiscal do Ministério do Trabalho." }
    ],
    explicacao: "O item 35.3.1 define que o trabalho deve ser executado por trabalhador capacitado e autorizado."
  },
  {
    id: "nr35-m1-q6",
    enunciado: "Sobre a aplicação da NR-35 em conjunto com outras normas, assinale a opção correta:",
    alternativas: [
      { id: "a", texto: "A NR-35 invalida a NR-18 em canteiros de obra." },
      { id: "b", texto: "A NR-35 deve ser interpretada de forma isolada." },
      { id: "c", texto: "A NR-35 é complementar às demais normas setoriais e gerais.", correta: true },
      { id: "d", texto: "A NR-35 só vale se a NR-01 não for aplicada." }
    ],
    explicacao: "A NR-35 é uma norma geral de segurança que complementa normas específicas (como NR-18 para construção ou NR-30 para aquaviários)."
  },
  {
    id: "nr35-m1-q7",
    enunciado: "Uma das responsabilidades dos trabalhadores, segundo a NR-35, é:",
    alternativas: [
      { id: "a", texto: "Elaborar a Análise de Risco (AR) sozinho." },
      { id: "b", texto: "Zelar pela própria segurança e a de outras pessoas que possam ser afetadas.", correta: true },
      { id: "c", texto: "Emitir a Permissão de Trabalho (PT)." },
      { id: "d", texto: "Dimensionar os pontos de ancoragem fixos." }
    ],
    explicacao: "Conforme o item 35.3.2, cabe aos trabalhadores zelar pela sua segurança e de terceiros."
  },
  {
    id: "nr35-m1-q8",
    enunciado: "Em relação às atividades rotineiras de trabalho em altura, a NR-35 estabelece que:",
    alternativas: [
      { id: "a", texto: "Elas dispensam qualquer tipo de análise de risco." },
      { id: "b", texto: "Devem ser precedidas de Análise de Risco, que pode ser formalizada ou não.", correta: true },
      { id: "c", texto: "Exigem a emissão de Permissão de Trabalho (PT) todos os dias." },
      { id: "d", texto: "Só podem ser feitas por técnicos de segurança." }
    ],
    explicacao: "Atividades rotineiras exigem AR, que pode estar contida no procedimento operacional da empresa (item 35.5.1)."
  }
];

export const QUIZ_M2_NR35_TREINAMENTO: Question[] = [
  {
    id: "nr35-m2-q1",
    enunciado: "Qual a carga horária mínima para o treinamento de capacitação inicial para trabalho em altura?",
    alternativas: [
      { id: "a", texto: "4 horas" },
      { id: "b", texto: "8 horas", correta: true },
      { id: "c", texto: "12 horas" },
      { id: "d", texto: "16 horas" }
    ],
    explicacao: "O item 35.4.1 determina que o treinamento inicial deve ter carga horária mínima de 8 horas."
  },
  {
    id: "nr35-m2-q2",
    enunciado: "O treinamento periódico para trabalho em altura deve ser realizado com qual frequência mínima?",
    alternativas: [
      { id: "a", texto: "Anual" },
      { id: "b", texto: "Bienal (a cada dois anos)", correta: true },
      { id: "c", texto: "Sempre que mudar o gestor" },
      { id: "d", texto: "A cada 5 anos" }
    ],
    explicacao: "O treinamento periódico deve ser realizado a cada dois anos (bienal), conforme o item 35.4.3."
  },
  {
    id: "nr35-m2-q3",
    enunciado: "Em qual das situações abaixo é OBRIGATÓRIA a realização de um treinamento eventual (reciclagem)?",
    alternativas: [
      { id: "a", texto: "Mudança nos procedimentos, condições ou operações de trabalho.", correta: true },
      { id: "b", texto: "Troca de uniforme do trabalhador." },
      { id: "c", texto: "Retorno de afastamento por férias de 30 dias." },
      { id: "d", texto: "A cada 6 meses de trabalho contínuo." }
    ],
    explicacao: "O treinamento eventual é exigido em caso de mudança de procedimentos, retorno de afastamento superior a 90 dias ou mudança de empresa."
  },
  {
    id: "nr35-m2-q4",
    enunciado: "Quem pode ser o instrutor dos treinamentos de trabalho em altura?",
    alternativas: [
      { id: "a", texto: "Qualquer trabalhador com mais de 5 anos de experiência." },
      { id: "b", texto: "Apenas Engenheiros de Segurança." },
      { id: "c", texto: "Trabalhadores ou profissionais com comprovada proficiência no assunto.", correta: true },
      { id: "d", texto: "O diretor da empresa." }
    ],
    explicacao: "A norma exige 'comprovada proficiência', sob responsabilidade de um profissional qualificado ou habilitado em segurança."
  },
  {
    id: "nr35-m2-q5",
    enunciado: "O treinamento de NR-35 deve contemplar obrigatoriamente:",
    alternativas: [
      { id: "a", texto: "Apenas a parte teórica via EAD." },
      { id: "b", texto: "Conteúdo teórico e prático.", correta: true },
      { id: "c", texto: "Somente o uso do cinto de segurança." },
      { id: "d", texto: "Noções de combate a incêndio em edifícios." }
    ],
    explicacao: "O treinamento deve ser teórico e prático para garantir que o trabalhador saiba operar os equipamentos em altura."
  },
  {
    id: "nr35-m2-q6",
    enunciado: "Considera-se trabalhador autorizado para trabalho em altura aquele que:",
    alternativas: [
      { id: "a", texto: "Foi aprovado no treinamento e teve sua aptidão clínica avaliada.", correta: true },
      { id: "b", texto: "Comprou o certificado de NR-35." },
      { id: "c", texto: "Não tem medo de altura." },
      { id: "d", texto: "É o funcionário mais antigo da obra." }
    ],
    explicacao: "Autorização exige: 1. Treinamento com aproveitamento e 2. Avaliação de saúde (clínica e psicossocial)."
  },
  {
    id: "nr35-m2-q7",
    enunciado: "A avaliação psicossocial para trabalho em altura é:",
    alternativas: [
      { id: "a", texto: "Obrigatória e deve constar no ASO.", correta: true },
      { id: "b", texto: "Opcional, a critério do médico." },
      { id: "c", texto: "Proibida por lei." },
      { id: "d", texto: "Apenas para trabalhos acima de 10 metros." }
    ],
    explicacao: "A NR-35 exige que a aptidão para o trabalho em altura inclua a avaliação física e psicossocial."
  },
  {
    id: "nr35-m2-q8",
    enunciado: "O certificado do treinamento deve ser entregue ao trabalhador em qual prazo?",
    alternativas: [
      { id: "a", texto: "Ao final de cada aula." },
      { id: "b", texto: "Dentro de 30 dias após o término." },
      { id: "c", texto: "Imediatamente no término do treinamento.", correta: true },
      { id: "d", texto: "Somente se ele for demitido." }
    ],
    explicacao: "A cópia do certificado deve ser entregue ao trabalhador e a via original deve ser arquivada pela organização."
  }
];

export const QUIZ_M3_NR35_PLANEJAMENTO: Question[] = [
  {
    id: "nr35-m3-q1",
    enunciado: "Para atividades de trabalho em altura NÃO rotineiras, qual documento é OBRIGATÓRIO além da Análise de Risco (AR)?",
    alternativas: [
      { id: "a", texto: "Ficha de EPI" },
      { id: "b", texto: "Cópia da CLT" },
      { id: "c", texto: "Permissão de Trabalho (PT)", correta: true },
      { id: "d", texto: "Nota Fiscal dos andaimes" }
    ],
    explicacao: "Atividades não rotineiras exigem a emissão da PT (Permissão de Trabalho)."
  },
  {
    id: "nr35-m3-q2",
    enunciado: "Qual a validade máxima de uma Permissão de Trabalho (PT) para trabalho em altura?",
    alternativas: [
      { id: "a", texto: "7 dias" },
      { id: "b", texto: "Limitada à duração da atividade, não podendo exceder o turno de trabalho.", correta: true },
      { id: "c", texto: "24 horas, independente do turno." },
      { id: "d", texto: "30 dias para obras longas." }
    ],
    explicacao: "A PT tem validade limitada à duração da atividade, restrita ao turno de trabalho, podendo ser revalidada se não houver mudanças nas condições."
  },
  {
    id: "nr35-m3-q3",
    enunciado: "A Análise de Risco (AR) deve considerar, entre outros fatores:",
    alternativas: [
      { id: "a", texto: "Apenas o peso do trabalhador." },
      { id: "b", texto: "Os riscos adicionais (elétricos, químicos, climáticos, etc.).", correta: true },
      { id: "c", texto: "O valor do seguro de vida." },
      { id: "d", texto: "O preço dos equipamentos." }
    ],
    explicacao: "A AR deve ser abrangente, considerando o ambiente, riscos de queda de materiais, clima e riscos específicos do local (ex: proximidade com fios elétricos)."
  },
  {
    id: "nr35-m3-q4",
    enunciado: "Em caso de ventos fortes ou chuvas intensas (condições climáticas adversas), qual deve ser a conduta?",
    alternativas: [
      { id: "a", texto: "Continuar o trabalho com mais cuidado." },
      { id: "b", texto: "Usar dois talabartes em vez de um." },
      { id: "c", texto: "Interromper imediatamente as atividades.", correta: true },
      { id: "d", texto: "Pedir autorização ao sindicato." }
    ],
    explicacao: "Condições meteorológicas adversas são causas impeditivas para o trabalho em altura."
  },
  {
    id: "nr35-m3-q5",
    enunciado: "Onde deve ficar arquivada a Permissão de Trabalho (PT) após o encerramento da atividade?",
    alternativas: [
      { id: "a", texto: "No bolso do trabalhador." },
      { id: "b", texto: "Deve ser descartada para evitar acúmulo de papel." },
      { id: "c", texto: "Arquivada de modo a permitir sua rastreabilidade por no mínimo 5 anos.", correta: true },
      { id: "d", texto: "Grampeada no prontuário médico." }
    ],
    explicacao: "A NR-35 exige a guarda da documentação por 5 anos."
  },
  {
    id: "nr35-m3-q6",
    enunciado: "Quem deve assinar a Permissão de Trabalho (PT)?",
    alternativas: [
      { id: "a", texto: "O responsável pela autorização e os trabalhadores.", correta: true },
      { id: "b", texto: "Apenas o mestre de obras." },
      { id: "c", texto: "Qualquer pessoa que passar pelo local." },
      { id: "d", texto: "Somente o médico do trabalho." }
    ],
    explicacao: "A PT deve ser assinada pelos envolvidos e pelo responsável pela aprovação."
  },
  {
    id: "nr35-m3-q7",
    enunciado: "O sistema de comunicação entre os trabalhadores em altura e a equipe de solo é:",
    alternativas: [
      { id: "a", texto: "Opcional." },
      { id: "b", texto: "Obrigatório e deve ser previsto no planejamento.", correta: true },
      { id: "c", texto: "Apenas via sinal de fumaça." },
      { id: "d", texto: "Somente se houver mais de 50 metros de altura." }
    ],
    explicacao: "A comunicação é vital para a segurança e coordenação, devendo ser prevista na AR/PT."
  },
  {
    id: "nr35-m3-q8",
    enunciado: "O que é 'Suspensão Inerte', fenômeno que deve ser previsto no plano de emergência da NR-35?",
    alternativas: [
      { id: "a", texto: "É quando o cinto de segurança quebra." },
      { id: "b", texto: "É o desmaio do trabalhador após uma queda, ficando pendurado no cinto.", correta: true },
      { id: "c", texto: "É a subida lenta de materiais por guindaste." },
      { id: "d", texto: "É o nome técnico para o uso de paraquedas." }
    ],
    explicacao: "A suspensão inerte ocorre quando o trabalhador fica pendurado e imóvel, o que pode causar trombose e morte em poucos minutos se não for resgatado rapidamente."
  }
];

export const QUIZ_M4_NR35_EQUIPAMENTOS: Question[] = [
  {
    id: "nr35-m4-q1",
    enunciado: "No trabalho em altura, o cinto de segurança OBRIGATÓRIO é do tipo:",
    alternativas: [
      { id: "a", texto: "Abdominal, para maior conforto." },
      { id: "b", texto: "Paraquedista.", correta: true },
      { id: "c", texto: "Cinto de couro simples." },
      { id: "d", texto: "Colete reflexivo." }
    ],
    explicacao: "O item 35.5.11 proíbe o uso de cinto abdominal para retenção de queda, exigindo o tipo paraquedista."
  },
  {
    id: "nr35-m4-q2",
    enunciado: "O componente do sistema de proteção contra quedas que tem a função de reduzir o impacto transmitido ao corpo do trabalhador é o:",
    alternativas: [
      { id: "a", texto: "Talabarte simples." },
      { id: "b", texto: "Absorvedor de energia.", correta: true },
      { id: "c", texto: "Conector tipo mosquetão." },
      { id: "d", texto: "Capacete com jugular." }
    ],
    explicacao: "O absorvedor de energia é obrigatório em sistemas de retenção de queda quando o fator de queda for maior que 0,5 ou o talabarte tiver mais de 0,9m."
  },
  {
    id: "nr35-m4-q3",
    enunciado: "O que significa 'ZLQ' no contexto da NR-35?",
    alternativas: [
      { id: "a", texto: "Zona de Livre Quitação." },
      { id: "b", texto: "Zona de Livre Queda (espaço livre abaixo do trabalhador).", correta: true },
      { id: "c", texto: "Zona de Limpeza de Quintal." },
      { id: "d", texto: "Zero Latência de Queda." }
    ],
    explicacao: "ZLQ é a distância mínima livre abaixo do trabalhador para que, em caso de queda, ele não atinja o solo ou obstáculos."
  },
  {
    id: "nr35-m4-q4",
    enunciado: "Sobre a inspeção dos equipamentos de proteção (EPI, EPC e acessórios), a NR-35 determina que:",
    alternativas: [
      { id: "a", texto: "Deve ser feita apenas uma vez por ano." },
      { id: "b", texto: "Deve ser feita antes de cada utilização.", correta: true },
      { id: "c", texto: "É responsabilidade exclusiva do fabricante." },
      { id: "d", texto: "Não é necessária se o equipamento for novo." }
    ],
    explicacao: "A inspeção rotineira antes do uso é obrigatória (item 35.5.8)."
  },
  {
    id: "nr35-m4-q5",
    enunciado: "Equipamentos que apresentarem defeitos, degradação ou sofrerem impactos de queda devem ser:",
    alternativas: [
      { id: "a", texto: "Lavados e reutilizados." },
      { id: "b", texto: "Recusados e inutilizados (retirados de uso).", correta: true },
      { id: "c", texto: "Vendidos como sucata." },
      { id: "d", texto: "Remendados com fita isolante." }
    ],
    explicacao: "Equipamentos que sofreram retenção de queda devem ser descartados, exceto se houver previsão em norma de restauração pelo fabricante."
  },
  {
    id: "nr35-m4-q6",
    enunciado: "O 'Fator de Queda' é a relação entre a altura da queda e o comprimento do talabarte. Qual a situação MAIS PERIGOSA?",
    alternativas: [
      { id: "a", texto: "Fator de Queda zero (ancoragem acima da cabeça)." },
      { id: "b", texto: "Fator de Queda 1 (ancoragem no nível do ombro)." },
      { id: "c", texto: "Fator de Queda 2 (ancoragem abaixo dos pés).", correta: true },
      { id: "d", texto: "Não existe relação de risco com o fator de queda." }
    ],
    explicacao: "Fator de queda 2 é o mais crítico, pois a distância de queda é o dobro do comprimento do talabarte, gerando maior impacto no corpo."
  },
  {
    id: "nr35-m4-q7",
    enunciado: "O trava-quedas é um dispositivo de segurança que deve ser utilizado em conjunto com:",
    alternativas: [
      { id: "a", texto: "Escadas de abrir." },
      { id: "b", texto: "Linhas de vida verticais ou horizontais.", correta: true },
      { id: "c", texto: "Botas de borracha." },
      { id: "d", texto: "Óculos de proteção." }
    ],
    explicacao: "O trava-quedas desliza por uma linha de vida e trava automaticamente em caso de queda brusca."
  },
  {
    id: "nr35-m4-q8",
    enunciado: "A jugular no capacete de segurança para trabalho em altura serve para:",
    alternativas: [
      { id: "a", texto: "Enfeitar o equipamento." },
      { id: "b", texto: "Evitar que o capacete caia da cabeça em caso de inclinação ou queda.", correta: true },
      { id: "c", texto: "Aquecer o rosto do trabalhador." },
      { id: "d", texto: "Segurar a lanterna." }
    ],
    explicacao: "A jugular é essencial para que o capacete permaneça na cabeça durante a queda, protegendo contra impactos."
  }
];

export const QUIZ_M5_NR35_ESCADAS_ANEXO3: Question[] = [
  {
    id: "nr35-m5-q1",
    enunciado: "O novo Anexo III da NR-35 (2023) estabelece requisitos para o uso de:",
    alternativas: [
      { id: "a", texto: "Andaimas suspensos." },
      { id: "b", texto: "Escadas fixas e portáteis.", correta: true },
      { id: "c", texto: "Plataformas elevatórias." },
      { id: "d", texto: "Drones de inspeção." }
    ],
    explicacao: "O Anexo III é a grande novidade da atualização de 2023, focando na segurança do uso de escadas."
  },
  {
    id: "nr35-m5-q2",
    enunciado: "Segundo o Anexo III, o uso de escadas portáteis como POSTO DE TRABALHO é permitido apenas em quais situações?",
    alternativas: [
      { id: "a", texto: "Sempre que o trabalhador quiser." },
      { id: "b", texto: "Para trabalhos de curta duração e onde a instalação de outros sistemas seja inviável por razões técnicas.", correta: true },
      { id: "c", texto: "Somente para pintura de paredes." },
      { id: "d", texto: "Em qualquer obra de até 2 andares." }
    ],
    explicacao: "Escadas são preferencialmente meios de acesso. Como posto de trabalho, são exceção para tarefas rápidas e tecnicamente justificadas."
  },
  {
    id: "nr35-m5-q3",
    enunciado: "Uma escada portátil deve ultrapassar em quanto a superfície de desembarque, quando usada para acesso?",
    alternativas: [
      { id: "a", texto: "Não precisa ultrapassar." },
      { id: "b", texto: "Pelo menos 1,00 m.", correta: true },
      { id: "c", texto: "Exatamente 50 cm." },
      { id: "d", texto: "Deve ficar 1 metro abaixo." }
    ],
    explicacao: "A norma exige que a escada ultrapasse em pelo menos 1 metro para garantir a segurança na transição do trabalhador."
  },
  {
    id: "nr35-m5-q4",
    enunciado: "As escadas de madeira, segundo o Anexo III, devem ser pintadas?",
    alternativas: [
      { id: "a", texto: "Sim, para proteger contra o sol." },
      { id: "b", texto: "Não, pois a tinta pode esconder nós, rachaduras ou defeitos na madeira (apenas verniz transparente é permitido).", correta: true },
      { id: "c", texto: "Somente na cor amarela." },
      { id: "d", texto: "Apenas se forem velhas." }
    ],
    explicacao: "A pintura com tintas opacas é proibida em escadas de madeira para permitir a visualização de defeitos estruturais."
  },
  {
    id: "nr35-m5-q5",
    enunciado: "O que é exigido para escadas portáteis com mais de 5 metros de comprimento?",
    alternativas: [
      { id: "a", texto: "Nada especial." },
      { id: "b", texto: "Devem ser amarradas ou fixadas.", correta: true },
      { id: "c", texto: "Devem ser feitas de borracha." },
      { id: "d", texto: "Devem ter rodinhas." }
    ],
    explicacao: "Escadas longas exigem fixação para evitar deslizamento lateral ou queda."
  },
  {
    id: "nr35-m5-q6",
    enunciado: "Sobre escadas portáteis de abrir (tipo 'tesoura'), é PROIBIDO:",
    alternativas: [
      { id: "a", texto: "Usar nos últimos dois degraus, a menos que haja apoio lateral seguro.", correta: true },
      { id: "b", texto: "Levar ferramentas manuais." },
      { id: "c", texto: "Trabalhar com ajudante no solo." },
      { id: "d", texto: "Usar dentro de prédios." }
    ],
    explicacao: "O topo da escada tesoura é instável, sendo proibido o uso dos últimos degraus por risco de desequilíbrio."
  },
  {
    id: "nr35-m5-q7",
    enunciado: "O ângulo ideal de inclinação para escadas portáteis de encosto é de aproximadamente:",
    alternativas: [
      { id: "a", texto: "45 graus." },
      { id: "b", texto: "75 graus (proporção 1:4).", correta: true },
      { id: "c", texto: "90 graus." },
      { id: "d", texto: "15 graus." }
    ],
    explicacao: "A proporção 1:4 (afastamento da base igual a 1/4 da altura) garante a estabilidade ideal sem risco de tombar ou escorregar."
  },
  {
    id: "nr35-m5-q8",
    enunciado: "Escadas fixas tipo marinheiro com altura superior a 6 metros devem possuir:",
    alternativas: [
      { id: "a", texto: "Gaiola de proteção ou sistema de proteção contra quedas.", correta: true },
      { id: "b", texto: "Motor elétrico." },
      { id: "c", texto: "Degraus de plástico macio." },
      { id: "d", texto: "Corrimão de veludo." }
    ],
    explicacao: "Acima de 6 metros, escadas marinheiro exigem dispositivos para reter quedas e oferecer apoio ao trabalhador."
  }
];

export const NR35_ALL_QUIZZES = {
  "modulo-1": QUIZ_M1_NR35_INTRO,
  "modulo-2": QUIZ_M2_NR35_TREINAMENTO,
  "modulo-3": QUIZ_M3_NR35_PLANEJAMENTO,
  "modulo-4": QUIZ_M4_NR35_EQUIPAMENTOS,
  "modulo-5": QUIZ_M5_NR35_ESCADAS_ANEXO3,
};
