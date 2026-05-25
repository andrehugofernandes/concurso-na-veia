import os
import json

brain_dir = r"C:\Users\andre.hugo\.gemini\antigravity-ide\brain"
print(f"Verificando diretorio: {brain_dir}")

try:
    if os.path.exists(brain_dir):
        subdirs = [d for d in os.listdir(brain_dir) if os.path.isdir(os.path.join(brain_dir, d))]
        print(f"Encontrados {len(subdirs)} subdiretorios em brain.")
        print("Alguns subdiretorios:")
        for sd in subdirs[:10]:
            log_file = os.path.join(brain_dir, sd, ".system_generated", "logs", "transcript.jsonl")
            has_log = os.path.exists(log_file)
            size = os.path.getsize(log_file) if has_log else 0
            print(f" - {sd}: tem_log={has_log}, tamanho={size} bytes")
    else:
        print("Diretorio brain nao existe.")
except Exception as e:
    print(f"Erro ao acessar brain: {e}")
