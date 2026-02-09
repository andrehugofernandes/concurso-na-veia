'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Usuario, Questao, Simulado } from '@/lib/types';
import { calcularNivel, salvarUsuario, carregarUsuario } from '@/lib/utils';
import HomeScreen from '@/components/HomeScreen';
import LoadingScreen from '@/components/LoadingScreen';
import SimuladoScreen from '@/components/SimuladoScreen';
import ResultadoScreen from '@/components/ResultadoScreen';

const usuarioInicial: Usuario = {
    nome: '',
    xp: 0,
    nivel: 'Estagiário',
    questoesCertas: 0,
    questoesErradas: 0,
    sequenciaAtual: 0,
    maiorSequencia: 0,
    conquistas: [],
    historico: [],
    questoesGeradas: 0,
};

export default function SimuladoPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tipoUrl = searchParams.get('tipo');
    const qtdUrl = searchParams.get('qtd');
    const dificuldadeUrl = searchParams.get('dificuldade');
    const assuntoUrl = searchParams.get('assunto');

    const [tela, setTela] = useState<'home' | 'gerando' | 'simulado' | 'resultado'>('home');
    const [usuario, setUsuario] = useState<Usuario>(usuarioInicial);
    const [simuladoAtual, setSimuladoAtual] = useState<Simulado | null>(null);
    const [questaoAtual, setQuestaoAtual] = useState(0);
    const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [cronometro, setCronometro] = useState(0);
    const [cronometroAtivo, setCronometroAtivo] = useState(false);
    const [gerandoQuestoes, setGerandoQuestoes] = useState(false);
    const [tempoLimite, setTempoLimite] = useState<number | null>(null); // em segundos
    const [tempoEsgotado, setTempoEsgotado] = useState(false);

    // Carregar dados
    useEffect(() => {
        const dadosSalvos = carregarUsuario();
        if (dadosSalvos) {
            setUsuario(dadosSalvos);
        }

        // Auto-start se vier parâmetros na URL
        if (tipoUrl && !simuladoAtual && tela === 'home') {
            iniciarSimulado(tipoUrl, qtdUrl ? parseInt(qtdUrl) : 5);
        }
    }, [tipoUrl, qtdUrl]);

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
                    setCronometro(prev => {
                        if (prev <= 1) {
                            setCronometroAtivo(false);
                            setTempoEsgotado(true);
                            return 0;
                        }
                        return prev - 1;
                    });
                } else {
                    // Timer progressivo
                    setCronometro(prev => prev + 1);
                }
            }, 1000);
        }
        return () => clearInterval(intervalo);
    }, [cronometroAtivo, tempoLimite]);

    // Efeito para encerrar prova quando tempo esgota
    useEffect(() => {
        if (tempoEsgotado && simuladoAtual && tela === 'simulado') {
            finalizarSimulado();
        }
    }, [tempoEsgotado]);

    const gerarQuestaoIA = async (materia: string, dificuldade?: string, assunto?: string): Promise<Questao> => {
        const cargoContexto = usuario.cargo;

        // Usar endpoint Gemini
        const response = await fetch('/api/gerar-questao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                materia,
                dificuldade,
                assunto,
                contexto: {
                    cargo: cargoContexto || 'Geral',
                    nivel: usuario.nivelConcurso || 'medio'
                }
            }),
        });

        if (!response.ok) {
            throw new Error('Erro ao gerar questão');
        }

        return await response.json();
    };

    const gerarQuestoes = async (tipo: string, quantidade: number): Promise<Questao[]> => {
        const questoes: Questao[] = [];
        let materiasEscolhidas: string[] = [];

        if (tipo === 'completo') {
            materiasEscolhidas = ['Língua Portuguesa', 'Matemática', 'Conhecimentos Específicos'];
        } else {
            materiasEscolhidas = [tipo];
        }

        const questoesPorMateria = Math.ceil(quantidade / materiasEscolhidas.length);

        for (const materia of materiasEscolhidas) {
            // Break early if we have enough questions
            if (questoes.length >= quantidade) break;

            for (let i = 0; i < questoesPorMateria; i++) {
                if (questoes.length >= quantidade) break;

                try {
                    let dificuldade = dificuldadeUrl || undefined;

                    // If not specified in URL, auto-adjust based on performance logic
                    if (!dificuldade) {
                        const taxaAcerto = usuario.questoesCertas / (usuario.questoesCertas + usuario.questoesErradas || 1);
                        if (taxaAcerto > 0.8) dificuldade = 'Difícil';
                        else if (taxaAcerto > 0.6) dificuldade = 'Média';
                        else if (taxaAcerto < 0.5) dificuldade = 'Fácil';
                    }

                    const questao = await gerarQuestaoIA(materia, dificuldade, assuntoUrl || undefined);
                    questoes.push(questao);
                } catch (error) {
                    console.error(`Erro ao gerar questão ${i + 1}:`, error);
                }
            }
        }

        return questoes;
    };

    const iniciarSimulado = async (tipo: string, quantidade: number = 5) => {
        setGerandoQuestoes(true);
        setTela('gerando');

        try {
            // Free Tier Check
            if (usuario.plan === 'free') {
                const hoje = new Date().toISOString().split('T')[0];
                const tentativasHoje = usuario.historico.filter(h =>
                    h.data.startsWith(hoje) && h.tipo === tipo
                ).length;

                if (tentativasHoje >= 1) {
                    throw new Error('Usuários gratuitos têm limite de 1 simulado por matéria por dia. Faça upgrade para tentativas ilimitadas! 🚀');
                }
            }

            const questoes = await gerarQuestoes(tipo, quantidade);

            if (questoes.length === 0) {
                throw new Error('Nenhuma questão foi gerada. Verifique sua conexão ou tente novamente.');
            }

            setSimuladoAtual({
                tipo,
                questoes,
                respostas: new Array(questoes.length).fill(null),
                iniciado: Date.now()
            });

            setUsuario(prev => ({
                ...prev,
                questoesGeradas: prev.questoesGeradas + questoes.length
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
            setTela('simulado');
        } catch (error: any) {
            console.error('Erro ao iniciar simulado:', error);
            setGerandoQuestoes(false);
            setTela('home');
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
            correta: acertou
        };

        setSimuladoAtual({
            ...simuladoAtual,
            respostas: novasRespostas
        });

        let novoXP = usuario.xp;
        let novaSequencia = usuario.sequenciaAtual;
        let novasConquistas = [...usuario.conquistas];

        if (acertou) {
            novoXP += 10;
            novaSequencia += 1;

            if (novaSequencia === 10 && !novasConquistas.includes('combo10')) {
                novoXP += 50;
                novasConquistas.push('combo10');
                setTimeout(() => alert('🎉 COMBO! +50 XP por 10 acertos seguidos!'), 500);
            }

            setUsuario({
                ...usuario,
                xp: novoXP,
                questoesCertas: usuario.questoesCertas + 1,
                sequenciaAtual: novaSequencia,
                maiorSequencia: Math.max(novaSequencia, usuario.maiorSequencia),
                nivel: calcularNivel(novoXP),
                conquistas: novasConquistas
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
                nivel: calcularNivel(novoXP)
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

        const totalAcertos = simuladoAtual.respostas.filter(r => r && r.correta).length;
        const totalQuestoes = simuladoAtual.questoes.length;
        const percentual = Math.round((totalAcertos / totalQuestoes) * 100);

        let bonusXP = 200;
        if (percentual >= 90) bonusXP += 100;
        else if (percentual >= 80) bonusXP += 50;

        const novoHistorico = [...usuario.historico, {
            data: new Date().toISOString(),
            tipo: simuladoAtual.tipo,
            acertos: totalAcertos,
            total: totalQuestoes,
            percentual,
            tempo: cronometro
        }];

        setUsuario({
            ...usuario,
            xp: usuario.xp + bonusXP,
            historico: novoHistorico,
        });

        setTela('resultado');
    };

    const voltarHome = () => {
        // Se veio do dashboard, volta pro dashboard
        if (tipoUrl) {
            router.push('/dashboard');
        } else {
            setTela('home');
            setSimuladoAtual(null);
            setQuestaoAtual(0);
            setCronometro(0);
            setCronometroAtivo(false);
        }
    };

    if (tela === 'gerando') {
        return <LoadingScreen />;
    }

    // Se tem parâmetros de URL e está na home, mostra loading enquanto inicia
    if (tipoUrl && tela === 'home') {
        return <LoadingScreen />;
    }

    if (tela === 'home') {
        return (
            <HomeScreen
                usuario={usuario}
                setUsuario={setUsuario}
                iniciarSimulado={iniciarSimulado}
                gerandoQuestoes={gerandoQuestoes}
            />
        );
    }

    if (tela === 'simulado' && simuladoAtual) {
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

    if (tela === 'resultado' && simuladoAtual) {
        return (
            <ResultadoScreen
                simulado={simuladoAtual}
                cronometro={cronometro}
                usuario={usuario}
                voltarHome={() => router.push('/dashboard')}
                iniciarSimulado={iniciarSimulado}
            />
        );
    }

    return null;
}
