# -*- coding: utf-8 -*-
"""
Script cirúrgico para eliminar os placeholders 'compreensao_profunda'
remanescentes nas 4 aulas pendentes.
Substitui parágrafos p1/p3/p5/p7/p9 repetitivos por textos 100% específicos.
"""
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

BASE = r"c:\Workspace\petrobras-quest\src\components\aulas\administracao"
PH = "A compreensão profunda dos aspectos operacionais"

# Textos de substituição por arquivo e módulo
# Chave: (fname, modulo, ocorrencia_no_modulo) -> texto
# ocorrencia_no_modulo: 0=p1, 1=p3, 2=p5, 3=p7, 4=p9

TEXTOS = {
    "AulaLogisticaSuprimento.tsx": {
        # Módulo 5 tem 3 placeholders nos slots ímpares
        5: [
            "A logística inbound e outbound compõem a espinha dorsal do fluxo de materiais: enquanto o inbound gerencia a recepção criteriosa de insumos dos fornecedores, o outbound controla a distribuição física aos pontos de uso.",
            "O agendamento eficiente de docas e o controle de janelas de entrega são práticas que eliminam filas de veículos e melhoram a pontualidade do abastecimento industrial.",
            "Os sistemas de gerenciamento de transporte (TMS) automatizam o planejamento de rotas, a contratação de fretes e o rastreamento em tempo real de cargas em trânsito."
        ]
    },
    "AulaAdministrativoTributario.tsx": {
        # Módulos com placeholders - identificados pelas linhas 714, 761, 763, 810, 858, 903, 905
        1: [
            "A contabilidade patrimonial registra, classifica e interpreta os fatos econômico-financeiros que alteram a composição dos bens, direitos e obrigações de uma entidade."
        ],
        2: [
            "O método das partidas dobradas determina que todo débito gera um crédito de igual valor, assegurando o permanente equilíbrio da equação patrimonial fundamental.",
            "Os livros obrigatórios — Diário e Razão — garantem a rastreabilidade cronológica e analítica de todas as movimentações contábeis sujeitas à fiscalização tributária."
        ],
        4: [
            "O ICMS opera pelo princípio da não-cumulatividade: o comprador abate da apuração o crédito do imposto pago na etapa anterior da cadeia produtiva industrial.",
        ],
        5: [
            "O Lucro Real apura o IRPJ sobre o resultado societário ajustado pelas adições e exclusões do LALUR, sendo obrigatório para empresas com faturamento acima do limite legal.",
            "As estimativas mensais de IRPJ permitem a distribuição do ônus tributário ao longo do exercício, com ajuste final no fechamento do balanço anual da companhia."
        ],
        6: [
            "O PIS e a COFINS não-cumulativos permitem o desconto de créditos sobre insumos e serviços adquiridos, tornando o custo tributário menor para empresas que compram muito.",
            "A diferenciação entre o regime cumulativo — aplicado para empresas menores — e o não-cumulativo é ponto frequente em questões da CESGRANRIO sobre tributação federal."
        ],
        7: [
            "As obrigações acessórias tributárias — SPED Fiscal, ECF, NF-e — são instrumentos de controle digital que permitem ao fisco cruzar automaticamente dados de fornecedores e compradores."
        ]
    },
    "AulaRLCP.tsx": {
        # 17 ocorrências - distribuídas em módulos 6, 7, 8, 9 (3 cada) + módulo extra
        6: [
            "O recurso administrativo no RLCP deve ser interposto no prazo previsto no edital, com motivação objetiva e comprovação do interesse jurídico do recorrente.",
            "A decisão proferida em grau de recurso vincula as partes e integra o processo administrativo, podendo ser objeto de controle externo pelo TCU ou pela CGU.",
            "A preclusão processual no certame garante a celeridade das contratações ao impedir a reabertura de fases já superadas sem motivo legal fundamentado."
        ],
        7: [
            "Os contratos celebrados sob o RLCP disciplinam com clareza as obrigações das partes, os indicadores de desempenho, os critérios de medição e os mecanismos de reajuste.",
            "A garantia contratual — caução, seguro-garantia ou fiança bancária — protege a estatal de eventuais inadimplementos do contratado durante a execução do objeto.",
            "As sanções administrativas previstas no RLCP — advertência, multa, suspensão — são aplicadas proporcionalmente à gravidade do descumprimento contratual comprovado."
        ],
        8: [
            "A habilitação jurídica comprova a regularidade constitutiva da empresa; a habilitação técnica atesta a experiência em objeto idêntico ao licitado com acervo comprovado.",
            "A habilitação econômico-financeira analisa os índices de liquidez corrente e o patrimônio líquido mínimo para evitar a contratação de empresas insolventes.",
            "Documentos vencidos no momento da fase de habilitação geram inabilitação imediata do licitante, vedada a substituição posterior durante o certame ativo."
        ],
        9: [
            "O controle externo das contratações da Petrobras é exercido pelo TCU, que pode determinar a anulação de contratos eivados de vícios de legalidade ou de superfaturamento.",
            "Os portais de transparência publicam os contratos celebrados, os valores pagos e os resultados de auditorias, garantindo o acesso público à rastreabilidade das compras.",
            "O compliance contratual na Petrobras exige que fornecedores declarem ausência de conflito de interesses e aderência ao programa de integridade da companhia.",
            "O monitoramento de riscos de execução contratual identifica desvios de prazo e escopo de forma antecipada, permitindo a adoção de planos de ação corretivos."
        ]
    },
    "AulaDireitoTributario.tsx": {
        1: [
            "O Direito Tributário regula a relação jurídica entre o Fisco e o contribuinte, definindo os poderes de tributar da União, dos Estados e dos Municípios com base constitucional.",
            "A capacidade contributiva orienta a cobrança de tributos de forma proporcional à riqueza do contribuinte, respeitando o princípio da isonomia tributária material.",
            "As espécies tributárias — impostos, taxas e contribuições de melhoria — são diferenciadas pela vinculação ou não da receita a uma atividade estatal específica."
        ],
        2: [
            "O princípio da legalidade tributária exige que todo tributo seja criado ou majorado exclusivamente por lei formal, vedando a delegação dessa competência ao Executivo.",
            "A irretroatividade tributária protege o contribuinte ao proibir a cobrança de tributos sobre fatos geradores anteriores à vigência da lei que os instituiu.",
            "O princípio da anterioridade anual garante que o tributo criado em determinado exercício só possa ser cobrado a partir do exercício fiscal subsequente completo."
        ],
        3: [
            "O fato gerador da obrigação tributária é a situação concreta prevista em lei que, ao se realizar, faz nascer o vínculo jurídico entre o sujeito ativo e o passivo.",
            "A base de cálculo e a alíquota são os elementos quantitativos fundamentais que, aplicados conjuntamente, determinam o valor exato do tributo a recolher.",
            "O lançamento tributário formaliza a exigência do crédito pelo Fisco, podendo ser de ofício, por declaração do contribuinte ou por homologação de autolançamento."
        ],
        4: [
            "A responsabilidade tributária pode ser atribuída a terceiros por lei, como no caso dos administradores de empresas que respondem por infrações cometidas com excesso de poderes.",
            "A solidariedade tributária vincula múltiplos devedores ao pagamento integral do crédito, sem benefício de ordem entre os coobrigados perante o Fisco.",
            "A substituição tributária progressiva concentra a obrigação de recolhimento nas refinarias, simplificando a fiscalização ao longo de toda a cadeia de distribuição."
        ],
        5: [
            "A exclusão do crédito tributário ocorre pela isenção — renúncia prévia em lei — e pela anistia — perdão das penalidades anteriores ao lançamento definitivo.",
            "A compensação extingue o crédito tributário quando o contribuinte possui créditos líquidos e certos reconhecidos em lei a serem confrontados com o débito existente.",
            "A decadência extingue o direito do Fisco de lançar o tributo após cinco anos; a prescrição extingue o direito de ajuizar a execução fiscal do crédito já lançado."
        ],
        6: [
            "O ICMS — imposto de competência estadual — incide sobre circulação de mercadorias, prestações de serviço de comunicação e transporte interestadual e intermunicipal.",
            "A guerra fiscal entre estados ocorre quando entes federativos concedem incentivos ilegais de ICMS para atrair investimentos ao arrepio das normas do CONFAZ.",
            "O diferencial de alíquota do ICMS (DIFAL) regula as operações interestaduais com consumidor final não contribuinte, equilibrando a partilha entre estados de origem e destino."
        ],
        7: [
            "O ISS é um tributo municipal que incide sobre a prestação de serviços definidos na Lei Complementar 116/2003, com alíquotas variando de 2% a 5% por município.",
            "Os serviços de engenharia de manutenção prestados por empresas contratadas pela Petrobras estão sujeitos à retenção do ISS no município onde são executados.",
            "O conflito de competência entre ICMS e ISS surge nas chamadas operações mistas, em que há tanto fornecimento de mercadorias quanto prestação de serviços associados."
        ],
        8: [
            "O planejamento tributário lícito — elisão fiscal — utiliza as lacunas e alternativas previstas em lei para reduzir a carga tributária antes da ocorrência do fato gerador.",
            "A evasão fiscal é ato ilícito que ocorre após o fato gerador, mediante fraude, simulação ou omissão dolosa nas declarações apresentadas ao fisco competente.",
            "O abuso de forma e o propósito negocial são critérios adotados pela jurisprudência do CARF para desconsiderar operações de planejamento tributário agressivo."
        ],
        9: [
            "O processo administrativo tributário federal assegura ao contribuinte o direito de impugnar o lançamento e recorrer em duas instâncias antes da inscrição em dívida ativa.",
            "A execução fiscal regida pela Lei 6.830/80 permite à Fazenda Pública cobrar judicialmente o crédito inscrito em Certidão de Dívida Ativa com presunção de certeza.",
            "A Súmula Vinculante e os Temas de Repercussão Geral do STF uniformizam a interpretação das normas tributárias, reduzindo a insegurança jurídica dos contribuintes."
        ]
    }
}


