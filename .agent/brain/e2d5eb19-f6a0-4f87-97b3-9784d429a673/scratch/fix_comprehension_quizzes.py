import re

file_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaTextComprehension.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Definir os blocos exatos e suas substituicoes
replacements = [
    # Modulo 2
    (
        """<QuizInterativo
            questoes={quizM2}
            numero={2}
            onComplete={() => handleModuleComplete("modulo-2")}
          />""",
        """<QuizInterativo
            questoes={quizM2}
            numero={2}
            titulo="Skimming — Leitura Panorâmica"
            onComplete={() => handleModuleComplete("modulo-2")}
          />"""
    ),
    # Modulo 3
    (
        """<QuizInterativo
            questoes={quizM3}
            numero={2}
            onComplete={() => handleModuleComplete("modulo-3")}
          />""",
        """<QuizInterativo
            questoes={quizM3}
            numero={3}
            titulo="Scanning — Localização Precisa"
            onComplete={() => handleModuleComplete("modulo-3")}
          />"""
    ),
    # Modulo 4
    (
        """<QuizInterativo
            questoes={quizM4}
            numero={2}
            onComplete={() => handleModuleComplete("modulo-4")}
          />""",
        """<QuizInterativo
            questoes={quizM4}
            numero={4}
            titulo="Vocabulary in Context"
            onComplete={() => handleModuleComplete("modulo-4")}
          />"""
    ),
    # Modulo 5
    (
        """<QuizInterativo
            questoes={quizM5}
            numero={2}
            onComplete={() => handleModuleComplete("modulo-5")}
          />""",
        """<QuizInterativo
            questoes={quizM5}
            numero={5}
            titulo="Paragraph Structure & Topic Sentences"
            onComplete={() => handleModuleComplete("modulo-5")}
          />"""
    ),
    # Modulo 6
    (
        """<QuizInterativo
            questoes={quizM6}
            numero={2}
            onComplete={() => handleModuleComplete("modulo-6")}
          />""",
        """<QuizInterativo
            questoes={quizM6}
            numero={6}
            titulo="Reference Words & Text Cohesion"
            onComplete={() => handleModuleComplete("modulo-6")}
          />"""
    ),
    # Modulo 7
    (
        """<QuizInterativo
            questoes={quizM7}
            numero={2}
            onComplete={() => handleModuleComplete("modulo-7")}
          />""",
        """<QuizInterativo
            questoes={quizM7}
            numero={7}
            titulo="Tone & Author's Purpose"
            onComplete={() => handleModuleComplete("modulo-7")}
          />"""
    ),
    # Modulo 8
    (
        """<QuizInterativo
            questoes={quizM8}
            numero={2}
            onComplete={() => handleModuleComplete("modulo-8")}
          />""",
        """<QuizInterativo
            questoes={quizM8}
            numero={8}
            titulo="Inference & Implicit Information"
            onComplete={() => handleModuleComplete("modulo-8")}
          />"""
    ),
    # Modulo 9
    (
        """<QuizInterativo
            questoes={quizM9}
            numero={2}
            onComplete={() => handleModuleComplete("modulo-9")}
          />""",
        """<QuizInterativo
            questoes={quizM9}
            numero={9}
            titulo="Reading Comprehension em Provas CESGRANRIO"
            onComplete={() => handleModuleComplete("modulo-9")}
          />"""
    ),
    # Modulo 10
    (
        """<QuizInterativo
            questoes={quizFinal}
            numero={2}
            onComplete={() => handleModuleComplete("modulo-10")}
          />""",
        """<QuizInterativo
            questoes={quizFinal}
            numero={10}
            titulo="Simulado Mestre (Final)"
            onComplete={() => handleModuleComplete("modulo-10")}
          />"""
    )
]

for orig, rep in replacements:
    if orig in content:
        content = content.replace(orig, rep)
        print("Replaced one quiz block!")
    else:
        # Tenta substituir removendo espacos em branco da comparacao
        orig_norm = "\n".join([line.strip() for line in orig.splitlines() if line.strip()])
        rep_norm = rep # mantem formatacao do rep
        
        # Vamos fazer regex ou replace simples
        # Como e pequeno, tentamos achar com espaco flexivel
        pattern = re.escape(orig).replace(r"\ ", r"\s*").replace(r"\n", r"\s*\n\s*")
        content, count = re.subn(pattern, rep, content)
        if count > 0:
            print(f"Replaced fuzzy quiz block! Count: {count}")
        else:
            print("Failed to replace quiz block.")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done fixing QuizInterativo in AulaTextComprehension!")
