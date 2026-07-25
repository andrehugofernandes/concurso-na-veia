/**
 * API Route: Stream de Áudio Aula (Proxy para Firebase Storage)
 *
 * GET /api/audio-aula/stream?materia=X&aulaId=Y&modulo=Z
 *
 * Faz proxy do áudio cacheado no Firebase Storage, evitando CORS issues
 * e escondendo a URL do Firebase do cliente.
 */

import { NextRequest, NextResponse } from "next/server";

const FIREBASE_STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
  "passei-no-concurso-b33e0.firebasestorage.app";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const materia = searchParams.get("materia");
  const aulaId = searchParams.get("aulaId");
  const modulo = searchParams.get("modulo") || "1";

  if (!materia || !aulaId) {
    return NextResponse.json(
      { error: "Parâmetros obrigatórios: materia, aulaId" },
      { status: 400 }
    );
  }

  let storagePath = `audio-aulas-v5/${materia}/${aulaId}/modulo-${modulo}.mp3`;
  let firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(storagePath)}?alt=media`;

  try {
    let response = await fetch(firebaseUrl);

    // Fallback para os paths anteriores se não encontrar no v5
    if (!response.ok) {
      storagePath = `audio-aulas-v3/${materia}/${aulaId}/modulo-${modulo}.mp3`;
      firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(storagePath)}?alt=media`;
      response = await fetch(firebaseUrl);
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "Áudio não encontrado" },
        { status: 404 }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
        "Accept-Ranges": "bytes",
      },
    });
  } catch (error: any) {
    console.error("[API/AudioAula/Stream] Erro:", error.message);
    return NextResponse.json(
      { error: "Erro ao buscar áudio" },
      { status: 500 }
    );
  }
}
