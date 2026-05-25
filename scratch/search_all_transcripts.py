import os

brain_dir = r"C:\Users\andre.hugo\.gemini\antigravity-ide\brain"
print(f"Buscando transcripts em todo o diretorio: {brain_dir}")

found_transcripts = []

try:
    for root, dirs, files in os.walk(brain_dir):
        for file in files:
            if file == "transcript.jsonl":
                full_path = os.path.join(root, file)
                size = os.path.getsize(full_path)
                found_transcripts.append((full_path, size))
                
    print(f"Total de transcripts encontrados: {len(found_transcripts)}")
    # Ordenar por tamanho decrescente para ver os maiores logs primeiro
    found_transcripts.sort(key=lambda x: x[1], reverse=True)
    
    print("\nTop 15 maiores transcripts:")
    for path, size in found_transcripts[:15]:
        # Cortar a parte do caminho antes de brain para encurtar o output
        rel_path = path.replace(brain_dir, "")
        print(f" - {rel_path} ({size} bytes)")
        
except Exception as e:
    print(f"Erro: {e}")
