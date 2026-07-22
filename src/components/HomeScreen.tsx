import { useState } from 'react';
import { Usuario, TipoSimulado } from '@/lib/types';
import { CARGOS, Cargo } from '@/data/cargos';

interface Props {
  usuario: Usuario;
  setUsuario: (usuario: Usuario) => void;
  iniciarSimulado: (tipo: TipoSimulado, quantidade: number) => void;
  gerandoQuestoes: boolean;
}

export default function HomeScreen({ usuario, setUsuario, iniciarSimulado, gerandoQuestoes }: Props) {
  const [etapa, setEtapa] = useState<'nome' | 'nivel' | 'cargo' | 'dashboard'>('dashboard');

  // Verify if user has all necessary info
  if (!usuario.nome) {
    if (etapa !== 'nome') setEtapa('nome');
  } else if (!usuario.nivelConcurso) {
    if (etapa !== 'nivel') setEtapa('nivel');
  } else if (!usuario.cargo) {
    if (etapa !== 'cargo') setEtapa('cargo');
  }

  const handleNomeSubmit = (nome: string) => {
    setUsuario({ ...usuario, nome });
    setEtapa('nivel');
  };

  const handleNivelSelect = (nivel: 'medio' | 'superior') => {
    setUsuario({ ...usuario, nivelConcurso: nivel });
    setEtapa('cargo');
  };

  const handleCargoSelect = (cargoId: string) => {
    setUsuario({ ...usuario, cargo: cargoId });
    setEtapa('dashboard');
  };

  const cargoSelecionado = CARGOS.find(c => c.id === usuario.cargo);
  const materiasBasicas = cargoSelecionado?.materiasBasicas || [];
  const materiasEspecificas = cargoSelecionado?.materiasEspecificas || [];

  // Render Screens based on 'etapa'
  if (etapa === 'nome') {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-6">🤖 Concurso Na Veia AI</h1>
          <p className="text-gray-600 text-center mb-6">Digite seu nome para começar:</p>
          <input
            type="text"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
            placeholder="Seu nome"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                handleNomeSubmit(e.currentTarget.value);
              }
            }}
            autoFocus
          />
        </div>
      </div>
    );
  }

  if (etapa === 'nivel') {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-center mb-2">Qual seu nível de escolaridade?</h1>
          <p className="text-gray-500 text-center mb-8">Baseado no concurso Petrobras 2024/2026</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => handleNivelSelect('medio')}
              className="p-6 border-2 border-purple-100 hover:border-purple-500 rounded-xl hover:bg-purple-50 transition flex flex-col items-center gap-4 group"
            >
              <span className="text-6xl group-hover:scale-110 transition">🔧</span>
              <span className="text-xl font-bold text-gray-800">Nível Técnico</span>
              <span className="text-sm text-gray-500">Operação, Manutenção, Segurança...</span>
            </button>
            <button
              onClick={() => handleNivelSelect('superior')}
              className="p-6 border-2 border-blue-100 hover:border-blue-500 rounded-xl hover:bg-blue-50 transition flex flex-col items-center gap-4 group"
            >
              <span className="text-6xl group-hover:scale-110 transition">🎓</span>
              <span className="text-xl font-bold text-gray-800">Nível Superior</span>
              <span className="text-sm text-gray-500">Engenharias, Administração, TI...</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (etapa === 'cargo') {
    const cargosDisponiveis = CARGOS.filter(c => c.nivel === usuario.nivelConcurso);

    return (
      <div className="min-h-screen gradient-bg py-12 px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setEtapa('nivel')} className="text-gray-400 hover:text-gray-600">
              ← Voltar
            </button>
            <h1 className="text-3xl font-bold text-center flex-1">Escolha seu Cargo</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cargosDisponiveis.map(cargo => (
              <button
                key={cargo.id}
                onClick={() => handleCargoSelect(cargo.id)}
                className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition text-left"
              >
                <h3 className="font-bold text-gray-800">{cargo.nome}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {cargo.materiasEspecificas.length} matérias específicas
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const taxaAcerto = usuario.questoesCertas + usuario.questoesErradas > 0
    ? Math.round((usuario.questoesCertas / (usuario.questoesCertas + usuario.questoesErradas)) * 100)
    : 0;

  return (
    <div className="min-h-screen gradient-bg">
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Concurso Na Veia AI</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-purple-100 text-purple-700 px-3 py-0.5 rounded-full text-sm font-medium">
                  {cargoSelecionado?.nome}
                </span>
                <button onClick={() => setUsuario({ ...usuario, cargo: undefined })} className="text-xs text-gray-400 hover:text-purple-600 underline">
                  Alterar
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{usuario.nome}</p>
              <p className="text-purple-600 font-semibold">{usuario.nivel}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm">XP Total</p>
            <p className="text-3xl font-bold text-purple-600">{usuario.xp}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm">Taxa</p>
            <p className="text-3xl font-bold text-green-600">{taxaAcerto}%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm">Sequência</p>
            <p className="text-3xl font-bold text-orange-600">{usuario.sequenciaAtual}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm">Conquistas</p>
            <p className="text-3xl font-bold text-yellow-600">{usuario.conquistas.length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg p-6 text-white">
            <p className="text-purple-100 text-sm">IA Geradas</p>
            <p className="text-3xl font-bold">{usuario.questoesGeradas}</p>
          </div>
        </div>

        {/* Destaque IA */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-2xl p-6 text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-2">🤖 Plano de Estudo IA</h3>
            <p className="text-purple-100 mb-4">Questões personalizadas para {cargoSelecionado?.nome}.</p>
            <div className="flex gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Foco: CESGRANRIO</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Adaptativo</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
            <h3 className="font-bold text-gray-800 mb-2">Próximo Objetivo</h3>
            <p className="text-sm text-gray-600 mb-4">Acerte 10 questões seguidas de Conhecimentos Específicos para ganhar +100XP!</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>
        </div>

        {/* Matérias Básicas */}
        <h2 className="text-2xl font-bold text-white mb-4 neon-text">📚 Conhecimentos Básicos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {materiasBasicas.map((materia) => (
            <div key={materia.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="bg-blue-50 p-4 border-b border-blue-100">
                <h3 className="font-bold text-gray-800">{materia.nome}</h3>
              </div>
              <div className="p-4">
                <button
                  onClick={() => iniciarSimulado(materia.id as TipoSimulado, 5)}
                  disabled={gerandoQuestoes}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50"
                >
                  Praticar (5 min)
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Conhecimentos Específicos */}
        <h2 className="text-2xl font-bold text-white mb-4 neon-text">🎯 Conhecimentos Específicos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {materiasEspecificas.map((materia) => (
            <div key={materia.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border-t-4 border-green-500">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{materia.nome}</h3>
                  <span className="text-2xl">🔧</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">Peso {materia.peso} no edital</p>
                <button
                  onClick={() => iniciarSimulado(materia.id as TipoSimulado, 5)}
                  disabled={gerandoQuestoes}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  Gerar Questões IA
                </button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-4 neon-text">🔥 Simulados Intensivos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-4 border-purple-400">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
              <div className="text-4xl mb-2">🚀</div>
              <h3 className="text-2xl font-bold">Simulado Completo</h3>
              <p className="opacity-90">Todas as matérias do seu cargo</p>
            </div>
            <div className="p-6">
              <button
                onClick={() => iniciarSimulado('completo', 20)}
                disabled={gerandoQuestoes}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                Gerar 20 Questões
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
