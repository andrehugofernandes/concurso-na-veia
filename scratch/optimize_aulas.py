import os
import re
import shutil

# Diretório das aulas de administração
AULAS_DIR = r"c:\Workspace\petrobras-quest\src\components\aulas\administracao"
BACKUP_DIR = r"c:\Workspace\petrobras-quest\scratch\backup_aulas"

# Lote 1 de aulas a otimizar
LOTE_1 = [
    "AulaGestãoDePessoas.tsx",
    "AulaPlanejamentoEstrategico.tsx",
    "AulaLei13303.tsx",
    "AulaGestaoProcessos.tsx"
]

# Certifica-se de que a pasta de backup existe
os.makedirs(BACKUP_DIR, exist_ok=True)

def fazer_backup(filename):
    src_path = os.path.join(AULAS_DIR, filename)
    dst_path = os.path.join(BACKUP_DIR, filename)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"Backup criado para {filename}")
    else:
        print(f"Erro: Arquivo original {filename} não encontrado!")

def higienizar_cores(content):
    # Substituições simples de cores
    # de -> para
    color_replacements = {
        r'\bindigo\b': 'cyan',
        r'\bpurple\b': 'amber',
        r'\bviolet\b': 'emerald',
        r'\bfuchsia\b': 'rose'
    }
    
    # Aplica substituições respeitando bordas de palavras e mantendo o case
    for pattern, replacement in color_replacements.items():
        content = re.sub(pattern, replacement, content)
        # Substitui também com primeira letra maiúscula se houver (ex: Indigo -> Cyan)
        capital_pattern = pattern.replace(r'\b', r'\b').title()
        content = re.sub(capital_pattern, replacement.title(), content)
        
    return content

def envelopar_tabs(content):
    # Primeiro vamos remover qualquer envelopamento existente de activeTab para evitar duplicações
    # Padrão a ser removido: {activeTab === "modulo-X" && ( <TabsContent ...> ... </TabsContent> )}
    # Vamos usar um regex balanceado para encontrar isso.
    # Como os TabsContent não são aninhados, podemos usar a regex abaixo:
    unwrap_pattern = r'\{\s*activeTab\s*===\s*"modulo-(\d+)"\s*&&\s*\(\s*(<TabsContent value="modulo-\1"[^>]*>.*?<\/TabsContent>)\s*\)\s*\}'
    content = re.sub(unwrap_pattern, r'\2', content, flags=re.DOTALL)
    
    # Agora envelopamos de forma limpa e padronizada cada <TabsContent value="modulo-X">...</TabsContent>
    wrap_pattern = r'(<TabsContent value="modulo-(\d+)"([^>]*)>(.*?)<\/TabsContent>)'
    
    def replace_match(match):
        full_tag = match.group(1)
        mod_num = match.group(2)
        attributes = match.group(3)
        inner_content = match.group(4)
        
        # Envelopa com indentação limpa
        wrapped = f'{{activeTab === "modulo-{mod_num}" && (\n      <TabsContent value="modulo-{mod_num}"{attributes}>{inner_content}</TabsContent>\n      )}}'
        return wrapped

    content = re.sub(wrap_pattern, replace_match, content, flags=re.DOTALL)
    return content

def corrigir_gestao_pessoas(content):
    # 1. Expandir MODULE_DEFS para incluir módulo 11
    # Verifica se já possui modulo-11 no MODULE_DEFS
    if '"modulo-11"' not in content and 'modulo-11' not in content.split('export default')[0]:
        module_defs_old = """  { id: "modulo-10", label: "Módulo 10", title: "Simulado Geral" },
] as const;"""
        
        module_defs_new = """  { id: "modulo-10", label: "Módulo 10", title: "Simulado Geral" },
  { id: "modulo-11", label: "Módulo 11", title: "RH na Realidade Petrobras" },
] as const;"""
        
        content = content.replace(module_defs_old, module_defs_new)
        print("Módulo 11 injetado em MODULE_DEFS de Gestão de Pessoas.")

    # 2. Expandir o loop do mv para 11
    content = content.replace("Array.from({ length: 10 }", "Array.from({ length: 11 }")
    print("Loop mv expandido para 11 em Gestão de Pessoas.")
    
    return content

def otimizar_arquivo(filename):
    fazer_backup(filename)
    
    file_path = os.path.join(AULAS_DIR, filename)
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    print(f"Otimizando {filename} ({len(content)} caracteres)...")
    
    # 1. Higienizar cores
    content = higienizar_cores(content)
    
    # 2. Envelopar abas na condicional de renderização
    content = envelopar_tabs(content)
    
    # 3. Correções específicas para Gestão de Pessoas
    if filename == "AulaGestãoDePessoas.tsx":
        content = corrigir_gestao_pessoas(content)
        
    # Salva o arquivo de volta
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Finalizado: {filename} otimizado e salvo com sucesso!\n")

if __name__ == "__main__":
    print("Iniciando Otimização e Padronização Massiva - Lote 1\n")
    for filename in LOTE_1:
        if os.path.exists(os.path.join(AULAS_DIR, filename)):
            otimizar_arquivo(filename)
        else:
            print(f"Aviso: {filename} não encontrado no diretório!\n")
