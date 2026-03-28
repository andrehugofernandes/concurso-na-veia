import re
from pathlib import Path

def force_standard_colors_in_lesson(file_path):
    path = Path(file_path)
    if not path.exists():
        print(f"File {file_path} not found.")
        return

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Injetar a declaração mv se não existir
    if "const mv = Object.fromEntries" not in content:
        mv_block = """
  // Variantes de cor pré-computadas — usa mv[N] ao invés de hardcodar getModuleVariant(N)
  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
  ) as Record<number, ReturnType<typeof getModuleVariant>>;
"""
        content = re.sub(r'(\s+)return\s*\(', rf'{mv_block}\1return (', content, count=1)

    # Dividir por módulos
    parts = re.split(r'(<TabsContent\s+value="modulo-(\d+)")', content)
    
    new_parts = [parts[0]]
    for i in range(1, len(parts), 3):
        header = parts[i]
        mod_num = parts[i+1]
        body = parts[i+2]
        
        # Substituir variant em ModuleSectionHeader E ModuleConsolidation
        def replace_variant(match):
            tag = match.group(0)
            tag = re.sub(r'variant=["\']?[^"\'\}]+["\']?', f'variant={{mv[{mod_num}]}}', tag)
            tag = re.sub(r'variant=\{[^\}]+\}', f'variant={{mv[{mod_num}]}}', tag)
            return tag

        body = re.sub(r'<(ModuleSectionHeader|ModuleConsolidation)[^>]+>', replace_variant, body)
        
        new_parts.append(header)
        new_parts.append(body)

    final_content = "".join(new_parts)
    
    # Limpeza de erros anteriores (chaves duplas e números perdidos)
    final_content = re.sub(r'variant=\{mv\[(\d+)\]\}\}', r'variant={mv[\1]}', final_content)
    final_content = re.sub(r'(TabsContent value="modulo-\d+")\d+', r'\1', final_content)

    if final_content != content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(final_content)
        print(f"✅ Arquivo {path.name} padronizado com sucesso.")
    else:
        print(f"⚠️ Nenhuma mudança necessária em {path.name}.")

if __name__ == "__main__":
    force_standard_colors_in_lesson("src/components/aulas/matematica/AulaConjuntos.tsx")
