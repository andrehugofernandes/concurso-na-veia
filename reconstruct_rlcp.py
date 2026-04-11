import os

# Caminho absoluto
path = r'c:\Workspace\petrobras-quest\src\components\aulas\administracao\AulaRLCP.tsx'

with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# ATE O FINAL DO MODULO 4 (antes da linha 720)
content_part1 = "".join(lines[:719])

# Conteúdo unificado dos módulos 5 ao 10 e rodapé final
rest_of_file = r'''
  const renderModulo5 = () => {
    const variant = mv[4];
    return (
      <TabsContent value="modulo-5" className="space-y-12">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Julgamento de Propostas"
            description="Como a Petrobras decide quem vence: do menor preço à melhor técnica."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              O <strong>julgamento</strong> é a fase onde a Petrobras analisa as propostas comerciais e técnicas. O critério principal, no RLCP, é a busca pela <strong>proposta mais vantajosa</strong>, que nem sempre é apenas o menor valor nominal, mas o melhor custo-benefício (ciclo de vida do produto).
            </p>
            <p>
              Os critérios comuns são: <strong>Menor Preço</strong> (padronizados), <strong>Melhor Técnica</strong> (complexos), ou <strong>Técnica e Preço</strong> (equilíbrio). Após o julgamento, ocorre a verificação de <strong>exequibilidade</strong>: se o preço for absurdamente baixo, o licitante deve provar que consegue entregar, para evitar abandono de contrato.
            </p>

            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-blue-600 dark:text-blue-400 text-lg mb-2">⚖️ Critérios de Julgamento</p>
              <ul className="text-lg space-y-1">
                <li>✓ <strong>Menor Preço:</strong> Quando o objeto é comum e bem definido</li>
                <li>✓ <strong>Maior Desconto:</strong> Variável do menor preço (comum em serviços)</li>
                <li>✓ <strong>Melhor Técnica:</strong> Foco total na qualidade (projetos inovadores)</li>
                <li>✓ <strong>Técnica e Preço:</strong> Ponderação entre custo e expertise</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index="5.1"
            variant={variant}
            title="Conformidade e Exequibilidade"
            description="Garantindo que a proposta seja realista e atenda ao edital."
          />
          <ContentAccordion
            mode="stacked"
            slides={[
              {
                title: "Conformidade Técnica",
                conteudo: "Verificação se a proposta atende a todos os requisitos do Termo de Referência. Propostas fora da especificação são eliminadas.",
                icone: "🔍",
              },
              {
                title: "Preço Inequível",
                conteudo: "Preços manifestamente baixos que colocam em risco a execução. O licitante é chamado a justificar seus custos.",
                icone: "📉",
              },
            ]}
          />

          <ModuleConsolidation
            index={5}
            variant={variant}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Fase de Julgamento",
              duration: "08:45",
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Julgamento",
              materia: "RLCP",
              images: [
                {
                  title: "Análise de Preços",
                  type: "Planilha",
                  placeholderColor: "bg-blue-500/10",
                },
              ],
            }}
            maceteVisual={{
              title: "A Regra de Ouro",
              content: (
                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                  <p className="text-lg font-medium">
                    Vantajosidade = Menor Custo Total (Aquisição + Operação + Manutenção).
                  </p>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              titulo: "Critérios de Escolha",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            titulo="QUIZ: Julgamento de Propostas"
            questoes={toQQ(quizM5)}
            onComplete={(score) => handleModuleComplete('modulo-5', score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo6 = () => {
    const variant = mv[5];
    return (
      <TabsContent value="modulo-6" className="space-y-12">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Recursos e Impugnações"
            description="Como contestar o edital ou o resultado da licitação."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              O direito de <strong>impugnar</strong> e <strong>recorrer</strong> garante a transparência. A impugnação ocorre ANTES da abertura, contra o edital. O recurso ocorre DEPOIS, contra o resultado.
            </p>
            <p>
              Há direitos claros: ser ouvido, acessar documentos e obter resposta motivada. A Petrobras deve responder em prazos rígidos, garantindo que o processo não seja maculado por erros administrativos.
            </p>

            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-cyan-600 dark:text-cyan-400 text-lg mb-2">⚖️ Impugnação vs Recurso</p>
              <ul className="text-lg space-y-1">
                <li>✓ <strong>Impugnação:</strong> Contra as REGRAS do edital (Prazo: até 2 dias úteis antes)</li>
                <li>✓ <strong>Recurso:</strong> Contra o RESULTADO (Prazo: 5 dias úteis após publicação)</li>
                <li>✓ <strong>Formal:</strong> Por escrito, fundamentado em lei ou no RLCP</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index="6.1"
            variant={variant}
            title="Direito de Defesa"
            description="Mecanismos para garantir a legalidade."
          />
          <ContentAccordion
            mode="stacked"
            slides={[
              {
                title: "Prazos",
                conteudo: "Essenciais para não perder o direito. Impugnação é prévia, recurso é a posteriori.",
                icone: "⏱️",
              },
              {
                title: "Motivação",
                conteudo: "Toda decisão da Petrobras em recursos deve ser motivada e pública.",
                icone: "✍️",
              },
            ]}
          />

          <ModuleConsolidation
            index={6}
            variant={variant}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Recursos e Impugnações",
              duration: "09:12",
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Controle",
              materia: "RLCP",
              images: [
                {
                  title: "Recursos em Análise",
                  type: "Documento",
                  placeholderColor: "bg-cyan-500/10",
                },
              ],
            }}
            maceteVisual={{
              title: "Antes vs Depois",
              content: (
                 <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                   <p className="text-lg">Impugna o Edital (Regras). Recorre do Resultado (Ações).</p>
                 </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              titulo: "Direito de Defesa",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            titulo="QUIZ: Recursos e Impugnações"
            questoes={toQQ(quizM6)}
            onComplete={(score) => handleModuleComplete('modulo-6', score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo7 = () => {
    const variant = mv[6];
    return (
      <TabsContent value="modulo-7" className="space-y-12">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Contratos e Execução"
            description="Da assinatura ao encerramento: obrigações e fiscalização."
          />
          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              O <strong>contrato</strong> é o selo final da licitação. Ele define os prazos, formas de pagamento, garantias e punições. A Petrobras exige fiscalização rigorosa em cada entrega.
            </p>
            <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-indigo-600 dark:text-indigo-400 text-lg mb-2">📝 Pilares da Execução</p>
              <ul className="text-lg space-y-1">
                <li>✓ <strong>Fiscalização:</strong> Obrigatória por lei para garantir qualidade</li>
                <li>✓ <strong>Sanções:</strong> Multas e suspensões por descumprimento</li>
                <li>✓ <strong>Prazos:</strong> Cronogramas rígidos de entrega e pagamento</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index="7.1"
            variant={variant}
            title="Gestão de Contratos"
            description="Como a Petrobras garante o que foi comprado."
          />
          <ContentAccordion
            mode="stacked"
            slides={[
              {
                title: "Fiscal do Contrato",
                conteudo: "Designado formalmente pela Petrobras para validar entregas e conformidade técnica.",
                icone: "👷",
              },
              {
                title: "Sanções Contratuais",
                conteudo: "Advertência, multa (até 20%), suspensão temporária e impedimento de licitar.",
                icone: "⚠️",
              },
            ]}
          />

          <ModuleConsolidation
            index={7}
            variant={variant}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Gestão Contratual",
              duration: "11:45",
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Vida do Contrato",
              materia: "RLCP",
              images: [
                {
                  title: "Fiscalização Ativa",
                  type: "Campo",
                  placeholderColor: "bg-indigo-500/10",
                },
              ],
            }}
            maceteVisual={{
              title: "Regra do Fiscal",
              content: (
                 <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
                   <p className="text-lg">Não aceita? Não paga. O fiscal é o guardião do TR.</p>
                 </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "Fiscalização e Sanção",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            titulo="QUIZ: Contratos e Execução"
            questoes={toQQ(quizM7)}
            onComplete={(score) => handleModuleComplete('modulo-7', score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo8 = () => {
    const variant = mv[7];
    return (
      <TabsContent value="modulo-8" className="space-y-12">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Inabilitação e Desclassificação"
            description="Diferenças entre problemas no licitante e problemas na proposta."
          />
          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              <strong>Inabilitação:</strong> Problema no Licitante (CPF/CNPJ, certidões negativas, capacidade técnica/financeira). É a exclusão do sujeito.
            </p>
            <p>
              <strong>Desclassificação:</strong> Problema na Proposta (Preço excessivo, especificações erradas no TR). É a exclusão do objeto ofertado.
            </p>
            <div className="bg-red-500/10 border-l-4 border-red-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-red-600 dark:text-red-400 text-lg mb-2">🚫 Causas Comuns</p>
              <ul className="text-lg space-y-1">
                <li>✓ <strong>Falha Técnica:</strong> Não atender ao TR (Elimina a Proposta)</li>
                <li>✓ <strong>Falha Fiscal:</strong> Certidão vencida (Inabilita o Licitante)</li>
                <li>✓ <strong>Ilegalidade:</strong> Fraude ou conluio detectado</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index="8.1"
            variant={variant}
            title="Critérios de Exclusão"
            description="Padrões objetivos de rejeição."
          />
          <ContentAccordion
            mode="stacked"
            slides={[
              {
                title: "Desempate",
                conteudo: "Quando preços são iguais, usa-se critérios de técnica, experiência ou, por fim, sorteio.",
                icone: "⚖️",
              },
              {
                title: "Saneamento",
                conteudo: "A Petrobras pode permitir a correção de erros meramente formais que não alteram a substância da proposta.",
                icone: "🩹",
              },
            ]}
          />

          <ModuleConsolidation
            index={8}
            variant={variant}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Exclusões no RLCP",
              duration: "07:15",
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "Inabilitação e Desclassificação",
              artista: "Petrobras Quest",
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Causas de Exclusão",
              materia: "RLCP",
              images: [
                {
                  title: "Rejeição de Proposta",
                  type: "Status",
                  placeholderColor: "bg-red-500/10",
                },
              ],
            }}
            maceteVisual={{
              title: "Inabilita vs Desclassifica",
              content: (
                 <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                   <p className="text-lg">Inabilita a Empresa (Who). Desclassifica a Oferta (What).</p>
                 </div>
              ),
            }}
          />

          <QuizInterativo
            titulo="QUIZ: Inabilitação e Desempate"
            questoes={toQQ(quizM8)}
            onComplete={(score) => handleModuleComplete('modulo-8', score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo9 = () => {
    const variant = mv[8];
    return (
      <TabsContent value="modulo-9" className="space-y-12">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="RLCP na Prática Petrobras"
            description="Casos reais, estrutura organizacional e compliance."
          />
          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              A Petrobras realiza centenas de licitações por ano usando o RLCP. Toda licitação passa por Suprimentos e Compliance para evitar fraudes e garantir eficiência.
            </p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">🏢 Organização Interna</p>
              <ul className="text-lg space-y-1">
                <li>✓ <strong>Unidade Solicitante:</strong> Define a necessidade inicial</li>
                <li>✓ <strong>Suprimentos:</strong> Conduz a licitação tecnicamente</li>
                <li>✓ <strong>Jurídico:</strong> Valida o edital e o contrato final</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index="9.1"
            variant={variant}
            title="Aplicações Reais"
            description="Como a empresa opera o dia a dia."
          />
          <ModuleConsolidation
            index={9}
            variant={variant}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Vida Corporativa e RLCP",
              duration: "08:20",
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "Rotina de Suprimentos",
              artista: "Petrobras Quest",
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Prática",
              materia: "RLCP",
              images: [
                {
                  title: "Estrutura Petrobras",
                  type: "Org",
                  placeholderColor: "bg-emerald-500/10",
                },
              ],
            }}
            maceteVisual={{
              title: "Compliance Always",
              content: (
                 <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                   <p className="text-lg">Na Petrobras, o RLCP é a Bíblia do Suprimento. Transparência acima de tudo.</p>
                 </div>
              ),
            }}
          />

          <QuizInterativo
            titulo="QUIZ: RLCP na Prática Petrobras"
            questoes={toQQ(quizM9)}
            onComplete={(score) => handleModuleComplete('modulo-9', score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo10 = () => {
    const variant = mv[9];
    return (
      <TabsContent value="modulo-10" className="space-y-12">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Simulado Mestre RLCP"
            description="Desafio final integrando todos os conceitos do curso."
          />
          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              Agora é a hora da verdade. O Simulado Mestre traz questões no padrão CESGRANRIO que misturam princípios, modalidades e execução contratual. Prepare-se para pensar como um Técnico de Suprimento da Petrobras.
            </p>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index="10.1"
            variant={variant}
            title="Grand Finale"
            description="Avaliação de domínio do Regulamento."
          />
          <ModuleConsolidation
            index={10}
            variant={variant}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Simulado Final",
              duration: "15:00",
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              titulo: "Vitória no RLCP",
              artista: "Petrobras Quest",
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Simulado",
              materia: "RLCP",
              images: [
                {
                  title: "Certificação",
                  type: "Meta",
                  placeholderColor: "bg-amber-500/10",
                },
              ],
            }}
            maceteVisual={{
              title: "Você está pronto!",
              content: (
                 <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                   <p className="text-lg">Domine o RLCP e conquiste sua vaga.</p>
                 </div>
              ),
            }}
          />

          <QuizInterativo
            titulo="QUIZ: Simulado Mestre"
            questoes={toQQ(quizM10)}
            onComplete={(score) => handleModuleComplete('modulo-10', score)}
          />
        </div>
      </TabsContent>
    );
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={(index) => isModuleUnlocked(`modulo-${index + 1}`)}
      titulo="RLCP - Regulamento de Licitações Petrobras"
      descricao="Procedimentos transparentes de compras, contratações e gestão de contratos"
      duracao="2h 30m"
      materiaNome={props.materiaNome}
      materiaCor={props.materiaCor}
      materiaId={props.materiaId}
      isCompleted={completedModules.size === MODULE_DEFS.length}
      currentProgress={props.currentProgress}
      onComplete={props.onComplete}
      loading={props.loading}
      xpGanho={props.xpGanho}
    >
      <div className="mt-8">
        {renderModulo1()}
        {renderModulo2()}
        {renderModulo3()}
        {renderModulo4()}
        {renderModulo5()}
        {renderModulo6()}
        {renderModulo7()}
        {renderModulo8()}
        {renderModulo9()}
        {renderModulo10()}
      </div>
    </AulaTemplate>
  );
}
'''

with open(path, 'w', encoding='utf-8') as f:
    f.write(content_part1)
    f.write(rest_of_file)
