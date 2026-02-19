import { chromium } from 'playwright';

(async () => {
    console.log("Iniciando navegação forçada para Reescrita...");
    const browser = await chromium.launch({
        headless: true,
        channel: "chrome"
    });
    const page = await browser.newPage();

    try {
        console.log("Acessando: http://localhost:3000/aulas/portugues/reescrita-frases");
        await page.goto('http://localhost:3000/aulas/portugues/reescrita-frases', { waitUntil: 'networkidle', timeout: 60000 });

        // Clica na aba de Resumo Visual para ver as imagens
        console.log("Clicando na aba Resumo Visual...");
        await page.click('button:has-text("Resumo Visual")');
        await page.waitForTimeout(1000); // Espera a animação

        await page.screenshot({ path: 'reescritura-visual-tabs.png', fullPage: true });
        console.log("Screenshot salvo: reescritura-visual-tabs.png");

    } catch (e) {
        console.error("Erro na navegação:", e);
    } finally {
        await browser.close();
    }
})();
