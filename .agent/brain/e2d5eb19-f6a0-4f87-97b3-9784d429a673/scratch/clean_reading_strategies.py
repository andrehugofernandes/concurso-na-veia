import os
import re

path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaReadingStrategies.tsx"
if not os.path.exists(path):
    print("File not found")
    exit(1)

with open(path, "rb") as f:
    raw_data = f.read()

# Vamos fazer a decodificação para UTF-8 com substituição de mojibakes comuns em bytes
replacements_bytes = [
    # Mojibakes de caracteres acentuados comuns
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
    # Mojibakes de caracteres especiais e pontuação
    (b"\xe2\x86\x92", "→".encode("utf-8")),
    (b"\xe2\x80\x94", "—".encode("utf-8")),
    (b"\xe2\x89\xa5", "≥".encode("utf-8")),
    (b"\xe2\x9c\x94", "✓".encode("utf-8")),
    (b"\xe2\x80\x9d", '”'.encode("utf-8")),
    (b"\xe2\x80\x9c", '“'.encode("utf-8")),
    (b"\xe2\x80\x99", "’".encode("utf-8")),
    (b"\xe2\x80\xa6", "...".encode("utf-8")),
    # Caso haja decodificações erradas de acentos que viraram \xc3\xad, etc.
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

# Aplicar substituições de bytes
for src, dst in replacements_bytes:
    raw_data = raw_data.replace(src, dst)

# Agora decodificamos como UTF-8
try:
    content = raw_data.decode("utf-8")
except Exception as e:
    print(f"Fallback to replacement decode: {e}")
    content = raw_data.decode("utf-8", errors="replace")

# Ajuste de termos específicos que ficaram corrompidos
# Ex: Mdulo -> Módulo
content = content.replace("Mdulo", "Módulo")
content = content.replace("mdulo", "módulo")
content = content.replace("", "") # Remover caracteres indefinidos

# 2. Corrigir numero={...} e variant em QuizInterativo
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
    
    # Atualizar QuizInterativo
    def update_quiz(match):
        q = match.group(0)
        # Substituir numero
        q = re.sub(r'numero=\{\d+\}', f'numero={{{m}}}', q)
        # Substituir variant
        # Como o usuário quer coloração baseada na mesma cor do banner do módulo 1,
        # vamos usar "blue" que é a cor padrão para quizzes de inglês
        q = re.sub(r'variant="[^"]+"', 'variant="blue"', q)
        # Remover propriedade icone corrompida se houver
        q = re.sub(r'icone="[^"]+"', '', q)
        q = re.sub(r"icone='[^']+'", '', q)
        return q
        
    updated_block = re.sub(r'<QuizInterativo[\s\S]*?/>', update_quiz, modulo_block)
    
    # Atualizar variant={mv[X]} para variant={mv[1]} no bloco do módulo
    # Exceto no QuizInterativo que já tratamos
    updated_block = re.sub(r'variant=\{mv\[\d+\]\}', 'variant={mv[1]}', updated_block)
    
    content = content[:start_idx] + updated_block + content[end_idx:]

# 3. Forçar o uso de variant={mv[1]} em todos os ModuleBanner, ModuleSectionHeader e ModuleConsolidation
content = re.sub(r'variant=\{mv\[\d+\]\}', 'variant={mv[1]}', content)

# 4. Substituir os ícones de Accordion
def clean_accordion_item(match):
    item_text = match.group(0)
    if '①' in item_text or '1.' in item_text or 'Conceituação' in item_text:
        item_text = re.sub(r'icone:\s*("[^"]*"|<[^>]*>)', 'icone: <LuBookOpen className="w-5 h-5" />', item_text)
    elif '②' in item_text or '2.' in item_text or 'Exemplificação' in item_text:
        item_text = re.sub(r'icone:\s*("[^"]*"|<[^>]*>)', 'icone: <LuPlay className="w-5 h-5" />', item_text)
    elif '③' in item_text or '3.' in item_text or 'Dicas' in item_text:
        item_text = re.sub(r'icone:\s*("[^"]*"|<[^>]*>)', 'icone: <LuLightbulb className="w-5 h-5" />', item_text)
    elif '④' in item_text or '4.' in item_text or 'Exceções' in item_text or 'Pegadilha' in item_text:
        item_text = re.sub(r'icone:\s*("[^"]*"|<[^>]*>)', 'icone: <LuTriangleAlert className="w-5 h-5" />', item_text)
    return item_text

content = re.sub(r'\{\s*titulo:\s*["\'].*?["\'],\s*icone:\s*.*?,[\s\S]*?\}', clean_accordion_item, content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Finished cleaning AulaReadingStrategies.tsx")
