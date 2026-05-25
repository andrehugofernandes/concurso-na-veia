import json

path = r"C:\Users\andre.hugo\.gemini\antigravity-ide\brain\023d214e-e3b3-4b06-8d15-fbc4636d1973\.system_generated\logs\transcript.jsonl"
target_lines = [144, 148, 152, 216, 218]

print(f"Lendo linhas {target_lines} de {path}")

with open(path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx in target_lines:
            print(f"\n==================================================")
            print(f"LINHA {idx}:")
            print(f"==================================================")
            try:
                data = json.loads(line)
                # Vamos salvar o conteúdo completo da linha
                out_path = f"scratch/recovered_line_{idx}.json"
                with open(out_path, 'w', encoding='utf-8') as out_f:
                    json.dump(data, out_f, indent=2, ensure_ascii=False)
                print(f"-> Salvo em {out_path} ({len(line)} bytes)")
                
                # Exibir um resumo
                print(f"Source: {data.get('source', '')} | Type: {data.get('type', '')}")
                tool_calls = data.get('tool_calls', [])
                if tool_calls:
                    print("Tool Calls:")
                    for tc in tool_calls:
                        print(f"  Name: {tc.get('name', '')}")
                        args = tc.get('arguments', {})
                        if args:
                            print(f"  Args keys: {list(args.keys())}")
                            # Se tiver ReplacementContent ou CodeContent, mostrar tamanho
                            if 'ReplacementContent' in args:
                                print(f"  ReplacementContent size: {len(args['ReplacementContent'])} chars")
                            if 'ReplacementChunks' in args:
                                print(f"  ReplacementChunks count: {len(args['ReplacementChunks'])}")
                                for chunk_idx, chunk in enumerate(args['ReplacementChunks']):
                                    print(f"    Chunk {chunk_idx}: target_len={len(chunk.get('TargetContent', ''))}, repl_len={len(chunk.get('ReplacementContent', ''))}")
            except Exception as e:
                print(f"Erro ao processar linha {idx}: {e}")
