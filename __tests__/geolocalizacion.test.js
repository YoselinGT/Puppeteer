const puppeteer = require('puppeteer');

describe('Capturas de pantalla', () => {

    let browser
    let page
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        page = await browser.newPage()
        await page.goto('https://google.com/', {waitUntil: 'networkidle0'});
    }, 10000);

    afterAll(async () => {
        await browser.close();
    })


    it('Captura de pantalla completa', async () => {

        await page.screenshot({
            path:'./capturaDePantalla.png',
            fullPage: true
        })


    }, 30000)

    it('Captura de pantalla seleccionado una arear', async () => {

        await page.screenshot({
            path:'./capturaDePantallaSeleccionandoUnArea.png',
            clip:{
                x:0,
                y:0,
                width:500,
                height: 500
            }
        })


    }, 30000)
    it('Captura de pantalla seleccionado con fondo transparente', async () => {

        await page.evaluate(()=> (document.body.style.background = 'transparent'))
        await page.screenshot({
            path: './capturaDePantallaTransparente.png',
            omitBackground: true

        })

    }, 30000)


    it('Captura de pantalla a un elemento', async () => {

        const elemento = await page.waitForSelector('body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img')
        await page.evaluate(()=> (document.body.style.background = 'transparent'))
        await elemento.screenshot({
            path: './capturaDePantallaDeUnElemento.png'
        })

    }, 30000)


})