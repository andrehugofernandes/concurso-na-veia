import re
import sys

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. ModuleBanner: modulo -> numero, corModulo -> variant, icone={...} -> remove
    content = re.sub(r'<ModuleBanner\s+modulo=\{([\d]+)\}\s+titulo="([^"]+)"\s+icone=\{[^\}]+\}\s+corModulo=\{([^\}]+)\}\s+descricao="([^"]+)"\s*/>',
                     r'<ModuleBanner\n            numero={\1}\n            titulo="\2"\n            variant={\3}\n            descricao="\4"\n          />', content)

    # 2. ModuleSectionHeader: titulo -> title, descricao -> description
    content = re.sub(r'<ModuleSectionHeader\s+titulo="([^"]+)"\s+descricao="([^"]+)"\s*/>',
                     r'<ModuleSectionHeader\n              index={1}\n              title="\1"\n              description="\2"\n            />', content)
                     
    # 3. AlertBox: remove descricao="...", change children to have the description if it's empty, or just remove. Actually let's just remove descricao="..." for now.
    # Wait, the error is <AlertBox tipo="danger" titulo="..." descricao="...">
    content = re.sub(r'(<AlertBox[^>]*?)\s+descricao="([^"]*)"', r'\1', content)

    # 4. Comparison: lado1={...} lado2={...}
    # It seems in AulaVerbTenses it was used as <Comparison lado1={{label: "...", content: "..."}} lado2={{label: "...", content: "..."}} />
    # We should replace it with:
    # <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    #   <ComparisonSide tipo="incorrect" titulo="..." items={["..."]} />
    #   <ComparisonSide tipo="correct" titulo="..." items={["..."]} />
    # </div>
    # This might be tricky with regex if it spans multiple lines. Let's look at how it's formatted.
    # Wait, maybe I can just define a wrapper component in AulaVerbTenses for Comparison if it's easier, or fix the imports.
    
    # 5. ModuleConsolidation: modulo -> index, corModulo -> variant
    content = re.sub(r'<ModuleConsolidation\s+modulo=\{([^}]+)\}\s+corModulo=\{([^}]+)\}',
                     r'<ModuleConsolidation\n            index={\1}\n            variant={\2}', content)

    # 6. QuizInterativo: questions -> questoes, modulo -> numero, onScoreSubmit -> remove
    content = re.sub(r'<QuizInterativo\s+questions=\{([^}]+)\}\s+modulo=\{([^}]+)\}\s+onComplete=\{([^}]+)\}\s+onScoreSubmit=\{([^}]+)\}\s*/>',
                     r'<QuizInterativo\n            questoes={\1}\n            numero={\2}\n            titulo="Quiz de Fixação"\n            onComplete={\4}\n          />', content)

    # 7. TimelineItem: step -> passo, title -> titulo, description -> descricao
    content = re.sub(r'<TimelineItem\s+step=\{([^}]+)\}\s+title="([^"]+)"\s+description="([^"]+)"',
                     r'<TimelineItem\n              passo={\1}\n              titulo="\2"\n              descricao="\3"', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    fix_file("c:/Workspace/petrobras-quest/src/components/aulas/ingles/AulaVerbTenses.tsx")
