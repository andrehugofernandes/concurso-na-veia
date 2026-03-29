import os
import re
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from safeguard import safe_write, safe_read

DRY_RUN = "--dry-run" in sys.argv

def sanitize_file(p):
    c = safe_read(p)
    if c is None:
        return

    # 1. Imports
    c = c.replace("{ '{' }", "{")
    c = c.replace("{ '}' }", "}")

    # 2. Props
    c = re.sub(r'(\w+)=([0-9a-zA-Z\.\[\]]+)\}', r'\1={\2}', c)
    c = re.sub(r'(\w+)=([0-9]+)(\s)', r'\1={\2}\3', c)
    c = re.sub(r'(\w+)=(mv\[\d+\])(\s)', r'\1={\2}\3', c)

    # 3. Comma
    c = c.replace('}\n            resumoVisual', '},\n            resumoVisual')
    c = c.replace('}\n            index', '},\n            index')
    c = c.replace('}\n            video', '},\n            video')
    c = c.replace('}\n            variant', '},\n            variant')

    # 4. Clean extra nested braces if exists
    for _ in range(5):
         c = c.replace('{ "{ "', '{ "')
         c = c.replace('" }" }', '" }')

    safe_write(p, c, dry_run=DRY_RUN)

# Rodar em TODAS as pastas de aulas
folders = [
    'src/components/aulas/matematica/',
    'src/components/aulas/ingles/',
    'src/components/aulas/conhecimentos-bancarios/',
    'src/components/aulas/administracao/',
    'src/components/aulas/seguranca-trabalho/',
    'src/components/aulas/enfermagem/',
]

for folder in folders:
    if os.path.exists(folder):
        for f in os.listdir(folder):
            if f.endswith('.tsx'):
                sanitize_file(os.path.join(folder, f))
