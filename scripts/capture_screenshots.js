const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Viewport size for standard desktop view
    await page.setViewport({ width: 1280, height: 800 });

    const baseUrl = 'http://localhost:3000';
    const outDir = path.join(__dirname, '../public/assets/guide');

    // Ensure output directory exists
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    const routes = [
        { path: '/', name: 'homepage' },
        { path: '/apply', name: 'apply_page' },
        { path: '/join', name: 'join_page' },
        { path: '/directory', name: 'directory_page' },
        { path: '/sign-in', name: 'sign_in_page' }
    ];

    for (const route of routes) {
        console.log(`Capturing ${route.name}...`);
        try {
            await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'networkidle0', timeout: 30000 });
            await page.screenshot({ path: path.join(outDir, `${route.name}.png`), fullPage: false });
            console.log(`Saved ${route.name}.png`);
        } catch (e) {
            console.error(`Failed to capture ${route.name}:`, e.message);
        }
    }

    await browser.close();
})();
