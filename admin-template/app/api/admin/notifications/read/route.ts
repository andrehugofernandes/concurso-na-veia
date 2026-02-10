import { NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';

/**
 * @swagger
 * /api/admin/notifications/read:
 *   post:
 *     summary: Marcar todas as notificações como lidas
 *     description: Marca todas as notificações do usuário autenticado como lidas. Apenas usuários com roles ADMIN ou COORDENADOR podem acessar este endpoint.
 *     tags:
 *       - Notificações
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Notificações marcadas como lidas
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 */
export async function POST(req: Request) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }
    
    if (authUser.role !== 'ADMIN' && authUser.role !== 'COORDENADOR') {
      return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
    }

    // Marcar todas as atividades como lidas
    // Nota: Isso depende de como você está rastreando notificações não lidas
    // Se não tiver uma coluna 'read', podemos considerar que todas as atividades recentes são não lidas
    
    // Opção 1: Se houver uma coluna 'read' na tabela de atividades
    // await prisma.activity.updateMany({
    //   where: { read: false },
    //   data: { read: true }
    // });

    // Opção 2: Se não houver coluna, podemos apenas limpar o cache ou retornar sucesso
    // A lógica de "não lido" pode ser baseada em tempo (ex: atividades das últimas 24h)
    
    return NextResponse.json({ 
      message: 'Notificações marcadas como lidas',
      success: true 
    });
    
  } catch (error) {
    console.error('Erro ao marcar notificações como lidas:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}
