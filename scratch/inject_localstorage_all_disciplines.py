import os
import re

# Mapeamento de pastas a processar
DISCIPLINES = ["portugues", "ingles", "matematica", "seguranca", "manutencao", "operacao", "ti"]

def process_file(filepath, discipline):
    print(f"Lendo {filepath} (Disciplina: {discipline})...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    filename = os.path.basename(filepath)

    # 1. Limpar importações duplicadas ou erradas de react
    content = re.sub(r'import\s+\{\s*useState\s*,\s*useEffect\s*,\s+useEffect\s*\}\s+from\s+["\']react["\'];', 'import { useState, useEffect } from "react";', content)
    content = re.sub(r'import\s+\{\s*useState\s*,\s*useEffect\s*,\s*useEffect\s*\}\s+from\s+["\']react["\'];', 'import { useState, useEffect } from "react";', content)
    content = re.sub(r'import\s+\{\s*useState\s*,\s*useEffect\s*\}\s+from\s+["\']react["\'];', 'import { useState, useEffect } from "react";', content)

    # 2. Definir o STORAGE_KEY_PREFIX único baseado no nome da disciplina e arquivo
    clean_name = filename.replace("Aula", "").replace(".tsx", "")
    snake_name = re.sub(r'(?<!^)(?=[A-Z])', '_', clean_name).lower()
    
    # Substituir acentos comuns
    accent_map = {'á':'a', 'é':'e', 'í':'i', 'ó':'o', 'ú':'u', 'ã':'a', 'õ':'o', 'ç':'c', 'ê':'e'}
    for k, v in accent_map.items():
        snake_name = snake_name.replace(k, v)
    
    storage_prefix = f"petrobras_quest_aula_{discipline}_{snake_name}_"

    # Se o arquivo já contém a persistência (por exemplo, contendo STORAGE_KEY_PREFIX), vamos pular a injeção do estado
    if "STORAGE_KEY_PREFIX" in content:
        print(f"  [INFO] {filename} já contém STORAGE_KEY_PREFIX. Pulando injeção de estado.")
    else:
        # Regex flexível para capturar declaração padrão de activeTab e completedModules
        # const [activeTab, setActiveTab] = useState("modulo-1");
        # const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
        generic_state_pat1 = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']modulo-1["\']\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState\s*(?:<\s*Set\s*<\s*string\s*>\s*>)?\s*\(\s*new\s+Set\(\s*\)\s*\);?'
        generic_state_pat1_nl = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']modulo-1["\']\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState\s*(?:<\s*Set\s*<\s*string\s*>\s*>)?\s*\(\s*new\s+Set\(\s*\),\s*\);?'
        
        # Outras variações tolerantes (caso o activeTab e completedModules estejam invertidos ou separados por quebra de linha)
        tolerant_pat = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']modulo-1["\']\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState\s*<\s*Set\s*<\s*string\s*>\s*>\s*\(\s*new\s+Set\(\s*\)\s*\);?'
        tolerant_pat_2 = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']modulo-1["\']\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState\s*<\s*Set\s*<\s*string\s*>\s*>\s*\(\s*new\s+Set\(\s*\),\s*\);?'

        replacement_state = f"""  const STORAGE_KEY_PREFIX = "{storage_prefix}";

  const [activeTab, setActiveTab] = useState(() => {{
    if (typeof window !== "undefined") {{
      const saved = localStorage.getItem(`${{STORAGE_KEY_PREFIX}}active_tab`);
      return saved || "modulo-1";
    }}
    return "modulo-1";
  }});

  const [completedModules, setCompletedModules] = useState<Set<string>>(() => {{
    if (typeof window !== "undefined") {{
      const saved = localStorage.getItem(`${{STORAGE_KEY_PREFIX}}completed_modules`);
      if (saved) {{
        try {{
          const arr = JSON.parse(saved);
          return new Set(arr);
        }} catch (e) {{
          return new Set();
        }}
      }}
    }}
    return new Set();
  }});

  useEffect(() => {{
    if (typeof window !== "undefined") {{
      localStorage.setItem(`${{STORAGE_KEY_PREFIX}}active_tab`, activeTab);
    }}
  }}, [activeTab]);

  useEffect(() => {{
    if (typeof window !== "undefined") {{
      localStorage.setItem(
        `${{STORAGE_KEY_PREFIX}}completed_modules`,
        JSON.stringify(Array.from(completedModules))
      );
    }}
  }}, [completedModules]);"""

        new_content, count = re.subn(generic_state_pat1, replacement_state, content)
        if count == 0:
            new_content, count = re.subn(generic_state_pat1_nl, replacement_state, content)
        if count == 0:
            new_content, count = re.subn(tolerant_pat, replacement_state, content)
        if count == 0:
            new_content, count = re.subn(tolerant_pat_2, replacement_state, content)

        if count > 0:
            content = new_content

        # Se ainda falhar, tentar buscar completedModules e activeTab individualmente
        if count == 0:
            # Variação mais simples de busca separada por espaço livre e declaração separada
            # Procurar onde define completedModules e activeTab
            state_active_tab_pat = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']modulo-1["\']\s*\);?'
            state_completed_modules_pat = r'const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState\s*(?:<\s*Set\s*<\s*string\s*>\s*>)?\s*\(\s*new\s+Set\(\s*\)\s*\);?'
            state_completed_modules_pat_nl = r'const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState\s*(?:<\s*Set\s*<\s*string\s*>\s*>)?\s*\(\s*new\s+Set\(\s*\),\s*\);?'

            if re.search(state_active_tab_pat, content) and (re.search(state_completed_modules_pat, content) or re.search(state_completed_modules_pat_nl, content)):
                # Substituir as declarações individuais
                content = re.sub(state_active_tab_pat, "", content)
                content = re.sub(state_completed_modules_pat, "", content)
                content = re.sub(state_completed_modules_pat_nl, "", content)
                
                # Injetar o bloco de estado e effects logo abaixo de export default function
                func_pat = r'(export\s+default\s+function\s+\w+\s*\([^\)]*\)\s*\{)'
                content, count = re.subn(func_pat, r'\1\n' + replacement_state, content)

        if count > 0:
            print(f"  [OK] Injetada persistência para: {filename} com prefixo {storage_prefix}")
        else:
            print(f"  [AVISO] Não foi possível injetar persistência de estado para: {filename} (verifique se já existe ou difere da estrutura padrão)")

    # 4. Configurar ContentAccordion para stacked v3
    accordion_pat = r'<ContentAccordion\s+slides=\{([^\}]+)\}\s*(/?)>'
    replacement_accordion = r'<ContentAccordion slides={\1} mode="stacked" \2>'
    
    # Adicionar mode="stacked" apenas onde já não exista
    new_content = []
    lines = content.split('\n')
    acc_count = 0
    for line in lines:
        if "<ContentAccordion" in line and "mode=" not in line:
            line = re.sub(accordion_pat, replacement_accordion, line)
            acc_count += 1
        new_content.append(line)
    
    if acc_count > 0:
        print(f"  [OK] {acc_count} ContentAccordions atualizados para mode=\"stacked\".")
        content = '\n'.join(new_content)

    # 5. Ajustar grid de FlipCards para gap-6
    # Substituir grid-cols-1 md:grid-cols-2 gap-4 por grid-cols-1 md:grid-cols-2 gap-6
    # Substituir gap-4 por gap-6 nos locais com flipcards
    grid_pat = r'grid-cols-1\s+(?:md:grid-cols-\d+)?\s+gap-4'
    replacement_grid = lambda m: m.group(0).replace("gap-4", "gap-6")
    content, grid_count = re.subn(grid_pat, replacement_grid, content)
    if grid_count > 0:
        print(f"  [OK] {grid_count} grids de FlipCards atualizados para gap-6.")

    # 6. Salvar de volta
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    total_processed = 0
    for discipline in DISCIPLINES:
        directory = f"src/components/aulas/{discipline}/"
        if not os.path.exists(directory):
            print(f"Diretório {directory} não existe. Pulando.")
            continue
            
        files = [os.path.join(directory, f) for f in os.listdir(directory) if f.endswith('.tsx')]
        print(f"\n=================== Disciplina: {discipline.upper()} (Encontrados {len(files)} arquivos) ===================")
        
        for f in files:
            process_file(f, discipline)
            total_processed += 1
            print("-" * 50)
            
    print(f"\nProcessamento concluído! Total de arquivos processados: {total_processed}")

if __name__ == '__main__':
    main()
