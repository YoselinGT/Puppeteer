const puppeteer = require('puppeteer');

describe('Extrayendo información',()=> {

    jest.setTimeout(35000);

    it('Tipos de espera',async ()=>{
        //Segundo forma de indicar que aumente el tiempo de espera para completar las pruebas

        const browser = await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            slowMo: 100,
            //devtools: true,
            //defaultViewport: {
                //width: 2100,
                //height:1080
            //}
            //args: ['--window-size=1920,1080']
        })

        //Expera para la navegación
        const page = await browser.newPage();

        //Tecera forma de indicar le timeout
        page.setDefaultTimeout(10000);
        page.setDefaultNavigationTimeout(10000);

        await page.goto('https://platzi.com/',{waitUntil:'networkidle0'});

        //Espera explicita
        //await new Promise(resolve => setTimeout(resolve, 3000));

        //Espera por un selector
        await page.waitForSelector('#cms-landings > section > section.Hero.Bg-animation > div > h1 > span');

        //Espera por un xpath
        await page.waitForXPath('//*[@id="cms-landings"]/section/section[1]/div/h1/span');

        // Espera a que aparezca
        await page.goto('https://demoqa.com/modal-dialogs',{waitUntil:'networkidle2'});
        await page.waitForSelector('#showSmallModal',{visible: true})
        await page.click('#showSmallModal');

        //await new Promise(resolve => setTimeout(resolve, 3000));

        //Espera por función
        await page.waitForFunction(()=> document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal')

        await page.click('#closeSmallModal')

        //Validar que ya se haya cerrado el modal
        //Espera por función
        await page.waitForFunction(()=> !document.querySelector('#example-modal-sizes-title-sm'),{
            timeout: 30000
        })

        //Ejemplo para observar el viewport
        const observarResize = page.waitForFunction('window.innerWidth < 100');
        await page.setViewport({width:50, height: 50})

        await observarResize;

        await browser.close();
    })
    //},30000)
})


