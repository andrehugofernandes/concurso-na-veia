import { Questao } from "@/lib/types";
import { AIProvider, AIProviderOptions } from "./base-provider";

/**
 * Provedor em cascata (Fallback automático):
 * Tenta os provedores configurados sequencialmente. Se um deles falhar com
 * erro de rede ou limite de taxa (429), avança automaticamente para o próximo.
 */
export class FallbackProvider implements AIProvider {
  private providers: { name: string; provider: AIProvider }[];
  private activeIndex = 0;

  constructor(providers: { name: string; provider: AIProvider }[]) {
    this.providers = providers.filter(p => !!p.provider);
    console.log(
      `[FALLBACK] Configurado com ${this.providers.length} provedores: ${this.providers
        .map((p) => p.name)
        .join(" -> ")}`
    );
  }

  private isRateLimitOrNetworkError(error: any): boolean {
    const msg = error?.message || "";
    return (
      msg.includes("429") ||
      msg.toLowerCase().includes("rate limit") ||
      msg.toLowerCase().includes("quota exceeded") ||
      msg.toLowerCase().includes("too many requests") ||
      msg.toLowerCase().includes("fetch failed") ||
      msg.toLowerCase().includes("timeout") ||
      msg.toLowerCase().includes("bad gateway") ||
      msg.toLowerCase().includes("service unavailable")
    );
  }

  async generateQuestion(options: AIProviderOptions): Promise<Questao> {
    let lastError: any;

    for (let i = this.activeIndex; i < this.providers.length; i++) {
      const { name, provider } = this.providers[i];
      try {
        console.log(`[FALLBACK] Tentando gerar questão via ${name}...`);
        const questao = await provider.generateQuestion(options);
        
        // Mantém esse provedor ativo como padrão
        this.activeIndex = i;
        return questao;
      } catch (error: any) {
        lastError = error;
        if (this.isRateLimitOrNetworkError(error)) {
          console.warn(`[FALLBACK] Provedor ${name} falhou (Rate Limit/Rede). Passando para o próximo da fila...`);
          continue;
        }
        // Se for erro de parsing de JSON ou sintático, joga direto pra depuração rápida
        throw error;
      }
    }

    // Se todos falharem, tentar voltar do início caso as cotas tenham resetado
    if (this.activeIndex > 0) {
      console.log("[FALLBACK] Resetando fila de provedores para tentar do início...");
      this.activeIndex = 0;
    }

    throw new Error(`[FALLBACK-CRÍTICO] Todos os provedores falharam em gerar a questão. Último erro: ${lastError?.message}`);
  }

  async generateQuestionsBatch(
    options: AIProviderOptions,
    quantity: number,
  ): Promise<Questao[]> {
    let lastError: any;

    for (let i = this.activeIndex; i < this.providers.length; i++) {
      const { name, provider } = this.providers[i];
      try {
        console.log(`[FALLBACK] Tentando gerar lote de ${quantity} questões via ${name}...`);
        const questoes = await provider.generateQuestionsBatch(options, quantity);
        
        this.activeIndex = i;
        return questoes;
      } catch (error: any) {
        lastError = error;
        if (this.isRateLimitOrNetworkError(error)) {
          console.warn(`[FALLBACK-BATCH] Provedor ${name} falhou. Passando para o próximo...`);
          continue;
        }
        throw error;
      }
    }

    if (this.activeIndex > 0) {
      this.activeIndex = 0;
    }

    throw new Error(`[FALLBACK-CRÍTICO] Todos os provedores falharam em gerar o lote. Último erro: ${lastError?.message}`);
  }
}
