import json
import os

path = r"C:\Users\andre.hugo\.gemini\antigravity-ide\brain\023d214e-e3b3-4b06-8d15-fbc4636d1973\.system_generated\logs\transcript.jsonl"
print(f"Listando edições em {path}...")

with open(path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        # Procurar por qualquer menção a ferramentas de escrita/edição
        if "replace_file_content" in line or "multi_replace_file_content" in line or "write_to_file" in line:
            try:
                data = json.loads(line)
                source = data.get('source', '')
                msg_type = data.get('type', '')
                tool_calls = data.get('tool_calls', [])
                
                print(f"\n[Linha {idx}] Source={source} | Type={msg_type}")
                
                # Se for PLANNER_RESPONSE ou semelhante, ver as tool calls
                if tool_calls:
                    for tc_idx, tc in enumerate(tool_calls):
                        name = tc.get('name', '')
                        args = tc.get('arguments', {})
                        target = args.get('TargetFile', args.get('TargetContent', ''))
                        print(f"  Tool Call {tc_idx}: name={name} | TargetFile={target}")
                        
                        # Salvar em arquivo se for a aula
                        if target and "AulaAdministracaoGeralSuprimento" in target:
                            out_name = f"scratch/recovered_edit_line_{idx}_tc_{tc_idx}.json"
                            with open(out_name, 'w', encoding='utf-8') as out_f:
                                json.dump(args, out_f, indent=2, ensure_ascii=False)
                            print(f"  [!] Salvo arquivo editado em {out_name}")
                            
            except Exception as e:
                print(f"  Erro ao ler linha {idx}: {e}")
                
print("\nConcluído!")
