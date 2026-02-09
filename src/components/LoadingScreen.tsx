export default function LoadingScreen() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center ai-glow">
        <div className="mb-6">
          <div className="inline-block p-6 bg-purple-100 rounded-full animate-pulse">
            <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🤖 IA Gerando Questões
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          A Inteligência Artificial está criando questões personalizadas para você no estilo CESGRANRIO
          <span className="loading-dots"></span>
        </p>
        <div className="space-y-3 text-left bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-700">Analisando seu desempenho</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-700">Ajustando dificuldade</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-purple-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm text-gray-700">Criando questões inéditas...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
