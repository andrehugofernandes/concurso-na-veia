import re

def fix_mojibake_safe(text):
    i = 0
    result = []
    n = len(text)
    while i < n:
        c = text[i]
        
        # Sequências de 4 bytes (como emojis corrompidos)
        # Em latin1: ðŸ + 2 chars. Ex: ðŸ” (detectamos 'ð' e 'Ÿ')
        if c == 'ð' and i + 3 < n and text[i+1] == 'Ÿ':
            c2 = text[i+1]
            c3 = text[i+2]
            c4 = text[i+3]
            try:
                quad = c + c2 + c3 + c4
                decoded = quad.encode('latin1').decode('utf-8')
                result.append(decoded)
                i += 4
                continue
            except Exception:
                pass
        
        # Sequências de 3 bytes (como travessões, aspas, etc.)
        # Em latin1: começam com 'â'
        if c == 'â' and i + 2 < n:
            c2 = text[i+1]
            c3 = text[i+2]
            try:
                triple = c + c2 + c3
                decoded = triple.encode('latin1').decode('utf-8')
                result.append(decoded)
                i += 3
                continue
            except Exception:
                pass
                
        # Sequências de 2 bytes (acentos comuns em português)
        # Em latin1: começam com 'Ã' ou 'Â'
        if (c == 'Ã' or c == 'Â') and i + 1 < n:
            c2 = text[i+1]
            try:
                pair = c + c2
                decoded = pair.encode('latin1').decode('utf-8')
                result.append(decoded)
                i += 2
                continue
            except Exception:
                pass
                
        result.append(c)
        i += 1
    return "".join(result)

path = "src/components/aulas/ingles/AulaReadingStrategies.tsx"
with open(path, 'r', encoding='utf-8') as f:
    original = f.read()

# Remove BOM se existir para facilitar
if original.startswith('\ufeff'):
    original = original[1:]

fixed = fix_mojibake_safe(original)

# Vamos ver se mudou alguma coisa
if fixed != original:
    print("Changes detected! Writing to test file...")
    test_path = "src/components/aulas/ingles/AulaReadingStrategies_fixed.tsx"
    with open(test_path, 'w', encoding='utf-8') as f:
        f.write(fixed)
    print("Saved to src/components/aulas/ingles/AulaReadingStrategies_fixed.tsx")
    
    # Vamos contar quantas ocorrências de 'Ã' ou 'Â' ainda existem
    remaining_mojibake = len(re.findall(r'Ã[³µ§£­¡©ª¢´º]', fixed))
    print(f"Remaining mojibake count estimate: {remaining_mojibake}")
else:
    print("No changes made. Something is wrong with our algorithm or characters.")
