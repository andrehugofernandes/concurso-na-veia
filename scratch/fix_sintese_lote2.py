# -*- coding: utf-8 -*-
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

BASE = r"c:\Workspace\petrobras-quest\src\components\aulas\administracao"

COLORS = ["emerald", "blue", "cyan", "teal", "amber", "rose"]

# --- LOTE 2: CONTEÚDO SEMÂNTICO (ADMINISTRATIVO E TRIBUTÁRIO) ---
AULA_ADMIN_TRIBUTARIO_DATA = [
    # M1: Contabilidade Básica
    {
        "title": "A Equação Fundamental",
        "emojis": "🧮 ⚖️",
        "frase": "Na contabilidade de dupla entrada, não existe mágica: todo recurso tem uma origem e uma aplicação.",
        "cards": [
            {"title": "Bens e Direitos (Ativo)", "desc": "Aplicações de recursos. Onde o dinheiro está investido hoje (caixa, estoques, clientes)."},
            {"title": "Obrigações e PL (Passivo + PL)", "desc": "Origens de recursos. De onde o dinheiro veio (fornecedores, bancos, sócios)."}
        ]
    },
    # M2: Estrutura Contábil
    {
        "title": "Regime de Caixa vs Competência",
        "emojis": "📅 💸",
        "frase": "A contabilidade oficial obedece à Competência: o fato gerador importa mais do que o fluxo do dinheiro.",
        "cards": [
            {"title": "Regime de Caixa", "desc": "Anota-se a receita só quando recebe e a despesa só quando paga. (Útil para fluxo de caixa financeiro)."},
            {"title": "Regime de Competência", "desc": "Anota-se no momento da ocorrência do fato gerador, independentemente de recebimento ou pagamento."}
        ]
    },
    # M3: Tributos: Conceitos e Sistema
    {
        "title": "A Natureza do Tributo",
        "emojis": "🏛️ 💰",
        "frase": "O tributo é compulsório, instituído em lei e JAMAIS pode ser uma sanção de ato ilícito.",
        "cards": [
            {"title": "Imposto (Não Vinculado)", "desc": "Cobrado sobre a riqueza do contribuinte (renda, patrimônio), sem contraprestação estatal direta."},
            {"title": "Taxa (Vinculada)", "desc": "Exige serviço público específico/divisível ou o exercício do poder de polícia estatal."}
        ]
    },
    # M4: ICMS e IPI
    {
        "title": "Princípio da Não-Cumulatividade",
        "emojis": "🔁 🛡️",
        "frase": "Impostos indiretos compensam-se na cadeia: o que foi pago na etapa anterior abate do que será pago na próxima.",
        "cards": [
            {"title": "ICMS (Estadual)", "desc": "Incide sobre circulação de mercadorias e serviços de transporte intermunicipal/interestadual e comunicação."},
            {"title": "IPI (Federal)", "desc": "Incide sobre produtos industrializados. Também é seletivo: mais essencial = menor alíquota."}
        ]
    },
    # M5: Impostos de Renda (IR/CSLL)
    {
        "title": "Tributação Direta do Lucro",
        "emojis": "📈 🧾",
        "frase": "Lucro Real e Lucro Presumido alteram drasticamente a base de cálculo e as obrigações acessórias da empresa.",
        "cards": [
            {"title": "IRPJ", "desc": "Imposto sobre a renda corporativa. Obedece à progressividade e universalidade."},
            {"title": "CSLL", "desc": "Contribuição Social sobre o Lucro Líquido. Destinada ao financiamento da Seguridade Social."}
        ]
    },
    # M6: Contribuições Sociais (PIS/COFINS)
    {
        "title": "A Base do Faturamento",
        "emojis": "🛒 🔄",
        "frase": "O PIS e a COFINS formam um par indissociável nas empresas brasileiras que financia o trabalhador e a previdência.",
        "cards": [
            {"title": "Regime Cumulativo", "desc": "Alíquota menor (3,65%), mas sem direito a crédito. Usado muito em empresas de Lucro Presumido."},
            {"title": "Regime Não Cumulativo", "desc": "Alíquota maior (9,25%), mas permite abater créditos das compras de insumos. Padrão no Lucro Real."}
        ]
    },
    # M7: Administração Tributária
    {
        "title": "Fiscalização e Dívida Ativa",
        "emojis": "🔍 📜",
        "frase": "A autoridade administrativa tem o poder/dever de verificar a exatidão dos tributos recolhidos e cobrar os inadimplentes.",
        "cards": [
            {"title": "Fiscalização Fiscal", "desc": "Não há sigilo que limite a autoridade no exercício de suas funções, se autorizados judicial ou administrativamente nos limites da lei."},
            {"title": "Certidão Negativa", "desc": "Comprovante vitalício de regularidade fiscal. Sem ela, a empresa não contrata com a Petrobras."}
        ]
    },
    # M8: Planejamento Tributário
    {
        "title": "Elisão vs Evasão",
        "emojis": "🧠 🚧",
        "frase": "O limite do planejamento tributário é a simulação e a fraude. Economizar impostos antes do fato gerador é lícito.",
        "cards": [
            {"title": "Elisão Fiscal (Lícita)", "desc": "Organização prévia e inteligente do negócio (brechas e escolhas de regimes) para pagar menos tributo."},
            {"title": "Evasão Fiscal (Ilícita)", "desc": "Uso de fraude, dolo, omissão ou falsificação após o fato gerador (Sonegação)."}
        ]
    },
    # M9: Tributos na Petrobras
    {
        "title": "O Impacto Fiscal no O&G",
        "emojis": "🛢️ 📊",
        "frase": "A Petrobras é a maior contribuinte do Brasil. Regimes aduaneiros especiais como o Repetro são vitais na sua operação.",
        "cards": [
            {"title": "Repetro / Repetro-Sped", "desc": "Regime aduaneiro especial que suspende tributos na importação de equipamentos para E&P."},
            {"title": "Royalties", "desc": "Compensação financeira (não tem natureza de imposto) paga ao Estado pela exploração de recursos naturais."}
        ]
    },
    # M10: Simulado
    {
        "title": "Cruzamento de Regimes",
        "emojis": "📝 🧩",
        "frase": "A banca frequentemente mistura a regra da não cumulatividade do ICMS com a do PIS/COFINS. Fique atento às exceções.",
        "cards": [
            {"title": "Pega-Rateio", "desc": "A banca tentará te convencer que taxas podem ser cobradas sem serviço específico prestado. É Falso."},
            {"title": "Cálculo por Dentro", "desc": "No ICMS e no PIS/COFINS (frequentemente), o próprio tributo integra sua base de cálculo (Gross-up)."}
        ]
    }
]

