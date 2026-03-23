import { QuizQuestion } from "../../shared";

// ═══ MÓDULO 1 — UPSTREAM OPERATIONS (EXPLORATION & DRILLING) ═══
export const QUIZ_M1_UPSTREAM: QuizQuestion[] = [
  {
    id: 101,
    pergunta:
      "In oil exploration, what does 'Seismic Survey' help geologists identify?",
    opcoes: [
      { label: "A", valor: "Rock layers and potential oil reserves" },
      { label: "B", valor: "Equipment maintenance schedules" },
      { label: "C", valor: "Employee safety protocols" },
      { label: "D", valor: "Market prices for crude oil" },
      { label: "E", valor: "Refinery efficiency rates" },
    ],
    correta: "A",
    explicacao:
      "Seismic Survey = Investigação sísmica. Usa ondas sonoras para mapear estruturas geológicas subterrâneas e identificar depósitos de óleo e gás.",
  },
  {
    id: 102,
    pergunta: "What is the primary function of a 'Wellhead' in drilling operations?",
    opcoes: [
      { label: "A", valor: "Controls the flow of oil/gas from the well" },
      { label: "B", valor: "Measures employee productivity" },
      { label: "C", valor: "Stores crude oil temporarily" },
      { label: "D", valor: "Trains new operators" },
      { label: "E", valor: "Processes waste water" },
    ],
    correta: "A",
    explicacao:
      "Wellhead = Cabeçote do poço. É o conjunto de equipamentos no topo do poço que controla a pressão e o fluxo de óleo/gás.",
  },
  {
    id: 103,
    pergunta:
      "The term 'Casing' in drilling refers to the _______ that lines the well.",
    opcoes: [
      { label: "A", valor: "Steel pipes" },
      { label: "B", valor: "Cement mixture" },
      { label: "C", valor: "Drilling fluid" },
      { label: "D", valor: "Sand layers" },
      { label: "E", valor: "Metal detection equipment" },
    ],
    correta: "A",
    explicacao:
      "Casing = Revestimento. São tubos de aço instalados dentro do poço para suportar as paredes e evitar colapso.",
  },
  {
    id: 104,
    pergunta: "What is 'Perforation' in the context of well completion?",
    opcoes: [
      { label: "A", valor: "Making holes to allow oil/gas to flow into the well" },
      { label: "B", valor: "Sealing cracks in the wellhead" },
      { label: "C", valor: "Cleaning the drill pipe" },
      { label: "D", valor: "Testing equipment durability" },
      { label: "E", valor: "Mixing crude oil batches" },
    ],
    correta: "A",
    explicacao:
      "Perforation = Canhoneio. Processo de fazer furos nas paredes do poço para permitir que óleo/gás fluam do reservatório para dentro do poço.",
  },
  {
    id: 105,
    pergunta:
      "Which term describes the underground rock layer containing oil and gas?",
    opcoes: [
      { label: "A", valor: "Reservoir" },
      { label: "B", valor: "Refinery" },
      { label: "C", valor: "Terminal" },
      { label: "D", valor: "Shale" },
      { label: "E", valor: "Trap" },
    ],
    correta: "A",
    explicacao:
      "Reservoir = Reservatório. É a formação geológica porosa e permeável que contém os hidrocarbonetos. Shale é um tipo de rocha-mãe.",
  },
  {
    id: 106,
    pergunta:
      "What does 'Tubing' carry from the reservoir to the surface in a production well?",
    opcoes: [
      { label: "A", valor: "Oil and natural gas" },
      { label: "B", valor: "Drilling fluid only" },
      { label: "C", valor: "Cooling water" },
      { label: "D", valor: "Electrical cables" },
      { label: "E", valor: "Waste materials" },
    ],
    correta: "A",
    explicacao:
      "Tubing = Coluna de produção. São tubos que trazem o óleo e/ou gás natural desde o reservatório até a superfície.",
  },
  {
    id: 107,
    pergunta:
      "An 'Offshore' operation means the drilling is happening _______ .",
    opcoes: [
      { label: "A", valor: "Far from shore, in the ocean" },
      { label: "B", valor: "Near the coast on land" },
      { label: "C", valor: "Inside a city" },
      { label: "D", valor: "Underground in mountains" },
      { label: "E", valor: "In desert areas" },
    ],
    correta: "A",
    explicacao:
      "Offshore = Em alto mar. Operações realizadas em plataformas no oceano, além da linha de costa.",
  },
  {
    id: 108,
    pergunta:
      "The Petrobras E&P division focuses on which part of the oil industry?",
    opcoes: [
      { label: "A", valor: "Exploration and Production" },
      { label: "B", valor: "Equipment and Procurement" },
      { label: "C", valor: "Environmental and Personnel" },
      { label: "D", valor: "Efficiency and Pricing" },
      { label: "E", valor: "Engineering and Planning" },
    ],
    correta: "A",
    explicacao:
      "E&P = Exploração e Produção (Exploration & Production). É a divisão que busca por novos campos e explora os existentes.",
  },
  {
    id: 109,
    pergunta:
      "What is the main difference between 'Onshore' and 'Offshore' operations?",
    opcoes: [
      { label: "A", valor: "Location (land vs. water)" },
      { label: "B", valor: "Equipment type (only)" },
      { label: "C", valor: "Salary differences" },
      { label: "D", valor: "Drilling depth (only)" },
      { label: "E", valor: "Amount of oil found" },
    ],
    correta: "A",
    explicacao:
      "Onshore = em terra. Offshore = em água. A principal diferença é a localização geográfica da operação.",
  },
  {
    id: 110,
    pergunta:
      "A 'Drilling Rig' serves as the main _______ for extracting oil from the ground.",
    opcoes: [
      { label: "A", valor: "Equipment platform" },
      { label: "B", valor: "Storage facility" },
      { label: "C", valor: "Transportation vessel" },
      { label: "D", valor: "Processing center" },
      { label: "E", valor: "Sales office" },
    ],
    correta: "A",
    explicacao:
      "Drilling Rig = Sonda de perfuração. Equipamento especializado montado no local do poço para perfurar e extrair óleo/gás.",
  },
];

