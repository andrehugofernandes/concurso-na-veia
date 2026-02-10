import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { notificationsV2Service } from '@/lib/services/notifications-v2.service';

/**
 * POST /api/notifications/read-all
 * Marca todas as notificações como lidas
 */
export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    await notificationsV2Service.markAllNotificationsAsRead(authUser.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API Notifications Read All] Erro:', error);
    return NextResponse.json(
      { message: 'Erro ao marcar todas como lidas' },
      { status: 500 }
    );
  }
}
