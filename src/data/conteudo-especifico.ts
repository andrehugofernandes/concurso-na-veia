import { MateriaConteudo } from './conteudo';

export const CONTEUDO_ESPECIFICO: MateriaConteudo[] = [
  {
    id: 'bloco-1-enfermagem-trabalho',
    nome: 'Bloco I - Urgências',
    descricao: 'Conteúdo específico para Técnico de Enfermagem do Trabalho',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Prata',
    profissoes: ['enfermagem-trabalho'],
    topicos: [
      { id: 'aph-em-urgancias', titulo: 'APH em urgências', descricao: 'Estudo focado em APH em urgências', duracao: '45 min', ordem: 1 },
      { id: 'epidemiologia', titulo: 'Epidemiologia', descricao: 'Estudo focado em Epidemiologia', duracao: '45 min', ordem: 2 },
      { id: 'doenaas-ocupacionais', titulo: 'Doenças ocupacionais', descricao: 'Estudo focado em Doenças ocupacionais', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-2-enfermagem-trabalho',
    nome: 'Bloco II - Segurança',
    descricao: 'Conteúdo específico para Técnico de Enfermagem do Trabalho',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Prata',
    profissoes: ['enfermagem-trabalho'],
    topicos: [
      { id: 'pnsst', titulo: 'PNSST', descricao: 'Estudo focado em PNSST', duracao: '45 min', ordem: 1 },
      { id: 'normas-regulamentadoras-nrs', titulo: 'Normas Regulamentadoras (NRs)', descricao: 'Estudo focado em Normas Regulamentadoras (NRs)', duracao: '45 min', ordem: 2 },
      { id: 'pcmso', titulo: 'PCMSO', descricao: 'Estudo focado em PCMSO', duracao: '45 min', ordem: 3 },
      { id: 'riscos-ambientais', titulo: 'Riscos ambientais', descricao: 'Estudo focado em Riscos ambientais', duracao: '45 min', ordem: 4 },
      { id: 'toxicologia', titulo: 'Toxicologia', descricao: 'Estudo focado em Toxicologia', duracao: '45 min', ordem: 5 }
    ]
  },
  {
    id: 'bloco-3-enfermagem-trabalho',
    nome: 'Bloco III - Enfermagem',
    descricao: 'Conteúdo específico para Técnico de Enfermagem do Trabalho',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Prata',
    profissoes: ['enfermagem-trabalho'],
    topicos: [
      { id: 'anatomia', titulo: 'Anatomia', descricao: 'Estudo focado em Anatomia', duracao: '45 min', ordem: 1 },
      { id: 'enfermagem-clanica', titulo: 'Enfermagem clínica', descricao: 'Estudo focado em Enfermagem clínica', duracao: '45 min', ordem: 2 },
      { id: 'biosseguranaa', titulo: 'Biossegurança', descricao: 'Estudo focado em Biossegurança', duracao: '45 min', ordem: 3 },
      { id: 'atica-profissional', titulo: 'Ã‰tica profissional', descricao: 'Estudo focado em Ã‰tica profissional', duracao: '45 min', ordem: 4 },
      { id: 'lei-8080-sus', titulo: 'Lei 8.080 (SUS)', descricao: 'Estudo focado em Lei 8.080 (SUS)', duracao: '45 min', ordem: 5 }
    ]
  },
  {
    id: 'bloco-1-seguranca-trabalho',
    nome: 'Bloco I - Gestão de Riscos',
    descricao: 'Conteúdo específico para Técnico de Segurança do Trabalho',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Prata',
    profissoes: ['seguranca-trabalho'],
    topicos: [
      { id: 'gestao-de-riscos', titulo: 'Gestão de riscos', descricao: 'Estudo focado em Gestão de riscos', duracao: '45 min', ordem: 1 },
      { id: 'higiene-ocupacional', titulo: 'Higiene ocupacional', descricao: 'Estudo focado em Higiene ocupacional', duracao: '45 min', ordem: 2 },
      { id: 'prevenaao-de-incandio', titulo: 'Prevenção de incêndio', descricao: 'Estudo focado em Prevenção de incêndio', duracao: '45 min', ordem: 3 },
      { id: 'legislaaao-nrs', titulo: 'Legislação (NRs)', descricao: 'Estudo focado em Legislação (NRs)', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-seguranca-trabalho',
    nome: 'Bloco II - Análise',
    descricao: 'Conteúdo específico para Técnico de Segurança do Trabalho',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Prata',
    profissoes: ['seguranca-trabalho'],
    topicos: [
      { id: 'acidentes-de-trabalho', titulo: 'Acidentes de trabalho', descricao: 'Estudo focado em Acidentes de trabalho', duracao: '45 min', ordem: 1 },
      { id: 'aprhazop', titulo: 'APR/HAZOP', descricao: 'Estudo focado em APR/HAZOP', duracao: '45 min', ordem: 2 },
      { id: 'iso-45001', titulo: 'ISO 45001', descricao: 'Estudo focado em ISO 45001', duracao: '45 min', ordem: 3 },
      { id: 'gestao-de-sesmtcipa', titulo: 'Gestão de SESMT/CIPA', descricao: 'Estudo focado em Gestão de SESMT/CIPA', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-seguranca-trabalho',
    nome: 'Bloco III - Ergonomia',
    descricao: 'Conteúdo específico para Técnico de Segurança do Trabalho',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Prata',
    profissoes: ['seguranca-trabalho'],
    topicos: [
      { id: 'ergonomia', titulo: 'Ergonomia', descricao: 'Estudo focado em Ergonomia', duracao: '45 min', ordem: 1 },
      { id: 'suporte-a-vida', titulo: 'Suporte à vida', descricao: 'Estudo focado em Suporte à vida', duracao: '45 min', ordem: 2 },
      { id: 'plano-nacional-de-contingancia', titulo: 'Plano Nacional de Contingência', descricao: 'Estudo focado em Plano Nacional de Contingência', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-1-manutencao-caldeiraria',
    nome: 'Bloco I - Mecânica',
    descricao: 'Conteúdo específico para Técnico de Manutenção - Caldeiraria',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Prata',
    profissoes: ['manutencao-caldeiraria'],
    topicos: [
      { id: 'tecnologia-mecanica', titulo: 'Tecnologia Mecânica', descricao: 'Estudo focado em Tecnologia Mecânica', duracao: '45 min', ordem: 1 },
      { id: 'ensaios-mecanicos', titulo: 'Ensaios mecânicos', descricao: 'Estudo focado em Ensaios mecânicos', duracao: '45 min', ordem: 2 },
      { id: 'resistancia-dos-materiais', titulo: 'Resistência dos materiais', descricao: 'Estudo focado em Resistência dos materiais', duracao: '45 min', ordem: 3 },
      { id: 'soldagem', titulo: 'Soldagem', descricao: 'Estudo focado em Soldagem', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-manutencao-caldeiraria',
    nome: 'Bloco II - Metalurgia',
    descricao: 'Conteúdo específico para Técnico de Manutenção - Caldeiraria',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Prata',
    profissoes: ['manutencao-caldeiraria'],
    topicos: [
      { id: 'metalurgia', titulo: 'Metalurgia', descricao: 'Estudo focado em Metalurgia', duracao: '45 min', ordem: 1 },
      { id: 'metalografia', titulo: 'Metalografia', descricao: 'Estudo focado em Metalografia', duracao: '45 min', ordem: 2 },
      { id: 'tratamentos-tarmicos', titulo: 'Tratamentos térmicos', descricao: 'Estudo focado em Tratamentos térmicos', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-3-manutencao-caldeiraria',
    nome: 'Bloco III - Desenho',
    descricao: 'Conteúdo específico para Técnico de Manutenção - Caldeiraria',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Prata',
    profissoes: ['manutencao-caldeiraria'],
    topicos: [
      { id: 'desenho-tacnico', titulo: 'Desenho técnico', descricao: 'Estudo focado em Desenho técnico', duracao: '45 min', ordem: 1 },
      { id: 'ajustagem', titulo: 'Ajustagem', descricao: 'Estudo focado em Ajustagem', duracao: '45 min', ordem: 2 },
      { id: 'controle-de-qualidade', titulo: 'Controle de qualidade', descricao: 'Estudo focado em Controle de qualidade', duracao: '45 min', ordem: 3 },
      { id: 'normas-tacnicas', titulo: 'Normas técnicas', descricao: 'Estudo focado em Normas técnicas', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-manutencao-eletrica',
    nome: 'Bloco I - Circuitos',
    descricao: 'Conteúdo específico para Técnico de Manutenção - Elétrica',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Prata',
    profissoes: ['manutencao-eletrica'],
    topicos: [
      { id: 'diagramas-elatricos', titulo: 'Diagramas elétricos', descricao: 'Estudo focado em Diagramas elétricos', duracao: '45 min', ordem: 1 },
      { id: 'circuitos-ccca', titulo: 'Circuitos CC/CA', descricao: 'Estudo focado em Circuitos CC/CA', duracao: '45 min', ordem: 2 },
      { id: 'maquinas-elatricas', titulo: 'Máquinas elétricas', descricao: 'Estudo focado em Máquinas elétricas', duracao: '45 min', ordem: 3 },
      { id: 'nr-10', titulo: 'NR-10', descricao: 'Estudo focado em NR-10', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-manutencao-eletrica',
    nome: 'Bloco II - Instalações',
    descricao: 'Conteúdo específico para Técnico de Manutenção - Elétrica',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Prata',
    profissoes: ['manutencao-eletrica'],
    topicos: [
      { id: 'medidas-elatricas', titulo: 'Medidas elétricas', descricao: 'Estudo focado em Medidas elétricas', duracao: '45 min', ordem: 1 },
      { id: 'retificadores', titulo: 'Retificadores', descricao: 'Estudo focado em Retificadores', duracao: '45 min', ordem: 2 },
      { id: 'instalaaaes-btmt', titulo: 'Instalações BT/MT', descricao: 'Estudo focado em Instalações BT/MT', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-3-manutencao-eletrica',
    nome: 'Bloco III - Proteção',
    descricao: 'Conteúdo específico para Técnico de Manutenção - Elétrica',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Prata',
    profissoes: ['manutencao-eletrica'],
    topicos: [
      { id: 'aterramento', titulo: 'Aterramento', descricao: 'Estudo focado em Aterramento', duracao: '45 min', ordem: 1 },
      { id: 'spda', titulo: 'SPDA', descricao: 'Estudo focado em SPDA', duracao: '45 min', ordem: 2 },
      { id: 'nbr-5410', titulo: 'NBR-5410', descricao: 'Estudo focado em NBR-5410', duracao: '45 min', ordem: 3 },
      { id: 'eletranica-basica', titulo: 'Eletrônica básica', descricao: 'Estudo focado em Eletrônica básica', duracao: '45 min', ordem: 4 },
      { id: 'automaaao', titulo: 'Automação', descricao: 'Estudo focado em Automação', duracao: '45 min', ordem: 5 }
    ]
  },
  {
    id: 'bloco-1-manutencao-mecanica',
    nome: 'Bloco I - Metrologia',
    descricao: 'Conteúdo específico para Técnico de Manutenção - Mecânica',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Prata',
    profissoes: ['manutencao-mecanica'],
    topicos: [
      { id: 'metrologia', titulo: 'Metrologia', descricao: 'Estudo focado em Metrologia', duracao: '45 min', ordem: 1 },
      { id: 'desenho-tacnico', titulo: 'Desenho técnico', descricao: 'Estudo focado em Desenho técnico', duracao: '45 min', ordem: 2 },
      { id: 'resistancia-dos-materiais', titulo: 'Resistência dos materiais', descricao: 'Estudo focado em Resistência dos materiais', duracao: '45 min', ordem: 3 },
      { id: 'elementos-de-maquinas', titulo: 'Elementos de máquinas', descricao: 'Estudo focado em Elementos de máquinas', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-manutencao-mecanica',
    nome: 'Bloco II - Equipamentos',
    descricao: 'Conteúdo específico para Técnico de Manutenção - Mecânica',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Prata',
    profissoes: ['manutencao-mecanica'],
    topicos: [
      { id: 'hidraulica', titulo: 'Hidráulica', descricao: 'Estudo focado em Hidráulica', duracao: '45 min', ordem: 1 },
      { id: 'bombas', titulo: 'Bombas', descricao: 'Estudo focado em Bombas', duracao: '45 min', ordem: 2 },
      { id: 'compressores', titulo: 'Compressores', descricao: 'Estudo focado em Compressores', duracao: '45 min', ordem: 3 },
      { id: 'turbinas', titulo: 'Turbinas', descricao: 'Estudo focado em Turbinas', duracao: '45 min', ordem: 4 },
      { id: 'motores', titulo: 'Motores', descricao: 'Estudo focado em Motores', duracao: '45 min', ordem: 5 }
    ]
  },
  {
    id: 'bloco-3-manutencao-mecanica',
    nome: 'Bloco III - Manutenção',
    descricao: 'Conteúdo específico para Técnico de Manutenção - Mecânica',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Prata',
    profissoes: ['manutencao-mecanica'],
    topicos: [
      { id: 'lubrificaaao', titulo: 'Lubrificação', descricao: 'Estudo focado em Lubrificação', duracao: '45 min', ordem: 1 },
      { id: 'alinhamento', titulo: 'Alinhamento', descricao: 'Estudo focado em Alinhamento', duracao: '45 min', ordem: 2 },
      { id: 'manutenaao-preditiva', titulo: 'Manutenção preditiva', descricao: 'Estudo focado em Manutenção preditiva', duracao: '45 min', ordem: 3 },
      { id: 'gestao-de-manutenaao', titulo: 'Gestão de manutenção', descricao: 'Estudo focado em Gestão de manutenção', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-manutencao-instrumentacao',
    nome: 'Bloco I - Instrumentação',
    descricao: 'Conteúdo específico para Técnico de Manutenção - Instrumentação',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Prata',
    profissoes: ['manutencao-instrumentacao'],
    topicos: [
      { id: 'instrumentaaao-industrial', titulo: 'Instrumentação industrial', descricao: 'Estudo focado em Instrumentação industrial', duracao: '45 min', ordem: 1 },
      { id: 'mediaao-de-grandezas', titulo: 'Medição de grandezas', descricao: 'Estudo focado em Medição de grandezas', duracao: '45 min', ordem: 2 },
      { id: 'sensores-e-transmissores', titulo: 'Sensores e transmissores', descricao: 'Estudo focado em Sensores e transmissores', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-2-manutencao-instrumentacao',
    nome: 'Bloco II - Controle',
    descricao: 'Conteúdo específico para Técnico de Manutenção - Instrumentação',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Prata',
    profissoes: ['manutencao-instrumentacao'],
    topicos: [
      { id: 'sistemas-de-controle', titulo: 'Sistemas de controle', descricao: 'Estudo focado em Sistemas de controle', duracao: '45 min', ordem: 1 },
      { id: 'clps', titulo: 'CLPs', descricao: 'Estudo focado em CLPs', duracao: '45 min', ordem: 2 },
      { id: 'sdcds', titulo: 'SDCDs', descricao: 'Estudo focado em SDCDs', duracao: '45 min', ordem: 3 },
      { id: 'redes-industriais', titulo: 'Redes industriais', descricao: 'Estudo focado em Redes industriais', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-manutencao-instrumentacao',
    nome: 'Bloco III - Segurança',
    descricao: 'Conteúdo específico para Técnico de Manutenção - Instrumentação',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Prata',
    profissoes: ['manutencao-instrumentacao'],
    topicos: [
      { id: 'sistemas-instrumentados-de-seguranaa', titulo: 'Sistemas instrumentados de segurança', descricao: 'Estudo focado em Sistemas instrumentados de segurança', duracao: '45 min', ordem: 1 },
      { id: 'valvulas-de-controle', titulo: 'Válvulas de controle', descricao: 'Estudo focado em Válvulas de controle', duracao: '45 min', ordem: 2 },
      { id: 'analise-de-malhas', titulo: 'Análise de malhas', descricao: 'Estudo focado em Análise de malhas', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-1-operacao',
    nome: 'Bloco I - Fundamentos',
    descricao: 'Conteúdo específico para Técnico de Operação',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Prata',
    profissoes: ['operacao'],
    topicos: [
      { id: 'termodinamica', titulo: 'Termodinâmica', descricao: 'Estudo focado em Termodinâmica', duracao: '45 min', ordem: 1 },
      { id: 'mecanica-dos-fluidos', titulo: 'Mecânica dos fluidos', descricao: 'Estudo focado em Mecânica dos fluidos', duracao: '45 min', ordem: 2 },
      { id: 'operaaaes-unitarias', titulo: 'Operações unitárias', descricao: 'Estudo focado em Operações unitárias', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-2-operacao',
    nome: 'Bloco II - Processos',
    descricao: 'Conteúdo específico para Técnico de Operação',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Prata',
    profissoes: ['operacao'],
    topicos: [
      { id: 'processos-de-refino', titulo: 'Processos de refino', descricao: 'Estudo focado em Processos de refino', duracao: '45 min', ordem: 1 },
      { id: 'quamica-organica', titulo: 'Química orgânica', descricao: 'Estudo focado em Química orgânica', duracao: '45 min', ordem: 2 },
      { id: 'petroquamica', titulo: 'Petroquímica', descricao: 'Estudo focado em Petroquímica', duracao: '45 min', ordem: 3 },
      { id: 'processos-de-separaaao', titulo: 'Processos de separação', descricao: 'Estudo focado em Processos de separação', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-operacao',
    nome: 'Bloco III - Segurança',
    descricao: 'Conteúdo específico para Técnico de Operação',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Prata',
    profissoes: ['operacao'],
    topicos: [
      { id: 'seguranaa-de-processo', titulo: 'Segurança de processo', descricao: 'Estudo focado em Segurança de processo', duracao: '45 min', ordem: 1 },
      { id: 'controle-de-processos', titulo: 'Controle de processos', descricao: 'Estudo focado em Controle de processos', duracao: '45 min', ordem: 2 },
      { id: 'equipamentos-industriais', titulo: 'Equipamentos industriais', descricao: 'Estudo focado em Equipamentos industriais', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-1-operacao-lastro',
    nome: 'Bloco I - Estabilidade',
    descricao: 'Conteúdo específico para Técnico de Operação de Lastro',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Prata',
    profissoes: ['operacao-lastro'],
    topicos: [
      { id: 'estabilidade-de-embarcaaaes', titulo: 'Estabilidade de embarcações', descricao: 'Estudo focado em Estabilidade de embarcações', duracao: '45 min', ordem: 1 },
      { id: 'sistemas-de-lastro', titulo: 'Sistemas de lastro', descricao: 'Estudo focado em Sistemas de lastro', duracao: '45 min', ordem: 2 },
      { id: 'hidrostatica-naval', titulo: 'Hidrostática naval', descricao: 'Estudo focado em Hidrostática naval', duracao: '45 min', ordem: 3 },
      { id: 'flutuabilidade-e-trim', titulo: 'Flutuabilidade e trim', descricao: 'Estudo focado em Flutuabilidade e trim', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-operacao-lastro',
    nome: 'Bloco II - Manobra',
    descricao: 'Conteúdo específico para Técnico de Operação de Lastro',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Prata',
    profissoes: ['operacao-lastro'],
    topicos: [
      { id: 'manobra-de-navios', titulo: 'Manobra de navios', descricao: 'Estudo focado em Manobra de navios', duracao: '45 min', ordem: 1 },
      { id: 'equipamentos-de-convas', titulo: 'Equipamentos de convés', descricao: 'Estudo focado em Equipamentos de convés', duracao: '45 min', ordem: 2 },
      { id: 'navegaaao-basica', titulo: 'Navegação básica', descricao: 'Estudo focado em Navegação básica', duracao: '45 min', ordem: 3 },
      { id: 'cartas-nauticas-e-gps', titulo: 'Cartas náuticas e GPS', descricao: 'Estudo focado em Cartas náuticas e GPS', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-operacao-lastro',
    nome: 'Bloco III - Segurança Marítima',
    descricao: 'Conteúdo específico para Técnico de Operação de Lastro',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Prata',
    profissoes: ['operacao-lastro'],
    topicos: [
      { id: 'solas', titulo: 'SOLAS', descricao: 'Estudo focado em SOLAS', duracao: '45 min', ordem: 1 },
      { id: 'ism-code', titulo: 'ISM Code', descricao: 'Estudo focado em ISM Code', duracao: '45 min', ordem: 2 },
      { id: 'marpol', titulo: 'MARPOL', descricao: 'Estudo focado em MARPOL', duracao: '45 min', ordem: 3 },
      { id: 'sobrevivancia-no-mar', titulo: 'Sobrevivência no mar', descricao: 'Estudo focado em Sobrevivência no mar', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-inspecao-equipamentos',
    nome: 'Bloco I - Física e Química',
    descricao: 'Conteúdo específico para Técnico de Inspeção de Equipamentos e Instalações',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Prata',
    profissoes: ['inspecao-equipamentos'],
    topicos: [
      { id: 'eletroquamica', titulo: 'Eletroquímica', descricao: 'Estudo focado em Eletroquímica', duracao: '45 min', ordem: 1 },
      { id: 'desenho-tacnico', titulo: 'Desenho técnico', descricao: 'Estudo focado em Desenho técnico', duracao: '45 min', ordem: 2 },
      { id: 'metrologia', titulo: 'Metrologia', descricao: 'Estudo focado em Metrologia', duracao: '45 min', ordem: 3 },
      { id: 'sistema-internacional', titulo: 'Sistema Internacional', descricao: 'Estudo focado em Sistema Internacional', duracao: '45 min', ordem: 4 },
      { id: 'estatica-e-dinamica', titulo: 'Estática e Dinâmica', descricao: 'Estudo focado em Estática e Dinâmica', duracao: '45 min', ordem: 5 }
    ]
  },
  {
    id: 'bloco-2-inspecao-equipamentos',
    nome: 'Bloco II - Materiais',
    descricao: 'Conteúdo específico para Técnico de Inspeção de Equipamentos e Instalações',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Prata',
    profissoes: ['inspecao-equipamentos'],
    topicos: [
      { id: 'aao-carbono', titulo: 'Aço Carbono', descricao: 'Estudo focado em Aço Carbono', duracao: '45 min', ordem: 1 },
      { id: 'diagrama-de-equilabrio', titulo: 'Diagrama de equilíbrio', descricao: 'Estudo focado em Diagrama de equilíbrio', duracao: '45 min', ordem: 2 },
      { id: 'ensaios-nao-destrutivos', titulo: 'Ensaios não destrutivos', descricao: 'Estudo focado em Ensaios não destrutivos', duracao: '45 min', ordem: 3 },
      { id: 'hidrostatica', titulo: 'Hidrostática', descricao: 'Estudo focado em Hidrostática', duracao: '45 min', ordem: 4 },
      { id: 'eletricidade-basica', titulo: 'Eletricidade básica', descricao: 'Estudo focado em Eletricidade básica', duracao: '45 min', ordem: 5 }
    ]
  },
  {
    id: 'bloco-3-inspecao-equipamentos',
    nome: 'Bloco III - Processos',
    descricao: 'Conteúdo específico para Técnico de Inspeção de Equipamentos e Instalações',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Prata',
    profissoes: ['inspecao-equipamentos'],
    topicos: [
      { id: 'transferancia-de-calor', titulo: 'Transferência de calor', descricao: 'Estudo focado em Transferência de calor', duracao: '45 min', ordem: 1 },
      { id: 'soldagem', titulo: 'Soldagem', descricao: 'Estudo focado em Soldagem', duracao: '45 min', ordem: 2 },
      { id: 'processos-de-fabricaaao', titulo: 'Processos de fabricação', descricao: 'Estudo focado em Processos de fabricação', duracao: '45 min', ordem: 3 },
      { id: 'corrosao', titulo: 'Corrosão', descricao: 'Estudo focado em Corrosão', duracao: '45 min', ordem: 4 },
      { id: 'hidrocarbonetos', titulo: 'Hidrocarbonetos', descricao: 'Estudo focado em Hidrocarbonetos', duracao: '45 min', ordem: 5 }
    ]
  },
  {
    id: 'bloco-1-edificacoes',
    nome: 'Bloco I - Materiais',
    descricao: 'Conteúdo específico para Técnico em Edificações',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Prata',
    profissoes: ['edificacoes'],
    topicos: [
      { id: 'materiais-de-construaao', titulo: 'Materiais de construção', descricao: 'Estudo focado em Materiais de construção', duracao: '45 min', ordem: 1 },
      { id: 'topografia', titulo: 'Topografia', descricao: 'Estudo focado em Topografia', duracao: '45 min', ordem: 2 },
      { id: 'mecanica-dos-solos', titulo: 'Mecânica dos solos', descricao: 'Estudo focado em Mecânica dos solos', duracao: '45 min', ordem: 3 },
      { id: 'estruturas', titulo: 'Estruturas', descricao: 'Estudo focado em Estruturas', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-edificacoes',
    nome: 'Bloco II - Instalações',
    descricao: 'Conteúdo específico para Técnico em Edificações',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Prata',
    profissoes: ['edificacoes'],
    topicos: [
      { id: 'instalaaaes-prediais', titulo: 'Instalações prediais', descricao: 'Estudo focado em Instalações prediais', duracao: '45 min', ordem: 1 },
      { id: 'oraamento', titulo: 'Orçamento', descricao: 'Estudo focado em Orçamento', duracao: '45 min', ordem: 2 },
      { id: 'planejamento-ms-project', titulo: 'Planejamento (MS Project)', descricao: 'Estudo focado em Planejamento (MS Project)', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-3-edificacoes',
    nome: 'Bloco III - Projetos',
    descricao: 'Conteúdo específico para Técnico em Edificações',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Prata',
    profissoes: ['edificacoes'],
    topicos: [
      { id: 'autocad', titulo: 'AutoCAD', descricao: 'Estudo focado em AutoCAD', duracao: '45 min', ordem: 1 },
      { id: 'seguranaa-em-obras-nr-18', titulo: 'Segurança em obras (NR 18)', descricao: 'Estudo focado em Segurança em obras (NR 18)', duracao: '45 min', ordem: 2 }
    ]
  },
  {
    id: 'bloco-1-eletrica-projetos',
    nome: 'Bloco I - Projetos',
    descricao: 'Conteúdo específico para Técnico de Projetos, Construção e Montagem - Elétrica',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Prata',
    profissoes: ['eletrica-projetos'],
    topicos: [
      { id: 'projetos-de-instalaaaes', titulo: 'Projetos de instalações', descricao: 'Estudo focado em Projetos de instalações', duracao: '45 min', ordem: 1 },
      { id: 'luminotacnica', titulo: 'Luminotécnica', descricao: 'Estudo focado em Luminotécnica', duracao: '45 min', ordem: 2 },
      { id: 'subestaaaes', titulo: 'Subestações', descricao: 'Estudo focado em Subestações', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-2-eletrica-projetos',
    nome: 'Bloco II - Proteção',
    descricao: 'Conteúdo específico para Técnico de Projetos, Construção e Montagem - Elétrica',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Prata',
    profissoes: ['eletrica-projetos'],
    topicos: [
      { id: 'proteaao-elatrica', titulo: 'Proteção elétrica', descricao: 'Estudo focado em Proteção elétrica', duracao: '45 min', ordem: 1 },
      { id: 'comandos-elatricos', titulo: 'Comandos elétricos', descricao: 'Estudo focado em Comandos elétricos', duracao: '45 min', ordem: 2 },
      { id: 'automaaao-predial', titulo: 'Automação predial', descricao: 'Estudo focado em Automação predial', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-3-eletrica-projetos',
    nome: 'Bloco III - Fiscalização',
    descricao: 'Conteúdo específico para Técnico de Projetos, Construção e Montagem - Elétrica',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Prata',
    profissoes: ['eletrica-projetos'],
    topicos: [
      { id: 'fiscalizaaao-de-obras', titulo: 'Fiscalização de obras', descricao: 'Estudo focado em Fiscalização de obras', duracao: '45 min', ordem: 1 },
      { id: 'comissionamento', titulo: 'Comissionamento', descricao: 'Estudo focado em Comissionamento', duracao: '45 min', ordem: 2 },
      { id: 'normas-nbr', titulo: 'Normas NBR', descricao: 'Estudo focado em Normas NBR', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-1-mecanica-projetos',
    nome: 'Bloco I - Montagem',
    descricao: 'Conteúdo específico para Técnico de Projetos, Construção e Montagem - Mecânica',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Prata',
    profissoes: ['mecanica-projetos'],
    topicos: [
      { id: 'montagem-industrial', titulo: 'Montagem industrial', descricao: 'Estudo focado em Montagem industrial', duracao: '45 min', ordem: 1 },
      { id: 'tubulaaaes', titulo: 'Tubulações', descricao: 'Estudo focado em Tubulações', duracao: '45 min', ordem: 2 },
      { id: 'estruturas-metalicas', titulo: 'Estruturas metálicas', descricao: 'Estudo focado em Estruturas metálicas', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-2-mecanica-projetos',
    nome: 'Bloco II - Qualidade',
    descricao: 'Conteúdo específico para Técnico de Projetos, Construção e Montagem - Mecânica',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Prata',
    profissoes: ['mecanica-projetos'],
    topicos: [
      { id: 'soldagem', titulo: 'Soldagem', descricao: 'Estudo focado em Soldagem', duracao: '45 min', ordem: 1 },
      { id: 'inspeaao', titulo: 'Inspeção', descricao: 'Estudo focado em Inspeção', duracao: '45 min', ordem: 2 },
      { id: 'ensaios-nao-destrutivos', titulo: 'Ensaios não destrutivos', descricao: 'Estudo focado em Ensaios não destrutivos', duracao: '45 min', ordem: 3 },
      { id: 'pintura-industrial', titulo: 'Pintura industrial', descricao: 'Estudo focado em Pintura industrial', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-mecanica-projetos',
    nome: 'Bloco III - Planejamento',
    descricao: 'Conteúdo específico para Técnico de Projetos, Construção e Montagem - Mecânica',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Prata',
    profissoes: ['mecanica-projetos'],
    topicos: [
      { id: 'planejamento-de-obras', titulo: 'Planejamento de obras', descricao: 'Estudo focado em Planejamento de obras', duracao: '45 min', ordem: 1 },
      { id: 'rigging', titulo: 'Rigging', descricao: 'Estudo focado em Rigging', duracao: '45 min', ordem: 2 },
      { id: 'normas-asmeapi', titulo: 'Normas ASME/API', descricao: 'Estudo focado em Normas ASME/API', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-1-instrumentacao-projetos',
    nome: 'Bloco I - Detalhamento',
    descricao: 'Conteúdo específico para Técnico de Projetos, Construção e Montagem - Instrumentação',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Prata',
    profissoes: ['instrumentacao-projetos'],
    topicos: [
      { id: 'projetos-de-instrumentaaao', titulo: 'Projetos de instrumentação', descricao: 'Estudo focado em Projetos de instrumentação', duracao: '45 min', ordem: 1 },
      { id: 'pid', titulo: 'P&ID', descricao: 'Estudo focado em P&ID', duracao: '45 min', ordem: 2 },
      { id: 'listas-de-instrumentos', titulo: 'Listas de instrumentos', descricao: 'Estudo focado em Listas de instrumentos', duracao: '45 min', ordem: 3 },
      { id: 'simbologia-isa', titulo: 'Simbologia ISA', descricao: 'Estudo focado em Simbologia ISA', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-instrumentacao-projetos',
    nome: 'Bloco II - Montagem',
    descricao: 'Conteúdo específico para Técnico de Projetos, Construção e Montagem - Instrumentação',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Prata',
    profissoes: ['instrumentacao-projetos'],
    topicos: [
      { id: 'montagem-de-clpsdcd', titulo: 'Montagem de CLP/SDCD', descricao: 'Estudo focado em Montagem de CLP/SDCD', duracao: '45 min', ordem: 1 },
      { id: 'tubing-e-cabeamento', titulo: 'Tubing e cabeamento', descricao: 'Estudo focado em Tubing e cabeamento', duracao: '45 min', ordem: 2 },
      { id: 'calibraaao-em-campo', titulo: 'Calibração em campo', descricao: 'Estudo focado em Calibração em campo', duracao: '45 min', ordem: 3 },
      { id: 'instalaaao-de-equipamentos', titulo: 'Instalação de equipamentos', descricao: 'Estudo focado em Instalação de equipamentos', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-instrumentacao-projetos',
    nome: 'Bloco III - Comissionamento',
    descricao: 'Conteúdo específico para Técnico de Projetos, Construção e Montagem - Instrumentação',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Prata',
    profissoes: ['instrumentacao-projetos'],
    topicos: [
      { id: 'comissionamento-de-malhas', titulo: 'Comissionamento de malhas', descricao: 'Estudo focado em Comissionamento de malhas', duracao: '45 min', ordem: 1 },
      { id: 'fat-e-sat', titulo: 'FAT e SAT', descricao: 'Estudo focado em FAT e SAT', duracao: '45 min', ordem: 2 },
      { id: 'normas-de-instrumentaaao', titulo: 'Normas de instrumentação', descricao: 'Estudo focado em Normas de instrumentação', duracao: '45 min', ordem: 3 },
      { id: 'seguranaa-em-instrumentaaao', titulo: 'Segurança em instrumentação', descricao: 'Estudo focado em Segurança em instrumentação', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-logistica-transportes',
    nome: 'Bloco I - Armazenagem',
    descricao: 'Conteúdo específico para Técnico de Logística de Transportes',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Prata',
    profissoes: ['logistica-transportes'],
    topicos: [
      { id: 'armazenagem', titulo: 'Armazenagem', descricao: 'Estudo focado em Armazenagem', duracao: '45 min', ordem: 1 },
      { id: 'logastica-reversa', titulo: 'Logística reversa', descricao: 'Estudo focado em Logística reversa', duracao: '45 min', ordem: 2 },
      { id: 'inventarios', titulo: 'Inventários', descricao: 'Estudo focado em Inventários', duracao: '45 min', ordem: 3 },
      { id: 'modais-de-transporte', titulo: 'Modais de transporte', descricao: 'Estudo focado em Modais de transporte', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-logistica-transportes',
    nome: 'Bloco II - Movimentação',
    descricao: 'Conteúdo específico para Técnico de Logística de Transportes',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Prata',
    profissoes: ['logistica-transportes'],
    topicos: [
      { id: 'movimentaaao-de-cargas', titulo: 'Movimentação de cargas', descricao: 'Estudo focado em Movimentação de cargas', duracao: '45 min', ordem: 1 },
      { id: 'logastica-internacional', titulo: 'Logística internacional', descricao: 'Estudo focado em Logística internacional', duracao: '45 min', ordem: 2 },
      { id: 'lei-13303-lei-das-estatais', titulo: 'Lei 13.303 (Lei das Estatais)', descricao: 'Estudo focado em Lei 13.303 (Lei das Estatais)', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-3-logistica-transportes',
    nome: 'Bloco III - Segurança',
    descricao: 'Conteúdo específico para Técnico de Logística de Transportes',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Prata',
    profissoes: ['logistica-transportes'],
    topicos: [
      { id: 'produtos-perigosos', titulo: 'Produtos perigosos', descricao: 'Estudo focado em Produtos perigosos', duracao: '45 min', ordem: 1 },
      { id: 'nr-11', titulo: 'NR 11', descricao: 'Estudo focado em NR 11', duracao: '45 min', ordem: 2 },
      { id: 'prevenaao-de-incandios', titulo: 'Prevenção de incêndios', descricao: 'Estudo focado em Prevenção de incêndios', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-1-quimica-petroleo',
    nome: 'Bloco I - Análise',
    descricao: 'Conteúdo específico para Técnico de Química de Petróleo',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Prata',
    profissoes: ['quimica-petroleo'],
    topicos: [
      { id: 'quamica-analatica', titulo: 'Química analítica', descricao: 'Estudo focado em Química analítica', duracao: '45 min', ordem: 1 },
      { id: 'matodos-instrumentais-de-analise', titulo: 'Métodos instrumentais de análise', descricao: 'Estudo focado em Métodos instrumentais de análise', duracao: '45 min', ordem: 2 }
    ]
  },
  {
    id: 'bloco-2-quimica-petroleo',
    nome: 'Bloco II - Orgânica',
    descricao: 'Conteúdo específico para Técnico de Química de Petróleo',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Prata',
    profissoes: ['quimica-petroleo'],
    topicos: [
      { id: 'quamica-organica', titulo: 'Química orgânica', descricao: 'Estudo focado em Química orgânica', duracao: '45 min', ordem: 1 },
      { id: 'quamica-inorganica', titulo: 'Química inorgânica', descricao: 'Estudo focado em Química inorgânica', duracao: '45 min', ordem: 2 },
      { id: 'propriedades-do-petraleo', titulo: 'Propriedades do petróleo', descricao: 'Estudo focado em Propriedades do petróleo', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-3-quimica-petroleo',
    nome: 'Bloco III - Laboratório',
    descricao: 'Conteúdo específico para Técnico de Química de Petróleo',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Prata',
    profissoes: ['quimica-petroleo'],
    topicos: [
      { id: 'analises-laboratoriais', titulo: 'Análises laboratoriais', descricao: 'Estudo focado em Análises laboratoriais', duracao: '45 min', ordem: 1 },
      { id: 'controle-de-qualidade', titulo: 'Controle de qualidade', descricao: 'Estudo focado em Controle de qualidade', duracao: '45 min', ordem: 2 },
      { id: 'seguranaa-em-laboratario', titulo: 'Segurança em laboratório', descricao: 'Estudo focado em Segurança em laboratório', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-1-suprimento-adm',
    nome: 'Bloco I - Administração',
    descricao: 'Conteúdo específico para Técnico de Suprimento de Bens e Serviços - Administração',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Prata',
    profissoes: ['suprimento-adm'],
    topicos: [
      { id: 'administraaao-geral', titulo: 'Administração geral', descricao: 'Estudo focado em Administração geral', duracao: '45 min', ordem: 1 },
      { id: 'gestao-de-qualidade', titulo: 'Gestão de qualidade', descricao: 'Estudo focado em Gestão de qualidade', duracao: '45 min', ordem: 2 },
      { id: 'logastica', titulo: 'Logística', descricao: 'Estudo focado em Logística', duracao: '45 min', ordem: 3 },
      { id: 'compras', titulo: 'Compras', descricao: 'Estudo focado em Compras', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-suprimento-adm',
    nome: 'Bloco II - Legislação',
    descricao: 'Conteúdo específico para Técnico de Suprimento de Bens e Serviços - Administração',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Prata',
    profissoes: ['suprimento-adm'],
    topicos: [
      { id: 'lei-13303-art-28-91', titulo: 'Lei 13.303 (Art. 28-91)', descricao: 'Estudo focado em Lei 13.303 (Art. 28-91)', duracao: '45 min', ordem: 1 },
      { id: 'regulamento-de-licitaaaes-petrobras-rlcp', titulo: 'Regulamento de Licitações Petrobras (RLCP)', descricao: 'Estudo focado em Regulamento de Licitações Petrobras (RLCP)', duracao: '45 min', ordem: 2 }
    ]
  },
  {
    id: 'bloco-3-suprimento-adm',
    nome: 'Bloco III - Tributos',
    descricao: 'Conteúdo específico para Técnico de Suprimento de Bens e Serviços - Administração',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Prata',
    profissoes: ['suprimento-adm'],
    topicos: [
      { id: 'contabilidade-basica', titulo: 'Contabilidade básica', descricao: 'Estudo focado em Contabilidade básica', duracao: '45 min', ordem: 1 },
      { id: 'direito-tributario', titulo: 'Direito tributário', descricao: 'Estudo focado em Direito tributário', duracao: '45 min', ordem: 2 },
      { id: 'administraaao-tributaria', titulo: 'Administração tributária', descricao: 'Estudo focado em Administração tributária', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-1-eng-petroleo',
    nome: 'Bloco I - Engenharia de Poço',
    descricao: 'Conteúdo específico para Engenharia de Petróleo',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Ouro',
    profissoes: ['eng-petroleo'],
    topicos: [
      { id: 'perfuraaao', titulo: 'Perfuração', descricao: 'Estudo focado em Perfuração', duracao: '45 min', ordem: 1 },
      { id: 'fluidos-de-perfuraaao', titulo: 'Fluidos de perfuração', descricao: 'Estudo focado em Fluidos de perfuração', duracao: '45 min', ordem: 2 },
      { id: 'cimentaaao', titulo: 'Cimentação', descricao: 'Estudo focado em Cimentação', duracao: '45 min', ordem: 3 },
      { id: 'completaaao', titulo: 'Completação', descricao: 'Estudo focado em Completação', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-eng-petroleo',
    nome: 'Bloco II - Engenharia de Reservatórios',
    descricao: 'Conteúdo específico para Engenharia de Petróleo',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Ouro',
    profissoes: ['eng-petroleo'],
    topicos: [
      { id: 'propriedades-da-rocha-e-fluidos', titulo: 'Propriedades da rocha e fluidos', descricao: 'Estudo focado em Propriedades da rocha e fluidos', duracao: '45 min', ordem: 1 },
      { id: 'escoamento-em-meios-porosos', titulo: 'Escoamento em meios porosos', descricao: 'Estudo focado em Escoamento em meios porosos', duracao: '45 min', ordem: 2 },
      { id: 'recuperaaao-secundaria', titulo: 'Recuperação secundária', descricao: 'Estudo focado em Recuperação secundária', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-3-eng-petroleo',
    nome: 'Bloco III - Elevação e Escoamento',
    descricao: 'Conteúdo específico para Engenharia de Petróleo',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Ouro',
    profissoes: ['eng-petroleo'],
    topicos: [
      { id: 'matodos-de-elevaaao-artificial', titulo: 'Métodos de elevação artificial', descricao: 'Estudo focado em Métodos de elevação artificial', duracao: '45 min', ordem: 1 },
      { id: 'garantia-de-escoamento', titulo: 'Garantia de escoamento', descricao: 'Estudo focado em Garantia de escoamento', duracao: '45 min', ordem: 2 },
      { id: 'processamento-primario', titulo: 'Processamento primário', descricao: 'Estudo focado em Processamento primário', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-1-eng-mecanica',
    nome: 'Bloco I - Termofluidos',
    descricao: 'Conteúdo específico para Engenharia Mecânica',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Ouro',
    profissoes: ['eng-mecanica'],
    topicos: [
      { id: 'termodinamica-aplicada', titulo: 'Termodinâmica aplicada', descricao: 'Estudo focado em Termodinâmica aplicada', duracao: '45 min', ordem: 1 },
      { id: 'mecanica-dos-fluidos', titulo: 'Mecânica dos fluidos', descricao: 'Estudo focado em Mecânica dos fluidos', duracao: '45 min', ordem: 2 },
      { id: 'transmissao-de-calor', titulo: 'Transmissão de calor', descricao: 'Estudo focado em Transmissão de calor', duracao: '45 min', ordem: 3 },
      { id: 'maquinas-de-fluxo', titulo: 'Máquinas de fluxo', descricao: 'Estudo focado em Máquinas de fluxo', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-eng-mecanica',
    nome: 'Bloco II - Projeto Mecânico',
    descricao: 'Conteúdo específico para Engenharia Mecânica',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Ouro',
    profissoes: ['eng-mecanica'],
    topicos: [
      { id: 'resistancia-dos-materiais', titulo: 'Resistência dos materiais', descricao: 'Estudo focado em Resistência dos materiais', duracao: '45 min', ordem: 1 },
      { id: 'elementos-de-maquinas', titulo: 'Elementos de máquinas', descricao: 'Estudo focado em Elementos de máquinas', duracao: '45 min', ordem: 2 },
      { id: 'vibraaaes-mecanicas', titulo: 'Vibrações mecânicas', descricao: 'Estudo focado em Vibrações mecânicas', duracao: '45 min', ordem: 3 },
      { id: 'seleaao-de-materiais', titulo: 'Seleção de materiais', descricao: 'Estudo focado em Seleção de materiais', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-eng-mecanica',
    nome: 'Bloco III - Fabricação e Gestão',
    descricao: 'Conteúdo específico para Engenharia Mecânica',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Ouro',
    profissoes: ['eng-mecanica'],
    topicos: [
      { id: 'processos-de-fabricaaao', titulo: 'Processos de fabricação', descricao: 'Estudo focado em Processos de fabricação', duracao: '45 min', ordem: 1 },
      { id: 'metrologia', titulo: 'Metrologia', descricao: 'Estudo focado em Metrologia', duracao: '45 min', ordem: 2 },
      { id: 'manutenaao-industrial', titulo: 'Manutenção industrial', descricao: 'Estudo focado em Manutenção industrial', duracao: '45 min', ordem: 3 },
      { id: 'gestao-de-projetos', titulo: 'Gestão de projetos', descricao: 'Estudo focado em Gestão de projetos', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-eng-eletrica',
    nome: 'Bloco I - Sistemas de Potência',
    descricao: 'Conteúdo específico para Engenharia Elétrica',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Ouro',
    profissoes: ['eng-eletrica'],
    topicos: [
      { id: 'geraaao-transmissao-e-distribuiaao', titulo: 'Geração, transmissão e distribuição', descricao: 'Estudo focado em Geração, transmissão e distribuição', duracao: '45 min', ordem: 1 },
      { id: 'analise-de-sistemas-de-potancia', titulo: 'Análise de sistemas de potência', descricao: 'Estudo focado em Análise de sistemas de potência', duracao: '45 min', ordem: 2 },
      { id: 'proteaao-de-sistemas', titulo: 'Proteção de sistemas', descricao: 'Estudo focado em Proteção de sistemas', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-2-eng-eletrica',
    nome: 'Bloco II - Máquinas e Acionamentos',
    descricao: 'Conteúdo específico para Engenharia Elétrica',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Ouro',
    profissoes: ['eng-eletrica'],
    topicos: [
      { id: 'transformadores', titulo: 'Transformadores', descricao: 'Estudo focado em Transformadores', duracao: '45 min', ordem: 1 },
      { id: 'maquinas-rotativas', titulo: 'Máquinas rotativas', descricao: 'Estudo focado em Máquinas rotativas', duracao: '45 min', ordem: 2 },
      { id: 'eletranica-de-potancia', titulo: 'Eletrônica de potência', descricao: 'Estudo focado em Eletrônica de potência', duracao: '45 min', ordem: 3 },
      { id: 'acionamentos-elatricos', titulo: 'Acionamentos elétricos', descricao: 'Estudo focado em Acionamentos elétricos', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-eng-eletrica',
    nome: 'Bloco III - Eletrônica e Controle',
    descricao: 'Conteúdo específico para Engenharia Elétrica',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Ouro',
    profissoes: ['eng-eletrica'],
    topicos: [
      { id: 'circuitos-elatricos', titulo: 'Circuitos elétricos', descricao: 'Estudo focado em Circuitos elétricos', duracao: '45 min', ordem: 1 },
      { id: 'eletranica-analagica-e-digital', titulo: 'Eletrônica analógica e digital', descricao: 'Estudo focado em Eletrônica analógica e digital', duracao: '45 min', ordem: 2 },
      { id: 'sistemas-de-controle', titulo: 'Sistemas de controle', descricao: 'Estudo focado em Sistemas de controle', duracao: '45 min', ordem: 3 },
      { id: 'instrumentaaao', titulo: 'Instrumentação', descricao: 'Estudo focado em Instrumentação', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-eng-civil',
    nome: 'Bloco I - Estruturas e Geotecnia',
    descricao: 'Conteúdo específico para Engenharia Civil',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Ouro',
    profissoes: ['eng-civil'],
    topicos: [
      { id: 'analise-estrutural', titulo: 'Análise estrutural', descricao: 'Estudo focado em Análise estrutural', duracao: '45 min', ordem: 1 },
      { id: 'concreto-armado-e-protendido', titulo: 'Concreto armado e protendido', descricao: 'Estudo focado em Concreto armado e protendido', duracao: '45 min', ordem: 2 },
      { id: 'mecanica-dos-solos', titulo: 'Mecânica dos solos', descricao: 'Estudo focado em Mecânica dos solos', duracao: '45 min', ordem: 3 },
      { id: 'fundaaaes', titulo: 'Fundações', descricao: 'Estudo focado em Fundações', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-eng-civil',
    nome: 'Bloco II - Construção Civil',
    descricao: 'Conteúdo específico para Engenharia Civil',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Ouro',
    profissoes: ['eng-civil'],
    topicos: [
      { id: 'tecnologia-das-construaaes', titulo: 'Tecnologia das construções', descricao: 'Estudo focado em Tecnologia das construções', duracao: '45 min', ordem: 1 },
      { id: 'materiais-de-construaao', titulo: 'Materiais de construção', descricao: 'Estudo focado em Materiais de construção', duracao: '45 min', ordem: 2 },
      { id: 'planejamento-e-controle-de-obras', titulo: 'Planejamento e controle de obras', descricao: 'Estudo focado em Planejamento e controle de obras', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-3-eng-civil',
    nome: 'Bloco III - Hidráulica e Saneamento',
    descricao: 'Conteúdo específico para Engenharia Civil',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Ouro',
    profissoes: ['eng-civil'],
    topicos: [
      { id: 'mecanica-dos-fluidos', titulo: 'Mecânica dos fluidos', descricao: 'Estudo focado em Mecânica dos fluidos', duracao: '45 min', ordem: 1 },
      { id: 'hidraulica-aplicada', titulo: 'Hidráulica aplicada', descricao: 'Estudo focado em Hidráulica aplicada', duracao: '45 min', ordem: 2 },
      { id: 'saneamento-basico', titulo: 'Saneamento básico', descricao: 'Estudo focado em Saneamento básico', duracao: '45 min', ordem: 3 },
      { id: 'instalaaaes-prediais', titulo: 'Instalações prediais', descricao: 'Estudo focado em Instalações prediais', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-eng-seguranca',
    nome: 'Bloco I - Higiene e Medicina',
    descricao: 'Conteúdo específico para Engenharia de Segurança',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Ouro',
    profissoes: ['eng-seguranca'],
    topicos: [
      { id: 'higiene-ocupacional', titulo: 'Higiene ocupacional', descricao: 'Estudo focado em Higiene ocupacional', duracao: '45 min', ordem: 1 },
      { id: 'doenaas-ocupacionais', titulo: 'Doenças ocupacionais', descricao: 'Estudo focado em Doenças ocupacionais', duracao: '45 min', ordem: 2 },
      { id: 'toxicologia', titulo: 'Toxicologia', descricao: 'Estudo focado em Toxicologia', duracao: '45 min', ordem: 3 },
      { id: 'ergonomia', titulo: 'Ergonomia', descricao: 'Estudo focado em Ergonomia', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-eng-seguranca',
    nome: 'Bloco II - Gerenciamento de Riscos',
    descricao: 'Conteúdo específico para Engenharia de Segurança',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Ouro',
    profissoes: ['eng-seguranca'],
    topicos: [
      { id: 'analise-de-riscos-apr-hazop', titulo: 'Análise de riscos (APR, HAZOP)', descricao: 'Estudo focado em Análise de riscos (APR, HAZOP)', duracao: '45 min', ordem: 1 },
      { id: 'gerenciamento-de-riscos-pgr', titulo: 'Gerenciamento de riscos (PGR)', descricao: 'Estudo focado em Gerenciamento de riscos (PGR)', duracao: '45 min', ordem: 2 },
      { id: 'prevenaao-e-controle-de-perdas', titulo: 'Prevenção e controle de perdas', descricao: 'Estudo focado em Prevenção e controle de perdas', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-3-eng-seguranca',
    nome: 'Bloco III - Legislação e Incêndio',
    descricao: 'Conteúdo específico para Engenharia de Segurança',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Ouro',
    profissoes: ['eng-seguranca'],
    topicos: [
      { id: 'normas-regulamentadoras-nrs', titulo: 'Normas Regulamentadoras (NRs)', descricao: 'Estudo focado em Normas Regulamentadoras (NRs)', duracao: '45 min', ordem: 1 },
      { id: 'legislaaao-previdenciaria', titulo: 'Legislação previdenciária', descricao: 'Estudo focado em Legislação previdenciária', duracao: '45 min', ordem: 2 },
      { id: 'proteaao-contra-incandio-e-explosaes', titulo: 'Proteção contra incêndio e explosões', descricao: 'Estudo focado em Proteção contra incêndio e explosões', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-1-administracao',
    nome: 'Bloco I - Gestão Estratégica',
    descricao: 'Conteúdo específico para Administração',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Ouro',
    profissoes: ['administracao'],
    topicos: [
      { id: 'planejamento-estratagico', titulo: 'Planejamento estratégico', descricao: 'Estudo focado em Planejamento estratégico', duracao: '45 min', ordem: 1 },
      { id: 'gestao-de-processos', titulo: 'Gestão de processos', descricao: 'Estudo focado em Gestão de processos', duracao: '45 min', ordem: 2 },
      { id: 'gestao-de-projetos-pmbok', titulo: 'Gestão de projetos (PMBOK)', descricao: 'Estudo focado em Gestão de projetos (PMBOK)', duracao: '45 min', ordem: 3 },
      { id: 'governanaa-corporativa', titulo: 'Governança corporativa', descricao: 'Estudo focado em Governança corporativa', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-administracao',
    nome: 'Bloco II - Gestão de Pessoas e Marketing',
    descricao: 'Conteúdo específico para Administração',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Ouro',
    profissoes: ['administracao'],
    topicos: [
      { id: 'comportamento-organizacional', titulo: 'Comportamento organizacional', descricao: 'Estudo focado em Comportamento organizacional', duracao: '45 min', ordem: 1 },
      { id: 'gestao-de-rh', titulo: 'Gestão de RH', descricao: 'Estudo focado em Gestão de RH', duracao: '45 min', ordem: 2 },
      { id: 'marketing-estratagico', titulo: 'Marketing estratégico', descricao: 'Estudo focado em Marketing estratégico', duracao: '45 min', ordem: 3 },
      { id: 'pesquisa-de-mercado', titulo: 'Pesquisa de mercado', descricao: 'Estudo focado em Pesquisa de mercado', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-administracao',
    nome: 'Bloco III - Logística e Finanças',
    descricao: 'Conteúdo específico para Administração',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Ouro',
    profissoes: ['administracao'],
    topicos: [
      { id: 'gestao-da-cadeia-de-suprimentos', titulo: 'Gestão da cadeia de suprimentos', descricao: 'Estudo focado em Gestão da cadeia de suprimentos', duracao: '45 min', ordem: 1 },
      { id: 'administraaao-de-materiais', titulo: 'Administração de materiais', descricao: 'Estudo focado em Administração de materiais', duracao: '45 min', ordem: 2 },
      { id: 'administraaao-financeira', titulo: 'Administração financeira', descricao: 'Estudo focado em Administração financeira', duracao: '45 min', ordem: 3 },
      { id: 'oraamento', titulo: 'Orçamento', descricao: 'Estudo focado em Orçamento', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-economia',
    nome: 'Bloco I - Microeconomia',
    descricao: 'Conteúdo específico para Economia',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Ouro',
    profissoes: ['economia'],
    topicos: [
      { id: 'teoria-do-consumidor-e-da-firma', titulo: 'Teoria do consumidor e da firma', descricao: 'Estudo focado em Teoria do consumidor e da firma', duracao: '45 min', ordem: 1 },
      { id: 'estruturas-de-mercado', titulo: 'Estruturas de mercado', descricao: 'Estudo focado em Estruturas de mercado', duracao: '45 min', ordem: 2 },
      { id: 'equilabrio-geral', titulo: 'Equilíbrio geral', descricao: 'Estudo focado em Equilíbrio geral', duracao: '45 min', ordem: 3 },
      { id: 'teoria-dos-jogos', titulo: 'Teoria dos jogos', descricao: 'Estudo focado em Teoria dos jogos', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-economia',
    nome: 'Bloco II - Macroeconomia',
    descricao: 'Conteúdo específico para Economia',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Ouro',
    profissoes: ['economia'],
    topicos: [
      { id: 'contabilidade-nacional', titulo: 'Contabilidade nacional', descricao: 'Estudo focado em Contabilidade nacional', duracao: '45 min', ordem: 1 },
      { id: 'teoria-monetaria', titulo: 'Teoria monetária', descricao: 'Estudo focado em Teoria monetária', duracao: '45 min', ordem: 2 },
      { id: 'polaticas-fiscal-e-cambial', titulo: 'Políticas fiscal e cambial', descricao: 'Estudo focado em Políticas fiscal e cambial', duracao: '45 min', ordem: 3 },
      { id: 'crescimento-econamico', titulo: 'Crescimento econômico', descricao: 'Estudo focado em Crescimento econômico', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-economia',
    nome: 'Bloco III - Métodos Quantitativos',
    descricao: 'Conteúdo específico para Economia',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Ouro',
    profissoes: ['economia'],
    topicos: [
      { id: 'estatastica-econamica', titulo: 'Estatística econômica', descricao: 'Estudo focado em Estatística econômica', duracao: '45 min', ordem: 1 },
      { id: 'econometria', titulo: 'Econometria', descricao: 'Estudo focado em Econometria', duracao: '45 min', ordem: 2 },
      { id: 'matematica-financeira', titulo: 'Matemática financeira', descricao: 'Estudo focado em Matemática financeira', duracao: '45 min', ordem: 3 },
      { id: 'analise-de-projetos', titulo: 'Análise de projetos', descricao: 'Estudo focado em Análise de projetos', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-analista-sistemas-eng-software',
    nome: 'Bloco I - Desenvolvimento',
    descricao: 'Conteúdo específico para Analista de Sistemas - Engenharia de Software',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Ouro',
    profissoes: ['analista-sistemas-eng-software'],
    topicos: [
      { id: 'lagica-de-programaaao', titulo: 'Lógica de programação', descricao: 'Estudo focado em Lógica de programação', duracao: '45 min', ordem: 1 },
      { id: 'estruturas-de-dados', titulo: 'Estruturas de dados', descricao: 'Estudo focado em Estruturas de dados', duracao: '45 min', ordem: 2 },
      { id: 'padraes-de-projeto', titulo: 'Padrões de projeto', descricao: 'Estudo focado em Padrões de projeto', duracao: '45 min', ordem: 3 },
      { id: 'linguagens-java-python-c', titulo: 'Linguagens (Java, Python, C#)', descricao: 'Estudo focado em Linguagens (Java, Python, C#)', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-analista-sistemas-eng-software',
    nome: 'Bloco II - Engenharia de Software',
    descricao: 'Conteúdo específico para Analista de Sistemas - Engenharia de Software',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Ouro',
    profissoes: ['analista-sistemas-eng-software'],
    topicos: [
      { id: 'ciclo-de-vida-de-software', titulo: 'Ciclo de vida de software', descricao: 'Estudo focado em Ciclo de vida de software', duracao: '45 min', ordem: 1 },
      { id: 'metodologias-ageis-scrum-kanban', titulo: 'Metodologias ágeis (Scrum, Kanban)', descricao: 'Estudo focado em Metodologias ágeis (Scrum, Kanban)', duracao: '45 min', ordem: 2 },
      { id: 'devops', titulo: 'DevOps', descricao: 'Estudo focado em DevOps', duracao: '45 min', ordem: 3 },
      { id: 'testes-de-software', titulo: 'Testes de software', descricao: 'Estudo focado em Testes de software', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-analista-sistemas-eng-software',
    nome: 'Bloco III - Arquitetura e BD',
    descricao: 'Conteúdo específico para Analista de Sistemas - Engenharia de Software',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Ouro',
    profissoes: ['analista-sistemas-eng-software'],
    topicos: [
      { id: 'arquitetura-de-sistemas', titulo: 'Arquitetura de sistemas', descricao: 'Estudo focado em Arquitetura de sistemas', duracao: '45 min', ordem: 1 },
      { id: 'microserviaos', titulo: 'Microserviços', descricao: 'Estudo focado em Microserviços', duracao: '45 min', ordem: 2 },
      { id: 'banco-de-dados-sql-e-nosql', titulo: 'Banco de dados (SQL e NoSQL)', descricao: 'Estudo focado em Banco de dados (SQL e NoSQL)', duracao: '45 min', ordem: 3 },
      { id: 'seguranaa-da-informaaao', titulo: 'Segurança da informação', descricao: 'Estudo focado em Segurança da informação', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-analista-sistemas-infra',
    nome: 'Bloco I - Redes e Comunicação',
    descricao: 'Conteúdo específico para Analista de Sistemas - Infraestrutura',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Ouro',
    profissoes: ['analista-sistemas-infra'],
    topicos: [
      { id: 'protocolos-tcpip', titulo: 'Protocolos TCP/IP', descricao: 'Estudo focado em Protocolos TCP/IP', duracao: '45 min', ordem: 1 },
      { id: 'roteamento-e-switching', titulo: 'Roteamento e switching', descricao: 'Estudo focado em Roteamento e switching', duracao: '45 min', ordem: 2 },
      { id: 'redes-sem-fio', titulo: 'Redes sem fio', descricao: 'Estudo focado em Redes sem fio', duracao: '45 min', ordem: 3 },
      { id: 'seguranaa-de-redes', titulo: 'Segurança de redes', descricao: 'Estudo focado em Segurança de redes', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-analista-sistemas-infra',
    nome: 'Bloco II - Sistemas Operacionais',
    descricao: 'Conteúdo específico para Analista de Sistemas - Infraestrutura',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Ouro',
    profissoes: ['analista-sistemas-infra'],
    topicos: [
      { id: 'windows-server', titulo: 'Windows Server', descricao: 'Estudo focado em Windows Server', duracao: '45 min', ordem: 1 },
      { id: 'linux-red-hatdebian', titulo: 'Linux (Red Hat/Debian)', descricao: 'Estudo focado em Linux (Red Hat/Debian)', duracao: '45 min', ordem: 2 },
      { id: 'virtualizaaao', titulo: 'Virtualização', descricao: 'Estudo focado em Virtualização', duracao: '45 min', ordem: 3 },
      { id: 'containeres-docker-k8s', titulo: 'Contêineres (Docker, K8s)', descricao: 'Estudo focado em Contêineres (Docker, K8s)', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-analista-sistemas-infra',
    nome: 'Bloco III - Gestão e Nuvem',
    descricao: 'Conteúdo específico para Analista de Sistemas - Infraestrutura',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Ouro',
    profissoes: ['analista-sistemas-infra'],
    topicos: [
      { id: 'computaaao-em-nuvem-awsazure', titulo: 'Computação em nuvem (AWS/Azure)', descricao: 'Estudo focado em Computação em nuvem (AWS/Azure)', duracao: '45 min', ordem: 1 },
      { id: 'gestao-de-serviaos-itil', titulo: 'Gestão de serviços (ITIL)', descricao: 'Estudo focado em Gestão de serviços (ITIL)', duracao: '45 min', ordem: 2 },
      { id: 'monitoramento', titulo: 'Monitoramento', descricao: 'Estudo focado em Monitoramento', duracao: '45 min', ordem: 3 },
      { id: 'backup-e-recuperaaao', titulo: 'Backup e recuperação', descricao: 'Estudo focado em Backup e recuperação', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-analista-sistemas-processos',
    nome: 'Bloco I - Modelagem de Processos',
    descricao: 'Conteúdo específico para Analista de Sistemas - Processos de Negócio',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Ouro',
    profissoes: ['analista-sistemas-processos'],
    topicos: [
      { id: 'bpmn', titulo: 'BPMN', descricao: 'Estudo focado em BPMN', duracao: '45 min', ordem: 1 },
      { id: 'engenharia-de-requisitos', titulo: 'Engenharia de requisitos', descricao: 'Estudo focado em Engenharia de requisitos', duracao: '45 min', ordem: 2 },
      { id: 'analise-de-negacios', titulo: 'Análise de negócios', descricao: 'Estudo focado em Análise de negócios', duracao: '45 min', ordem: 3 },
      { id: 'gestao-de-processos-bpm', titulo: 'Gestão de processos (BPM)', descricao: 'Estudo focado em Gestão de processos (BPM)', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-analista-sistemas-processos',
    nome: 'Bloco II - Gestão de Projetos e Serviços',
    descricao: 'Conteúdo específico para Analista de Sistemas - Processos de Negócio',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Ouro',
    profissoes: ['analista-sistemas-processos'],
    topicos: [
      { id: 'pmbok', titulo: 'PMBOK', descricao: 'Estudo focado em PMBOK', duracao: '45 min', ordem: 1 },
      { id: 'scrum', titulo: 'Scrum', descricao: 'Estudo focado em Scrum', duracao: '45 min', ordem: 2 },
      { id: 'itil-4', titulo: 'ITIL 4', descricao: 'Estudo focado em ITIL 4', duracao: '45 min', ordem: 3 },
      { id: 'cobit-2019', titulo: 'COBIT 2019', descricao: 'Estudo focado em COBIT 2019', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-analista-sistemas-processos',
    nome: 'Bloco III - Dados e Inovação',
    descricao: 'Conteúdo específico para Analista de Sistemas - Processos de Negócio',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Ouro',
    profissoes: ['analista-sistemas-processos'],
    topicos: [
      { id: 'ciancia-de-dados', titulo: 'Ciência de dados', descricao: 'Estudo focado em Ciência de dados', duracao: '45 min', ordem: 1 },
      { id: 'transformaaao-digital', titulo: 'Transformação digital', descricao: 'Estudo focado em Transformação digital', duracao: '45 min', ordem: 2 },
      { id: 'design-thinking', titulo: 'Design Thinking', descricao: 'Estudo focado em Design Thinking', duracao: '45 min', ordem: 3 },
      { id: 'arquitetura-corporativa', titulo: 'Arquitetura corporativa', descricao: 'Estudo focado em Arquitetura corporativa', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-geologia',
    nome: 'Bloco I - Geologia Geral',
    descricao: 'Conteúdo específico para Geologia',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Ouro',
    profissoes: ['geologia'],
    topicos: [
      { id: 'mineralogia-e-petrologia', titulo: 'Mineralogia e Petrologia', descricao: 'Estudo focado em Mineralogia e Petrologia', duracao: '45 min', ordem: 1 },
      { id: 'geologia-estrutural', titulo: 'Geologia estrutural', descricao: 'Estudo focado em Geologia estrutural', duracao: '45 min', ordem: 2 },
      { id: 'sedimentologia', titulo: 'Sedimentologia', descricao: 'Estudo focado em Sedimentologia', duracao: '45 min', ordem: 3 },
      { id: 'estratigrafia', titulo: 'Estratigrafia', descricao: 'Estudo focado em Estratigrafia', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-geologia',
    nome: 'Bloco II - Geologia do Petróleo',
    descricao: 'Conteúdo específico para Geologia',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Ouro',
    profissoes: ['geologia'],
    topicos: [
      { id: 'sistemas-petrolaferos', titulo: 'Sistemas petrolíferos', descricao: 'Estudo focado em Sistemas petrolíferos', duracao: '45 min', ordem: 1 },
      { id: 'geoquamica-organica', titulo: 'Geoquímica orgânica', descricao: 'Estudo focado em Geoquímica orgânica', duracao: '45 min', ordem: 2 },
      { id: 'geofasica-de-exploraaao', titulo: 'Geofísica de exploração', descricao: 'Estudo focado em Geofísica de exploração', duracao: '45 min', ordem: 3 },
      { id: 'avaliaaao-de-formaaaes', titulo: 'Avaliação de formações', descricao: 'Estudo focado em Avaliação de formações', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-geologia',
    nome: 'Bloco III - Mapeamento e Recursos',
    descricao: 'Conteúdo específico para Geologia',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Ouro',
    profissoes: ['geologia'],
    topicos: [
      { id: 'geotecnologias', titulo: 'Geotecnologias', descricao: 'Estudo focado em Geotecnologias', duracao: '45 min', ordem: 1 },
      { id: 'sensoriamento-remoto', titulo: 'Sensoriamento remoto', descricao: 'Estudo focado em Sensoriamento remoto', duracao: '45 min', ordem: 2 },
      { id: 'hidrogeologia', titulo: 'Hidrogeologia', descricao: 'Estudo focado em Hidrogeologia', duracao: '45 min', ordem: 3 },
      { id: 'geologia-ambiental', titulo: 'Geologia ambiental', descricao: 'Estudo focado em Geologia ambiental', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-geofisica',
    nome: 'Bloco I - Métodos Potenciais',
    descricao: 'Conteúdo específico para Geofísica',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Ouro',
    profissoes: ['geofisica'],
    topicos: [
      { id: 'gravimetria', titulo: 'Gravimetria', descricao: 'Estudo focado em Gravimetria', duracao: '45 min', ordem: 1 },
      { id: 'magnetometria', titulo: 'Magnetometria', descricao: 'Estudo focado em Magnetometria', duracao: '45 min', ordem: 2 },
      { id: 'eletromagnetismo', titulo: 'Eletromagnetismo', descricao: 'Estudo focado em Eletromagnetismo', duracao: '45 min', ordem: 3 },
      { id: 'processamento-de-dados', titulo: 'Processamento de dados', descricao: 'Estudo focado em Processamento de dados', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-geofisica',
    nome: 'Bloco II - Métodos Sísmicos',
    descricao: 'Conteúdo específico para Geofísica',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Ouro',
    profissoes: ['geofisica'],
    topicos: [
      { id: 'aquisiaao-sasmica', titulo: 'Aquisição sísmica', descricao: 'Estudo focado em Aquisição sísmica', duracao: '45 min', ordem: 1 },
      { id: 'processamento-sasmico', titulo: 'Processamento sísmico', descricao: 'Estudo focado em Processamento sísmico', duracao: '45 min', ordem: 2 },
      { id: 'interpretaaao-sasmica', titulo: 'Interpretação sísmica', descricao: 'Estudo focado em Interpretação sísmica', duracao: '45 min', ordem: 3 },
      { id: 'sismologia', titulo: 'Sismologia', descricao: 'Estudo focado em Sismologia', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-geofisica',
    nome: 'Bloco III - Física da Terra',
    descricao: 'Conteúdo específico para Geofísica',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Ouro',
    profissoes: ['geofisica'],
    topicos: [
      { id: 'fasica-da-terra-salida', titulo: 'Física da Terra sólida', descricao: 'Estudo focado em Física da Terra sólida', duracao: '45 min', ordem: 1 },
      { id: 'propriedades-fasicas-das-rochas', titulo: 'Propriedades físicas das rochas', descricao: 'Estudo focado em Propriedades físicas das rochas', duracao: '45 min', ordem: 2 },
      { id: 'perfilagem-de-poaos', titulo: 'Perfilagem de poços', descricao: 'Estudo focado em Perfilagem de poços', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-1-caixa-tecnico',
    nome: 'Bloco I - Conhecimentos Bancários',
    descricao: 'Conteúdo específico para Caixa - Técnico Bancário',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Prata',
    profissoes: ['caixa-tecnico'],
    topicos: [
      { id: 'sistema-financeiro-nacional', titulo: 'Sistema Financeiro Nacional', descricao: 'Estudo focado em Sistema Financeiro Nacional', duracao: '45 min', ordem: 1 },
      { id: 'mercado-financeiro', titulo: 'Mercado Financeiro', descricao: 'Estudo focado em Mercado Financeiro', duracao: '45 min', ordem: 2 },
      { id: 'produtos-bancarios', titulo: 'Produtos Bancários', descricao: 'Estudo focado em Produtos Bancários', duracao: '45 min', ordem: 3 },
      { id: 'garantias-do-sfn', titulo: 'Garantias do SFN', descricao: 'Estudo focado em Garantias do SFN', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-caixa-tecnico',
    nome: 'Bloco II - Atendimento e TI',
    descricao: 'Conteúdo específico para Caixa - Técnico Bancário',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Prata',
    profissoes: ['caixa-tecnico'],
    topicos: [
      { id: 'atendimento-ao-cliente', titulo: 'Atendimento ao cliente', descricao: 'Estudo focado em Atendimento ao cliente', duracao: '45 min', ordem: 1 },
      { id: 'diversidade-e-inclusao', titulo: 'Diversidade e Inclusão', descricao: 'Estudo focado em Diversidade e Inclusão', duracao: '45 min', ordem: 2 },
      { id: 'tecnologia-da-informaaao', titulo: 'Tecnologia da Informação', descricao: 'Estudo focado em Tecnologia da Informação', duracao: '45 min', ordem: 3 },
      { id: 'seguranaa-da-informaaao', titulo: 'Segurança da Informação', descricao: 'Estudo focado em Segurança da Informação', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-caixa-tecnico',
    nome: 'Bloco III - Digital e Vendas',
    descricao: 'Conteúdo específico para Caixa - Técnico Bancário',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Prata',
    profissoes: ['caixa-tecnico'],
    topicos: [
      { id: 'comportamento-digital', titulo: 'Comportamento digital', descricao: 'Estudo focado em Comportamento digital', duracao: '45 min', ordem: 1 },
      { id: 'tacnicas-de-vendas', titulo: 'Técnicas de vendas', descricao: 'Estudo focado em Técnicas de vendas', duracao: '45 min', ordem: 2 },
      { id: 'atica-e-conduta-caixa', titulo: 'Ã‰tica e Conduta Caixa', descricao: 'Estudo focado em Ã‰tica e Conduta Caixa', duracao: '45 min', ordem: 3 },
      { id: 'legislaaao-anticorrupaao', titulo: 'Legislação Anticorrupção', descricao: 'Estudo focado em Legislação Anticorrupção', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-bb-escriturario',
    nome: 'Bloco I - Conhecimentos Bancários',
    descricao: 'Conteúdo específico para Banco do Brasil - Escriturário',
    icone: '📚',
    cor: 'from-cyan-500 to-blue-500',
    requiredPlan: 'Prata',
    profissoes: ['bb-escriturario'],
    topicos: [
      { id: 'estrutura-do-sfn', titulo: 'Estrutura do SFN', descricao: 'Estudo focado em Estrutura do SFN', duracao: '45 min', ordem: 1 },
      { id: 'mercado-de-cambio', titulo: 'Mercado de Câmbio', descricao: 'Estudo focado em Mercado de Câmbio', duracao: '45 min', ordem: 2 },
      { id: 'tatulos-de-cradito', titulo: 'Títulos de Crédito', descricao: 'Estudo focado em Títulos de Crédito', duracao: '45 min', ordem: 3 },
      { id: 'criptoativos-e-open-finance', titulo: 'Criptoativos e Open Finance', descricao: 'Estudo focado em Criptoativos e Open Finance', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-bb-escriturario',
    nome: 'Bloco II - Vendas e Negociação',
    descricao: 'Conteúdo específico para Banco do Brasil - Escriturário',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Prata',
    profissoes: ['bb-escriturario'],
    topicos: [
      { id: 'marketing-de-relacionamento', titulo: 'Marketing de relacionamento', descricao: 'Estudo focado em Marketing de relacionamento', duracao: '45 min', ordem: 1 },
      { id: 'tacnicas-de-vendas-no-setor-bancario', titulo: 'Técnicas de vendas no setor bancário', descricao: 'Estudo focado em Técnicas de vendas no setor bancário', duracao: '45 min', ordem: 2 },
      { id: 'resoluaao-cmn-4860', titulo: 'Resolução CMN 4.860', descricao: 'Estudo focado em Resolução CMN 4.860', duracao: '45 min', ordem: 3 },
      { id: 'cdc', titulo: 'CDC', descricao: 'Estudo focado em CDC', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-bb-escriturario',
    nome: 'Bloco III - Informática e Finanças',
    descricao: 'Conteúdo específico para Banco do Brasil - Escriturário',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Prata',
    profissoes: ['bb-escriturario'],
    topicos: [
      { id: 'noaaes-de-informatica', titulo: 'Noções de informática', descricao: 'Estudo focado em Noções de informática', duracao: '45 min', ordem: 1 },
      { id: 'banco-de-dados-e-analytics', titulo: 'Banco de Dados e Analytics', descricao: 'Estudo focado em Banco de Dados e Analytics', duracao: '45 min', ordem: 2 },
      { id: 'matematica-financeira', titulo: 'Matemática Financeira', descricao: 'Estudo focado em Matemática Financeira', duracao: '45 min', ordem: 3 },
      { id: 'sistemas-operacionais', titulo: 'Sistemas Operacionais', descricao: 'Estudo focado em Sistemas Operacionais', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-correios-agente',
    nome: 'Bloco I - Conhecimentos Postais',
    descricao: 'Conteúdo específico para Correios - Agente de Correios',
    icone: '📚',
    cor: 'from-blue-600 to-indigo-700',
    requiredPlan: 'Prata',
    profissoes: ['correios-agente'],
    topicos: [
      { id: 'serviaos-postais-basicos', titulo: 'Serviços postais básicos', descricao: 'Estudo focado em Serviços postais básicos', duracao: '45 min', ordem: 1 },
      { id: 'regulamento-do-serviao-postal', titulo: 'Regulamento do Serviço Postal', descricao: 'Estudo focado em Regulamento do Serviço Postal', duracao: '45 min', ordem: 2 },
      { id: 'endereaamento-de-correspondancias', titulo: 'Endereçamento de correspondências', descricao: 'Estudo focado em Endereçamento de correspondências', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-2-correios-agente',
    nome: 'Bloco II - Atendimento e Vendas',
    descricao: 'Conteúdo específico para Correios - Agente de Correios',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Prata',
    profissoes: ['correios-agente'],
    topicos: [
      { id: 'qualidade-no-atendimento', titulo: 'Qualidade no atendimento', descricao: 'Estudo focado em Qualidade no atendimento', duracao: '45 min', ordem: 1 },
      { id: 'tacnicas-de-abordagem', titulo: 'Técnicas de abordagem', descricao: 'Estudo focado em Técnicas de abordagem', duracao: '45 min', ordem: 2 },
      { id: 'cadigo-de-atica-dos-correios', titulo: 'Código de Ã‰tica dos Correios', descricao: 'Estudo focado em Código de Ã‰tica dos Correios', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-3-correios-agente',
    nome: 'Bloco III - Informática e Logística',
    descricao: 'Conteúdo específico para Correios - Agente de Correios',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Prata',
    profissoes: ['correios-agente'],
    topicos: [
      { id: 'noaaes-de-informatica', titulo: 'Noções de informática', descricao: 'Estudo focado em Noções de informática', duracao: '45 min', ordem: 1 },
      { id: 'operaaaes-logasticas-basicas', titulo: 'Operações logísticas básicas', descricao: 'Estudo focado em Operações logísticas básicas', duracao: '45 min', ordem: 2 },
      { id: 'organizaaao-de-correspondancias', titulo: 'Organização de correspondências', descricao: 'Estudo focado em Organização de correspondências', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-1-ibge-recenseador',
    nome: 'Bloco I - Conhecimentos Técnicos do Censo',
    descricao: 'Conteúdo específico para IBGE - Recenseador/Agente',
    icone: '📚',
    cor: 'from-emerald-500 to-teal-600',
    requiredPlan: 'Prata',
    profissoes: ['ibge-recenseador'],
    topicos: [
      { id: 'manual-do-recenseador', titulo: 'Manual do Recenseador', descricao: 'Estudo focado em Manual do Recenseador', duracao: '45 min', ordem: 1 },
      { id: 'estrutura-dos-setores-censitarios', titulo: 'Estrutura dos setores censitários', descricao: 'Estudo focado em Estrutura dos setores censitários', duracao: '45 min', ordem: 2 },
      { id: 'entrevista-de-campo', titulo: 'Entrevista de campo', descricao: 'Estudo focado em Entrevista de campo', duracao: '45 min', ordem: 3 },
      { id: 'coleta-de-dados', titulo: 'Coleta de dados', descricao: 'Estudo focado em Coleta de dados', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-ibge-recenseador',
    nome: 'Bloco II - Ã‰tica no Serviço Público',
    descricao: 'Conteúdo específico para IBGE - Recenseador/Agente',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Prata',
    profissoes: ['ibge-recenseador'],
    topicos: [
      { id: 'cadigo-de-atica-do-ibge', titulo: 'Código de Ã‰tica do IBGE', descricao: 'Estudo focado em Código de Ã‰tica do IBGE', duracao: '45 min', ordem: 1 },
      { id: 'lei-811290-regime-disciplinar', titulo: 'Lei 8.112/90 (Regime Disciplinar)', descricao: 'Estudo focado em Lei 8.112/90 (Regime Disciplinar)', duracao: '45 min', ordem: 2 },
      { id: 'sigilo-estatastico', titulo: 'Sigilo estatístico', descricao: 'Estudo focado em Sigilo estatístico', duracao: '45 min', ordem: 3 }
    ]
  },
  {
    id: 'bloco-3-ibge-recenseador',
    nome: 'Bloco III - Geografia e Matemática',
    descricao: 'Conteúdo específico para IBGE - Recenseador/Agente',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Prata',
    profissoes: ['ibge-recenseador'],
    topicos: [
      { id: 'geografia-do-brasil', titulo: 'Geografia do Brasil', descricao: 'Estudo focado em Geografia do Brasil', duracao: '45 min', ordem: 1 },
      { id: 'leitura-de-mapas-e-croquis', titulo: 'Leitura de mapas e croquis', descricao: 'Estudo focado em Leitura de mapas e croquis', duracao: '45 min', ordem: 2 },
      { id: 'matematica-basica', titulo: 'Matemática básica', descricao: 'Estudo focado em Matemática básica', duracao: '45 min', ordem: 3 },
      { id: 'calculo-de-taxas-de-resposta', titulo: 'Cálculo de taxas de resposta', descricao: 'Estudo focado em Cálculo de taxas de resposta', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-1-inss-tecnico',
    nome: 'Bloco I - Direito Previdenciário',
    descricao: 'Conteúdo específico para INSS - Técnico do Seguro Social',
    icone: '📚',
    cor: 'from-amber-500 to-orange-600',
    requiredPlan: 'Prata',
    profissoes: ['inss-tecnico'],
    topicos: [
      { id: 'seguridade-social-na-constituiaao', titulo: 'Seguridade Social na Constituição', descricao: 'Estudo focado em Seguridade Social na Constituição', duracao: '45 min', ordem: 1 },
      { id: 'regime-geral-de-previdancia-social', titulo: 'Regime Geral de Previdência Social', descricao: 'Estudo focado em Regime Geral de Previdência Social', duracao: '45 min', ordem: 2 },
      { id: 'segurados-e-dependentes', titulo: 'Segurados e dependentes', descricao: 'Estudo focado em Segurados e dependentes', duracao: '45 min', ordem: 3 },
      { id: 'benefacios-previdenciarios', titulo: 'Benefícios previdenciários', descricao: 'Estudo focado em Benefícios previdenciários', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-2-inss-tecnico',
    nome: 'Bloco II - Direito Administrativo e Constitucional',
    descricao: 'Conteúdo específico para INSS - Técnico do Seguro Social',
    icone: '📚',
    cor: 'from-rose-500 to-pink-600',
    requiredPlan: 'Prata',
    profissoes: ['inss-tecnico'],
    topicos: [
      { id: 'princapios-da-administraaao-pablica', titulo: 'Princípios da Administração Pública', descricao: 'Estudo focado em Princípios da Administração Pública', duracao: '45 min', ordem: 1 },
      { id: 'atos-administrativos', titulo: 'Atos Administrativos', descricao: 'Estudo focado em Atos Administrativos', duracao: '45 min', ordem: 2 },
      { id: 'servidores-pablicos', titulo: 'Servidores Públicos', descricao: 'Estudo focado em Servidores Públicos', duracao: '45 min', ordem: 3 },
      { id: 'direitos-e-garantias-fundamentais', titulo: 'Direitos e garantias fundamentais', descricao: 'Estudo focado em Direitos e garantias fundamentais', duracao: '45 min', ordem: 4 }
    ]
  },
  {
    id: 'bloco-3-inss-tecnico',
    nome: 'Bloco III - Informática e Raciocínio Lógico',
    descricao: 'Conteúdo específico para INSS - Técnico do Seguro Social',
    icone: '📚',
    cor: 'from-violet-500 to-purple-600',
    requiredPlan: 'Prata',
    profissoes: ['inss-tecnico'],
    topicos: [
      { id: 'seguranaa-da-informaaao', titulo: 'Segurança da informação', descricao: 'Estudo focado em Segurança da informação', duracao: '45 min', ordem: 1 },
      { id: 'ferramentas-de-escritario-wordexcel', titulo: 'Ferramentas de escritório (Word/Excel)', descricao: 'Estudo focado em Ferramentas de escritório (Word/Excel)', duracao: '45 min', ordem: 2 },
      { id: 'proposiaaes-lagicas', titulo: 'Proposições lógicas', descricao: 'Estudo focado em Proposições lógicas', duracao: '45 min', ordem: 3 },
      { id: 'resoluaao-de-problemas-quantitativos', titulo: 'Resolução de problemas quantitativos', descricao: 'Estudo focado em Resolução de problemas quantitativos', duracao: '45 min', ordem: 4 }
    ]
  },
];
