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

    # Dividir por módulos (modulo-1 até modulo-10)
    # Procurar por <TabsContent value="modulo-N"
    
    parts = re.split(r'(<TabsContent\s+value="modulo-(\d+)")', content)
    # parts[0] is everything before first module
    # parts[1] is the match <TabsContent value="modulo-1"
    # parts[2] is the number "1"
    # parts[3] is the content until next match
    
    new_parts = [parts[0]]
    for i in range(1, len(parts), 3):
        header = parts[i]
        mod_num = parts[i+1]
        body = parts[i+2]
        
        # Encontrar o fim desse modulo ou o início do próximo
        # Como o split foi guloso, o body vai até o fim ou até o próximo header.
        
        # Substituir variant="..." ou variant={...} em ModuleSectionHeader
        # Mas apenas dentro das tags ModuleSectionHeader
        
        # Usando regex para encontrar as tags e substituir
        def replace_variant(match):
            tag = match.group(0)
            # Substitui qualquer variant por variant={mv[N]}
            tag = re.sub(r'variant=["\']?[^"\'\}]+["\']?', f'variant={{mv[{mod_num}]}}', tag)
            tag = re.sub(r'variant=\{[^\}]+\}', f'variant={{mv[{mod_num}]}}', tag)
            return tag

        body = re.sub(r'<ModuleSectionHeader[^>]+>', replace_variant, body)
        
        # Também podemos fixar o corIndicador do ContentAccordion para ser consistente?
        # No PADRÃO PREMIUM, o corIndicador geralmente segue a cor do módulo.
        # Mas como o corIndicador é uma string de classe (bg-indigo-500), 
        # precisaríamos do nome da cor.
        # Por simplicidade e segurança, focaremos no variant do Header.

        new_parts.append(header)
        new_parts.append(mod_num)
        new_parts.append(body)

    final_content = "".join(new_parts)
    
    if final_content != content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(final_content)
        print(f"✅ Arquivo {path.name} padronizado com sucesso.")
    else:
        print(f"⚠️ Nenhuma mudança necessária em {path.name}.")

if __name__ == "__main__":
    force_standard_colors_in_lesson("src/components/aulas/matematica/AulaConjuntos.tsx")
