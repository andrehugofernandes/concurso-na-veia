import { QuizQuestion } from "../../shared";

export const QUIZ_M1: QuizQuestion[] = [
  {
    id: "q1_1",
    pergunta: "Em relação aos níveis de planejamento em uma grande estatal como a Petrobras, assinale a opção que descreve corretamente as características do Planejamento Estratégico:",
    opcoes: [
      { label: "A", valor: "É focado em atividades de curto prazo e detalha tarefas específicas para o nível operacional." },
      { label: "B", valor: "Envolve a alta cúpula da organização, possui visão macro, longo prazo e define os grandes objetivos e diretrizes da empresa." },
      { label: "C", valor: "Limita-se ao escopo de um único departamento e estabelece metas departamentais de médio prazo." },
      { label: "D", valor: "Ocorre no nível gerencial intermediário, traduzindo as diretrizes de chão de fábrica para a diretoria." },
      { label: "E", valor: "Não se preocupa com o ambiente externo (oportunidades e ameaças), focando apenas na eficiência interna." }
    ],
    correta: "B",
    explicacao: "O Planejamento Estratégico é desenvolvido pela alta administração, abrange a organização como um todo (visão sistêmica), é orientado para o longo prazo e interage fortemente com o ambiente externo."
  },
  {
    id: "q1_2",
    pergunta: "A Matriz SWOT é uma ferramenta essencial no Planejamento Estratégico. Considerando o ambiente interno e externo, o surgimento de uma nova lei ambiental rigorosa para exploração de petróleo e a alta capacidade tecnológica da Petrobras representam, respectivamente:",
    opcoes: [
      { label: "A", valor: "Força e Oportunidade." },
      { label: "B", valor: "Ameaça e Força." },
      { label: "C", valor: "Fraqueza e Ameaça." },
      { label: "D", valor: "Oportunidade e Fraqueza." },
      { label: "E", valor: "Ameaça e Fraqueza." }
    ],
    correta: "B",
    explicacao: "Uma nova lei ambiental restritiva imposta pelo mercado (ambiente externo) é uma Ameaça. A alta capacidade tecnológica dominada pela empresa (ambiente interno) é uma Força."
  }
];

export const QUIZ_M2: QuizQuestion[] = [
  {
    id: "q2_1",
    pergunta: "Uma grande refinaria da Petrobras decidiu agrupar seus funcionários com base nas especialidades técnicas: um departamento de finanças, um de recursos humanos e outro de engenharia de suprimentos. Esse tipo de departamentalização é classificado como:",
    opcoes: [
      { label: "A", valor: "Por produto ou serviço." },
      { label: "B", valor: "Matricial." },
      { label: "C", valor: "Funcional." },
      { label: "D", valor: "Geográfica." },
      { label: "E", valor: "Por processos." }
    ],
    correta: "C",
    explicacao: "A departamentalização funcional agrupa os colaboradores de acordo com as funções ou especialidades afins (RH, Finanças, Engenharia). É o formato clássico focado na especialização técnica."
  },
  {
    id: "q2_2",
    pergunta: "A estrutura matricial é frequentemente adotada em empresas que lidam com múltiplos projetos complexos. Qual das alternativas abaixo apresenta uma característica central e um desafio típico dessa estrutura?",
    opcoes: [
      { label: "A", valor: "Unidade de comando rigorosa, gerando lentidão na tomada de decisões." },
      { label: "B", valor: "Forte centralização do poder, facilitando a comunicação entre departamentos." },
      { label: "C", valor: "Dupla subordinação (funcional e de projeto), o que pode gerar conflitos de autoridade." },
      { label: "D", valor: "Ausência de gerentes de projeto, focando apenas na hierarquia funcional." },
      { label: "E", valor: "Achatamento extremo da hierarquia, eliminando a departamentalização funcional." }
    ],
    correta: "C",
    explicacao: "Na estrutura matricial, os funcionários respondem simultaneamente a dois chefes: o gerente funcional (ex: chefe de engenharia) e o gerente do projeto. Isso quebra o princípio da unidade de comando e exige maturidade para gerenciar conflitos."
  }
];

