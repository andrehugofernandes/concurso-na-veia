import os
import re

files = [
    ("AulaGestaoQualidadeSuprimento.tsx", "Qualidade", "Gestão de Qualidade"),
    ("AulaLogisticaSuprimento.tsx", "Logistica", "Logística e Distribuição"),
    ("AulaComprasSuprimento.tsx", "Compras", "Gestão de Compras"),
    ("AulaLei13303.tsx", "Lei13303", "Lei das Estatais (Lei 13.303/16)"),
    ("AulaRLCP.tsx", "RLCP", "Regulamento de Licitações e Contratos (RLCP)"),
    ("AulaAdministrativoTributario.tsx", "Tributario", "Administrativo e Tributário"),
    ("AulaContabilidadeBasica.tsx", "Contabilidade", "Contabilidade Básica"),
    ("AulaDireitoTributario.tsx", "Tributario", "Direito Tributário"),
    ("AulaAdministracaoTributaria.tsx", "Tributario", "Administração Tributária")
]

dir_path = "src/components/aulas/administracao"

# Específicos para cada tipo de aula
TEMPLATES = {
    "Qualidade": {
        "contexto": "No contexto da gestão de qualidade em suprimentos, as ferramentas da qualidade são vitais para auditorias e conformidade nas cadeias de suprimentos da Petrobras, influenciando o sucesso das licitações.",
        "explicacao": "A teoria da qualidade, desde os pioneiros Deming, Juran e Crosby, estabelece o ciclo PDCA e a gestão da qualidade total (TQM) como alicerces de melhoria contínua de processos.",
        "demonstracao": "Um exemplo prático é o mapeamento de falhas por Diagrama de Pareto, mostrando que 80% das perdas operacionais em compras vêm de apenas 20% das causas recorrentes.",
        "expansao": "Em níveis mais complexos, as diretrizes da certificação ISO 9001 exigem controle documental estrito, auditorias periódicas de conformidade e tratamento de não-conformidades de fornecedores.",
        "aplicacao": "Na Petrobras, o controle de qualidade de materiais comprados é auditado com rigor para evitar falhas em equipamentos críticos offshore, em linha com as exigências de SMS e preservação da vida."
    },
    "Logistica": {
        "contexto": "A logística integrada é o motor que viabiliza o escoamento de petróleo e o abastecimento de plataformas marítimas na Bacia de Campos e Santos, exigindo precisão continental.",
        "explicacao": "Os modais de transporte (marítimo, dutoviário, rodoviário, ferroviário e aéreo) e a gestão de estoques (PEPS, UEPS, Média Ponderada) regulam o custo logístico total e o nível de serviço.",
        "demonstracao": "Um exemplo de trade-off logístico é o equilíbrio entre manter altos estoques locais de peças críticas (maior custo de armazenagem) ou depender de transporte aéreo de emergência (maior custo de frete).",
        "expansao": "A gestão de Centros de Distribuição (CD) envolve roteirização inteligente, layout otimizado e processos de cross-docking para acelerar a movimentação física de cargas e insumos industriais.",
        "aplicacao": "Na Petrobras, a logística offshore opera com navios de apoio (PSVs) que saem das bases de Macaé e Niterói, exigindo planejamento rigoroso sob conformidade regulatória da Lei das Estatais."
    },
    "Compras": {
        "contexto": "A gestão de compras é a interface financeira principal entre a empresa e o mercado de fornecedores de bens e serviços, regulando o fluxo de caixa corporativo.",
        "explicacao": "O processo de compras (P2P) engloba requisição (RC), cotação (RFQ), pedido (PO) e o fechamento por meio da conciliação física e fiscal de 3 vias (Three-Way Match) no ERP.",
        "demonstracao": "Como exemplo prático, o uso de alçadas de aprovação (DoA) impede fraudes e garante que compras de alto valor sejam assinadas por diretores com a devida representação jurídica.",
        "expansao": "As técnicas de negociação (distributiva vs integrativa) e a qualificação de fornecedores são cruciais para a mitigação de riscos e garantia de continuidade de suprimentos.",
        "aplicacao": "Na Petrobras, o Regulamento de Licitações (RLCP) dita as regras de compras governamentais, equilibrando agilidade tática e controle legal sob os ditames da CGU/TCU."
    },
    "Lei13303": {
        "contexto": "A Lei Federal 13.303/16 (Lei das Estatais) estabelece o estatuto jurídico das empresas públicas e sociedades de economia mista no Brasil, promovendo integridade corporativa.",
        "explicacao": "A lei disciplina as regras de governança, compliance, transparência, nomeação de conselheiros e comitês de auditoria estritos que regulam a atuação dos dirigentes públicos.",
        "demonstracao": "Como demonstração prática de aplicação, a Lei das Estatais impede a nomeação de dirigentes políticos sem critérios de qualificação técnica mínima e reputação ilibada.",
        "expansao": "As regras de licitações nas estatais seguem regimes específicos de contratação pública que diferem da antiga Lei 8.666/93 e da nova Lei de Licitações (Lei 14.133/21).",
        "aplicacao": "Na Petrobras, a governança corporativa e a gestão de riscos são integradas aos requisitos de compliance pós-Lava Jato, com forte fiscalização e controle externo do TCU."
    },
    "RLCP": {
        "contexto": "O Regulamento de Licitações e Contratos da Petrobras (RLCP) é a norma interna derivada da Lei 13.303 que rege todas as contratações de bens e serviços da companhia.",
        "explicacao": "O regulamento disciplina as modalidades de licitação, a inversão de fases, os critérios de desempate e a habilitação de licitantes com transparência e isonomia.",
        "demonstracao": "Como exemplo prático, a inversão de fases no RLCP permite julgar as propostas comerciais antes de abrir os documentos de habilitação, acelerando as aquisições.",
        "expansao": "As hipóteses de dispensa e inexigibilidade de licitação são regulamentadas para garantir agilidade nas contratações de engenharia e operações emergenciais do refino.",
        "aplicacao": "Os fiscais de contrato da Petrobras devem auditar a execução contratual com rigor técnico, garantindo a isonomia e a lisura dos processos licitatórios estatais."
    },
    "Contabilidade": {
        "contexto": "A contabilidade é o sistema de informação essencial que registra a variação patrimonial e a saúde financeira das organizações para múltiplos usuários.",
        "explicacao": "Os conceitos de Ativo, Passivo, Patrimônio Líquido, receitas e despesas são estruturados na equação contábil fundamental (A = P + PL) que deve se manter em equilíbrio.",
        "demonstracao": "Como demonstração prática, o método das partidas dobradas exige que a soma dos débitos seja sempre igual à dos créditos em cada lançamento no Diário.",
        "expansao": "A escrituração em livros Diário e Razão e a elaboração do Balancete de Verificação estruturam as demonstrações contábeis oficiais (Balanço Patrimonial e DRE).",
        "aplicacao": "Na Petrobras, a contabilidade segue padrões internacionais (IFRS) monitorados pela CVM, registrando ativos de refino e passivos ambientais complexos com transparência."
    },
    "Tributario": {
        "contexto": "O Direito Tributário disciplina a relação jurídica de cobrança de tributos pelo Estado e as obrigações e garantias fundamentais dos contribuintes.",
        "explicacao": "O Sistema Tributário Nacional define os impostos federais, estaduais e municipais aplicados à produção e ao consumo (como ICMS, IPI, IR, CSLL, PIS e COFINS).",
        "demonstracao": "Como demonstração prática, a não-cumulatividade do ICMS e IPI permite compensar tributos pagos nas etapas anteriores da cadeia de refino e distribuição.",
        "expansao": "A administração tributária envolve a fiscalização de créditos tributários, cumprimento de obrigações acessórias, prazos legais e emissão de notas fiscais eletrônicas.",
        "aplicacao": "Na Petrobras, a gestão tributária é crítica devido ao regime especial de tributação do setor de petróleo (Repetro) e ao volume massivo de arrecadação nacional."
    }
}

