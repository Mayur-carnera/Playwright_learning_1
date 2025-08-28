module.exports = {
    workers: 4, // Number of parallel workers
    use: { browserName: 'chromium' }
}

const { test, expect } = require('@playwright/test')
const XLSX = require('xlsx')

const fs = require('fs')

test.setTimeout(500000)


test.describe.parallel('testing URLs parallelly for 404s', () => {

    //const fileName = '/Users/mayurwani/Desktop/Mayur_work/Playwright/Proj2_VScode_ext/testsInitialData/Boardeffect_sampleTestData.xlsx'
    // read initial data xlsx file
    const fileName = './testsInitialData/Boardeffect_sampleTestDataSmall.xlsx'
    const boardeffectWorkbook = XLSX.readFile(fileName)
    const sheetNames = boardeffectWorkbook.SheetNames

    // to store url and its loading status per worker

    let pageStatus0 = []
    let pageStatus1 = []
    let pageStatus2 = []
    let pageStatus3 = []

    //console.log(sheetNames)
    // to browse through the sheets of the provided xlsx
    for (const region of sheetNames) {
        const regionJsonSheet = boardeffectWorkbook.Sheets[region]
        const regionJson = XLSX.utils.sheet_to_json(regionJsonSheet)
        const regionURLlist = regionJson.map(row => row['URL'])

        //console.log(regionURLlist)
        //to get URL from each row from the sheet being iterated through
        for (const pageUrl of regionURLlist) {

            test('testing for region > ' + region + ' > URL > ' + pageUrl, async ({ page },testInfo) => {

                let pageURL = pageUrl
                let status = 'unknownResult'
                let workerNumber = testInfo.workerIndex

                // navigate to the page URL
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

                // To check if the page content is loaded or boardeffect 404 page is displayed
                if (await page.locator('(//img[@alt="fb logo"])[1]').isVisible()) {
                    console.log('fb logo was found, Test PASSED!')
                    status = 'fb logo was found, Test PASSED!'
                } else {
                    await expect(page.locator('//h1[normalize-space()="404"]')).toBeVisible()
                    console.log('boardeffect 404 was observed')
                    status = 'boardeffect 404 was observed'
                    // test.fail()
                }

                // create object containing URL and its respective loading status
                let datapoint = {'URL' : pageURL, 'Status' : status}
                // console.log(datapoint)

                // Export URL and loading status to respective json file
                switch (workerNumber) {
                    case 0: 
                        pageStatus0.push(datapoint)
                        //console.log(pageStatus0)
                        fs.writeFileSync('./testsExportData/pageStatus0.json', JSON.stringify(pageStatus0, null, 2))
                        break
                    case 1:
                        pageStatus1.push(datapoint)
                        fs.writeFileSync('./testsExportData/pageStatus1.json', JSON.stringify(pageStatus1, null, 2))
                        break
                    case 2:
                        pageStatus2.push(datapoint)
                        fs.writeFileSync('./testsExportData/pageStatus2.json', JSON.stringify(pageStatus2, null, 2))
                        break
                    case 3:
                        pageStatus3.push(datapoint)
                        fs.writeFileSync('./testsExportData/pageStatus3.json', JSON.stringify(pageStatus3, null, 2))
                        break

                }
            })
        }
    }

    // to convert json to xlsx files

    //to convert json file to readable json data
    const jsonData0 = JSON.parse(fs.readFileSync('./testsExportData/pageStatus0.json', 'utf8'))
    const jsonData1 = JSON.parse(fs.readFileSync('./testsExportData/pageStatus1.json', 'utf8'))
    const jsonData2 = JSON.parse(fs.readFileSync('./testsExportData/pageStatus2.json', 'utf8'))
    const jsonData3 = JSON.parse(fs.readFileSync('./testsExportData/pageStatus3.json', 'utf8'))

    //to append json data to xlsx sheet
    const worksheet0 = XLSX.utils.json_to_sheet(jsonData0)
    const worksheet1 = XLSX.utils.json_to_sheet(jsonData1)
    const worksheet2 = XLSX.utils.json_to_sheet(jsonData2)
    const worksheet3 = XLSX.utils.json_to_sheet(jsonData3)

    //creates new xlsx workbook
    const workbook = XLSX.utils.book_new()

    //append sheets to this workbook
    XLSX.utils.book_append_sheet(workbook, worksheet0, 'worker0')
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'worker1')
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'worker2')
    XLSX.utils.book_append_sheet(workbook, worksheet3, 'worker3')

    // write to xlsx file
    XLSX.writeFile(workbook,'./testsExportData/BoardEffectTestStatus1.xlsx')
})