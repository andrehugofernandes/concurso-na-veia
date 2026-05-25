import re
import urllib.parse
import glob

directory = 'src/components/aulas/ti/'
files = glob.glob(directory + 'Aula*.tsx')

def repl(match):
    title = match.group(1)
    encoded_title = urllib.parse.quote(title)
    return match.group(0).replace('"/temp-img.png"', f'"https://placehold.co/600x400/1e293b/38bdf8?text={encoded_title}"')

pattern = re.compile(r'title:\s*"([^"]+)",\s*type:\s*"[^"]+",\s*placeholderColor:\s*"[^"]+",\s*imageUrl:\s*"/temp-img.png"')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = pattern.sub(repl, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Replaced placeholders in {filepath}')
