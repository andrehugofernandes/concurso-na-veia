import os
import re
import json

def extract_titles(directory):
    title_pattern = re.compile(r'title:\s*"(.*?)"')
    module_defs_pattern = re.compile(r'const MODULE_DEFS = \[(.*?)\];', re.DOTALL)
    
    results = {}
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') and file.startswith('Aula'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                    # Try to find MODULE_DEFS
                    match = re.search(r'const MODULE_DEFS = \[(.*?)\]', content, re.DOTALL)
                    if match:
                        module_content = match.group(1)
                        titles = title_pattern.findall(module_content)
                        if titles:
                            results[path] = titles
                            
    return results

if __name__ == "__main__":
    aulas_dir = r'c:\Workspace\petrobras-quest\src\components\aulas'
    titles_map = extract_titles(aulas_dir)
    
    output_path = r'C:\Users\andre.hugo\.gemini\antigravity\brain\e3c98e66-5b64-4747-83af-f5f458298040\scratch\lesson_titles.json'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(titles_map, f, indent=2, ensure_ascii=False)
        
    print(f"Extracted titles from {len(titles_map)} files to {output_path}")
