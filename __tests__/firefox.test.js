const puppeteer = require('puppeteer');
const {AxePuppeteer} = require('@axe-core/puppeteer');
const { createHtmlReport } = require('axe-html-reporter');

describe('Accesibilidad', () => {

    let browser
    let page
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        page = await browser.newPage()


    }, 10000);

    afterAll(async () => {
        await browser.close();
    })

    it('Probar la accesibilidad', async () => {

        await page.goto('https://platzi.com');
        await page.waitForSelector('img')
        const snapshot = await page.accessibility.snapshot();
        console.log(snapshot)

    }, 30000)

    it('Probar la accesibilidad con axe', async () => {
        //Es para el content security policy
        await page.setBypassCSP(true);
        await page.goto('https://platzi.com');
        await page.waitForSelector('img')
        const result = await new AxePuppeteer(page).analyze();
        console.log(result.violations[0].nodes[0]);

    }, 30000)

    it('Accebilidad con AXE con reporte HTML', async () => {
        await page.setBypassCSP(true);

        await page.goto('https://firmenti.com', {
            waitUntil: 'networkidle2'
        });

        await page.waitForSelector('img');

        const rawAxeResults = await new AxePuppeteer(page).analyze();

        createHtmlReport({
            results: rawAxeResults,
            options: {
                projectKey: 'Mi primer reporte AXE',
                doNotCreateReportFile: false,
            }
        });
    },10000)

})