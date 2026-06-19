import os
import shutil

brain = r"C:\Users\andre.hugo\.gemini\antigravity-ide\brain\bcf85c3e-9efa-4669-ab44-e739098555a5"
dest = r"c:\Workspace\petrobras-quest\public\assets\images\matematica\conjuntos"

mappings = {
    # Módulo 2
    "m2_conjuntos_conceito_1779802208841.png": "modulo-2/m2-conceito.png",
    "m2_conjuntos_formula_1779802220341.png": "modulo-2/m2-formula.png",
    "m2_conjuntos_dicas_1779802233249.png": "modulo-2/m2-dicas.png",
    # Módulo 3
    "m3_conjuntos_conceito_1779802263154.png": "modulo-3/m3-conceito.png",
    "m3_conjuntos_formula_1779802275168.png": "modulo-3/m3-formula.png",
    "m3_conjuntos_dicas_1779802287291.png": "modulo-3/m3-dicas.png",
    # Módulo 4
    "m4_conjuntos_conceito_1779802318971.png": "modulo-4/m4-conceito.png",
    "m4_conjuntos_formula_1779802330157.png": "modulo-4/m4-formula.png",
    "m4_conjuntos_dicas_1779802341712.png": "modulo-4/m4-dicas.png",
    # Módulo 5
    "m5_conjuntos_conceito_1779802377859.png": "modulo-5/m5-conceito.png",
    "m5_conjuntos_formula_1779802389287.png": "modulo-5/m5-formula.png",
    "m5_conjuntos_dicas_1779802399934.png": "modulo-5/m5-dicas.png",
    # Módulo 6
    "m6_conjuntos_conceito_1779802669186.png": "modulo-6/m6-conceito.png",
    "m6_conjuntos_formula_1779802682096.png": "modulo-6/m6-formula.png",
    "m6_conjuntos_dicas_1779802712654.png": "modulo-6/m6-dicas.png",
}

for src_name, dest_rel in mappings.items():
    src_path = os.path.join(brain, src_name)
    dest_path = os.path.join(dest, dest_rel)
    
    # Criar pasta destino
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copiado: {src_name} -> {dest_rel}")
    else:
        print(f"Aviso: Origem nao encontrada: {src_path}")

print("Concluido!")
