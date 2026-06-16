const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('http://localhost:8080/');
    await page.waitForTimeout(2000);

    const navHTML = await page.evaluate(() => document.querySelector('nav').outerHTML);
    console.log("NAV HTML:", navHTML);

    await browser.close();
    process.exit(0);
})();
