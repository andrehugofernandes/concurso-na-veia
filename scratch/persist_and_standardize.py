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

    # 1. Definir o STORAGE_KEY_PREFIX único
    # Ex: AulaPlanejamentoEstrategico.tsx -> petrobras_quest_aula_planejamento_estrategico_
    # Converter PascalCase para snake_case
    clean_name = filename.replace("Aula", "").replace(".tsx", "")
    snake_name = re.sub(r'(?<!^)(?=[A-Z])', '_', clean_name).lower()
    # Substituir acentos comuns
    accent_map = {'á':'a', 'é':'e', 'í':'i', 'ó':'o', 'ú':'u', 'ã':'a', 'õ':'o', 'ç':'c', 'ê':'e'}
    for k, v in accent_map.items():
        snake_name = snake_name.replace(k, v)
    storage_prefix = f"petrobras_quest_aula_{snake_name}_"

    # 2. Adicionar useEffect ao import de react
    # Procurar por: import { useState } from "react";
    # ou similar
    react_import_pat = r'import\s+\{\s*useState\s*\}\s+from\s+["\']react["\'];'
    if re.search(react_import_pat, content):
        content = re.sub(react_import_pat, 'import { useState, useEffect } from "react";', content)
    else:
        # Se for import { useState, ... } from "react"; mas sem o useEffect
        react_any_import_pat = r'import\s+\{\s*useState\s*,([^}]+)\}\s+from\s+["\']react["\'];'
        content = re.sub(react_any_import_pat, r'import { useState, useEffect, \1} from "react";', content)

    # 3. Substituir declarações de estado e injetar persistência
    # Procurar por export default function ...
    # e depois os hooks de estado
    state_block_pat = r'const\s+\[activeTab,\s*setActiveTab\]\s*=\s*useState\("modulo-1"\);\s*const\s+\[unlockedModules,\s*setUnlockedModules\]\s*=\s*useState\(\["modulo-1"\]\);\s*const\s+\[completedModules,\s*setCompletedModules\]\s*=\s*useState(?:<string\[\]>)?\(\[\]\);'
    
    # Vamos fazer uma busca flexível com quebras de linha e espaços
    state_block_pat_flex = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']modulo-1["\']\s*\);\s*const\s*\[\s*unlockedModules\s*,\s*setUnlockedModules\s*\]\s*=\s*useState\(\s*\[\s*["\']modulo-1["\']\s*\]\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState(?:<string\s*\[\s*\]\s*>)?\(\s*\[\s*\]\s*\);'
    
    replacement_state = f"""  const STORAGE_KEY_PREFIX = "{storage_prefix}";

  const [activeTab, setActiveTab] = useState(() => {{
    if (typeof window !== "undefined") {{
      const saved = localStorage.getItem(`${{STORAGE_KEY_PREFIX}}active_tab`);
      return saved || "modulo-1";
    }}
    return "modulo-1";
  }});

  const [unlockedModules, setUnlockedModules] = useState<string[]>(() => {{
    if (typeof window !== "undefined") {{
      const saved = localStorage.getItem(`${{STORAGE_KEY_PREFIX}}unlocked_modules`);
      if (saved) {{
        try {{
          return JSON.parse(saved);
        }} catch (e) {{
          return ["modulo-1"];
        }}
      }}
    }}
    return ["modulo-1"];
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
        `${{STORAGE_KEY_PREFIX}}unlocked_modules`,
        JSON.stringify(unlockedModules)
      );
    }}
  }}, [unlockedModules]);

  useEffect(() => {{
    if (typeof window !== "undefined") {{
      localStorage.setItem(
        `${{STORAGE_KEY_PREFIX}}completed_modules`,
        JSON.stringify(completedModules)
      );
    }}
  }}, [completedModules]);"""

    # Fazer a substituição de estado
    new_content, count = re.subn(state_block_pat_flex, replacement_state, content)
    if count == 0:
        # Tentar regex sem a tipagem ou ligeiramente diferente
        state_block_pat_flex_2 = r'const\s*\[\s*activeTab\s*,\s*setActiveTab\s*\]\s*=\s*useState\(\s*["\']modulo-1["\']\s*\);\s*const\s*\[\s*unlockedModules\s*,\s*setUnlockedModules\s*\]\s*=\s*useState\(\s*\[\s*["\']modulo-1["\']\s*\]\s*\);\s*const\s*\[\s*completedModules\s*,\s*setCompletedModules\s*\]\s*=\s*useState\(\s*\[\s*\]\s*\);'
        new_content, count = re.subn(state_block_pat_flex_2, replacement_state, content)
        
    if count > 0:
        print(f"  [OK] Injetada lógica de persistência para prefixo: {storage_prefix}")
        content = new_content
    else:
        print(f"  [AVISO] Não foi possível encontrar o bloco de estados clássico em {filename}")

    # 4. Envelopar as abas com renderização condicional (activeTab === mod.id && ...)
    # Procurar por:
    # {MODULE_DEFS.map((mod) => (
    #   <TabsContent key={mod.id} value={mod.id} ...>
    tabs_content_pat = r'\{MODULE_DEFS\.map\(\(mod\)\s*=>\s*\(\s*<TabsContent key=\{mod\.id\} value=\{mod\.id\} className="space-y-6"\>'
    replacement_tabs = '{MODULE_DEFS.map((mod) => (\n          activeTab === mod.id && (\n            <TabsContent key={mod.id} value={mod.id} className="space-y-6">'
    
    new_content, count = re.subn(tabs_content_pat, replacement_tabs, content)
    if count > 0:
        # Agora precisamos ajustar o fechamento da expressão:
        # </TabsContent>
        # ))}
        # Para incluir a condicional:
        # </TabsContent>
        #   )
        # ))}
        closing_pat = r'</TabsContent>\s*\)\)\}'
        replacement_closing = '</TabsContent>\n          )\n        ))}'
        new_content, closing_count = re.subn(closing_pat, replacement_closing, new_content)
        if closing_count > 0:
            print("  [OK] Envelopada renderização condicional de abas para performance.")
            content = new_content
        else:
            print("  [ERRO] Encontrou a abertura mas não encontrou o fechamento de TabsContent map!")
    else:
        # Tentar outro padrão
        tabs_content_pat_2 = r'\{MODULE_DEFS\.map\(\(mod\)\s*=>\s*\{\s*return\s*\(\s*<TabsContent key=\{mod\.id\} value=\{mod\.id\} className="space-y-6"\>'
        # Se for mais complexo, avise
        print("  [INFO] TabsContent padrão clássico não encontrado ou já envelopado.")

    # 5. Configurar ContentAccordion para stacked v3
    # Procurar por <ContentAccordion e garantir que tenha mode="stacked"
    accordion_pat = r'<ContentAccordion\s+slides=\{([^\}]+)\}\s*(/?)>'
    replacement_accordion = r'<ContentAccordion slides={\1} mode="stacked" \2>'
    content, acc_count = re.subn(accordion_pat, replacement_accordion, content)
    if acc_count > 0:
        print(f"  [OK] {acc_count} ContentAccordions atualizados para mode=\"stacked\".")
    
    # 6. Atualizar grids de gap-4 para gap-6
    gap_pat = r'className="grid grid-cols-1 md:grid-cols-2 gap-4'
    replacement_gap = 'className="grid grid-cols-1 md:grid-cols-2 gap-6'
    content, gap_count = re.subn(gap_pat, replacement_gap, content)
    if gap_count > 0:
        print(f"  [OK] {gap_count} grids atualizados de gap-4 para gap-6.")

    # 7. Salvar as modificações de volta
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