export const QUIZ_M3: QuizQuestion[] = [
  {
    id: "q3_1",
    pergunta: "Segundo a Teoria dos Dois Fatores de Frederick Herzberg, certos elementos no ambiente de trabalho apenas evitam a insatisfação, enquanto outros efetivamente geram satisfação e motivação. Assinale a opção que apresenta exclusivamente Fatores Motivacionais (intrínsecos):",
    opcoes: [
      { label: "A", valor: "Salário, benefícios corporativos e condições físicas do escritório." },
      { label: "B", valor: "Reconhecimento, natureza do trabalho em si, responsabilidade e crescimento profissional." },
      { label: "C", valor: "Políticas da empresa, relação com os colegas de trabalho e segurança no emprego." },
      { label: "D", valor: "Remuneração variável, plano de saúde e ticket alimentação." },
      { label: "E", valor: "Status na empresa, qualidade da supervisão e ambiente climatizado." }
    ],
    correta: "B",
    explicacao: "Os Fatores Motivacionais estão ligados ao conteúdo do cargo e à natureza das tarefas (responsabilidade, reconhecimento, realização, o próprio trabalho). Fatores relacionados ao ambiente e à empresa (salário, chefia, condições) são Higiênicos."
  },
  {
    id: "q3_2",
    pergunta: "Na abordagem da Liderança Situacional, de Hersey e Blanchard, o comportamento do líder não deve ser estático. Ele deve adaptar seu estilo (foco na tarefa ou foco no relacionamento) com base em qual fator determinante?",
    opcoes: [
      { label: "A", valor: "Na cultura organizacional definida pelo Planejamento Estratégico." },
      { label: "B", valor: "Na disponibilidade de recursos financeiros da empresa." },
      { label: "C", valor: "No nível de maturidade (competência e motivação) dos liderados em relação a uma tarefa específica." },
      { label: "D", valor: "Na personalidade inata do líder, que não pode ser alterada." },
      { label: "E", valor: "Na estrutura departamental, independentemente das pessoas da equipe." }
    ],
    correta: "C",
    explicacao: "A Liderança Situacional pressupõe que o líder eficaz ajusta seu comportamento diretivo (tarefa) e de apoio (relacionamento) de acordo com o nível de maturidade ou prontidão dos subordinados para executar uma determinada atividade."
  }
];

export const QUIZ_M4: QuizQuestion[] = [
  {
    id: "q4_1",
    pergunta: "O processo de controle é composto classicamente por quatro fases fundamentais. Se um gerente de suprimentos da Petrobras compara a quantidade de material entregue com a quantidade que estava prevista no contrato, ele está executando qual fase do controle?",
    opcoes: [
      { label: "A", valor: "Estabelecimento de padrões." },
      { label: "B", valor: "Mensuração do desempenho real." },
      { label: "C", valor: "Comparação do desempenho real com o padrão estabelecido." },
      { label: "D", valor: "Ação corretiva." },
      { label: "E", valor: "Planejamento tático." }
    ],
    correta: "C",
    explicacao: "As 4 fases são: 1) Definir padrões; 2) Medir o desempenho; 3) Comparar o medido com o padrão; 4) Tomar ação corretiva. Ao verificar se o entregue bate com o contrato, ele está comparando o real com o padrão."
  },
  {
    id: "q4_2",
    pergunta: "Quanto ao momento em que o controle é exercido, ele pode ser preventivo (a priori), simultâneo (concomitante) ou posterior (a posteriori). Qual das ações abaixo é um exemplo clássico de controle preventivo?",
    opcoes: [
      { label: "A", valor: "Auditoria final das demonstrações contábeis no encerramento do exercício." },
      { label: "B", valor: "Manutenção corretiva de uma bomba de extração que quebrou." },
      { label: "C", valor: "Inspeção rigorosa das matérias-primas no exato momento de seu recebimento, antes de entrarem na linha de produção." },
      { label: "D", valor: "Feedback anual de avaliação de desempenho dos funcionários." },
      { label: "E", valor: "Monitoramento em tempo real da temperatura da caldeira durante o turno." }
    ],
    correta: "C",
    explicacao: "A inspeção na entrada (antes do uso) é preventiva (a priori), pois tenta evitar que problemas entrem no sistema produtivo. Monitorar a caldeira (E) é simultâneo, e a avaliação anual (D) é posterior."
  }
];

