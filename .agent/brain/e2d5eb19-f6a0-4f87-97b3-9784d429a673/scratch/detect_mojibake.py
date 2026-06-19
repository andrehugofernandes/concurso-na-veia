import re

files = [
    "src/components/aulas/ingles/AulaConnectors.tsx",
    "src/components/aulas/ingles/AulaFalseCognates.tsx",
    "src/components/aulas/ingles/AulaReadingStrategies.tsx",
    "src/components/aulas/ingles/AulaTextComprehension.tsx",
    "src/components/aulas/ingles/AulaVerbTenses.tsx",
    "src/components/aulas/ingles/AulaVocabulary.tsx"
]

# Sequências típicas de Mojibake de UTF-8 interpretado como CP1252 / ISO-8859-1
# Exemplos: Ã³ (ó), Ã¡ (á), Ã© (é), Ã­ (í), Ãº (ú), Ã§ (ç), Ã£ (ã), Ãµ (õ), Ã¢ (â), Ãª (ê)
mojibake_pattern = re.compile(r'Ã[³¡©­º§£µ¢ªª]|â€”|â€“|Âº|Âª')

for path in files:
    print(f"\n--- Checking {path} ---")
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        matches = mojibake_pattern.findall(content)
        print(f"Total mojibake matches found: {len(matches)}")
        
        # Mostra as primeiras ocorrências
        pos = 0
        for i in range(min(10, len(matches))):
            match = mojibake_pattern.search(content, pos)
            if match:
                idx = match.start()
                start = max(0, idx - 45)
                end = min(len(content), idx + 45)
                snippet = content[start:end].replace('\n', ' ')
                print(f"  Match '{match.group()}' at index {idx}: ... {snippet} ...")
                pos = match.end()
    except Exception as e:
        print(f"  Error reading file: {e}")
