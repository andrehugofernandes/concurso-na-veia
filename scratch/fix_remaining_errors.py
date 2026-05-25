"""
Fix remaining TypeScript errors:
1. shared.tsx: LuInfo in import block (already imported, so remove from extras block)
2. AulaTextComprehension.tsx: Revert passo->numero for ModuleBanner/QuizInterativo, 
   keep passo only for StepItem
"""
import re

# ─────────────────────────────────────────────────────────────
# FIX shared.tsx
# ─────────────────────────────────────────────────────────────
print("Fixing shared.tsx...")

with open(r'c:\Workspace\petrobras-quest\src\components\aulas\shared.tsx', 'r', encoding='utf-8', newline='\r\n') as f:
    content = f.read()

# Remove LuInfo from the "extras" import block - it's already imported in the main block
# The extras block looks like: LuInfo,\n  LuBookMarked,
# We want to remove the LuInfo, line from that block only (not the main imports)
# Strategy: find the extras block and remove LuInfo from it

# The extras block starts with "// Icones extras" comment
extras_block_start = content.find('// Icones extras para substituir emojis e caracteres especiais')
if extras_block_start != -1:
    # Find the closing } from "react-icons/lu";
    extras_block_end = content.find('} from "react-icons/lu";', extras_block_start)
    if extras_block_end != -1:
        extras_block = content[extras_block_start:extras_block_end]
        print(f"Found extras block: {repr(extras_block[:100])}")
        
        # Remove LuInfo line from extras block
        new_extras = re.sub(r'\s*LuInfo,?\n?', '', extras_block)
        # Clean trailing comma if needed
        new_extras = re.sub(r',\s*\n(\s*}\s*from)', r'\n\1', new_extras)
        content = content[:extras_block_start] + new_extras + content[extras_block_end:]
        print("LuInfo removed from extras import block")
else:
    print("WARNING: extras block not found")

with open(r'c:\Workspace\petrobras-quest\src\components\aulas\shared.tsx', 'w', encoding='utf-8', newline='\r\n') as f:
    f.write(content)
print("shared.tsx saved!")

# ─────────────────────────────────────────────────────────────
# FIX AulaTextComprehension.tsx
# ─────────────────────────────────────────────────────────────
print()
print("Fixing AulaTextComprehension.tsx...")

filepath = r'c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaTextComprehension.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"File has {len(lines)} lines")

# We need to:
# 1. Find StepItem usages and fix: numero= -> passo= (CORRECT)
# 2. Find ModuleBanner/QuizInterativo usages that got wrongly changed: passo= -> numero= (REVERT)
# 
# Strategy: scan the file tracking which component we're inside of.
# A StepItem block starts with <StepItem and ends with />
# A ModuleBanner block starts with <ModuleBanner and ends with />
# A QuizInterativo block starts with <QuizInterativo and ends with />

fixed_lines = list(lines)  # copy

# First, collect all component spans
# We'll do a simple state-machine approach

component_stack = []  # list of (component_name, start_line)
passo_fix_lines = set()   # lines where passo= should stay (StepItem)
numero_fix_lines = set()  # lines where passo= should be reverted to numero= (ModuleBanner, QuizInterativo)

current_component = None
current_start = None

# Patterns for component detection
step_item_open = re.compile(r'<StepItem\b')
module_banner_open = re.compile(r'<ModuleBanner\b')
quiz_interativo_open = re.compile(r'<QuizInterativo\b')
self_close_end = re.compile(r'/>')
passo_prop = re.compile(r'^\s*passo=\{')

# Track state
in_component = None  # 'StepItem', 'ModuleBanner', 'QuizInterativo', or None
in_component_depth = 0

for i, line in enumerate(fixed_lines):
    # Detect component start
    if step_item_open.search(line):
        in_component = 'StepItem'
    elif module_banner_open.search(line):
        in_component = 'ModuleBanner'
    elif quiz_interativo_open.search(line):
        in_component = 'QuizInterativo'
    
    # If we're inside a component, check for passo= prop
    if in_component and passo_prop.match(line):
        if in_component == 'StepItem':
            passo_fix_lines.add(i)  # keep passo=
        else:
            numero_fix_lines.add(i)  # revert to numero=
    
    # Detect component end (self-close />)
    if in_component and self_close_end.search(line) and not '<' in line.split('/>')[0].split('<')[-1] if '/>' in line else False:
        in_component = None
    elif in_component and line.strip() == '/>':
        in_component = None

print(f"StepItem passo= lines (keep): {sorted(passo_fix_lines)}")
print(f"ModuleBanner/QuizInterativo passo= lines (revert): {sorted(numero_fix_lines)}")

# Apply fixes: revert passo= to numero= for non-StepItem components
reverted = 0
for i in numero_fix_lines:
    fixed_lines[i] = re.sub(r'\bpasso=', 'numero=', fixed_lines[i])
    reverted += 1

print(f"Reverted {reverted} passo= back to numero=")

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(fixed_lines)

print("AulaTextComprehension.tsx saved!")
print()
print("All fixes applied!")
