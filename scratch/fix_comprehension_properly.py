import os
import re

file_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaTextComprehension.tsx"

if not os.path.exists(file_path):
    print("File not found")
    exit(1)

with open(file_path, "rb") as f:
    raw_data = f.read()

# 1. Substituir mojibakes comuns em bytes
replacements_bytes = [
    (b"\xc3\x83\xe2\x80\x9cleo", "Óleo".encode("utf-8")),
    (b"\xc3\x83\xc2\xb3leo", "óleo".encode("utf-8")),
    (b"\xc3\x83\xc2\xa1", "á".encode("utf-8")),
    (b"\xc3\x83\xc2\xa9", "é".encode("utf-8")),
    (b"\xc3\x83\xc2\xad", "í".encode("utf-8")),
    (b"\xc3\x83\xc2\xb3", "ó".encode("utf-8")),
    (b"\xc3\x83\xc2\xba", "ú".encode("utf-8")),
    (b"\xc3\x83\xc2\xa3", "ã".encode("utf-8")),
    (b"\xc3\x83\xc2\xb5", "õ".encode("utf-8")),
    (b"\xc3\x83\xc2\xa2", "â".encode("utf-8")),
    (b"\xc3\x83\xc2\xaa", "ê".encode("utf-8")),
    (b"\xc3\x83\xc2\xb4", "ô".encode("utf-8")),
    (b"\xc3\x83\xc2\xa7", "ç".encode("utf-8")),
    (b"\xc3\x83\xc2\x81", "Á".encode("utf-8")),
    (b"\xc3\x83\xc2\x89", "É".encode("utf-8")),
    (b"\xc3\x83\xc2\x8d", "Í".encode("utf-8")),
    (b"\xc3\x83\xc2\x93", "Ó".encode("utf-8")),
    (b"\xc3\x83\xc2\x9a", "Ú".encode("utf-8")),
    (b"\xc3\x83\xc2\x83", "Ã".encode("utf-8")),
    (b"\xc3\x83\xc2\x95", "Õ".encode("utf-8")),
    (b"\xc3\x83\xc2\x82", "Â".encode("utf-8")),
    (b"\xc3\x83\xc2\x8a", "Ê".encode("utf-8")),
    (b"\xc3\x83\xc2\x94", "Ô".encode("utf-8")),
    (b"\xc3\x83\xc2\x87", "Ç".encode("utf-8")),
    (b"\xe2\x86\x92", "→".encode("utf-8")),
    (b"\xe2\x80\x94", "—".encode("utf-8")),
    (b"\xe2\x89\xa5", "≥".encode("utf-8")),
    (b"\xe2\x9c\x94", "✓".encode("utf-8")),
    (b"\xe2\x80\x9d", '”'.encode("utf-8")),
    (b"\xe2\x80\x9c", '“'.encode("utf-8")),
    (b"\xe2\x80\x99", "’".encode("utf-8")),
    (b"\xe2\x80\xa6", "...".encode("utf-8")),
    (b"\xc3\xad", "í".encode("utf-8")),
    (b"\xc3\xa1", "á".encode("utf-8")),
    (b"\xc3\xa9", "é".encode("utf-8")),
    (b"\xc3\xb3", "ó".encode("utf-8")),
    (b"\xc3\xba", "ú".encode("utf-8")),
    (b"\xc3\xa3", "ã".encode("utf-8")),
    (b"\xc3\xb5", "õ".encode("utf-8")),
    (b"\xc3\xa7", "ç".encode("utf-8")),
    (b"\xc3\xaa", "ê".encode("utf-8")),
    (b"\xc3\xb4", "ô".encode("utf-8")),
    (b"\xc3\xa2", "â".encode("utf-8")),
    (b"\xc3\x81", "Á".encode("utf-8")),
    (b"\xc3\x89", "É".encode("utf-8")),
    (b"\xc3\x8d", "Í".encode("utf-8")),
    (b"\xc3\x93", "Ó".encode("utf-8")),
    (b"\xc3\x9a", "Ú".encode("utf-8")),
    (b"\xc3\x83", "Ã".encode("utf-8")),
    (b"\xc3\x95", "Õ".encode("utf-8")),
    (b"\xc3\x87", "Ç".encode("utf-8")),
    (b"\xc3\x8a", "Ê".encode("utf-8")),
]

for src, dst in replacements_bytes:
    raw_data = raw_data.replace(src, dst)

try:
    content = raw_data.decode("utf-8")
except Exception as e:
    content = raw_data.decode("utf-8", errors="replace")

content = content.replace("Mdulo", "Módulo")
content = content.replace("mdulo", "módulo")

# 2. Corrigir ComparisonSide obsoletos
# Procura e substitui a sintaxe de lado1/lado2 do original
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
    
    tipo1 = "incorrect"
    tipo2 = "correct"
    
    # Alguns ajustes especificos para manter a semantica correta
    if "Soluc" in label2 or "Correto" in label2 or "Significado 2" in label2 or "Valide" in label2 or "Opinion" in label2 or "Purpose" in label2 or "Inferenc" in label2 or "Texto pode usar" in label2:
        tipo2 = "correct"
        
    return (
        '<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">\n'
        '                          <ComparisonSide\n'
        '                            tipo="' + tipo1 + '"\n'
        '                            titulo="' + label1 + '"\n'
        '                            items={["' + content1.replace('"', '\\"') + '"]}\n'
        '                          />\n'
        '                          <ComparisonSide\n'
        '                            tipo="' + tipo2 + '"\n'
        '                            titulo="' + label2 + '"\n'
        '                            items={["' + content2.replace('"', '\\"') + '"]}\n'
        '                          />\n'
        '                        </div>'
    )

