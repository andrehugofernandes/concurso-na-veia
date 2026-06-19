import re

with open("c:/Workspace/petrobras-quest/src/components/aulas/portugues/data/crase-quizzes.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Substituir ] após a opção D por opção E e ]
# Matches:
#      { label: "D", valor: "..." },
#    ],
new_content = re.sub(
    r'( *\{ *label: *"D".*?\}),?\n *],',
    r'\1,\n      { label: "E", valor: "Nenhuma das alternativas anteriores" },\n    ],',
    content
)

with open("c:/Workspace/petrobras-quest/src/components/aulas/portugues/data/crase-quizzes.ts", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Done")
