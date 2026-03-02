import { test, expect } from '@playwright/test';
import path from 'path';

test('capture-modal-screenshot', async ({ page }) => {
  // Navega para a página de posts
  await page.goto('http://localhost:3000/posts');
  
  // Espera a página carregar (botão de novo post)
  // Como pode haver redirecionamento ou carregamento lento, vamos esperar um seletor genérico primeiro
  await page.waitForLoadState('networkidle');
  
  const newPostButton = page.getByRole('button', { name: /novo post/i });
  await expect(newPostButton).toBeVisible();
  
  // Clica para abrir o modal
  await newPostButton.click();
  
  // Espera o modal aparecer
  const modal = page.locator('div[role="dialog"]');
  await expect(modal).toBeVisible();
  
  // Tira o screenshot do modal e salva no diretório de artefatos
  const screenshotPath = path.join('C:', 'Users', 'andre.hugo', '.gemini', 'antigravity', 'brain', '6d250a66-b8ae-4b9a-9015-68b6754c1764', 'real_modal_reference.png');
  await modal.screenshot({ path: screenshotPath });
  
  console.log(`Screenshot saved to ${screenshotPath}`);
});
