import sys

def check_file(path):
    print(f"Checking {path}...")
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            print("Successfully read as UTF-8")
            # Procura por caracteres inválidos ou o caractere de substituição especial
            if '' in content:
                print("Found '' in UTF-8 representation!")
            else:
                print("No '' found in UTF-8 representation.")
    except Exception as e:
        print(f"Error reading as UTF-8: {e}")

    try:
        with open(path, 'r', encoding='latin-1') as f:
            content = f.read()
            print("Successfully read as Latin-1")
            # Vamos mostrar algumas linhas que contêm acentuação
            lines = content.split('\n')
            for i, line in enumerate(lines):
                if any(c in line for c in ['á', 'é', 'í', 'ó', 'ú', 'â', 'ê', 'ô', 'ã', 'õ', 'ç']):
                    print(f"Line {i+1}: {line[:100]}")
                    break
    except Exception as e:
        print(f"Error reading as Latin-1: {e}")

check_file("src/components/aulas/ingles/AulaTextComprehension.tsx")
check_file("src/components/aulas/ingles/AulaFalseCognates.tsx")
check_file("src/components/aulas/ingles/AulaReadingStrategies.tsx")
