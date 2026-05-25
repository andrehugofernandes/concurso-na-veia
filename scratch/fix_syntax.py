import re

filepath = r"c:\Workspace\petrobras-quest\src\components\aulas\administracao\AulaAdministracaoGeralSuprimento.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: variant={mv[X if X < 10 else 9] as any} -> variant={mv[X] as any}
# Actually it's variant={mv[1 if 1 < 10 else 9] as any}
pattern = r'variant=\{mv\[(\d+) if \1 < 10 else 9\] as any\}'

def replace_variant(match):
    val = int(match.group(1))
    new_val = val if val < 10 else 9
    return f"variant={{mv[{new_val}] as any}}"

content = re.sub(pattern, replace_variant, content)

# Fix 2: unescaped double quotes inside verso=""
# For example: verso=""Tudo depende". A estrutura e..."
# In FlipCard, I can change the outer quotes to curly braces with backticks: verso={`"Tudo depende". A...`}
# Or just replace the literal string with correctly escaped quotes.

def replace_quotes(match):
    frente = match.group(1)
    verso = match.group(2)
    # Escape double quotes inside verso if there are any that aren't at the ends
    verso_fixed = verso.replace('"', '\\"')
    return f'frente="{frente}" verso="{verso_fixed}"'

# Wait, the problem is it already output invalid string: verso=""Tudo depende". A estrutura..."
# I'll just use a regex to find all FlipCards and fix them.
pattern_flip = r'<FlipCard frente="([^"]*)" verso="(.*?)" />'
# Wait, if it has unescaped quotes, the regex `verso="(.*?)"` will stop at the first quote!
# Let's find `<FlipCard frente="([^"]*)" verso=(.*?) />`
pattern_flip2 = r'<FlipCard frente="([^"]*)" verso=(.*?) />'
def replace_flip(match):
    frente = match.group(1)
    verso_raw = match.group(2)
    # verso_raw might be `""Tudo depende". A estrutura e..."`
    # Let's clean it up
    if verso_raw.startswith('"') and verso_raw.endswith('"'):
        inner = verso_raw[1:-1]
        inner_escaped = inner.replace('"', '&quot;')
        return f'<FlipCard frente="{frente}" verso="{inner_escaped}" />'
    return match.group(0)

content = re.sub(pattern_flip2, replace_flip, content)

# Also fix the specific one we know about:
content = content.replace('verso=""Tudo depende". A estrutura e gestǟo adequadas dependem do ambiente e tecnologia." />', 'verso="&quot;Tudo depende&quot;. A estrutura e gestǟo adequadas dependem do ambiente e tecnologia." />')
content = content.replace('verso=""Tudo depende". A estrutura e gestão adequadas dependem do ambiente e tecnologia." />', 'verso="&quot;Tudo depende&quot;. A estrutura e gestão adequadas dependem do ambiente e tecnologia." />')


# Let's run a general fix for all double quotes inside the verso attribute
# Find all `<FlipCard ... verso="... />`
lines = content.split('\n')
for i, line in enumerate(lines):
    if "<FlipCard" in line and "verso=" in line:
        # line looks like: <FlipCard frente="X" verso="Y" />
        # we can extract the part after verso="
        start_idx = line.find('verso="') + 7
        end_idx = line.rfind('" />')
        if start_idx != -1 and end_idx != -1:
            inner = line[start_idx:end_idx]
            inner_fixed = inner.replace('"', '&quot;')
            lines[i] = line[:start_idx] + inner_fixed + line[end_idx:]

content = "\n".join(lines)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed syntax errors.")