// ═══ MÓDULO 2 — DOWNSTREAM OPERATIONS (REFINING & DISTRIBUTION) ═══
export const QUIZ_M2_DOWNSTREAM: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "What is a 'Refinery' responsible for?",
    opcoes: [
      { label: "A", valor: "Converting crude oil into usable products" },
      { label: "B", valor: "Exploring for new oil deposits" },
      { label: "C", valor: "Transporting oil by ship" },
      { label: "D", valor: "Selling oil directly to consumers" },
      { label: "E", valor: "Training petroleum engineers" },
    ],
    correta: "A",
    explicacao:
      "Refinery = Refinaria. Instalação industrial que transforma petróleo bruto em gasolina, diesel, querosene e outros derivados.",
  },
  {
    id: 202,
    pergunta: "The process of separating crude oil into different products is called:",
    opcoes: [
      { label: "A", valor: "Distillation" },
      { label: "B", valor: "Extraction" },
      { label: "C", valor: "Combustion" },
      { label: "D", valor: "Erosion" },
      { label: "E", valor: "Consolidation" },
    ],
    correta: "A",
    explicacao:
      "Distillation (Destilação) = Separação do petróleo bruto em diferentes frações de acordo com seus pontos de ebulição em coluna de destilação.",
  },
  {
    id: 203,
    pergunta:
      "In refining, 'Cracking' is a process that breaks down _______ molecules into smaller ones.",
    opcoes: [
      { label: "A", valor: "Larger hydrocarbon" },
      { label: "B", valor: "Water" },
      { label: "C", valor: "Salt" },
      { label: "D", valor: "Concrete" },
      { label: "E", valor: "Plastic" },
    ],
    correta: "A",
    explicacao:
      "Cracking = Craqueamento. Processo que quebra moléculas maiores de hidrocarbonetos em moléculas menores e mais valiosas.",
  },
  {
    id: 204,
    pergunta:
      "What are 'Derivatives' in the oil industry context? Products like:",
    opcoes: [
      { label: "A", valor: "Gasoline, diesel, jet fuel, lubricants" },
      { label: "B", valor: "Steel pipes and valves" },
      { label: "C", valor: "Drilling equipment" },
      { label: "D", valor: "Marine vessels" },
      { label: "E", valor: "Computer software" },
    ],
    correta: "A",
    explicacao:
      "Derivatives = Derivados. Todos os produtos finais obtidos do refino do petróleo bruto.",
  },
  {
    id: 205,
    pergunta: "Downstream operations include all activities EXCEPT:",
    opcoes: [
      { label: "A", valor: "Seismic surveys" },
      { label: "B", valor: "Refining" },
      { label: "C", valor: "Distribution" },
      { label: "D", valor: "Retail sales" },
      { label: "E", valor: "Retail" },
    ],
    correta: "A",
    explicacao:
      "Seismic surveys = Levantamentos sísmicos. É atividade de Upstream (Exploração). Downstream é: refino, distribuição, logística, varejo.",
  },
  {
    id: 206,
    pergunta: "What is the primary purpose of 'Distribution' in downstream?",
    opcoes: [
      { label: "A", valor: "Moving refined products to retailers and consumers" },
      { label: "B", valor: "Finding new oil reserves" },
      { label: "C", valor: "Training refinery workers" },
      { label: "D", valor: "Designing new equipment" },
      { label: "E", valor: "Buying raw materials" },
    ],
    correta: "A",
    explicacao:
      "Distribution = Distribuição. Transporte e entrega dos produtos refinados aos postos, distribuidoras e clientes finais.",
  },
  {
    id: 207,
    pergunta: "Refineries located near _______ face unique logistical advantages.",
    opcoes: [
      { label: "A", valor: "Ports and major cities" },
      { label: "B", valor: "Oil wells only" },
      { label: "C", valor: "Mountains" },
      { label: "D", valor: "Remote deserts" },
      { label: "E", valor: "National parks" },
    ],
    correta: "A",
    explicacao:
      "Refinarias próximas a portos e cidades grandes ganham vantagem logística: acesso a matéria-prima e proximidade ao mercado consumidor.",
  },
  {
    id: 208,
    pergunta:
      "The term 'Throughput' in refining refers to the _______ of crude oil processed.",
    opcoes: [
      { label: "A", valor: "Amount or volume" },
      { label: "B", valor: "Quality grade" },
      { label: "C", valor: "Color shade" },
      { label: "D", valor: "Price per barrel" },
      { label: "E", valor: "Origin country" },
    ],
    correta: "A",
    explicacao:
      "Throughput = Vazão de processamento. Quantidade de petróleo bruto processada pela refinaria em um período (barris por dia, bpd).",
  },
  {
    id: 209,
    pergunta: "Supply chain in downstream oil typically includes:",
    opcoes: [
      { label: "A", valor: "Refining, distribution, retail, consumer" },
      { label: "B", valor: "Mining, drilling, extraction only" },
      { label: "C", valor: "Exploration and production only" },
      { label: "D", valor: "Trading and speculation only" },
      { label: "E", valor: "Government taxation only" },
    ],
    correta: "A",
    explicacao:
      "Cadeia de valor downstream: Refinaria → Distribuição → Varejo (postos) → Consumidor final. Cada etapa adiciona valor.",
  },
  {
    id: 210,
    pergunta: "Which downstream product is considered a strategic commodity?",
    opcoes: [
      { label: "A", valor: "Diesel" },
      { label: "B", valor: "Cosmetics" },
      { label: "C", valor: "Decorative items" },
      { label: "D", valor: "Toys" },
      { label: "E", valor: "Furniture" },
    ],
    correta: "A",
    explicacao:
      "Diesel = Combustível estratégico. Usado em transporte, agricultura, indústria. Sua disponibilidade afeta toda a economia.",
  },
];

// ═══ MÓDULO 3 — INDUSTRIAL EQUIPMENT (VALVES, PUMPS, PIPES, RIGS) ═══
export const QUIZ_M3_EQUIPMENT: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "What is the main function of a 'Valve' in oil operations?",
    opcoes: [
      { label: "A", valor: "Controls and regulates fluid flow" },
      { label: "B", valor: "Heats the crude oil" },
      { label: "C", valor: "Measures temperature only" },
      { label: "D", valor: "Filters solid particles" },
      { label: "E", valor: "Records daily reports" },
    ],
    correta: "A",
    explicacao:
      "Valve = Válvula. Dispositivo que controla, direciona e regula o fluxo de fluidos (óleo, gás, água) através de tubulações.",
  },
  {
    id: 302,
    pergunta: "A 'Pump' is essential in offshore operations because it:",
    opcoes: [
      { label: "A", valor: "Moves fluid against pressure and gravity" },
      { label: "B", valor: "Cools down the well" },
      { label: "C", valor: "Explores for oil" },
      { label: "D", valor: "Processes final products" },
      { label: "E", valor: "Trains personnel" },
    ],
    correta: "A",
    explicacao:
      "Pump = Bomba. Equipamento que desloca fluidos vencendo pressão, gravidade e resistência. Essencial para elevação e transferência de óleo.",
  },
  {
    id: 303,
    pergunta: "What does 'Pipe' primarily do in an oil facility?",
    opcoes: [
      { label: "A", valor: "Transports fluids between equipment" },
      { label: "B", valor: "Stores electrical power" },
      { label: "C", valor: "Measures atmospheric pressure" },
      { label: "D", valor: "Cooks food for workers" },
      { label: "E", valor: "Provides internet connection" },
    ],
    correta: "A",
    explicacao:
      "Pipe = Tubo/Tubulação. Conduto que transporta óleo, gás natural, água ou outros fluidos entre equipamentos e instalações.",
  },
  {
    id: 304,
    pergunta:
      "A 'Separator' in oil production separates _______ into distinct phases.",
    opcoes: [
      { label: "A", valor: "Oil, gas, and water" },
      { label: "B", valor: "Hot and cold substances" },
      { label: "C", valor: "Light and dark colors" },
      { label: "D", valor: "Employees by shift" },
      { label: "E", valor: "Vehicles by size" },
    ],
    correta: "A",
    explicacao:
      "Separator = Separador. Vaso que recebe a produção do poço e separa óleo, gás natural e água em fases distintas.",
  },
  {
    id: 305,
    pergunta:
      "What is the primary difference between a 'Rig' used for drilling and a 'Platform'?",
    opcoes: [
      { label: "A", valor: "Rig drills; platform is permanent infrastructure" },
      { label: "B", valor: "They are the same thing" },
      { label: "C", valor: "Platform drills; rig produces oil" },
      { label: "D", valor: "Rigs are only on land" },
      { label: "E", valor: "Platforms don't need equipment" },
    ],
    correta: "A",
    explicacao:
      "Rig = Sonda móvel para perfuração. Platform = Estrutura fixa/permanente para produção. Rig perfura, plataforma produz.",
  },
  {
    id: 306,
    pergunta:
      "A 'Compressor' in gas operations serves to _______ the gas pressure.",
    opcoes: [
      { label: "A", valor: "Increase" },
      { label: "B", valor: "Decrease" },
      { label: "C", valor: "Stabilize only" },
      { label: "D", valor: "Evaporate" },
      { label: "E", valor: "Liquefy" },
    ],
    correta: "A",
    explicacao:
      "Compressor = Compressor. Aumenta a pressão do gás natural para transporte, processamento ou armazenamento.",
  },
  {
    id: 307,
    pergunta:
      "Which of these is NOT typically a material for oil industry pipes?",
    opcoes: [
      { label: "A", valor: "Wooden poles" },
      { label: "B", valor: "Carbon steel" },
      { label: "C", valor: "Stainless steel" },
      { label: "D", valor: "Polyethylene (for some applications)" },
      { label: "E", valor: "Alloy steel" },
    ],
    correta: "A",
    explicacao:
      "Wooden poles = Postes de madeira. Não resistem às pressões, corrosão e condições de trabalho na indústria de óleo. Usam-se aços e ligas metálicas.",
  },
  {
    id: 308,
    pergunta: "The term 'Relief Valve' is critical because it:",
    opcoes: [
      { label: "A", valor: "Prevents overpressure by releasing excess fluid" },
      { label: "B", valor: "Increases pressure automatically" },
      { label: "C", valor: "Measures temperature precisely" },
      { label: "D", valor: "Cools equipment rapidly" },
      { label: "E", valor: "Filters dirt from oil" },
    ],
    correta: "A",
    explicacao:
      "Relief Valve = Válvula de alívio. Abre automaticamente para liberar excesso de pressão e proteger equipamentos de danos por overpressão (SAFETY).",
  },
  {
    id: 309,
    pergunta: "What does 'Corrosion' pose as a challenge in pipe management?",
    opcoes: [
      { label: "A", valor: "It weakens metal and causes leaks" },
      { label: "B", valor: "It increases oil quality" },
      { label: "C", valor: "It improves equipment strength" },
      { label: "D", valor: "It reduces operational costs" },
      { label: "E", valor: "It speeds up production" },
    ],
    correta: "A",
    explicacao:
      "Corrosion = Corrosão. Deterioração do metal por reação química com óleo, gás, água salgada. Causa vazamentos e falhas. Exige inspeção e manutenção.",
  },
  {
    id: 310,
    pergunta: "A 'Heat Exchanger' is used to:",
    opcoes: [
      { label: "A", valor: "Transfer heat between two fluids" },
      { label: "B", valor: "Measure temperature only" },
      { label: "C", valor: "Store energy" },
      { label: "D", valor: "Separate oil phases" },
      { label: "E", valor: "Filter impurities" },
    ],
    correta: "A",
    explicacao:
      "Heat Exchanger = Trocador de calor. Equipamento que transfere calor de um fluido para outro para aquecer/resfriar no processo.",
  },
];