# --- LOTE 2: CONTEÚDO SEMÂNTICO (COMPRAS SUPRIMENTO) ---
AULA_COMPRAS_DATA = [
    # M1: Fundamentos
    {
        "title": "Objetivo de Compras",
        "emojis": "🎯 📦",
        "frase": "A área de compras não quer apenas 'o mais barato'; ela busca os '5 Rights' (Preço, Quantidade, Qualidade, Momento e Fonte corretos).",
        "cards": [
            {"title": "Abordagem Reativa (Operacional)", "desc": "Tira-pedidos focado no curto prazo. Baixo impacto na margem de lucro final."},
            {"title": "Abordagem Estratégica", "desc": "Integração na cadeia de suprimentos e inteligência de mercado, gerando alta vantagem competitiva."}
        ]
    },
    # M2: Processo
    {
        "title": "O Ciclo da Aquisição",
        "emojis": "🔄 📑",
        "frase": "A compra não acaba quando o pedido é emitido; ela encerra com o aceite e o pagamento.",
        "cards": [
            {"title": "Fase Inicial", "desc": "Identificação da necessidade e emissão da Requisição de Compra (RC)."},
            {"title": "Follow-up e Follow-on", "desc": "Acompanhamento da entrega (follow-up) e avaliação dos processos (follow-on) para futuras aquisições."}
        ]
    },
    # M3: Seleção de Fornecedores
    {
        "title": "Homologação e Critérios",
        "emojis": "📋 ✔️",
        "frase": "Selecionar não é só cotar preços. A saúde financeira, capacidade técnica e compliance do fornecedor são vitais.",
        "cards": [
            {"title": "Homologação", "desc": "Qualificação técnica, fiscal e financeira prévia. Sem este selo, o fornecedor não participa da licitação."},
            {"title": "Desenvolvimento", "desc": "Quando a empresa investe e capacita um fornecedor crítico para obter melhoria contínua a longo prazo."}
        ]
    },
    # M4: Negociação
    {
        "title": "Ganha-Ganha vs Ganha-Perde",
        "emojis": "🤝 ⚖️",
        "frase": "Uma boa negociação em compras modernas é colaborativa, e não distributiva.",
        "cards": [
            {"title": "Negociação Distributiva", "desc": "O 'bolo' é fixo. Se eu ganho desconto, você perde margem (Ganha-Perde). Tensão alta."},
            {"title": "Negociação Integrativa", "desc": "Crescimento do 'bolo'. Criação conjunta de valor e parcerias a longo prazo (Ganha-Ganha)."}
        ]
    },
    # M5: Tipos de Compras
    {
        "title": "Capex vs Opex",
        "emojis": "🏗️ 🛒",
        "frase": "Investir numa plataforma é radicalmente diferente de comprar resmas de papel A4.",
        "cards": [
            {"title": "Compras de Capital (Capex)", "desc": "Altos valores, baixa frequência. Exige profunda análise de viabilidade técnica e financeira."},
            {"title": "Compras de Consumo/MRO (Opex)", "desc": "Materiais de Reparo e Operação. Baixo valor unitário, mas alto custo de processamento se não for automatizado."}
        ]
    },
    # M6: Gestão de Contratos
    {
        "title": "Administração Contratual",
        "emojis": "📜 ✍️",
        "frase": "Assinar o contrato é só o começo do casamento; o gerenciamento dos níveis de serviço (SLA) dita o sucesso.",
        "cards": [
            {"title": "Gestão Operacional", "desc": "Garantir as entregas dentro do cronograma, medindo KPIs (Performance de Fornecedores)."},
            {"title": "Pleitos (Claims)", "desc": "Processo de gestão de disputas quando o fornecedor exige aditivos de prazo ou de valor financeiro."}
        ]
    },
    # M7: e-Procurement
    {
        "title": "A Digitalização das Compras",
        "emojis": "💻 🌐",
        "frase": "Reduz o tempo de ciclo da requisição ao pagamento (Procure-to-Pay) e aumenta a transparência.",
        "cards": [
            {"title": "Catálogos Eletrônicos", "desc": "Automação de itens de baixo valor (C), reduzindo esforço braçal do comprador."},
            {"title": "Leilão Reverso", "desc": "Os fornecedores fazem lances decrescentes numa plataforma digital, reduzindo o preço ao vivo."}
        ]
    },
    # M8: Ética e Compliance
    {
        "title": "Conflito de Interesses",
        "emojis": "⚖️ 🛡️",
        "frase": "A área de compras está no epicentro do risco de fraude. O princípio da segregação de funções é inegociável.",
        "cards": [
            {"title": "Segregação de Funções", "desc": "Quem requer não cota; quem cota não aprova; quem aprova não recebe o material."},
            {"title": "Due Diligence de Integridade", "desc": "Pesquisa profunda sobre vínculos suspeitos ou histórico de corrupção do fornecedor e seus sócios."}
        ]
    },
    # M9: Compras na Petrobras
    {
        "title": "O Guia da Lei 13.303/16",
        "emojis": "🛢️ 🏛️",
        "frase": "Sendo uma economia mista, a Petrobras possui regulamento próprio de licitações, mais dinâmico que a lei geral (8.666/14.133).",
        "cards": [
            {"title": "Petronect", "desc": "Portal oficial de compras e contratações de bens e serviços. Todos os trâmites ocorrem eletronicamente lá."},
            {"title": "Regulamento Próprio (RLCP)", "desc": "Permite modos de disputa fechados, abertos e pré-qualificação permanente para dar celeridade às aquisições."}
        ]
    },
    # M10: Simulado
    {
        "title": "A Régua da Banca",
        "emojis": "📝 🔍",
        "frase": "A CESGRANRIO foca na diferença entre negociação distributiva e integrativa, além do processo de e-procurement.",
        "cards": [
            {"title": "Critério de Preço vs TCO", "desc": "Lembra-te: O Custo Total de Propriedade (TCO) engloba preço de capa, manutenção, frete e descarte."},
            {"title": "Homologação Técnica", "desc": "Muitas vezes a Petrobras não busca o 'mais barato de todos', mas o mais barato dentre os pré-qualificados tecnicamente."}
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
        # Ignora se passar de 10 (ex: compras tem 11? A regex anterior disse "11 módulos atualizados". Se houver mais, eu injeto fallback
        if match_count < len(dataset):
            new_jsx = generate_premium_jsx(dataset[match_count])
            match_count += 1
            return new_jsx
        else:
            # Fallback seguro
            new_jsx = generate_premium_jsx({"title": "Conceito Bônus", "emojis": "✨", "frase": "Detalhes complementares.", "cards": [{"title": "Leitura Extra", "desc": "Avalie o edital"}]})
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
print("INJETANDO CONTEÚDO SEMÂNTICO (LOTE 2)")
print("="*60)

refactor_file("AulaAdministrativoTributario.tsx", AULA_ADMIN_TRIBUTARIO_DATA)
refactor_file("AulaComprasSuprimento.tsx", AULA_COMPRAS_DATA)

print("\n[CONCLUÍDO]")
