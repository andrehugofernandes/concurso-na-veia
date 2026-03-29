import re

filepath = "c:/Workspace/petrobras-quest/src/components/aulas/ingles/AulaVerbTenses.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the extra `})}` from handleModuleComplete 
content = re.sub(r'onComplete=\{\(\)\s*=>\s*handleModuleComplete\("([^"]+)"\)\}\)\}', r'onComplete={() => handleModuleComplete("\1")}', content)
content = re.sub(r'onComplete=\{\(score: number\)\s*=>\s*handleModuleComplete\("([^"]+)"\)\}\)\}', r'onComplete={(score: number) => handleModuleComplete("\1")}', content)

# Fix <QuizInterativo questions={...} modulo={...} ... />
# Some might not have onScoreSubmit
def repl_quiz(match):
    q = match.group(1)
    mod = match.group(2)
    return f'questoes={{{q}}}\n            numero={{{mod}}}'

content = re.sub(r'questions=\{([^}]+)\}\s+modulo=\{([^}]+)\}', repl_quiz, content)

# Remove onScoreSubmit={...} completely if it exists
content = re.sub(r'onScoreSubmit=\{[^}]+\}', '', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
