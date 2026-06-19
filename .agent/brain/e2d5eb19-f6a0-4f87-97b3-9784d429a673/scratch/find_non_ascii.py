import sys

# Definir a codificação de saída para evitar erros de console no Windows
sys.stdout.reconfigure(encoding='utf-8')

def find_non_ascii(path):
    print(f"\n--- Analyzing {path} ---")
    with open(path, 'rb') as f:
        bytes_content = f.read()
    
    # Encontra posições com bytes > 127
    non_ascii_indices = [i for i, b in enumerate(bytes_content) if b > 127]
    print(f"Total non-ASCII bytes: {len(non_ascii_indices)}")
    
    # Vamos mostrar alguns deles e as sequências de bytes
    shown = 0
    pos = 0
    while pos < len(bytes_content) and shown < 10:
        if bytes_content[pos] > 127:
            # Pega uma janela de bytes ao redor
            start = max(0, pos - 20)
            end = min(len(bytes_content), pos + 20)
            chunk = bytes_content[start:end]
            # Tenta decodificar o chunk como latin-1 e cp1252 e utf-8
            utf8_decoded = chunk.decode('utf-8', errors='replace')
            latin1_decoded = chunk.decode('latin1', errors='replace')
            cp1252_decoded = chunk.decode('cp1252', errors='replace')
            
            print(f"Non-ASCII byte 0x{bytes_content[pos]:02X} at pos {pos}:")
            print(f"  Raw bytes: {list(chunk)}")
            print(f"  As UTF-8 : {utf8_decoded}")
            print(f"  As Latin1: {latin1_decoded}")
            print(f"  As CP1252: {cp1252_decoded}")
            
            # Avança o pos para depois do chunk para mostrar outras ocorrências
            pos = end
            shown += 1
        else:
            pos += 1

find_non_ascii("src/components/aulas/ingles/AulaTextComprehension.tsx")
