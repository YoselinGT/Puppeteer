const puppeteer = require('puppeteer');

describe('Extraer informacion',()=> {

    let browser
    let page
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        page = await browser.newPage()
        await page.goto('https://platzi.com/',{waitUntil:'networkidle0'});
    },10000);

    afterAll(async()=>{
        await browser.close();
    })


    it('Contar los elemenentos de una página',async ()=>{

        const images = await page.$$eval('img',(imagenes) => imagenes.length);

        console.log(images);
    },30000)

    it('Extraer la información de un elemento',async ()=>{

        await page.waitForSelector('#Header-v2 > nav.Nav-header.Nav-header-mobileCtas > div.Menu > div > div > ul > li:nth-child(7) > a');

        const nombreBoton = await page.$eval('#Header-v2 > nav.Nav-header.Nav-header-mobileCtas > div.Menu > div > div > ul > li:nth-child(7) > a',(button) => button.textContent);

        console.log(nombreBoton);

        const [button] = await page.$x("//*[@id=\"Header-v2\"]/nav[1]/section/button[2]/span");

        const propiedad = await button.getProperty('textContent');
        const texto = await propiedad.jsonValue();

        console.log(texto);

        //Segunda manera con xPath
        const texto2 = await page.evaluate((name) => name.textContent, button);
        console.log(texto2);

        //Tercer forma
        const button3 = await page.waitForXPath("//*[@id=\"Header-v2\"]/nav[1]/section/button[2]/span");
        const texto3 = await page.evaluate((name) => name.textContent, button3);
        console.log(texto3);

    },30000)

    it('Extraer el titulo de la página y la url',async ()=>{

        const titulo = await page.title();
        const url = await page.url();

        console.log(titulo,url);

    },30000)
})