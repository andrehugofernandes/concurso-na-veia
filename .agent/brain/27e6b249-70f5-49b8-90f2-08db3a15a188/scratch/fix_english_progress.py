files_to_fix = [
    r"src/components/aulas/ingles/AulaTextComprehension.tsx",
    r"src/components/aulas/ingles/AulaFalseCognates.tsx"
]

target_state = "  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());"

replacement_state_win = """  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());\r\n\r\n  useEffect(() => {\r\n    if (onUpdateProgress) {\r\n      const pct = Math.round((completedModules.size / 10) * 100);\r\n      onUpdateProgress(pct);\r\n    }\r\n  }, [completedModules, onUpdateProgress]);"""

replacement_state_unix = """  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (onUpdateProgress) {
      const pct = Math.round((completedModules.size / 10) * 100);
      onUpdateProgress(pct);
    }
  }, [completedModules, onUpdateProgress]);"""

for file_path in files_to_fix:
    print(f"Processando arquivo: {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Adicionar o useEffect reativo
    initial_len = len(content)
    if target_state in content:
        # Detecta quebras de linha do arquivo
        if "\r\n" in content:
            content = content.replace(target_state, replacement_state_win)
            print("-> useEffect reativo injetado (Windows Line Endings)!")
        else:
            content = content.replace(target_state, replacement_state_unix)
            print("-> useEffect reativo injetado (Unix Line Endings)!")
    else:
        print("-> AVISO: Declaração de completedModules não encontrada!")
        
    # 2. Remover todas as chamadas de onScoreSubmit com objetos usando concatenação simples de string
    for x in range(1, 11):
        num_str = str(x)
        # Substitui diferentes padrões de indentação e espaçamento
        s1 = '            onScoreSubmit={() => onUpdateProgress?.({ modulo: ' + num_str + ', tipo: "quiz" })}'
        s2 = '            onScoreSubmit={() => onUpdateProgress?.({ modulo: ' + num_str + ', tipo: \'quiz\' })}'
        s3 = 'onScoreSubmit={() => onUpdateProgress?.({ modulo: ' + num_str + ', tipo: "quiz" })}'
        s4 = 'onScoreSubmit={() => onUpdateProgress?.({ modulo: ' + num_str + ', tipo: \'quiz\' })}'
        
        # Também remove com \r\n se houver
        content = content.replace(s1 + '\r\n', '')
        content = content.replace(s1 + '\n', '')
        content = content.replace(s1, '')
        
        content = content.replace(s2 + '\r\n', '')
        content = content.replace(s2 + '\n', '')
        content = content.replace(s2, '')
        
        content = content.replace(s3 + '\r\n', '')
        content = content.replace(s3 + '\n', '')
        content = content.replace(s3, '')
        
        content = content.replace(s4 + '\r\n', '')
        content = content.replace(s4 + '\n', '')
        content = content.replace(s4, '')
        
    final_len = len(content)
    
    if final_len < initial_len or final_len > initial_len:
        print(f"-> Sucesso completo! (Tamanho inicial: {initial_len}, final: {final_len} bytes)")
    else:
        print("-> AVISO: Nenhuma alteração foi realizada!")
        
    # Salvar o arquivo
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Arquivo salvo com sucesso!\n")
