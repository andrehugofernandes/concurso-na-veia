import re

file_path = r'c:\Workspace\petrobras-quest\src\components\aulas\matematica\AulaMatrizesDeterminantes.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def inject_rich_intro(content, module_num, title, desc, text1, text2):
    pattern = r'(<TabsContent value="modulo-' + str(module_num) + r'".*?<div className="space-y-\[50px\]">)'
    
    rich_intro = f'''
          {{/* ★ RICH INTRO SECTION: Módulo {module_num} */}}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="{title}"
              description="{desc}"
              variant={{mv[{module_num}]}}
            />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>{text1}</p>
              <p>{text2}</p>
            </div>
          </section>'''
    
    if "RICH INTRO SECTION: Módulo " + str(module_num) in content:
        return content

    content = re.sub(pattern, r'\1\n' + rich_intro, content, flags=re.DOTALL)
    return content

# Module 1
content = inject_rich_intro(content, 1, 
    "Visão Geral: Conceito e Notação de Matrizes", 
    "A estrutura base para organizar e operar grandes volumes de dados na engenharia.",
    "Na indústria de óleo e gás, lidamos com sistemas complexos que geram milhares de pontos de dados simultaneamente: vazões, pressões, temperaturas e concentrações químicas. As matrizes são a ferramenta matemática que permite organizar esses dados multidimensionais em tabelas estruturadas, onde cada célula (elemento) possui uma identidade única e rastreável. Quando um engenheiro da Petrobras modela o fluxo de fluidos em uma rede de dutos, ele não resolve dezenas de equações isoladas; ele constrói uma matriz de coeficientes e resolve o sistema de forma unificada.",
    "Nas provas da CESGRANRIO, o domínio da notação matricial é testado rigorosamente. A banca exige que você saiba construir uma matriz a partir de sua lei de formação e identificar propriedades estruturais (ordem, tipo, identidade) rapidamente. Muitos candidatos perdem tempo precioso resolvendo questões que poderiam ser respondidas quase instantaneamente pelo simples reconhecimento visual de um padrão matricial, como uma matriz triangular ou diagonal."
)

# Module 2
content = inject_rich_intro(content, 2, 
    "Visão Geral: Tipos Especiais de Matrizes", 
    "Identidade, Nula e Diagonal: os atalhos algébricos que simplificam sistemas.",
    "Assim como o número zero e o número um possuem propriedades únicas na aritmética básica (absorvendo ou preservando valores na multiplicação), certas matrizes possuem comportamentos análogos que simplificam drasticamente as operações lineares. A Matriz Identidade funciona como o número '1' do mundo matricial, preservando inalterada qualquer matriz que multiplique. A Matriz Nula atua como o '0', e matrizes Diagonais transformam multiplicações complexas em operações vetoriais extremamente simples.",
    "Para concursos de alto nível como os da Petrobras, reconhecer essas matrizes especiais não é apenas uma questão de teoria, mas de sobrevivência contra o relógio. A CESGRANRIO frequentemente esconde simplificações gigantescas sob a aparência de cálculos laboriosos. Uma matriz que, à primeira vista, exige multiplicações massivas, pode ser decomposta em uma matriz identidade multiplicada por um escalar, reduzindo o tempo de resolução de minutos para segundos."
)

# Module 3
content = inject_rich_intro(content, 3, 
    "Visão Geral: Adição e Subtração de Matrizes", 
    "A combinação linear de estados: operando dados de mesma natureza.",
    "A adição e a subtração de matrizes representam a consolidação ou comparação de dados idênticos em estrutura, mas coletados em momentos ou condições diferentes. Se uma refinaria possui uma matriz de produção diária para diferentes derivados (linhas) e unidades (colunas), a produção total semanal é simplesmente a soma das sete matrizes diárias. A condição sine qua non para essas operações é a compatibilidade de dimensões: só é possível somar ou subtrair o que tem exatamente o mesmo 'formato'.",
    "Embora as operações de soma e subtração pareçam intuitivas e de fácil execução célula a célula, a banca CESGRANRIO costuma inserir essas operações dentro de equações matriciais compostas, testando a capacidade do candidato de manipular variáveis algébricas dentro do arranjo matricial. Dominar a soma é essencial para encontrar variáveis incógnitas que satisfazem uma condição de igualdade em sistemas físicos balanceados."
)