// ═══ MÓDULO 4 — SAFETY & HSE (PPE, HAZARD, INCIDENT, COMPLIANCE) ═══
export const QUIZ_M4_SAFETY: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "What does 'HSE' stand for in the oil industry?",
    opcoes: [
      { label: "A", valor: "Health, Safety, and Environment" },
      { label: "B", valor: "Heat, Strength, and Efficiency" },
      { label: "C", valor: "Hydraulic, Safety, Equipment" },
      { label: "D", valor: "Hazard, Supply, Enhancement" },
      { label: "E", valor: "Heavy, Standard, Emergency" },
    ],
    correta: "A",
    explicacao:
      "HSE = Saúde, Segurança e Meio Ambiente (Health, Safety, Environment). Pilares fundamentais da operação segura em Petrobras.",
  },
  {
    id: 402,
    pergunta: "PPE stands for _______ and includes items like helmets and gloves.",
    opcoes: [
      { label: "A", valor: "Personal Protective Equipment" },
      { label: "B", valor: "Pressure Processing Equipment" },
      { label: "C", valor: "Primary Petroleum Estate" },
      { label: "D", valor: "Portable Power Equipment" },
      { label: "E", valor: "Platform Personnel Equipment" },
    ],
    correta: "A",
    explicacao:
      "PPE = Equipamento de Proteção Individual (Personal Protective Equipment). Obrigatório em todas as áreas operacionais.",
  },
  {
    id: 403,
    pergunta: "What is the difference between a 'Hazard' and a 'Risk'?",
    opcoes: [
      { label: "A", valor: "Hazard = potential danger; Risk = probability it causes harm" },
      { label: "B", valor: "They mean the same thing" },
      { label: "C", valor: "Hazard is less serious" },
      { label: "D", valor: "Risk only applies to people" },
      { label: "E", valor: "Hazard only applies to equipment" },
    ],
    correta: "A",
    explicacao:
      "Hazard = Perigo potencial (ex: pressão alta, calor). Risk = Probabilidade de que esse perigo cause dano (ex: queimadura em 50% das exposições).",
  },
  {
    id: 404,
    pergunta:
      "An 'Incident' in the workplace is defined as an unplanned event that:",
    opcoes: [
      { label: "A", valor: "Results or could result in injury or property damage" },
      { label: "B", valor: "Always results in death" },
      { label: "C", valor: "Only affects equipment" },
      { label: "D", valor: "Is never reported" },
      { label: "E", valor: "Happens only once" },
    ],
    correta: "A",
    explicacao:
      "Incident = Qualquer evento não planejado que causa ou poderia causar lesão, doença ou dano à propriedade. Deve ser SEMPRE reportado.",
  },
  {
    id: 405,
    pergunta:
      "What is a 'Near-Miss' and why is it important to report it in HSE culture?",
    opcoes: [
      { label: "A", valor: "Close call with no injury; shows potential hazard" },
      { label: "B", valor: "A successful safety drill" },
      { label: "C", valor: "A minor injury that doesn't matter" },
      { label: "D", valor: "Equipment that barely functions" },
      { label: "E", valor: "A rare natural phenomenon" },
    ],
    correta: "A",
    explicacao:
      "Near-Miss = Quase acidente. Não causou dano, mas poderia ter. Reportá-lo é essencial para identificar e eliminar riscos ANTES de lesões.",
  },
  {
    id: 406,
    pergunta: "What does 'SOP' stand for in operational procedures?",
    opcoes: [
      { label: "A", valor: "Standard Operating Procedure" },
      { label: "B", valor: "Safety Or Penalty" },
      { label: "C", valor: "Systematic Oil Processing" },
      { label: "D", valor: "System Operation Protocol" },
      { label: "E", valor: "Standard Oil Product" },
    ],
    correta: "A",
    explicacao:
      "SOP = Procedimento Operacional Padrão. Documento que descreve passo-a-passo como executar uma tarefa com segurança.",
  },
  {
    id: 407,
    pergunta:
      "Which PPE item is absolutely mandatory in ALL offshore operations?",
    opcoes: [
      { label: "A", valor: "Hard hat / Safety helmet" },
      { label: "B", valor: "Tie" },
      { label: "C", valor: "Watch" },
      { label: "D", valor: "Scarf" },
      { label: "E", valor: "Hat (regular)" },
    ],
    correta: "A",
    explicacao:
      "Hard Hat = Capacete de segurança. Proteção contra impactos na cabeça. Obrigatório em TODAS as áreas de operação Petrobras.",
  },
  {
    id: 408,
    pergunta: "What is 'Compliance' in HSE terms?",
    opcoes: [
      { label: "A", valor: "Following all regulations, rules, and safety standards" },
      { label: "B", valor: "Ignoring safety rules" },
      { label: "C", valor: "Negotiating with authorities" },
      { label: "D", valor: "Breaking laws to save money" },
      { label: "E", valor: "Optional safety practices" },
    ],
    correta: "A",
    explicacao:
      "Compliance = Conformidade. Cumprimento de todas as leis, regulamentos, normas técnicas e políticas HSE de segurança.",
  },
  {
    id: 409,
    pergunta: "What should be done if you witness a hazardous situation?",
    opcoes: [
      { label: "A", valor: "Report it immediately to supervisor; don't ignore" },
      { label: "B", valor: "Ignore it if you're not affected" },
      { label: "C", valor: "Tell your friends privately" },
      { label: "D", valor: "Wait until it causes an accident" },
      { label: "E", valor: "Document it and keep to yourself" },
    ],
    correta: "A",
    explicacao:
      "Reportar hazards imediatamente é dever de TODOS. Petrobras incentiva 'no blame' reporting culture para evitar acidentes futuros.",
  },
  {
    id: 410,
    pergunta:
      "A 'Lock-Out Tag-Out (LOTO)' procedure is critical when performing _______ .",
    opcoes: [
      { label: "A", valor: "Equipment maintenance on electrical/mechanical systems" },
      { label: "B", valor: "Routine inspections only" },
      { label: "C", valor: "Writing reports" },
      { label: "D", valor: "Making coffee in break room" },
      { label: "E", valor: "Attending meetings" },
    ],
    correta: "A",
    explicacao:
      "LOTO = Travamento e identificação. Desativa fontes de energia e coloca etiqueta antes de manutenção para evitar acionamento acidental.",
  },
];

