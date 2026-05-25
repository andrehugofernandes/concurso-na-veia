import json
import os

path = r"C:\Users\andre.hugo\.gemini\antigravity-ide\brain\023d214e-e3b3-4b06-8d15-fbc4636d1973\.system_generated\logs\transcript.jsonl"
print(f"Lendo {path}...")

with open(path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if "AulaAdministracaoGeralSuprimento" in line:
            try:
                data = json.loads(line)
                source = data.get('source', '')
                msg_type = data.get('type', '')
                
                # Vamos focar em chamadas de ferramentas do MODEL (PLANNER_RESPONSE)
                tool_calls = data.get('tool_calls', [])
                if tool_calls:
                    for tc_idx, tc in enumerate(tool_calls):
                        name = tc.get('name', '')
                        args = tc.get('arguments', {})
                        args_str = json.dumps(args, ensure_ascii=False)
                        if "AulaAdministracaoGeralSuprimento" in args_str:
                            print(f"\n[Linha {idx}] MODEL PLANNER_RESPONSE chama: {name}")
                            out_name = f"scratch/mod_line_{idx}_tc_{tc_idx}_{name}.json"
                            with open(out_name, 'w', encoding='utf-8') as out_f:
                                json.dump(args, out_f, indent=2, ensure_ascii=False)
                            print(f"  -> Salvo payload da ferramenta em {out_name} ({len(args_str)} caracteres)")
                            
            except Exception as e:
                pass
print("\nBusca concluída!")
