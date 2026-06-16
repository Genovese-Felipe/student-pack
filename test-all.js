const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    await page.goto('http://localhost:8080/');
    await page.waitForTimeout(2000);

    // Test Navigation links
    const navText = await page.evaluate(() => document.querySelector('nav').innerText);
    console.log("Nav Text Loaded:", navText.replace(/\n/g, ' '));

    // Test 'Explore the Pack'
    console.log("Clicking 'Explore the Pack'...");
    await page.evaluate(() => {
        window.loadGuide('PACK_GUIDE');
    });
    await page.waitForTimeout(3000);

    const errorVisible = await page.evaluate(() => {
        return document.body.innerText.includes('Error loading guide');
    });
    console.log("Error visible on PACK_GUIDE?", errorVisible);

    // Test Mermaid Diagrams (Home)
    await page.evaluate(() => {
        window.showSection('home');
    });
    await page.waitForTimeout(2000);
    const diagramRendered = await page.evaluate(() => {
        const svg = document.querySelector('#home-flow-diagram svg');
        return !!svg;
    });
    console.log("Home flow diagram rendered?", diagramRendered);

    await browser.close();
    process.exit(0);
})();
