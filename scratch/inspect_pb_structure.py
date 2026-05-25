import os

conv_dir = r"C:\Users\andre.hugo\.gemini\antigravity-ide\conversations"
files = [f for f in os.listdir(conv_dir) if f.endswith('.pb')]
print(f"Total de arquivos .pb: {len(files)}")

for f in files[:5]:
    path = os.path.join(conv_dir, f)
    size = os.path.getsize(path)
    print(f"\nArquivo: {f} ({size} bytes)")
    try:
        with open(path, 'rb') as file:
            header = file.read(100)
            print(f"  Header (raw): {header[:50]}")
            print(f"  Header (hex): {header[:20].hex()}")
            # Tenta decodificar como texto
            try:
                print(f"  Header (text): {header[:100].decode('utf-8', errors='ignore')}")
            except:
                pass
    except Exception as e:
        print(f"  Erro ao ler: {e}")
