import { NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { notificationsV2Service } from '@/lib/services/notifications-v2.service';

/**
 * @swagger
 * /api/notifications/subscriptions:
 *   get:
 *     summary: Lista inscrições em categorias
 *     description: Retorna as categorias que o usuário está inscrito para receber notificações
 *     tags:
 *       - Notificações
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de inscrições
 *       401:
 *         description: Não autenticado
 */
export async function GET(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  }

  try {
    const subscriptions = await notificationsV2Service.getUserCategorySubscriptions(auth.id);
    return NextResponse.json({ subscriptions });
  } catch (error) {
    console.error('[API] Erro ao buscar inscrições:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar inscrições' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/notifications/subscriptions:
 *   post:
 *     summary: Inscreve em categoria
 *     description: Inscreve o usuário em uma categoria para receber notificações
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
 *             required:
 *               - categoryId
 *             properties:
 *               categoryId:
 *                 type: string
 *                 example: "uuid-da-categoria"
 *     responses:
 *       200:
 *         description: Inscrito com sucesso
 *       400:
 *         description: categoryId obrigatório
 *       401:
 *         description: Não autenticado
 */
export async function POST(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  }

  try {
    const { categoryId } = await req.json();
    
    if (!categoryId) {
      return NextResponse.json(
        { message: 'categoryId é obrigatório' },
        { status: 400 }
      );
    }

    await notificationsV2Service.subscribeToCategory(auth.id, categoryId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] Erro ao inscrever em categoria:', error);
    return NextResponse.json(
      { message: 'Erro ao inscrever em categoria' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/notifications/subscriptions:
 *   delete:
 *     summary: Desinscreve de categoria
 *     description: Remove a inscrição do usuário de uma categoria
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
 *             required:
 *               - categoryId
 *             properties:
 *               categoryId:
 *                 type: string
 *                 example: "uuid-da-categoria"
 *     responses:
 *       200:
 *         description: Desinscrito com sucesso
 *       400:
 *         description: categoryId obrigatório
 *       401:
 *         description: Não autenticado
 */
export async function DELETE(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  }

  try {
    const { categoryId } = await req.json();
    
    if (!categoryId) {
      return NextResponse.json(
        { message: 'categoryId é obrigatório' },
        { status: 400 }
      );
    }

    await notificationsV2Service.unsubscribeFromCategory(auth.id, categoryId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] Erro ao desinscrever de categoria:', error);
    return NextResponse.json(
      { message: 'Erro ao desinscrever de categoria' },
      { status: 500 }
    );
  }
}
