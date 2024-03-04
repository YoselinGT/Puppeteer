const puppeteer = require('puppeteer');

describe('Extraer informacion', () => {

    let browser
    let page
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        page = await browser.newPage()
        await page.goto('https://platzi.com/', {waitUntil: 'networkidle0'});
    }, 10000);

    afterAll(async () => {
        await browser.close();
    })


    it('Emulando dispositivos de forma manual', async () => {

        await page.emulate({
            name: 'Mi dispositivo',
            viewport: {
                width: 375,
                height: 667,
                deviceScaleFactor: 2,
                isMobile: true,
                hasTouch: true,
                isLandscape: false
            },
            userAgent: 'Mozilla/5.0 (Linux; Android 13; SAMSUNG SM-A235M) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36',
        })

        await new Promise(resolve => setTimeout(resolve, 3000));
    }, 30000)

    it('Emulando un sitio de escritorio', async () => {

        await page.setViewport({
            width: 1280,
            height: 800
        })

        await page.waitForTimeout(3000)

    }, 30000)

    it('Emulando sitio en una tablet', async () => {

        const tablet = puppeteer.KnownDevices['iPad Pro'];

        await page.emulate(tablet)

        await page.waitForTimeout(3000)

    }, 30000)

    it('Emulando sitio en una tablet en modo landscape', async () => {

        const tablet = puppeteer.KnownDevices['iPad landscape'];

        await page.emulate(tablet)

        await page.waitForTimeout(3000)

    }, 30000)

    it('Emulando sitio en un celular', async () => {

        const iphone = puppeteer.KnownDevices['iPhone X'];

        await page.emulate(iphone)

        await page.waitForTimeout(3000)

    }, 30000)

    it('Abrir un navegador en modo incognito', async () => {

        const iphone = puppeteer.KnownDevices['iPhone X'];

        await page.emulate(iphone)

        await page.waitForTimeout(3000)

    }, 30000)


})