import json
import os

path = r"C:\Users\andre.hugo\.gemini\antigravity-ide\brain\023d214e-e3b3-4b06-8d15-fbc4636d1973\.system_generated\logs\transcript.jsonl"
out_dir = "scratch/recovered_edits"
os.makedirs(out_dir, exist_ok=True)

print(f"Lendo {path}...")

with open(path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if "multi_replace_file_content" in line or "replace_file_content" in line:
            try:
                data = json.loads(line)
                tool_calls = data.get('tool_calls', [])
                if tool_calls:
                    for tc_idx, tc in enumerate(tool_calls):
                        name = tc.get('name', '')
                        args = tc.get('args', {})
                        
                        # No transcript, a chave de argumentos no JSON pode ser "args"
                        target_file = args.get('TargetFile', '')
                        
                        if target_file and "AulaAdministracaoGeralSuprimento" in target_file:
                            print(f"\n[Linha {idx}] Encontrada edição via '{name}'!")
                            
                            # Salvar os argumentos completos
                            out_path = os.path.join(out_dir, f"line_{idx}_tc_{tc_idx}_{name}.json")
                            with open(out_path, 'w', encoding='utf-8') as out_f:
                                json.dump(args, out_f, indent=2, ensure_ascii=False)
                            print(f"  -> Salvo em {out_path} ({len(json.dumps(args))} bytes)")
                            
            except Exception as e:
                print(f"  Erro na linha {idx}: {e}")

print("\nConcluído!")
