import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

/**
 * Endpoint temporário para desenvolvimento - bypass da autenticação
 * APENAS PARA TESTES - REMOVER EM PRODUÇÃO
 */
export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();
    
    if (!username) {
      return NextResponse.json(
        { message: 'Username é obrigatório' },
        { status: 400 }
      );
    }

    // Simular usuário para desenvolvimento
    const mockUser = {
      id: '6e4ef959-8fd6-11f0-bbb6-42010ae00026',
      username: username,
      email: `${username}@jaboatao.pe.gov.br`,
      name: 'Usuário de Desenvolvimento',
      role: 'ADMIN'
    };

    // Gerar tokens JWT
    const tokenPayload = { 
      sub: mockUser.id,
      username: mockUser.username,
      email: mockUser.email,
      role: mockUser.role,
      name: mockUser.name
    };

    const jwtSecret = process.env.JWT_SECRET || 'dev-secret-key';
    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '24h' });
    const refreshToken = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '7d' });

    // Resposta com cookies seguros
    const res = NextResponse.json({ 
      message: 'Login de desenvolvimento realizado com sucesso',
      user: mockUser
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

    return res;

  } catch (error: unknown) {
    console.error('[DEV-LOGIN] Erro:', error);
    return NextResponse.json(
      { message: 'Erro no login de desenvolvimento' },
      { status: 500 }
    );
  }
}
