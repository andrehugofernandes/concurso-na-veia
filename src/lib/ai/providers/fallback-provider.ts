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

  private isProviderError(error: any): boolean {
    if (!error) return false;
    const msg = String(error.message || error).toLowerCase();
    // Se for erro de JSON.parse em resposta vazia/malformada do provider, também faz fallback
    if (msg.includes("unexpected token") || msg.includes("json")) {
      return true;
    }
    // Não faz fallback se for erro explícito do nosso próprio código interno sem relação com o provider
    return true; 
  }

  async generateQuestion(options: AIProviderOptions): Promise<Questao> {
    let lastError: any;

    for (let i = 0; i < this.providers.length; i++) {
      const idx = (this.activeIndex + i) % this.providers.length;
      const { name, provider } = this.providers[idx];
      try {
        console.log(`[FALLBACK] Tentando gerar questão via ${name}...`);
        const questao = await provider.generateQuestion(options);
        
        // Mantém esse provedor ativo como padrão
        this.activeIndex = idx;
        return questao;
      } catch (error: any) {
        lastError = error;
        console.warn(`[FALLBACK] Provedor ${name} falhou (${error?.message || error}). Tentando próximo provedor...`);
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

    for (let i = 0; i < this.providers.length; i++) {
      const idx = (this.activeIndex + i) % this.providers.length;
      const { name, provider } = this.providers[idx];
      try {
        console.log(`[FALLBACK] Tentando gerar lote de ${quantity} questões via ${name}...`);
        const questoes = await provider.generateQuestionsBatch(options, quantity);
        
        this.activeIndex = idx;
        return questoes;
      } catch (error: any) {
        lastError = error;
        console.warn(`[FALLBACK-BATCH] Provedor ${name} falhou (${error?.message || error}). Tentando próximo...`);
      }
    }

    if (this.activeIndex > 0) {
      this.activeIndex = 0;
    }

    throw new Error(`[FALLBACK-CRÍTICO] Todos os provedores falharam em gerar o lote. Último erro: ${lastError?.message}`);
  }

  async generateResponse(prompt: string, systemInstruction?: string): Promise<string> {
    let lastError: any;

    for (let i = 0; i < this.providers.length; i++) {
      const idx = (this.activeIndex + i) % this.providers.length;
      const { name, provider } = this.providers[idx];
      if (provider.generateResponse) {
        try {
          console.log(`[FALLBACK] Tentando gerar resposta de texto via ${name}...`);
          const text = await provider.generateResponse(prompt, systemInstruction);
          this.activeIndex = idx;
          return text;
        } catch (error: any) {
          lastError = error;
          console.warn(`[FALLBACK] Provedor ${name} falhou em generateResponse (${error?.message || error}). Tentando próximo...`);
        }
      }
    }

    if (this.activeIndex > 0) {
      this.activeIndex = 0;
    }

    throw new Error(`[FALLBACK-CRÍTICO] Todos os provedores falharam em gerar a resposta. Último erro: ${lastError?.message}`);
  }
}
