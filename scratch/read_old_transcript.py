import os
import json

old_log = r"C:\Users\andre.hugo\.gemini\antigravity-ide\brain\585d8525-79e1-4182-a224-e14fb721515f\.system_generated\logs\transcript.jsonl"
print(f"Lendo log antigo: {old_log}")

if os.path.exists(old_log):
    try:
        with open(old_log, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        print(f"Total de linhas (passos): {len(lines)}")
        
        for idx, line in enumerate(lines[:10]):
            data = json.loads(line)
            source = data.get("source")
            step_type = data.get("type")
            status = data.get("status")
            content = data.get("content", "")
            print(f"Passo {idx}: source={source}, type={step_type}, status={status}")
            if content:
                print(f"  Content: {content[:200]}...")
    except Exception as e:
        print(f"Erro ao ler log: {e}")
else:
    print("Arquivo nao existe.")
