import os
import re

files = [
    "AulaGestaoQualidadeSuprimento.tsx",
    "AulaLogisticaSuprimento.tsx",
    "AulaComprasSuprimento.tsx",
    "AulaLei13303.tsx",
    "AulaRLCP.tsx",
    "AulaAdministrativoTributario.tsx",
    "AulaContabilidadeBasica.tsx",
    "AulaDireitoTributario.tsx",
    "AulaAdministracaoTributaria.tsx"
]

dir_path = "src/components/aulas/administracao"

def refactor_file(f_name):
    f_path = os.path.join(dir_path, f_name)
    if not os.path.exists(f_path):
        print(f"[ERRO] Arquivo não encontrado: {f_path}")
        return
        
    print(f"Refatorando estruturalmente: {f_name}...")
    with open(f_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Substituir maceteVisual por sinteseEstrategica
    content = content.replace("maceteVisual={", "sinteseEstrategica={")
    content = content.replace("maceteVisual", "sinteseEstrategica")

    # 2. Configurar ContentAccordion para stacked e remover text-sm/text-xs
    # Substituir <ContentAccordion slides={...} /> ou <ContentAccordion slides={...} mode="..." />
    # por <ContentAccordion mode="stacked" slides={...} />
    def accordion_repl(match):
        full_tag = match.group(0)
        if "mode=" in full_tag:
            # Substituir o mode existente por mode="stacked"
            full_tag = re.sub(r'mode=["\'][a-zA-Z0-9_-]+["\']', 'mode="stacked"', full_tag)
        else:
            # Inserir mode="stacked"
            full_tag = full_tag.replace("<ContentAccordion", '<ContentAccordion mode="stacked"')
        return full_tag
        
    content = re.sub(r'<ContentAccordion[^>]*>', accordion_repl, content)

    # 3. Remover classes de fontes pequenas (text-sm, text-xs, text-xxs) e substituir por text-lg no corpo dos acordeons e intros
    # Também substituir classes text-base nas intros por text-lg
    content = re.sub(r'className="space-y-6 text-base', 'className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed', content)
    content = re.sub(r'className="space-y-6 text-sm', 'className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed', content)
    content = re.sub(r'className="space-y-4 text-base', 'className="space-y-4 text-lg text-justify text-foreground/85 leading-relaxed', content)
    content = re.sub(r'className="space-y-4 text-sm', 'className="space-y-4 text-lg text-justify text-foreground/85 leading-relaxed', content)
    content = re.sub(r'text-sm text-slate-700', 'text-lg text-slate-700', content)
    content = re.sub(r'text-sm text-muted-foreground', 'text-lg text-muted-foreground', content)
    
    # Substituir text-sm geral em parágrafos de conteúdo teóricos por text-lg
    content = re.sub(r'className="text-sm\b', 'className="text-lg\b', content)
    content = re.sub(r'className="text-xs\b', 'className="text-lg\b', content)
    
    # Substituir h5/h6 de destaque nos acordeons por text-xl
    content = re.sub(r'<h5([^>]*)>', r'<h5\1 className="text-xl font-bold">', content)
    content = re.sub(r'<h6([^>]*)>', r'<h6\1 className="text-xl font-bold">', content)
    
    # 4. Substituir cores restritas (violet, purple, fuchsia, indigo) por permitidas (blue, cyan, teal, emerald, rose)
    # violet e purple -> blue
    # indigo -> cyan (ou blue)
    # fuchsia -> rose
    color_replacements = {
        r'\bviolet-50\b': 'blue-50',
        r'\bviolet-100\b': 'blue-100',
        r'\bviolet-200\b': 'blue-200',
        r'\bviolet-300\b': 'blue-300',
        r'\bviolet-400\b': 'blue-400',
        r'\bviolet-500\b': 'blue-500',
        r'\bviolet-600\b': 'blue-600',
        r'\bviolet-700\b': 'blue-700',
        r'\bviolet-800\b': 'blue-800',
        r'\bviolet-900\b': 'blue-900',
        r'\bviolet-950\b': 'blue-950',
        
        r'\bpurple-50\b': 'blue-50',
        r'\bpurple-100\b': 'blue-100',
        r'\bpurple-200\b': 'blue-200',
        r'\bpurple-300\b': 'blue-300',
        r'\bpurple-400\b': 'blue-400',
        r'\bpurple-500\b': 'blue-500',
        r'\bpurple-600\b': 'blue-600',
        r'\bpurple-700\b': 'blue-700',
        r'\bpurple-800\b': 'blue-800',
        r'\bpurple-900\b': 'blue-900',
        r'\bpurple-950\b': 'blue-950',

        r'\bindigo-50\b': 'cyan-50',
        r'\bindigo-100\b': 'cyan-100',
        r'\bindigo-200\b': 'cyan-200',
        r'\bindigo-300\b': 'cyan-300',
        r'\bindigo-400\b': 'cyan-400',
        r'\bindigo-500\b': 'cyan-500',
        r'\bindigo-600\b': 'cyan-600',
        r'\bindigo-700\b': 'cyan-700',
        r'\bindigo-800\b': 'cyan-800',
        r'\bindigo-900\b': 'cyan-900',
        r'\bindigo-950\b': 'cyan-950',

        r'\bfuchsia-50\b': 'rose-50',
        r'\bfuchsia-100\b': 'rose-100',
        r'\bfuchsia-200\b': 'rose-200',
        r'\bfuchsia-300\b': 'rose-300',
        r'\bfuchsia-400\b': 'rose-400',
        r'\bfuchsia-500\b': 'rose-500',
        r'\bfuchsia-600\b': 'rose-600',
        r'\bfuchsia-700\b': 'rose-700',
        r'\bfuchsia-800\b': 'rose-800',
        r'\bfuchsia-900\b': 'rose-900',
        r'\bfuchsia-950\b': 'rose-950',
    }

    for pattern, repl in color_replacements.items():
        content = re.sub(pattern, repl, content)
        
    # Substituir os literais de string variantes de cor nas props JS
    # ex: variant="violet" -> variant="blue"
    # ex: variant="purple" -> variant="blue"
    # ex: variant="indigo" -> variant="cyan"
    content = re.sub(r'variant=["\']violet["\']', 'variant="blue"', content)
    content = re.sub(r'variant=["\']purple["\']', 'variant="blue"', content)
    content = re.sub(r'variant=["\']indigo["\']', 'variant="cyan"', content)
    content = re.sub(r'variant=["\']fuchsia["\']', 'variant="rose"', content)
    
    # Substituir nas declarações de arrays de variantes se existirem
    # ex: ["indigo", "emerald", "amber", "rose", "violet"] -> ["cyan", "emerald", "amber", "rose", "blue"]
    content = content.replace('"violet"', '"blue"')
    content = content.replace('"purple"', '"blue"')
    content = content.replace('"indigo"', '"cyan"')
    content = content.replace('"fuchsia"', '"rose"')
    content = content.replace("'violet'", "'blue'")
    content = content.replace("'purple'", "'blue'")
    content = content.replace("'indigo'", "'cyan'")
    content = content.replace("'fuchsia'", "'rose'")

    # 5. Adicionar a animação e tamanho correto aos emojis da Síntese Estratégica
    # Se houver emojis sem wrapper, podemos deixar mais rico.
    # Vamos salvar o arquivo refatorado
    with open(f_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"[OK] {f_name} refatorado estruturalmente.")

for f_name in files:
    refactor_file(f_name)
