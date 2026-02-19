import { chromium } from 'playwright';

(async () => {
    console.log("Iniciando navegação para Reescrita de Frases (Corrigido)...");
    const browser = await chromium.launch({
        headless: true,
        channel: "chrome"
    });
    const page = await browser.newPage();

    try {
        console.log("Acessando: http://localhost:3000/aulas/portugues/reescrita-frases");
        await page.goto('http://localhost:3000/aulas/portugues/reescrita-frases', { waitUntil: 'networkidle', timeout: 60000 });

        await page.screenshot({ path: 'reescrita-corrigida-ui.png', fullPage: true });
        console.log("Screenshot salvo: reescrita-corrigida-ui.png");

    } catch (e) {
        console.error("Erro na navegação:", e);
    } finally {
        await browser.close();
    }
})();
