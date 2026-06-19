import re

file_path = r'c:\Workspace\petrobras-quest\src\components\aulas\matematica\AulaAnaliseCombinatoria.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def inject_rich_intro(content, module_num, title, desc, text1, text2):
    # Regex to find <TabsContent value="modulo-X" and the following <div className="space-y-[50px]">
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
    
    # Check if we already injected it
    if "RICH INTRO SECTION: Módulo " + str(module_num) in content:
        return content

    # Inject
    content = re.sub(pattern, r'\1\n' + rich_intro, content, flags=re.DOTALL)
    
    # Replace index={1} in the subsequent ModuleSectionHeader with index={1} (already 1)
    # Actually, the existing one was index={1}, so it's fine to leave it as index={1}, since we inserted an INTRO before it!
    # Wait, the existing one has index={1}. Since our new one is INTRO, the next one should be 1. It ALREADY IS 1!
    # Perfect!
    
    return content

content = inject_rich_intro(
    content, 
    8, 
    "Visão Geral: Propriedades e Identidades",
    "Ferramentas avançadas para acelerar cálculos combinatórios e evitar contas extensas.",
    "As propriedades das combinações, especialmente a simetria e a Relação de Stifel, não são apenas curiosidades matemáticas — elas são atalhos projetados para salvar tempo precioso em provas. A simetria, expressa por C(n, p) = C(n, n-p), afirma que escolher p elementos para formar um grupo é logicamente idêntico a escolher (n-p) elementos para deixar de fora. Isso significa que calcular C(10, 8) é o mesmo que calcular C(10, 2), trocando contas complexas por contas simples. A CESGRANRIO adora explorar essa propriedade em questões que parecem exigir cálculos monstruosos mas que se resolvem em segundos por quem conhece a simetria.",
    "Outro pilar é o Triângulo de Pascal e a Relação de Stifel: C(n, p) = C(n-1, p) + C(n-1, p-1). Esta relação mostra como as combinações de um conjunto podem ser construídas a partir de conjuntos menores. Em provas de concursos, essas identidades frequentemente aparecem de forma disfarçada em problemas de contagem onde você deve agrupar casos ou somar possibilidades. Dominar essas ferramentas separa os candidatos que fazem a prova inteira daqueles que perdem 15 minutos em uma única questão."
)

content = inject_rich_intro(
    content, 
    9, 
    "Visão Geral: Aplicações Petrobras",
    "Como a análise combinatória se traduz em situações reais na indústria de óleo e gás.",
    "A Análise Combinatória é uma ferramenta essencial no dia a dia da engenharia e logística da Petrobras. Longe de ser apenas um exercício acadêmico, a capacidade de contar e organizar possibilidades define a eficiência de operações complexas. Quando um gestor de plataforma precisa alocar 5 técnicos especializados em 3 turnos diferentes, ele está resolvendo um problema de arranjo e combinação. Quando uma equipe de perfuração define a sequência de inserção de 6 tubos de perfuração distintos, eles estão executando uma permutação.",
    "Nas provas para a Petrobras, a CESGRANRIO frequentemente contextualiza problemas clássicos de combinatória dentro desses cenários operacionais. Questões sobre rotas de navios (grafos e caminhos), alocação de equipes (combinações com restrições), e senhas de acesso a sistemas de controle (arranjos com repetição) são comuns. Entender a teoria é apenas o primeiro passo; o diferencial é conseguir ler um enunciado longo sobre refinarias e extrair a estrutura matemática subjacente: 'Isto é um problema de escolha ou de ordenação? Posso repetir elementos?'."
)

content = inject_rich_intro(
    content, 
    10, 
    "Visão Geral: Simulado CESGRANRIO",
    "A hora da verdade. Teste seus conhecimentos com o padrão da banca.",
    "Chegamos à etapa final. A análise combinatória é historicamente uma das disciplinas onde os candidatos mais escorregam na prova da CESGRANRIO. A dificuldade raramente está na matemática bruta ou no cálculo dos fatoriais, mas sim na interpretação do enunciado. A banca é mestre em criar cenários onde a diferença entre 'escolher uma equipe' (combinação) e 'escolher uma diretoria com cargos' (arranjo) é sutil e requer atenção plena a cada palavra.",
    "Neste simulado, reunimos as principais armadilhas e os padrões mais recorrentes. Você enfrentará restrições em permutações (elementos que devem ficar juntos), escolhas independentes que exigem o Princípio Fundamental da Contagem (a regra do 'E'), e alternativas excludentes que pedem a regra da adição (a regra do 'OU'). Lembre-se: não se precipite nas fórmulas. O primeiro passo em toda questão de combinatória deve ser: desenhe o problema, entenda o que está sendo pedido, defina se a ordem importa, e só então aplique a matemática."
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done 8-10")
