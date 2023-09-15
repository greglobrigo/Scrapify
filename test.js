import puppeteer from 'puppeteer'
import 'dotenv/config'

async function testPuppeteer(){
    console.log('Initializing Sprout Login...')

        const url = process.env.URL
        const username = process.env.USER
        const password = process.env.PASSWORD
        const browser = await puppeteer.launch({
            headless: "new",
            defaultViewport: { width: 1720, height: 720 },
            args: ['--disable-extensions', "--force-device-scale-factor=1", "--window-position=0,0, --no-sandbox --disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        await page.goto(`${url}`, { waitUntil: 'load' });
        await new Promise(resolve => setTimeout(resolve, 3000));
        //take snapshot
        await page.screenshot({path: 'example.png'});
        console.log('Sprout Page Loaded')

        //Login Page Action
        await page.waitForSelector('#txtUsername', { visible: true })
        await page.waitForSelector('#txtPassword', { visible: true })
        // await page.waitForSelector('#btnLogIn', { visible: true })
        // const randomClickX1 = Math.floor(Math.random() * 1000) + 1
        // const randomClickY2 = Math.floor(Math.random() * 1000) + 1
        // const randomClickX3 = Math.floor(Math.random() * 1000) + 1
        // const randomClickY4 = Math.floor(Math.random() * 1000) + 1
        // await page.mouse.click(randomClickX1, randomClickY2, { button: 'left' })
        // await page.mouse.click(randomClickX3, randomClickY4, { button: 'left' })
        console.log('Keying in Username and Password...')

        //Key in Username and Password
        await page.type('#txtUsername', `${username}`, { delay: 100 });
        await page.type('#txtPassword', password, { delay: 100 });
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.click('#btnLogIn', { delay: 200 })
        console.log('Logged In to Sprout Portal!')

        //Logged in to portal
        await new Promise(resolve => setTimeout(resolve, 5000));
        await page.waitForSelector('.large-image')
        await page.evaluate(() => { document.querySelector('img.large-image').click() }, { delay: 200 }); //Click on Clock Icon
        await new Promise(resolve => setTimeout(resolve, 3000));

        //Handle Pop Up and Close New Tab
        try {
            await page.click('#pendo-button-4bc214b9')
            await new Promise(resolve => setTimeout(resolve, 5000));
            const allPages = await browser.pages()
            await allPages[allPages.length - 1].close()
        } catch { }

        //Confirm Login
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.click('#dashboard-container-fluid > div.col-md-12 > div > div.col-md-8 > div > div.col-md-6.widget.clearfix > div > div.widget-title.widget-2.parent > div > div.clock-pop-up > ul > li:nth-child(1)') //Click on Log me In
        await new Promise(resolve => setTimeout(resolve, 3000));
        //await page.click('body > div.bootbox.modal.fade.in > div > div > div.modal-footer > button.btn.our-button')//Click on Yes
        console.log('reached the last step before logging in')
        console.log(`Timed In Successfully at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}`)
        // await new Promise(resolve => setTimeout(resolve, 3000));
        // await page.click('body > div.bootbox.modal.fade.bootbox-alert.in > div > div > div.modal-footer > button') //Click on Yes on the alert prompt
        // await new Promise(resolve => setTimeout(resolve, 3000));
        // console.log('Logging Out of Sprout Portal...')
        // await page.click('#Emp-Name') //Click on Employee Name
        // await new Promise(resolve => setTimeout(resolve, 3000));
        // await page.click('#LinkButton1', { delay: 200 }) //Click on Logout
        // await page.waitForNavigation({ waitUntil: 'networkidle0' })
        // console.log('Logged Out Successfully')
        await browser.close();
        console.log('Browser Closed')
}

testPuppeteer()