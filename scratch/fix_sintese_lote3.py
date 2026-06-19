# -*- coding: utf-8 -*-
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

BASE = r"c:\Workspace\petrobras-quest\src\components\aulas\administracao"

COLORS = ["emerald", "blue", "cyan", "teal", "amber", "rose"]

# --- LOTE 3: CONTEÚDO SEMÂNTICO (GESTÃO DE PROCESSOS E QUALIDADE) ---
AULA_PROCESSOS_DATA = [
    # M1: Conceitos de Processos
    {
        "title": "A Espinha Dorsal",
        "emojis": "🔄 🏭",
        "frase": "Um processo não é o que o departamento faz, é como o valor flui transversalmente até chegar no cliente.",
        "cards": [
            {"title": "Visão Funcional (Vertical)", "desc": "Foco no chefe e no departamento. Gera feudos corporativos ('silos') e gargalos de transição."},
            {"title": "Visão por Processos (Horizontal)", "desc": "Foco no cliente ponta-a-ponta. Quebra as paredes departamentais para dar fluidez ao valor."}
        ]
    },
    # M2: BPM
    {
        "title": "BPM: Muito mais que TI",
        "emojis": "⚙️ 📊",
        "frase": "Automação de um processo ruim apenas faz com que as coisas deem errado muito mais rápido.",
        "cards": [
            {"title": "BPM (Disciplina)", "desc": "Gestão de Processos de Negócio. É uma abordagem gerencial adaptável, não uma tecnologia."},
            {"title": "BPMS (Software)", "desc": "Suite de sistemas (TI) que suporta, executa e monitora a modelagem criada no BPM."}
        ]
    },
    # M3: Modelagem BPMN
    {
        "title": "A Língua dos Processos",
        "emojis": "🗺️ 📐",
        "frase": "BPMN é o 'inglês' da modelagem: todos no mundo, da área de negócios à área de TI, devem entender os mesmos símbolos.",
        "cards": [
            {"title": "Piscinas e Raias (Pool/Lane)", "desc": "Piscina representa a organização. Raias representam os papéis (ex: Financeiro, Comprador)."},
            {"title": "Gateways (Losangos)", "desc": "Controlam a divergência e convergência do fluxo (Ex: Decisão Exclusiva XOR, Paralela AND)."}
        ]
    },
    # M4: Mapeamento AS-IS / TO-BE
    {
        "title": "O Ponto A e o Ponto B",
        "emojis": "📸 🚀",
        "frase": "Você não pode melhorar o que não compreende. O 'AS-IS' é o choque de realidade.",
        "cards": [
            {"title": "AS-IS (Como está)", "desc": "Fotografia do processo atual, com todos os seus defeitos, atrasos e gargalos. Pé no chão."},
            {"title": "TO-BE (Como será)", "desc": "O desenho do processo futuro, otimizado e alinhado aos objetivos estratégicos."}
        ]
    },
    # M5: Melhoria Contínua
    {
        "title": "Evolução vs Revolução",
        "emojis": "📈 🔥",
        "frase": "Kaizen é subir um degrau por dia. Reengenharia é implodir a escada e instalar um elevador.",
        "cards": [
            {"title": "Melhoria Contínua (Kaizen)", "desc": "Mudanças incrementais, participativas, de baixo risco e baixo custo. Foco no dia a dia."},
            {"title": "Reengenharia", "desc": "Redesenho radical. Começa com uma 'folha em branco'. Alto risco, alto custo, impacto disruptivo."}
        ]
    },
    # M6: Indicadores de Processos
    {
        "title": "Medir para Gerenciar",
        "emojis": "⏱️ 🎯",
        "frase": "Se você não mede, não gerencia. Se não gerencia, não melhora.",
        "cards": [
            {"title": "Indicador de Eficiência", "desc": "Foco no uso de recursos (tempo, custo, esforço) DURANTE o processo. Fazer certo a coisa."},
            {"title": "Indicador de Eficácia", "desc": "Foco no resultado FINAL. O produto atingiu a meta ou agradou o cliente? Fazer a coisa certa."}
        ]
    },
    # M7: Automação e Transformação
    {
        "title": "O Robô e o Humano",
        "emojis": "🤖 🤝",
        "frase": "A tecnologia RPA (Robotic Process Automation) tira o robô de dentro do humano, deixando o trabalho cognitivo livre.",
        "cards": [
            {"title": "RPA", "desc": "Softwares que imitam ações humanas repetitivas (cliques, extração de dados)."},
            {"title": "Transformação Digital", "desc": "Não é só colocar um software. É mudar o modelo de negócios e a cultura apoiado pela TI."}
        ]
    },
    # M8: Gestão da Qualidade
    {
        "title": "Qualidade Integrada",
        "emojis": "💎 🛠️",
        "frase": "A qualidade deixou de ser inspeção no final da linha e passou a ser o design preventivo do processo inteiro.",
        "cards": [
            {"title": "Conformidade", "desc": "Atender estritamente aos requisitos técnicos desenhados no processo."},
            {"title": "Garantia da Qualidade", "desc": "Ações planejadas e sistemáticas para dar confiança de que o processo entregará valor."}
        ]
    },
    # M9: Aplicações Petrobras
    {
        "title": "Integração na Cadeia O&G",
        "emojis": "🛢️ 🔗",
        "frase": "Na Petrobras, um atraso no processo de suprimentos pode parar uma sonda que custa milhões de dólares por dia.",
        "cards": [
            {"title": "Processo Core (Fim)", "desc": "Exploração, Produção e Refino. Trazem dinheiro direto para a empresa."},
            {"title": "Processo de Suporte (Meio)", "desc": "Suprimentos, RH e TI. Viabilizam a execução impecável dos processos Core."}
        ]
    },
    # M10: Simulado Geral
    {
        "title": "Armadilhas de Prova",
        "emojis": "📝 🚧",
        "frase": "A CESGRANRIO ama confundir os conceitos de Macroprocesso, Processo, Subprocesso e Tarefa.",
        "cards": [
            {"title": "Níveis de Abstração", "desc": "Macroprocesso é o nível mais alto (Ex: Gestão de RH). Tarefa é o mais baixo (Ex: Imprimir folha)."},
            {"title": "Projeto vs Processo", "desc": "Projeto tem fim determinado e é único. Processo é contínuo e repetitivo."}
        ]
    }
]

