import { GeminiProvider } from "./providers/gemini-provider";
import { FreeLLMProvider } from "./providers/freellm-provider";
import { AIProvider } from "./providers/base-provider";

// Singleton: mantém o provedor ativo durante toda a sessão do servidor
let cachedProvider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (cachedProvider) return cachedProvider;

  const hasGemini = !!process.env.GEMINI_API_KEY && 
                    process.env.GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY_HERE";
  
  const hasFreeLLM = !!process.env.FREE_LLM_API_KEY &&
                     process.env.FREE_LLM_API_KEY !== "YOUR_FREE_LLM_API_KEY_HERE";

  console.log(`[AI-FACTORY] Verificando provedores: Gemini=${hasGemini}, FreeLLM=${hasFreeLLM}`);

  // Prioridade 1: Gemini 2.5 Flash (Muito mais rápido e gratuito com limites altos)
  // Resolvemos remover o FallbackProvider automático para evitar o delay de 25s do FreeLLM
  if (hasGemini) {
    try {
      console.log(`[AI-FACTORY] Ativando Gemini 2.5 Flash como Provedor Principal`);
      cachedProvider = new GeminiProvider();
      return cachedProvider;
    } catch (e) {
      console.error("[AI-FACTORY] Falha ao iniciar Gemini:", e);
    }
  }

  // Prioridade 2: FreeLLM (Apenas se o Gemini não estiver configurado)
  if (hasFreeLLM) {
    try {
      console.log(`[AI-FACTORY] Ativando FreeLLM como Provedor de Backup`);
      cachedProvider = new FreeLLMProvider();
      return cachedProvider;
    } catch (e) {
      console.error("[AI-FACTORY] Falha ao iniciar FreeLLM:", e);
    }
  }

  throw new Error(
    "Nenhum provedor de IA (Gemini ou FreeLLM) configurado corretamente no .env.local"
  );
}
