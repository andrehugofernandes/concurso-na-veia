import os
import re

quizzes_dir = r"c:\Workspace\petrobras-quest\src\data\quizzes"

# Novas questões específicas da CESGRANRIO a serem injetadas no módulo 1 de cada matéria correspondente
novas_questoes = {
    "administracao-geral-quizzes.ts": {
        "modulo-1": {
            "id": 999,
            "question": "Em um mercado altamente competitivo de suprimentos, uma empresa estabelece descontos progressivos e cartões de fidelidade baseados em pontos acumulados para incentivar a recompra por seus parceiros de negócios. De acordo com a literatura clássica de marketing de relacionamento, essa ação estratégica representa um laço de fidelidade baseado em aspectos:",
            "options": [
                "sociais",
                "financeiros",
                "estruturais",
                "interativos",
                "cognitivos"
            ],
            "correct": 1,
            "explanation": "Os descontos progressivos e programas de pontos são incentivos puramente econômicos, classificando-se como laços de fidelidade de nível financeiro (nível 1 de Berry e Parasuraman)."
        }
    },
    "compras-quizzes.ts": {
        "modulo-1": {
            "id": 999,
            "question": "Durante o processo de seleção de um novo fornecedor de válvulas industriais para refinarias da Petrobras, a equipe de suprimento optou por um modelo cujo preço de aquisição na nota fiscal era 15% superior à menor oferta do mercado. A justificativa residiu no menor consumo energético do equipamento e no maior intervalo entre manutenções preventivas, o que reduz custos operacionais totais. Essa decisão ampara-se no conceito de:",
            "options": [
                "Lote Econômico de Compras (LEC)",
                "Custo Total de Propriedade (TCO)",
                "Just-in-Time (JIT)",
                "Valor de Face Operacional",
                "Ponto de Ressuprimento Dinâmico"
            ],
            "correct": 1,
            "explanation": "O Custo Total de Propriedade (TCO) analisa todos os custos do ciclo de vida de um bem (aquisição, operação, manutenção e descarte) e não apenas o preço de compra inicial na nota fiscal."
        }
    },
    "logistica-quizzes.ts": {
        "modulo-1": {
            "id": 999,
            "question": "Na gestão de estoques de suprimentos de uma refinaria de petróleo, o cálculo do Lote Econômico de Compras (LEC) busca minimizar o Custo Total de Estoque. Conceitualmente, o ponto ideal onde o lote econômico é atingido representa a intersecção de quais curvas de custos?",
            "options": [
                "Custo de aquisição de bens e custo de oportunidade do capital",
                "Custo de pedido (emissão) e custo de posse (armazenagem e capital imobilizado)",
                "Custo de transporte de suprimentos e custo de armazenagem física",
                "Custo de falta de estoque e custo de seguro do inventário",
                "Custo de movimentação interna e custo administrativo de notas fiscais"
            ],
            "correct": 1,
            "explanation": "O LEC equilibra o custo de pedir (que cai com lotes maiores) com o custo de manter o estoque (que sobe com lotes maiores). A intersecção destas curvas indica o custo total mínimo."
        }
    },
    "lei-13303-quizzes.ts": {
        "modulo-1": {
            "id": 999,
            "question": "De acordo com a Lei das Estatais (Lei 13.303/16), o orçamento estimado do contrato da licitação promovida por uma sociedade de economia mista tem a seguinte regra de publicidade:",
            "options": [
                "Deve obrigatoriamente constar como anexo do edital em qualquer hipótese.",
                "É preferencialmente sigiloso, sem prejuízo da divulgação de seu detalhamento aos órgãos de controle.",
                "É absolutamente sigiloso, sendo vedado o acesso até mesmo a tribunais de contas.",
                "Deve ser publicado apenas em diário oficial municipal.",
                "Fica sob sigilo permanente até a homologação da assinatura do contrato pelo vencedor."
            ],
            "correct": 1,
            "explanation": "Nos termos do Art. 34 da Lei 13.303/16, o orçamento estimado do contrato da licitação será preferencialmente sigiloso, sendo obrigatório o seu detalhamento aos órgãos de controle (como TCU/CGU)."
        }
    },
    "rlcp-quizzes.ts": {
        "modulo-1": {
            "id": 999,
            "question": "No Regulamento de Licitações e Contratos da Petrobras (RLCP), a contratação direta por dispensa de licitação para atendimento de situações de emergência ou de calamidade pública tem prazo de vigência contratual limitado a:",
            "options": [
                "90 dias consecutivos, vedada a prorrogação.",
                "180 dias consecutivos, vedada a prorrogação baseada na mesma emergência.",
                "365 dias, permitida uma única prorrogação por igual período.",
                "5 anos, condicionado à aprovação anual da diretoria.",
                "120 dias, com possibilidade de prorrogação em caso de força maior."
            ],
            "correct": 1,
            "explanation": "A dispensa de licitação por emergência na Lei 13.303/16 (e RLCP) limita o contrato a 180 dias consecutivos e impede a sua prorrogação sob a mesma justificativa emergencial."
        }
    },
    "contabilidade-basica-quizzes.ts": {
        "modulo-1": {
            "id": 999,
            "question": "No Balanço Patrimonial de uma empresa comercial, a conta de Depreciação Acumulada classifica-se como conta redutora (retificadora) do ativo não circulante. Quanto à sua natureza de saldo e comportamento de lançamentos, essa conta apresenta:",
            "options": [
                "saldo devedor, sendo aumentada por débitos contábeis.",
                "saldo credor, sendo aumentada por créditos contábeis.",
                "saldo nulo, sendo zerada a cada encerramento de exercício.",
                "saldo misto, variando conforme a depreciação real do bem.",
                "saldo devedor, funcionando como provisão no passivo."
            ],
            "correct": 1,
            "explanation": "As contas retificadoras do Ativo (como Depreciação Acumulada) funcionam de forma inversa às contas patrimoniais do Ativo comuns, possuindo saldo de natureza credora, e aumentando seu valor por meio de créditos."
        }
    },
    "direito-tributario-quizzes.ts": {
        "modulo-1": {
            "id": 999,
            "question": "O Estado institui a cobrança compulsória de valores decorrentes do exercício do poder de polícia sobre a fiscalização de estabelecimentos comerciais. Por outro lado, cobra tarifas de pedágio em rodovias federais sob concessão privada de exploração contratual. Essas cobranças classificam-se, respectivamente, como:",
            "options": [
                "taxa (receita tributária) e preço público (receita não tributária)",
                "imposto (receita tributária) e taxa (receita tributária)",
                "contribuição (receita tributária) e imposto (receita tributária)",
                "preço público (receita não tributária) e taxa (receita tributária)",
                "tarifa (receita não tributária) e contribuição (receita tributária)"
            ],
            "correct": 0,
            "explanation": "A taxa decorrente do poder de polícia é tributo (compulsória e de direito público). O pedágio sob concessão contratual classifica-se como preço público/tarifa (natureza não tributária e contratual)."
        }
    },
    "administracao-tributaria-quizzes.ts": {
        "modulo-1": {
            "id": 999,
            "question": "Durante procedimento fiscal regular na Petrobras, o auditor da Receita Federal do Brasil (RFB) intima o representante legal a apresentar os livros comerciais e fiscais da empresa. O representante recusa-se ao fornecimento sob a alegação de cláusula de sigilo contratual privada celebrada com parceiros comerciais. Nos termos do Código Tributário Nacional (CTN), a conduta do representante é:",
            "options": [
                "legítima, pois o sigilo comercial privado se sobrepõe ao interesse arrecadatório estatal.",
                "ilegítima, pois a fiscalização dos livros comerciais pela autoridade tributária não está sujeita a limitações constantes de leis ou contratos privados.",
                "legítima, desde que haja parecer prévio do conselho fiscal da sociedade anônima.",
                "ilegítima, dependendo, contudo, de mandado de busca judicial para prosseguimento do exame.",
                "legítima, cabendo à Receita Federal requerer as informações diretamente aos parceiros internacionais."
            ],
            "correct": 1,
            "explanation": "Conforme o Art. 195 do CTN, para efeitos da legislação tributária, não têm aplicação quaisquer disposições legais limitativas do direito de examinar livros, arquivos, papéis e efeitos comerciais dos comerciantes ou industriais."
        }
    }
}

