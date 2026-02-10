import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';

interface ADUser {
  username: string;
  displayName?: string;
  full_name?: string;
  email?: string;
}

/**
 * @swagger
 * /api/auth/ad-sync:
 *   post:
 *     summary: Sincroniza usuários do AD com banco de dados
 *     description: Remove usuários que não estão mais no grupo AD autorizado
 *     responses:
 *       200:
 *         description: Sincronização concluída
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Sem permissão
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar se usuário está autenticado e é ADMIN
    const authUser = await getAuthUserFromRequest(request);
    
    if (!authUser) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      );
    }

    if (authUser.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Apenas administradores podem executar sincronização' },
        { status: 403 }
      );
    }

    console.log(`[AD-SYNC] Iniciando sincronização por usuário: ${authUser.username}`);

    // 1. Obter lista de usuários autorizados do AD
    const authorizedUsers = await getAuthorizedADUsers();
    
    if (!authorizedUsers) {
      return NextResponse.json(
        { message: 'Erro ao obter usuários do AD' },
        { status: 503 }
      );
    }

    // 2. Obter usuários atuais do banco
    const dbUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        full_name: true,
        email: true,
        role: true
      }
    });

    // 3. Criar sets para comparação
    const authorizedUsernames = new Set(authorizedUsers.map(u => u.username.toLowerCase()));
    const dbUsernames = new Set(dbUsers.map(u => u.username.toLowerCase()));

    // 4. Identificar usuários para remoção (estão no DB mas não no AD)
    const usersToRemove = dbUsers.filter(user => 
      !authorizedUsernames.has(user.username.toLowerCase())
    );

    // 5. Identificar usuários para criação (estão no AD mas não no DB)
    const usersToCreate = authorizedUsers.filter(adUser => 
      !dbUsernames.has(adUser.username.toLowerCase())
    );

    let removedCount = 0;
    let createdCount = 0;
    let resetCount = 0;

    // 6. Remover usuários não autorizados
    if (usersToRemove.length > 0) {
      console.log(`[AD-SYNC] Removendo ${usersToRemove.length} usuários não autorizados`);
      
      for (const user of usersToRemove) {
        await prisma.user.delete({
          where: { id: user.id }
        });
        console.log(`[AD-SYNC] Usuário removido: ${user.username}`);
        removedCount++;
      }
    }

    // 7. Criar novos usuários autorizados
    if (usersToCreate.length > 0) {
      console.log(`[AD-SYNC] Criando ${usersToCreate.length} novos usuários`);
      
      for (const adUser of usersToCreate) {
        await prisma.user.create({
          data: {
            username: adUser.username.toLowerCase(),
            password: '', // Senha vazia para usuários AD
            name: adUser.displayName || adUser.username,
            full_name: adUser.full_name || adUser.displayName || adUser.username,
            email: adUser.email || `${adUser.username.toLowerCase()}@jaboatao.pe.gov.br`,
            role: 'USER',
            twoFactorEnabled: false,
            twoFactorSecret: null,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
        console.log(`[AD-SYNC] Usuário criado: ${adUser.username}`);
        createdCount++;
      }
    }

    // 8. Resetar 2FA para usuários existentes que continuam autorizados
    const existingAuthorizedUsers = dbUsers.filter(user => 
      authorizedUsernames.has(user.username.toLowerCase())
    );

    if (existingAuthorizedUsers.length > 0) {
      console.log(`[AD-SYNC] Resetando 2FA para ${existingAuthorizedUsers.length} usuários existentes`);
      
      for (const user of existingAuthorizedUsers) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            twoFactorEnabled: false,
            twoFactorSecret: null,
            updatedAt: new Date()
          }
        });
        console.log(`[AD-SYNC] 2FA resetado para: ${user.username}`);
        resetCount++;
      }
    }

    console.log(`[AD-SYNC] Sincronização concluída - Criados: ${createdCount}, Removidos: ${removedCount}, 2FA Resetado: ${resetCount}`);

    return NextResponse.json({
      message: 'Sincronização concluída com sucesso',
      summary: {
        usersCreated: createdCount,
        usersRemoved: removedCount,
        twoFactorReset: resetCount,
        totalAuthorized: authorizedUsers.length
      }
    });

  } catch (error: unknown) {
    console.error('[AD-SYNC] Erro durante sincronização:', error);
    return NextResponse.json(
      { message: 'Erro interno durante sincronização' },
      { status: 500 }
    );
  }
}

/**
 * Obtém lista de usuários autorizados do grupo AD
 */
async function getAuthorizedADUsers(): Promise<ADUser[] | null> {
  try {
    // Fazer requisição para API Python que retorna membros do grupo
    const pyApi = process.env.PYTHON_AUTH_API_GROUPS!;
    
    // Assumindo que a API tem um endpoint para listar membros do grupo
    // Você pode precisar ajustar isso baseado na API real
    const response = await fetch(`${pyApi}/members/GL_HML_IMUNEMAIS`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000), // 10 segundos timeout
    });

    if (!response.ok) {
      console.error(`[AD-SYNC] Erro ao obter membros do grupo: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    // Assumindo que a resposta tem formato { members: [{ username, displayName, email }] }
    // Ajuste conforme a estrutura real da sua API
    return data.members || [];

  } catch (error) {
    console.error('[AD-SYNC] Erro ao conectar com API do AD:', error);
    return null;
  }
}
