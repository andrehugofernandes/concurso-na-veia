import re

file_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaTextComprehension.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Substituir a inicialização do mv para usar getModuleVariant(1)
# Já foi feito via replace_file_content no passo anterior, mas vamos garantir.

# 2. Definições de substituições para AlertBoxes e ComparisonSides incorretos

replacements = [
    # Módulo 4 - Dica: Scanning para Detalhes de Preço/Data
    (
        """                      <AlertBox
                        tipo="info"
                        titulo="Dica: Scanning para Detalhes de Preço/Data"
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Pegadinha", content: "'cost' aparece 3x: 1) initial cost, 2) maintenance cost, 3) total cost — qual é a correta?" }}
                          lado2={{ label: "✅ Solução", content: "Pergunta 'What was the project cost?' → procura 'project cost' ou valida no contexto qual 'cost' responde" }}
                        />
                      </AlertBox>""",
        """                      <AlertBox
                        tipo="info"
                        titulo="Dica: Scanning para Detalhes de Preço/Data"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <ComparisonSide
                            tipo="incorrect"
                            titulo="Pegadinha"
                            items={["'cost' aparece 3x: 1) initial cost, 2) maintenance cost, 3) total cost — qual é a correta?"]}
                          />
                          <ComparisonSide
                            tipo="correct"
                            titulo="Solução"
                            items={["Pergunta 'What was the project cost?' → procura 'project cost' ou valida no contexto qual 'cost' responde"]}
                          />
                        </div>
                      </AlertBox>"""
    ),
    # Módulo 4 - Pegadinha: Sinônimos ao Invés de Palavra-Chave Exata
    (
        """                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Sinônimos ao Invés de Palavra-Chave Exata"
                        descricao="Pergunta diz 'When started?' mas o texto diz 'When commenced?' ou 'When began?'. Você procura 'started' e não acha. Tenta 'commenced' ou 'began' — encontra. Prepare-se mentalmente para sinônimos."
                      >
                        <ComparisonSide
                          lado1={{ label: "Pergunta usa", content: "'started' ou 'began' ou 'commenced' — sinônimos" }}
                          lado2={{ label: "Texto pode usar", content: "'began' enquanto pergunta usa 'started' — procura ambas as formas" }}
                        />
                      </AlertBox>""",
        """                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Sinônimos ao Invés de Palavra-Chave Exata"
                      >
                        <p className="text-sm text-muted-foreground mb-4">
                          Pergunta diz 'When started?' mas o texto diz 'When commenced?' ou 'When began?'. Você procura 'started' e não acha. Tenta 'commenced' ou 'began' — encontra. Prepare-se mentalmente para sinônimos.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ComparisonSide
                            tipo="incorrect"
                            titulo="Pergunta usa"
                            items={["'started' ou 'began' ou 'commenced' — sinônimos"]}
                          />
                          <ComparisonSide
                            tipo="correct"
                            titulo="Texto pode usar"
                            items={["'began' enquanto pergunta usa 'started' — procura ambas as formas"]}
                          />
                        </div>
                      </AlertBox>"""
    ),
    # Módulo 4 - Dica: Use Falsos Cognatos a Seu Favor
    (
        """                      <AlertBox
                        tipo="info"
                        titulo="Dica: Use Falsos Cognatos a Seu Favor"
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Falso Cognato", content: "'The actual reason was...' = NÃO 'a razão atual' → 'a razão REAL'" }}
                          lado2={{ label: "✅ Correto", content: "'The actual reason' = 'A razão VERDADEIRA/REAL' (não tempo presente)" }}
                        />
                      </AlertBox>""",
        """                      <AlertBox
                        tipo="info"
                        titulo="Dica: Use Falsos Cognatos a Seu Favor"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <ComparisonSide
                            tipo="incorrect"
                            titulo="Falso Cognato"
                            items={["'The actual reason was...' = NÃO 'a razão atual' → 'a razão REAL'"]}
                          />
                          <ComparisonSide
                            tipo="correct"
                            titulo="Correto"
                            items={["'The actual reason' = 'A razão VERDADEIRA/REAL' (não tempo presente)"]}
                          />
                        </div>
                      </AlertBox>"""
    ),
    # Módulo 4 - Pegadinha: Múltiplos Significados da Mesma Palavra
    (
        """                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Múltiplos Significados da Mesma Palavra"
                        descricao="'Bank' = banco (dinheiro) ou margem (rio). 'Run' = correr ou funcionar. 'Plant' = planta (vegetal) ou fábrica. Em contexto Petrobras, 'plant' = fábrica/refinaria."
                      >
                        <ComparisonSide
                          lado1={{ label: "Significado 1", content: "'Plant' = vegetal (biologia)" }}
                          lado2={{ label: "Significado 2 (Petrobras)", content: "'The plant produces 50,000 barrels daily' = refinaria, não flor!" }}
                        />
                      </AlertBox>""",
        """                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Múltiplos Significados da Mesma Palavra"
                      >
                        <p className="text-sm text-muted-foreground mb-4">
                          'Bank' = banco (dinheiro) ou margem (rio). 'Run' = correr ou funcionar. 'Plant' = planta (vegetal) ou fábrica. Em contexto Petrobras, 'plant' = fábrica/refinaria.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ComparisonSide
                            tipo="incorrect"
                            titulo="Significado 1"
                            items={["'Plant' = vegetal (biologia)"]}
                          />
                          <ComparisonSide
                            tipo="correct"
                            titulo="Significado 2 (Petrobras)"
                            items={["'The plant produces 50,000 barrels daily' = refinaria, não flor!"]}
                          />
                        </div>
                      </AlertBox>"""
    ),
    # Módulo 5 - Dica: Procure Conclusões no Fim
    (
        """                      <AlertBox
                        tipo="info"
                        titulo="Dica: Procure Conclusões no Fim"
                      >
                        <ComparisonSide
                          lado1={{ label: "Usual", content: "'The protocol has three components. (1)... (2)... (3)...'" }}
                          lado2={{ label: "Raro", content: "'(1)... (2)... (3)... Therefore, the protocol has three components.'" }}
                        />
                      </AlertBox>""",
        """                      <AlertBox
                        tipo="info"
                        titulo="Dica: Procure Conclusões no Fim"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <ComparisonSide
                            tipo="incorrect"
                            titulo="Usual"
                            items={["'The protocol has three components. (1)... (2)... (3)...'"]}
                          />
                          <ComparisonSide
                            tipo="correct"
                            titulo="Raro"
                            items={["'(1)... (2)... (3)... Therefore, the protocol has three components.'"]}
                          />
                        </div>
                      </AlertBox>"""
    ),
    # Módulo 6 - Dica: Procure o Noun Mais Próximo
    (
        """                      <AlertBox
                        tipo="info"
                        titulo="Dica: Procure o Noun Mais Próximo"
                      >
                        <ComparisonSide
                          lado1={{ label: "Frases separadas", content: "'The pipeline was repaired. The team also inspected the valve. It was corroded.' — O que é 'It'? Valve (última coisa mencionada)" }}
                          lado2={{ label: "Valide por lógica", content: "Se 'It' = pipeline, 'was corroded' não faz sentido (pipeline foi reparado, não corroído). Logo 'It' = valve." }}
                        />
                      </AlertBox>""",
        """                      <AlertBox
                        tipo="info"
                        titulo="Dica: Procure o Noun Mais Próximo"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <ComparisonSide
                            tipo="incorrect"
                            titulo="Frases separadas"
                            items={["'The pipeline was repaired. The team also inspected the valve. It was corroded.' — O que é 'It'? Valve (última coisa mencionada)"]}
                          />
                          <ComparisonSide
                            tipo="correct"
                            titulo="Valide por lógica"
                            items={["Se 'It' = pipeline, 'was corroded' não faz sentido (pipeline foi reparado, não corroído). Logo 'It' = valve."]}
                          />
                        </div>
                      </AlertBox>"""
    ),
    # Módulo 7 - Dica: Tom e Opinião
    (
        """                      <AlertBox
                        tipo="info"
                        titulo="Dica: Tom e Opinião"
                      >
                        <ComparisonSide
                          lado1={{ label: "Tone", content: "FORMAL/NEUTRO (estrutura, adjetivos)" }}
                          lado2={{ label: "Opinion", content: "Crítica (o que o autor acredita)" }}
                        />
                      </AlertBox>""",
        """                      <AlertBox
                        tipo="info"
                        titulo="Dica: Tom e Opinião"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <ComparisonSide
                            tipo="incorrect"
                            titulo="Tone"
                            items={["FORMAL/NEUTRO (estrutura, adjetivos)"]}
                          />
                          <ComparisonSide
                            tipo="correct"
                            titulo="Opinion"
                            items={["Crítica (o que o autor acredita)"]}
                          />
                        </div>
                      </AlertBox>"""
    ),
    # Módulo 7 - Pegadinha: Purpose vs Main Idea
    (
        """                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Purpose vs Main Idea"
                        descricao="Purpose é POR QUÊ autor escreve. Main Idea é SOBRE O QUÊ. Texto pode ter main idea 'Protocol has three steps' e purpose 'persuadir você adotar'."
                      >
                        <ComparisonSide
                          lado1={{ label: "Main Idea", content: "'The protocol has 3 steps'" }}
                          lado2={{ label: "Purpose", content: "'Persuadir você a adotar o protocol'" }}
                        />
                      </AlertBox>""",
        """                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Purpose vs Main Idea"
                      >
                        <p className="text-sm text-muted-foreground mb-4">
                          Purpose é POR QUÊ autor escreve. Main Idea é SOBRE O QUÊ. Texto pode ter main idea 'Protocol has three steps' e purpose 'persuadir você adotar'.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ComparisonSide
                            tipo="incorrect"
                            titulo="Main Idea"
                            items={["'The protocol has 3 steps'"]}
                          />
                          <ComparisonSide
                            tipo="correct"
                            titulo="Purpose"
                            items={["'Persuadir você a adotar o protocol'"]}
                          />
                        </div>
                      </AlertBox>"""
    ),
    # Módulo 8 - Dica: Cuidado com a Lógica
    (
        """                      <AlertBox
                        tipo="info"
                        titulo="Dica: Cuidado com a Lógica"
                      >
                        <ComparisonSide
                          lado1={{ label: "✓ Inferência Válida", content: "Lucros causaram raise (causa-efeito suportado)" }}
                          lado2={{ label: "❌ Over-Inference", content: "CEO é generoso (nenhuma evidência, especulação)" }}
                        />
                      </AlertBox>""",
        """                      <AlertBox
                        tipo="info"
                        titulo="Dica: Cuidado com a Lógica"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <ComparisonSide
                            tipo="incorrect"
                            titulo="Over-Inference"
                            items={["CEO é generoso (nenhuma evidência, especulação)"]}
                          />
                          <ComparisonSide
                            tipo="correct"
                            titulo="Inferência Válida"
                            items={["Lucros causaram raise (causa-efeito suportado)"]}
                          />
                        </div>
                      </AlertBox>"""
    ),
    # Módulo 8 - Pegadinha: Confundir Implicação com Garantia
    (
        """                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Confundir Implicação com Garantia"
                        descricao="'The protocol prevents 95% of failures.' — Você infere que 'o protocol é efetivo'. Você NÃO pode inferir que '100% de failures são prevenidas' — porque o texto diz 95%, não 100%."
                      >
                        <ComparisonSide
                          lado1={{ label: "✓ Inferência", content: "'Protocol é efetivo' (95% suporta isto)" }}
                          lado2={{ label: "❌ Over-inference", content: "'Protocol é perfeito' (apenas 95%, não 100%)" }}
                        />
                      </AlertBox>""",
        """                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Confundir Implicação com Garantia"
                      >
                        <p className="text-sm text-muted-foreground mb-4">
                          'The protocol prevents 95% of failures.' — Você infere que 'o protocol é efetivo'. Você NÃO pode inferir que '100% de failures são prevenidas' — porque o texto diz 95%, não 100%.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ComparisonSide
                            tipo="incorrect"
                            titulo="Over-inference"
                            items={["'Protocol é perfeito' (apenas 95%, não 100%)"]}
                          />
                          <ComparisonSide
                            tipo="correct"
                            titulo="Inferência"
                            items={["'Protocol é efetivo' (95% suporta isto)"]}
                          />
                        </div>
                      </AlertBox>"""
    )
]

for orig, rep in replacements:
    # Remove eventuais diferenças menores de espaço no início e fim
    orig_clean = orig.strip()
    rep_clean = rep.strip()
    if orig_clean in content:
        content = content.replace(orig_clean, rep_clean)
        print("Replaced one block successfully!")
    else:
        # Se falhar a correspondência estrita por causa de quebras de linha ou tabs,
        # vamos fazer uma substituição simplificada ou tentar achar limpando espaços extras
        print("Strict match failed for block, trying fuzzy replace...")
        
        # Vamos normalizar quebras de linha para fins de comparação
        content_normalized = "\n".join([line.rstrip() for line in content.splitlines()])
        orig_normalized = "\n".join([line.rstrip() for line in orig.splitlines()])
        rep_normalized = "\n".join([line.rstrip() for line in rep.splitlines()])
        
        if orig_normalized in content_normalized:
            content_normalized = content_normalized.replace(orig_normalized, rep_normalized)
            content = content_normalized
            print("Fuzzy replaced one block successfully!")
        else:
            print("Failed to replace block.")

# Salva de volta
with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Finished processing AulaTextComprehension!")
