import { GeminiProvider } from "./providers/gemini-provider";
import { FreeLLMProvider } from "./providers/freellm-provider";
import { AnthropicProvider } from "./providers/anthropic-provider";
import { AIProvider } from "./providers/base-provider";

export function getAIProvider(): AIProvider {
  const preferredProvider = process.env.AI_PROVIDER;
  console.log(`[AI-FACTORY] Provedor preferido: ${preferredProvider}`);

  // 1. Tentar o provedor preferido se definido no .env
  if (preferredProvider === "anthropic") {
    try { 
      console.log(`[AI-FACTORY] Tentando inicializar Anthropic...`);
      return new AnthropicProvider(); 
    } catch (e) { console.error("Falha ao iniciar Anthropic:", e); }
  } else if (preferredProvider === "gemini") {
    try { 
      console.log(`[AI-FACTORY] Tentando inicializar Gemini...`);
      return new GeminiProvider(); 
    } catch (e) { console.error("Falha ao iniciar Gemini:", e); }
  } else if (preferredProvider === "freellm") {
    try { 
      console.log(`[AI-FACTORY] Tentando inicializar FreeLLM...`);
      return new FreeLLMProvider(); 
    } catch (e) { console.error("Falha ao iniciar FreeLLM:", e); }
  } 

  // 2. Fallback por disponibilidade
  console.log(`[AI-FACTORY] Usando lógica de fallback...`);
  
  // Anthropic (Premium)
  if (process.env.ANTHROPIC_API_KEY) {
    try { 
      console.log(`[AI-FACTORY] Fallback: Tentando Anthropic...`);
      return new AnthropicProvider(); 
    } catch (e) {}
  }

  // Gemini Pro (Free Tier)
  if (process.env.GEMINI_API_KEY) {
    try { 
      console.log(`[AI-FACTORY] Fallback: Tentando Gemini...`);
      return new GeminiProvider(); 
    } catch (e) {}
  }

  // ApiFreeLLM
  if (process.env.FREE_LLM_API_KEY && process.env.FREE_LLM_API_KEY !== "YOUR_FREE_LLM_API_KEY_HERE") {
    try { 
      console.log(`[AI-FACTORY] Fallback: Tentando FreeLLM...`);
      return new FreeLLMProvider(); 
    } catch (e) {}
  }

  throw new Error("Nenhum provedor de IA configurado corretamente no .env.local");
}

