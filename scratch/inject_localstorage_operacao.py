import os
import re

FILES = [
    "src/components/aulas/operacao/AulaMecanicaFluidos.tsx",
    "src/components/aulas/operacao/AulaTermodinamica.tsx"
]

def process_file(filepath):
    print(f"Processando {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    filename = os.path.basename(filepath)
    clean_name = filename.replace("Aula", "").replace(".tsx", "")
    snake_name = re.sub(r'(?<!^)(?=[A-Z])', '_', clean_name).lower()
    storage_prefix = f"petrobras_quest_aula_operacao_{snake_name}_"

    state_pat = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']introducao["\']\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState(?:<string\[\]>)?\(\s*\[\s*\]\s*\);'
    
    replacement_state = f"""  const STORAGE_KEY_PREFIX = "{storage_prefix}";

  const [activeTab, setActiveTab] = useState(() => {{
    if (typeof window !== "undefined") {{
      const saved = localStorage.getItem(`${{STORAGE_KEY_PREFIX}}active_tab`);
      return saved || "introducao";
    }}
    return "introducao";
  }});

  const [completedModules, setCompletedModules] = useState<string[]>(() => {{
    if (typeof window !== "undefined") {{
      const saved = localStorage.getItem(`${{STORAGE_KEY_PREFIX}}completed_modules`);
      if (saved) {{
        try {{
          return JSON.parse(saved);
        }} catch (e) {{
          return [];
        }}
      }}
    }}
    return [];
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
        JSON.stringify(completedModules)
      );
    }}
  }}, [completedModules]);"""

    new_content, count = re.subn(state_pat, replacement_state, content)
    
    if count == 0:
        # Se falhar, tentar uma regex mais tolerante
        state_pat_tolerant = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']introducao["\']\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState\s*(?:<\s*string\s*\[\s*\]\s*>)?\s*\(\s*\[\s*\]\s*\);?'
        new_content, count = re.subn(state_pat_tolerant, replacement_state, content)

    if count > 0:
        print(f"  [OK] Injetada persistência para: {filename} com prefixo {storage_prefix}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
    else:
        print(f"  [AVISO] Não foi possível injetar a persistência de forma automática.")

def main():
    for f in FILES:
        process_file(f)
        print("-" * 50)

if __name__ == '__main__':
    main()