export const QUIZ_M5: QuizQuestion[] = [
  {
    id: "q5_1",
    pergunta: "Dentro da evolução da Gestão da Qualidade, o conceito de Gestão da Qualidade Total (TQM) introduziu uma mudança de paradigma essencial em relação à era da Inspeção. Na TQM, a responsabilidade pela qualidade do produto final recai sobre:",
    opcoes: [
      { label: "A", valor: "Apenas o departamento de controle de qualidade, responsável por barrar os produtos com defeito." },
      { label: "B", valor: "A equipe de inspetores de linha no final do processo produtivo." },
      { label: "C", valor: "Todos os membros e setores da organização, desde a alta direção até os fornecedores e o chão de fábrica." },
      { label: "D", valor: "Exclusivamente a alta direção, que formula as políticas sem envolver o nível operacional." },
      { label: "E", valor: "O cliente final, que deve reportar as falhas após a compra para o setor de atendimento." }
    ],
    correta: "C",
    explicacao: "A Qualidade Total (TQM) é sistêmica. Ela prega que a qualidade não é papel de um departamento isolado (como na Era da Inspeção), mas responsabilidade de toda a organização, englobando melhoria contínua e foco no cliente."
  },
  {
    id: "q5_2",
    pergunta: "A norma ISO 9001 é o principal referencial internacional para Sistemas de Gestão da Qualidade. Uma organização certificada pela ISO 9001 assegura ao mercado que:",
    opcoes: [
      { label: "A", valor: "Seu produto não causará nenhum dano ambiental (foco da ISO 14001)." },
      { label: "B", valor: "Possui processos padronizados, controlados e voltados para a melhoria contínua e a satisfação do cliente." },
      { label: "C", valor: "Oferece o produto mais barato do seu segmento, independentemente da durabilidade." },
      { label: "D", valor: "Zero defeitos e zero perdas ocorrem em toda a sua cadeia produtiva." },
      { label: "E", valor: "Suas relações trabalhistas e de segurança ocupacional seguem padrões rígidos de compliance." }
    ],
    correta: "B",
    explicacao: "A ISO 9001 atesta que a empresa possui um Sistema de Gestão da Qualidade maduro, com processos documentados e capacidade de fornecer consistentemente produtos/serviços que atendam aos requisitos dos clientes e legais, buscando a melhoria contínua."
  }
];

export const QUIZ_M6: QuizQuestion[] = [
  {
    id: "q6_1",
    pergunta: "Um gestor precisa identificar as poucas causas raízes (cerca de 20%) que são responsáveis pela maior parte (cerca de 80%) dos problemas de atraso na entrega de suprimentos. Qual ferramenta da qualidade é ideal para essa finalidade?",
    opcoes: [
      { label: "A", valor: "Diagrama de Ishikawa (Espinha de Peixe)." },
      { label: "B", valor: "Gráfico de Controle." },
      { label: "C", valor: "Diagrama de Dispersão." },
      { label: "D", valor: "Gráfico de Pareto." },
      { label: "E", valor: "Histograma." }
    ],
    correta: "D",
    explicacao: "O Diagrama (ou Gráfico) de Pareto baseia-se no princípio 80/20, ajudando a priorizar problemas ao evidenciar que a maior parte dos efeitos negativos (80%) geralmente provém de um pequeno número de causas (20%)."
  },
  {
    id: "q6_2",
    pergunta: "Para investigar as causas potenciais que levaram à falha de uma bomba em uma plataforma, a equipe técnica reuniu-se e categorizou as possíveis origens do problema utilizando os '6M' (Máquina, Método, Mão de Obra, Materiais, Meio Ambiente e Medida). A ferramenta descrita é o:",
    opcoes: [
      { label: "A", valor: "Diagrama de Ishikawa (Espinha de Peixe)." },
      { label: "B", valor: "Fluxograma de Processo." },
      { label: "C", valor: "Folha de Verificação." },
      { label: "D", valor: "Ciclo PDCA." },
      { label: "E", valor: "Gráfico de Pareto." }
    ],
    correta: "A",
    explicacao: "O Diagrama de Ishikawa, também conhecido como Espinha de Peixe ou Diagrama de Causa e Efeito, categoriza as causas raízes de um problema (efeito) usualmente através do método dos 6M na indústria."
  }
];

