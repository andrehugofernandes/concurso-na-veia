# -*- coding: utf-8 -*-
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

BASE = r"c:\Workspace\petrobras-quest\src\components\aulas\administracao"

COLORS = ["emerald", "blue", "cyan", "teal", "amber", "rose"]

# --- LOTE 1: CONTEÚDO SEMÂNTICO (ADMINISTRAÇÃO GERAL SUPRIMENTO) ---
AULA_GERAL_DATA = [
    # M1: Fundamentos
    {
        "title": "Habilidades de Katz",
        "emojis": "🧠 🔧",
        "frase": "Não confunda os níveis: no topo, a visão é conceitual; na base, a execução é técnica.",
        "cards": [
            {"title": "Habilidade Conceitual (Estratégico)", "desc": "Visão do todo. Necessária para a Alta Administração planejar a longo prazo."},
            {"title": "Habilidade Técnica (Operacional)", "desc": "Saber 'fazer'. Fundamental para supervisores de primeira linha."}
        ]
    },
    # M2: PODC
    {
        "title": "As 4 Funções Administrativas",
        "emojis": "⚙️ 📊",
        "frase": "O Planejamento é a bússola, a Organização é o motor, a Direção é o volante e o Controle é o velocímetro.",
        "cards": [
            {"title": "Planejamento (Futuro)", "desc": "Define objetivos e metas. Responde à pergunta: Onde queremos chegar?"},
            {"title": "Controle (Avaliação)", "desc": "Mede resultados e aplica ações corretivas. Trabalha em conjunto com o Planejamento."}
        ]
    },
    # M3: Estruturas
    {
        "title": "Desenho Organizacional",
        "emojis": "🏢 🏗️",
        "frase": "A estrutura de uma empresa deve seguir a sua estratégia, nunca o contrário.",
        "cards": [
            {"title": "Estrutura Funcional", "desc": "Especialização e economia de escala, mas sofre com 'silos' e falta de comunicação cruzada."},
            {"title": "Estrutura Matricial", "desc": "Quebra o princípio da unidade de comando. O funcionário responde a dois chefes simultaneamente."}
        ]
    },
    # M4: Comportamento
    {
        "title": "Clima vs Cultura",
        "emojis": "🌤️ 🧬",
        "frase": "A cultura é o DNA da empresa (difícil de mudar), o clima é como as pessoas se sentem hoje (fotografia do momento).",
        "cards": [
            {"title": "Clima Organizacional", "desc": "Percepção psicológica dos funcionários. Alterável a curto/médio prazo através de incentivos."},
            {"title": "Cultura (Iceberg)", "desc": "Valores, crenças e pressupostos básicos. A mudança estrutural exige tempo e esforço profundo."}
        ]
    },
    # M5: Gestão por Processos
    {
        "title": "Foco NO Processo",
        "emojis": "🔄 📈",
        "frase": "O cliente não vê o seu departamento; ele vê o fluxo contínuo do valor que você entrega.",
        "cards": [
            {"title": "Gestão DE Processos (Tradicional)", "desc": "Foco departamental. Otimiza partes isoladas, gerando gargalos nas transições."},
            {"title": "Gestão POR Processos (Moderno)", "desc": "Visão transversal (ponta a ponta). Quebra as barreiras hierárquicas focando no cliente."}
        ]
    },
    # M6: Teorias
    {
        "title": "Evolução do Pensamento",
        "emojis": "🕰️ 💡",
        "frase": "De Taylor (tarefa) a Mayo (pessoas) e Contingência (ambiente): a resposta agora é 'Depende'.",
        "cards": [
            {"title": "Taylor & Fayol (Clássicos)", "desc": "Abordagem prescritiva, mecanicista e de sistema fechado. O homem como engrenagem."},
            {"title": "Teoria da Contingência", "desc": "Não há 'única maneira melhor'. A estrutura ótima depende da tecnologia e do ambiente externo."}
        ]
    },
    # M7: Comunicação e Conflito
    {
        "title": "Gestão de Conflitos",
        "emojis": "🗣️ 🤝",
        "frase": "Conflitos não são intrinsecamente maus. Um nível moderado de tensão estimula a inovação.",
        "cards": [
            {"title": "Abordagem Tradicional", "desc": "Todo conflito é ruim e deve ser evitado ou suprimido pela chefia."},
            {"title": "Abordagem Interacionista", "desc": "Um grupo pacífico demais torna-se apático. O conflito funcional é incentivado."}
        ]
    },
    # M8: Decisão
    {
        "title": "Modelos Decisórios",
        "emojis": "⚖️ 🧠",
        "frase": "Nenhum gestor possui 'racionalidade absoluta'. O ótimo é substituído pelo satisfatório.",
        "cards": [
            {"title": "Decisão Programada", "desc": "Problemas rotineiros e bem estruturados. Soluções através de regras e procedimentos padrão."},
            {"title": "Racionalidade Limitada (Simon)", "desc": "Decisores buscam a solução 'boa o suficiente' devido a limites cognitivos e de informação."}
        ]
    },
    # M9: Petrobras
    {
        "title": "Estratégia Petrobras",
        "emojis": "🛢️ 🎯",
        "frase": "A Petrobras opera num ambiente hiper-complexo. A transição energética guia seu planejamento estratégico atual.",
        "cards": [
            {"title": "Visão de Longo Prazo", "desc": "Foco em rentabilidade no pré-sal combinado com responsabilidade em descarbonização."},
            {"title": "Compliance Sistêmico", "desc": "Governança rígida (Lei 13.303) molda a função controle para prevenir desvios de conduta."}
        ]
    },
    # M10: Simulado
    {
        "title": "Gatilhos da CESGRANRIO",
        "emojis": "📝 🛡️",
        "frase": "Cuidado com advérbios absolutistas em provas de Administração: 'sempre', 'nunca', 'exclusivamente' geralmente tornam a assertiva falsa.",
        "cards": [
            {"title": "Extrapolação", "desc": "Afirmar que uma técnica moderna (ex: reengenharia) descarta totalmente princípios clássicos (Fayol)."},
            {"title": "Redução / Confusão", "desc": "Trocar o conceito de Eficácia (atingir metas) pelo conceito de Eficiência (fazer certo)."}
        ]
    }
]