# Processa cada arquivo de quiz
for filename, mods in novas_questoes.items():
    filepath = os.path.join(quizzes_dir, filename)
    if not os.path.exists(filepath):
        print(f"Erro: Arquivo nao encontrado {filepath}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Converter todas as questões existentes com 4 opções para 5 opções
    # Encontra os blocos de options que têm 4 itens
    def add_fifth_option(match):
        options_block = match.group(0)
        # Conta quantas strings com aspas temos
        items = re.findall(r'"[^"]*?"|\'[^\']*?\'', options_block)
        if len(items) == 4:
            # Insere a 5ª opção no final do colchete
            last_item = items[-1]
            last_idx = options_block.rfind(last_item)
            end_item_pos = last_idx + len(last_item)
            
            # Adiciona vírgula e a nova opção "Nenhuma das alternativas anteriores está correta."
            injected_option = ',\n          "Nenhuma das alternativas anteriores está correta."'
            # Mantendo a aspas correspondente
            if last_item.startswith("'"):
                injected_option = ',\n          \'Nenhuma das alternativas anteriores está correta.\''
                
            new_block = options_block[:end_item_pos] + injected_option + options_block[end_item_pos:]
            return new_block
        return options_block

    # Substitui blocos de options: [ ... ]
    content = re.sub(r'options:\s*\[[\s\S]*?\]', add_fifth_option, content)

    # 2. Injetar a nova questão no modulo-1
    for mod_name, q_data in mods.items():
        # Busca o início do modulo-1
        mod_pattern = rf'"{mod_name}":\s*\{{[\s\S]*?questions:\s*\[\s*'
        match = re.search(mod_pattern, content)
        if match:
            # Monta a nova questão string
            q_str = f"""{{\n        id: {q_data["id"]},\n        question: "{q_data["question"]}",\n        options: [\n"""
            for opt in q_data["options"]:
                q_str += f'          "{opt}",\n'
            q_str = q_str.rstrip(",\n") + "\n        ],\n"
            q_str += f'        correct: {q_data["correct"]},\n        explanation: "{q_data["explanation"]}"\n      }},\n      '
            
            start_pos = match.end()
            content = content[:start_pos] + q_str + content[start_pos:]
            print(f"Sucesso: Questao CESGRANRIO injetada no {mod_name} de {filename}")
        else:
            print(f"Erro: Nao foi possivel encontrar o modulo-1 em {filename}")

    # Salva o arquivo de volta
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Processo concluído com sucesso!")
