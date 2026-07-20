import { NextRequest, NextResponse } from "next/server";
import { getPodcastFirebaseUrl } from "@/lib/services/firebase-storage";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const materia = searchParams.get("materia");
    const aulaId = searchParams.get("aulaId");
    const modulo = searchParams.get("modulo");

    if (!materia || !aulaId || !modulo) {
      return NextResponse.json({ error: "Parâmetros ausentes (materia, aulaId, modulo)" }, { status: 400 });
    }

    const moduloNumero = parseInt(modulo, 10);
    
    // Tentar localizar a URL pública do Firebase
    let firebaseUrl = await getPodcastFirebaseUrl(materia, aulaId, moduloNumero);
    
    // Se falhar, tentar com fallbacks
    if (!firebaseUrl) {
      const dashedSlug = aulaId.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      if (dashedSlug && dashedSlug !== aulaId) {
        firebaseUrl = await getPodcastFirebaseUrl(materia, dashedSlug, moduloNumero);
      }
      
      if (!firebaseUrl && (aulaId.includes("administracaogeral") || (dashedSlug && dashedSlug.includes("administracao-geral")))) {
        firebaseUrl = await getPodcastFirebaseUrl(materia, "administracao-geral", moduloNumero);
      }
    }

    if (!firebaseUrl) {
      return NextResponse.json({ error: "Áudio não localizado no Firebase Storage" }, { status: 404 });
    }

    console.log(`[Proxy/Audio] 🔄 Proxying audio from: ${firebaseUrl}`);

    // Buscar o áudio do Firebase no servidor (evitando CORS/CSP no client)
    const response = await fetch(firebaseUrl);
    if (!response.ok) {
      return NextResponse.json({ error: "Falha ao obter áudio do Storage" }, { status: 500 });
    }

    const audioBuffer = await response.arrayBuffer();

    // Suporte a Range Requests (HTTP 206 Partial Content) para permitir streaming correto em navegadores
    const rangeHeader = request.headers.get("range");
    if (rangeHeader) {
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : audioBuffer.byteLength - 1;
      
      // Garante limites válidos
      const safeStart = Math.max(0, Math.min(start, audioBuffer.byteLength - 1));
      const safeEnd = Math.max(safeStart, Math.min(end, audioBuffer.byteLength - 1));
      
      const chunksize = (safeEnd - safeStart) + 1;
      const slicedBuffer = audioBuffer.slice(safeStart, safeEnd + 1);

      return new NextResponse(slicedBuffer, {
        status: 206,
        statusText: "Partial Content",
        headers: {
          "Content-Range": `bytes ${safeStart}-${safeEnd}/${audioBuffer.byteLength}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize.toString(),
          "Content-Type": "audio/wav",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=86400", // cache de 1 dia
      },
    });
  } catch (error: any) {
    console.error("[Proxy/Audio] Erro:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
