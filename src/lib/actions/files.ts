'use server';

import { db } from '@/lib/db';
import { 
  ActionResponse, 
  createSuccessResponse, 
  createErrorResponse 
} from '@/lib/actions/safe-action';
import { getCurrentUserAction } from '@/lib/actions/auth';
import { revalidatePath } from 'next/cache';

export async function createFileAction(data: {
  filename: string;
  originalName: string;
  firebaseUrl: string;
  size: number;
  mimeType: string;
  categoryId?: string | null;
  thumbnailUrl?: string | null;
}): Promise<ActionResponse<any>> {
  try {
    const userRes = await getCurrentUserAction();
    if (userRes.status === 'error') return createErrorResponse('Não autorizado');

    const result = await (db as any).file.create({
      data: {
        filename: data.filename,
        originalName: data.originalName,
        firebaseUrl: data.firebaseUrl,
        size: data.size,
        mimeType: data.mimeType,
        categoryId: data.categoryId || null,
        thumbnailUrl: data.thumbnailUrl || null,
        userId: userRes.data.id,
      }
    });

    revalidatePath('/admin/files');
    revalidatePath('/admin/dashboard');

    return createSuccessResponse(result);
  } catch (error: any) {
    console.error('[createFileAction] Erro:', error);
    return createErrorResponse(error.message || 'Erro ao criar arquivo');
  }
}