content, count_comp = comp_pattern.subn(replace_comparison, content)
print(f"ComparisonSides replaced: {count_comp}")

# 3. Corrigir AlertBox com propriedade descricao
alert_pattern = re.compile(
    r'<AlertBox(\s+[^>]*?)descricao="([^"]+)"([^>]*?)>(.*?\n\s*)',
    re.DOTALL
)

def replace_alert(match):
    before_desc = match.group(1)
    desc_val = match.group(2)
    after_desc = match.group(3)
    after_open_tag = match.group(4)
    
    attrs = (before_desc + " " + after_desc).strip()
    attrs = re.sub(r'\s+', ' ', attrs)
    
    return f'<AlertBox {attrs}>\n                        <p className="text-sm text-muted-foreground mb-4">\n                          {desc_val}\n                        </p>\n                        {after_open_tag.strip()}'

content, count_alert = alert_pattern.subn(replace_alert, content)
print(f"AlertBoxes with descricao replaced: {count_alert}")

# Também consertar AlertBoxes que são auto-fechados e têm descricao (se existirem)
alert_self_closed_pattern = re.compile(
    r'<AlertBox(\s+[^>]*?)descricao="([^"]+)"([^>]*?)\s*/>',
    re.DOTALL
)

def replace_alert_self_closed(match):
    before_desc = match.group(1)
    desc_val = match.group(2)
    after_desc = match.group(3)
    
    attrs = (before_desc + " " + after_desc).strip()
    attrs = re.sub(r'\s+', ' ', attrs)
    
    return f'<AlertBox {attrs}>\n                        <p className="text-sm text-muted-foreground">\n                          {desc_val}\n                        </p>\n                      </AlertBox>'

content, count_alert_self = alert_self_closed_pattern.subn(replace_alert_self_closed, content)
print(f"Self-closed AlertBoxes replaced: {count_alert_self}")

# 4. Ajustar as variantes das cores para variant={mv[1]} nos banners e cards
# Primeiro ajustamos banners e cabeçalhos de seção
content = re.sub(r'modulo=\{\d+\}', lambda m: m.group(0).replace('modulo', 'numero'), content)
content = re.sub(r'corModulo=\{mv\[\d+\]\}', 'variant={mv[1]}', content)
content = re.sub(r'variant=\{mv\[\d+\]\}', 'variant={mv[1]}', content)

# Também remover propriedades redundantes e inválidas nos ModuleBanner
content = re.sub(r'icone=\{\s*<LuGraduationCap[^>]*>\s*\}', '', content)
content = re.sub(r'icone=\{\s*<LuZap[^>]*>\s*\}', '', content)
content = re.sub(r'icone=\{\s*<LuBookOpen[^>]*>\s*\}', '', content)
content = re.sub(r'icone=\{\s*<LuClipboardList[^>]*>\s*\}', '', content)

# 5. Atualizar os quizzes para ter o numero={m} e variant="blue" e o titulo do modulo correspondente
for m in range(1, 11):
    start_tag = f'<TabsContent value="modulo-{m}">'
    next_tag = f'<TabsContent value="modulo-{m+1}">' if m < 10 else '</AulaTemplate>'
    
    start_idx = content.find(start_tag)
    if start_idx == -1:
        continue
        
    end_idx = content.find(next_tag)
    if end_idx == -1:
        end_idx = len(content)
        
    modulo_block = content[start_idx:end_idx]
    
    # Mapear títulos amigáveis para os Quizzes
    quiz_titles = {
        1: "Decoding Question Types (Main Idea / Detail / Inference)",
        2: "Skimming — Leitura Panorâmica",
        3: "Scanning — Localização Precisa",
        4: "Vocabulary in Context",
        5: "Paragraph Structure & Topic Sentences",
        6: "Reference Words & Text Cohesion",
        7: "Tone & Author's Purpose",
        8: "Inference & Implicit Information",
        9: "Reading Comprehension em Provas CESGRANRIO",
        10: "Simulado Mestre (Final)"
    }
    
    title_for_quiz = quiz_titles.get(m, "Quiz Interativo")
    
    def update_quiz(match):
        q = match.group(0)
        # Substituir numero
        q = re.sub(r'numero=\{\d+\}', f'numero={{{m}}}', q)
        # Se não tiver o número, adicionar
        if "numero=" not in q:
            q = q.replace('<QuizInterativo', f'<QuizInterativo numero={{{m}}}')
        # Substituir variant
        if 'variant=' in q:
            q = re.sub(r'variant="[^"]+"', 'variant="blue"', q)
            q = re.sub(r"variant='[^']+'", 'variant="blue"', q)
            q = re.sub(r'variant=\{[^}]+\}', 'variant="blue"', q)
        else:
            q = q.replace('<QuizInterativo', '<QuizInterativo variant="blue"')
        # Garantir título
        if 'titulo=' in q:
            q = re.sub(r'titulo="[^"]+"', f'titulo="{title_for_quiz}"', q)
            q = re.sub(r"titulo='[^']+'", f'titulo="{title_for_quiz}"', q)
        else:
            q = q.replace('<QuizInterativo', f'<QuizInterativo titulo="{title_for_quiz}"')
            
        # Remover propriedades icone redundantes se houver
        q = re.sub(r'icone="[^"]+"', '', q)
        q = re.sub(r"icone='[^']+'", '', q)
        return q
        
    updated_block = re.sub(r'<QuizInterativo[\s\S]*?/>', update_quiz, modulo_block)
    content = content[:start_idx] + updated_block + content[end_idx:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Proper refactoring of AulaTextComprehension.tsx finished successfully!")