// ═══ MÓDULO 5 — FINANCIAL & BUSINESS TERMS ═══
export const QUIZ_M5_FINANCIAL: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "What does 'CAPEX' represent in oil company budgeting?",
    opcoes: [
      { label: "A", valor: "Capital Expenditure (large investments in assets)" },
      { label: "B", valor: "Cost of Auxiliary Production" },
      { label: "C", valor: "Chief Approval Permit Execution" },
      { label: "D", valor: "Crude Administration Position Extra" },
      { label: "E", valor: "Capital Expedited Extension" },
    ],
    correta: "A",
    explicacao:
      "CAPEX = Despesas de Capital (Capital Expenditure). Investimentos em ativos de longa vida (plataformas, refinarias, equipamentos).",
  },
  {
    id: 502,
    pergunta: "What does 'OPEX' include in daily operations?",
    opcoes: [
      { label: "A", valor: "Operating costs like salaries, maintenance, fuel" },
      { label: "B", valor: "One-time equipment purchase" },
      { label: "C", valor: "Only employee bonuses" },
      { label: "D", valor: "Executive retirement benefits" },
      { label: "E", valor: "Oil export prices" },
    ],
    correta: "A",
    explicacao:
      "OPEX = Despesas Operacionais (Operating Expenditure). Custos recorrentes da operação do dia-a-dia (folha, manutenção, insumos).",
  },
  {
    id: 503,
    pergunta: "What is 'Brent Crude' used for in the oil industry?",
    opcoes: [
      { label: "A", valor: "Global benchmark price reference for crude oil" },
      { label: "B", valor: "A specific type of refinery" },
      { label: "C", valor: "A oil storage facility" },
      { label: "D", valor: "A safety certification" },
      { label: "E", valor: "A shipping company" },
    ],
    correta: "A",
    explicacao:
      "Brent Crude = Referência de preço global do petróleo bruto. Cotação usada para precificar contratos de venda/compra mundialmente.",
  },
  {
    id: 504,
    pergunta: "Who are 'Stakeholders' in a Petrobras project?",
    opcoes: [
      { label: "A", valor: "All parties with interest/investment (investors, employees, government)" },
      { label: "B", valor: "Only company executives" },
      { label: "C", valor: "Only shareholders" },
      { label: "D", valor: "Only customers" },
      { label: "E", valor: "Only suppliers" },
    ],
    correta: "A",
    explicacao:
      "Stakeholders = Partes interessadas. Qualquer pessoa/entidade afetada ou com interesse no projeto (acionistas, funcionários, governo, comunidades).",
  },
  {
    id: 505,
    pergunta: "What does 'ROI' measure in business decisions?",
    opcoes: [
      { label: "A", valor: "Return on Investment (profit relative to cost)" },
      { label: "B", valor: "Risk of Inflation" },
      { label: "C", valor: "Rate of Implementation" },
      { label: "D", valor: "Routine Operating Increment" },
      { label: "E", valor: "Range of Interest" },
    ],
    correta: "A",
    explicacao:
      "ROI = Retorno sobre Investimento (Return on Investment). Calcula lucro/ganho resultado dividido pelo investimento inicial em percentual.",
  },
  {
    id: 506,
    pergunta:
      "A 'Cost-Benefit Analysis' compares _______ of a project to justify decisions.",
    opcoes: [
      { label: "A", valor: "Expected benefits versus total costs" },
      { label: "B", valor: "Employee salaries only" },
      { label: "C", valor: "Equipment prices only" },
      { label: "D", valor: "Environmental impact alone" },
      { label: "E", valor: "Market competition only" },
    ],
    correta: "A",
    explicacao:
      "Cost-Benefit = Análise de custo-benefício. Quantifica benefícios esperados contra custos para justificar investimento ou projeto.",
  },
  {
    id: 507,
    pergunta: "In oil pricing, 'WTI' stands for and is _______ crude benchmark.",
    opcoes: [
      { label: "A", valor: "West Texas Intermediate; US oil price reference" },
      { label: "B", valor: "West Texas International; global standard" },
      { label: "C", valor: "World Trade Infrastructure" },
      { label: "D", valor: "Worldwide Technical Index" },
      { label: "E", valor: "Western Trading Initiative" },
    ],
    correta: "A",
    explicacao:
      "WTI = West Texas Intermediate. Referência de preço do petróleo nos EUA. Junto com Brent, são as duas principais cotações globais.",
  },
  {
    id: 508,
    pergunta:
      "What is a 'Joint Venture' in upstream oil exploration and production?",
    opcoes: [
      { label: "A", valor: "Partnership between companies sharing costs and revenues" },
      { label: "B", valor: "A single company drilling alone" },
      { label: "C", valor: "A government agency" },
      { label: "D", valor: "A tourist attraction" },
      { label: "E", valor: "A marketing campaign" },
    ],
    correta: "A",
    explicacao:
      "Joint Venture = Acordo de parceria. Múltiplas empresas se unem dividindo investimentos, riscos e ganhos em exploração/produção.",
  },
  {
    id: 509,
    pergunta: "What does 'Margin' refer to in oil trading?",
    opcoes: [
      { label: "A", valor: "Profit difference between selling and buying price" },
      { label: "B", valor: "Total volume sold" },
      { label: "C", valor: "Employee benefit package" },
      { label: "D", valor: "Manufacturing cost only" },
      { label: "E", valor: "Shipping distance" },
    ],
    correta: "A",
    explicacao:
      "Margin = Margem. Diferença entre preço de venda e custo de aquisição/produção. Maior margem = maior lucro.",
  },
  {
    id: 510,
    pergunta:
      "A 'Barrel' (bbl) of crude oil represents a standardized unit of _______ .",
    opcoes: [
      { label: "A", valor: "Volume (42 US gallons or ~159 liters)" },
      { label: "B", valor: "Weight only" },
      { label: "C", valor: "Quality grade" },
      { label: "D", valor: "Price per unit" },
      { label: "E", valor: "Shipping container" },
    ],
    correta: "A",
    explicacao:
      "Barrel = Barril. Unidade de volume internacional: 1 bbl = 42 galões US = ~159 litros. Base para cotações globais.",
  },
];

