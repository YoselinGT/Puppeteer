const puppeteer = require('puppeteer');

describe('Es mi primer test en puppeteer',()=> {

    it('Debe de abrir y cerrar el navegador',async ()=>{
        const browser = await puppeteer.launch({
            headless:true,
            defaultViewport:null
            //slowMo: 0,
            //devtools: true,
            //defaultViewport: {
                //width: 2100,
                //height:1080
            //}
            //args: ['--window-size=1920,1080']
        })

        const page = await browser.newPage();
        await page.goto('https://github.com/');
        //await new Promise(resolve => setTimeout(resolve, 5000));
        await page.waitForSelector('img');
        //Reaargar la pagina
        await page.reload();
        //Ir a otro sitio
        await page.goto('http://localhost/portal/');
        await page.waitForSelector('#frm > button')
        //Navegar hacia atras
        await page.goBack();
        await page.goForward();

        //Abrir otra pagina
        const page2 = await browser.newPage();
        await page2.goto("https://firmenti.com/")


        await new Promise(resolve => setTimeout(resolve, 3000));
        await browser.close();
    },30000)
})