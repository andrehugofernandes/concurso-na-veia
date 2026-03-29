import os
import re

p = 'src/components/aulas/ingles/AulaVocabulary.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. ModuleBanner -> Adicionar descricao padrao se nao houver
    # <ModuleBanner numero={1} titulo="..." variant={...} />
    c = re.sub(
        r'<ModuleBanner\s+(numero=\{\d+\})\s+(titulo=".*?")\s+(variant=\{.*?\})\s+/>',
        r'<ModuleBanner \1 \2 descricao="Domínio de termos técnicos e expressões essenciais do setor." \3 />',
        c
    )

    # 2. TimelineItem -> Traduzir props step, title, description
    c = c.replace('step={', 'passo={')
    c = c.replace('title={', 'titulo={')
    c = c.replace('description={', 'descricao={')
    
    # 3. QuizInterativo -> Adicionar titulo se nao houver
    # <QuizInterativo questoes={quizM1} numero={3}
    c = re.sub(
        r'<QuizInterativo\s+(questoes=\{quizM\d+\})\s+(numero=\{\d+\})',
        r'<QuizInterativo \1 titulo="Desafio de Vocabulário" \2',
        c
    )

    # 4. Comparison -> Traduzir lado1/lado2 para left/right
    # (Regex mais complexo aqui se necessário, mas vamos tentar replace simples primeiro se o padrão for fixo)
    c = c.replace('lado1={{', 'left={{')
    c = c.replace('lado2={{', 'right={{')
    # Dentro do Comparison as props são title, content, description, variant
    # O Inglês usa label e content. Vamos ajustar em uma segunda passada ou via regex.
    # label -> title
    c = re.sub(r'(left|right)=\{\{\s*label:\s*(.*?),', r'\1={{ title: \2,', c)
    # Adicionar description e variant vazias para calar o tsc se não existirem
    # Este é um fix agressivo, talvez precise de ajuste manual.

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaVocabulary.tsx Basic Interface Fixed.")
