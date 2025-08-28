const { test, expect } = require('@playwright/test')
const XLSX = require('xlsx')

test('check webpage URLs for possible 404s', async ({ page }) => {

    //const fileName = '/Users/mayurwani/Desktop/Mayur_work/Playwright/Proj2_VScode_ext/testsInitialData/Boardeffect_sampleTestData.xlsx'

    const fileName = './testsInitialData/Boardeffect_sampleTestDataSmall.xlsx'
    const boardeffectWorkbook = XLSX.readFile(fileName)
    const sheetNames = boardeffectWorkbook.SheetNames

    //console.log(sheetNames)

    for (const region of sheetNames) {
        const regionJsonSheet = boardeffectWorkbook.Sheets[region]
        const regionJson = XLSX.utils.sheet_to_json(regionJsonSheet)
        const regionURLlist = regionJson.map(row => row['URL'])

        //console.log(regionURLlist)

        for (const blogUrl of regionURLlist) {

            // navigate to the page URL
            await page.goto(blogUrl, { waitUntil: 'networkidle' })

            // handle allow cookies pop-up
            const allowCookieLocator = page.locator('(//span[@class="relative flex items-center group-active:text-white"])[3]')
            if (await allowCookieLocator.isVisible()) {
                await allowCookieLocator.click()
            }

            // wait for page loading
            await expect(page.locator('(//img[@alt="BoardEffect Logo"])[1]')).toBeVisible()

            // await page.waitForLoadState('domcontentloaded')

            // check for fb logo is present on the page to confirm page content visibility
            await expect(page.locator('(//img[@alt="fb logo"])[1]')).toBeVisible()

            // check for absense of 404 message to ensure content visibility
            await expect(page.locator('//h1[normalize-space()="404"]')).not.toBeVisible()
        }
    }
})