// ═══ MÓDULO 6 — ENVIRONMENTAL TERMS ═══
export const QUIZ_M6_ENVIRONMENTAL: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "What is a 'Carbon Footprint'?",
    opcoes: [
      { label: "A", valor: "Total greenhouse gases emitted by an activity/company" },
      { label: "B", valor: "Physical imprint left at a work site" },
      { label: "C", valor: "Amount of coal used" },
      { label: "D", valor: "Type of vehicle emission" },
      { label: "E", valor: "Measure of air quality" },
    ],
    correta: "A",
    explicacao:
      "Carbon Footprint = Pegada de carbono. Total de gases de efeito estufa emitidos (CO₂ equivalente) por operações/empresa.",
  },
  {
    id: 602,
    pergunta: "What does 'ESG' stand for in corporate strategy?",
    opcoes: [
      { label: "A", valor: "Environmental, Social, Governance" },
      { label: "B", valor: "Efficiency, Supply, Growth" },
      { label: "C", valor: "Equipment, Safety, Green" },
      { label: "D", valor: "Energy, Sourcing, Goals" },
      { label: "E", valor: "Earnings, Sales, Gains" },
    ],
    correta: "A",
    explicacao:
      "ESG = Ambiental, Social, Governança (Environmental, Social, Governance). Critérios não-financeiros de avaliação de empresas.",
  },
  {
    id: 603,
    pergunta: "What is the primary goal of 'Sustainability' in oil operations?",
    opcoes: [
      { label: "A", valor: "Balance profit with environmental and social responsibility" },
      { label: "B", valor: "Maximize profit regardless of impact" },
      { label: "C", valor: "Stop all operations" },
      { label: "D", valor: "Ignore environmental laws" },
      { label: "E", valor: "Focus only on shareholders" },
    ],
    correta: "A",
    explicacao:
      "Sustainability = Sustentabilidade. Operar de forma que possa continuar a longo prazo sem danificar ambientes/sociedade.",
  },
  {
    id: 604,
    pergunta: "What is 'GHG' in environmental reporting?",
    opcoes: [
      { label: "A", valor: "Greenhouse Gas emissions" },
      { label: "B", valor: "Gas Handling Guidelines" },
      { label: "C", valor: "Global Heating Grade" },
      { label: "D", valor: "Gasoline Hydrocarbon Group" },
      { label: "E", valor: "Ground Horizontal Grid" },
    ],
    correta: "A",
    explicacao:
      "GHG = Gases de Efeito Estufa (Greenhouse Gases). CO₂, metano, óxido nitroso, etc. que retêm calor na atmosfera.",
  },
  {
    id: 605,
    pergunta: "What does 'Net Zero' commitment mean for an oil company like Petrobras?",
    opcoes: [
      { label: "A", valor: "Reduce emissions to zero or offset remaining by 2050 (net=after offset)" },
      { label: "B", valor: "Stop all operations immediately" },
      { label: "C", valor: "Reduce emissions by 50% only" },
      { label: "D", valor: "Use only renewable energy" },
      { label: "E", valor: "No emissions from day one" },
    ],
    correta: "A",
    explicacao:
      "Net Zero = Zero líquido. Reduzir emissões ao máximo; compensar resto com carbon credits/sequestro. Meta global para 2050.",
  },
  {
    id: 606,
    pergunta: "What is 'Biofuel' and why is Petrobras interested?",
    opcoes: [
      { label: "A", valor: "Fuel from renewable biological sources; reduces carbon impact" },
      { label: "B", valor: "Synthetic petroleum product" },
      { label: "C", valor: "Marine fuel only" },
      { label: "D", valor: "Expired fuel" },
      { label: "E", valor: "Fuel test material" },
    ],
    correta: "A",
    explicacao:
      "Biofuel = Combustível de fontes renováveis (cana-de-açúcar, biodiesel). Petrobras investe em etanol e biodiesel para descarbonização.",
  },
  {
    id: 607,
    pergunta: "What is 'Flaring' and what environmental concern does it pose?",
    opcoes: [
      { label: "A", valor: "Burning excess gas; releases CO₂ and methane, wasteful" },
      { label: "B", valor: "Cooling system operation" },
      { label: "C", valor: "Equipment failure detection" },
      { label: "D", valor: "Pipeline maintenance" },
      { label: "E", valor: "Storage container venting" },
    ],
    correta: "A",
    explicacao:
      "Flaring = Queimação de gás. Prática de queimar gás excess. Libera CO₂ e CH₄. Redução de flaring é meta ESG importante.",
  },
  {
    id: 608,
    pergunta: "What is the purpose of 'Environmental Impact Assessment' (EIA)?",
    opcoes: [
      { label: "A", valor: "Evaluate project's potential environmental effects before implementation" },
      { label: "B", valor: "Clean up pollution after operations" },
      { label: "C", valor: "Measure employee satisfaction" },
      { label: "D", valor: "Calculate profit margins" },
      { label: "E", valor: "Train new workers" },
    ],
    correta: "A",
    explicacao:
      "EIA = Avaliação de Impacto Ambiental. Análise sistemática dos efeitos ambientais de um projeto ANTES de começar.",
  },
  {
    id: 609,
    pergunta: "What does 'Emissions Trading' (Carbon Credits) allow companies to do?",
    opcoes: [
      { label: "A", valor: "Offset emissions by buying credits from companies that reduced them" },
      { label: "B", valor: "Ignore environmental regulations" },
      { label: "C", valor: "Increase pollution levels freely" },
      { label: "D", valor: "Sell outdated equipment" },
      { label: "E", valor: "Skip safety inspections" },
    ],
    correta: "A",
    explicacao:
      "Carbon Credits = Créditos de carbono. Mecanismo de mercado para atingir metas ESG: quem reduz pode vender créditos.",
  },
  {
    id: 610,
    pergunta: "What is 'Spill Prevention' a critical HSE measure in oil operations?",
    opcoes: [
      { label: "A", valor: "Because oil spills damage ecosystems and contaminate water" },
      { label: "B", valor: "To save money on cleanup" },
      { label: "C", valor: "To increase production speed" },
      { label: "D", valor: "To reduce employee breaks" },
      { label: "E", valor: "To maximize profit margins" },
    ],
    correta: "A",
    explicacao:
      "Spill Prevention = Prevenção de vazamentos. Vazamentos danificam ecossistemas, matam vida selvagem, contaminam água. Prevenção é crítica.",
  },
];

