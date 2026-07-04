/**
 * API Route: Geração de Podcast do Módulo
 *
 * POST /api/podcast/generate
 *
 * Recebe os dados de um módulo de aula e retorna:
 * - Script (roteiro) do podcast em formato de entrevista
 * - Áudio sintetizado via Gemini TTS (quando disponível)
 * - Transcrição completa
 */

import { NextRequest, NextResponse } from "next/server";
import {
  generatePodcast,
  generatePodcastScript,
  type PodcastModuleInput,
} from "@/lib/ai/podcast-generator";
import { getProfessor } from "@/data/podcast-professors";

export const maxDuration = 60; // Timeout de 60s

export async function POST(request: NextRequest) {
  console.log("\n==================================================");
  console.log("[API/Podcast] 🎙️ Recebida chamada POST em /api/podcast/generate");
  console.log("==================================================");

  try {
    const body = await request.json();

    const {
      aulaId,
      aulaTitulo,
      materia,
      materiaId,
      moduloNumero,
      moduloTitulo,
      conteudoResumo,
      scriptOnly = false,
    } = body;

    console.log("[API/Podcast] 📋 Dados do payload:", {
      aulaId,
      aulaTitulo,
      materia,
      materiaId,
      moduloNumero,
      moduloTitulo,
      tamanhoResumo: conteudoResumo ? conteudoResumo.length : 0,
      scriptOnly
    });

    // Validação básica
    if (!aulaTitulo || !materia || !moduloNumero || !moduloTitulo) {
      console.warn("[API/Podcast] ❌ Validação falhou: Campos obrigatórios ausentes");
      return NextResponse.json(
        {
          error:
            "Campos obrigatórios: aulaTitulo, materia, moduloNumero, moduloTitulo",
        },
        { status: 400 },
      );
    }

    if (!conteudoResumo || conteudoResumo.trim().length < 50) {
      console.warn("[API/Podcast] ❌ Validação falhou: conteudoResumo muito curto (<50 caracteres)");
      return NextResponse.json(
        {
          error:
            "conteudoResumo deve ter pelo menos 50 caracteres de conteúdo",
        },
        { status: 400 },
      );
    }

    // Buscar professor virtual adequado
    const professor = getProfessor(materiaId || materia.toLowerCase(), aulaId);
    console.log(`[API/Podcast] 👨‍🏫 Professor selecionado: ${professor.nome} (${professor.area} - ${professor.inspiracao})`);

    const input: PodcastModuleInput = {
      aulaId: aulaId || aulaTitulo.toLowerCase().replace(/\s+/g, "-"),
      aulaTitulo,
      materia,
      moduloNumero,
      moduloTitulo,
      conteudoResumo: conteudoResumo.substring(0, 3000),
      professorNome: professor.nome,
      professorInspiracao: professor.inspiracao,
    };

    if (scriptOnly) {
      console.log("[API/Podcast] ⚡ Modo Rápido (scriptOnly): Gerando apenas roteiro...");
      const script = await generatePodcastScript(input);
      console.log("[API/Podcast] ✅ Roteiro gerado com sucesso.");
      return NextResponse.json({
        success: true,
        script,
        professor,
        audioDisponivel: false,
      });
    }

    // Modo completo: gera roteiro + áudio
    console.log("[API/Podcast] 🚀 Iniciando pipeline completo de Roteiro + Síntese TTS...");
    const result = await generatePodcast(input);

    console.log("[API/Podcast] 🏁 Pipeline concluído:", {
      sucesso: true,
      audioDisponivel: !!result.audioBase64,
      mimeType: result.audioMimeType || "nenhum",
      tamanhoAudio: result.audioBase64 ? result.audioBase64.length : 0,
      temErro: !!result.error
    });

    return NextResponse.json({
      success: true,
      script: result.script,
      professor,
      audioDisponivel: !!result.audioBase64,
      audioBase64: result.audioBase64 || null,
      audioMimeType: result.audioMimeType || null,
      error: result.error || null,
    });
  } catch (error: any) {
    console.error("[API/Podcast] 💥 Exceção capturada:", error.message);

    if (
      error.message?.includes("429") ||
      error.message?.toLowerCase().includes("rate limit")
    ) {
      return NextResponse.json(
        {
          error:
            "Limite de requisições da IA atingido. Tente novamente em alguns minutos.",
          retryAfter: 60,
        },
        { status: 429 },
      );
    }

    return NextResponse.json(
      { error: `Falha ao gerar podcast: ${error.message}` },
      { status: 500 },
    );
  }
}
