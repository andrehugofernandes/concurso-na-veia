import os
import re

dir_path = "src/components/aulas/administracao"

# Templates para enriquecimento C.E.D.E.A (exatamente 10 parágrafos por módulo)
TEMPLATES = {
    "Qualidade": {
        "contexto": "No contexto da gestão de qualidade em suprimentos, as ferramentas da qualidade são vitais para auditorias e conformidade nas cadeias de suprimentos da Petrobras, influenciando o sucesso das licitações.",
        "explicacao": "A teoria da qualidade, desde os pioneiros Deming, Juran e Crosby, estabelece o ciclo PDCA e a gestão da qualidade total (TQM) como alicerces de melhoria contínua de processos.",
        "demonstracao": "Um exemplo prático é o mapeamento de falhas por Diagrama de Pareto, mostrando que 80% das perdas operacionais em compras vêm de apenas 20% das causas recorrentes.",
        "expansao": "Em níveis mais complexos, as diretrizes da certificação ISO 9001 exigem controle documental estrito, auditorias periódicas de conformidade e tratamento de não-conformidades de fornecedores.",
        "aplicacao": "Na Petrobras, o controle de qualidade de materiais comprados é auditado com rigor para evitar falhas em equipamentos críticos offshore, em linha com as exigências de SMS e preservação da via."
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
        "expansao": "As hipóteses de dispensa e inexigibilidade de licitação são regulamentadas para garantir agilidade nas contratações de engenharia e operações em refinarias.",
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

# Textos para as intros dos simulados (módulo 10)
SIMULADOS_TEXTS = {
    "Qualidade": {
        "title": "Simulado Geral: Gestão da Qualidade",
        "p1": "O <strong>Simulado Geral é a avaliação integradora</strong> que sintetiza tudo que você aprendeu nos 9 módulos anteriores de Gestão da Qualidade. Diferente dos quizzes individuais de cada módulo (que focam em conceitos específicos de forma isolada), o simulado combina múltiplos domínios em <strong>questões de alta complexidade</strong>. Uma questão pode começar descrevendo uma falha de qualidade em um lote de suprimentos, pedir para identificar as causas raiz usando os 6M, e em seguida solicitar que você trace o plano de ação corretivo no ciclo PDCA.",
        "p2": "A <strong>estrutura do simulado</strong> inclui questões que testam de forma ampla os conceitos clássicos exigidos pelas principais bancas de concurso público. A meta de aprovação de 70% reflete a exigência de eficiência teórica e operacional. O tempo sugerido de resolução simula a restrição de tempo real de prova, preparando você para tomar decisões rápidas sob pressão.",
        "p3": "Os <strong>cenários avaliados</strong> envolvem auditorias de qualidade na cadeia logística, certificações de fornecedores e controle estatístico de processos. A aplicação prática de ferramentas como Pareto, Ishikawa e cartas de controle é trazida para testar sua capacidade de análise quantitativa e tomada de decisão fundamentada em dados.",
        "p4": "A <strong>estratégia de resolução</strong> exige leitura crítica de enunciados extensos, onde pequenos detalhes alteram a classificação da não-conformidade. O candidato deve identificar primeiro o objetivo central da questão e descartar alternativas tecnicamente inconsistentes com os conceitos dos principais gurus da qualidade.",
        "p5": "A <strong>preparação direcionada à Petrobras</strong> consolida a visão de que a gestão de qualidade total (TQM) e a conformidade com as normas ISO 9001 são fundamentais para a segurança operacional offshore e a integridade dos processos licitatórios governamentais."
    },
    "Logistica": {
        "title": "Simulado Geral: Logística",
        "p1": "O <strong>Simulado Geral é a avaliação integradora</strong> que sintetiza tudo que você aprendeu nos 9 módulos anteriores de Logística e Cadeia de Suprimentos. O simulado exige a correlação entre múltiplos conceitos, como gestão de estoques, custos de armazenagem, roteirização de transportes e logística reversa. Você enfrentará <strong>questões de alta complexidade</strong> que simulam o planejamento logístico real da companhia e seus trade-offs clássicos.",
        "p2": "A <strong>estrutura do simulado</strong> foi projetada seguindo o perfil rigoroso de cobrança das bancas examinadoras. A pontuação mínima de 70% é o sarrafo exigido para consolidar o aprendizado e liberar o progresso final da disciplina. O gerenciamento de tempo é parte essencial da prova, obrigando a resolução ágil de cálculos de consumo médio e nível de serviço.",
        "p3": "Os <strong>cenários práticos avaliados</strong> abordam desde a movimentação física de materiais em centros de distribuição até o abastecimento complexo de plataformas de petróleo offshore por navios PSV na Bacia de Campos e Santos. O conhecimento dos modais de transporte e das melhores práticas de estocagem é cobrado de forma aplicada.",
        "p4": "A <strong>estratégia de resolução</strong> passa por identificar as restrições logísticas de cada enunciado e as regras gerais de inventário (como PEPS, UEPS e Custo Médio). Evitar erros de cálculo de reposição e entender a interface com a área de compras são os pontos chaves para gabaritar a seção.",
        "p5": "A <strong>aplicação prática no contexto da Petrobras</strong> exige a compreensão das dinâmicas integradas do refino e escoamento nacional, sempre sob o regime jurídico e as diretrizes de governança da Lei das Estatais e auditorias do TCU."
    },
    "Compras": {
        "title": "Simulado Geral: Compras",
        "p1": "O <strong>Simulado Geral é a avaliação integradora</strong> que sintetiza tudo que você aprendeu nos 9 módulos anteriores de Gestão de Compras. Diferente dos quizzes individuais de cada módulo (que focam em conceitos específicos de forma isolada), o simulado combina múltiplos domínios em <strong>questões de alta complexidade</strong>. Uma questão pode começar descrevendo um processo de aquisição, pedir para avaliar os riscos de fraude ou conformidade ética, e em seguida questionar as regras do RLCP aplicáveis. Requer que você entenda não apenas os conceitos de forma estática, mas também como eles interagem de forma dinâmica nas decisões de compras corporativas.",
        "p2": "A <strong>estrutura do simulado</strong> inclui questões estruturadas no formato clássico da banca examinadora para garantir o treinamento adequado. A meta de aprovação de 70% reflete o padrão de exigência para aprovação no concurso. As questões cobrem de forma balanceada os principais tópicos: desde as fases do processo de compras até as vedações éticas e regras da Lei das Estatais.",
        "p3": "Os <strong>cenários avaliados</strong> envolvem situações típicas do dia a dia da Petrobras e de suas subsidiárias. Licitações para aquisição de grandes equipamentos, processos de contratação de serviços de engenharia e a aplicação das regras do RLCP são trazidos para avaliar a competência técnica do candidato.",
        "p4": "A <strong>estratégia de resolução</strong> exige leitura atenta e foco nos detalhes do edital. Muitos erros comuns ocorrem pela confusão entre conceitos vizinhos ou má interpretação do rito licitatório. O candidato deve ler primeiro o comando da questão para saber exatamente qual conceito está sendo avaliado.",
        "p5": "A <strong>preparação focada na Petrobras</strong> exige o domínio das inovações legais promovidas pela Lei 13.303. O simulado consolida a visão de que o setor de compras da estatal deve ser ágil e eficiente, operando em conformidade ética com o TCU e a CGU. Atingir a pontuação mínima valida que você desenvolveu o raciocínio crítico necessário para atuar com compras e contratos."
    }
}

TEMPLATE_MODULO_10_HELPER = """const renderModulo10 = () => (
    <div className="space-y-12 mt-0 outline-none">
      <ModuleBanner
        numero={10}
        titulo="Simulado Geral"
        descricao="Teste final abrangente. Aprovação destrava a XP completa da Missão Geração Ouro da CESGRANRIO focada em concursos Petrobras."
        variant={getModuleVariant(10)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="[TITLE]"
          description="Avaliação integrada consolidando todos os conceitos estudados nesta aula."
          variant={getModuleVariant(10)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
          <p>[P1]</p>
          <p>[P2]</p>
          <p>[P3]</p>
          <p><strong>[Explicação]</strong> Em termos puramente teóricos, o entendimento aprofundado destas diretrizes serve de orientação para mitigar desvios operacionais. [TEMPLATE_EXPLICACAO]</p>
          <p>[P4]</p>
          <p><strong>[Demonstração]</strong> Como demonstração operacional clássica, a distinção entre a correta conformidade normativa e a negligência processual ilustra a necessidade de controles rígidos. [TEMPLATE_DEMONSTRACAO]</p>
          <p>[P5]</p>
          <p><strong>[Expansão]</strong> A análise de exceções regulatórias expande-se para além dos fluxos comuns de processos. [TEMPLATE_EXPANSAO]</p>
          <p><strong>[Aplicação]</strong> O alinhamento prático de suprimentos no universo da Petrobras requer do Técnico o respeito absoluto à legislação vigente e aos controles do TCU. [TEMPLATE_APLICACAO]</p>
          <p><strong>[Aplicação]</strong> Atingir a pontuação mínima valida que você desenvolveu o raciocínio crítico necessário para atuar na companhia.</p>
        </div>
      </section>

      <ContentAccordion mode="stacked"
        slides={[
          {
            titulo: "Visão Integrada de Conceitos",
            icone: <LuBrain />,
            conteudo: <p className="text-lg text-justify">O simulado exige que você conecte as teorias, os processos práticos de suporte e a conformidade ética em cenários realistas de auditorias e concorrência.</p>
          },
          {
            titulo: "Tempo e Estratégia",
            icone: <LuTimer />,
            conteudo: <p className="text-lg text-justify">Treine a resolução de questões sob a média de 3 minutos por item. Aprenda a identificar as pegadinhas da banca e a eliminar alternativas incorretas rapidamente.</p>
          },
          {
            titulo: "Padrão CESGRANRIO",
            icone: <LuGraduationCap />,
            conteudo: <p className="text-lg text-justify">As questões simulam fielmente as provas recentes da Petrobras, cobrando o discernimento entre casos práticos e a legislação em vigor.</p>
          },
          {
            titulo: "Calibração de Desempenho",
            icone: <LuActivity />,
            conteudo: <p className="text-lg text-justify">Utilize o resultado do simulado para identificar quais módulos requerem revisão ativa. Focar nas suas fraquezas agora garante os pontos decisivos no dia da prova.</p>
          }
        ]}
      />

      <ModuleConsolidation
        index={10}
        variant={getModuleVariant(10)}
        video={{
          videoId: "dQw4w9WgXcQ",
          title: "Revisão e Simulado Geral de [LESSON_TITLE]",
          duration: "25:15"
        }}
        resumoVisual={{
          moduloNome: "Simulado Final",
          tituloAula: "[LESSON_TITLE]",
          materia: "Suprimento",
          images: [
            { title: "Mapa Mental Geral de Revisão", type: "infográfico", placeholderColor: "bg-rose-500/20" }
          ]
        }}
        sinteseEstrategica={{
          title: "O Ponto Final",
          content: <div className="text-center"><span className="text-6xl my-6 animate-pulse inline-block">🎓 🏆</span><p className="text-lg italic text-center">"O Técnico de Suprimentos zela pela conformidade técnica de cada processo operacional."</p></div>
        }}
        audio={{
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
          titulo: "Podcast: Sucesso no Concurso Petrobras",
          artista: "Prof. Suprimentos"
        }}
      />

      <QuizInterativo
        titulo="Simulado Final: [LESSON_TITLE]"
        numero={10}
        variant={getModuleVariant(10)}
        questoes={[QUIZ_VAL]}
        onComplete={(score: number) => handleQuizComplete("modulo-10", score)}
      />
    </div>
  );"""

TEMPLATE_MODULO_10_INLINE = """<TabsContent value="modulo-10" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={10}
          titulo="Simulado Geral"
          descricao="Teste final abrangente. Aprovação destrava a XP completa da Missão Geração Ouro da CESGRANRIO focada em concursos Petrobras."
          variant={getModuleVariant(10)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="[TITLE]"
            description="Avaliação integrada consolidando todos os conceitos estudados nesta aula."
            variant={getModuleVariant(10)}
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>[P1]</p>
            <p>[P2]</p>
            <p>[P3]</p>
            <p><strong>[Explicação]</strong> Em termos puramente teóricos, o entendimento aprofundado destas diretrizes serve de orientação para mitigar desvios operacionais. [TEMPLATE_EXPLICACAO]</p>
            <p>[P4]</p>
            <p><strong>[Demonstração]</strong> Como demonstração operacional clássica, a distinção entre a correta conformidade normativa e a negligência processual ilustra a necessidade de controles rígidos. [TEMPLATE_DEMONSTRACAO]</p>
            <p>[P5]</p>
            <p><strong>[Expansão]</strong> A análise de exceções regulatórias expande-se para além dos fluxos comuns de processos. [TEMPLATE_EXPANSAO]</p>
            <p><strong>[Aplicação]</strong> O alinhamento prático de suprimentos no universo da Petrobras requer do Técnico o respeito absoluto à legislação vigente e aos controles do TCU. [TEMPLATE_APLICACAO]</p>
            <p><strong>[Aplicação]</strong> Atingir a pontuação mínima valida que você desenvolveu o raciocínio crítico necessário para atuar na companhia.</p>
          </div>
        </section>

        <ContentAccordion mode="stacked"
          slides={[
            {
              titulo: "Visão Integrada de Conceitos",
              icone: <LuBrain />,
              conteudo: <p className="text-lg text-justify">O simulado exige que você conecte as teorias, os processos práticos de suporte e a conformidade ética em cenários realistas de auditorias e concorrência.</p>
            },
            {
              titulo: "Tempo e Estratégia",
              icone: <LuTimer />,
              conteudo: <p className="text-lg text-justify">Treine a resolução de questões sob a média de 3 minutos por item. Aprenda a identificar as pegadinhas da banca e a eliminar alternativas incorretas rapidamente.</p>
            },
            {
              titulo: "Padrão CESGRANRIO",
              icone: <LuGraduationCap />,
              conteudo: <p className="text-lg text-justify">As questões simulam fielmente as provas recentes da Petrobras, cobrando o discernimento entre casos práticos e a legislação em vigor.</p>
            },
            {
              titulo: "Calibração de Desempenho",
              icone: <LuActivity />,
              conteudo: <p className="text-lg text-justify">Utilize o resultado do simulado para identificar quais módulos requerem revisão ativa. Focar nas suas fraquezas agora garante os pontos decisivos no dia da prova.</p>
            }
          ]}
        />

        <ModuleConsolidation
          index={10}
          variant={getModuleVariant(10)}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Revisão e Simulado Geral de [LESSON_TITLE]",
            duration: "25:15"
          }}
          resumoVisual={{
            moduloNome: "Simulado Final",
            tituloAula: "[LESSON_TITLE]",
            materia: "Suprimento",
            images: [
              { title: "Mapa Mental Geral de Revisão", type: "infográfico", placeholderColor: "bg-rose-500/20" }
            ]
          }}
          sinteseEstrategica={{
            title: "O Ponto Final",
            content: <div className="text-center"><span className="text-6xl my-6 animate-pulse inline-block">🎓 🏆</span><p className="text-lg italic text-center">"O Técnico de Suprimentos zela pela conformidade técnica de cada processo operacional."</p></div>
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
            titulo: "Podcast: Sucesso no Concurso Petrobras",
            artista: "Prof. Suprimentos"
          }}
        />

        <QuizInterativo
          titulo="Simulado Final: [LESSON_TITLE]"
          numero={10}
          variant={getModuleVariant(10)}
          questoes={[QUIZ_VAL]}
          onComplete={(score: number) => handleQuizComplete("modulo-10", score)}
        />
      </TabsContent>"""

def find_balanced_parens(content, start_pos):
    first_open = content.find("(", start_pos)
    if first_open == -1:
        return -1, -1
    
    stack = 1
    curr = first_open + 1
    in_string = False
    string_char = None
    
    while curr < len(content):
        char = content[curr]
        if in_string:
            if char == string_char and content[curr-1] != '\\':
                in_string = False
                string_char = None
        else:
            if char in ['"', "'", '`']:
                in_string = True
                string_char = char
            elif char == '(':
                stack += 1
            elif char == ')':
                stack -= 1
                if stack == 0:
                    return first_open, curr + 1
        curr += 1
    return -1, -1

def find_balanced_block(content, start_pos, start_tag, end_tag):
    first_open = content.find(start_tag, start_pos)
    if first_open == -1:
        return -1, -1
    
    stack = 0
    curr = first_open
    
    while curr < len(content):
        if content[curr:curr+len(start_tag)] == start_tag and (curr+len(start_tag) == len(content) or not content[curr+len(start_tag)].isalnum()):
            stack += 1
            curr += len(start_tag)
        elif content[curr:curr+len(end_tag)] == end_tag:
            stack -= 1
            curr += len(end_tag)
            if stack == 0:
                return first_open, curr
        else:
            curr += 1
    return -1, -1

def fix_lesson_file(file_name, lesson_type, lesson_title):
    file_path = os.path.join(dir_path, file_name)
    if not os.path.exists(file_path):
        return
        
    print(f"\n==========================================")
    print(f"Refatorando {file_name} ({lesson_type})")
    print(f"==========================================")
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # A. PURPLE BAN: Substituir tons de roxo por tons condizentes (azul/emerald/teal/rose)
    # violet -> teal
    content = content.replace("violet-500", "teal-500")
    content = content.replace("violet-600", "teal-600")
    content = content.replace("violet-700", "teal-700")
    content = content.replace("violet-950", "teal-950")
    content = content.replace("violet-100", "teal-100")
    content = content.replace("from-violet-500", "from-teal-500")
    content = content.replace("to-fuchsia-500", "to-emerald-500")
    # purple -> blue
    content = content.replace("purple-500", "blue-500")
    content = content.replace("purple-600", "blue-600")
    content = content.replace("purple-700", "blue-700")
    content = content.replace("purple-950", "blue-950")
    content = content.replace("purple-100", "blue-100")
    # fuchsia -> rose
    content = content.replace("fuchsia-500", "rose-500")
    content = content.replace("fuchsia-600", "rose-600")
    content = content.replace("fuchsia-100", "rose-100")
    # indigo -> cyan
    content = content.replace("indigo-500", "cyan-500")
    content = content.replace("indigo-600", "cyan-600")
    content = content.replace("indigo-700", "cyan-700")
    content = content.replace("indigo-950", "cyan-950")

    # Módulos 1 a 10
    for m in range(1, 11):
        # 1. Localizar o bloco exato do módulo
        func_def = f"const renderModulo{m} = () => ("
        start_idx = content.find(func_def)
        is_helper = True
        
        if start_idx == -1:
            is_helper = False
            start_pat = rf'<TabsContent\s+value="modulo-{m}"[^>]*>'
            match_start = re.search(start_pat, content)
            if not match_start:
                continue
            start_pos = match_start.start()
            block_start, block_end = find_balanced_block(content, start_pos, "<TabsContent", "</TabsContent>")
        else:
            start_pos = start_idx
            paren_start, block_end = find_balanced_parens(content, start_pos + len(func_def) - 5)
            block_start = start_pos

        if block_start == -1 or block_end == -1:
            print(f"  [ERRO] Módulo {m}: Não foi possível delimitar o bloco.")
            continue
            
        block = content[block_start:block_end]
        
        # 2. Corrigir o primeiro ModuleSectionHeader para index="INTRO" no bloco
        header_match = re.search(r'(<ModuleSectionHeader\b[^>]*>)', block, re.DOTALL)
        block_new = block
        if header_match:
            header_str = header_match.group(1)
            new_header_str = re.sub(r'index=\{?[a-zA-Z0-9_"]+\}?', 'index="INTRO"', header_str)
            if header_str != new_header_str:
                block_new = block_new.replace(header_str, new_header_str, 1)

        # 3. Forçar modo "stacked" no ContentAccordion se houver no bloco
        block_new = re.sub(r'<ContentAccordion\s+(?!mode="stacked")', '<ContentAccordion mode="stacked" ', block_new)
        block_new = re.sub(r"<ContentAccordion\s+(?!mode='stacked')", "<ContentAccordion mode='stacked' ", block_new)

        # 4. Corrigir a introdução se m < 10 (C.E.D.E.A de 10 parágrafos)
        if m < 10:
            intro_header_pos = block_new.find('index="INTRO"')
            if intro_header_pos != -1:
                div_pos = block_new.find("<div", intro_header_pos)
                if div_pos != -1:
                    div_start, div_end = find_balanced_block(block_new, div_pos, "<div", "</div>")
                    if div_start != -1 and div_end != -1:
                        div_block = block_new[div_start:div_end]
                        
                        # Extrair classe
                        div_class_match = re.search(r'className=["\']([^"\']+)["\']', div_block)
                        div_class = div_class_match.group(1) if div_class_match else ""
                        expected_class = "space-y-6 text-lg text-justify text-foreground/85 leading-relaxed"
                        
                        # Isolar parágrafos teóricos e boxes aninhados
                        split_idx = div_block.find("<div", 4)
                        if split_idx != -1:
                            intro_p_text = div_block[:split_idx]
                            box_content = div_block[split_idx:-6] # Remove o </div> final balanceado
                        else:
                            intro_p_text = div_block[4:-6] # Remove o <div className=...> e o </div> final
                            box_content = ""
                            
                        p_tags = re.findall(r'<p\b[^>]*>.*?</p>', intro_p_text, re.DOTALL)
                        
                        # Se contagem de parágrafos != 10 ou classe errada, refatorar
                        if len(p_tags) != 10 or div_class != expected_class:
                            clean_ps = []
                            for p in p_tags:
                                p_text = re.sub(r'</?p\b[^>]*>', '', p).strip()
                                p_text = re.sub(r'^<strong>\[[^\]]+\]</strong>\s*', '', p_text)
                                p_text = re.sub(r'^\[[^\]]+\]\s*', '', p_text)
                                if p_text:
                                    clean_ps.append(p_text)
                                    
                            while len(clean_ps) < 5:
                                clean_ps.append(f"A compreensão profunda dos aspectos operacionais e de conformidade legal de {lesson_title} é de extrema valia para consolidar o sucesso nos exames da banca CESGRANRIO.")
                                
                            banner_match = re.search(r'titulo=["\']([^"\']+)["\']', block_new)
                            module_title = banner_match.group(1) if banner_match else f"Módulo {m}"
                            
                            p1 = f"<strong>[Contexto]</strong> {clean_ps[0]}"
                            p2 = f"<strong>[Contexto]</strong> No cenário contemporâneo de exames da banca <strong>CESGRANRIO</strong> para cargos técnicos e de nível médio da Petrobras, o tema de <strong>{module_title}</strong> atua como um conhecimento basilar. {TEMPLATES[lesson_type]['contexto']}"
                            
                            p3 = f"<strong>[Explicação]</strong> {clean_ps[1]}"
                            p4 = f"<strong>[Explicação]</strong> Em termos puramente teóricos, o entendimento aprofundado destas diretrizes serve de orientação para mitigar desvios operacionais. {TEMPLATES[lesson_type]['explicacao']}"
                            
                            p5 = f"<strong>[Demonstração]</strong> {clean_ps[2]}"
                            p6 = f"<strong>[Demonstração]</strong> Como demonstração operacional clássica, a distinção entre a correta conformidade normativa e a negligência processual ilustra a necessidade de controles rígidos. {TEMPLATES[lesson_type]['demonstracao']}"
                            
                            p7 = f"<strong>[Expansão]</strong> {clean_ps[3]}"
                            p8 = f"<strong>[Expansão]</strong> A análise de exceções regulatórias expande-se para além dos fluxos comuns de processos. {TEMPLATES[lesson_type]['expansao']}"
                            
                            p9 = f"<strong>[Aplicação]</strong> {clean_ps[4]}"
                            p10 = f"<strong>[Aplicação]</strong> O alinhamento prático de suprimentos no universo da Petrobras requer do Técnico o respeito absoluto à legislação vigente e aos controles do TCU. {TEMPLATES[lesson_type]['aplicacao']}"
                            
                            new_div_content = f"""<div className="{expected_class}">
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
            {box_content}
          </div>"""
                            block_new = block_new.replace(div_block, new_div_content)

        # 5. Se m == 10 e for simulado e não possuir Accordion ou Consolidation, injetar Simulado Geral
        if m == 10 and lesson_type in ["Qualidade", "Logistica", "Compras"]:
            if "ContentAccordion" not in block_new or "ModuleConsolidation" not in block_new:
                st = SIMULADOS_TEXTS[lesson_type]
                
                if is_helper:
                    t_str = TEMPLATE_MODULO_10_HELPER
                    if lesson_type == "Compras":
                        t_str = t_str.replace("[QUIZ_VAL]", "toQQ(COMPRAS_QUIZZES[\"modulo-10\"])")
                    else:
                        t_str = t_str.replace("[QUIZ_VAL]", "mapQuizQuestions('modulo-10')")
                else:
                    t_str = TEMPLATE_MODULO_10_INLINE
                    if lesson_type == "Qualidade":
                        t_str = t_str.replace("[QUIZ_VAL]", "mapQuizQuestions('modulo-10')")
                    else:
                        t_str = t_str.replace("[QUIZ_VAL]", "mapQuizQuestions('modulo-10')")
                        
                t_str = t_str.replace("[TITLE]", st["title"])
                t_str = t_str.replace("[P1]", st["p1"])
                t_str = t_str.replace("[P2]", st["p2"])
                t_str = t_str.replace("[P3]", st["p3"])
                t_str = t_str.replace("[P4]", st["p4"])
                t_str = t_str.replace("[P5]", st["p5"])
                t_str = t_str.replace("[TEMPLATE_EXPLICACAO]", TEMPLATES[lesson_type]["explicacao"])
                t_str = t_str.replace("[TEMPLATE_DEMONSTRACAO]", TEMPLATES[lesson_type]["demonstracao"])
                t_str = t_str.replace("[TEMPLATE_EXPANSAO]", TEMPLATES[lesson_type]["expansao"])
                t_str = t_str.replace("[TEMPLATE_APLICACAO]", TEMPLATES[lesson_type]["aplicacao"])
                t_str = t_str.replace("[LESSON_TITLE]", lesson_title)
                
                block_new = t_str

        # 6. Reordenar componentes didáticos no bloco do módulo (Consolidação antes do Quiz e FlipCard antes de Consolidação)
        # Identificar as posições dos componentes
        pos_cons = block_new.find("<ModuleConsolidation")
        pos_quiz = block_new.find("<QuizInterativo")
        
        if pos_cons != -1 and pos_quiz != -1 and pos_quiz < pos_cons:
            print(f"  -> Módulo {m}: Reordenando componentes (Consolidação -> Quiz)")
            # Achar o bloco do Quiz
            quiz_start, quiz_end = find_balanced_block(block_new, pos_quiz, "<QuizInterativo", "/>")
            if quiz_start == -1:
                # Tentar com tag de fechamento longa
                quiz_start, quiz_end = find_balanced_block(block_new, pos_quiz, "<QuizInterativo", "</QuizInterativo>")
                
            if quiz_start != -1 and quiz_end != -1:
                quiz_block = block_new[quiz_start:quiz_end]
                # Remover o quiz do local original
                block_new_no_quiz = block_new[:quiz_start] + block_new[quiz_end:]
                # Achar onde a consolidação termina
                cons_pos = block_new_no_quiz.find("<ModuleConsolidation")
                cons_start, cons_end = find_balanced_block(block_new_no_quiz, cons_pos, "<ModuleConsolidation", "/>")
                if cons_start != -1 and cons_end != -1:
                    # Inserir o quiz logo depois do fechamento da consolidação
                    block_new = block_new_no_quiz[:cons_end] + "\n\n      " + quiz_block + block_new_no_quiz[cons_end:]

        # E para FlipCard
        pos_flip = block_new.find("<FlipCard")
        pos_cons_updated = block_new.find("<ModuleConsolidation")
        if pos_flip != -1 and pos_cons_updated != -1 and pos_cons_updated < pos_flip:
            print(f"  -> Módulo {m}: Reordenando componentes (FlipCard -> Consolidação)")
            # Vamos achar e extrair a grid de FlipCards
            # A grid costuma estar envelopada em uma div
            # Encontrar a div que contém o <FlipCard
            div_flip_pos = block_new.rfind("<div", 0, pos_flip)
            if div_flip_pos != -1:
                flip_div_start, flip_div_end = find_balanced_block(block_new, div_flip_pos, "<div", "</div>")
                if flip_div_start != -1 and flip_div_end != -1:
                    flip_block = block_new[flip_div_start:flip_div_end]
                    # Remover do local
                    block_new_no_flip = block_new[:flip_div_start] + block_new[flip_div_end:]
                    # Inserir antes da consolidação
                    cons_pos_new = block_new_no_flip.find("<ModuleConsolidation")
                    if cons_pos_new != -1:
                        block_new = block_new_no_flip[:cons_pos_new] + flip_block + "\n\n      " + block_new_no_flip[cons_pos_new:]

        # Substituir o bloco antigo no conteúdo completo
        if block != block_new:
            content = content[:block_start] + block_new + content[block_end:]

    # Salvar alterações
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"[+] {file_name}: Refatorado com sucesso.")

# Executar a correção para todas as 9 aulas
files_to_fix = [
    ("AulaGestaoQualidadeSuprimento.tsx", "Qualidade", "Gestão de Qualidade"),
    ("AulaLogisticaSuprimento.tsx", "Logistica", "Logística"),
    ("AulaComprasSuprimento.tsx", "Compras", "Gestão de Compras"),
    ("AulaLei13303.tsx", "Lei13303", "Lei das Estatais (Lei 13.303/16)"),
    ("AulaRLCP.tsx", "RLCP", "Regulamento de Licitações e Contratos (RLCP)"),
    ("AulaAdministrativoTributario.tsx", "Tributario", "Administrativo e Tributário"),
    ("AulaContabilidadeBasica.tsx", "Contabilidade", "Contabilidade Básica"),
    ("AulaDireitoTributario.tsx", "Tributario", "Direito Tributário"),
    ("AulaAdministracaoTributaria.tsx", "Tributario", "Administração Tributária")
]

for f_name, l_type, l_title in files_to_fix:
    fix_lesson_file(f_name, l_type, l_title)

print("\nREPARO CONCLUÍDO. EXECUTANDO RE-AUDITORIA...")
os.system("python scratch/audit_lessons.py")
