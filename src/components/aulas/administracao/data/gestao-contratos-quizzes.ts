export const QUIZ_MODULES: Record<number, any> = {
  1: [
    {
      id: "qc1_1",
      pergunta: "Qual a principal diferença entre as atribuições de Gestão e de Fiscalização de Contratos na Administração Pública e em empresas estatais?",
      opcoes: [
        { label: "A", valor: "A gestão cuida exclusivamente do acompanhamento in loco dos serviços e medições, enquanto a fiscalização atua apenas no repasse financeiro." },
        { label: "B", valor: "A gestão tem foco administrativo e gerencial (controle de prazos, saldos, aditivos e repactuações), enquanto a fiscalização tem foco técnico e operacional (verificação in loco da qualidade e atesto de notas fiscais)." },
        { label: "C", valor: "Não há distinção prática; ambas as funções podem e devem ser exercidas concomitantemente pelo mesmo empregado público, visando economia processual." },
        { label: "D", valor: "A gestão é uma atribuição privativa de auditores externos, enquanto a fiscalização é realizada por empregados efetivos da estatal." },
        { label: "E", valor: "A fiscalização é restrita à aprovação de termos aditivos, cabendo à gestão a emissão dos relatórios diários de obra ou serviço." }
      ],
      correta: "B",
      explicacao: "Perfeito. A Gestão foca nas rotinas burocráticas e administrativas (aditivos, saldos, controle de vigência), enquanto a Fiscalização atua 'no campo', avaliando se a execução técnica atende às especificações contratadas."
    },
    {
      id: "qc1_2",
      pergunta: "Em relação ao Princípio da Segregação de Funções na gestão de contratos, é correto afirmar que:",
      opcoes: [
        { label: "A", valor: "Permite que a mesma pessoa ateste o recebimento do material e autorize o seu pagamento para acelerar a liquidação da despesa." },
        { label: "B", valor: "Recomenda que atividades de atesto da execução (fiscalização) e de liberação de pagamento (gestão financeira) sejam exercidas por agentes distintos para mitigar riscos de fraudes e erros." },
        { label: "C", valor: "Determina que contratos de grande vulto devam ser fracionados em diversas licitações menores." },
        { label: "D", valor: "Exige que o fiscal do contrato seja lotado em uma unidade federativa diferente daquela onde o serviço é prestado." },
        { label: "E", valor: "Foi revogado pela Lei 13.303/2016 (Lei das Estatais) por engessar a atuação eficiente das empresas públicas." }
      ],
      correta: "B",
      explicacao: "O Princípio da Segregação de Funções é basilar no controle interno e na governança. Funções incompatíveis (como atestar a nota fiscal e autorizar a transferência do dinheiro para o banco) devem estar nas mãos de pessoas diferentes."
    },
    {
      id: "qc1_3",
      pergunta: "(CESGRANRIO) Durante a execução de um contrato de prestação de serviços continuados, a prorrogação de prazo de vigência contratual é responsabilidade primária:",
      opcoes: [
        { label: "A", valor: "Da Fiscalização, que deve assinar o aditivo de forma unilateral e imediata no campo." },
        { label: "B", valor: "Da Gestão de Contratos, que deve providenciar a formalização do Termo Aditivo antes do vencimento do contrato." },
        { label: "C", valor: "Da Contratada, que deve emitir a nota fiscal com a data estendida." },
        { label: "D", valor: "Do Tribunal de Contas da União, que autoriza toda e qualquer alteração de prazo superior a 60 dias." },
        { label: "E", valor: "Da Diretoria Executiva da estatal, independentemente do valor ou delegação de competência." }
      ],
      correta: "B",
      explicacao: "A providência formal (administrativa) de elaboração e tramitação do Termo Aditivo para prorrogar o prazo é do Gestor. O fiscal solicita a prorrogação ao Gestor se perceber que o prazo não será suficiente, mas não firma o aditivo."
    },
    {
      id: "qc1_4",
      pergunta: "Em um contrato de fornecimento, a verificação da qualidade dos bens entregues, sua conformidade com as especificações técnicas e o registro de eventuais não conformidades são tarefas inerentes à:",
      opcoes: [
        { label: "A", valor: "Gestão do contrato, exclusivamente." },
        { label: "B", valor: "Auditoria Interna da estatal." },
        { label: "C", valor: "Fiscalização do contrato." },
        { label: "D", valor: "Contadoria ou tesouraria." },
        { label: "E", valor: "Ordenação de Despesa." }
      ],
      correta: "C",
      explicacao: "Analisar a qualidade técnica, medir, pesar e verificar se as especificações técnicas (material, tamanho, capacidade) estão de acordo com o pedido é o núcleo da atuação da Fiscalização do Contrato."
    }
  ],
  2: [
    {
      id: "qc2_1",
      pergunta: "Assinale a alternativa que descreve CORRETAMENTE uma prerrogativa ou dever do Fiscal do Contrato no exercício de suas funções:",
      opcoes: [
        { label: "A", valor: "Dar ordens diretas aos empregados da empresa contratada, inclusive aplicando advertências trabalhistas, quando necessário." },
        { label: "B", valor: "Prorrogar verbalmente os prazos de entrega dos produtos, desde que a justificativa da empresa pareça plausível." },
        { label: "C", valor: "Atestar o recebimento de notas fiscais cujos serviços ainda não foram concluídos, se houver promessa de execução na semana seguinte." },
        { label: "D", valor: "Recusar serviços ou materiais que não atendam às especificações do projeto básico e registrar o fato no Livro de Ocorrências." },
        { label: "E", valor: "Substituir o preposto da empresa contratada de forma sumária e automática no sistema da Receita Federal." }
      ],
      correta: "D",
      explicacao: "O Fiscal tem o poder/dever legal de rejeitar o que não presta. Aditivos não podem ser verbais (B falsa), atestar serviço não feito é fraude (C falsa) e o fiscal não dá ordem ao empregado da contratada, e sim ao preposto (A falsa)."
    },
    {
      id: "qc2_2",
      pergunta: "O atesto de uma medição e da correspondente Nota Fiscal pelo Fiscal do contrato representa:",
      opcoes: [
        { label: "A", valor: "A transferência automática e definitiva do pagamento para a conta da contratada." },
        { label: "B", valor: "O reconhecimento, pela Administração, de que o serviço foi prestado ou o bem entregue, consolidando a fase preparatória para a liquidação da despesa." },
        { label: "C", valor: "Um procedimento dispensável caso a empresa apresente uma apólice de seguro-garantia." },
        { label: "D", valor: "A assinatura do Termo de Recebimento Definitivo, que encerra o vínculo jurídico com a contratada." },
        { label: "E", valor: "Uma garantia de que a empresa cumpriu 100% de suas obrigações trabalhistas junto ao INSS." }
      ],
      correta: "B",
      explicacao: "O atesto na nota fiscal (ou no boletim de medição) é a certificação oficial de que o fato gerador ocorreu (o objeto foi entregue). Ele é imprescindível para a fase contábil de liquidação da despesa."
    },
    {
      id: "qc2_3",
      pergunta: "(CESGRANRIO) Nos contratos de execução de obras e serviços, o acompanhamento deve ser registrado obrigatoriamente:",
      opcoes: [
        { label: "A", valor: "Em redes sociais corporativas de acesso público, para garantir a transparência ativa da estatal." },
        { label: "B", valor: "No Livro de Ocorrências (ou Diário de Obras/Serviços), que serve como prova documental dos fatos ocorridos durante a execução." },
        { label: "C", valor: "Apenas em e-mails informais trocados entre o fiscal e o diretor presidente da contratada." },
        { label: "D", valor: "No Portal da Transparência, no módulo específico de sanções e penalidades, diariamente." },
        { label: "E", valor: "De forma oral, não havendo necessidade de registros físicos ou digitais se houver boa-fé mútua." }
      ],
      correta: "B",
      explicacao: "O Livro de Ocorrências (Diário de Obras) é o documento formal obrigatório (físico ou eletrônico) onde o Fiscal e o Preposto registram as comunicações, avanços, paralisações e inconformidades."
    },
    {
      id: "qc2_4",
      pergunta: "Em relação ao recebimento do objeto de um contrato complexo (como uma obra ou serviço de grande vulto), a legislação estabelece que ele ocorre em dois momentos distintos:",
      opcoes: [
        { label: "A", valor: "Aprovação financeira e aprovação jurídica." },
        { label: "B", valor: "Recebimento tácito e recebimento expresso." },
        { label: "C", valor: "Recebimento antecipado e recebimento compensatório." },
        { label: "D", valor: "Recebimento provisório (pelo fiscal) e recebimento definitivo (por servidor ou comissão, após prazo de observação)." },
        { label: "E", valor: "Recebimento parcial (na fábrica) e recebimento total (no descarte)." }
      ],
      correta: "D",
      explicacao: "Objetos complexos não são recebidos definitivamente 'de cara'. O fiscal assina o Provisório (que inicia o prazo de testes). Após os testes validarem o funcionamento, comissão/autoridade assina o Definitivo."
    }
  ],
  3: [
    {
      id: "qc3_1",
      pergunta: "Para evitar a configuração de vínculo empregatício e a subordinação direta com a Administração Pública, a contratada deve designar, para atuar no local dos serviços, a figura do:",
      opcoes: [
        { label: "A", valor: "Fiscal Suplente." },
        { label: "B", valor: "Ordenador de Despesa." },
        { label: "C", valor: "Gestor Terceirizado." },
        { label: "D", valor: "Preposto." },
        { label: "E", valor: "Procurador do Tribunal de Contas." }
      ],
      correta: "D",
      explicacao: "O Preposto é o representante da empresa contratada, exigido legalmente para centralizar as comunicações com a fiscalização e exercer o poder hierárquico (ordens) sobre seus próprios funcionários terceirizados."
    },
    {
      id: "qc3_2",
      pergunta: "Caso o Fiscal de um contrato da Petrobras constate que um vigilante terceirizado está dormindo no posto de serviço, qual a conduta adequada?",
      opcoes: [
        { label: "A", valor: "O Fiscal deve aplicar advertência por escrito diretamente ao vigilante e suspender seu pagamento do dia." },
        { label: "B", valor: "O Fiscal deve mandar o vigilante embora imediatamente e exigir a devolução de seu crachá, aplicando demissão por justa causa." },
        { label: "C", valor: "O Fiscal deve notificar o Preposto da contratada, apontando a falha (ou registrando no Livro de Ocorrências), para que este tome as providências de correção e substituição, se for o caso." },
        { label: "D", valor: "O Fiscal deve ligar para o sindicato da categoria e solicitar um novo vigilante." },
        { label: "E", valor: "O Fiscal não pode fazer nada, visto que a empresa é privada e a Petrobras não tem gerência sobre a qualidade do serviço após assinar o contrato." }
      ],
      correta: "C",
      explicacao: "O Fiscal notifica a empresa (através do Preposto) e não os empregados diretos da empresa. A empresa responde pelo erro (podendo sofrer glosa e ser multada) e cabe a ela aplicar advertências ou demitir seu funcionário."
    },
    {
      id: "qc3_3",
      pergunta: "A aceitação, pela Administração, do Preposto indicado pela contratada é:",
      opcoes: [
        { label: "A", valor: "Um ato condicionado; a Administração tem o poder de avaliar e até rejeitar a indicação, ou pedir a substituição caso o Preposto não demonstre capacidade." },
        { label: "B", valor: "Um ato meramente vinculativo e automático, não podendo a Administração recusar a indicação sob qualquer hipótese." },
        { label: "C", valor: "Ilegal, pois o Preposto deve ser escolhido por sorteio pela CIPA." },
        { label: "D", valor: "Desnecessária, já que o Fiscal pode comandar diretamente a equipe da contratada." },
        { label: "E", valor: "Obrigatória, desde que o Preposto seja um ex-empregado da estatal." }
      ],
      correta: "A",
      explicacao: "A lei exige que o preposto seja 'aceito pela Administração'. Se for incompetente, grosseiro ou falho, o gestor/fiscal pode solicitar sua remoção, e a empresa terá que apresentar outro profissional."
    },
    {
      id: "qc3_4",
      pergunta: "A designação de um Preposto e a presença da Fiscalização da estatal têm qual efeito sobre a responsabilidade integral da contratada?",
      opcoes: [
        { label: "A", valor: "Isentam a contratada de responsabilidade, transferindo-a integralmente para o Fiscal da estatal." },
        { label: "B", valor: "Reduzem a responsabilidade da contratada em 50%, configurando culpa concorrente por qualquer falha." },
        { label: "C", valor: "Não excluem nem reduzem a responsabilidade da contratada pelos danos causados à Administração ou a terceiros, decorrentes de culpa ou dolo na execução do contrato." },
        { label: "D", valor: "Transferem a responsabilidade objetiva exclusivamente para a Seguradora do contrato." },
        { label: "E", valor: "Eliminam qualquer sanção administrativa, desde que o Preposto assine um termo de ajuste de conduta." }
      ],
      correta: "C",
      explicacao: "É princípio de Direito Administrativo: a fiscalização exercida pelo órgão não exime a responsabilidade (nem solidária, nem primária) da contratada por eventuais falhas, acidentes ou prejuízos na execução da obra ou serviço."
    }
  ],
  4: [
    {
      id: "qc4_1",
      pergunta: "(CESGRANRIO) A etapa em que a Administração confirma que o credor cumpriu com suas obrigações (entregou o bem ou executou o serviço) e apura o valor exato a pagar, baseando-se no atesto da Nota Fiscal, denomina-se:",
      opcoes: [
        { label: "A", valor: "Empenho." },
        { label: "B", valor: "Licitação." },
        { label: "C", valor: "Garantia contratual." },
        { label: "D", valor: "Liquidação da despesa." },
        { label: "E", valor: "Previsão orçamentária." }
      ],
      correta: "D",
      explicacao: "A despesa tem três estágios básicos: Empenho (reserva do dinheiro), Liquidação (verificação do direito do credor mediante atesto) e Pagamento (ordem bancária para liberar os fundos)."
    },
    {
      id: "qc4_2",
      pergunta: "Um contrato de prestação de serviços de limpeza predial estipula um Acordo de Nível de Serviço (SLA). No boletim de medição mensal, o Fiscal constata que a limpeza dos banheiros do 3º andar não foi realizada adequadamente, gerando um desconto no valor do faturamento (não pagamento pelo serviço malfeito). Esse desconto é conceituado como:",
      opcoes: [
        { label: "A", valor: "Multa compensatória por quebra de contrato." },
        { label: "B", valor: "Suspensão cautelar do direito de licitar." },
        { label: "C", valor: "Declaração de inidoneidade cruzada." },
        { label: "D", valor: "Glosa." },
        { label: "E", valor: "Aditivo de supressão de objeto." }
      ],
      correta: "D",
      explicacao: "Glosa é o não pagamento (desconto na medição) daquilo que não foi executado ou que foi executado fora dos padrões (SLA). Ela não tem caráter de sanção punitiva (multa), mas de mero reajuste quantitativo (não pago pelo que não recebi)."
    },
    {
      id: "qc4_3",
      pergunta: "A mora (atraso) injustificado no pagamento de Notas Fiscais devidamente liquidadas pela Administração confere ao contratado o direito a:",
      opcoes: [
        { label: "A", valor: "Receber atualização financeira (correção monetária) e juros de mora, desde que o atraso seja superior ao prazo estabelecido no contrato/legislação." },
        { label: "B", valor: "Exigir a falência da empresa estatal através de decretação sumária na Junta Comercial." },
        { label: "C", valor: "Reduzir, na mesma proporção dos dias de atraso, a carga horária de seus funcionários." },
        { label: "D", valor: "Sequestrar bens imóveis da Administração Pública até a satisfação do débito." },
        { label: "E", valor: "Receber a fatura em dobro, conforme as regras do Código de Defesa do Consumidor (CDC)." }
      ],
      correta: "A",
      explicacao: "O atraso nos pagamentos quebra a equação econômico-financeira. A contratada tem direito ao reajuste por inflação (atualização) e compensação financeira (juros de mora) referentes aos dias em atraso, sem prejuízo de suspender a execução se o atraso for longo (ex: 90 dias)."
    },
    {
      id: "qc4_4",
      pergunta: "Antes de transferir o valor líquido para a conta bancária da empresa, o Setor Financeiro da estatal, ao processar o pagamento da Nota Fiscal atestada, deve proceder a:",
      opcoes: [
        { label: "A", valor: "Conceder bônus de 5% sobre o valor se a nota foi entregue adiantada." },
        { label: "B", valor: "Retenção na fonte dos tributos incidentes na operação (como IR, INSS, ISS, PIS/COFINS), atuando como substituta ou responsável tributária." },
        { label: "C", valor: "Devolver a nota à Receita Federal para homologação eletrônica presencial." },
        { label: "D", valor: "Cobrar taxa administrativa de 2% para cobrir os custos do DOC/TED bancário." },
        { label: "E", valor: "Suspender o pagamento até o encerramento do exercício financeiro (dezembro)." }
      ],
      correta: "B",
      explicacao: "A Administração Pública, nas compras e serviços, atua retendo os impostos da empresa e recolhendo diretamente aos cofres públicos. O pagamento na conta da empresa cai 'líquido' das retenções."
    }
  ],
  5: [
    {
      id: "qc5_1",
      pergunta: "Em relação aos deveres de fiscalização da Administração Pública nos contratos com dedicação exclusiva de mão de obra (terceirização), a inobservância da verificação mensal do recolhimento de impostos e encargos trabalhistas (INSS, FGTS) por parte da contratada gera:",
      opcoes: [
        { label: "A", valor: "A responsabilidade solidária automática e imediata da estatal pelas dívidas civis e comerciais da contratada." },
        { label: "B", valor: "A responsabilidade subsidiária da Administração Pública pelos débitos trabalhistas inadimplidos, decorrente da configuração de culpa 'in vigilando' (Súmula 331 do TST)." },
        { label: "C", valor: "A total irresponsabilidade do ente público, visto que os empregados foram contratados sob as regras rígidas da CLT (Direito Privado)." },
        { label: "D", valor: "A extinção irrevogável e automática da pessoa jurídica da empresa terceirizada." },
        { label: "E", valor: "A transferência da dívida trabalhista para o órgão previdenciário (INSS), que atua como segurador de última instância." }
      ],
      correta: "B",
      explicacao: "De acordo com a Súmula 331 do TST, o não recolhimento de encargos e a falta de fiscalização eficaz da Administração configuram 'culpa in vigilando', atraindo para a estatal a responsabilidade subsidiária."
    },
    {
      id: "qc5_2",
      pergunta: "(CESGRANRIO) Durante a vigência de um contrato, a comprovação de regularidade fiscal (CNDs) e trabalhista por parte do contratado deve ser exigida:",
      opcoes: [
        { label: "A", valor: "Apenas durante a fase de habilitação da licitação, sendo ilegal exigi-la posteriormente." },
        { label: "B", valor: "Apenas na formalização (assinatura) do termo de contrato ou de seus aditivos." },
        { label: "C", valor: "Periodicamente, durante toda a execução do contrato, preferencialmente como condição prévia a cada liberação de pagamento mensal." },
        { label: "D", valor: "Exclusivamente no último dia do contrato, no ato do recebimento definitivo." },
        { label: "E", valor: "Em caráter facultativo, apenas se houver denúncia formal e documentada de sindicato laboral." }
      ],
      correta: "C",
      explicacao: "A exigência de manutenção das condições de habilitação e qualificação estende-se por toda a vigência contratual. O bloqueio (retenção) do pagamento é a principal alavanca para obrigar a empresa a regularizar as certidões mensais."
    },
    {
      id: "qc5_3",
      pergunta: "Qual é o termo jurídico que define a falha, omissão ou negligência da Administração na fiscalização das obrigações assumidas pelo contratado, especialmente as trabalhistas e previdenciárias?",
      opcoes: [
        { label: "A", valor: "Culpa in eligendo." },
        { label: "B", valor: "Culpa in omittendo." },
        { label: "C", valor: "Culpa stricto sensu." },
        { label: "D", valor: "Culpa in vigilando." },
        { label: "E", valor: "Responsabilidade objetiva integral." }
      ],
      correta: "D",
      explicacao: "Culpa 'in vigilando' = falha ao vigiar (fiscalizar). Culpa 'in eligendo' seria falha ao escolher (ex: contratar sem licitação empresa ruim). No caso da Súmula 331, é a culpa in vigilando."
    },
    {
      id: "qc5_4",
      pergunta: "Para resguardar os direitos rescisórios dos trabalhadores alocados em contratos de prestação de serviços com dedicação exclusiva de mão de obra (férias, 13º salário, multa do FGTS), a Administração Pública pode prever em edital a criação de:",
      opcoes: [
        { label: "A", valor: "Uma Conta Corrente conjunta livremente operada pelo Preposto da empresa." },
        { label: "B", valor: "Uma Conta Vinculada, cujos valores referentes a provisões trabalhistas ficam retidos e bloqueados, sendo liberados apenas mediante autorização da Administração e comprovação do pagamento dos benefícios aos trabalhadores." },
        { label: "C", valor: "Um Fundo de Investimento em Ações (FIA) de alta liquidez e alto risco." },
        { label: "D", valor: "Uma Bolsa-Família específica para servidores terceirizados." },
        { label: "E", valor: "Um plano de previdência complementar obrigatório custeado exclusivamente pela estatal." }
      ],
      correta: "B",
      explicacao: "O mecanismo da Conta Vinculada bloqueada para movimentação (previsto na IN 05/2017 do MPDG, aplicável em vários cenários) protege as parcelas de férias, 13º e FGTS, garantindo que o dinheiro só saia para a mão do trabalhador."
    }
  ]
,
  6: [
    {
      id: "qc6_1",
      pergunta: "A inexecução contratual, total ou parcial, sujeita a contratada a sanções administrativas. De acordo com a Lei 13.303/2016 e o RLCP, a sanção de Advertência tem como característica principal:",
      opcoes: [
        { label: "A", valor: "Ser acompanhada obrigatoriamente de confisco cautelar de 50% dos bens da empresa." },
        { label: "B", valor: "Ser aplicada exclusivamente quando há superfaturamento comprovado acima de R$ 1 milhão." },
        { label: "C", valor: "Ter caráter corretivo e pedagógico, aplicada em casos de faltas leves que não resultem em prejuízo financeiro ou operacional severo." },
        { label: "D", valor: "Bloquear a empresa de participar de licitações na estatal pelo prazo mínimo de 3 anos." },
        { label: "E", valor: "Extinguir unilateralmente o contrato sem possibilidade de recurso." }
      ],
      correta: "C",
      explicacao: "A Advertência é a mais branda das sanções. É um 'puxão de orelha' oficial e registrado para falhas menores, visando corrigir o rumo da execução antes que um dano maior ocorra."
    },
    {
      id: "qc6_2",
      pergunta: "Na aplicação das sanções de Suspensão Temporária e Declaração de Inidoneidade, qual a principal diferença quanto à sua abrangência?",
      opcoes: [
        { label: "A", valor: "A Suspensão afeta apenas os contratos de obras, enquanto a Inidoneidade afeta apenas serviços de limpeza." },
        { label: "B", valor: "A Suspensão impede de licitar apenas com a empresa estatal que aplicou a sanção, enquanto a Inidoneidade alcança toda a Administração Pública (União, Estados e Municípios)." },
        { label: "C", valor: "A Suspensão tem prazo máximo de 5 anos e a Inidoneidade tem prazo máximo de 6 meses." },
        { label: "D", valor: "A Inidoneidade é aplicada pelo fiscal do contrato no campo, enquanto a Suspensão requer aprovação do Tribunal de Contas." },
        { label: "E", valor: "Ambas possuem a exata mesma abrangência e diferem apenas no valor da multa acessória." }
      ],
      correta: "B",
      explicacao: "Na Lei 13.303 (Estatais), a Suspensão (que vai até 2 anos) proíbe a empresa de licitar/contratar com AQUELA estatal específica. Já a Inidoneidade é gravíssima e contamina a empresa perante qualquer órgão público do país."
    },
    {
      id: "qc6_3",
      pergunta: "A aplicação de qualquer penalidade administrativa à empresa contratada, seja advertência, multa ou suspensão, está condicionada ao estrito cumprimento do princípio constitucional do(a):",
      opcoes: [
        { label: "A", valor: "Sigilo Bancário, que proíbe a publicação da sanção." },
        { label: "B", valor: "Contraditório e Ampla Defesa, garantindo-se à empresa notificação prévia e prazo para apresentar justificativas antes da punição." },
        { label: "C", valor: "Imediatidade Absoluta, aplicando-se a pena no mesmo dia do fato sem ouvir o acusado." },
        { label: "D", valor: "Inviolabilidade de Domicílio, proibindo fiscais de visitarem as instalações da contratada." },
        { label: "E", valor: "Livre Iniciativa, que proíbe o Estado de punir entes privados em qualquer circunstância." }
      ],
      correta: "B",
      explicacao: "Nenhuma sanção pode ser aplicada sumariamente. O Processo de Aplicação de Penalidade (PAP) requer notificação, oitiva da empresa (defesa) e decisão fundamentada."
    }
  ],
  7: [
    {
      id: "qc7_1",
      pergunta: "(CESGRANRIO) A Lei nº 13.303/2016 prevê que o contratado é obrigado a aceitar, nas mesmas condições contratuais, os acréscimos ou supressões que se fizerem nas obras, serviços ou compras. Qual é o limite percentual geral aplicável sobre o valor inicial atualizado do contrato para acréscimos ou supressões compulsórias?",
      opcoes: [
        { label: "A", valor: "5% (cinco por cento)." },
        { label: "B", valor: "10% (dez por cento)." },
        { label: "C", valor: "20% (vinte por cento)." },
        { label: "D", valor: "25% (vinte e cinco por cento)." },
        { label: "E", valor: "50% (cinquenta por cento)." }
      ],
      correta: "D",
      explicacao: "A regra geral, exaustivamente cobrada pela banca, é o limite de 25% para acréscimos ou supressões unilaterais. Acima disso, só com acordo entre as partes (para supressão) ou exceção legal específica."
    },
    {
      id: "qc7_2",
      pergunta: "Em um contrato firmado por uma empresa estatal para a reforma de um edifício sede e de seus elevadores, a fiscalização atestou a necessidade de incluir obras extras não previstas no escopo inicial. Para esse caso específico (reforma de edifícios/equipamentos), o limite percentual OBRIGATÓRIO de aceitação de acréscimos pelo contratado é de:",
      opcoes: [
        { label: "A", valor: "25% (vinte e cinco por cento)." },
        { label: "B", valor: "30% (trinta por cento)." },
        { label: "C", valor: "50% (cinquenta por cento)." },
        { label: "D", valor: "75% (setenta e cinco por cento)." },
        { label: "E", valor: "100% (cem por cento), duplicando o contrato." }
      ],
      correta: "C",
      explicacao: "A exceção à regra geral dos 25% ocorre EXCLUSIVAMENTE para acréscimos em contratos de reforma de equipamentos e edifícios, cujo limite sobre para até 50% do valor inicial."
    },
    {
      id: "qc7_3",
      pergunta: "Acerca da prorrogação dos prazos de vigência dos contratos firmados pelas estatais, assinale a premissa fundamental exigida pelo Direito Administrativo:",
      opcoes: [
        { label: "A", valor: "O Termo Aditivo de prorrogação deve ser obrigatoriamente assinado ANTES do término da vigência do contrato; contrato vencido está extinto e não admite prorrogação." },
        { label: "B", valor: "A prorrogação pode ser feita até 12 meses após o vencimento, devido à teoria do fato consumado." },
        { label: "C", valor: "A vigência é prorrogada automaticamente pelo sistema eletrônico a cada final de ano, sem necessidade de aditivos escritos." },
        { label: "D", valor: "Qualquer prorrogação depende de lei específica aprovada pelo Congresso Nacional." },
        { label: "E", valor: "Somente contratos verbais admitem prorrogações retroativas." }
      ],
      correta: "A",
      explicacao: "O prazo de vigência é fatal. Expirado o prazo, o contrato morre (extinção pelo cumprimento do prazo). A prorrogação exige que o vínculo ainda exista, logo, deve ser firmada tempestivamente (antes de vencer)."
    }
  ],
  8: [
    {
      id: "qc8_1",
      pergunta: "Em um contrato de limpeza com alocação exclusiva de funcionários (terceirização), o Sindicato da categoria celebrou, após 18 meses, uma nova Convenção Coletiva de Trabalho (CCT) que aumentou o piso salarial em 8%. A empresa contratada requer que o contrato seja ajustado para cobrir esse novo custo. Qual o instrumento jurídico adequado?",
      opcoes: [
        { label: "A", valor: "Reajuste inflacionário pelo IPCA." },
        { label: "B", valor: "Repactuação." },
        { label: "C", valor: "Revisão por Álea Extraordinária (Força Maior)." },
        { label: "D", valor: "Acréscimo de quantitativo (Termo Aditivo de Escopo)." },
        { label: "E", valor: "Fato do Príncipe." }
      ],
      correta: "B",
      explicacao: "A Repactuação é o mecanismo específico utilizado para atualizar valores de contratos de serviços contínuos com mão de obra, baseando-se em variação comprovada de custos (ex: dissídio ou convenção coletiva), mediante apresentação de planilha."
    },
    {
      id: "qc8_2",
      pergunta: "Uma empresa que firmou contrato de fornecimento de peças importadas com a Petrobras sofre um forte impacto devido à decretação repentina de uma guerra internacional que triplica o custo logístico dos fretes e seguros marítimos. Para não falir, a empresa solicita a alteração do valor do contrato, baseando-se na ocorrência de um fato imprevisível (álea extraordinária). Esse pleito fundamenta-se no instituto da:",
      opcoes: [
        { label: "A", valor: "Multa Compensatória." },
        { label: "B", valor: "Atualização Financeira (Juros)." },
        { label: "C", valor: "Revisão (ou Reequilíbrio Econômico-Financeiro Stricto Sensu)." },
        { label: "D", valor: "Reajuste contratual padrão em 12 meses." },
        { label: "E", valor: "Sub-rogação da Dívida." }
      ],
      correta: "C",
      explicacao: "A Revisão (reequilíbrio stricto sensu) é a resposta do Direito a situações de extrema gravidade, imprevisibilidade (ou incalculabilidade) que destroem a equação financeira original (Teoria da Imprevisão)."
    },
    {
      id: "qc8_3",
      pergunta: "O 'Fato do Príncipe', instituto que garante ao contratado o direito à Revisão contratual para reequilíbrio da equação econômico-financeira, caracteriza-se por:",
      opcoes: [
        { label: "A", valor: "Erro de cálculo cometido pelo gerente financeiro da própria empresa contratada." },
        { label: "B", valor: "Ato normativo ou decisão geral do Poder Público que, de forma imprevisível e indireta (fora do contrato), onera excessivamente a execução contratual, como a criação de um novo imposto." },
        { label: "C", valor: "Chuvas sazonais e enchentes previsíveis em determinada região do país." },
        { label: "D", valor: "Atraso injustificado no pagamento de três faturas mensais consecutivas." },
        { label: "E", valor: "Decisão unilateral do Fiscal de aumentar a quantidade de itens em 5%." }
      ],
      correta: "B",
      explicacao: "Fato do Príncipe é uma ordem estatal (ex: aumento de alíquota tributária, decreto proibindo importação) que atinge o contrato reflexamente, quebrando o equilíbrio e dando direito à revisão."
    }
  ],
  9: [
    {
      id: "qc9_1",
      pergunta: "A Lei 13.303/2016 possibilita à empresa estatal exigir garantia contratual nas contratações de obras, serviços e compras. Em relação à modalidade da garantia, é correto afirmar que:",
      opcoes: [
        { label: "A", valor: "Caberá exclusivamente à Administração Pública (Estatal) escolher e impor a modalidade que a empresa deverá apresentar (ex: exigir apenas fiança bancária)." },
        { label: "B", valor: "A escolha da modalidade (caução em dinheiro, seguro-garantia ou fiança bancária) é uma prerrogativa da EMPRESA CONTRATADA, dentre as permitidas na lei." },
        { label: "C", valor: "A lei proíbe o uso de seguro-garantia em contratos celebrados por empresas de capital aberto como a Petrobras." },
        { label: "D", valor: "A garantia deve ser depositada diretamente na conta-corrente pessoal do Gestor de Contratos como sinal de boa-fé." },
        { label: "E", valor: "O seguro-garantia tem como única modalidade a fiança criminal na Polícia Federal." }
      ],
      correta: "B",
      explicacao: "A lei traz o cardápio de opções (caução, seguro ou fiança), mas quem ESCOLHE qual opção utilizar é a CONTRATADA, conforme sua conveniência e custo financeiro. A estatal não pode limitar o edital a apenas uma."
    },
    {
      id: "qc9_2",
      pergunta: "(CESGRANRIO) Nos contratos disciplinados pelo Regulamento de Licitações e Contratos (RLCP) com base na Lei das Estatais, qual é o limite percentual GERAL máximo estipulado para a exigência de garantia de execução contratual?",
      opcoes: [
        { label: "A", valor: "1% (um por cento) do valor inicial do contrato." },
        { label: "B", valor: "5% (cinco por cento) do valor do contrato, podendo, em casos excepcionais de grande vulto e alta complexidade, chegar a 10% (dez por cento)." },
        { label: "C", valor: "25% (vinte e cinco por cento) do valor do contrato em qualquer modalidade." },
        { label: "D", valor: "50% (cinquenta por cento) do valor do patrimônio líquido da empresa." },
        { label: "E", valor: "100% (cem por cento), garantindo a totalidade do risco operacional." }
      ],
      correta: "B",
      explicacao: "A regra de ouro da garantia: Limite geral = 5%. Exceção (alta complexidade técnica, grandes riscos ou grande vulto) = limite de 10%."
    }
  ],
  10: [
    {
      id: "qc10_1",
      pergunta: "Em uma obra complexa de gasoduto, a etapa final consiste no aceite oficial das estruturas instaladas. Como deve ser processado o recebimento do objeto neste caso?",
      opcoes: [
        { label: "A", valor: "De forma automática, por via postal, sem vistoria, com recebimento instantâneo pelo sistema ERP (SAP)." },
        { label: "B", valor: "Em etapa única e definitiva, realizada exclusivamente pelo Diretor Presidente da estatal." },
        { label: "C", valor: "Em duas etapas obrigatórias: Recebimento Provisório (pelo fiscal, atestando a conclusão física e iniciando testes) e Recebimento Definitivo (por servidor/comissão, atestando a adequação técnica)." },
        { label: "D", valor: "Exclusivamente por comissão parlamentar de inquérito ou auditores independentes externos." },
        { label: "E", valor: "Mediante a assinatura tácita pelo transcurso de 24 horas sem resposta do fiscal a e-mail da contratada." }
      ],
      correta: "C",
      explicacao: "Obras e serviços complexos exigem verificação profunda. O Provisório diz 'está aqui, vamos testar'. O Definitivo diz 'testamos e aprovamos, pode liberar a garantia e dar quitação'. Têm naturezas e agentes assinantes distintos."
    },
    {
      id: "qc10_2",
      pergunta: "A emissão do Termo de Recebimento Definitivo extingue completamente as responsabilidades da empresa contratada sobre o bem ou obra entregue à Administração Pública?",
      opcoes: [
        { label: "A", valor: "Sim, o recebimento definitivo funciona como um perdão absoluto (anistia técnica), anulando inclusive falhas dolosas ocultas." },
        { label: "B", valor: "Não. A contratada permanece responsável ético, profissional e civilmente pela solidez e segurança da obra, além de responder por vícios redibitórios (ocultos) dentro dos prazos da legislação (ex: Código Civil)." },
        { label: "C", valor: "Sim, exceto se a obra desabar nas primeiras 48 horas após a assinatura do termo." },
        { label: "D", valor: "Sim, mas os valores da garantia contratual são retidos para sempre pela estatal." },
        { label: "E", valor: "Não, pois o contrato é renovado eternamente caso haja qualquer vício." }
      ],
      correta: "B",
      explicacao: "O recebimento definitivo finaliza a execução contratual e libera garantias e pagamentos finais, mas a empresa nunca se livra da responsabilidade legal/civil por vícios de fabricação ou fragilidade na construção civil descoberta nos prazos de garantia da lei."
    },
    {
      id: "qc10_3",
      pergunta: "O processo em que a Administração Estadual ou Empresa Pública avalia o quão bem a fornecedora prestou os serviços, cumpriu os prazos de entrega e respeitou as normas de SMS (Saúde, Meio Ambiente e Segurança), resultando em uma nota que comporá seu histórico corporativo, é conhecido como:",
      opcoes: [
        { label: "A", valor: "Sindicância Administrativa Punitiva." },
        { label: "B", valor: "Termo Aditivo de Escopo." },
        { label: "C", valor: "Avaliação de Desempenho do Fornecedor (ex: IDF)." },
        { label: "D", valor: "Inquérito Civil de Conformidade." },
        { label: "E", valor: "Acordo de Leniência." }
      ],
      correta: "C",
      explicacao: "O Índice de Desempenho do Fornecedor (IDF/ADF) é uma ferramenta de gestão crucial. Serve de base para manter boas empresas no cadastro de fornecedores e punir ou bloquear o registro daquelas com mau desempenho operacional/técnico."
    }
  ]
};

