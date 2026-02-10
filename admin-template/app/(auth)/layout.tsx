'use client';

// import { Inter } from 'next/font/google'; // Desabilitado: problemas de conexão no build
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { AuthProvider } from '@/components/providers/auth-provider';

// const inter = Inter({ subsets: ['latin'] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Removemos as tags html e body, pois elas já existem no layout principal
  // AuthProvider com skipInitialCheck=true: fornece contexto sem verificar autenticação automaticamente
  // Isso evita chamadas desnecessárias a /api/auth/me que resultam em 401
  return (
    <div className="auth-layout">
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider skipInitialCheck={true}>
            <main className="min-h-screen">{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </QueryProvider>
      <Toaster />
    </div>
  );
}
