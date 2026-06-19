import re

file_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaTextComprehension.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern for AlertBox with properties tipo, titulo, and descricao on multiple lines
# E.g.:
# <AlertBox
#   tipo="warning"
#   titulo="Pegadinha"
#   descricao="texto longo..."
# />
pattern = r'<AlertBox\s+tipo="([^"]+)"\s+titulo="([^"]+)"\s+descricao="([^"]+)"\s*/>'

def replace_alertbox(match):
    tipo = match.group(1)
    titulo = match.group(2)
    desc = match.group(3)
    return f'<AlertBox tipo="{tipo}" titulo="{titulo}">\n                          <p className="text-sm text-muted-foreground">{desc}</p>\n                        </AlertBox>'

# E se a ordem das props variar ou se tiver quebras de linha?
# Vamos usar um parser mais inteligente baseado em regex que encontra as aberturas de AlertBox.
# Vamos capturar todo o bloco <AlertBox ... /> de forma flexível.
block_pattern = r'<AlertBox\s+[^>]*?descricao="([^"]+)"[^>]*?/>'

# Para fazer de forma super segura, vamos buscar cada tag <AlertBox ... />
# e reconstruí-la.
def parse_and_replace(text):
    # Encontra todas as ocorrências de <AlertBox ... />
    matches = list(re.finditer(r'<AlertBox\s+([^>]+)/>', text))
    offset = 0
    new_text = text
    
    for m in matches:
        body = m.group(1)
        # Extrai tipo, titulo e descricao
        tipo_match = re.search(r'tipo="([^"]+)"', body)
        titulo_match = re.search(r'titulo="([^"]+)"', body)
        descricao_match = re.search(r'descricao="([^"]+)"', body)
        
        if tipo_match and titulo_match and descricao_match:
            tipo = tipo_match.group(1)
            titulo = titulo_match.group(1)
            desc = descricao_match.group(1)
            
            # Reconstrói a tag
            new_tag = f'<AlertBox tipo="{tipo}" titulo="{titulo}">\n                          <p className="text-sm text-muted-foreground">\n                            {desc}\n                          </p>\n                        </AlertBox>'
            
            start = m.start() + offset
            end = m.end() + offset
            new_text = new_text[:start] + new_tag + new_text[end:]
            offset += len(new_tag) - (end - start)
            
    return new_text

fixed_content = parse_and_replace(content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(fixed_content)

print("AlertBoxes fixed successfully!")
