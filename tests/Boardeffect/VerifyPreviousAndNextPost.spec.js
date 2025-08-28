const { test, expect } = require('@playwright/test')


test('Verify Page title , Previous and Next Post is working fine', async ({ page, context }, testInfo) => {

    const pageUrl = 'https://development--boardeffect.netlify.app/en-au/blog/navigating-volunteer-board-member-lifecycle/'
    const stagHomePage = 'https://development--boardeffect.netlify.app'
    // navigate to pageUrl
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

    // get page title
    const pageUrlH1 = page.locator('//h1')
    const pageUrlHeading = await pageUrlH1.textContent()

    //check page title contains heading
    await expect(page).toHaveTitle(new RegExp(pageUrlHeading))
    // const pageUrlTitle = await expect(page).toHaveTitle(/'`${pageUrlHeading}`'/)
    // wait till previous post element is visible
    await expect(page.locator('//p[contains(text(),"PREVIOUS POST :")]')).toBeVisible()

    // locate and get the previous post link
    const prevPost = page.locator('//p[contains(text(),"PREVIOUS POST :")]/following-sibling::a')
    const prevPostHref = await prevPost.getAttribute('href')
    const prevPostLinkName = await prevPost.textContent()
    // console.log(prevPostHref)
    // console.log(stagHomePage+prevPostHref)

    // clicking on prev post approach is not working as history is not store goBack() does not work

    //open prev post link in new tab

    // open new tab
    const prevPostPage = await context.newPage()

    // focus to new tab
    await prevPostPage.bringToFront()

    // go to link on new tab
    await prevPostPage.goto(stagHomePage+prevPostHref, { waitUntil: 'networkidle' })
    
    // wait for previous ppost page to load
    await expect(prevPostPage.locator('(//img[@alt="BoardEffect Logo"])[1]')).toBeVisible()

    // compare page title with the prev post link text content
    await expect(prevPostPage).toHaveTitle(new RegExp(prevPostLinkName))

    // focus to original page
    await page.bringToFront()

    // // page to have original page heading and url
    // await expect(page).toHaveURL(pageUrl)
    // await expect(page).toHaveTitle(pageUrlHeading)

    // locate and get the previous post link
    const nextPost = page.locator('//p[contains(text(),"NEXT POST :")]/following-sibling::a')
    const nextPostHref = await nextPost.getAttribute('href')
    const nextPostLinkName = await nextPost.textContent()

    // open new tab
    const nextPostPage = await context.newPage()

    // focus to new tab
    await nextPostPage.bringToFront()

    // go to link on new tab
    await nextPostPage.goto(stagHomePage+nextPostHref, { waitUntil: 'networkidle' })
    
    // wait for previous ppost page to load
    await expect(nextPostPage.locator('(//img[@alt="BoardEffect Logo"])[1]')).toBeVisible()

    // compare page title with the prev post link text content
    await expect(nextPostPage).toHaveTitle(new RegExp(nextPostLinkName))

    // focus to original page
    //await page.bringToFront()

})