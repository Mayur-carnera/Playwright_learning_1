const { test, expect } = require('@playwright/test')

test('Get list of displayed blogs/guides from listing page', async ({ page }) => {

    let pageUrl = 'https://boardeffect.com/blog/'
    let linkList = []
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

    const loadMoreButton = page.locator('//span[contains(text(),"Load more posts")]')
    let clickCount = 0

    while ((await loadMoreButton.isVisible()) && (clickCount < 5)) {
        // await expect(loadMoreButton).toBeVisible()
        await loadMoreButton.click()
        await page.waitForSelector('//span[contains(text(),"Load more posts")]')
        await page.waitForLoadState('domcontentloaded')
        clickCount++
        console.log(clickCount)
    }

    await page.locator('//button[contains(text(),"Subscribe")]').hover()

    await page.waitForLoadState('domcontentloaded')

    await page.waitForSelector('//h4[contains(@class, "mt-2 text-")]')

    let currentBlogCount = await page.locator('//h4[contains(@class, "mt-2 text-")]').count()

    let displayedPosts = page.locator('//h4[contains(@class, "mt-2 text-")]')

    console.log('current post count =' + currentBlogCount)

    await expect(displayedPosts).toHaveCount(36)

    for (let i = 0; i < currentBlogCount; i++) {
        const link = await displayedPosts.nth(i).getAttribute('href')
        console.log(link)
        linkList.push(link)
    }

    // console.log('Complete list is =' + linkList)

})