/**
 * API Route: Geração de Áudio Aula (Edge TTS)
 *
 * POST /api/audio-aula/generate
 *
 * Gera áudio narrado do conteúdo de um módulo usando Microsoft Edge TTS.
 * Cache no Firebase Storage para reproduções futuras.
 * Exclusivo para usuários Elite Total.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateAudioFromText, VOICES } from "@/lib/audio-aula/edge-tts";
import { cleanTextForTTS } from "@/lib/audio-aula/text-extractor";
import { createClient } from "@/lib/supabase/server";
import { getStorageInstance } from "@/lib/auth";

const FIREBASE_STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
  "concurso-na-veia.firebasestorage.app";

// Planos que têm acesso ao Áudio Aula
const ALLOWED_PLANS = ["elite-total"];

export const maxDuration = 120; // Timeout de 120s para textos longos

export async function POST(request: NextRequest) {
  console.log("\n==================================================");
  console.log("[API/AudioAula] 🎧 Recebida chamada POST em /api/audio-aula/generate");
  console.log("==================================================");

  try {
    // 1) Autenticação opcional (recurso 100% liberado para todos os planos e visitantes)
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(`[API/AudioAula] 🟢 Acesso liberado para usuário: ${user?.id || "Convidado/Gratuito"}`);

    // 2) Parse do body
    const body = await request.json();
    const {
      materiaId,
      aulaId,
      moduloNumero,
      moduloTitulo,
      aulaTitulo,
      conteudoTexto, // Texto plano já extraído pelo client
      voice,
      checkOnly = false,
    } = body;

    console.log("[API/AudioAula] 📋 Payload:", {
      materiaId,
      aulaId,
      moduloNumero,
      moduloTitulo,
      aulaTitulo,
      tamanhoTexto: conteudoTexto?.length || 0,
      voice,
      checkOnly,
    });

    // 3) Verificar cache no Firebase Storage (v2 sem o bug de fala do ponto)
    const sanitizedAulaId = (
      aulaId ||
      (aulaTitulo
        ? aulaTitulo
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
        : "aula")
    ).replace(/(^-|-$)/g, "");

    const materiaFolder = (materiaId || "geral")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-");

    const storagePath = `concurso-na-veia/audio-aulas-v11/${materiaFolder}/${sanitizedAulaId}/modulo-${moduloNumero || 1}.mp3`;
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(storagePath)}?alt=media`;

    // Verifica se já existe no cache do Firebase Storage (v11)
    try {
      const headRes = await fetch(publicUrl, { method: "HEAD" });
      if (headRes.ok) {
        console.log(`[API/AudioAula] 🎯 Cache HIT: Áudio v11 já existe no Firebase Storage para o Módulo ${moduloNumero}!`);
        return NextResponse.json({
          success: true,
          exists: true,
          audioUrl: `/api/audio-aula/stream?materia=${materiaFolder}&aulaId=${sanitizedAulaId}&modulo=${moduloNumero || 1}`,
          cached: true,
        });
      }
    } catch {
      // Cache miss — continua
    }

    if (checkOnly) {
      return NextResponse.json({
        success: true,
        exists: false,
        audioUrl: null,
      });
    }

    // 4) Validação
    if (!conteudoTexto || conteudoTexto.trim().length < 50) {
      return NextResponse.json(
        { error: "Conteúdo de texto muito curto (mínimo 50 caracteres)" },
        { status: 400 }
      );
    }

    // 5) Sanitização rigorosa do texto e geração de áudio via Edge TTS
    console.log("[API/AudioAula] 🔊 Sanitizando texto e gerando áudio via Edge TTS...");
    const cleanedText = cleanTextForTTS(conteudoTexto);
    const selectedVoice = voice || VOICES.francisca;

    const result = await generateAudioFromText(cleanedText, {
      voice: selectedVoice,
      rate: "+5%", // Ligeiramente mais rápido para estudo
    });

    console.log(
      `[API/AudioAula] ✅ Áudio gerado: ${result.audioBuffer.length} bytes (~${result.durationEstimate}s)`
    );

    try {
      const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o?uploadType=media&name=${encodeURIComponent(storagePath)}`;
      const uploadRes = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": "audio/mpeg" },
        body: new Uint8Array(result.audioBuffer),
      });

      if (uploadRes.ok) {
        console.log("[API/AudioAula] 📦 Upload para Firebase concluído:", storagePath);
      } else {
        const errorText = await uploadRes.text();
        console.warn(`[API/AudioAula] ⚠️ Erro no upload (Status ${uploadRes.status}):`, errorText);
      }
    } catch (uploadErr: any) {
      console.warn("[API/AudioAula] ⚠️ Exceção no upload:", uploadErr.message);
    }

    // 7) Retorna o áudio inline (base64) + URL do cache para futuro
    const audioBase64 = result.audioBuffer.toString("base64");

    return NextResponse.json({
      success: true,
      exists: false,
      audioUrl: `/api/audio-aula/stream?materia=${materiaFolder}&aulaId=${sanitizedAulaId}&modulo=${moduloNumero || 1}`,
      audioBase64,
      audioMimeType: result.mimeType,
      durationEstimate: result.durationEstimate,
      cached: false,
    });
  } catch (error: any) {
    console.error("[API/AudioAula] 💥 Exceção:", error.message);
    return NextResponse.json(
      { error: `Falha ao gerar áudio: ${error.message}` },
      { status: 500 }
    );
  }
}
