import re

file_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaTextComprehension.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Regex para corrigir ComparisonSide que usa lado1 e lado2
# E.g.:
# <ComparisonSide
#   lado1={{ label: "❌ Falso Cognato", content: "... " }}
#   lado2={{ label: "✅ Correto", content: "... " }}
# />

# Pattern flexível que aceita quebras de linha e espacamentos
comp_pattern = re.compile(
    r'<ComparisonSide\s+'
    r'lado1=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}\s+'
    r'lado2=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}\s*'
    r'/>',
    re.DOTALL
)

def replace_comparison(match):
    label1 = match.group(1).replace("❌ ", "").replace("✓ ", "").replace("✅ ", "")
    content1 = match.group(2)
    label2 = match.group(3).replace("❌ ", "").replace("✓ ", "").replace("✅ ", "")
    content2 = match.group(4)
    
    # Determina o tipo com base no label ou prefixo
    tipo1 = "incorrect" if "Falso" in label1 or "Pegadinha" in label1 or "Usual" in label1 or "Significado 1" in label1 or "Frases separadas" in label1 or "Tone" in label1 or "Main Idea" in label1 or "Over-inference" in label1 else "incorrect"
    tipo2 = "correct"
    
    # Alguns ajustes especificos para manter a semantica correta
    if "Soluc" in label2 or "Correto" in label2 or "Significado 2" in label2 or "Valide" in label2 or "Opinion" in label2 or "Purpose" in label2 or "Inferenc" in label2:
        tipo2 = "correct"
        
    return f"""<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <ComparisonSide
                            tipo="{tipo1}"
                            titulo="{label1}"
                            items={["{content1}"]}
                          />
                          <ComparisonSide
                            tipo="{tipo2}"
                            titulo="{label2}"
                            items={["{content2}"]}
                          />
                        </div>"""

content, count_comp = comp_pattern.subn(replace_comparison, content)
print(f"ComparisonSides replaced via regex: {count_comp}")

# 2. Regex para extrair a prop descricao de AlertBox e colocar no corpo
# E.g.:
# <AlertBox
#   tipo="danger"
#   titulo="..."
#   descricao="..."
# >
# ...
# </AlertBox>

alert_pattern = re.compile(
    r'<AlertBox(\s+[^>]*?)descricao="([^"]+)"([^>]*?)>(.*?\n\s*)',
    re.DOTALL
)

def replace_alert(match):
    before_desc = match.group(1)
    desc_val = match.group(2)
    after_desc = match.group(3)
    after_open_tag = match.group(4)
    
    # Remove espacos extras gerados pela remocao da prop
    attrs = (before_desc + " " + after_desc).strip()
    attrs = re.sub(r'\s+', ' ', attrs)
    
    return f'<AlertBox {attrs}>\n                        <p className="text-sm text-muted-foreground mb-4">\n                          {desc_val}\n                        </p>\n                        {after_open_tag.strip()}'

content, count_alert = alert_pattern.subn(replace_alert, content)
print(f"AlertBoxes with descricao prop replaced: {count_alert}")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Regex replacement finished.")
