import re

file_path = r'c:\Workspace\petrobras-quest\src\components\aulas\matematica\AulaAnaliseCombinatoria.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace index={1} with index="INTRO" in the RICH INTRO SECTION blocks
content = re.sub(
    r'(/\*.*?RICH INTRO SECTION.*?\*/\s*<section.*?<ModuleSectionHeader\s+)index=\{1\}',
    r'\1index="INTRO"',
    content,
    flags=re.DOTALL
)

# Wait, if we change index={1} to "INTRO", we should change index={2} to index={1} for the NEXT header in that module?
# Actually, the user's codebase just wants the rich intro header to have index="INTRO".
# If I leave the next one as index={2}, is that bad?
# In AulaPorcentagem.tsx I had index="INTRO" then index={1}.
# Let's fix index={2} to index={1} in the first 7 modules.
content = re.sub(
    r'(<section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">\s*<ModuleSectionHeader\s+)index=\{2\}',
    r'\1index={1}',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done 1-7")
