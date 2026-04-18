import json

file_path = "src/components/aulas/portugues/AulaInterpretacaoTexto.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

rich_intros = {
    "3": """{/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="As Engrenagens do Argumento" description="Como autores costuram palavras para induzir lógicas e provar teorias." variant={mv[3]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            Um texto argumentativo assemelha-se a uma rede de alta precisão lógica. Cada afirmação precisa de cabos de sustentação para não ruir, e esses cabos assumem a forma de <strong>coesão argumentativa</strong> (ou coesão sequencial), gerada de modo estruturado através de conjunções, advérbios e expressões conectivas que evidenciam qual a progressão das ideias.
          </p>
          <p>
            A compreensão de nível sênior ignora a superficialidade e vai direto à espinha dorsal do autor. O que ele está fazendo? Ele está apresentando uma consequência inevitável ("Portanto"), demonstrando uma oposição técnica ("Contudo"), introduzindo uma concessão tolerável ("Embora") ou apenas sinalizando um acréscimo ("Além disso")? Cada conectivo opera como uma "placa de trânsito" para o fluxo do raciocínio.
          </p>
          <p>
            O erro capital é ler buscando reter "somente o assunto principal". Na CESGRANRIO, o modo como as informações se entrelaçam cria a interpretação final. Uma questão clássica pedirá a reescritura de um trecho alterando as conjunções sem prejudicar a lógica global. Memorizar todos os tipos de conectivos das gramáticas tradicionais é fundamental.
          </p>
          <p>
            Pense em um manual que diga: "<strong>Dado que</strong> a corrosão aumenta, <strong>torna-se vital</strong> substituir as ligas, <strong>ainda que</strong> a operação demande atrasos". "Dado que" marca a causa. "Ainda que" prevê e quebra uma oposição pré-fabricada pelo autor (o incômodo do atraso), garantindo vitória para a ideia de substituição.
          </p>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
            <h4 className="font-bold text-foreground flex items-center gap-2">A Tríade de Conectivos Perigosos CESGRANRIO</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-3">
              <div className="bg-white dark:bg-black/20 p-3 rounded-lg shadow-sm border border-border">
                <strong className="block text-indigo-600 dark:text-indigo-400">Embora / Conquanto</strong>
                <span className="text-muted-foreground">(Concessão) Permite a realidade de um obstáculo sem que este impeça o fato principal.</span>
              </div>
              <div className="bg-white dark:bg-black/20 p-3 rounded-lg shadow-sm border border-border">
                <strong className="block text-rose-600 dark:text-rose-400">Portanto / Por conseguinte</strong>
                <span className="text-muted-foreground">(Conclusão) Cimenta o peso prático do argumento preexistente.</span>
              </div>
              <div className="bg-white dark:bg-black/20 p-3 rounded-lg shadow-sm border border-border">
                <strong className="block text-emerald-600 dark:text-emerald-400">Pois / Visto que</strong>
                <span className="text-muted-foreground">(Causa/Explicação) Justificam, na base técnica e lógica, a adoção de um evento antecedente.</span>
              </div>
            </div>
          </div>
        </div>
      </section>""",
    "9": """{/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="Algoritmo da Aprovação: Checklist Operacional" description="Passe do olhar selvagem para uma arquitetura robótica inabalável de validação analítica." variant={mv[9]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            O segredo das performances extremas na leitura da CESGRANRIO se deve à automação de metodologias procedimentais, descartando fluxos de genialidade natural, adotando engrenagens matemáticas rígidas para lidar com "achismos". É fundamental possuir o próprio Framework/Protocolo validatório da alternativa correta para evitar perdas cognitivas e hesitações durante provas imersas em grandes perdas de carga de bateria metabólica de exauridos examinandos.
          </p>
          <p>
            O Procedimento se instaura logo na Leitura Diagnóstica. Não leia como ler um romance (passivo interativo agradável); realize escaneamento agressivo e utilitário, com lápis grafite a punho atacando conjunções vitais e Tópicos Frasais, traçando boxes marcadores naqueles núcleos duros que revelam, sem ressalvas, se o Autor inclina sua defesa à pauta X ou apoia a refutação por argumentação baseada em Y. O resumo parágrafo a parágrafo de três vocábulos sela tudo isso metodologicamente!
          </p>
          <p>
            Avance posteriormente na dissecação modular do Problema de Prova. Quando questionado sobre interpretações inferidoras, evite reprocessar fragmentos amplos em tela cheia na sua mente. Delimite as demarcações exatas de escopo! Refutem premissas isoladamente em cada "letra": verifique a baliza e o eixo ("Se citou evento A do texto sendo justificado pelo viés de C da Letra K" - a menção central ocorreu? Sim. O referencial temporal se confirma? Sim. A motivação declarada é espelho do texto originário? Não). Conclusão: "X" nessa assertiva sem sofrimento!
          </p>
          <p>
            Pela mecânica das grandes estatais como Petrobras e Transpetro, a disciplina técnica rege a perfeição. Ao duvidar furiosamente entre duas alternativas paradoxais, execute sempre à Lei do Tribunal Textual Evidenciatório (O lastro). O examinador o ataca com interpretações dúbias altamente possíveis... não discuta; apenas demande imediatamente a palavra "escrita" textualmente (Pista Material Base) capaz de abalizar perante um júri racional qual opção reside verdadeiramente sob um ancoradouro dissecável.
          </p>
          <div className="bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-800/80 dark:to-gray-900/80 rounded-lg border border-slate-300 dark:border-slate-700 p-6 space-y-4">
            <h4 className="font-bold text-foreground flex items-center gap-2">Checklist das Boas Práticas Absolutas de Concurso</h4>
            <ul className="list-disc list-inside space-y-2 mt-2 font-medium">
              <li>Inspecione enunciados identificando a demanda restritiva geográfica ou tipológica ANTES.</li>
              <li>A detecção das sinalizações coesivas (conectivos causais e de transição e oposição).</li>
              <li>Vigilância máxima e total às ameaças universalistas do léxico e alternativas reducionistas.</li>
              <li>Sustentação na matriz explícita de "Tribunal Textual Base" diante do perigo inferidor difuso.</li>
            </ul>
          </div>
        </div>
      </section>""",
}

old_intro_bounds = { 
    "3": ("<section className=\"bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10\">\n          <ModuleSectionHeader\n            index={1}", "<ContentAccordion"),
    "9": ("<section className=\"bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10\">\n          <ModuleSectionHeader\n            index={1}", "<div className=\"grid grid-cols-1 md:grid-cols-2")
}

new_content = content
for i in [3, 9]:
    mod = str(i)
    # Find the start of the module
    mod_marker = f'<TabsContent value="modulo-{mod}"'
    mod_start_idx = new_content.find(mod_marker)
    if mod_start_idx == -1:
        print(f"Mod {mod} start tracking failed")
        continue
    
    start_mark, end_mark = old_intro_bounds[mod]
    
    idx1 = new_content.find(start_mark, mod_start_idx)
    idx2 = new_content.find(end_mark, idx1)
    
    if idx1 != -1 and idx2 != -1:
        sliced_out = new_content[idx1:idx2]
        restored_section = '<section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">\n          '
        replacement_text = rich_intros[mod] + "\n\n        " + restored_section
        
        new_content = new_content[:idx1] + replacement_text + new_content[idx2:]
        print(f"Mod {mod} OK replacing {len(sliced_out)} chars")
    else:
        print(f"Mod {mod} NOT FOUND")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Replacement Complete")
