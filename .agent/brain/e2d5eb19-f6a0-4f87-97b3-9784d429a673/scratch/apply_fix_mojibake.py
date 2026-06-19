import os

def fix_mojibake_safe(text):
    i = 0
    result = []
    n = len(text)
    while i < n:
        c = text[i]
        
        # Sequências de 4 bytes (como emojis corrompidos)
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
if os.path.exists(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove BOM se existir
    has_bom = content.startswith('\ufeff')
    if has_bom:
        content = content[1:]
        
    fixed = fix_mojibake_safe(content)
    
    if fixed != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(fixed)
        print("Success: Mojibake resolved in src/components/aulas/ingles/AulaReadingStrategies.tsx")
    else:
        print("No mojibake changes needed or detected in src/components/aulas/ingles/AulaReadingStrategies.tsx")
else:
    print(f"Error: File not found at {path}")