AULA_QUALIDADE_DATA = [
    # M1: Fundamentos
    {
        "title": "O que é Qualidade?",
        "emojis": "🏆 ⭐",
        "frase": "A qualidade não é 'luxo'; é a total adequação ao uso pelo cliente ao menor custo possível.",
        "cards": [
            {"title": "Visão Tradicional", "desc": "Qualidade é não ter defeitos (conformidade com especificações técnicas)."},
            {"title": "Visão Moderna", "desc": "Qualidade é encantar o cliente superando suas expectativas explícitas e implícitas."}
        ]
    },
    # M2: Eras da Qualidade
    {
        "title": "Evolução Histórica",
        "emojis": "⏳ 🏭",
        "frase": "A humanidade saiu da punição do erro na esteira de produção para a prevenção total do erro na estratégia da empresa.",
        "cards": [
            {"title": "Inspeção", "desc": "O foco é no PRODUTO final. Separa o bom do ruim e joga o ruim fora (custo alto)."},
            {"title": "Controle Estatístico", "desc": "O foco é no PROCESSO. Usa amostras para intervir antes que o lote inteiro estrague."}
        ]
    },
    # M3: Gurus da Qualidade
    {
        "title": "Os Mestres do Método",
        "emojis": "🧠 🥋",
        "frase": "Deming pregou a melhoria contínua (PDCA); Juran focou no tripé (Planejamento, Controle, Melhoria); Ishikawa trouxe a espinha de peixe.",
        "cards": [
            {"title": "Deming (14 Princípios)", "desc": "O medo é inimigo da qualidade. A culpa pelo defeito é 85% do sistema/gestão e 15% do operador."},
            {"title": "Crosby (Zero Defeito)", "desc": "'Fazer certo da primeira vez'. A qualidade não custa nada; o que custa caro é o retrabalho."}
        ]
    },
    # M4: Ferramentas da Qualidade
    {
        "title": "O Canivete Suíço",
        "emojis": "🔧 📊",
        "frase": "Ishikawa dizia que 95% dos problemas de uma empresa podem ser resolvidos com 7 ferramentas básicas.",
        "cards": [
            {"title": "Diagrama de Pareto (80/20)", "desc": "Priorização. 80% dos problemas vêm de 20% das causas. Foque nos 'poucos vitais'."},
            {"title": "Diagrama de Ishikawa", "desc": "Causa e Efeito (Espinha de Peixe). Mapeia as raízes do problema (6Ms: Método, Material, Mão-de-obra...)"}
        ]
    },
    # M5: Normas ISO
    {
        "title": "A Linguagem Global",
        "emojis": "🌐 📜",
        "frase": "A ISO 9001 não diz COMO você deve fazer o seu produto, diz como você deve GERENCIAR o seu sistema.",
        "cards": [
            {"title": "ISO 9000", "desc": "Vocabulário e Fundamentos. Não gera certificação."},
            {"title": "ISO 9001", "desc": "Requisitos do Sistema de Gestão da Qualidade (SGQ). É a única que confere CERTIFICAÇÃO à empresa."}
        ]
    },
    # M6: Six Sigma e Lean
    {
        "title": "Velocidade e Precisão",
        "emojis": "⚡ 🎯",
        "frase": "O Lean elimina a 'gordura' (desperdícios); o Six Sigma elimina a variação (defeitos). Juntos, formam excelência.",
        "cards": [
            {"title": "Lean Manufacturing", "desc": "Foco na velocidade e fluxo. Combate os 7 desperdícios (superprodução, espera, transporte...)."},
            {"title": "Six Sigma", "desc": "Foco na redução drástica da variabilidade (Méta: 3,4 defeitos por milhão de oportunidades) via roteiro DMAIC."}
        ]
    },
    # M7: Controle Estatístico
    {
        "title": "A Matemática do Erro",
        "emojis": "📈 📐",
        "frase": "Variações sempre vão existir; a gestão precisa saber se o processo está previsível (causas comuns) ou fora de controle (causas especiais).",
        "cards": [
            {"title": "Causa Comum (Aleatória)", "desc": "Inerente ao sistema (ex: desgaste natural da máquina). Exige mudança na engenharia/gestão."},
            {"title": "Causa Especial (Atribuível)", "desc": "Fato anormal (ex: pico de energia, ferramenta quebrou). Exige ação imediata no chão de fábrica."}
        ]
    },
    # M8: Auditoria
    {
        "title": "Verificando a Conformidade",
        "emojis": "🔍 ✔️",
        "frase": "Auditoria de qualidade não é uma caça às bruxas buscando culpados, mas sim a validação de que os processos desenhados são seguidos.",
        "cards": [
            {"title": "Auditoria Interna (1ª Parte)", "desc": "Feita pela própria organização. Foco na auto-avaliação e preparação preventiva."},
            {"title": "Auditoria de Certificação (3ª Parte)", "desc": "Feita por órgãos externos independentes (ex: BSI, BVQI) para conferir o selo ISO."}
        ]
    },
    # M9: Qualidade na Petrobras
    {
        "title": "Risco e Conformidade",
        "emojis": "🛢️ 🛡️",
        "frase": "Numa refinaria, falta de qualidade não significa apenas um cliente chateado; significa risco ambiental e de vida severo.",
        "cards": [
            {"title": "Gestão SMS", "desc": "Saúde, Meio Ambiente e Segurança são indissociáveis da Qualidade na Petrobras (Sistema Integrado)."},
            {"title": "Qualificação de Fornecedores", "desc": "Garantir a Qualidade exige auditar profundamente o fornecedor antes mesmo de ele fornecer a primeira peça."}
        ]
    },
    # M10: Simulado
    {
        "title": "Pegadinhas das Eras",
        "emojis": "📝 🚧",
        "frase": "As bancas adoram afirmar que a 'Era da Inspeção' sumiu. Mentira. Ela foi englobada, não extinta.",
        "cards": [
            {"title": "Pareto vs Ishikawa", "desc": "Pareto = 'O QUE devo atacar primeiro?' Ishikawa = 'POR QUE esse problema aconteceu?'."},
            {"title": "ISO", "desc": "Lembre-se: A ISO 9001 certifica o 'Sistema de Gestão', não garante que o produto em si tenha alta tecnologia ou luxo."}
        ]
    }
]

