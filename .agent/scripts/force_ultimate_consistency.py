import re
from pathlib import Path

def enforce_full_color_consistency(file_path):
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
    
    # Mapeamento do nome da cor tailwind base para cada modulo (usado em corIndicador)
    color_names = {
        "1": "amber", "2": "blue", "3": "emerald", "4": "rose", "5": "violet",
        "6": "amber", "7": "blue", "8": "emerald", "9": "rose", "10": "violet"
    }

    for i in range(1, len(parts), 3):
        header = parts[i]
        mod_num = parts[i+1]
        body = parts[i+2]
        
        # 1. Substituir variant em todos os componentes-alvo
        # ModuleSectionHeader, ModuleConsolidation, QuizInterativo, FlipCard, CardCarousel
        def replace_variant(match):
            tag = match.group(0)
            # Força variant={mv[N]}
            tag = re.sub(r'variant=["\']?[^"\'\}]+["\']?', f'variant={{mv[{mod_num}]}}', tag)
            tag = re.sub(r'variant=\{[^\}]+\}', f'variant={{mv[{mod_num}]}}', tag)
            return tag

        body = re.sub(r'<(ModuleSectionHeader|ModuleConsolidation|QuizInterativo|FlipCard|CardCarousel)[^>]+>', replace_variant, body)
        
        # 2. Corrigir corIndicador em ContentAccordion e MusicPlayer?
        # Apenas se houver corIndicador="bg-*-500"
        color_name = color_names.get(mod_num, "indigo")
        body = re.sub(r'corIndicador=["\']bg-[^"\'\}]+-500["\']', f'corIndicador="bg-{color_name}-500"', body)
        
        # 3. Corrigir placeholderColor em images (Resumo Visual)
        body = re.sub(r'placeholderColor:\s*["\']bg-[^"\'\}]+-500/20["\']', f'placeholderColor: "bg-{color_name}-500/20"', body)

        # 4. Corrigir cores dentro de maceteVisual/audio links/etc se houver padrões óbvios
        # Ex: bg-indigo-500/10 -> bg-[color]-500/10
        # (Fazendo apenas se for indigo ou blue genérico para não quebrar alertas reais)
        body = re.sub(r'\b(bg|text|border)-(indigo|blue|emerald|rose|violet|cyan|slate|amber)-500(/[12]0)?\b', rf'\1-{color_name}-500\3', body)

        new_parts.append(header)
        new_parts.append(body)

    final_content = "".join(new_parts)
    
    # Limpeza final de sintaxe
    final_content = re.sub(r'variant=\{mv\[(\d+)\]\}\}', r'variant={mv[\1]}', final_content)
    final_content = re.sub(r'(TabsContent value="modulo-\d+")\d+', r'\1', final_content)

    if final_content != content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(final_content)
        print(f"✅ Arquivo {path.name} padronizado com consistência total v3.")
    else:
        print(f"⚠️ Nenhuma mudança necessária em {path.name}.")

if __name__ == "__main__":
    enforce_full_color_consistency("src/components/aulas/matematica/AulaConjuntos.tsx")
