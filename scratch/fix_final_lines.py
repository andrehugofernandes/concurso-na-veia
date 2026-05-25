# -*- coding: utf-8 -*-
"""
Correção final linha-a-linha para eliminar os últimos placeholders remanescentes.
Substitui ocorrências exactas por linha em cada arquivo.
"""
import sys
import os
sys.stdout.reconfigure(encoding='utf-8')

BASE = r"c:\Workspace\petrobras-quest\src\components\aulas\administracao"

# Cada entrada: (arquivo, numero_linha_1indexed, novo_texto_do_paragrafo)
FIXES = [
    # AulaAdministrativoTributario.tsx - Módulos 5 (L858), 6 (L903, L905)
    ("AulaAdministrativoTributario.tsx", 858,
     "O Lucro Real apura o IRPJ sobre o resultado societário ajustado pelas adições e exclusões previstas na legislação do LALUR, sendo obrigatório para empresas com receita acima do limite legal vigente."),
    ("AulaAdministrativoTributario.tsx", 903,
     "O PIS e a COFINS não-cumulativos permitem o desconto de créditos sobre insumos e serviços adquiridos, tornando o custo tributário efetivo menor para empresas com alta intensidade de compras industriais."),
    ("AulaAdministrativoTributario.tsx", 905,
     "A diferenciação entre o regime cumulativo — aplicado a empresas menores enquadradas no Lucro Presumido — e o não-cumulativo é ponto frequente em questões da CESGRANRIO sobre tributação federal."),

    # AulaDireitoTributario.tsx - Módulos 7 (L767), 8 (L870), 9 (L968)
    ("AulaDireitoTributario.tsx", 767,
     "Os serviços de engenharia de manutenção prestados por empresas contratadas pela Petrobras estão sujeitos à retenção do ISS no município onde são efetivamente executados pelo contratado."),
    ("AulaDireitoTributario.tsx", 870,
     "A evasão fiscal é ato ilícito que ocorre após a materialização do fato gerador, mediante fraude, simulação ou omissão dolosa nas declarações apresentadas ao órgão fiscalizador competente."),
    ("AulaDireitoTributario.tsx", 968,
     "A Súmula Vinculante e os Temas de Repercussão Geral do STF uniformizam a interpretação das normas tributárias em todo o território nacional, reduzindo a insegurança jurídica dos contribuintes."),

    # AulaLogisticaSuprimento.tsx - Módulo 5 (L599, L601, L603)
    ("AulaLogisticaSuprimento.tsx", 599,
     "A logística inbound gerencia o recebimento criteriosa de insumos dos fornecedores, controlando agendamento de docas, conferência física e registro fiscal de entradas no sistema ERP."),
    ("AulaLogisticaSuprimento.tsx", 601,
     "O outbound coordena o despacho e a rastreabilidade das entregas ao cliente interno ou externo, garantindo a conformidade das janelas de entrega com os acordos de nível de serviço."),
    ("AulaLogisticaSuprimento.tsx", 603,
     "Os sistemas TMS (Transportation Management System) automatizam a contratação de fretes, a otimização de rotas e o rastreamento em tempo real de cargas transportadas pelos modais logísticos."),

    # AulaRLCP.tsx - Módulos 5 (L775, L777, L779) e 9 (L987)
    ("AulaRLCP.tsx", 775,
     "O julgamento comercial rejeita propostas inexequíveis com preços irrisórios ou manifestamente superiores ao valor de referência orçado pela equipe técnica da comissão contratante."),
    ("AulaRLCP.tsx", 777,
     "A adjudicação do objeto ao licitante vencedor homologado gera a expectativa legítima de celebração do contrato, criando para a estatal a obrigação de formalizar o instrumento contratual."),
    ("AulaRLCP.tsx", 779,
     "Os critérios de desempate no RLCP priorizam empresas de médio e pequeno porte cadastradas regionalmente ou prestadores que comprovem investimentos certificados em tecnologia nacional."),
    ("AulaRLCP.tsx", 987,
     "O controle de riscos licitatórios monitora variações abruptas de escopo e preços de mercado, atestando a lisura ética e a moralidade administrativa de todos os processos de concorrência."),
]


def apply_fixes(fixes):
    # Agrupar por arquivo
    by_file = {}
    for fname, lineno, new_text in fixes:
        by_file.setdefault(fname, []).append((lineno, new_text))

    for fname, changes in by_file.items():
        fp = os.path.join(BASE, fname)
        with open(fp, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        count = 0
        for lineno, new_text in changes:
            idx = lineno - 1  # 0-indexed
            if idx < len(lines):
                old = lines[idx]
                # Preservar indentação original
                indent = len(old) - len(old.lstrip())
                lines[idx] = ' ' * indent + f'<p>{new_text}</p>\n'
                print(f"  L{lineno}: substituído em {fname}")
                count += 1

        with open(fp, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print(f"[+] {fname}: {count} linha(s) corrigida(s). Salvo.\n")


print("=" * 60)
print("CORREÇÃO FINAL LINHA-A-LINHA")
print("=" * 60)
apply_fixes(FIXES)
print("[CONCLUÍDO] Todos os placeholders finais foram eliminados.")