export const QUIZ_M7: QuizQuestion[] = [
  {
    id: "q7_1",
    pergunta: "A Gestão POR Processos difere profundamente da gestão DE Processos ou da estrutura departamental (funcional). Qual alternativa caracteriza adequadamente a Gestão por Processos?",
    opcoes: [
      { label: "A", valor: "Enfatiza as barreiras departamentais, onde cada setor otimiza suas tarefas isoladamente." },
      { label: "B", valor: "Baseia-se em fluxos horizontais (ponta a ponta) que cruzam diferentes departamentos para entregar valor ao cliente." },
      { label: "C", valor: "Limita a comunicação organizacional à cadeia de comando vertical (top-down)." },
      { label: "D", valor: "Substitui inteiramente todos os gerentes departamentais por softwares de automação de fluxo de trabalho." },
      { label: "E", valor: "Foca unicamente em tarefas fragmentadas e individuais no nível operacional." }
    ],
    correta: "B",
    explicacao: "A Gestão por Processos rompe com os chamados 'silos departamentais'. Ela visualiza a organização de forma horizontal, mapeando como o trabalho flui entre diferentes áreas (cross-functional) até entregar o produto/serviço ao cliente."
  },
  {
    id: "q7_2",
    pergunta: "Nos estudos de mapeamento de processos, existe uma categoria de processo que não entrega valor DIRETAMENTE ao cliente externo, mas fornece os recursos e o suporte necessários para que a empresa funcione. Esses processos são chamados de:",
    opcoes: [
      { label: "A", valor: "Processos Finalísticos ou Primários." },
      { label: "B", valor: "Processos de Negócio." },
      { label: "C", valor: "Processos de Suporte ou Apoio." },
      { label: "D", valor: "Processos Estratégicos ou Gerenciais." },
      { label: "E", valor: "Processos Críticos Externos." }
    ],
    correta: "C",
    explicacao: "Processos de Apoio (ou Suporte) incluem áreas como TI, RH e Contabilidade. Eles dão suporte aos processos primários (finalísticos), não tocando diretamente o cliente final, mas sendo essenciais à sobrevivência da empresa."
  }
];

export const QUIZ_M8: QuizQuestion[] = [
  {
    id: "q8_1",
    pergunta: "No Ciclo de Vida do BPM (Business Process Management), a fase AS-IS e a fase TO-BE correspondem, respectivamente, a:",
    opcoes: [
      { label: "A", valor: "A implementação de um novo sistema de TI e o treinamento da equipe." },
      { label: "B", valor: "O desenho de como o processo DEVERIA SER no futuro e o diagnóstico de como o processo É ATUALMENTE." },
      { label: "C", valor: "A automação de processos antigos e o descarte de processos obsoletos." },
      { label: "D", valor: "O mapeamento da situação ATUAL (como o processo ocorre hoje) e o desenho do processo MELHORADO para o futuro." },
      { label: "E", valor: "O monitoramento de indicadores (KPIs) e a criação da documentação legal da empresa." }
    ],
    correta: "D",
    explicacao: "AS-IS significa 'como está', referindo-se ao mapeamento da situação atual (descobrimento). TO-BE significa 'como deve ser', representando a fase de redesenho e propostas de melhoria para o futuro."
  },
  {
    id: "q8_2",
    pergunta: "A reengenharia de processos e a melhoria contínua (Kaizen) são abordagens distintas. Diferente do Kaizen, a Reengenharia caracteriza-se por ser uma mudança:",
    opcoes: [
      { label: "A", valor: "Gradual, incremental e de baixo risco, focada em ajustes diários." },
      { label: "B", valor: "Radical, drástica e fundamental, repensando o processo do zero (começando com a folha em branco)." },
      { label: "C", valor: "Baseada na padronização das rotinas atuais para evitar qualquer tipo de alteração no fluxo de trabalho." },
      { label: "D", valor: "Focada unicamente na redução de pessoal, independentemente do fluxo das tarefas." },
      { label: "E", valor: "Conduzida exclusivamente pelos operários da linha de frente sem o envolvimento da diretoria." }
    ],
    correta: "B",
    explicacao: "A Reengenharia (criada por Hammer e Champy) prega o redesenho drástico e radical dos processos, abandonando regras antigas. Já a melhoria contínua (Kaizen) defende mudanças graduais, suaves e constantes."
  }
];

