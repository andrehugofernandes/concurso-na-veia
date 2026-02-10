import { NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { notificationsV2Service } from '@/lib/services/notifications-v2.service';

/**
 * @swagger
 * /api/notifications/preferences:
 *   get:
 *     summary: Busca preferências de notificação
 *     description: Retorna as preferências de notificação do usuário autenticado
 *     tags:
 *       - Notificações
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Preferências do usuário
 *       401:
 *         description: Não autenticado
 */
export async function GET(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  }

  try {
    const preferences = await notificationsV2Service.getUserNotificationPreferences(auth.id);
    return NextResponse.json(preferences);
  } catch (error) {
    console.error('[API] Erro ao buscar preferências:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar preferências' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/notifications/preferences:
 *   patch:
 *     summary: Atualiza preferências de notificação
 *     description: Atualiza as preferências de notificação do usuário
 *     tags:
 *       - Notificações
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newFileUploaded:
 *                 type: boolean
 *               fileUpdated:
 *                 type: boolean
 *               systemAnnouncement:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Preferências atualizadas
 *       401:
 *         description: Não autenticado
 */
export async function PATCH(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const preferences = await notificationsV2Service.updateNotificationPreferences(
      auth.id,
      body
    );
    
    return NextResponse.json(preferences);
  } catch (error) {
    console.error('[API] Erro ao atualizar preferências:', error);
    return NextResponse.json(
      { message: 'Erro ao atualizar preferências' },
      { status: 500 }
    );
  }
}