// ═══ MÓDULO 7 — MANAGEMENT & PROJECTS ═══
export const QUIZ_M7_MANAGEMENT: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "What does 'KPI' stand for in project management?",
    opcoes: [
      { label: "A", valor: "Key Performance Indicator" },
      { label: "B", valor: "Knowledge Performance Index" },
      { label: "C", valor: "Key Process Increment" },
      { label: "D", valor: "Kinetic Power Indicator" },
      { label: "E", valor: "Kingdom Performance Integration" },
    ],
    correta: "A",
    explicacao:
      "KPI = Indicador-chave de desempenho. Métrica que mede progresso/sucesso de um projeto ou operação (produção, custo, prazo, segurança).",
  },
  {
    id: 702,
    pergunta: "What is a 'Milestone' in project planning?",
    opcoes: [
      { label: "A", valor: "Significant event or checkpoint in project timeline" },
      { label: "B", valor: "A distance marker on roads" },
      { label: "C", valor: "A salary increase" },
      { label: "D", valor: "A type of stone" },
      { label: "E", valor: "A promotional offer" },
    ],
    correta: "A",
    explicacao:
      "Milestone = Marco/Etapa. Evento importante no cronograma de projeto (início, aprovação, conclusão) marcando progresso.",
  },
  {
    id: 703,
    pergunta: "What is 'Scope' in project management?",
    opcoes: [
      { label: "A", valor: "All work and deliverables that must be completed" },
      { label: "B", valor: "Only the budget allocation" },
      { label: "C", valor: "The project manager's authority" },
      { label: "D", valor: "Viewing equipment for inspections" },
      { label: "E", valor: "The team's vacation time" },
    ],
    correta: "A",
    explicacao:
      "Scope = Escopo. Define EXATAMENTE quais trabalhos/entregas serão feitos no projeto. 'Scope Creep' = crescimento indesejado.",
  },
  {
    id: 704,
    pergunta:
      "What is a 'Deliverable' and why is it important for project control?",
    opcoes: [
      { label: "A", valor: "Tangible output (equipment/document) to be delivered to client" },
      { label: "B", valor: "A promotional item" },
      { label: "C", valor: "Only internal documentation" },
      { label: "D", valor: "Equipment that was broken" },
      { label: "E", valor: "Feedback from customers" },
    ],
    correta: "A",
    explicacao:
      "Deliverable = Entrega/Produto. Resultado tangível (equipamento, relatório, software) que deve ser entregue ao cliente conforme acordado.",
  },
  {
    id: 705,
    pergunta: "What does 'Critical Path Method (CPM)' help project teams understand?",
    opcoes: [
      { label: "A", valor: "Sequence of tasks that cannot be delayed without delaying entire project" },
      { label: "B", valor: "The physical route for equipment transport" },
      { label: "C", valor: "Employee travel routes" },
      { label: "D", valor: "Budget allocation method" },
      { label: "E", valor: "Communication channels only" },
    ],
    correta: "A",
    explicacao:
      "CPM = Caminho Crítico. Sequência de tarefas interdependentes. Qualquer atraso nela atrasa projeto todo. Essencial para planejamento.",
  },
  {
    id: 706,
    pergunta: "What is 'Risk Management' in project context?",
    opcoes: [
      { label: "A", valor: "Identify potential problems and create mitigation plans" },
      { label: "B", valor: "Accept all risks without planning" },
      { label: "C", valor: "Only manage financial risks" },
      { label: "D", valor: "Ignore minor problems" },
      { label: "E", valor: "Transfer all risk to contractors" },
    ],
    correta: "A",
    explicacao:
      "Risk Management = Gestão de riscos. Identificar riscos potenciais (atraso, custos extras, acidentes) e criar planos de mitigação.",
  },
  {
    id: 707,
    pergunta: "What does 'On Time, On Budget' mean for project success?",
    opcoes: [
      { label: "A", valor: "Complete project by deadline and within approved cost" },
      { label: "B", valor: "Start on time only" },
      { label: "C", valor: "Reduce costs only" },
      { label: "D", valor: "Extend timeline if needed" },
      { label: "E", valor: "Spend all budget regardless" },
    ],
    correta: "A",
    explicacao:
      "On Time + On Budget = Dois critérios principais de sucesso de projeto em Petrobras. Atrasos e custos extras afetam ROI.",
  },
  {
    id: 708,
    pergunta: "What is a 'Change Request' in project management?",
    opcoes: [
      { label: "A", valor: "Formal document proposing modifications to scope/schedule/budget" },
      { label: "B", valor: "Employee resignation letter" },
      { label: "C", valor: "Equipment maintenance request" },
      { label: "D", valor: "Informal email conversation" },
      { label: "E", valor: "Customer complaint form" },
    ],
    correta: "A",
    explicacao:
      "Change Request = Requisição de mudança. Documento formal para propor alterações ao projeto (escopo, prazo, orçamento) com análise de impacto.",
  },
  {
    id: 709,
    pergunta: "What does 'Stakeholder Communication' ensure in projects?",
    opcoes: [
      { label: "A", valor: "All interested parties stay informed and aligned on progress" },
      { label: "B", valor: "Keep information secret from some teams" },
      { label: "C", valor: "Only communicate problems" },
      { label: "D", valor: "Avoid regular updates" },
      { label: "E", valor: "Send emails only to executives" },
    ],
    correta: "A",
    explicacao:
      "Comunicação de Stakeholders = Manter todos os interessados informados regularmente sobre progresso, riscos, mudanças. Evita surpresas.",
  },
  {
    id: 710,
    pergunta: "What is a 'Contingency Plan' in project risk management?",
    opcoes: [
      { label: "A", valor: "Alternative approach if planned strategy fails" },
      { label: "B", valor: "Emergency equipment only" },
      { label: "C", valor: "Final project report" },
      { label: "D", valor: "Budget surplus allocation" },
      { label: "E", valor: "Team training program" },
    ],
    correta: "A",
    explicacao:
      "'Se X acontecer, faremos Y'. Plano B preparado antecipadamente para riscos identificados que poderiam impactar projeto.",
  },
];

// ═══ MÓDULO 8 — CONTRATOS E LICITAÇÕES ═══
export const QUIZ_M8_PROCUREMENT: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "What is a 'Tender' in procurement?",
    opcoes: [
      { label: "A", valor: "Public invitation for suppliers to bid for contract" },
      { label: "B", valor: "A type of currency" },
      { label: "C", valor: "Soft material for insulation" },
      { label: "D", valor: "A caring emotion" },
      { label: "E", valor: "Motorcycle accessories" },
    ],
    correta: "A",
    explicacao:
      "Tender = Licitação/Edital. Convite formal que Petrobras faz publicamente para empresas apresentarem propostas (bids).",
  },
  {
    id: 802,
    pergunta: "What is a 'Bid' in the context of procurement?",
    opcoes: [
      { label: "A", valor: "Formal proposal with price and terms submitted to win a contract" },
      { label: "B", valor: "Casual offer" },
      { label: "C", valor: "A greeting gesture" },
      { label: "D", valor: "Auction increase" },
      { label: "E", valor: "Command to do something" },
    ],
    correta: "A",
    explicacao:
      "Bid = Proposta. Documento que empresa envia respondendo a um tender, com preço, prazos, capacidades técnicas.",
  },
  {
    id: 803,
    pergunta: "What does 'RFQ' stand for in procurement?",
    opcoes: [
      { label: "A", valor: "Request for Quotation" },
      { label: "B", valor: "Rapid Frequency Query" },
      { label: "C", valor: "Required Financial Qualification" },
      { label: "D", valor: "Resource Framework Question" },
      { label: "E", valor: "Regulatory Feasibility Quality" },
    ],
    correta: "A",
    explicacao:
      "RFQ = Solicitação de cotação. Petrobras pede orçamentos de fornecedores para itens/serviços específicos.",
  },
  {
    id: 804,
    pergunta: "What is 'Procurement' as a business function?",
    opcoes: [
      { label: "A", valor: "Process of acquiring goods and services from external suppliers" },
      { label: "B", valor: "Internal production only" },
      { label: "C", valor: "Sales to customers" },
      { label: "D", valor: "Employee hiring" },
      { label: "E", valor: "Manufacturing operations" },
    ],
    correta: "A",
    explicacao:
      "Procurement = Aquisição/Compras. Função responsável por procurar, selecionar e contratar fornecedores de bens/serviços.",
  },
  {
    id: 805,
    pergunta: "What is a 'Contract' in legal business terms?",
    opcoes: [
      { label: "A", valor: "Legally binding agreement outlining obligations of both parties" },
      { label: "B", valor: "Informal handshake deal" },
      { label: "C", valor: "Verbal promise only" },
      { label: "D", valor: "Internal company memo" },
      { label: "E", valor: "Marketing brochure" },
    ],
    correta: "A",
    explicacao:
      "Contract = Contrato. Documento legal que define direitos, deveres, prazos, penalidades para ambas as partes. Obrigatório para Petrobras.",
  },
  {
    id: 806,
    pergunta: "What is a 'Clause' in a contract?",
    opcoes: [
      { label: "A", valor: "Specific condition or provision within the contract" },
      { label: "B", valor: "A type of machine" },
      { label: "C", valor: "Contract ending date only" },
      { label: "D", valor: "Signature line" },
      { label: "E", valor: "Price negotiation tactic" },
    ],
    correta: "A",
    explicacao:
      "Clause = Cláusula. Parágrafo ou seção do contrato que estipula uma condição/obrigação (ex: 'Liability Clause', 'Force Majeure Clause').",
  },
  {
    id: 807,
    pergunta: "What does 'Liability' mean in contract terms?",
    opcoes: [
      { label: "A", valor: "Legal responsibility for damages or losses caused" },
      { label: "B", valor: "Financial assets only" },
      { label: "C", valor: "Equipment inventory" },
      { label: "D", valor: "Accounting balance sheet" },
      { label: "E", valor: "Insurance premium" },
    ],
    correta: "A",
    explicacao:
      "Liability = Responsabilidade. Obrigação legal de pagar indenização se causar dano. Contrato define limites e condições.",
  },
  {
    id: 808,
    pergunta: "What is a 'Penalty Clause' in a contract?",
    opcoes: [
      { label: "A", valor: "Financial consequence for non-compliance or late delivery" },
      { label: "B", valor: "Encouragement bonus" },
      { label: "C", valor: "Tax benefit" },
      { label: "D", valor: "Quality improvement clause" },
      { label: "E", valor: "Discount provision" },
    ],
    correta: "A",
    explicacao:
      "Penalty Clause = Cláusula de penalidade. Define multa/desconto se contratado não cumprir prazos ou condições (ex: R$ 1000/dia de atraso).",
  },
  {
    id: 809,
    pergunta:
      "What is 'Force Majeure' and why is it important in oil contracts?",
    opcoes: [
      { label: "A", valor: "Clause excusing performance due to unforeseeable circumstances (natural disasters, war)" },
      { label: "B", valor: "Strong negotiating position" },
      { label: "C", valor: "Fraud or deliberate breach" },
      { label: "D", valor: "Worker strike only" },
      { label: "E", valor: "Equipment failure" },
    ],
    correta: "A",
    explicacao:
      "Force Majeure = Caso fortuito/força maior. Exime partes de responsabilidade por eventos impossíveis de prever/evitar (tempestade, terremoto, guerra).",
  },
  {
    id: 810,
    pergunta: "What is 'Scope of Work (SOW)' in a contract?",
    opcoes: [
      { label: "A", valor: "Detailed description of all tasks/deliverables to be performed" },
      { label: "B", valor: "Contract length only" },
      { label: "C", valor: "Payment terms only" },
      { label: "D", valor: "Employee list" },
      { label: "E", valor: "Equipment specifications" },
    ],
    correta: "A",
    explicacao:
      "SOW = Escopo do Trabalho. Define exatamente o quê, como, onde, quando e quanto será entregue. Evita mal-entendidos.",
  },
];

