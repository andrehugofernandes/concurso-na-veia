import os

file_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaReadingStrategies.tsx"

encodings = ['utf-8', 'latin-1', 'cp1252', 'utf-16']

for enc in encodings:
    try:
        with open(file_path, "r", encoding=enc) as f:
            content = f.read()
        
        # Conta a quantidade de U+FFFD ()
        num_errors = content.count('\uFFFD')
        print(f"Encoding: {enc} | Length: {len(content)} | U+FFFD count: {num_errors}")
        
        # Se nao tiver erros, mostra um pequeno trecho com acentos
        if num_errors == 0:
            pos = content.find("modulo-1")
            if pos != -1:
                print(f"  Snippet: {content[pos:pos+150]}")
    except Exception as e:
        print(f"Encoding: {enc} failed with error: {e}")
