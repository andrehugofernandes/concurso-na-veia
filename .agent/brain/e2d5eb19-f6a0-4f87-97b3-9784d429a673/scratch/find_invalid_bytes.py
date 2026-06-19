import sys

# Definir a codificação de saída para evitar erros de console no Windows
sys.stdout.reconfigure(encoding='utf-8')

def find_bad_chars(path):
    print(f"\n--- Analyzing {path} ---")
    with open(path, 'rb') as f:
        bytes_content = f.read()
    
    # Tenta decodificar de várias formas e ver qual funciona melhor
    # Se o arquivo foi gravado como UTF-8 contendo a representação de caracteres especiais corrompidos (como bytes utf-8 brutos que se transformaram em bytes inválidos)
    # Vamos ver se existem sequências de bytes comuns em ISO-8859-1 que foram lidas como UTF-8
    
    # Vamos ler em utf-8 ignorando erros e ver onde ocorrem caracteres estranhos
    content_utf8 = bytes_content.decode('utf-8', errors='replace')
    
    bad_count = content_utf8.count('\ufffd')
    print(f"Number of U+FFFD (replacement char) found: {bad_count}")
    
    # Imprime as primeiras 5 ocorrências de \ufffd e seu contexto
    if bad_count > 0:
        pos = 0
        for i in range(min(5, bad_count)):
            idx = content_utf8.find('\ufffd', pos)
            if idx != -1:
                start = max(0, idx - 40)
                end = min(len(content_utf8), idx + 40)
                snippet = content_utf8[start:end].replace('\n', ' ')
                print(f"Occurrence {i+1} at index {idx}: ... {snippet} ...")
                pos = idx + 1

find_bad_chars("src/components/aulas/ingles/AulaTextComprehension.tsx")
find_bad_chars("src/components/aulas/ingles/AulaFalseCognates.tsx")
find_bad_chars("src/components/aulas/ingles/AulaReadingStrategies.tsx")
