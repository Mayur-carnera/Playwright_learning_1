module.exports = {
    workers: 4, // Number of parallel workers
    use: { browserName: 'chromium' }
}

const { test, expect } = require('@playwright/test')
const XLSX = require('xlsx')


test.describe.parallel('testing URLs parallelly for 404', () => {

    const fileName = './testsInitialData/Boardeffect_sampleTestData.xlsx'
    const boardeffectWorkbook = XLSX.readFile(fileName)
    const sheetNames = boardeffectWorkbook.SheetNames

    for (const region of sheetNames) {
        const regionJson = XLSX.utils.sheet_to_json(region)
        const regionURLlist = regionJson.map(row => row['URL'])

        for (const blogUrl of regionURLlist) {

            test('testing for region ->' + region + ':: URL ::' + blogUrl, async ({ page }) => {

                await page.goto(amersBlog)

                await expect(page.locator('(//img[@alt="fb logo"])[1]')).toBeVisible()

                await expect(page.locator('//h1[normalize-space()="404"]')).not.toBeVisible()

            })

        }
    }
})