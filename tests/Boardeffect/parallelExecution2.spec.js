module.exports = {
  workers: 4, // Number of parallel workers
  use: { browserName: 'chromium' }
}

const { test, expect } = require('@playwright/test')
const XLSX = require('xlsx')

const boardeffectMaster = XLSX.readFile('./testsInitialData/Boardeffect_sampleTest.xlsx')
const amersBlogs = boardeffectMaster.Sheets['AMERS_blogs']
const amersBlogsJson = XLSX.utils.sheet_to_json(amersBlogs)
const amersBlogsList = amersBlogsJson.map(row => row['AMERS'])

test.describe.parallel('testing URLs parallelly', ()=> {
    
    for (const amersBlog of amersBlogsList){

        test('testing URL :'+amersBlog, async({page})=>{

            let data = []
            let status
            let dataPoint

            await page.goto(amersBlog)
            
            if (await page.locator('(//img[@alt="fb logo"])[1]').isVisible()) {
                status = 'Webpage is loaded'
                // dataPoint = { URL: amersBlog, Status: status }
                
            } else if (await page.locator('//h1[normalize-space()="404"]').isVisible()) {
                status = 'boardeffect 404 page'
                // dataPoint = { URL: amersBlog, Status: status }
                test.fail('boardeffect 404 page')
            } else {
                status = 'unknown result'
                // dataPoint = { URL: amersBlog, Status: status }
                test.fail('unknown result')
            }
        })
    }
})