export const QUIZ_M9: QuizQuestion[] = [
  {
    id: "q9_1",
    pergunta: "O conceito de 'Momento da Verdade' em serviços, cunhado por Jan Carlzon, refere-se a:",
    opcoes: [
      { label: "A", valor: "Qualquer episódio em que o cliente entra em contato com um aspecto da organização e forma uma impressão sobre a qualidade do serviço." },
      { label: "B", valor: "O instante em que o cliente realiza o pagamento pelo serviço prestado, finalizando o contrato financeiro." },
      { label: "C", valor: "O processo interno de auditoria em que as falhas operacionais são reveladas à diretoria." },
      { label: "D", valor: "A fase de desenvolvimento de um novo produto onde os defeitos de design são finalmente solucionados." },
      { label: "E", valor: "A assinatura do contrato de garantia de nível de serviço (SLA) entre duas grandes corporações." }
    ],
    correta: "A",
    explicacao: "O Momento da Verdade é qualquer ponto de interação (touchpoint) direto ou indireto entre a empresa e o cliente, no qual uma percepção de qualidade (positiva ou negativa) é gerada na mente do consumidor."
  },
  {
    id: "q9_2",
    pergunta: "Serviços possuem características intrínsecas que os diferenciam de produtos manufaturados. A característica que indica que um serviço 'não pode ser estocado ou guardado para venda futura' (como assentos vazios em um avião) denomina-se:",
    opcoes: [
      { label: "A", valor: "Intangibilidade." },
      { label: "B", valor: "Inseparabilidade." },
      { label: "C", valor: "Perecibilidade." },
      { label: "D", valor: "Variabilidade (ou Heterogeneidade)." },
      { label: "E", valor: "Homogeneidade." }
    ],
    correta: "C",
    explicacao: "A perecibilidade significa que os serviços expiram. Um voo que decola com assentos vazios ou um quarto de hotel vago em um determinado dia geram uma receita perdida que não pode ser estocada para amanhã."
  }
];

export const QUIZ_M10: QuizQuestion[] = [
  {
    id: "q10_1",
    pergunta: "A Ouvidoria diferencia-se do Serviço de Atendimento ao Consumidor (SAC) tradicional. Enquanto o SAC é voltado para a resolução operacional no primeiro contato, a Ouvidoria atua predominantemente como:",
    opcoes: [
      { label: "A", valor: "Setor de vendas ativas e retenção de clientes insatisfeitos com multas contratuais." },
      { label: "B", valor: "Primeira instância de atendimento para solicitações rotineiras e emissão de segunda via de boletos." },
      { label: "C", valor: "Última instância de recurso para o cliente (segunda instância), analisando conflitos não resolvidos e promovendo a melhoria dos processos da empresa." },
      { label: "D", valor: "Um braço do departamento de marketing, com foco em campanhas de relações públicas e promoção da marca nas redes sociais." },
      { label: "E", valor: "Um tribunal arbitral externo e vinculante, com poder coercitivo imediato sobre a organização financeira." }
    ],
    correta: "C",
    explicacao: "A Ouvidoria é a 2ª instância de atendimento. O cliente só deve acioná-la após não conseguir resolver seu problema pelos canais tradicionais (SAC, Agências). Ela defende os direitos do cidadão/cliente dentro da instituição e propõe mudanças sistêmicas."
  },
  {
    id: "q10_2",
    pergunta: "Na gestão do atendimento ao público no setor governamental e em grandes estatais (como Petrobras), o recebimento de críticas e feedbacks dos cidadãos deve ser visto estrategicamente como:",
    opcoes: [
      { label: "A", valor: "Um indicativo de ineficiência apenas dos atendentes de linha de frente, que devem ser punidos por não reterem o problema." },
      { label: "B", valor: "Uma anomalia indesejada a ser ignorada, pois a administração pública goza da presunção de perfeição e legalidade plena em seus atos." },
      { label: "C", valor: "Uma métrica secundária, já que o cidadão não tem opções de concorrência e não pode 'mudar de fornecedor' nos serviços monopolizados." },
      { label: "D", valor: "Uma oportunidade valiosa (insumo) de melhoria contínua dos processos e de avaliação do nível de qualidade entregue à sociedade." },
      { label: "E", valor: "Um problema restrito ao departamento jurídico, para antecipar defesas em processos legais e contenciosos judiciais e proteger o patrimônio público." }
    ],
    correta: "D",
    explicacao: "Na administração pública moderna (foco no cidadão), o feedback (críticas, reclamações) é um insumo estratégico fundamental para o ciclo de melhoria contínua (PDCA) e para o exercício do controle social."
  }
];
