import re
import os
from pathlib import Path

def sync_math_indexing(file_path):
    path = Path(file_path)
    if not path.exists():
        print(f"File {file_path} not found.")
        return

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Separar por TabsContent (Módulos)
    tabs_content_pattern = re.compile(r'(<TabsContent\s+value="modulo-(\d+)"[^>]*>)(.*?)(</TabsContent>)', re.DOTALL)
    
    def replacer(match):
        start_tag = match.group(1)
        mod_index = match.group(2)
        body = match.group(3)
        end_tag = match.group(4)

        current_idx = 0
        
        # 1. Resetar e re-indexar todos os index={...}
        # Procuramos por ModuleSectionHeader e ModuleConsolidation que usem index={...}
        # Usamos um marcador temporário para evitar substituições recursivas se já estiverem certos
        
        # Primeiro, sincronizar textos internos do ModuleConsolidation com o mod_index real
        # Títulos de Video, Resumo, Macete e Nome do Módulo
        body = re.sub(r'title:\s*["\']Revisão do Módulo \d+["\']', f'title: "Revisão do Módulo {mod_index}"', body)
        body = re.sub(r'title:\s*["\']Dica de Ouro do Módulo \d+["\']', f'title: "Dica de Ouro do Módulo {mod_index}"', body)
        body = re.sub(r'moduloNome:\s*["\']Módulo \d+["\']', f'moduloNome: "Módulo {mod_index}"', body)
        
        # Sincronizar numero do ModuleBanner
        body = re.sub(r'<ModuleBanner\s+numero=\{\d+\}', f'<ModuleBanner numero={{{mod_index}}}', body)

        # 2. Re-indexação de Cards (Header e Consolidation)
        # Identificamos todos os componentes que usam index={...}
        def index_replacer(m):
            nonlocal current_idx
            current_idx += 1
            return f'index={{{current_idx}}}'

        # Regex para capturar o atributo index={...}
        # Fazemos isso componente por componente para garantir a ordem no body
        new_body = re.sub(r'index=\{\d+\}', index_replacer, body)
        
        # 3. Injetar moduloNumero no ModuleConsolidation para corrigir títulos internos
        if "<ModuleConsolidation" in new_body:
            if 'moduloNumero={' in new_body:
                new_body = re.sub(r'moduloNumero=\{\d+\}', f'moduloNumero={{{mod_index}}}', new_body)
            else:
                new_body = new_body.replace('<ModuleConsolidation', f'<ModuleConsolidation\n            moduloNumero={{{mod_index}}}')

        # 4. Sincronizar numero do QuizInterativo (Deve ser current_idx + 1)
        quiz_number = current_idx + 1
        new_body = re.sub(r'<QuizInterativo([\s\S]*?)numero=\{\d+\}', rf'<QuizInterativo\1numero={{{quiz_number}}}', new_body)

        return start_tag + new_body + end_tag

    new_content = tabs_content_pattern.sub(replacer, content)

    if new_content != content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"✅ Indexing and internal texts synced for {path.name}")
    else:
        print(f"✨ {path.name} already in sync.")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        sync_math_indexing(sys.argv[1])
    else:
        # Por padrão, rodar na AulaConjuntos se não especificado
        sync_math_indexing("src/components/aulas/matematica/AulaConjuntos.tsx")
