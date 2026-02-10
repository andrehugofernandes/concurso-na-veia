import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { notificationsV2Service } from '@/lib/services/notifications-v2.service';

/**
 * @swagger
 * /api/notifications/count:
 *   get:
 *     summary: Conta notificações não lidas
 *     description: Retorna o número de notificações não lidas do usuário
 *     tags:
 *       - Notificações
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contagem de não lidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 5
 */
export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ count: 0 }, { status: 200 });
    }

    const count = await notificationsV2Service.countUnreadNotifications(authUser.id);

    return NextResponse.json({ count });
  } catch (error) {
    console.error('[API Notifications Count] Erro:', error);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