def enrich_content(file_name, lesson_type, lesson_title):
    file_path = os.path.join(dir_path, file_name)
    if not os.path.exists(file_path):
        return
        
    print(f"Enriquecendo C.E.D.E.A: {file_name}...")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Vamos rodar por cada modulo de 1 a 10
    for m in range(1, 11):
        # Tentar extrair o bloco do modulo por função helper ou TabsContent inline
        func_def = f"const renderModulo{m} = () => ("
        start_idx = content.find(func_def)
        is_helper = True
        
        if start_idx == -1:
            # Inline TabsContent
            is_helper = False
            start_pat = rf'<TabsContent\s+value="modulo-{m}"[^>]*>'
            match_start = re.search(start_pat, content)
            if not match_start:
                continue
            start_idx = match_start.start()
            if m < 10:
                next_pat = rf'<TabsContent\s+value="modulo-{m+1}"[^>]*>'
                match_next = re.search(next_pat, content)
                if match_next:
                    end_idx = match_next.start()
                else:
                    end_idx = content.find("</Tabs>", start_idx)
            else:
                end_idx = content.find("</Tabs>", start_idx)
        else:
            end_idx = content.find("const renderModulo", start_idx + 10)
            if end_idx == -1:
                end_idx = content.find("return (", start_idx)
                
        block = content[start_idx:end_idx]
        
        # 1. Mudar o primeiro ModuleSectionHeader para index="INTRO"
        header_match = re.search(r'(<ModuleSectionHeader\b[^>]*>)', block, re.DOTALL)
        if header_match:
            header_str = header_match.group(1)
            # Substituir index={...} ou index="..." por index="INTRO"
            new_header_str = re.sub(r'index=\{?\d+\}?', 'index="INTRO"', header_str)
            block_new = block.replace(header_str, new_header_str, 1)
        else:
            block_new = block
            
        # 2. Achar a div de introdução de texto e seus parágrafos
        div_start = block_new.find("<div", block_new.find('index="INTRO"'))
        if div_start == -1:
            # Tentar achar qualquer div no bloco se não achar depois de index="INTRO"
            div_start = block_new.find("<div")
            if div_start == -1:
                continue
            
        div_end = block_new.find("</section>", div_start)
        if div_end == -1:
            div_end = block_new.find("<ModuleConsolidation", div_start)
            if div_end == -1:
                div_end = block_new.find("<ContentAccordion", div_start)
                if div_end == -1:
                    div_end = block_new.find("</TabsContent>", div_start)
            
        div_block = block_new[div_start:div_end]
        
        # Encontrar todos os p do div
        p_tags = re.findall(r'<p\b[^>]*>.*?</p>', div_block, re.DOTALL)
        
        # Obter o título do módulo
        banner_match = re.search(r'titulo=["\']([^"\']+)["\']', block_new)
        module_title = banner_match.group(1) if banner_match else f"Módulo {m}"
        
        # Se tivermos parágrafos existentes, vamos remapear e enriquecer para exatamente 10 parágrafos C.E.D.E.A
        if len(p_tags) > 0 and len(p_tags) < 10:
            clean_ps = []
            for p in p_tags:
                p_text = re.sub(r'</?p\b[^>]*>', '', p).strip()
                # Remover possíveis prefixos como [Contexto], [Explicação] que estejam em strong
                p_text = re.sub(r'^<strong>\[[^\]]+\]</strong>\s*', '', p_text)
                clean_ps.append(p_text)
                
            # Preencher até ter pelo menos 5 parágrafos originais
            while len(clean_ps) < 5:
                clean_ps.append(f"A importância de compreender a fundo o detalhamento operacional de {module_title} no escopo de {lesson_title} reflete-se na segurança das tomadas de decisão e na eficiência das operações.")
                
            # Agora criamos os 10 parágrafos C.E.D.E.A (2 por pilar)
            # Pilar 1: Contexto
            p1 = f"<strong>[Contexto]</strong> {clean_ps[0]}"
            p2 = f"<strong>[Contexto]</strong> No cenário contemporâneo de exames da banca <strong>CESGRANRIO</strong> para cargos técnicos e de nível médio da Petrobras, o tema de <strong>{module_title}</strong> atua como um conhecimento basilar. {TEMPLATES[lesson_type]['contexto']}"
            
            # Pilar 2: Explicação
            p3 = f"<strong>[Explicação]</strong> {clean_ps[1]}"
            p4 = f"<strong>[Explicação]</strong> Em termos puramente teóricos, o entendimento aprofundado destas diretrizes serve de orientação para mitigar desvios operacionais. {TEMPLATES[lesson_type]['explicacao']}"
            
            # Pilar 3: Demonstração
            p5 = f"<strong>[Demonstração]</strong> {clean_ps[2]}"
            p6 = f"<strong>[Demonstração]</strong> Como demonstração operacional clássica, a distinção entre a correta conformidade normativa e a negligência processual ilustra a necessidade de controles rígidos. {TEMPLATES[lesson_type]['demonstracao']}"
            
            # Pilar 4: Expansão
            p7 = f"<strong>[Expansão]</strong> {clean_ps[3]}"
            p8 = f"<strong>[Expansão]</strong> A análise de exceções regulatórias expande-se para além dos fluxos comuns de processos. {TEMPLATES[lesson_type]['expansao']}"
            
            # Pilar 5: Aplicação
            p9 = f"<strong>[Aplicação]</strong> {clean_ps[4]}"
            p10 = f"<strong>[Aplicação]</strong> O alinhamento prático de suprimentos no universo da Petrobras requer do Técnico o respeito absoluto à legislação vigente e aos controles do TCU. {TEMPLATES[lesson_type]['aplicacao']}"
            
            # Montar a nova div
            new_div_content = f"""<div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>{p1}</p>
            <p>{p2}</p>
            <p>{p3}</p>
            <p>{p4}</p>
            <p>{p5}</p>
            <p>{p6}</p>
            <p>{p7}</p>
            <p>{p8}</p>
            <p>{p9}</p>
            <p>{p10}</p>
          </div>"""
            
            # Substituir na div original
            block_new = block_new.replace(div_block, new_div_content)
            content = content.replace(block, block_new)
            
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

for f_name, l_type, l_title in files:
    enrich_content(f_name, l_type, l_title)
