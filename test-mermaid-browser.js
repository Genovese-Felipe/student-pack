const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    page.on('requestfailed', request => console.log('FAILED REQ:', request.url(), request.failure().errorText));

    await page.goto('http://localhost:8080/');

    // wait for load
    await page.waitForTimeout(2000);

    // click 'Explore the Pack'
    console.log("Clicking 'Explore the Pack'...");
    await page.evaluate(() => {
        loadGuide('PACK_GUIDE');
    });

    await page.waitForTimeout(3000);

    const errorVisible = await page.evaluate(() => {
        return document.body.innerText.includes('Error loading guide');
    });
    console.log("Error visible?", errorVisible);

    await browser.close();
    process.exit(0);
})();
