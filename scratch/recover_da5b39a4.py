import json
import re

path = r"C:\Users\andre.hugo\.gemini\antigravity-ide\brain\da5b39a4-7fa5-4c06-8413-668beabd9614\.system_generated\logs\transcript.jsonl"
print(f"Lendo {path}...")

with open(path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if "AulaAdministracaoGeralSuprimento" in line:
            print(f"Linha {idx} contém 'AulaAdministracaoGeralSuprimento'!")
            try:
                data = json.loads(line)
                source = data.get('source', '')
                msg_type = data.get('type', '')
                print(f"  Source: {source} | Type: {msg_type}")
                
                tool_calls = data.get('tool_calls', [])
                if tool_calls:
                    for tc_idx, tc in enumerate(tool_calls):
                        name = tc.get('name', '')
                        print(f"    Tool: {name}")
                        args = tc.get('arguments', {})
                        if args:
                            args_str = json.dumps(args, ensure_ascii=False)
                            print(f"      Args len: {len(args_str)} chars")
                            # Salvar argumentos em arquivo
                            out_name = f"scratch/recovered_da5b39a4_line_{idx}_tc_{tc_idx}.txt"
                            with open(out_name, 'w', encoding='utf-8') as out_f:
                                out_f.write(args_str)
                            print(f"      [!] Salvo em {out_name}")
                            
            except Exception as e:
                print(f"    Erro ao decodificar: {e}")