# Module 4
content = inject_rich_intro(content, 4, 
    "Visão Geral: Multiplicação de Matrizes", 
    "A operação que transforma o estado de um sistema físico complexo.",
    "A multiplicação de matrizes é, de longe, a operação mais poderosa e menos intuitiva da álgebra linear básica. Ao contrário da soma, ela não ocorre elemento a elemento, mas combina linhas com colunas, representando uma verdadeira transformação de dados. Na Petrobras, matrizes de transição são usadas para prever a evolução de reservatórios de petróleo ou o desgaste de componentes ao longo do tempo. Multiplicar a matriz de estado atual pela matriz de transição fornece o estado futuro do sistema.",
    "Em termos de prova, a multiplicação de matrizes é o maior 'ralo de tempo' para candidatos desavisados. A regra 'linha por coluna' deve estar automatizada no seu cérebro, juntamente com a compreensão da restrição dimensional: o número de colunas da primeira DEVE ser igual ao número de linhas da segunda. Mais importante ainda, a CESGRANRIO adora testar o fato de que a multiplicação de matrizes não é comutativa (A×B ≠ B×A), criando pegadinhas conceituais frequentes."
)

# Module 5
content = inject_rich_intro(content, 5, 
    "Visão Geral: Transposta e Inversa", 
    "Invertendo relações e refletindo estruturas de dados.",
    "Na matemática aplicada, se uma matriz representa a transformação direta de um estado (como um sistema de equações), a sua Matriz Inversa permite desfazer essa transformação, encontrando as condições iniciais a partir do resultado final. A inversão de matrizes é a chave para solucionar problemas inversos, amplamente utilizados na exploração geofísica e processamento sísmico da Petrobras para determinar as propriedades das rochas a partir do eco acústico.",
    "Calcular a inversa de uma matriz manualmente é trabalhoso, e a CESGRANRIO sabe disso. Por isso, as questões geralmente envolvem matrizes 2x2 (que possuem um atalho rápido de cálculo) ou exploram as propriedades da inversa, como a relação A × A⁻¹ = I. A Matriz Transposta, que simplesmente troca linhas por colunas, também é fortemente cobrada em suas propriedades distributivas, sendo essencial para rotacionar referenciais espaciais."
)

# Module 6
content = inject_rich_intro(content, 6, 
    "Visão Geral: Determinante 2x2", 
    "O indicador fundamental de invertibilidade e escalabilidade do sistema.",
    "O determinante é um número único (um escalar) extraído de uma matriz quadrada que resume uma propriedade fundamental: se as equações representadas por essa matriz são linearmente independentes. Se o determinante for zero, a matriz é 'singular' e não possui inversa — o que, fisicamente, significa que falta informação no sistema para encontrar uma solução única. Para sistemas simples de 2 variáveis, o cálculo cruzado do determinante 2x2 é a primeira linha de diagnóstico de qualquer modelo matemático.",
    "Para a banca CESGRANRIO, o determinante 2x2 é frequentemente o bloco construtor de questões mais elaboradas, inserido dentro de equações polinomiais ou problemas de geometria analítica (como cálculo de áreas de triângulos formados por pontos no plano). Dominar a regra 'diagonal principal menos diagonal secundária' é básico, mas entender como aplicar isso para encontrar variáveis desconhecidas é o diferencial."
)

