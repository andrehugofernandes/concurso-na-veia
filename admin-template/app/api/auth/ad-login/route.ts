import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logActivity } from '@/lib/server/logging';

export const runtime = 'nodejs';

interface ADBasicResponse {
  success: boolean;
  user: {
    username: string;
    full_name: string;
    email?: string;
  };
}

interface ADGroupsResponse {
  groups: string[];
}

/**
 * @swagger
 * /api/auth/ad-login:
 *   post:
 *     summary: Autenticação via Active Directory
 *     description: Autentica usuário via AD, sincroniza com banco de dados e gerencia grupos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 *       403:
 *         description: Usuário sem permissão
 */
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username e password são obrigatórios' },
        { status: 400 }
      );
    }

    const userIp = request.headers.get('x-forwarded-for') || 
      request.headers.get('x-real-ip') || 
      'unknown';

    // 1. Autenticar via API Python do AD - Endpoint BASIC para dados do usuário
    const basicApiUrl = process.env.PYTHON_AUTH_API_BASIC || process.env.PYTHON_AUTH_API;
    const groupsApiUrl = process.env.PYTHON_AUTH_API_GROUPS;
    
    if (!basicApiUrl || !groupsApiUrl) {
      console.log(`[AD-LOGIN] APIs não configuradas: BASIC=${!!basicApiUrl}, GROUPS=${!!groupsApiUrl}`);
      return NextResponse.json(
        { message: 'Configuração de autenticação incompleta' },
        { status: 500 }
      );
    }
    
    console.log(`[AD-LOGIN] Tentativa de login para usuário: ${username} de IP: ${userIp}`);
    
    // 1a. Chamar endpoint /auth/basic para autenticação e dados do usuário
    let basicResponse;
    let basicData: ADBasicResponse;
    
    try {
      basicResponse = await fetch(basicApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        signal: AbortSignal.timeout(5000), // 5 segundos timeout
      });

      if (!basicResponse.ok) {
        console.log(`[AD-LOGIN] Falha na autenticação AD básica para ${username}: ${basicResponse.status}`);
        return NextResponse.json(
          { message: 'Usuário ou senha inválidos' },
          { status: 401 }
        );
      }

      basicData = await basicResponse.json();
      console.log('Resposta da API /auth/basic:', JSON.stringify(basicData, null, 2));
    } catch (fetchError: unknown) {
      const fe = fetchError as { name?: string; message?: string };
      console.error(`[AD-LOGIN] Erro ao conectar com servidor AD (basic): ${fe?.message ?? 'erro desconhecido'}`);
      
      if (fe?.name === 'AbortError') {
        return NextResponse.json(
          { message: 'Servidor de autenticação não respondeu. Tente novamente em alguns instantes.' },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { message: 'Servidor de autenticação indisponível. Contate o suporte técnico.' },
        { status: 503 }
      );
    }

    // 2. Verificar se a autenticação básica foi bem-sucedida
    if (!basicData.success || !basicData.user || !basicData.user.username) {
      console.log(`[AD-LOGIN] Dados inválidos retornados da API básica para ${username}`);
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // 1b. Chamar endpoint /auth/member_groups para obter grupos
    let groupsResponse;
    let groupsData: ADGroupsResponse;
    
    try {
      groupsResponse = await fetch(groupsApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        signal: AbortSignal.timeout(5000), // 5 segundos timeout
      });

      if (!groupsResponse.ok) {
        console.log(`[AD-LOGIN] Falha ao obter grupos para ${username}: ${groupsResponse.status}`);
        return NextResponse.json(
          { message: 'Erro ao verificar permissões' },
          { status: 401 }
        );
      }

      groupsData = await groupsResponse.json();
      console.log('Resposta da API /auth/member_groups:', JSON.stringify(groupsData, null, 2));
    } catch (fetchError: unknown) {
      const fe = fetchError as { name?: string; message?: string };
      console.error(`[AD-LOGIN] Erro ao conectar com servidor AD (groups): ${fe?.message ?? 'erro desconhecido'}`);
      
      if (fe?.name === 'AbortError') {
        return NextResponse.json(
          { message: 'Servidor de autenticação não respondeu ao verificar permissões. Tente novamente.' },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { message: 'Não foi possível verificar permissões. Servidor indisponível.' },
        { status: 503 }
      );
    }

    // 3. Verificar se o usuário pertence ao grupo autorizado
    const groups = groupsData.groups || [];
    const hasAccess = Array.isArray(groups) && groups.includes('GL_HML_IMUNEMAIS');
    if (!hasAccess) {
      console.log(`[AD-LOGIN] Usuário ${username} não pertence ao grupo autorizado. Grupos: ${groups.join(', ')}`);
      return NextResponse.json(
        { message: 'Usuário sem permissão para acessar o sistema' },
        { status: 403 }
      );
    }

    // 4. Sincronizar usuário com banco de dados
    const user = await syncUserWithDatabase(basicData.user);
    
    if (!user) {
      console.log(`[AD-LOGIN] Falha ao sincronizar usuário ${username} com banco de dados ou usuário desativado`);
      return NextResponse.json(
        { message: 'Usuário sem permissão para acessar o sistema' },
        { status: 403 }
      );
    }

    console.log(`[AD-LOGIN] Login bem-sucedido para usuário: ${username}`);

    // 4.1. Verificar se 2FA está expirado (90 dias)
    if (user.twoFactorEnabled && user.twoFactorExpiresAt) {
      const now = new Date();
      const expiresAt = new Date(user.twoFactorExpiresAt);
      
      if (now > expiresAt) {
        console.log(`[AD-LOGIN] 2FA expirado para usuário ${username}, forçando reconfiguração`);
        
        // Desabilitar 2FA expirado
        await prisma.user.update({
          where: { id: user.id },
          data: {
            twoFactorEnabled: false,
            twoFactorSecret: null,
            twoFactorExpiresAt: null
          }
        });
        
        // Retornar mensagem informando que 2FA expirou
        return NextResponse.json({
          message: 'Seu 2FA expirou (90 dias). Por favor, configure novamente.',
          requires2FA: true,
          requiresSetup: true,
          userId: user.id
        }, { status: 200 });
      }
    }

    // 5. Gerar token JWT usando as funções da biblioteca de auth
    const { signAccessToken, signRefreshToken } = await import('@/lib/auth');
    
    const tokenPayload = { 
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      name: user.name
    };

    const token = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken(tokenPayload);

    // 6. Definir cookies seguros
    const res = NextResponse.json({ 
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.full_name || user.name,
        role: user.role
      }
    });

    // Cookies HttpOnly seguros
    res.cookies.set('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 horas
      path: '/',
    });

    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      path: '/',
    });

    await logActivity({
      action: 'auth:login-success',
      resource: 'auth',
      userId: user.id,
      request,
      details: {
        provider: 'AD',
        username: user.username,
        groups,
      },
    });

    return res;

  } catch (error: unknown) {
    console.error('[AD-LOGIN] Erro durante autenticação:', error);
    
    // Erros de rede/conexão
    const err = error as { code?: string; name?: string };
    if (err?.code === 'ECONNREFUSED' || err?.code === 'ENOTFOUND' || err?.code === 'ETIMEDOUT') {
      return NextResponse.json(
        { message: 'Servidor de autenticação AD está offline. Contate o suporte técnico.' },
        { status: 503 }
      );
    }
    
    if (err?.name === 'AbortError') {
      return NextResponse.json(
        { message: 'Timeout na autenticação. O servidor AD não respondeu a tempo.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: 'Erro inesperado na autenticação. Tente novamente ou contate o suporte.' },
      { status: 500 }
    );
  }
}

/**
 * Sincroniza usuário do AD com banco de dados
 */
async function syncUserWithDatabase(userData: { username: string; full_name: string; email?: string }) {
  try {
    // Extrair informações do usuário
    const username = userData.username.toLowerCase();
    
    console.log(`[SYNC] Dados recebidos do AD:`, {
      username: userData.username,
      full_name: userData.full_name,
      email: userData.email
    });
    
    // Usar full_name como nome completo e displayName
    const fullName = userData.full_name || userData.username;
    const displayName = userData.full_name || userData.username;
    const email = userData.email || `${username}@jaboatao.pe.gov.br`;
    
    console.log(`[SYNC] Valores processados:`, {
      username,
      fullName,
      displayName,
      email
    });

    // Verificar se usuário já existe no banco
    let user = await prisma.user.findUnique({
      where: { username }
    });

    if (user) {
      // Verificar se usuário está ativo
      if (!user.active) {
        console.log(`[SYNC] Usuário ${username} está desativado`);
        return null; // Retorna null para bloquear login
      }
      
      // Usuário existe - atualizar dados preservando 2FA se já configurado
      console.log(`[SYNC] Atualizando usuário existente: ${username}`);
      
      user = await prisma.user.update({
        where: { username },
        data: {
          name: displayName,
          full_name: fullName,
          email: email,
          updatedAt: new Date()
          // NÃO resetar 2FA - preservar configuração existente
        }
      });

      console.log(`[SYNC] Usuário atualizado preservando 2FA: ${username}`);
    } else {
      // Usuário não existe - criar novo com role USER
      console.log(`[SYNC] Criando novo usuário: ${username}`);
      
      user = await prisma.user.create({
        data: {
          username,
          password: '', // Senha vazia para usuários AD
          name: displayName,
          full_name: fullName,
          email: email,
          role: 'USER', // Novos usuários sempre como USER
          twoFactorEnabled: false,
          twoFactorSecret: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      console.log(`[SYNC] Novo usuário criado com role USER: ${username}`);
    }

    return user;

  } catch (error) {
    console.error('[SYNC] Erro ao sincronizar usuário:', error);
    return null;
  }
}
