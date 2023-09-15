import puppeteer from 'puppeteer'
import 'dotenv/config'

async function testPuppeteer(){
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: { width: 1720, height: 720 },
        args: ['--disable-extensions', "--force-device-scale-factor=1", "--window-position=0,0, --no-sandbox --disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await browser.close();
    console.log('done')
}

testPuppeteer()