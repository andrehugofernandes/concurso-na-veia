filepath = "src/components/aulas/administracao/AulaAdministrativoTributario.tsx"
content = open(filepath, "r", encoding="utf-8").read()

m9_pos = content.find('value="modulo-9"')
if m9_pos == -1:
    m9_pos = content.find("value='modulo-9'")

if m9_pos != -1:
    intro_pos = content.find('index="INTRO"', m9_pos)
    if intro_pos != -1:
        div_start = content.find("<div", intro_pos)
        # Vamos achar a section de fechamento
        div_end = content.find("</section>", div_start)
        print("--- DIV BLOCK MÓDULO 9 ---")
        print(content[div_start:div_end])
    else:
        print("index='INTRO' não encontrado no módulo 9!")
else:
    print("Módulo 9 não encontrado!")
