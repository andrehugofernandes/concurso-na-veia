import os

path = r'c:\Workspace\petrobras-quest\src\components\aulas\administracao\AulaRLCP.tsx'

with open(path, 'r', encoding='utf-8') as f:
    orig = f.read()

# Transicao problematica detectada via view_file
# Vou usar um fragmento menor para garantir o matching
to_find = '                </div>\n\n  const renderModulo5 = () => {'

patch = r'''                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "Documentos da Licitação",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            titulo="QUIZ: Termo de Referência e Edital"
            questoes={toQQ(quizM4)}
            onComplete={(score) => handleModuleComplete('modulo-4', score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo5 = () => {'''

if to_find in orig:
    new_content = orig.replace(to_find, patch)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('PATCH_SUCCESS')
else:
    # Tenta com versao CRLF se falhar
    to_find_v2 = '                </div>\r\n\r\n  const renderModulo5 = () => {'
    if to_find_v2 in orig:
        new_content = orig.replace(to_find_v2, patch)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print('PATCH_SUCCESS_V2')
    else:
        print('PATCH_FAILED: Pattern not found.')