# --- LOTE 1: CONTEÚDO SEMÂNTICO (ADMINISTRAÇÃO TRIBUTÁRIA) ---
# Terei que ler a AulaAdministracaoTributaria.tsx para saber quais são os 10 módulos, mas vou gerar conceitos chave de ADM Tributária (CTN) genéricos mas corretos:
AULA_TRIBUTARIA_DATA = [
    # M1: Competência e Capacidade
    {
        "title": "Competência vs Capacidade Ativa",
        "emojis": "🏛️ ✍️",
        "frase": "A competência é política e indelegável; a capacidade de arrecadar é administrativa e delegável.",
        "cards": [
            {"title": "Competência Tributária", "desc": "Atribuição constitucional para criar impostos. Intransferível, imprescritível e irrenunciável."},
            {"title": "Capacidade Tributária Ativa", "desc": "Pode ser delegada a outras pessoas de direito público (ex: INSS cobrando contribuições)."}
        ]
    },
    # M2: Obrigação Tributária
    {
        "title": "Principal vs Acessória",
        "emojis": "📜 🔗",
        "frase": "No Direito Tributário, o acessório NÃO segue o principal. São independentes.",
        "cards": [
            {"title": "Obrigação Principal", "desc": "Pagar o tributo ou a multa. Tem natureza patrimonial e surge com o fato gerador."},
            {"title": "Obrigação Acessória", "desc": "Fazer ou não fazer (ex: emitir nota). O descumprimento gera uma multa (nova obrigação principal)."}
        ]
    },
    # M3: Sujeição Passiva
    {
        "title": "Contribuinte vs Responsável",
        "emojis": "👤 👥",
        "frase": "O contribuinte realiza o fato gerador; o responsável é escolhido pela lei por comodidade fiscal.",
        "cards": [
            {"title": "Contribuinte (Direto)", "desc": "Pessoa que tem relação pessoal e direta com a situação que constitui o fato gerador."},
            {"title": "Responsável (Indireto)", "desc": "A lei o obriga a pagar a dívida de terceiros (Ex: Fonte pagadora retendo IR)."}
        ]
    },
    # M4: Lançamento
    {
        "title": "Modalidades de Lançamento",
        "emojis": "🧮 🔍",
        "frase": "A maioria dos tributos modernos usa o Lançamento por Homologação, invertendo o ônus da ação para o sujeito passivo.",
        "cards": [
            {"title": "De Ofício (Direto)", "desc": "A autoridade faz tudo sozinha (ex: IPVA, IPTU). Baseado em cadastro."},
            {"title": "Por Homologação", "desc": "O sujeito apura, declara e paga antecipadamente (ex: ICMS, IR). Fisco só confere depois."}
        ]
    },
    # M5: Suspensão da Exigibilidade
    {
        "title": "MODELI - Hipóteses de Suspensão",
        "emojis": "⏸️ 🛡️",
        "frase": "Moratória, Depósito, Recursos e Liminares congelam a cobrança, mas NÃO apagam a dívida.",
        "cards": [
            {"title": "Rol Taxativo", "desc": "Somente as causas expressas no Art. 151 do CTN suspendem a cobrança. Não cabe analogia."},
            {"title": "Efeito Prático", "desc": "O Fisco continua tendo o direito ao crédito, mas fica impedido de cobrar e ajuizar execução fiscal."}
        ]
    },
    # M6: Extinção do Crédito
    {
        "title": "Decadência vs Prescrição",
        "emojis": "⏳ 🚫",
        "frase": "A Decadência mata o direito de lançar; a Prescrição mata o direito de cobrar o que já foi lançado.",
        "cards": [
            {"title": "Decadência (Constituição)", "desc": "Prazo de 5 anos para o Fisco realizar o lançamento a partir do fato gerador."},
            {"title": "Prescrição (Ação)", "desc": "Prazo de 5 anos para o Fisco ingressar com a Execução Fiscal após a constituição definitiva."}
        ]
    },
    # M7: Exclusão do Crédito
    {
        "title": "Isenção vs Anistia",
        "emojis": "🎁 🕊️",
        "frase": "Isenção dispensa o tributo antes de ele nascer; a Anistia perdoa as penalidades (multas) já cometidas.",
        "cards": [
            {"title": "Isenção", "desc": "Dispensa legal do pagamento do tributo. Atua na obrigação principal antes do lançamento."},
            {"title": "Anistia", "desc": "Perdão APENAS de infrações (multas). Não abrange o tributo em si. O perdão retroage a fatos passados."}
        ]
    },
    # M8: Garantias e Privilégios
    {
        "title": "O Super-Crédito Tributário",
        "emojis": "👑 🏦",
        "frase": "Em um concurso de credores (falência), o crédito tributário só perde para os trabalhistas e as garantias reais.",
        "cards": [
            {"title": "Ordem de Preferência", "desc": "1º Trabalhista (limitado), 2º Garantia Real, 3º TRIBUTÁRIO, 4º Quirografários."},
            {"title": "Multas Tributárias", "desc": "Atenção: Na falência, as multas perdem seu privilégio tributário e caem na fila (subquirografárias)."}
        ]
    },
    # M9: Processo Administrativo
    {
        "title": "A Busca da Verdade Material",
        "emojis": "⚖️ 📁",
        "frase": "O Processo Administrativo Fiscal permite revisão do lançamento sem as custas do Judiciário e suspende a exigibilidade.",
        "cards": [
            {"title": "Verdade Material", "desc": "No PAF, busca-se a verdade real dos fatos, superando as formalidades estritas do processo civil."},
            {"title": "Duplo Grau (Instâncias)", "desc": "Garantia de recurso. Julgamento por juntas mistas (Fisco e Contribuintes - CARF)."}
        ]
    },
    # M10: Simulado
    {
        "title": "Armadilhas Clássicas de Prova",
        "emojis": "🎯 🪤",
        "frase": "As bancas amam trocar Decadência por Prescrição e Isenção por Imunidade. Leia o comando com atenção redobrada.",
        "cards": [
            {"title": "Imunidade vs Isenção", "desc": "Imunidade está na Constituição (proibição de tributar). Isenção está em Lei (dispensa de cobrar)."},
            {"title": "Multa vs Tributo", "desc": "Obrigação acessória convertida em principal não vira 'tributo', vira penalidade pecuniária."}
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
        return match.group(0)

    new_content, count = re.subn(pattern, replacer, content, flags=re.DOTALL)
    
    if count > 0:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"[+] {filename}: {count} módulos atualizados com SEMÂNTICA REAL.")
    else:
        print(f"[-] {filename}: Nenhuma sintese encontrada.")

print("="*60)
print("INJETANDO CONTEÚDO SEMÂNTICO (LOTE 1)")
print("="*60)

refactor_file("AulaAdministracaoGeralSuprimento.tsx", AULA_GERAL_DATA)
refactor_file("AulaAdministracaoTributaria.tsx", AULA_TRIBUTARIA_DATA)

print("\n[CONCLUÍDO]")
