const puppeteer = require('puppeteer-core');

async function initializeScrape(searchTerm) {

  const createRandomDelay = () => {
    const randomDelay = Math.floor(Math.random() * 3000) + 2000
    return randomDelay
  }

  const sleep = async (n) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, n * 1000)
    })
  }

  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ['--disable-extensions'],
    executablePath: `${process.env.EXECUTABLE_PATH}`,
    userDataDir: `${process.env.USER_DATA_DIR}`
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(`${process.env.URL2 + searchTerm}`, { waitUntil: 'networkidle2' });

  try {
    await page.click('.bx-button', { delay: createRandomDelay() })
    const buttons = await page.$$('.bx-button')
    await buttons[5].click()
  } catch{}

  console.log('passed pop up')

  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight) });
  await sleep(1)

  let loadMoreButton = await page.$$('.rw-button-secondary')
  let buttonExists = loadMoreButton ? true : false

  console.log('passed scroll')
  console.log('checking for load more button', loadMoreButton ? 'found' : 'not found')

  let c = 0
  while (buttonExists) {
    try {
      c++
      await page.waitForSelector('.rw-button-secondary', { timeout: 5000 })
      await page.evaluate(() => { document.querySelector('.rw-button-secondary').click() })
      await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
      console.log(`clicked load more ${c} times`)
    } catch(e) {
      buttonExists = false
    }
  }

  console.log('passed load more')

  const productsContainer = await page.$$('.list-unstyled.mt-3 > li')

  console.log(productsContainer.length, 'products found')

  const result = []
  let data = {}

  for (let i = 0; i < productsContainer.length; i++) {
    const product = productsContainer[i]

    const name = await page.evaluate(el => el.querySelector('a').textContent, product)
    data['name'] = name ? name.trim() : null

    const partNo = await page.evaluate(el => el.querySelector('.rw-grey-blue').textContent, product)
    data['partNo'] = partNo ? partNo.trim() : null

    const price = await page.evaluate(el => el.querySelector('.pricing').textContent, product)
    data['price'] = price ? price.trim() : null

    const imgSrc = await page.evaluate(el => el.querySelector('img').src, product)
    data['imgSrc'] = imgSrc ? imgSrc.trim() : null

    const availability = await page.evaluate(el => el.querySelector('.availability').textContent, product)
    data['availability'] = availability ? availability.trim() : null

    result.push(data)
    data = {}
  }


  console.log(result)
  console.log(`scraping completed, pressed load more ${c} times`)
  console.log(`scraped ${result.length} products`)
  //await browser.close();
}

initializeScrape()

