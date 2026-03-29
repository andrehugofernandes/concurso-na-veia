#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Ler arquivo
with open('src/components/aulas/matematica/AulaRazaoProporcao.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Parágrafos complementares para cada módulo
paragrafos = {
    1: """
              <p>
                A simplificação é uma habilidade crítica muitas vezes negligenciada. Não basta calcular a razão; você deve expressá-la em sua forma mais reduzida. Quando dois números compartilham um divisor comum, você deve dividi-los por esse MDC. Por exemplo, 60/80 simplifica-se a 3/4. Qual é a relevância? Em provas de múltipla escolha, a resposta correta frequentemente está em forma irredutível. Dominar simplificação não é opcional — é essencial.
              </p>

              <p>
                As proporções entre grandezas muitas vezes não são números inteiros. Você pode ter uma razão de 3,5:1 ou 0,75:1. Estas razões decimais funcionam exatamente como razões inteiras — a ordem permanece crítica, a simplificação segue as mesmas regras. Uma densidade de 0,84 kg/L é perfeitamente válida. Quando a CESGRANRIO apresenta razões decimais, ela está testando se você consegue trabalhar confortavelmente além de números inteiros — uma habilidade esperada de um engenheiro.
              </p>
""",
    2: """
              <p>
                Uma propriedade adicional extremamente importante é a adição de proporções. Se a/b = c/d = k, então (a+c)/(b+d) = k também. Esta propriedade permite resolver problemas onde você tem múltiplas quantidades mantendo a mesma proporção. A soma de investimentos está para a soma de lucros em proporção idêntica. Além disso, a inversão de termos (se a/b = c/d, então b/a = d/c) e a alternância (se a/b = c/d, então a/c = b/d) são manipulações algébricas que a CESGRANRIO usa para criar questões que testam compreensão profunda, não apenas memorização.
              </p>

              <p>
                A proporcionalidade é um conceito ainda mais amplo. Quando falamos que o salário é proporcional ao número de horas trabalhadas, estamos dizendo que existe uma constante k tal que Salário = k × Horas. Este conceito de "constante de proporcionalidade" é absolutamente central em toda a matemática do concurso. Funções lineares, taxas, consumo — tudo repousa sobre proporcionalidade. Candidatos que entendem proporção em um nível profundo transitam facilmente entre diferentes formas e contextos de um mesmo conceito.
              </p>
""",
    3: """
              <p>
                É importante reconhecer casos degenerados onde a regra de três aparentemente não funciona. Se uma questão diz "3 máquinas produzem 100 peças em 5 horas; 0 máquinas produzem quantas peças?", a resposta é zero. Isto não é uma falha da regra de três — é uma verdade matemática. O método permanece válido. Mais importante: reconhecer que a regra de três assume que as grandezas variam continuamente, sem não-linearidades. Se a relação não é proporcional, regra de três não se aplica.
              </p>

              <p>
                Outra nuância: a regra de três simples assume que apenas duas grandezas variam. Se a questão menciona mais de duas grandezas variáveis, é regra de três composta. Exemplo: "3 máquinas operando 5 horas produzem 100 peças. Se você usar 5 máquinas operando 8 horas, quantas peças?" Aqui, máquinas E horas variam — isto é composta, não simples. Muitos candidatos tentam aplicar simples e obtêm respostas absurdas. O diagnóstico correto de "simples vs. composta" é a primeira habilidade a dominar.
              </p>
""",
    4: """
              <p>
                Há uma sutileza importante quando as razões não são inteiras. Suponha uma divisão na razão 2:3:5, mas os números são 2.5, 3.7, 5.1. Você ainda aplica o mesmo método: Some = 2.5 + 3.7 + 5.1 = 11.3. Parte = V / 11.3. Depois, x₁ = 2.5 × Parte, etc. O algoritmo não muda; apenas os números se tornam menos "limpos". Este é um teste mental importante — você consegue aplicar o método mesmo quando os números são decimais? Candidatos que decoraram "some inteiros" frequentemente travam.
              </p>

              <p>
                Uma variação importante é a divisão proporcional inversa em casos mais complexos. Imagine que você quer distribuir uma penalidade inversamente ao desempenho. Quem teve melhor desempenho paga menos. Isto requer: (1) Inverter as razões; (2) Converter para inteiros via MMC; (3) Aplicar os três passos. Um exemplo: dois fornecedores têm taxas de entrega de 95% e 85%. Penalidade de R$ 10.000 é distribuída inversamente. Inverta: 1/95 e 1/85. Note que quem teve desempenho melhor (95%) paga menos — é inverso por design.
              </p>
""",
    5: """
              <p>
                A distinção entre direta e inversa fica especialmente clara quando você testa com números específicos. Pegue direta: se 5 pessoas comem 10 pizzas, então 10 pessoas comem 20 pizzas. Pegue inversa: se 5 pessoas terminam um trabalho em 10 horas, 10 pessoas terminam em 5 horas. A magnitude do resultado muda drasticamente. Em provas, candidatos que entendem intuitivamente conseguem estimar se uma resposta é plausível. Se a resposta a uma questão de "trabalho" é "500 horas", é suspeita (trabalho deveria diminuir com mais operadores).
              </p>

              <p>
                Uma aplicação prática sofisticada em Petrobras envolve gráficos de proporcionalidade. Uma plataforma depende de várias variáveis — velocidade do poço, quantidade de óleo, temperatura — e precisa de modelos que capturam se cada par é direta ou inversamente proporcional. Um engenheiro que não consegue diferenciar entre os dois tipos não consegue ler ou construir modelos. A proporcionalidade está por trás de praticamente toda a engenharia de otimização.
              </p>
""",
    6: """
              <p>
                Proporções contínuas aparecem naturalmente em fenômenos repetitivos. Em uma sequência de Fibonacci, a proporção entre termos consecutivos converge para o número áureo φ ≈ 1,618. Isto significa que 3/2 ≈ φ, 5/3 ≈ φ, 8/5 ≈ φ (cada vez mais precisamente). Este tipo de proporção contínua aparece em análise de crescimento econômico, de populações biológicas. A CESGRANRIO testa proporção contínua como "a está para b assim como b está para c". Se você encontrar "razão entre ganhos do ano 1 e ano 2 é igual à razão entre ano 2 e ano 3", você está vendo proporção contínua.
              </p>

              <p>
                A importância prática emerge em parcelamentos e crescimento uniforme. Se uma empresa cresce 20% ao ano consistentemente por 3 anos, a proporção dos valores ao final de cada ano é contínua. Se investimento inicial é R$ 100, após 1 ano: R$ 120. Proporção ano0:ano1 = 100:120 = 5:6. Após ano 2: R$ 144. Proporção ano1:ano2 = 120:144 = 5:6. A proporção é contínua — a mesma razão se repete. Esta estrutura permite prever o valor em qualquer ano sem calcular intermediárias.
              </p>
""",
    7: """
              <p>
                A regra de três composta é conceitualmente uma extensão da simples, mas o risco de erros aumenta exponencialmente com o número de variáveis. O método das setas permanece válido: para cada variável, você desenha uma seta mostrando aumento ou diminuição. Se uma seta aponta na mesma direção que a variável desejada, é DIRETA. Se aponta na direção oposta, é INVERSA. Você monta a proporção como um produto de razões. O erro extremamente comum é não identificar corretamente direta vs. inversa em problemas compostos. Candidatos aplicam "direta" a todas as variáveis ou aplicam inversão aleatória, levando a respostas completamente erradas.
              </p>

              <p>
                Outro erro: arredondar intermediárias. Se você arredondar 7.200/40 para 175 antes de fazer cálculos posteriores, acumula erros. A regra de ouro: nunca arredonde até a resposta final. Além disso, em problemas compostos com muitas variáveis (4 ou 5), organizar dados em uma tabela ou matriz ajuda a não perder informação. Candidatos que trabalham "de cabeça" frequentemente se confundem sobre qual variável já foi contabilizada.
              </p>
""",
    8: """
              <p>
                Escalas se conectam profundamente com proporção, especialmente com precisão de unidades. Um mapa em escala 1:50.000 não significa "divida por 50.000" diretamente — significa "1 unidade de comprimento no mapa representa 50.000 unidades na realidade". Se o mapa está em centímetros, então 1 cm = 50.000 cm = 500 metros. Se a medida no mapa é 8 cm, a realidade é 8 × 500 m = 4 km. Candidatos frequentemente confundem escala com multiplicação simples e obtêm respostas absurdas. A conversão de unidades é crítica — não trabalhe com escalas sem converter para uma unidade comum.
              </p>

              <p>
                Escalas também funcionam em reverso: dados a distância real (4 km) e a escala (1:50.000), qual é o comprimento no mapa? Resposta: 4 km ÷ 50.000 = 4.000 m ÷ 50.000 = 4.000.000 cm ÷ 50.000 = 80 cm. Este tipo de questão reversa é frequentemente cobrada porque exige que candidatos pensem bidireccionalmente sobre escalas, não apenas unidireccionalmente. Modelos mentais superficiais falham aqui.
              </p>
""",
    9: """
              <p>
                No contexto específico de E&P (Exploração e Produção), as aplicações de razão e proporção são entrelaçadas. Um poço tem uma "taxa de depleção" que é a razão entre produção atual e reservas remanescentes. Se um poço com 100 milhões de barris produz 50.000 barris por dia, a razão de depleção é 50.000:100.000.000 = 1:2.000. O poço seca em 2.000 dias. Ajustes de manutenção, custo de operação, risco — tudo envolve estas razões. Uma questão: "Poço A tem razão depleção 1:5.000 e Poço B tem 1:3.000. Qual está em maior risco?" Resposta: Poço B (razão maior = esgota mais rápido).
              </p>

              <p>
                Além disso, razão e proporção aparecem em modelos de escoamento de fluidos, onde vazão (volume/tempo) é uma razão. Análise de confiabilidade usa "falhas por milhão de ciclos". Logística de distribuição usa proporção de demanda. Qualidade de processamento é "produto especificado versus produto total" (rendimento). Alguém trabalhando na Petrobras encontra razões e proporções diariamente — não como conceito acadêmico, mas como ferramenta operacional concreta.
              </p>
""",
    10: """
              <p>
                Uma preparação final crucial envolve revisar os padrões de linguagem usados em provas de CESGRANRIO. A banca frequentemente usa expressões como "a está para b na razão k:n", ou "proporcionalmente ao inverso de...", ou "em escala de...". Cada expressão tem uma tradução matemática específica. Candidatos que dominam estas traduções conseguem converter linguagem natural para símbolos rapidamente. Por exemplo, "uma quantidade é inversamente proporcional ao tempo" = "q × t = k". Expressa em proporção: se t₁ = 5 e q₁ = 20, então q₁ × t₁ = 100 = q₂ × t₂. Uma questão testa não apenas habilidade de calcular, mas de traduzir linguagem.
              </p>

              <p>
                Finalmente, uma prática absolutamente essencial antes da prova oficial é fazer simulados inteiros sob condições de tempo. Razão e proporção não são conceitos isolados — aparecem mescladas com porcentagem, regra de três composta, geometria. Um simulado de 40 questões em 120 minutos exige que você identifique rapidamente qual técnica aplicar, execute sem erros, e se mova. Candidatos que apenas resolvem exercícios isolados frequentemente "travam" em provas reais quando múltiplos conceitos aparecem. O simulado final deste módulo é investimento crítico no sucesso.
              </p>
"""
}

# Estratégia: encontrar cada módulo e inserir antes de </section>
def insere_paragrafos(content, modulo_num, texto_novo):
    """Insere texto novo antes do primeiro </section> de um módulo"""
    pattern = rf'(<TabsContent value="modulo-{modulo_num}">[^<]*<ModuleBanner[^>]*>.*?</ModuleBanner>.*?<div className="space-y-\[50px\]">.*?<section className="bg-card[^>]*>.*?<div className="space-y-6 text-base[^>]*>.*?</p>)(\n\n              <div className="bg-gradient-to-br)'

    replacement = rf'\1{texto_novo}\2'
    return re.sub(pattern, replacement, content, flags=re.DOTALL)

# Aplicar para cada módulo
for modulo_num in range(1, 11):
    if modulo_num in paragrafos:
        content = insere_paragrafos(content, modulo_num, paragrafos[modulo_num])
        print(f"✓ Módulo {modulo_num} expandido")

# Escrever
with open('src/components/aulas/matematica/AulaRazaoProporcao.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# Validar
print(f"\n✓ Arquivo salvo com sucesso!")

# Contar linhas
import subprocess
result = subprocess.run(['wc', '-l', 'src/components/aulas/matematica/AulaRazaoProporcao.tsx'],
                       capture_output=True, text=True, shell=True)
print(f"✓ Linhas totais: {result.stdout.strip()}")
