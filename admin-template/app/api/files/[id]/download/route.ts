import { NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/server/logging';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import path from 'path';

// Opcionalmente poderíamos marcar como dynamic se necessário
// export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });

  const file = await prisma.file.findUnique({ where: { id } });
  if (!file) return NextResponse.json({ message: 'Arquivo não encontrado' }, { status: 404 });

  const isSysAdmin = auth.role === 'SYSADMIN';
  const isAdmin = auth.role === 'ADMIN';
  const isCoord = auth.role === 'COORDENADOR';
  const isOwner = file.uploadedById === auth.id;
  if (!(isSysAdmin || isAdmin || isCoord || isOwner)) {
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  // Registrar log de download
  await logActivity({
    action: 'file:download',
    resource: 'file',
    userId: auth.id,
    request: req,
    details: { 
      fileId: file.id, 
      filename: file.filename,
      storageType: file.storageType || 'local',
      actor: { id: auth.id, username: auth.username }
    },
  });

  // Se arquivo está no Firebase, redirecionar para URL do Firebase
  if (file.storageType === 'firebase' && file.firebaseUrl) {
    return NextResponse.redirect(file.firebaseUrl);
  }

  // Arquivo local - servir do sistema de arquivos
  const STORAGE_ROOT = path.resolve(process.cwd(), 'storage', 'imunemais-storage', 'imunemais');
  const filePath = path.join(STORAGE_ROOT, file.path);

  try {
    const stats = await stat(filePath);
    if (!stats.isFile()) throw new Error('not-a-file');
  } catch {
    return NextResponse.json({ message: 'Arquivo físico não encontrado' }, { status: 404 });
  }

  const stream = createReadStream(filePath);

  // Cabeçalhos para download
  const headers = new Headers();
  headers.set('Content-Type', file.mimeType || 'application/octet-stream');
  headers.set('Content-Length', String(file.size || 0));
  headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(file.originalName || file.filename)}"`);

  return new Response(stream as unknown as BodyInit, { status: 200, headers });
}
