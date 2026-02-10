import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

/**
 * Endpoint público para download de arquivos
 * Não requer autenticação
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Buscar arquivo no banco de dados
    const file = await prisma.file.findUnique({
      where: { id },
      select: {
        id: true,
        filename: true,
        originalName: true,
        path: true,
        mimeType: true,
        size: true,
        storageType: true,
        firebaseUrl: true,
      }
    });

    if (!file) {
      return NextResponse.json(
        { message: 'Arquivo não encontrado' },
        { status: 404 }
      );
    }

    // Se arquivo está no Firebase, redirecionar para URL do Firebase
    if (file.storageType === 'firebase' && file.firebaseUrl) {
      // Registrar download no banco de dados (sem bloquear a resposta)
      prisma.download.create({
        data: {
          fileId: file.id,
          userId: null, // Download público (sem usuário autenticado)
        }
      }).catch((err) => {
        console.error('Erro ao registrar download:', err);
      });

      // Redirecionar para URL do Firebase
      return Response.redirect(file.firebaseUrl, 302);
    }

    // Arquivo local - servir do sistema de arquivos
    // Construir caminho completo do arquivo
    // Os arquivos estão em storage/imunemais-storage/imunemais/
    // O campo 'path' no banco contém o caminho absoluto ou relativo
    let filePath: string;
    
    if (path.isAbsolute(file.path)) {
      // Se o path é absoluto, usar diretamente
      filePath = file.path;
    } else {
      // Se é relativo, construir a partir da raiz do storage
      const storageRoot = path.join(process.cwd(), 'storage', 'imunemais-storage', 'imunemais');
      filePath = path.join(storageRoot, file.path);
    }

    // Verificar se arquivo existe no sistema de arquivos
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { message: 'Arquivo não encontrado no sistema de arquivos' },
        { status: 404 }
      );
    }

    // Ler arquivo
    const fileBuffer = await fs.readFile(filePath);

    // Registrar download no banco de dados (sem bloquear a resposta)
    prisma.download.create({
      data: {
        fileId: file.id,
        userId: null, // Download público (sem usuário autenticado)
      }
    }).catch((err) => {
      console.error('Erro ao registrar download:', err);
      // Não bloqueia o download se falhar o registro
    });

    // Retornar arquivo com headers apropriados
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': file.mimeType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(file.originalName || file.filename)}"`,
        'Content-Length': file.size.toString(),
      },
    });
  } catch (error) {
    console.error('Erro ao fazer download do arquivo:', error);
    return NextResponse.json(
      { message: 'Erro ao fazer download do arquivo' },
      { status: 500 }
    );
  }
}
