import os
import zlib
import gzip

pb_file = r"C:\Users\andre.hugo\.gemini\antigravity-ide\conversations\d10d56e8-1dda-437b-b5f7-c08b1da45e12.pb"
print(f"Testando descompactacao em: {pb_file}")

with open(pb_file, 'rb') as f:
    data = f.read()

# 1. Testar zlib
try:
    decompressed = zlib.decompress(data)
    print(f"Sucesso com zlib! Tamanho descompactado: {len(decompressed)}")
    print(decompressed[:200])
except Exception as e:
    print(f"Zlib falhou: {e}")

# 2. Testar zlib com wbits alternativos (raw deflate)
try:
    decompressed = zlib.decompress(data, -zlib.MAX_WBITS)
    print(f"Sucesso com raw deflate! Tamanho: {len(decompressed)}")
    print(decompressed[:200])
except Exception as e:
    print(f"Raw deflate falhou: {e}")

# 3. Testar gzip
try:
    decompressed = gzip.decompress(data)
    print(f"Sucesso com gzip! Tamanho: {len(decompressed)}")
    print(decompressed[:200])
except Exception as e:
    print(f"Gzip falhou: {e}")

# 4. Tentar extrair strings de forma mais simples (printable ASCII)
# Qualquer byte entre 32 e 126
strings = []
current_str = []
for b in data:
    if 32 <= b <= 126 or b in [10, 13, 9]:
        current_str.append(chr(b))
    else:
        if len(current_str) >= 6:
            strings.append("".join(current_str))
        current_str = []
if len(current_str) >= 6:
    strings.append("".join(current_str))

print(f"\nExtraidas {len(strings)} strings simples >= 6 caracteres.")
print("Amostra das 20 primeiras:")
for s in strings[:20]:
    print(f" - {repr(s)}")
