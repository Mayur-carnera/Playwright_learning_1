const { test, expect } = require('@playwright/test')


test('Verify JumpToSection is working fine', async ({ page }, testInfo) => {

    const pageUrl = 'https://development--boardeffect.netlify.app/en-au/blog/navigating-volunteer-board-member-lifecycle/'

    await page.goto(pageUrl, { waitUntil: 'networkidle' })

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
        await page.screenshot({ path: `./testsExportData/failed_${pageUrl}_.png` })
        if (await allowCookieLocator.isVisible()) {
            console.log('Cookie button found second time')
            await allowCookieLocator.click()
            console.log('Boardeffect logo was NOT visible, clicked allow cookies button again!')
        }
    }
    // check jump to menu is visible or not
    const jumpTo = page.locator('//div[@class="border-l border-[#E7E7F0]"]')
    await expect(jumpTo).toBeVisible()

    // locate list of text option in Jump to menu
    const jumpToOptions = page.locator('//div[@class="border-l border-[#E7E7F0]"]/p')

    // locate and click last option from the menu
    const jumpToLastOptionText = await jumpToOptions.last().textContent()
    await jumpToOptions.last().click()

    // calculate locator of respective heading in content
    const jumpToLastOptionLocator = page.locator(`//h2[contains(text(),'${jumpToLastOptionText}')]`)


    // to be visible on screen without scrolling
    await expect(jumpToLastOptionLocator).toBeInViewport()
    
    // await expect(jumpToLastOptionLocator).toBeVisible()
    // const box1 = await jumpToLastOptionLocator.boundingBox()
    // expect(box1.x).toEqual(466)
    // console.log(box1)

    // locate and click First option from the menu
    const jumpToFirstOptionText = await jumpToOptions.first().textContent()
    await jumpToOptions.first().click()

    // calculate locator of respective heading in content
    const jumpToFirstOptionLocator = page.locator(`//h2[contains(text(),'${jumpToFirstOptionText}')]`)

    // to be visible on screen without scrolling
    await expect(jumpToFirstOptionLocator).toBeInViewport()

    // await expect(jumpToFirstOptionLocator).toBeVisible()
    //const box2 = await jumpToFirstOptionLocator.boundingBox()
    // expect(box2.x).toEqual(466)
    // console.log(box2)

})