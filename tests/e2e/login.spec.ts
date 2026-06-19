import { test, expect } from '@playwright/test';

test.describe('Autenticação e Proteção de Rotas', () => {

  test('Visitante não logado deve ser redirecionado da rota protegida (/dashboard) para o /login', async ({ page }) => {
    // Tenta acessar rota protegida
    const response = await page.goto('/dashboard');
    
    // Verifica se a URL mudou para /login devido ao redirect do proxy.ts
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('Página de login deve renderizar corretamente para visitante', async ({ page }) => {
    await page.goto('/login');
    // Verifica a presença de elementos típicos de login
    await expect(page.locator('text=Entrar').first()).toBeVisible();
  });

  test('Deve suportar rede lenta sem quebrar a interface (Slow 3G mock)', async ({ page }) => {
    // Simular rede bem lenta interceptando as rotas do Next e adicionando delay
    await page.route('**/*', async (route) => {
      await new Promise(f => setTimeout(f, 500));
      await route.continue();
    });
    
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=Entrar').first()).toBeVisible({ timeout: 15000 });
  });

  test('Deve lidar de forma resiliente com erro 500 simulado no backend (Mock crash)', async ({ page }) => {
    // Falha em qualquer rota de API com 500
    await page.route('**/api/**', async (route) => {
      await route.fulfill({ status: 500, body: 'Internal Server Error' });
    });
    
    await page.goto('/login');
    // Como mockamos a API, se houvesse uma chamada de onload, a interface não poderia crachar
    await expect(page.locator('text=Entrar').first()).toBeVisible();
  });

});