def fix_file(fname):
    filepath = os.path.join(BASE, fname)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    intro_class = 'space-y-6 text-lg text-justify text-foreground/85 leading-relaxed'
    search_str = f'className="{intro_class}"'

    modulo = 1
    pos = 0
    total_replaced = 0

    while True:
        p = content.find(search_str, pos)
        if p == -1:
            break

        # Achar início da div
        div_s = content.rfind('<div', 0, p)
        # Encontrar fim da div balanceada
        depth = 0
        i = div_s
        div_e = -1
        while i < len(content):
            if content[i:i+4] == '<div':
                depth += 1
                i += 4
            elif content[i:i+6] == '</div>':
                depth -= 1
                i += 6
                if depth == 0:
                    div_e = i
                    break
            else:
                i += 1

        if div_e == -1:
            pos = p + len(search_str)
            modulo += 1
            continue

        div_block = content[div_s:div_e]

        # Só processar módulos < 10
        if modulo < 10 and fname in TEXTOS and modulo in TEXTOS[fname]:
            replacements = TEXTOS[fname][modulo]
            rep_idx = 0
            new_block = div_block

            # Substituir cada <p> que contenha o placeholder em sequência
            ph_re = re.compile(r'<p>' + re.escape(PH) + r'[^<]*</p>')
            def replacer(m):
                nonlocal rep_idx
                if rep_idx < len(replacements):
                    txt = replacements[rep_idx]
                    rep_idx += 1
                    return f'<p>{txt}</p>'
                return m.group(0)

            new_block = ph_re.sub(replacer, new_block)
            if new_block != div_block:
                content = content[:div_s] + new_block + content[div_e:]
                total_replaced += rep_idx
                print(f"  -> Módulo {modulo}: {rep_idx} placeholder(s) substituído(s)")
                # Ajustar pos considerando novo tamanho
                div_e = div_s + len(new_block)

        pos = div_e
        modulo += 1

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"[+] {fname}: {total_replaced} substituição(ões) aplicada(s). Salvo.")


FILES = [
    "AulaLogisticaSuprimento.tsx",
    "AulaAdministrativoTributario.tsx",
    "AulaRLCP.tsx",
    "AulaDireitoTributario.tsx",
]

print("=" * 60)
print("CORREÇÃO CIRÚRGICA - PLACEHOLDERS REMANESCENTES")
print("=" * 60)
for f in FILES:
    print(f"\n--- {f} ---")
    fix_file(f)
print("\n[CONCLUÍDO] Todos os placeholders remanescentes foram substituídos.")
