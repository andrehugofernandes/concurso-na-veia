import re

# 1. Corrigir AulaTextComprehension.tsx e AulaFalseCognates.tsx
english_files = [
    r"src/components/aulas/ingles/AulaTextComprehension.tsx",
    r"src/components/aulas/ingles/AulaFalseCognates.tsx"
]

for file_path in english_files:
    print(f"Limpando ModuleConsolidation em: {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Remover o ModuleConsolidation do arquivo
    initial_len = len(content)
    
    # Remove qualquer variação de espaçamento do bloco do ModuleConsolidation
    # Exemplo:
    # <ModuleConsolidation
    #             modulo={1}
    #             corModulo={mv[1]}
    #             onComplete={() => handleModuleComplete("modulo-1")}
    #           />
    pattern_consolidation = r"\s*<ModuleConsolidation\s+modulo=\{\d+\}\s+corModulo=\{mv\[\d+\]\}\s+onComplete=\{\(\) => handleModuleComplete\(\"modulo-\d+\"\)\}\s*/>\s*"
    content = re.sub(pattern_consolidation, "\n", content)
    
    # Corrigir o QuizInterativo adicionando a propriedade titulo
    # Exemplo:
    #           <QuizInterativo
    #             questoes={quizM1}
    #             numero={2}
    #             onComplete={() => handleModuleComplete("modulo-1")}
    #           />
    # Substituir por:
    #           <QuizInterativo
    #             questoes={quizM1}
    #             titulo="Quiz Interativo"
    #             numero={2}
    #             onComplete={() => handleModuleComplete("modulo-1")}
    #           />
    content = content.replace("          <QuizInterativo\n            questoes={", "          <QuizInterativo\n            titulo=\"Quiz Interativo\"\n            questoes={")
    content = content.replace("          <QuizInterativo\r\n            questoes={", "          <QuizInterativo\r\n            titulo=\"Quiz Interativo\"\r\n            questoes={")
    content = content.replace("                    <QuizInterativo\n            questoes={", "                    <QuizInterativo\n            titulo=\"Quiz Interativo\"\n            questoes={")
    content = content.replace("                    <QuizInterativo\r\n            questoes={", "                    <QuizInterativo\r\n            titulo=\"Quiz Interativo\"\r\n            questoes={")
    
    final_len = len(content)
    print(f"-> Limpeza concluída: de {initial_len} para {final_len} bytes.")
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

# 2. Corrigir AulaVerbTenses.tsx (remover onComplete de ModuleConsolidation)
verb_tenses_path = r"src/components/aulas/ingles/AulaVerbTenses.tsx"
print(f"Corrigindo ModuleConsolidation em: {verb_tenses_path}")
with open(verb_tenses_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remover 'onComplete={() => handleModuleComplete("modulo-X")}' de ModuleConsolidation
# Mantendo o restante das propriedades
# s1 para Windows, s2 para Unix
for x in range(1, 11):
    num_str = str(x)
    content = content.replace('              onComplete={() => handleModuleComplete("modulo-' + num_str + '")}\n', '')
    content = content.replace('              onComplete={() => handleModuleComplete("modulo-' + num_str + '")}\r\n', '')
    content = content.replace('            onComplete={() => handleModuleComplete("modulo-' + num_str + '")}\n', '')
    content = content.replace('            onComplete={() => handleModuleComplete("modulo-' + num_str + '")}\r\n', '')

with open(verb_tenses_path, "w", encoding="utf-8") as f:
    f.write(content)
print("-> AulaVerbTenses.tsx corrigido com sucesso!")

# 3. Corrigir AulaTrigonometria.tsx
trig_path = r"src/components/aulas/matematica/AulaTrigonometria.tsx"
print(f"Corrigindo ModuleConsolidation e maceteVisual em: {trig_path}")
with open(trig_path, "r", encoding="utf-8") as f:
    content = f.read()

# Substituir maceteVisual por sinteseEstrategica e remover onComplete de ModuleConsolidation
content = content.replace("maceteVisual={", "sinteseEstrategica={")

for x in range(1, 11):
    num_str = str(x)
    content = content.replace('              onComplete={() => handleModuleComplete("modulo-' + num_str + '")}\n', '')
    content = content.replace('              onComplete={() => handleModuleComplete("modulo-' + num_str + '")}\r\n', '')
    content = content.replace('            onComplete={() => handleModuleComplete("modulo-' + num_str + '")}\n', '')
    content = content.replace('            onComplete={() => handleModuleComplete("modulo-' + num_str + '")}\r\n', '')

with open(trig_path, "w", encoding="utf-8") as f:
    f.write(content)
print("-> AulaTrigonometria.tsx corrigido com sucesso!")

# 4. Corrigir AulaLei13303.tsx
lei_path = r"src/components/aulas/administracao/AulaLei13303.tsx"
print(f"Adicionando import de useEffect em: {lei_path}")
with open(lei_path, "r", encoding="utf-8") as f:
    content = f.read()

# Substituir import { useState } from "react"; por import { useState, useEffect } from "react";
content = content.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";')
content = content.replace('import { useState,  } from "react";', 'import { useState, useEffect } from "react";')

with open(lei_path, "w", encoding="utf-8") as f:
    f.write(content)
print("-> AulaLei13303.tsx corrigido com sucesso!\n")
