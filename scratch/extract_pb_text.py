import os
import re

pb_file = r"C:\Users\andre.hugo\.gemini\antigravity-ide\conversations\d10d56e8-1dda-437b-b5f7-c08b1da45e12.pb"
print(f"Tentando extrair textos legiveis de: {pb_file}")

try:
    with open(pb_file, "rb") as f:
        content = f.read()
    
    # Regex para encontrar blocos legíveis de texto em UTF-8/ASCII
    # Queremos sequências de bytes entre 32 e 126 (ASCII legível) e também caracteres acentuados latinos
    # Vamos usar uma abordagem de decodificação tolerante ou regex binária
    # Permite caracteres imprimíveis, espaços, quebras de linha e acentuação comum em português
    pattern = b'[\\x20-\\x7E\\x0A\\x0D\\xC2-\\xDF][\\x80-\\xBF\\x20-\\x7E\\x0A\\x0D]*'
    
    matches = re.findall(pattern, content)
    
    # Decodificar e filtrar por comprimento mínimo
    text_blocks = []
    for m in matches:
        try:
            decoded = m.decode('utf-8', errors='ignore').strip()
            # Se for maior que 30 caracteres e contiver palavras reais
            if len(decoded) > 40 and any(c.isalpha() for c in decoded):
                # Limpar espaços duplos
                cleaned = re.sub(r'\s+', ' ', decoded)
                text_blocks.append(cleaned)
        except Exception:
            pass
            
    print(f"Total de blocos de texto extraidos: {len(text_blocks)}")
    
    # Mostrar os maiores blocos que contêm termos em português ou tópicos do projeto
    print("\nAlguns blocos longos extraidos:")
    count = 0
    for block in sorted(text_blocks, key=len, reverse=True):
        if count >= 20:
            break
        # Mostrar se contiver palavras comuns do projeto para sabermos se é conversa
        if any(w in block.lower() for w in ["aula", "petrobras", "quest", "cesgranrio", "vaga", "materia", "modulo", "concurso"]):
            print(f"\n--- Bloco {count+1} (Comprimento {len(block)}):")
            print(block[:500] + ("..." if len(block) > 500 else ""))
            count += 1
            
except Exception as e:
    print(f"Erro: {e}")
