import re

path = 'src/components/aulas/shared.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add to destructuring
destruct_regex = r'(export\s+function\s+AulaTemplate\(\{\s*[\s\S]*?)(children,?\s*\}:)'
if 'canComplete' not in content:
    content = re.sub(destruct_regex, r'\1canComplete = true,\n  lockMessage,\n  \2', content)

# 2. Add to interface
interface_regex = r'(children\?:[^;]+;?\s*\})'
content = re.sub(interface_regex, r'canComplete?: boolean;\n  lockMessage?: string;\n  \1', content)

# 3. Add to the completion button block
replace_btn = r'{!canComplete && (\n                        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive font-medium text-sm flex items-center gap-2 text-left">\n                          <LuInfo className="w-6 h-6 shrink-0" />\n                          <span>{lockMessage || "Você precisa concluir todos os quizzes e desafios para finalizar esta aula."}</span>\n                        </div>\n                      )}\n\n                      <Button'

content = content.replace('<Button', replace_btn, 1)

# Now update disabled={loading} to disabled={loading || !canComplete}
content = re.sub(r'disabled=\{loading\}', r'disabled={loading || !canComplete}', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated shared.tsx successfully")