// ═══ MÓDULO 9 — VOCABULARY IN PETROBRAS CONTEXT ═══
export const QUIZ_M9_PETROBRASESPECIFICO: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "In Petrobras job postings, 'Prebound' usually refers to:",
    opcoes: [
      { label: "A", valor: "Candidates with prior company commitment/experience" },
      { label: "B", valor: "Students in training programs" },
      { label: "C", valor: "New graduates only" },
      { label: "D", valor: "Temporary workers" },
      { label: "E", valor: "Foreign nationals" },
    ],
    correta: "A",
    explicacao:
      "Prebound = Pré-vinculado. Candidatos que já têm algum vínculo/experiência prévia com Petrobras ou que estão em programa específico.",
  },
  {
    id: 902,
    pergunta:
      "What is the most important phrase to know for Petrobras operators: 'Safety _______'?",
    opcoes: [
      { label: "A", valor: "First" },
      { label: "B", valor: "Always" },
      { label: "C", valor: "Now" },
      { label: "D", valor: "Only" },
      { label: "E", valor: "Last" },
    ],
    correta: "A",
    explicacao:
      "'Safety First' = Segurança em primeiro lugar. Mantra cultural de Petrobras. Segurança vem antes de produção, custos ou prazos.",
  },
  {
    id: 903,
    pergunta:
      "In Petrobras HSE, 'Zero Accident' is a/an _______ shared by all employees.",
    opcoes: [
      { label: "A", valor: "Goal / Vision" },
      { label: "B", valor: "Impossible dream" },
      { label: "C", valor: "Optional initiative" },
      { label: "D", valor: "External requirement" },
      { label: "E", valor: "Consultants' idea" },
    ],
    correta: "A",
    explicacao:
      "'Zero Accident' = Meta de zero acidentes. Objetivo aspiracional de toda Petrobras. Cada funcionário é responsável por sua segurança.",
  },
  {
    id: 904,
    pergunta:
      "The term 'Behavioral Safety' in Petrobras means observing and reporting:",
    opcoes: [
      { label: "A", valor: "Unsafe behaviors and practices, not just accidents" },
      { label: "B", valor: "Only serious injuries" },
      { label: "C", valor: "Employee tardiness" },
      { label: "D", valor: "Salary disputes" },
      { label: "E", valor: "Management decisions" },
    ],
    correta: "A",
    explicacao:
      "Behavioral Safety = Segurança comportamental. Programa que treina observação e reporte de atos inseguros ANTES de causarem acidentes.",
  },
  {
    id: 905,
    pergunta:
      "What does 'CESGRANRIO' refer to in the context of Petrobras job selections?",
    opcoes: [
      { label: "A", valor: "Organization that creates and administers Petrobras selection exams" },
      { label: "B", valor: "Petrobras headquarters" },
      { label: "C", valor: "Union organization" },
      { label: "D", valor: "Safety compliance committee" },
      { label: "E", valor: "Industry magazine" },
    ],
    correta: "A",
    explicacao:
      "CESGRANRIO = Instituição responsável por aplicar concursos Petrobras. Exames de múltipla escolha em português e inglês.",
  },
  {
    id: 906,
    pergunta:
      "The Petrobras slogan 'Energia para o Brasil' translates to 'Energy for _______ '.",
    opcoes: [
      { label: "A", valor: "Brazil" },
      { label: "B", valor: "Profit" },
      { label: "C", valor: "Growth" },
      { label: "D", valor: "Everyone" },
      { label: "E", valor: "Tomorrow" },
    ],
    correta: "A",
    explicacao:
      "Slogan corporativo. Reflete compromisso de Petrobras de fornecer energia para o desenvolvimento do Brasil.",
  },
  {
    id: 907,
    pergunta:
      "In Petrobras organizational structure, 'Corporate' typically means:",
    opcoes: [
      { label: "A", valor: "Central headquarters and strategic functions" },
      { label: "B", valor: "Retail gas stations only" },
      { label: "C", valor: "Marketing department alone" },
      { label: "D", valor: "International operations only" },
      { label: "E", valor: "External consultants" },
    ],
    correta: "A",
    explicacao:
      "Corporate = Corpo corporativo/Matriz. Funções centralizadas em Rio de Janeiro e Brasília (estratégia, RH, finanças, etc).",
  },
  {
    id: 908,
    pergunta:
      "What is a 'Synergy' often mentioned in Petrobras strategic initiatives?",
    opcoes: [
      { label: "A", valor: "Combination of efforts producing greater effect than sum of parts" },
      { label: "B", valor: "Employee conflict" },
      { label: "C", valor: "Budget reduction" },
      { label: "D", valor: "Market competition" },
      { label: "E", valor: "Equipment failure" },
    ],
    correta: "A",
    explicacao:
      "Synergy = Sinergia. Quando departamentos/projetos se integram e produzem resultado melhor que separados. Meta de Petrobras.",
  },
  {
    id: 909,
    pergunta:
      "In Petrobras context, 'Competence' relates to having the _______ for a job.",
    opcoes: [
      { label: "A", valor: "Skills, knowledge, and experience required" },
      { label: "B", valor: "Age and nationality" },
      { label: "C", valor: "Salary expectations" },
      { label: "D", valor: "Personal connections" },
      { label: "E", valor: "University degree only" },
    ],
    correta: "A",
    explicacao:
      "Competence = Competência. Habilidades, conhecimentos, experiências necessários para realizar funções com excelência em Petrobras.",
  },
  {
    id: 910,
    pergunta:
      "What does 'Continuous Improvement' (Kaizen-inspired) mean for Petrobras operations?",
    opcoes: [
      { label: "A", valor: "Ongoing process of small incremental enhancements" },
      { label: "B", valor: "Major overhaul once per year" },
      { label: "C", valor: "Keeping processes unchanged" },
      { label: "D", valor: "External consultant recommendations only" },
      { label: "E", valor: "No change needed" },
    ],
    correta: "A",
    explicacao:
      "Continuous Improvement = Melhoria contínua. Cultura de procurar pequenas melhorias permanentes em segurança, eficiência, qualidade.",
  },
];