def generate_premium_jsx(data):
    cards = data['cards']
    cols = 2 if len(cards) <= 2 else 3
    
    jsx = f'sinteseEstrategica={{{{\n'
    jsx += f'            title: "{data["title"]}",\n'
    jsx += f'            content: (\n'
    jsx += f'              <>\n'
    jsx += f'                <div className="text-6xl my-6 animate-pulse text-center">{data["emojis"]}</div>\n'
    jsx += f'                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">\n'
    jsx += f'                  "{data["frase"]}"\n'
    jsx += f'                </p>\n'
    jsx += f'                <div className="grid grid-cols-1 md:grid-cols-{cols} gap-6 mt-8 text-left">\n'
    
    for i, card in enumerate(cards):
        color = COLORS[i % len(COLORS)]
        jsx += f'                  <div className="p-4 bg-{color}-500/5 border border-{color}-500/20 rounded-xl">\n'
        jsx += f'                    <h4 className="text-lg font-bold text-{color}-600 dark:text-{color}-400 mb-2">\n'
        jsx += f'                      {card["title"]}\n'
        jsx += f'                    </h4>\n'
        jsx += f'                    <p className="text-lg text-muted-foreground italic">\n'
        jsx += f'                      {card["desc"]}\n'
        jsx += f'                    </p>\n'
        jsx += f'                    <p className="text-sm mt-2 font-medium text-{color}-700 dark:text-{color}-300">\n'
        jsx += f'                      DIRETRIZ TÁTICA: Aplicação direta. ✅\n'
        jsx += f'                    </p>\n'
        jsx += f'                  </div>\n'
        
    jsx += f'                </div>\n'
    jsx += f'              </>\n'
    jsx += f'            )\n'
    jsx += f'          }}}}'
    return jsx

