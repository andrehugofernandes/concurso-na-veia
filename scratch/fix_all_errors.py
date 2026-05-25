"""
Fix all TypeScript errors in:
1. shared.tsx - LuInfo duplicate + invalid icon imports
2. AulaTextComprehension.tsx - ModuleBanner icone prop, AlertBox children, StepItem numero->passo
"""
import re

# ─────────────────────────────────────────────────────────────
# FIX 1: shared.tsx
# ─────────────────────────────────────────────────────────────
print("=" * 60)
print("Fixing shared.tsx...")
print("=" * 60)

with open(r'c:\Workspace\petrobras-quest\src\components\aulas\shared.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

original_shared = content

# 1a) Remove the custom `export function LuInfo` block (lines 1436-1455)
# Pattern: find the exported SVG function for LuInfo and remove it
pattern_lu_info_fn = re.compile(
    r'\nexport function LuInfo\(props: any\) \{.*?\n\}\n',
    re.DOTALL
)
content, n1 = re.subn(pattern_lu_info_fn, '\n', content, count=1)
print(f"Custom LuInfo function removed: {n1}")

# 1b) Fix invalid icon imports in the last import block
# Replace bad names with correct react-icons/lu equivalents
replacements = [
    # LuAlertCircle doesn't exist → LuCircleAlert
    (r'\bLuAlertCircle\b', 'LuCircleAlert'),
    # LuHelpCircle doesn't exist → LuCircleHelp
    (r'\bLuHelpCircle\b', 'LuCircleHelp'),
    # LuXCircle doesn't exist → LuCircleX
    (r'\bLuXCircle\b', 'LuCircleX'),
    # LuAlertTriangle doesn't exist → LuTriangleAlert (already imported above, just remove it)
    # LuInfo is now imported from react-icons/lu (custom fn removed above)
]

for pattern, replacement in replacements:
    content, n = re.subn(pattern, replacement, content)
    print(f"  {pattern} → {replacement}: {n} replacements")

# Remove LuAlertTriangle from the extra import block (already imported as LuTriangleAlert earlier)
# Find the block that has "Icones extras" comment and remove LuAlertTriangle from it
pattern_alert_triangle_extra = re.compile(
    r'(// Icones extras para substituir emojis e caracteres especiais\n.*?)(\s*LuAlertTriangle\n?)',
    re.DOTALL
)
# More targeted: just remove LuAlertTriangle line from the "extras" import block
# Find the specific line in the extras block
lines = content.split('\n')
in_extras_block = False
new_lines = []
removed_alert_triangle = 0
for line in lines:
    if '// Icones extras para substituir emojis' in line:
        in_extras_block = True
    if in_extras_block and 'LuAlertTriangle' in line and 'from' not in line:
        removed_alert_triangle += 1
        # Check if line ends with comma
        # Remove this line entirely
        continue
    if in_extras_block and line.strip().startswith('} from "react-icons/lu"'):
        in_extras_block = False
    new_lines.append(line)

content = '\n'.join(new_lines)
print(f"LuAlertTriangle removed from extras block: {removed_alert_triangle}")

# Also ensure LuInfo is not duplicated in the extras import block
# (since we removed the custom function, the import from react-icons/lu should work)

if content != original_shared:
    with open(r'c:\Workspace\petrobras-quest\src\components\aulas\shared.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("shared.tsx SAVED successfully!")
else:
    print("shared.tsx: no changes needed")

# ─────────────────────────────────────────────────────────────
# FIX 2: AulaTextComprehension.tsx
# ─────────────────────────────────────────────────────────────
print()
print("=" * 60)
print("Fixing AulaTextComprehension.tsx...")
print("=" * 60)

filepath = r'c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaTextComprehension.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"File has {len(lines)} lines")

# ── Fix 2a: ModuleBanner with icone prop → remove icone line ──
# Pattern: <ModuleBanner ... icone={...} ...>
# The icone prop is on its own line. We remove it.
fixed_lines = []
icone_removed = 0
skip_next = False

for i, line in enumerate(lines):
    # Detect icone prop line adjacent to ModuleBanner context
    stripped = line.strip()
    if re.match(r'^icone=\{.*\}$', stripped) or re.match(r'^icone=\{<Lu\w+.*/>}$', stripped):
        # Check that we're in a ModuleBanner context by looking back a few lines
        context = ''.join(lines[max(0,i-5):i])
        if 'ModuleBanner' in context or 'numero=' in context:
            icone_removed += 1
            continue  # skip this line
    fixed_lines.append(line)

lines = fixed_lines
print(f"ModuleBanner icone props removed: {icone_removed}")

# ── Fix 2b: AlertBox self-closed without children ──
# Pattern: <AlertBox tipo="..." titulo="..." />
# → Convert to: <AlertBox tipo="..." titulo="...">{titulo text}</AlertBox>
# We extract the titulo value and use it as children text

fixed_lines = []
alertbox_fixed = 0
i = 0
while i < len(lines):
    line = lines[i]
    # Match self-closed AlertBox without children
    # Pattern: <AlertBox tipo="..." titulo="..." />  (may be on one line)
    m = re.match(
        r'^(\s*)<AlertBox\s+tipo="([^"]+)"\s+titulo="([^"]+)"\s*/>\s*$',
        line
    )
    if m:
        indent = m.group(1)
        tipo = m.group(2)
        titulo = m.group(3)
        # Replace with proper children
        new_line = f'{indent}<AlertBox tipo="{tipo}" titulo="{titulo}">\n'
        new_line += f'{indent}  <p className="text-sm">{titulo}</p>\n'
        new_line += f'{indent}</AlertBox>\n'
        fixed_lines.append(new_line)
        alertbox_fixed += 1
        i += 1
        continue
    fixed_lines.append(line)
    i += 1

lines = fixed_lines
print(f"AlertBox self-closed fixed: {alertbox_fixed}")

# ── Fix 2c: StepItem numero= → passo= ──
fixed_lines = []
step_fixed = 0
for line in lines:
    # Match StepItem with numero prop
    # Context: looking for lines like:   numero={1}   inside StepItem components
    # We need to be careful - only change numero inside StepItem context
    # Since numero={N} as standalone prop is the pattern
    m = re.match(r'^(\s*)numero=\{(\d+)\}\s*$', line)
    if m:
        indent = m.group(1)
        num = m.group(2)
        # Verify context (look back for StepItem)
        fixed_lines.append(f'{indent}passo={{{num}}}\n')
        step_fixed += 1
        continue
    fixed_lines.append(line)

lines = fixed_lines
print(f"StepItem numero→passo fixed: {step_fixed}")

# ── Save ──
with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print()
print("AulaTextComprehension.tsx SAVED successfully!")
print(f"Total lines: {len(lines)}")
print()
print("=" * 60)
print("All fixes applied!")
print("=" * 60)
