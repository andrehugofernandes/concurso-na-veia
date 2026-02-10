import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { notificationsV2Service } from '@/lib/services/notifications-v2.service';

/**
 * PATCH /api/notifications/[id]/read
 * Marca notificação como lida
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    await notificationsV2Service.markNotificationAsRead(params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API Notification Read] Erro:', error);
    return NextResponse.json(
      { message: 'Erro ao marcar como lida' },
      { status: 500 }
    );
  }
}
