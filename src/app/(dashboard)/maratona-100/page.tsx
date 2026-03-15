"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Usuario, Questao, Simulado } from "@/lib/types";
import { salvarUsuario, carregarUsuario } from "@/lib/utils";
import LoadingScreen from "@/components/LoadingScreen";
import CadernoProvaScreen from "@/components/simulados/CadernoProvaScreen";
import ResultadoScreen from "@/components/ResultadoScreen";
import SimuladoHome from "@/components/simulados/SimuladoHome";
import { CONTEUDO_MATERIAS } from "@/data/conteudo";
import { gerarQuestoesLoteAction } from "@/lib/actions/questoes";
import { getCurrentUserAction } from "@/lib/actions/auth";

const usuarioInicial: Usuario = {
  nome: "",
  xp: 0,
  nivel: "Estagiário",
  questoesCertas: 0,
  questoesErradas: 0,
  sequenciaAtual: 0,
  maiorSequencia: 0,
  conquistas: [],
  historico: [],
  questoesGeradas: 0,
};

export default function Maratona100Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tipoUrl = searchParams.get("tipo");
  const qtdUrl = searchParams.get("qtd");
  const dificuldadeUrl = searchParams.get("dificuldade");
  const assuntoUrl = searchParams.get("assunto");

  const [tela, setTela] = useState<
    "home" | "gerando" | "simulado" | "resultado"
  >("home");
  const [usuario, setUsuario] = useState<Usuario>(usuarioInicial);
  const [simuladoAtual, setSimuladoAtual] = useState<Simulado | null>(null);
  const [cronometro, setCronometro] = useState(0);
  const [cronometroAtivo, setCronometroAtivo] = useState(false);
  const [gerandoQuestoes, setGerandoQuestoes] = useState(false);
  const [progressoGeracao, setProgressoGeracao] = useState(0);
  const [totalGeracao, setTotalGeracao] = useState(0);
  const [tempoLimite, setTempoLimite] = useState<number | null>(null); // em segundos
  const [tempoEsgotado, setTempoEsgotado] = useState(false);
  const [contagemRegressivaIA, setContagemRegressivaIA] = useState(0);

  // Carregar dados
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const result = await getCurrentUserAction();
        if (result.status === "success" && result.data) {
          const user = result.data as Usuario; // Cast to Usuario type
          setUsuario(user);
          salvarUsuario(user);
        } else {
          // Fallback for localStorage if API call fails or no user
          const dadosSalvos = carregarUsuario();
          if (dadosSalvos) {
            setUsuario(dadosSalvos);
          } else {
            router.push("/login"); // Redirect if no user found anywhere
          }
        }
      } catch (error) {
        console.error("Erro ao carregar usuário da API:", error);
        // Fallback for localStorage in case of API error
        const dadosSalvos = carregarUsuario();
        if (dadosSalvos) {
          setUsuario(dadosSalvos);
        } else {
          router.push("/login"); // Redirect if no user found anywhere
        }
      }
    };

    loadUserData();
  }, []);

  // Auto-start se vier parâmetros na URL e usuário estiver carregado
  useEffect(() => {
    if (usuario.nome && tipoUrl && !simuladoAtual && tela === "home") {
      iniciarSimulado(
        tipoUrl,
        qtdUrl ? parseInt(qtdUrl) : 100,
        dificuldadeUrl || undefined,
        assuntoUrl || undefined,
      );
    }
  }, [tipoUrl, qtdUrl, dificuldadeUrl, assuntoUrl, usuario.nome]);

  // Salvar dados
  useEffect(() => {
    if (usuario.nome) {
      salvarUsuario(usuario);
    }
  }, [usuario]);

  // Cronômetro (progressivo ou regressivo)
  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    if (cronometroAtivo) {
      intervalo = setInterval(() => {
        if (tempoLimite) {
          // Timer regressivo
          setCronometro((prev) => {
            if (prev <= 1) {
              setCronometroAtivo(false);
              setTempoEsgotado(true);
              return 0;
            }
            return prev - 1;
          });
        } else {
          // Timer progressivo
          setCronometro((prev) => prev + 1);
        }
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [cronometroAtivo, tempoLimite]);

  // Cronômetro para o Rate Limit da IA
  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    if (contagemRegressivaIA > 0) {
      intervalo = setInterval(() => {
        setContagemRegressivaIA((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [contagemRegressivaIA]);

  // Efeito para encerrar prova quando tempo esgota
  useEffect(() => {
    if (tempoEsgotado && simuladoAtual && tela === "simulado") {
      finalizarSimulado();
    }
  }, [tempoEsgotado]);

  const gerarQuestoesLote = async (
    materia: string,
    quantidade: number,
    dificuldade?: string,
    assunto?: string
  ): Promise<Questao[]> => {
    const result = await gerarQuestoesLoteAction({
      materia,
      quantidade,
      dificuldade: (dificuldade as any) || "Média",
      assunto,
      contexto: {
        cargo: usuario.cargo || "Geral",
        nivel: usuario.nivelConcurso || "medio",
      },
    });

    if (result.status === "error" || !result.data) {
      throw new Error(result.error || "Erro ao gerar lote");
    }

    return result.data;
  };

  const gerarQuestoes = async (
    tipo: string,
    quantidade: number,
    dificuldadeManual?: string,
    assuntoManual?: string,
  ): Promise<Questao[]> => {
    const questoes: Questao[] = [];
    let distribuicao: { materia: string; qtd: number; assunto?: string }[] = [];

    // Lógica de distribuição baseada no tipo
    const normalize = (str: string) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const normalizedAssunto = assuntoUrl ? normalize(assuntoUrl) : "";

    if (tipo === "maratona") {
      const isSuperior = usuario.nivelConcurso === "superior";
      if (isSuperior) {
        // Maratona Superior: 20 Port, 15 Mat, 15 Ing, 50 Esp (=100)
        distribuicao = [
          { materia: "Língua Portuguesa", qtd: 20 },
          { materia: "Matemática", qtd: 15 },
          { materia: "Língua Inglesa", qtd: 15 },
          { materia: "Conhecimentos Específicos", qtd: 50 },
        ];
      } else {
        // Maratona Médio: 20 Port, 20 Mat, 60 Esp (=100)
        distribuicao = [
          { materia: "Língua Portuguesa", qtd: 20 },
          { materia: "Matemática", qtd: 20 },
          { materia: "Conhecimentos Específicos", qtd: 60 },
        ];
      }
    } else if (tipo === "intensivo") {
      // Intensivo: 20 questões
      if (assuntoUrl === "Língua Portuguesa") {
        distribuicao = [{ materia: "Língua Portuguesa", qtd: quantidade }];
      } else if (assuntoUrl === "Matemática") {
        distribuicao = [{ materia: "Matemática", qtd: quantidade }];
      } else if (assuntoUrl) {
        // Tópico específico: descobre a matéria ou define como Específica
        const materiaFound = CONTEUDO_MATERIAS.find((m) =>
          m.topicos.some((t) => t.titulo === assuntoUrl),
        );
        const materiaNome = materiaFound
          ? materiaFound.nome
          : "Conhecimentos Específicos";
        distribuicao = [
          { materia: materiaNome, qtd: quantidade, assunto: assuntoUrl },
        ];
      } else {
        // Intensivo Misto (sem tópico definido)
        const qtdPort = Math.ceil(quantidade * 0.3); // 30%
        const qtdMat = Math.ceil(quantidade * 0.3); // 30%
        const qtdEsp = quantidade - qtdPort - qtdMat; // Resto (40%)
        distribuicao = [
          { materia: "Língua Portuguesa", qtd: qtdPort },
          { materia: "Matemática", qtd: qtdMat },
          { materia: "Conhecimentos Específicos", qtd: qtdEsp },
        ];
      }
    } else {
      // Simulado Rápido ou Padrão (tipo = id da matéria)
      const materiaObj = CONTEUDO_MATERIAS.find((m) => m.id === tipo);
      const nameMateria = materiaObj
        ? materiaObj.nome
        : tipo === "especificas"
          ? "Conhecimentos Específicos"
          : tipo;
      distribuicao = [
        {
          materia: nameMateria,
          qtd: quantidade,
          assunto: assuntoManual || assuntoUrl || undefined,
        },
      ];
    }

    setTotalGeracao(quantidade);
    setProgressoGeracao(0);

    // Loop de geração por lotes
    for (const item of distribuicao) {
      let restantes = item.qtd;
      
      while (restantes > 0) {
        // Reduzido para 5 no Gemini para maior estabilidade no Free Tier
        const batchSize = Math.min(restantes, 5);
        
        try {
          let dificuldade = dificuldadeManual || dificuldadeUrl || undefined;

          // Ajuste automático de dificuldade
          if (!dificuldade) {
            const taxaAcerto =
              usuario.questoesCertas /
              (usuario.questoesCertas + usuario.questoesErradas || 1);
            if (taxaAcerto > 0.8) dificuldade = "Difícil";
            else if (taxaAcerto > 0.6) dificuldade = "Média";
            else if (taxaAcerto < 0.5) dificuldade = "Fácil";
          }

          // Delay menor entre lotes
          if (questoes.length > 0) await new Promise((r) => setTimeout(r, 1000));

          const lote = await gerarQuestoesLote(
            item.materia,
            batchSize,
            dificuldade,
            item.assunto
          );
          
          questoes.push(...lote);
          restantes -= lote.length;
          setProgressoGeracao(questoes.length);
        } catch (error: any) {
          console.error(`[MARATONA] Erro no lote de ${item.materia}:`, error.message);
          
          // Se for Rate Limit, espera mais tempo (15s) e tenta de novo o lote
          if (error.message.includes('Rate Limit') || error.message.includes('429')) {
             console.log("[MARATONA] Limite de taxa atingido. Respirando por 15s...");
             setContagemRegressivaIA(15);
             await new Promise((r) => setTimeout(r, 15000));
             continue; // Tenta o mesmo lote de novo
          }

          // Fallback individual em caso de outros erros
          try {
            console.log(`[MARATONA] Tentando fallback individual para ${item.materia}...`);
            const individual = await gerarQuestoesLote(item.materia, 1, "Média", item.assunto);
            questoes.push(...individual);
            restantes -= 1;
            setProgressoGeracao(questoes.length);
          } catch (retryError: any) {
            console.error("[MARATONA] Falha total na retentativa:", retryError.message);
            // Se for rate limit aqui também, espera
            if (retryError.message.includes('Rate Limit') || retryError.message.includes('429')) {
               setContagemRegressivaIA(20);
               await new Promise((r) => setTimeout(r, 20000));
            }
            restantes -= 1; // Pula para não travar o loop
          }
        }
      }
    }

    return questoes;
  };

  const iniciarSimulado = async (
    tipo: string,
    quantidade: number = 5,
    dificuldade?: string,
    assunto?: string,
  ) => {
    setGerandoQuestoes(true);
    setTela("gerando");

    try {
      // Verificação de segurança: Inglês é apenas para nível superior
      const isSuperior = usuario.nivelConcurso === "superior";
      if (tipo === "ingles" && !isSuperior) {
        throw new Error(
          "A matéria de Língua Inglesa é exclusiva para candidatos de Nível Superior.",
        );
      }

      // Free Tier Check
      if (usuario.plan === "free") {
        const hoje = new Date().toISOString().split("T")[0];
        const tentativasHoje = (usuario.historico || []).filter(
          (h) => h.data.startsWith(hoje) && h.tipo === tipo,
        ).length;

        if (tentativasHoje >= 1) {
          throw new Error(
            "Usuários gratuitos têm limite de 1 simulado por matéria por dia. Faça upgrade para tentativas ilimitadas! 🚀",
          );
        }
      }

      const questoes = await gerarQuestoes(
        tipo,
        quantidade,
        dificuldade,
        assunto,
      );

      if (questoes.length === 0) {
        throw new Error(
          "Nenhuma questão foi gerada. Verifique sua conexão ou tente novamente.",
        );
      }

      setSimuladoAtual({
        tipo,
        questoes,
        respostas: new Array(questoes.length).fill(null),
        iniciado: Date.now(),
      });

      setUsuario((prev) => ({
        ...prev,
        questoesGeradas: prev.questoesGeradas + questoes.length,
      }));

      setTempoEsgotado(false);

      // Maratona CESGRANRIO: 4h30 de prova
      setTempoLimite(4.5 * 60 * 60); // 4h30 em segundos
      setCronometro(4.5 * 60 * 60);

      setCronometroAtivo(true);
      setGerandoQuestoes(false);
      setTela("simulado");
    } catch (error: any) {
      console.error("Erro ao iniciar simulado:", error);
      setGerandoQuestoes(false);
      setTela("home");
      alert(`⚠️ Limite Atingido: ${error.message}`);
    }
  };


  const finalizarSimulado = () => {
    if (!simuladoAtual) return;

    setCronometroAtivo(false);

    const totalAcertos = simuladoAtual.respostas.filter(
      (r) => r && r.correta,
    ).length;
    const totalQuestoes = simuladoAtual.questoes.length;
    const percentual = Math.round((totalAcertos / totalQuestoes) * 100);

    let bonusXP = 200;
    if (percentual >= 90) bonusXP += 100;
    else if (percentual >= 80) bonusXP += 50;

    const novoHistorico = [
      ...(usuario.historico || []),
      {
        data: new Date().toISOString(),
        tipo: simuladoAtual.tipo,
        acertos: totalAcertos,
        total: totalQuestoes,
        percentual,
        tempo: cronometro,
      },
    ];

    setUsuario({
      ...usuario,
      xp: usuario.xp + bonusXP,
      historico: novoHistorico,
    });

    setTela("resultado");
  };

  const voltarHome = () => {
    // Se veio do dashboard, volta pro dashboard
    if (tipoUrl) {
      router.push("/dashboard");
    } else {
      setTela("home");
      setSimuladoAtual(null);
      setCronometro(0);
      setCronometroAtivo(false);
    }
  };

  if (tela === "gerando") {
    return (
      <LoadingScreen
        current={progressoGeracao}
        total={totalGeracao}
        timeRemaining={contagemRegressivaIA}
      />
    );
  }

  // Se tem parâmetros de URL e está na home, mostra loading enquanto inicia
  if (tipoUrl && tela === "home") {
    return <LoadingScreen current={progressoGeracao} total={totalGeracao} />;
  }

  if (tela === "home") {
    return (
      <SimuladoHome
        usuario={usuario}
        iniciarSimulado={iniciarSimulado}
        gerandoQuestoes={gerandoQuestoes}
        tipoPagina="maratona"
      />
    );
  }

  if (tela === "simulado" && simuladoAtual) {
    return (
      <CadernoProvaScreen
        simulado={simuladoAtual}
        cronometro={cronometro}
        tempoLimite={tempoLimite}
        usuario={usuario}
        onResponder={(questaoIdx, alternativaIdx) => {
          // Resposta direta sem confirmar — formato caderno de prova
          const questao = simuladoAtual.questoes[questaoIdx];
          const acertou = alternativaIdx === questao.correta;
          const novasRespostas = [...simuladoAtual.respostas];
          novasRespostas[questaoIdx] = {
            selecionada: alternativaIdx,
            correta: acertou,
          };
          setSimuladoAtual({
            ...simuladoAtual,
            respostas: novasRespostas,
          });
        }}
        onFinalizar={finalizarSimulado}
        onVoltar={voltarHome}
      />
    );
  }

  if (tela === "resultado" && simuladoAtual) {
    return (
      <ResultadoScreen
        simulado={simuladoAtual}
        cronometro={cronometro}
        usuario={usuario}
        voltarHome={() => router.push("/dashboard")}
        iniciarSimulado={iniciarSimulado}
      />
    );
  }

  return null;
}
