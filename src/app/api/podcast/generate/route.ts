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
import { uploadPodcastToSupabaseStorage } from "@/lib/services/supabase-storage";
import { uploadPodcastToFirebaseStorage, getPodcastFirebaseUrl } from "@/lib/services/firebase-storage";
import { createClient } from "@/lib/supabase/server";

function createWavBufferFromPcm(pcmBytes: Buffer, sampleRate = 24000): Buffer {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBytes.length;
  const chunkSize = 36 + dataSize;

  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(chunkSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBytes]);
}

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
      checkOnly = false,
    } = body;

    console.log("[API/Podcast] 📋 Dados do payload:", {
      aulaId,
      aulaTitulo,
      materia,
      materiaId,
      moduloNumero,
      moduloTitulo,
      tamanhoResumo: conteudoResumo ? conteudoResumo.length : 0,
      scriptOnly,
      checkOnly
    });

    // 1) Checar se o arquivo já existe no Firebase Storage (5GB Grátis) ou Supabase
    const sanitizedAulaId = aulaId || (aulaTitulo ? aulaTitulo.toLowerCase().replace(/\s+/g, "-") : "aula");
    
    // Se for apenas checagem e campos essenciais faltarem, podemos usar defaults ou inferir para evitar erros 400
    const finalMateria = materia || "materia";
    const finalModuloNumero = moduloNumero || 1;

    const existingFirebaseUrl = await getPodcastFirebaseUrl(finalMateria, sanitizedAulaId, finalModuloNumero);
    
    if (existingFirebaseUrl) {
      console.log(`[API/Podcast] 🎧 Cache HIT (Firebase): Podcast já existe! URL: ${existingFirebaseUrl}`);
      const prof = getProfessor(materiaId || finalMateria.toLowerCase(), sanitizedAulaId);
      return NextResponse.json({
        success: true,
        exists: true,
        script: null, 
        professor: prof,
        audioDisponivel: true,
        audioUrl: existingFirebaseUrl,
        audioBase64: null,
        audioMimeType: 'audio/wav',
        error: null,
      });
    }

    // Fallback cache check: Supabase Storage
    const materiaFolder = finalMateria
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, '-');
    const storagePath = `podcasts/${materiaFolder}/${sanitizedAulaId}/modulo-${finalModuloNumero}.wav`;
    const supabase = await createClient();
    const { data: publicUrlData } = supabase.storage.from('petropbras-quest').getPublicUrl(storagePath);
    
    try {
      const headResponse = await fetch(publicUrlData.publicUrl, { method: 'HEAD' });
      if (headResponse.ok) {
        console.log(`[API/Podcast] 🎧 Cache HIT (Supabase): Podcast já existe! Retornando URL: ${publicUrlData.publicUrl}`);
        const prof = getProfessor(materiaId || finalMateria.toLowerCase(), sanitizedAulaId);
        return NextResponse.json({
          success: true,
          exists: true,
          script: null, 
          professor: prof,
          audioDisponivel: true,
          audioUrl: publicUrlData.publicUrl,
          audioBase64: null,
          audioMimeType: 'audio/wav',
          error: null,
        });
      }
    } catch (e) {
      console.log("[API/Podcast] Cache MISS.");
    }

    if (checkOnly) {
      return NextResponse.json({
        success: true,
        exists: false,
        audioDisponivel: false,
      });
    }

    // Validação básica (somente se não for checkOnly)
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

    // 2) Identificar professor virtual adequado
    const professor = getProfessor(materiaId || materia.toLowerCase(), aulaId);
    console.log(`[API/Podcast] 👨‍🏫 Professor selecionado: ${professor.nome} (${professor.area} - ${professor.inspiracao})`);

    const input: PodcastModuleInput = {
      aulaId: sanitizedAulaId,
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

    let audioUrl = null;

    if (result.audioBase64) {
      console.log("[API/Podcast] 📦 Áudio gerado. Convertendo PCM Base64 para Buffer WAV e enviando para o Firebase Storage (5GB)...");
      try {
        const pcmBuffer = Buffer.from(result.audioBase64, 'base64');
        const wavBuffer = createWavBufferFromPcm(pcmBuffer);
        
        // Tentativa 1: Firebase Storage (5GB Grátis)
        const fbUploadRes = await uploadPodcastToFirebaseStorage(
          wavBuffer,
          input.materia,
          input.aulaId,
          input.moduloNumero
        );

        if (fbUploadRes.success && fbUploadRes.url) {
          audioUrl = fbUploadRes.url;
          console.log("[API/Podcast] ✅ Upload para o Firebase Storage concluído com sucesso:", audioUrl);
        } else {
          console.warn("[API/Podcast] ⚠️ Firebase Storage indisponível, usando Supabase Storage como fallback:", fbUploadRes.error);
          const uploadRes = await uploadPodcastToSupabaseStorage(
            wavBuffer,
            input.materia,
            input.aulaId,
            input.moduloNumero
          );

          if (uploadRes.success && uploadRes.url) {
            audioUrl = uploadRes.url;
            console.log("[API/Podcast] ✅ Upload para o Supabase Storage concluído com sucesso:", audioUrl);
          } else {
            console.error("[API/Podcast] ❌ Erro ao fazer upload em ambos os storages:", uploadRes.error);
          }
        }
      } catch (err) {
        console.error("[API/Podcast] ❌ Exceção ao preparar/fazer upload do áudio:", err);
      }
    }

    console.log("[API/Podcast] 🏁 Pipeline concluído:", {
      sucesso: true,
      audioDisponivel: !!result.audioBase64,
      audioUrl: !!audioUrl,
      temErro: !!result.error
    });

    return NextResponse.json({
      success: true,
      script: result.script,
      professor,
      audioDisponivel: !!result.audioBase64,
      audioUrl: audioUrl,
      audioBase64: result.audioBase64 || null, // keeping for fallback
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