// ═══ MÓDULO 10 — SIMULADO MESTRE ═══
export const QUIZ_M10_MESTRE: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "What is the PRIMARY goal of any oil company's upstream operations?",
    opcoes: [
      { label: "A", valor: "Explore, develop, and produce oil and natural gas" },
      { label: "B", valor: "Refine and sell products to consumers" },
      { label: "C", valor: "Train employees in safety" },
      { label: "D", valor: "Manage environmental compliance only" },
      { label: "E", valor: "Handle accounting and finance" },
    ],
    correta: "A",
    explicacao:
      "Primary goal upstream = Exploração e produção. Encontrar reservas, desenvolver campos, extrair óleo/gás de forma segura.",
  },
  {
    id: 1002,
    pergunta: "Which represents the complete downstream value chain?",
    opcoes: [
      { label: "A", valor: "Refining → Distribution → Retail → Consumer" },
      { label: "B", valor: "Exploration → Production → Sales" },
      { label: "C", valor: "Equipment → Labor → Profit" },
      { label: "D", valor: "Market → Trading → Stockpiling" },
      { label: "E", valor: "Government → Taxes → Distr" },
    ],
    correta: "A",
    explicacao:
      "Downstream: Refine crude em produtos, distribua via pipelines/tanques, venda em postos, entregue ao consumidor.",
  },
  {
    id: 1003,
    pergunta:
      "In a critical moment, an operator finds a potential safety hazard. The CORRECT action is:",
    opcoes: [
      { label: "A", valor: "Stop work immediately and report to supervisor" },
      { label: "B", valor: "Continue work and report later" },
      { label: "C", valor: "Mention to coworker informally" },
      { label: "D", valor: "Ignore if no immediate injury" },
      { label: "E", valor: "Document privately and wait" },
    ],
    correta: "A",
    explicacao:
      "SAFETY FIRST. Parar operação + Reportar imediatamente. Petrobras zero-blame culture incentiva relatórios imediatos de hazards.",
  },
  {
    id: 1004,
    pergunta:
      "A project is 2 weeks behind schedule. What is the FIRST step in mitigation?",
    opcoes: [
      { label: "A", valor: "Analyze root cause and adjust critical path" },
      { label: "B", valor: "Immediately fire responsible team members" },
      { label: "C", valor: "Blame external suppliers without investigation" },
      { label: "D", valor: "Extend budget to add resources" },
      { label: "E", valor: "Ignore and hope to catch up" },
    ],
    correta: "A",
    explicacao:
      "Root cause analysis. Se está atrasado, identifique POR QUÊ. Tarefa na critical path? Risco? Redesenhe plano.",
  },
  {
    id: 1005,
    pergunta:
      "Which statement about HSE in Petrobras is MOST accurate according to corporate culture?",
    opcoes: [
      { label: "A", valor: "HSE comes before cost, schedule, and production targets" },
      { label: "B", valor: "HSE is important if budget allows" },
      { label: "C", valor: "HSE is only relevant for field operations" },
      { label: "D", valor: "HSE rules can be flexed for efficiency" },
      { label: "E", valor: "HSE is primarily an HR function" },
    ],
    correta: "A",
    explicacao:
      "Cultura Petrobras: Segurança NÃO é negociável. Se HSE entra em conflito com prazo/custo, SEGURANÇA vence.",
  },
  {
    id: 1006,
    pergunta: "What is the BEST definition of 'Scope Creep' and its danger?",
    opcoes: [
      { label: "A", valor: "Unplanned additions to project scope causing delays and budget overrun" },
      { label: "B", valor: "Slight improvement in project quality" },
      { label: "C", valor: "Controlled expansion of project goals" },
      { label: "D", valor: "Addition of safety measures" },
      { label: "E", valor: "Regular team growth" },
    ],
    correta: "A",
    explicacao:
      "Scope Creep = Inimigo do projeto. Adições não-planejadas quebram cronograma/orçamento. Gerenciamento rigoroso de mudanças é essential.",
  },
  {
    id: 1007,
    pergunta:
      "In oil contracts, the 'Liability Clause' protects which party PRIMARILY?",
    opcoes: [
      { label: "A", valor: "Client (Petrobras) from contractor negligence/damages" },
      { label: "B", valor: "Only the contractor from penalties" },
      { label: "C", valor: "Eliminating responsibility for both parties" },
      { label: "D", valor: "Suppliers exclusively" },
      { label: "E", valor: "Government agencies only" },
    ],
    correta: "A",
    explicacao:
      "Liability Clause = Proteção do cliente. Define responsabilidade do contratado (indenizações) se causar danos/prejuízos.",
  },
  {
    id: 1008,
    pergunta:
      "A refinery processes 100,000 bpd. If crude costs $60/barrel, daily crude expenditure is approximately:",
    opcoes: [
      { label: "A", valor: "$6,000,000" },
      { label: "B", valor: "$600,000" },
      { label: "C", valor: "$60,000,000" },
      { label: "D", valor: "$6,000" },
      { label: "E", valor: "$600" },
    ],
    correta: "C",
    explicacao:
      "100,000 bbl × $60 = $6,000,000. Compreensão de escalas financeiras é importante para cargo técnico Petrobras.",
  },
  {
    id: 1009,
    pergunta:
      "Which is NOT a typical element of a comprehensive 'Bid Document' for supplier selection?",
    opcoes: [
      { label: "A", valor: "Employee personal vacation preferences" },
      { label: "B", valor: "Technical specifications and capacity" },
      { label: "C", valor: "Pricing and commercial terms" },
      { label: "D", valor: "Timeline and deliverables" },
      { label: "E", valor: "Financial qualification" },
    ],
    correta: "A",
    explicacao:
      "Bid irrelevante = Preferências pessoais de férias. Bid deve conter: especificações técnicas, preço, prazo, capacidade, referências.",
  },
  {
    id: 1010,
    pergunta:
      "In the context of environmental targets, what does Petrobras' 'Net Zero' commitment by 2050 primarily mean?",
    opcoes: [
      { label: "A", valor: "Achieve zero operational emissions through reduction and offsetting (carbon credits)" },
      { label: "B", valor: "Stop all oil production immediately" },
      { label: "C", valor: "Reduce emissions by 25% only" },
      { label: "D", valor: "Focus only on renewable energy" },
      { label: "E", valor: "Ignore fossil fuel operations" },
    ],
    correta: "A",
    explicacao:
      "Net Zero = Emissões líquidas zero. Reduzir máximo possível + compensar resto com créditos carbono. Meta global ambiciosa 2050.",
  },
  {
    id: 1011,
    pergunta: "The acronym 'WTI' in oil pricing refers to which geographic market?",
    opcoes: [
      { label: "A", valor: "West Texas Intermediate (US benchmark)" },
      { label: "B", valor: "World Trade Index" },
      { label: "C", valor: "Western Technology Initiative" },
      { label: "D", valor: "Worldwide Trading Integration" },
      { label: "E", valor: "West Transport Initiative" },
    ],
    correta: "A",
    explicacao:
      "WTI = Benchmark de preço nos EUA. Junto com Brent (Europa), são principais referências globais de cotação de petróleo.",
  },
  {
    id: 1012,
    pergunta:
      "What is the most critical difference between 'Onshore' and 'Offshore' operations in terms of cost and complexity?",
    opcoes: [
      { label: "A", valor: "Offshore is significantly more expensive due to marine infrastructure and logistics" },
      { label: "B", valor: "Both have identical costs and complexity" },
      { label: "C", valor: "Onshore is more expensive" },
      { label: "D", valor: "Cost depends only on barrel volume" },
      { label: "E", valor: "Complexity is irrelevant to cost" },
    ],
    correta: "A",
    explicacao:
      "Offshore MUITO mais caro: plataformas, navios-suporte, logística marítima, condições extremas. CAPEX e OPEX bem maiores que onshore.",
  },
];
