import re
from pathlib import Path

def full_color_nuke(file_path):
    path = Path(file_path)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Mapeamento do nome da cor tailwind base para cada modulo
    color_names = {
        "1": "amber", "2": "blue", "3": "emerald", "4": "rose", "5": "violet",
        "6": "amber", "7": "blue", "8": "emerald", "9": "rose", "10": "violet"
    }

    # Dividir por módulos
    delimiter = r'(<TabsContent\s+value="modulo-(\d+)")'
    # parts: [prefix, "<TabsContent...", "N", "body"]
    parts = re.split(delimiter, content)
    
    new_parts = [parts[0]]
    for i in range(1, len(parts), 3):
        header = parts[i]
        mod_num = parts[i+1]
        body = parts[i+2]
        
        target_color = color_names.get(mod_num, "indigo")
        forbidden_colors = ["indigo", "blue", "emerald", "violet", "amber", "rose", "cyan", "teal", "pink", "sky", "slate"]
        
        # 1. Substituições de classes Tailwind
        for c in forbidden_colors:
            if c == target_color: continue
            pattern = rf'\b(bg|text|border|ring|divide|fill|stroke)-{c}-(\d+)(/[.\w]+)?\b'
            body = re.sub(pattern, rf'\1-{target_color}-\2\3', body)
            body = re.sub(rf'["\']{c}-500["\']', f'"{target_color}-500"', body)

        # 2. Forçar variant={mv[N]}
        body = re.sub(r'<(ModuleSectionHeader|ModuleConsolidation|QuizInterativo|FlipCard|CardCarousel)[^>]+>', 
                      lambda m: re.sub(r'variant=["\']?[^"\'\}]+["\']?', f'variant={{mv[{mod_num}]}}', m.group(0)), body)
        body = re.sub(r'<(ModuleSectionHeader|ModuleConsolidation|QuizInterativo|FlipCard|CardCarousel)[^>]+>', 
                      lambda m: re.sub(r'variant=\{[^\}]+\}', f'variant={{mv[{mod_num}]}}', m.group(0)), body)

        # 3. Tipografia "Ultimate" para Rich Intro (Mudar text-base -> text-xl e add text-justify)
        # Procuramos por seções com comentário "RICH INTRO" ou similar
        # E aplicamos as classes na div que contém o parágrafo
        body = re.sub(r'className="space-y-6 text-base text-foreground/85 leading-relaxed"', 
                      'className="space-y-6 text-xl text-foreground/85 leading-relaxed text-justify"', body)
        
        # Caso a classe seja ligeiramente diferente
        body = re.sub(r'className="space-y-6 text-xl text-foreground/85 leading-relaxed"', 
                      'className="space-y-6 text-xl text-foreground/85 leading-relaxed text-justify"', body)

        new_parts.append(header)
        new_parts.append(body)

    final_content = "".join(new_parts)
    final_content = re.sub(r'variant=\{mv\[(\d+)\]\}\}', r'variant={mv[\1]}', final_content)

    if final_content != content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(final_content)
        print(f"🔥 Nuke de cores e Tipografia concluído em {path.name}.")
    else:
        print(f"✅ Nenhuma alteração necessária em {path.name}.")

if __name__ == "__main__":
    full_color_nuke("src/components/aulas/matematica/AulaConjuntos.tsx")
