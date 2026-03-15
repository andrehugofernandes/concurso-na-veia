import { Questao } from "@/lib/types";
import { AIProvider, AIProviderOptions } from "./base-provider";

/**
 * Provider com fallback automático: tenta o primário e, se receber
 * Rate Limit (429), troca para o secundário pelo resto da sessão.
 */
export class FallbackProvider implements AIProvider {
  private primary: AIProvider;
  private fallback: AIProvider;
  private primaryName: string;
  private fallbackName: string;
  private useFallback = false;

  constructor(
    primary: AIProvider,
    fallback: AIProvider,
    primaryName: string,
    fallbackName: string,
  ) {
    this.primary = primary;
    this.fallback = fallback;
    this.primaryName = primaryName;
    this.fallbackName = fallbackName;
    console.log(`[FALLBACK] Configurado: ${primaryName} → ${fallbackName}`);
  }

  private isRateLimitError(error: any): boolean {
    const msg = error?.message || "";
    return (
      msg.includes("429") ||
      msg.toLowerCase().includes("rate limit") ||
      msg.toLowerCase().includes("quota exceeded") ||
      msg.toLowerCase().includes("too many requests")
    );
  }

  private getActiveProvider(): { provider: AIProvider; name: string } {
    if (this.useFallback) {
      return { provider: this.fallback, name: this.fallbackName };
    }
    return { provider: this.primary, name: this.primaryName };
  }

  async generateQuestion(options: AIProviderOptions): Promise<Questao> {
    const { provider, name } = this.getActiveProvider();

    try {
      return await provider.generateQuestion(options);
    } catch (error: any) {
      if (!this.useFallback && this.isRateLimitError(error)) {
        console.warn(
          `[FALLBACK] ${this.primaryName} atingiu Rate Limit. Trocando para ${this.fallbackName}...`,
        );
        this.useFallback = true;
        return await this.fallback.generateQuestion(options);
      }
      throw error;
    }
  }

  async generateQuestionsBatch(
    options: AIProviderOptions,
    quantity: number,
  ): Promise<Questao[]> {
    const { provider, name } = this.getActiveProvider();

    try {
      return await provider.generateQuestionsBatch(options, quantity);
    } catch (error: any) {
      if (!this.useFallback && this.isRateLimitError(error)) {
        console.warn(
          `[FALLBACK] ${this.primaryName} atingiu Rate Limit no batch. Trocando para ${this.fallbackName}...`,
        );
        this.useFallback = true;
        return await this.fallback.generateQuestionsBatch(options, quantity);
      }
      throw error;
    }
  }
}
