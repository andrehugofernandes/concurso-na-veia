"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Usuario, Questao, Simulado } from "@/lib/types";
import { calcularNivel, salvarUsuario, carregarUsuario } from "@/lib/utils";
import LoadingScreen from "@/components/LoadingScreen";
import SimuladoScreen from "@/components/SimuladoScreen";
import ResultadoScreen from "@/components/ResultadoScreen";
import SimuladoHome from "@/components/simulados/SimuladoHome";
import { CONTEUDO_MATERIAS } from "@/data/conteudo";
import { ActionResponse } from "@/lib/actions/safe-action";
import { gerarQuestaoAction } from "@/lib/actions/questoes";
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
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(
    null,
  );
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [cronometro, setCronometro] = useState(0);
  const [cronometroAtivo, setCronometroAtivo] = useState(false);
  const [gerandoQuestoes, setGerandoQuestoes] = useState(false);
  const [progressoGeracao, setProgressoGeracao] = useState(0);
  const [totalGeracao, setTotalGeracao] = useState(0);
  const [tempoLimite, setTempoLimite] = useState<number | null>(null); // em segundos
  const [tempoEsgotado, setTempoEsgotado] = useState(false);

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

  // Efeito para encerrar prova quando tempo esgota
  useEffect(() => {
    if (tempoEsgotado && simuladoAtual && tela === "simulado") {
      finalizarSimulado();
    }
  }, [tempoEsgotado]);

  const gerarQuestaoIA = async (
    materia: string,
    dificuldade?: string,
    assunto?: string,
    questoesAnteriores?: string[],
  ): Promise<Questao> => {
    const cargoContexto = usuario.cargo;

    const result = await gerarQuestaoAction({
      materia,
      dificuldade: (dificuldade as any) || "Média",
      assunto,
      questoesAnteriores,
      contexto: {
        cargo: cargoContexto || "Geral",
        nivel: usuario.nivelConcurso || "medio",
      },
    });

    if (result.status === "error") {
      console.error(`[FRONTEND] Erro na Server Action:`, result.error);
      throw new Error(result.error || "Erro ao gerar questão");
    }

    if (!result.data) {
      throw new Error("Não foi possível obter os dados da questão.");
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

    // Loop de geração
    for (const item of distribuicao) {
      for (let i = 0; i < item.qtd; i++) {
        // Break early if global quantity reached (safety)
        if (questoes.length >= quantidade) break;

        try {
          let dificuldade = dificuldadeManual || dificuldadeUrl || undefined;

          // Ajuste automático de dificuldade se não especificado
          if (!dificuldade) {
            const taxaAcerto =
              usuario.questoesCertas /
              (usuario.questoesCertas + usuario.questoesErradas || 1);
            if (taxaAcerto > 0.8) dificuldade = "Difícil";
            else if (taxaAcerto > 0.6) dificuldade = "Média";
            else if (taxaAcerto < 0.5) dificuldade = "Fácil";
          }

          const questoesAnteriores = questoes.map((q) =>
            q.enunciado.substring(0, 80),
          );

          // Delay maior para evitar rate limit (1500ms entre requisições)
          if (questoes.length > 0) await new Promise((r) => setTimeout(r, 1500));

          const questao = await gerarQuestaoIA(
            item.materia,
            dificuldade,
            item.assunto,
            questoesAnteriores,
          );
          questoes.push(questao);
          setProgressoGeracao(questoes.length);
        } catch (error) {
          console.error(
            `Erro ao gerar questão ${i + 1} de ${item.materia}:`,
            error,
          );
          // Retentativa simples
          try {
            const questao = await gerarQuestaoIA(
              item.materia,
              "Média",
              item.assunto,
              [],
            );
            questoes.push(questao);
            setProgressoGeracao(questoes.length);
          } catch (retryError) {
            console.error("Falha na retentativa:", retryError);
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

      setQuestaoAtual(0);
      setRespostaSelecionada(null);
      setMostrarResultado(false);
      setTempoEsgotado(false);

      // Configurar timer: 4 horas para simulados de 60+ questões
      if (quantidade >= 60) {
        setTempoLimite(4 * 60 * 60); // 4 horas em segundos
        setCronometro(4 * 60 * 60); // Iniciar do tempo máximo
      } else {
        setTempoLimite(null);
        setCronometro(0); // Timer progressivo
      }

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

  const responderQuestao = (indiceResposta: number) => {
    if (mostrarResultado) return;
    setRespostaSelecionada(indiceResposta);
  };

  const confirmarResposta = () => {
    if (respostaSelecionada === null || !simuladoAtual) return;

    const questao = simuladoAtual.questoes[questaoAtual];
    const acertou = respostaSelecionada === questao.correta;

    const novasRespostas = [...simuladoAtual.respostas];
    novasRespostas[questaoAtual] = {
      selecionada: respostaSelecionada,
      correta: acertou,
    };

    setSimuladoAtual({
      ...simuladoAtual,
      respostas: novasRespostas,
    });

    let novoXP = usuario.xp;
    let novaSequencia = usuario.sequenciaAtual;
    let novasConquistas = [...usuario.conquistas];

    if (acertou) {
      novoXP += 10;
      novaSequencia += 1;

      if (novaSequencia === 10 && !novasConquistas.includes("combo10")) {
        novoXP += 50;
        novasConquistas.push("combo10");
        setTimeout(
          () => alert("🎉 COMBO! +50 XP por 10 acertos seguidos!"),
          500,
        );
      }

      setUsuario({
        ...usuario,
        xp: novoXP,
        questoesCertas: usuario.questoesCertas + 1,
        sequenciaAtual: novaSequencia,
        maiorSequencia: Math.max(novaSequencia, usuario.maiorSequencia),
        nivel: calcularNivel(novoXP),
        conquistas: novasConquistas,
      });
    } else {
      if (novaSequencia > 0) {
        novoXP = Math.max(0, novoXP - 20);
      }
      novaSequencia = 0;

      setUsuario({
        ...usuario,
        xp: novoXP,
        questoesErradas: usuario.questoesErradas + 1,
        sequenciaAtual: 0,
        nivel: calcularNivel(novoXP),
      });
    }

    setMostrarResultado(true);
  };

  const proximaQuestao = () => {
    if (!simuladoAtual) return;

    if (questaoAtual < simuladoAtual.questoes.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
      setRespostaSelecionada(null);
      setMostrarResultado(false);
    } else {
      finalizarSimulado();
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
      setQuestaoAtual(0);
      setCronometro(0);
      setCronometroAtivo(false);
    }
  };

  if (tela === "gerando") {
    return <LoadingScreen current={progressoGeracao} total={totalGeracao} />;
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
      <SimuladoScreen
        simulado={simuladoAtual}
        questaoAtual={questaoAtual}
        respostaSelecionada={respostaSelecionada}
        mostrarResultado={mostrarResultado}
        cronometro={cronometro}
        tempoLimite={tempoLimite}
        usuario={usuario}
        responderQuestao={responderQuestao}
        confirmarResposta={confirmarResposta}
        proximaQuestao={proximaQuestao}
        voltarHome={voltarHome}
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
