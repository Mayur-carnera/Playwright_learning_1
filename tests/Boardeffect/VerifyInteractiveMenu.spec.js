const {test, expect} = require ('@playwright/test')

test('Verify interactive menus', async ({page})=>{

    let homePage = 'https://boardeffect.com/'
    let linkList = []
    await page.goto(homePage, { waitUntil: 'networkidle' })

    // handle allow cookies pop-up
    const allowCookieLocator = page.locator('//span[contains(text(),"Allow All Cookies")]')
    if (await allowCookieLocator.isVisible()) {
        console.log('Cookie button found')
        await allowCookieLocator.click()
        console.log('Cookie button clicked once')
    }

    // handle intermittently occuring larger cookies panel in case of multiple workers
    if (await page.locator('(//img[@alt="BoardEffect Logo"])[1]').isVisible()) {
        console.log('Boardeffect logo is visible')
    } else {
        console.log('Boardeffect logo is NOT visible')
        await page.screenshot({ path: `./testsExportData/failed_${homePage}_.png` })
        if (await allowCookieLocator.isVisible()) {
            console.log('Cookie button found second time')
            await allowCookieLocator.click()
            console.log('Boardeffect logo was NOT visible, clicked allow cookies button again!')
        }
    }

    const topBarMenus = page.locator('//div[@class="group relative h-12"]')

    await expect(topBarMenus).toHaveCount(5)

    await page.locator(topBarMenus).nth(1).hover()

    await page.locator('(//div[@class="group relative h-12"]/div/a)').toHaveCount(3)

    await page.locator()

    // (//div[@class="group relative h-12"]/div/a)[2]



})