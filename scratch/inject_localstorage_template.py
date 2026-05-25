import os
import re

def process_file(filepath):
    print(f"Lendo {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    filename = os.path.basename(filepath)
    # Ignorar AulaGestãoDeRecursosHumanos pois já alteramos manualmente
    if filename == "AulaGestãoDeRecursosHumanos.tsx":
        print(f"Ignorando {filename} (já processado manualmente)")
        return

    # 1. Limpar importações duplicadas ou erradas de react
    # Por exemplo: import { useState, useEffect,  useEffect } from "react";
    react_bad_pat1 = r'import\s+\{\s*useState\s*,\s*useEffect\s*,\s*useEffect\s*\}\s+from\s+["\']react["\'];'
    react_bad_pat2 = r'import\s+\{\s*useState\s*,\s*useEffect\s*,\s*useEffect\s*\}\s+from\s+["\']react["\'];'
    
    # Substituir qualquer coisa com useEffect repetido no react
    content = re.sub(r'import\s+\{\s*useState\s*,\s*useEffect\s*,\s+useEffect\s*\}\s+from\s+["\']react["\'];', 'import { useState, useEffect } from "react";', content)
    content = re.sub(r'import\s+\{\s*useState\s*,\s*useEffect\s*,\s*useEffect\s*\}\s+from\s+["\']react["\'];', 'import { useState, useEffect } from "react";', content)
    content = re.sub(r'import\s+\{\s*useState\s*,\s*useEffect\s*\}\s+from\s+["\']react["\'];', 'import { useState, useEffect } from "react";', content)

    # 2. Definir o STORAGE_KEY_PREFIX único baseado no nome do arquivo
    clean_name = filename.replace("Aula", "").replace(".tsx", "")
    snake_name = re.sub(r'(?<!^)(?=[A-Z])', '_', clean_name).lower()
    # Substituir acentos comuns
    accent_map = {'á':'a', 'é':'e', 'í':'i', 'ó':'o', 'ú':'u', 'ã':'a', 'õ':'o', 'ç':'c', 'ê':'e'}
    for k, v in accent_map.items():
        snake_name = snake_name.replace(k, v)
    storage_prefix = f"petrobras_quest_aula_{snake_name}_"

    # 3. Substituir declarações de estado e injetar persistência (Set<string>)
    state_pat = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']modulo-1["\']\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState(?:<Set<string>>)?\(\s*new\s+Set\(\s*\)\s*\);'
    
    # Variação com quebra de linha:
    # const [completedModules, setCompletedModules] = useState<Set<string>>(
    #   new Set(),
    # );
    state_pat_flex = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']modulo-1["\']\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState(?:<Set<string>>)?\(\s*new\s+Set\(\s*\)\s*[,]?\s*\);'

    # Vamos fazer uma correspondência genérica buscando por activeTab e completedModules
    # de forma livre para lidar com variações
    generic_state_pat = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']modulo-1["\']\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState\s*(?:<\s*Set\s*<\s*string\s*>\s*>)?\s*\(\s*new\s+Set\(\s*\)\s*\);?'
    
    # E para o caso com quebra de linha
    generic_state_pat_nl = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']modulo-1["\']\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState\s*(?:<\s*Set\s*<\s*string\s*>\s*>)?\s*\(\s*new\s+Set\(\s*\),\s*\);?'

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

    new_content, count = re.subn(generic_state_pat, replacement_state, content)
    if count == 0:
        new_content, count = re.subn(generic_state_pat_nl, replacement_state, content)
    
    # Se ainda falhar, tentar uma regex mais tolerante
    if count == 0:
        tolerant_pat = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']modulo-1["\']\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState\s*<\s*Set\s*<\s*string\s*>\s*>\s*\(\s*new\s+Set\(\s*\)\s*\);?'
        new_content, count = re.subn(tolerant_pat, replacement_state, content)

    if count == 0:
        # Outra variação: const [completedModules, setCompletedModules] = useState<Set<string>>(\n    new Set(),\n  );
        tolerant_pat_2 = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']modulo-1["\']\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState\s*<\s*Set\s*<\s*string\s*>\s*>\s*\(\s*new\s+Set\(\s*\),\s*\);?'
        new_content, count = re.subn(tolerant_pat_2, replacement_state, content)

    if count > 0:
        print(f"  [OK] Injetada persistência para: {filename} com prefixo {storage_prefix}")
        content = new_content
    else:
        print(f"  [AVISO] Não foi possível injetar persistência automática para: {filename}")

    # 4. Configurar ContentAccordion para stacked v3
    accordion_pat = r'<ContentAccordion\s+slides=\{([^\}]+)\}\s*(/?)>'
    replacement_accordion = r'<ContentAccordion slides={\1} mode="stacked" \2>'
    content, acc_count = re.subn(accordion_pat, replacement_accordion, content)
    if acc_count > 0:
        print(f"  [OK] {acc_count} ContentAccordions atualizados para mode=\"stacked\".")
    
    # 5. Salvar de volta
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    directory = "src/components/aulas/administracao/"
    files = [os.path.join(directory, f) for f in os.listdir(directory) if f.endswith('.tsx')]
    print(f"Encontrados {len(files)} arquivos TSX na pasta de administração.")
    
    for f in files:
        process_file(f)
        print("-" * 50)

if __name__ == '__main__':
    main()
