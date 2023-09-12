const puppeteer = require('puppeteer');
require('dotenv').config()

async function initializeLogin() {

    const password = process.env.PASSWORD
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {width: 1720, height: 720},
        args: ['--disable-extensions', "--force-device-scale-factor=1", "--window-position=0,0"],
    });
    const page = await browser.newPage();
    await page.goto(`${process.env.URL}`, { waitUntil: 'load' });
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.waitForSelector('#txtUsername', { visible: true })
    await page.waitForSelector('#txtPassword', { visible: true })
    await page.waitForSelector('#btnLogIn', { visible: true })
    //  await new Promise(resolve => setTimeout(resolve, 3000));
    const randomClickX1 = Math.floor(Math.random() * 1000) + 1
    const randomClickY2 = Math.floor(Math.random() * 1000) + 1
    const randomClickX3 = Math.floor(Math.random() * 1000) + 1
    const randomClickY4 = Math.floor(Math.random() * 1000) + 1
    //await new Promise(resolve => setTimeout(resolve, 3000));
    await page.mouse.click(randomClickX1, randomClickY2, { button: 'left' })
    await page.mouse.click(randomClickX3, randomClickY4, { button: 'left' })
    //imitate a typing action
    await page.type('#txtUsername', `${process.env.USERNAME}`, { delay: 100 });
    await page.type('#txtPassword', password, { delay: 100 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.click('#btnLogIn', { delay: 200 })

    console.log('logged in')
    await new Promise(resolve => setTimeout(resolve, 5000));
    await page.waitForSelector('.large-image')
    await page.evaluate(() => { document.querySelector('img.large-image').click() }, { delay: 200 });
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.click('#dashboard-container-fluid > div.col-md-12 > div > div.col-md-8 > div > div.col-md-6.widget.clearfix > div > div.widget-title.widget-2.parent > div > div.clock-pop-up > ul > li:nth-child(1)', { delay: 200 })
    await new Promise(resolve => setTimeout(resolve, 3000));
    try {
        await page.click('#pendo-button-4bc214b9', { delay: 200 })
        await new Promise(resolve => setTimeout(resolve, 5000));
        const allPages = await browser.pages()
        await allPages[allPages.length - 1].close()
    } catch { }
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.click('#dashboard-container-fluid > div.col-md-12 > div > div.col-md-8 > div > div.col-md-6.widget.clearfix > div > div.widget-title.widget-2.parent > div > div.clock-pop-up > ul > li:nth-child(1)', { delay: 200 })
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.click('body > div.bootbox.modal.fade.in > div > div > div.modal-footer > button.btn.our-button', { delay: 200 })
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.click('body > div.bootbox.modal.fade.bootbox-alert.in > div > div > div.modal-footer > button', { delay: 200 })
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.click('#Emp-Name', { delay: 200 })
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.click('#LinkButton1', { delay: 200 })
    console.log('done')
    await browser.close();
}

initializeLogin()

