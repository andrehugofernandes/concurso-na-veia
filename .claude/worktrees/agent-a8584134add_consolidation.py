#!/usr/bin/env python3
"""
Upgrade aula files to add ModuleConsolidation before each quiz.
Designed for Windows paths with proper encoding.
"""
import re
from pathlib import Path

def add_module_consolidation_import(content):
    """Ensure ModuleConsolidation is imported"""
    if "ModuleConsolidation" not in content.split("from")[0:5]:  # Check first few imports
        # Add to imports if not present
        import_section = re.search(r'(import \{[^}]+\} from "\.\./shared";)', content)
        if import_section and "ModuleConsolidation," not in import_section.group(0):
            old_import = import_section.group(0)
            new_import = old_import.replace("ModuleConsolidation,", "").replace("import {", "import {\n  ModuleConsolidation,")
            if "ModuleConsolidation," not in new_import:
                new_import = new_import.replace("import {", "import {\n  ModuleConsolidation,")
            content = content.replace(old_import, new_import)
    return content

def insert_consolidation_before_quiz(content, module_num, variant, aula_title):
    """Insert ModuleConsolidation block before each quiz"""
    
    consolidation_block = f'''
          <ModuleConsolidation
            index={{{module_num}}}
            variant="{variant}"
            video={{{{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo {module_num}",
              duration: "8:30"
            }}}}
            resumoVisual={{{{
              moduloNome: "Módulo {module_num}",
              tituloAula: "{aula_title}",
              materia: "Matemática",
              images: [
                {{ title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-{variant}-500/20" }},
                {{ title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-{variant}-500/20" }},
                {{ title: "Aplicações", type: "Fórmula", placeholderColor: "bg-{variant}-500/20" }}
              ]
            }}}}
            maceteVisual={{{{
              title: "Dica de Ouro do Módulo {module_num}",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-{variant}-500/10 border border-{variant}-500/20 rounded-xl">
                    <p className="font-bold text-{variant}-600 dark:text-{variant}-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}}}
            audio={{{{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}}}
          />'''
    
    return consolidation_block

def upgrade_file(filepath, aula_title):
    """Main upgrade function for a single file"""
    variants = ["indigo", "emerald", "cyan", "blue", "amber", "rose", "indigo", "emerald", "cyan", "blue"]
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add import if missing
    if "ModuleConsolidation" not in content[:2000]:  # Check early in file
        # Find the shared imports
        shared_import = re.search(r'from ["\']\.\.\/shared["\'];', content)
        if shared_import:
            old_line = shared_import.group(0)
            # Extract the full import block
            import_match = re.search(r'import \{([^}]+)\} from ["\']\.\.\/shared["\'];', content, re.DOTALL)
            if import_match:
                imports = import_match.group(1)
                if "ModuleConsolidation" not in imports:
                    new_imports = "ModuleConsolidation,\n  " + imports
                    new_import_block = f"import {{\n  {new_imports}\n}} from \"../shared\";"
                    old_import_block = import_match.group(0)
                    content = content.replace(old_import_block, new_import_block)
    
    # Find all quiz sections and insert consolidation before them
    # Pattern: sections with <QuizInterativo
    module_counter = 1
    
    # Split by quiz sections
    quiz_pattern = r'(\s+)<QuizInterativo'
    matches = list(re.finditer(quiz_pattern, content))
    
    if not matches:
        print(f"No quizzes found in {filepath}")
        return
    
    # Process from end to start to maintain offset
    for match in reversed(matches):
        start_pos = match.start()
        indent_match = re.match(r'^(\s+)', content[start_pos:])
        indent = indent_match.group(1) if indent_match else "          "
        
        variant = variants[module_counter - 1]
        consolidation = insert_consolidation_before_quiz(content, module_counter, variant, aula_title)
        
        # Insert before the quiz
        content = content[:start_pos] + consolidation + '\n\n' + content[start_pos:]
        module_counter += 1
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Upgraded {aula_title}: {module_counter - 1} modules enhanced")
    return module_counter - 1

# Run upgrades
files_to_upgrade = [
    ("C:/Workspace/petrobras-quest/src/components/aulas/matematica/AulaEquacoes1Grau.tsx", "Equações de 1º Grau"),
    ("C:/Workspace/petrobras-quest/src/components/aulas/matematica/AulaPorcentagem.tsx", "Porcentagem"),
    ("C:/Workspace/petrobras-quest/src/components/aulas/matematica/AulaRazaoProporcao.tsx", "Razão e Proporção"),
]

for filepath, title in files_to_upgrade:
    path = Path(filepath)
    if path.exists():
        upgrade_file(str(path), title)
    else:
        print(f"✗ File not found: {filepath}")

print("\n✓ All upgrades completed!")
