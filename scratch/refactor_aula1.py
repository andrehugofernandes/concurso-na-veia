import re
import os

filepath = r"c:\Workspace\petrobras-quest\src\components\aulas\administracao\AulaAdministracaoGeralSuprimento.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# We want to find the big `return (\n    <AulaTemplate ... > ... </AulaTemplate>\n  );`
# and extract the `{activeTab === "modulo-X" && ( ... )}` blocks.

# Pattern to find each modulo block
pattern = r'\{\/\* ==================== MDULO (\d+) ==================== \*\/\}\s*\{activeTab === "modulo-\1" && \(\s*<TabsContent value="modulo-\1" className="space-y-12 mt-0">\s*(.*?)\s*</TabsContent>\s*\)\}'

matches = list(re.finditer(pattern, content, re.DOTALL))

if len(matches) == 0:
    print("No modulo blocks found with exact match, maybe encoding issue. Retrying with simpler pattern.")
    pattern = r'\{\/\*\s*====================\s*M.DULO\s*(\d+)\s*====================\s*\*\/\}\s*\{activeTab === "modulo-\1" && \(\s*<TabsContent value="modulo-\1"[^>]*>\s*(.*?)\s*</TabsContent>\s*\)\}'
    matches = list(re.finditer(pattern, content, re.DOTALL))

print(f"Found {len(matches)} modulo blocks.")

functions = []
replacements = []

for match in matches:
    mod_num = match.group(1)
    inner_content = match.group(2)
    
    # Check if RichIntro is there
    has_rich_intro = "text-lg leading-relaxed text-foreground" in inner_content
    if not has_rich_intro:
        print(f"Module {mod_num} is missing RichIntro.")
        
    func_str = f"  const renderModulo{mod_num} = () => (\n    <div className=\"space-y-12 mt-0\">\n      {inner_content}\n    </div>\n  );"
    functions.append(func_str)
    
    # We will replace the original with a call to the function
    new_block = f'{{/* ==================== MÓDULO {mod_num} ==================== */}}\n      {{activeTab === "modulo-{mod_num}" && (\n        <TabsContent value="modulo-{mod_num}" className="space-y-12 mt-0">\n          {{renderModulo{mod_num}()}}\n        </TabsContent>\n      )}}'
    replacements.append((match.span(), new_block))

if len(matches) == 10:
    # Do the replacement from bottom to top to not mess up spans
    new_content = content
    for span, new_block in reversed(replacements):
        new_content = new_content[:span[0]] + new_block + new_content[span[1]:]
        
    # Insert functions before return
    return_idx = new_content.find('  return (')
    if return_idx != -1:
        funcs_str = "\n\n".join(functions) + "\n\n"
        new_content = new_content[:return_idx] + funcs_str + new_content[return_idx:]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully refactored into renderModulo functions.")
    else:
        print("Could not find 'return ('.")

