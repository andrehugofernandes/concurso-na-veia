import json
import os

path = r"C:\Users\andre.hugo\.gemini\antigravity-ide\brain\023d214e-e3b3-4b06-8d15-fbc4636d1973\.system_generated\logs\transcript.jsonl"
print(f"Buscando todas as linhas com edits em {path}...")

with open(path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if any(cmd in line for cmd in ["replace_file_content", "multi_replace_file_content", "write_to_file"]):
            try:
                data = json.loads(line)
                source = data.get('source', '')
                msg_type = data.get('type', '')
                
                # Vamos ver se tem tool_calls
                tool_calls = data.get('tool_calls', [])
                if tool_calls:
                    for tc_idx, tc in enumerate(tool_calls):
                        name = tc.get('name', '')
                        args = tc.get('arguments', {})
                        args_str = json.dumps(args, ensure_ascii=False)
                        
                        # Vamos salvar um resumo contendo a linha, o nome da ferramenta e o tamanho
                        print(f"Linha {idx} | Tool: {name} | Args length: {len(args_str)} chars")
                        
                        # Salvar em scratch para inspecionarmos
                        out_name = f"scratch/edit_dump_line_{idx}_tc_{tc_idx}_{name}.json"
                        with open(out_name, 'w', encoding='utf-8') as out_f:
                            json.dump({
                                "line": idx,
                                "source": source,
                                "type": msg_type,
                                "tool_name": name,
                                "arguments": args
                            }, out_f, indent=2, ensure_ascii=False)
            except Exception as e:
                pass
print("Pronto!")
