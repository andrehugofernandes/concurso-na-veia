import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';
import { logActivity } from '@/lib/server/logging';
import path from 'path';
import fs from 'fs/promises';

// GET: obter metadados do arquivo (SYSADMIN/ADMIN/COORDENADOR qualquer, USER apenas próprio)
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });

  const file = await prisma.file.findUnique({
    where: { id },
    include: { category: true, uploadedBy: { select: { id: true, username: true } } },
  });
  if (!file) return NextResponse.json({ message: 'Arquivo não encontrado' }, { status: 404 });

  const isSysAdmin = auth.role === 'SYSADMIN';
  const isAdmin = auth.role === 'ADMIN';
  const isCoord = auth.role === 'COORDENADOR' || auth.role === 'COORDINATOR';
  if (!(isSysAdmin || isAdmin || isCoord)) {
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  await logActivity({
    action: 'file:view',
    resource: 'file',
    userId: auth.id,
    request: req,
    details: { 
      fileId: file.id,
      actor: { id: auth.id, username: auth.username }
    },
  });
  
  return NextResponse.json(file);
}

// PUT: atualizar metadados (apenas SYSADMIN, ADMIN ou COORDENADOR/COORDINATOR)
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });

  const file = await prisma.file.findUnique({ where: { id } });
  if (!file) return NextResponse.json({ message: 'Arquivo não encontrado' }, { status: 404 });

  const isSysAdmin = auth.role === 'SYSADMIN';
  const isAdmin = auth.role === 'ADMIN';
  const isCoord = auth.role === 'COORDENADOR' || auth.role === 'COORDINATOR';
  if (!(isSysAdmin || isAdmin || isCoord)) {
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  let body: { originalName?: string; description?: string; categoryId?: string; status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Corpo inválido' }, { status: 400 });
  }

  const updated = await prisma.file.update({
    where: { id },
    data: {
      originalName: typeof body.originalName === 'string' ? body.originalName : undefined,
      description: typeof body.description === 'string' ? body.description : undefined,
      categoryId: typeof body.categoryId === 'string' ? body.categoryId : undefined,
      status: typeof body.status === 'string' ? body.status : undefined,
    },
  });

  await logActivity({
    action: 'file:update',
    resource: 'file',
    userId: auth.id,
    request: req,
    details: { 
      fileId: updated.id, 
      payload: body,
      actor: { id: auth.id, username: auth.username }
    },
  });

  return NextResponse.json(updated);
}

// PATCH: atualizar metadados (apenas SYSADMIN, ADMIN ou COORDENADOR/COORDINATOR)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });

  const file = await prisma.file.findUnique({ where: { id } });
  if (!file) return NextResponse.json({ message: 'Arquivo não encontrado' }, { status: 404 });

  const isSysAdmin = auth.role === 'SYSADMIN';
  const isAdmin = auth.role === 'ADMIN';
  const isCoord = auth.role === 'COORDENADOR' || auth.role === 'COORDINATOR';
  if (!(isSysAdmin || isAdmin || isCoord)) {
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  let body: { originalName?: string; description?: string; categoryId?: string; status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Corpo inválido' }, { status: 400 });
  }

  const updated = await prisma.file.update({
    where: { id },
    data: {
      originalName: typeof body.originalName === 'string' ? body.originalName : undefined,
      description: typeof body.description === 'string' ? body.description : undefined,
      categoryId: typeof body.categoryId === 'string' ? body.categoryId : undefined,
      status: typeof body.status === 'string' ? body.status : undefined,
    },
  });

  await logActivity({
    action: 'file:update',
    resource: 'file',
    userId: auth.id,
    request: req,
    details: { 
      fileId: updated.id, 
      payload: body,
      actor: { id: auth.id, username: auth.username }
    },
  });

  return NextResponse.json(updated);
}

// DELETE: apenas SYSADMIN, ADMIN ou COORDENADOR/COORDINATOR
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });

  const file = await prisma.file.findUnique({ where: { id } });
  if (!file) return NextResponse.json({ message: 'Arquivo não encontrado' }, { status: 404 });

  const isSysAdmin = auth.role === 'SYSADMIN';
  const isAdmin = auth.role === 'ADMIN';
  const isCoord = auth.role === 'COORDENADOR' || auth.role === 'COORDINATOR';
  if (!(isSysAdmin || isAdmin || isCoord)) {
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  // Excluir registros relacionados (Access e Download) antes de excluir o arquivo
  try {
    await prisma.access.deleteMany({ where: { fileId: id } });
    console.log('[DELETE] Registros de acesso excluídos');
  } catch (error) {
    console.warn('[DELETE] Erro ao excluir registros de acesso:', error);
  }

  try {
    await prisma.download.deleteMany({ where: { fileId: id } });
    console.log('[DELETE] Registros de download excluídos');
  } catch (error) {
    console.warn('[DELETE] Erro ao excluir registros de download:', error);
  }

  // Excluir arquivo físico antes de excluir do banco
  try {
    if (file.storageType === 'local') {
      // Excluir arquivo local
      const STORAGE_ROOT = path.resolve(process.cwd(), 'storage', 'imunemais-storage', 'imunemais');
      const filePath = path.join(STORAGE_ROOT, file.path);
      
      try {
        await fs.unlink(filePath);
        console.log('[DELETE] Arquivo local excluído:', filePath);
      } catch {
        console.warn('[DELETE] Arquivo físico não encontrado ou já foi excluído:', filePath);
      }
      
      // Excluir thumbnail se existir
      if (file.thumbnailPath) {
        const thumbnailPath = path.join(process.cwd(), 'storage', file.thumbnailPath);
        try {
          await fs.unlink(thumbnailPath);
          console.log('[DELETE] Thumbnail excluído:', thumbnailPath);
        } catch {
          console.warn('[DELETE] Thumbnail não encontrado:', thumbnailPath);
        }
      }
    } else if (file.storageType === 'firebase') {
      // Para Firebase, apenas excluir do banco
      // O arquivo no Firebase permanece (pode ser limpo manualmente depois)
      console.log('[DELETE] Arquivo Firebase - apenas excluindo do banco:', file.firebaseUrl);
    }
  } catch (error) {
    console.error('[DELETE] Erro ao excluir arquivo físico:', error);
    // Continuar com a exclusão do banco mesmo se falhar a exclusão física
  }

  // Excluir do banco de dados
  await prisma.file.delete({ where: { id } });
  
  await logActivity({
    action: 'file:delete',
    resource: 'file',
    userId: auth.id,
    request: req,
    details: { 
      fileId: id,
      filename: file.filename,
      storageType: file.storageType,
      actor: { id: auth.id, username: auth.username }
    },
  });
  
  return new NextResponse(null, { status: 204 });
}
