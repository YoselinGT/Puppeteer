const puppeteer = require('puppeteer');

describe('Es mi primer test en puppeteer',()=> {

    it('Debe de abrir y cerrar el navegador',async ()=>{
        const browser = await puppeteer.launch({
            headless:false
        })

        const page = await browser.newPage()
        await page.goto('https://www.google.com/')
        await new Promise(resolve => setTimeout(resolve, 5000));
        await browser.close();
    })
})