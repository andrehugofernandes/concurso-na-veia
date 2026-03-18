import os

path = r"c:\Workspace\petrobras-quest\src\components\aulas\administracao\AulaPlanejamentoEstrategico.tsx"
with open(path, "r", encoding="utf-8") as f:
    lines = f.read().splitlines()

# Encontrar o índice da linha '{/* Nota Final do Instrutor */}'
target_index = -1
for i, line in enumerate(lines):
    if '{/* Nota Final do Instrutor */}' in line:
        target_index = i
        break

if target_index != -1:
    to_insert = [
        '                   </div>',
        '                </div>',
        '              </div>',
        '            </div>',
        '          </section>',
        '        </div>',
        '      </TabsContent>'
    ]
    lines = lines[:target_index] + to_insert + [''] + lines[target_index:]
    with open(path, "w", encoding="utf-8") as f:
        f.write('\n'.join(lines))
    print("Sucesso: Tags inseridas.")
else:
    print("Erro: Não encontrei a linha alvo.")
