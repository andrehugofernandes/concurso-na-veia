import { GeminiProvider } from "./providers/gemini-provider";
import { FreeLLMProvider } from "./providers/freellm-provider";
import { FallbackProvider } from "./providers/fallback-provider";
import { AIProvider } from "./providers/base-provider";

// Singleton: mantém o fallback ativo durante toda a sessão do servidor
let cachedProvider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (cachedProvider) return cachedProvider;

  const preferredProvider = process.env.AI_PROVIDER;
  console.log(`[AI-FACTORY] Provedor preferido: ${preferredProvider}`);

  const hasGemini = !!process.env.GEMINI_API_KEY;
  const hasFreeLLM =
    !!process.env.FREE_LLM_API_KEY &&
    process.env.FREE_LLM_API_KEY !== "YOUR_FREE_LLM_API_KEY_HERE";

  // Se ambos estão disponíveis, usar FallbackProvider (Gemini → FreeLLM)
  if (hasGemini && hasFreeLLM) {
    try {
      const gemini = new GeminiProvider();
      const freellm = new FreeLLMProvider();
      console.log(
        `[AI-FACTORY] Usando FallbackProvider: Gemini → FreeLLM`,
      );
      cachedProvider = new FallbackProvider(gemini, freellm, "Gemini", "FreeLLM");
      return cachedProvider;
    } catch (e) {
      console.error("[AI-FACTORY] Erro ao criar FallbackProvider:", e);
    }
  }

  // Fallback: apenas um provider disponível
  if (hasGemini) {
    try {
      console.log(`[AI-FACTORY] Usando apenas Gemini`);
      cachedProvider = new GeminiProvider();
      return cachedProvider;
    } catch (e) {
      console.error("Falha ao iniciar Gemini:", e);
    }
  }

  if (hasFreeLLM) {
    try {
      console.log(`[AI-FACTORY] Usando apenas FreeLLM`);
      cachedProvider = new FreeLLMProvider();
      return cachedProvider;
    } catch (e) {
      console.error("Falha ao iniciar FreeLLM:", e);
    }
  }

  throw new Error(
    "Nenhum provedor de IA (Gemini ou FreeLLM) configurado corretamente no .env.local",
  );
}
