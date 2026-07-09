import { GeminiProvider } from "./providers/gemini-provider";
import { FreeLLMProvider } from "./providers/freellm-provider";
import { OpenAIProvider } from "./providers/openai-provider";
import { AnthropicProvider } from "./providers/anthropic-provider";
import { FallbackProvider } from "./providers/fallback-provider";
import { AIProvider } from "./providers/base-provider";

// Singleton: mantém o provedor ativo durante toda a sessão do servidor
let cachedProvider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (cachedProvider) return cachedProvider;

  const providers: { name: string; provider: AIProvider }[] = [];

  // 1. Gemini (Nativo) - Main provider as requested
  if (
    process.env.GEMINI_API_KEY &&
    process.env.GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY_HERE"
  ) {
    try {
      providers.push({
        name: "Gemini Nativo",
        provider: new GeminiProvider(),
      });
    } catch (e) {
      console.error("[AI-FACTORY] Erro ao carregar Gemini Nativo:", e);
    }
  }

  // 2. FreeLLM (Custom API Free LLM)
  if (
    process.env.FREE_LLM_API_KEY &&
    process.env.FREE_LLM_API_KEY !== "YOUR_FREE_LLM_API_KEY_HERE"
  ) {
    try {
      providers.push({
        name: "Free LLM",
        provider: new FreeLLMProvider(),
      });
    } catch (e) {
      console.error("[AI-FACTORY] Erro ao carregar FreeLLM:", e);
    }
  }

  // 2. DeepSeek
  if (process.env.DEEPSEEK_API_KEY) {
    try {
      providers.push({
        name: "DeepSeek",
        provider: new OpenAIProvider(
          "DeepSeek",
          "https://api.deepseek.com/v1",
          process.env.DEEPSEEK_API_KEY,
          "deepseek-chat"
        ),
      });
    } catch (e) {
      console.error("[AI-FACTORY] Erro ao carregar DeepSeek:", e);
    }
  }

  // 3. SiliconFlow (DeepSeek-V3 grátis)
  if (process.env.SILICONFLOW_API_KEY) {
    try {
      providers.push({
        name: "SiliconFlow",
        provider: new OpenAIProvider(
          "SiliconFlow",
          "https://api.siliconflow.cn/v1",
          process.env.SILICONFLOW_API_KEY,
          "deepseek-ai/DeepSeek-V3"
        ),
      });
    } catch (e) {
      console.error("[AI-FACTORY] Erro ao carregar SiliconFlow:", e);
    }
  }

  // 4. Qwen / DashScope (Alibaba)
  if (process.env.DASHSCOPE_API_KEY) {
    try {
      providers.push({
        name: "Qwen/DashScope",
        provider: new OpenAIProvider(
          "Qwen/DashScope",
          "https://dashscope.aliyuncs.com/compatible-mode/v1",
          process.env.DASHSCOPE_API_KEY,
          "qwen-turbo"
        ),
      });
    } catch (e) {
      console.error("[AI-FACTORY] Erro ao carregar Qwen/DashScope:", e);
    }
  }

  // 5. Zhipu GLM
  if (process.env.ZHIPU_API_KEY) {
    try {
      providers.push({
        name: "Zhipu GLM",
        provider: new OpenAIProvider(
          "Zhipu GLM",
          "https://open.bigmodel.cn/api/paas/v4",
          process.env.ZHIPU_API_KEY,
          "glm-4-flash"
        ),
      });
    } catch (e) {
      console.error("[AI-FACTORY] Erro ao carregar Zhipu GLM:", e);
    }
  }

  // 6. Groq (se configurado)
  if (process.env.GROQ_API_KEY) {
    try {
      providers.push({
        name: "Groq",
        provider: new OpenAIProvider(
          "Groq",
          "https://api.groq.com/openai/v1",
          process.env.GROQ_API_KEY,
          "llama-3.1-8b-instant"
        ),
      });
    } catch (e) {
      console.error("[AI-FACTORY] Erro ao carregar Groq:", e);
    }
  }

  // 7. OpenRouter (se configurado)
  if (process.env.OPENROUTER_API_KEY) {
    try {
      providers.push({
        name: "OpenRouter",
        provider: new OpenAIProvider(
          "OpenRouter",
          "https://openrouter.ai/api/v1",
          process.env.OPENROUTER_API_KEY,
          "meta-llama/llama-3.3-70b-instruct:free"
        ),
      });
    } catch (e) {
      console.error("[AI-FACTORY] Erro ao carregar OpenRouter:", e);
    }
  }

  // 8. Anthropic (Claude)
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      providers.push({
        name: "Anthropic",
        provider: new AnthropicProvider(),
      });
    } catch (e) {
      console.error("[AI-FACTORY] Erro ao carregar Anthropic:", e);
    }
  }

  if (providers.length === 0) {
    throw new Error(
      "Nenhum provedor de IA configurado corretamente no .env.local"
    );
  }

  // Se tiver apenas 1 provedor, retorna ele diretamente
  if (providers.length === 1) {
    cachedProvider = providers[0].provider;
    return cachedProvider;
  }

  // Embrulha tudo na esteira de FallbackProvider
  cachedProvider = new FallbackProvider(providers);
  return cachedProvider;
}
