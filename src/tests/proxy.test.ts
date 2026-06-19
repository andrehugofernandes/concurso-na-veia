import { describe, it, expect, vi } from 'vitest';
import { proxy } from '../proxy';
import { NextRequest, NextResponse } from 'next/server';

// Mock do supabase SSR
vi.mock('@supabase/ssr', () => {
  return {
    createServerClient: vi.fn(() => ({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } })
      }
    }))
  };
});

describe('Proxy Middleware Security', () => {
  it('Deve barrar acesso anônimo em rota protegida (/dashboard) e redirecionar para /login', async () => {
    const req = new NextRequest('http://localhost:3000/dashboard');
    const res = await proxy(req);
    
    // Como mockamos sem usuário, deve redirecionar para login
    expect(res.status).toBe(307); // Next.js NextResponse.redirect retorna 307
    expect(res.headers.get('location')).toBe('http://localhost:3000/login');
  });

  it('Deve aplicar cabeçalhos de segurança (CSP, XSS, etc) em todas as respostas', async () => {
    const req = new NextRequest('http://localhost:3000/');
    const res = await proxy(req);
    
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(res.headers.get('X-Frame-Options')).toBe('DENY');
    expect(res.headers.get('X-XSS-Protection')).toBe('1; mode=block');
    expect(res.headers.get('Content-Security-Policy')).toContain("default-src 'self'");
  });
});