# Module 7
content = inject_rich_intro(content, 7, 
    "Visão Geral: Determinante 3x3 e Regra de Sarrus", 
    "Avaliando a dependência linear em sistemas espaciais de três dimensões.",
    "Quando o sistema ganha complexidade e passa para três variáveis (como no espaço tridimensional x, y, z), o determinante 3x3 torna-se essencial. Na engenharia, ele calcula volumes, verifica a coplanaridade de vetores de força e valida modelos estruturais estáticos de plataformas. Se as colunas de uma matriz 3x3 representam as tensões tridimensionais, o determinante informa se o material está sujeito a cisalhamento puro ou se há compressão volumétrica.",
    "A Regra de Sarrus é o método definitivo para resolver determinantes 3x3 em provas, devido à sua mecânica visual (repetir as duas primeiras colunas e traçar as diagonais). Candidatos de elite na CESGRANRIO não apenas calculam Sarrus rapidamente, mas reconhecem propriedades de anulação instantânea — como quando há duas linhas proporcionais ou uma linha de zeros —, poupando valiosos minutos que os concorrentes gastam em contas desnecessárias."
)

# Module 8
content = inject_rich_intro(content, 8, 
    "Visão Geral: Teorema de Laplace e Cofatores", 
    "A expansão analítica para matrizes de alta complexidade dimensional.",
    "Matrizes que descrevem sistemas reais de malhas elétricas ou redes de tubulação raramente limitam-se a 3x3. Elas são gigantes, mas muitas vezes esparsas (cheias de zeros). O Teorema de Laplace e a matriz de cofatores oferecem uma estratégia de 'dividir e conquistar', reduzindo o determinante de uma grande matriz ao cálculo de determinantes menores, expandindo a operação ao longo das linhas ou colunas mais convenientes.",
    "O segredo ensinado aos aprovados nas provas da Petrobras é: 'Laplace é um caçador de zeros'. A CESGRANRIO coloca matrizes 4x4 ou maiores com a expectativa de que você não tente aplicar fórmulas gigantescas, mas sim que identifique a linha ou coluna com o maior número de zeros e expanda os cofatores ali. Essa visão estratégica transforma uma questão impossível de 15 minutos em um cálculo simples de 2 minutos."
)

# Module 9
content = inject_rich_intro(content, 9, 
    "Visão Geral: Aplicações Petrobras", 
    "Onde o abstrato encontra a extração, o refino e o controle logístico.",
    "Na Petrobras, a álgebra linear está presente em cada gota de petróleo processada. Modelos de otimização de mistura de óleos (blending) para maximizar o lucro, simulações termodinâmicas do processo de craqueamento e algoritmos de roteamento de frota marítima rodam sobre matrizes maciças. Entender como a variação de um parâmetro (uma célula da matriz) afeta a solução global é o coração da engenharia sistêmica que mantém a companhia no topo.",
    "Neste módulo de aplicações práticas, você não verá apenas matemática, mas a tradução de problemas físicos e logísticos para o papel. A CESGRANRIO aprecia apresentar enunciados textuais densos que descrevem operações industriais, cabendo a você extrair os coeficientes, montar a matriz correta e aplicar a álgebra. A capacidade de modelar o problema vale tanto quanto a habilidade de calcular o resultado final."
)

# Module 10
content = inject_rich_intro(content, 10, 
    "Visão Geral: Simulado CESGRANRIO", 
    "O confronto final com o padrão de cobrança da banca examinadora.",
    "Matrizes e Determinantes podem parecer, à primeira vista, apenas cálculos mecânicos extensos. No entanto, a CESGRANRIO construiu um histórico de avaliar a percepção analítica do candidato. As questões de prova não são projetadas para esgotar sua paciência, mas para testar se você conhece a propriedade que anula um cálculo, a relação que inverte a matriz rapidamente ou a sacada que transforma uma multiplicação em uma soma simples.",
    "O simulado a seguir reúne o perfil exato das provas de nível superior e técnico da Petrobras. Cada questão exige a aplicação direta dos conceitos consolidados nos módulos anteriores. Lembre-se do princípio dos aprovados: antes de iniciar o 'braço' (o cálculo bruto), use a 'cabeça' (as propriedades estruturais). Boa sorte!"
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done inject all modules for Matrizes e Determinantes")
