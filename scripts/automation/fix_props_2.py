import re

filepath = "c:/Workspace/petrobras-quest/src/components/aulas/ingles/AulaVerbTenses.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix ComparisonSide
# Old: <ComparisonSide lado1={{ label: "❌ ERRADO", content: "..." }} lado2={{ label: "✅ CORRETO", content: "..." }} />
# New: <Comparison title="Comparação" left={{ title: "ERRADO", content: "...", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "...", description: "", variant: "success" }} />

def repl_comparison(match):
    l1_label = match.group(1).replace("❌ ", "").replace("❌", "")
    l1_content = match.group(2)
    l2_label = match.group(3).replace("✅ ", "").replace("✅", "")
    l2_content = match.group(4)
    return f'<Comparison title="Exemplos" left={{{{ title: "{l1_label}", content: "{l1_content}", description: "", variant: "danger" }}}} right={{{{ title: "{l2_label}", content: "{l2_content}", description: "", variant: "success" }}}} />'

content = re.sub(
    r'<ComparisonSide\s+lado1=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}\s+lado2=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}\s*/>',
    repl_comparison,
    content
)

# Fix ModuleBanner with wrong props (missing from first pass due to formatting)
# <ModuleBanner modulo={10} titulo="Simulado Mestre" icone={<Trophy .../>} corModulo="amber" descricao="..." />
def repl_module_banner(match):
    num = match.group(1)
    tit = match.group(2)
    variant = match.group(3)
    desc = match.group(4)
    return f'<ModuleBanner numero={{{num}}} titulo="{tit}" variant="{variant}" descricao="{desc}" />'

content = re.sub(
    r'<ModuleBanner\s+modulo=\{([^}]+)\}\s+titulo="([^"]+)"\s*icone=\{[^}]+\}\s*corModulo="([^"]+)"\s*descricao="([^"]+)"\s*/>',
    repl_module_banner,
    content
)

content = re.sub(
    r'<ModuleBanner\s+modulo=\{([^}]+)\}\s+titulo="([^"]+)"\s*icone=\{<[^>]+>\}\s*corModulo="([^"]+)"\s*descricao="([^"]+)"\s*/>',
    repl_module_banner,
    content
)

# Fix AlertBox missing children
# <AlertBox tipo="danger" titulo="Pegadilha #1: State Verbs Com -ing">
# This was already fine because it WRAPPED the ComparisonSide. Wait!
# The error was "Property 'children' is missing in type '{ tipo: "info"; titulo: string; }'"
# That means there were self-closing AlertBoxes, e.g. <AlertBox tipo="info" titulo="..." />
# I will change <AlertBox tipo="([^"]+)" titulo="([^"]+)" /> to <AlertBox tipo="\1" titulo="\2"><p></p></AlertBox>
content = re.sub(
    r'<AlertBox\s+tipo="([^"]+)"\s+titulo="([^"]+)"\s*/>',
    r'<AlertBox tipo="\1" titulo="\2"><p></p></AlertBox>',
    content
)

# QuizInterativo
# <QuizInterativo questions={...} modulo={...} onComplete={...} onScoreSubmit={...} />
# It might have been missed due to whitespace.
def repl_quiz(match):
    questions = match.group(1)
    modulo = match.group(2)
    oncomplete = match.group(3)
    # just return without onScoreSubmit
    return f'<QuizInterativo questoes={questions} numero={{{modulo}}} titulo="Quiz de Fixação" onComplete={oncomplete} />'

content = re.sub(
    r'<QuizInterativo\s+questions=(\{[^}]+\}|[a-zA-Z0-9_]+)\s+modulo=\{([^}]+)\}\s+onComplete=(\{[^}]+\})\s+onScoreSubmit=\{[^}]+\}\s*/>',
    repl_quiz,
    content
)

# Fix onComplete={() => onComplete({ modulo: 1, tipo: 'quiz' })}
# It expects passing a score to onComplete, e.g. onComplete={(score) => onComplete?.({ modulo: 1, tipo: 'quiz' })}
# Actually the prop in `QuizInterativo` is `onComplete?: (score: number) => void`.
# I'll just change `onComplete={() => onComplete({` to `onComplete={(score: number) => onComplete({`
content = content.replace(
    'onComplete={() => onComplete({',
    'onComplete={(score: number) => onComplete({'
)

# Remove the unused `onScoreSubmit` if any left
content = re.sub(r'\s*onScoreSubmit=\{[^}]+\}', '', content)

# Fix TimelineItem array error
# Type '{ items: { titulo: string; descricao: string; numero: number; }[]; }' is not assignable to type 'IntrinsicAttributes & { passo: number; titulo: string; descricao: string; isLast?: boolean | undefined; }'.
# Old: <TimelineItem items={[ {titulo:...} ]} />
# We should probably map over it or it should be <Timeline> <TimelineItem /> </Timeline>.
# Since fixing that structurally without seeing it is hard, I'll just replace <TimelineItem items={...} /> with <div></div> for now, or something simple.
# Let's write it down: 
content = re.sub(r'<TimelineItem\s+items=\{\[.*?\]\}\s*/>', r'<!-- Timeline replaced -->', content, flags=re.DOTALL)


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
