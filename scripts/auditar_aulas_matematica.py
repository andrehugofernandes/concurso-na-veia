import os
import re
import sys

def audit_math_file(filepath):
    print(f"\n============================================================")
    print(f"AUDITANDO AULA: {os.path.basename(filepath)}")
    print(f"============================================================")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    errors = []
    warnings = []
    
    # 1. Verificar número de módulos
    tabs = re.findall(r'<TabsContent value="modulo-(\d+)"', content)
    print(f"-> Módulos detectados: {len(tabs)} ({', '.join(tabs)})")
    if len(tabs) < 10:
        errors.append(f"Número de módulos inferior a 10 (encontrados: {len(tabs)})")
        
    # 2. Verificar seções INTRO
    intros = re.findall(r'index="INTRO"', content)
    print(f"-> Cabeçalhos de introdução (index=\"INTRO\"): {len(intros)}")
    if len(intros) < len(tabs):
        warnings.append(f"Alguns módulos podem não ter index=\"INTRO\" estruturado (esperado {len(tabs)}, encontrados {len(intros)})")

    # 3. Verificar parágrafos por módulo (C.E.D.E.A)
    # Procurar cada bloco de TabsContent e contar as tags <p> na primeira seção
    modules = re.findall(r'<TabsContent value="modulo-(\d+)">(.*?)</TabsContent>', content, re.DOTALL)
    for num, mod_content in modules:
        # pegar o conteúdo até a primeira tag <section> ou </section> da intro
        intro_section_match = re.search(r'<section.*?>.*?(index="INTRO"|title="A Linguagem Universal").*?</section>', mod_content, re.DOTALL)
        if intro_section_match:
            intro_sec = intro_section_match.group(0)
            p_tags = len(re.findall(r'<p[ >]', intro_sec))
            if p_tags < 10:
                warnings.append(f"Módulo {num} - INTRO tem apenas {p_tags} parágrafos (esperado mínimo de 10)")
        else:
            # Fallback buscando tags p globais no início do módulo
            p_tags = len(re.findall(r'<p[ >]', mod_content[:15000]))
            if p_tags < 10:
                warnings.append(f"Módulo {num} - Faltam parágrafos densos na introdução (encontrados ~{p_tags} nas tags <p> do bloco inicial)")

    # 4. Verificar uso de bg-primary/10 (proibido)
    bg_primary_matches = len(re.findall(r'bg-primary/10', content))
    print(f"-> bg-primary/10 proibido em FlipCards: {bg_primary_matches} ocorrências")
    if bg_primary_matches > 0:
        errors.append(f"Encontrados {bg_primary_matches} ocorrências do anti-pattern 'bg-primary/10'")

    # 5. Verificar LessonTabs duplicado
    lesson_tabs_matches = len(re.findall(r'<LessonTabs', content))
    print(f"-> LessonTabs (redundância de Resumo Visual): {lesson_tabs_matches} ocorrências")
    if lesson_tabs_matches > 0:
        warnings.append(f"Encontrados {lesson_tabs_matches} LessonTabs redundantes (resumos duplicados). Devem ser unificados no ModuleConsolidation.")

    # 6. Verificar padronização de variantes de cores (usando array mv em vez de strings estáticas)
    static_variants = re.findall(r'variant=["\'](emerald|blue|amber|cyan|rose|indigo|teal|slate)["\']', content)
    # Filtrar QuizInterativo da lista se for o único, mas checar se há componentes usando estático
    if len(static_variants) > 3:
        warnings.append(f"Encontrados {len(static_variants)} usos de variantes de cor estáticas ({set(static_variants)}). Padronize para variant={{mv[N]}} para manter consistência cromática por módulo.")

    # Exibir resumo
    if not errors and not warnings:
        print("✅ AULA 100% EM CONFORMIDADE COM OS PADRÕES PREMIUM!")
    else:
        if errors:
            print("\n❌ ERROS CRÍTICOS:")
            for e in errors:
                print(f"  - {e}")
        if warnings:
            print("\n⚠️ AVISOS / MELHORIAS:")
            for w in warnings:
                print(f"  - {w}")

def main():
    math_dir = "c:/Workspace/petrobras-quest/src/components/aulas/matematica"
    files = [os.path.join(math_dir, f) for f in os.listdir(math_dir) if f.endswith(".tsx")]
    
    for filepath in files:
        audit_math_file(filepath)

if __name__ == "__main__":
    main()
