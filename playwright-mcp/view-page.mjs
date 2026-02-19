import { chromium } from 'playwright';

(async () => {
    console.log("Iniciando navegação forçada...");
    const browser = await chromium.launch({
        headless: true, // headless para ser rápido no terminal
        channel: "chrome"
    });
    const page = await browser.newPage();

    try {
        console.log("Acessando: http://localhost:3000/aulas/portugues/coesao-coerencia");
        await page.goto('http://localhost:3000/aulas/portugues/coesao-coerencia', { waitUntil: 'networkidle', timeout: 60000 });

        // Tira print para eu ver os cards
        await page.screenshot({ path: 'debug-ui.png', fullPage: true });
        console.log("Screenshot salvo: debug-ui.png");

        // Me dá o HTML para eu analisar erros
        const content = await page.content();
        console.log("---CONTENT_START---");
        console.log(content.substring(0, 1000)); // Só o começo para confirmar
        console.log("---CONTENT_END---");

    } catch (e) {
        console.error("Erro na navegação:", e);
    } finally {
        await browser.close();
    }
})();
