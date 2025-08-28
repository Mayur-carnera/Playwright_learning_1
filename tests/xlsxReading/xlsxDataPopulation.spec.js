const { test, expect } = require('@playwright/test')
const XLSX = require('xlsx')

async function exportToExcel(data, filePath, sheetName = 'Sheet2') {
    // Convert data (array of objects) to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook & append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Write to file
    XLSX.writeFile(workbook, filePath);
}
// read xlsx data for fetching URL list
const boardeffectMaster = XLSX.readFile('./testsInitialData/Boardeffect_sampleTest.xlsx')
const amersBlogs = boardeffectMaster.Sheets['AMERS_blogs']
const amersBlogsJson = XLSX.utils.sheet_to_json(amersBlogs)
const amersBlogsList = amersBlogsJson.map(row => row['AMERS'])

test.describe.parallel('testing URLs parallelly', ()=> {

    let workerIndex
    let workerId
    const outputDir = 'test-results'
    
    for (const amersBlog of amersBlogsList){

        test('testing URL :'+amersBlog, async({page},testInfo)=>{

            let status
            let dataPoint

            await page.goto(amersBlog)
            
            if (await page.locator('(//img[@alt="fb logo"])[1]').isVisible()) {
                status = 'Webpage is loaded'
                dataPoint = { URL: amersBlog, Status: status }
                
            } else if (await page.locator('//h1[normalize-space()="404"]').isVisible()) {
                status = 'boardeffect 404 page'
                dataPoint = { URL: amersBlog, Status: status }
                // test.fail()
            } else {
                status = 'unknown result'
                dataPoint = { URL: amersBlog, Status: status }
                // test.fail()
            }

            workerIndex = testInfo.workerIndex
            workerId = process.env.TEST_PARALLEL_INDEX || '0'
            let filename = path.join(outputDir, `data-worker-${workerIndex}.json`)
            fs.writeFileSync(filename, JSON.stringify(dataPoint, null, 2))

        })
    }
})