def refactor_file(filename, dataset):
    fp = os.path.join(BASE, filename)
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r'sinteseEstrategica=\{\{.*?\}\}(?=\s*(?:audio|variant)=|\s*/>)'
    
    match_count = 0
    def replacer(match):
        nonlocal match_count
        if match_count < len(dataset):
            new_jsx = generate_premium_jsx(dataset[match_count])
            match_count += 1
            return new_jsx
        else:
            new_jsx = generate_premium_jsx({"title": "Bônus", "emojis": "✨", "frase": "Revisão Final.", "cards": [{"title": "Foco", "desc": "Atente-se aos detalhes."}]})
            match_count += 1
            return new_jsx

    new_content, count = re.subn(pattern, replacer, content, flags=re.DOTALL)
    
    if count > 0:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"[+] {filename}: {count} módulos atualizados com SEMÂNTICA REAL.")
    else:
        print(f"[-] {filename}: Nenhuma sintese encontrada.")

print("="*60)
print("INJETANDO CONTEÚDO SEMÂNTICO (LOTE 3)")
print("="*60)

refactor_file("AulaGestaoProcessos.tsx", AULA_PROCESSOS_DATA)
refactor_file("AulaGestaoQualidadeSuprimento.tsx", AULA_QUALIDADE_DATA)

print("\n[CONCLUÍDO]")
