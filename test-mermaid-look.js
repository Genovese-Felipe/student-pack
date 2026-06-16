const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('http://localhost:8080/');
    await page.waitForTimeout(2000);

    // Check innerHTML for anything resembling the old primaryColor vs new
    const innerHtml = await page.evaluate(() => document.querySelector('#home-flow-diagram svg').innerHTML);
    if(innerHtml.includes('#e0e7ff') || innerHtml.includes('rgb(224, 231, 255)')) {
        console.log("Found NEW primary color in DOM.");
    } else if (innerHtml.includes('#dbeafe') || innerHtml.includes('rgb(219, 234, 254)')) {
        console.log("Found OLD primary color in DOM.");
    } else {
        console.log("Colors might be set via CSS vars, SVG check failed. Dumping first 300 chars: ", innerHtml.substring(0, 300));
    }

    await browser.close();
    process.exit(0);
})();
