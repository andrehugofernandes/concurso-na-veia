import os
import json

brain_dir = r"C:\Users\andre.hugo\.gemini\antigravity-ide\brain"
print(f"Buscando em transcripts em {brain_dir}...")

queries = ["inversamente proporcional", "Definição e Pilares da Administração", "Dossiê das Funções Administrativas"]

for conv_id in os.listdir(brain_dir):
    conv_dir = os.path.join(brain_dir, conv_id)
    if not os.path.isdir(conv_dir):
        continue
        
    transcript_path = os.path.join(conv_dir, ".system_generated", "logs", "transcript.jsonl")
    if os.path.exists(transcript_path):
        print(f"\nVasculhando transcript da conversa: {conv_id} ({os.path.getsize(transcript_path)} bytes)")
        with open(transcript_path, 'r', encoding='utf-8') as f:
            for line_idx, line in enumerate(f):
                if not line.strip():
                    continue
                try:
                    data = json.loads(line)
                    # Vamos verificar se o termo de busca está em qualquer parte da linha (content, tool_calls, arguments, etc.)
                    line_str = json.dumps(data, ensure_ascii=False)
                    for query in queries:
                        if query.lower() in line_str.lower():
                            print(f"  -> Encontrado termo '{query}' na linha {line_idx}!")
                            print(f"     Source: {data.get('source', '')} | Type: {data.get('type', '')}")
                            
                            # Mostrar um trecho ou salvar
                            content = data.get('content', '')
                            if content:
                                print(f"     Content (primeiros 200 caracteres): {content[:200]}...")
                                
                            tool_calls = data.get('tool_calls', [])
                            if tool_calls:
                                print(f"     Possui {len(tool_calls)} tool calls:")
                                for tc in tool_calls:
                                    print(f"       Tool: {tc.get('name', '')}")
                                    args = tc.get('arguments', {})
                                    if args:
                                        args_str = json.dumps(args, ensure_ascii=False)
                                        print(f"       Args: {args_str[:400]}...")
                                        # Se for a escrita ou edição do arquivo de suprimento, vamos extrair e gravar
                                        if "AulaAdministracaoGeralSuprimento.tsx" in args_str:
                                            out_path = f"scratch/recovered_{query.replace(' ', '_')}_{conv_id[:8]}_{line_idx}.txt"
                                            with open(out_path, 'w', encoding='utf-8') as out_f:
                                                out_f.write(args_str)
                                            print(f"       [!] Código salvo em {out_path}")
                                            
                except Exception as e:
                    pass
