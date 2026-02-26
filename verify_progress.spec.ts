import { test, expect } from '@playwright/test';

test('verify progress bar interactions', async ({ page }) => {
  // Vá para a página da aula
  await page.goto('http://localhost:3000/aulas/portugues/crase');
  
  // 1. Verificar que a barra está oculta inicialmente (0%)
  const progressBar = page.locator('#progress-indicator');
  await expect(progressBar).not.toBeVisible();

  // 2. Rolar a página para baixo
  await page.evaluate(() => window.scrollTo(0, 500));
  
  // 4. Verificar que a barra está visível e centralizada
  await expect(progressBar).toBeVisible();
  
  const box = await progressBar.boundingBox();
  if (box) {
    const viewportWidth = page.viewportSize()?.width || 0;
    const barCenterX = box.x + box.width / 2;
    const tolerance = 5; // allow 5px deviation
    expect(Math.abs(barCenterX - viewportWidth / 2)).toBeLessThan(tolerance);
  }

  // 5. Verificar o tooltip (deve estar presente quando a barra aparece)
  const tooltip = page.locator('text=%');
  await expect(tooltip).toBeVisible();

  // 5. Rolar de volta para o topo
  await page.evaluate(() => window.scrollTo(0, 0));
  
  // 6. Verificar que a barra some (fade-out)
  await expect(progressBar).not.toBeVisible();
});
