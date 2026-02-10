import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { notificationsV2Service } from '@/lib/services/notifications-v2.service';

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Lista notificações do usuário
 *     description: Busca notificações do usuário autenticado com filtros opcionais
 *     tags:
 *       - Notificações
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: unreadOnly
 *         schema:
 *           type: boolean
 *         description: Filtrar apenas não lidas
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Número máximo de notificações
 *     responses:
 *       200:
 *         description: Lista de notificações
 *       401:
 *         description: Não autenticado
 */
export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    const url = new URL(req.url);
    const unreadOnly = url.searchParams.get('unreadOnly') === 'true';
    const limit = parseInt(url.searchParams.get('limit') || '50');

    const notifications = await notificationsV2Service.getUserNotifications(authUser.id, {
      unreadOnly,
      limit,
    });

    return NextResponse.json(
      { notifications },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('[API Notifications] Erro ao buscar notificações:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar notificações' },
      { status: 500 }
    );
  }
}
