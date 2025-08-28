import * as fs from 'fs';
import * as path from 'path';

module.exports = {
  workers: 4, // Number of parallel workers
  use: { browserName: 'chromium' }
}

const { test, expect } = require('@playwright/test')
const XLSX = require('xlsx')
const ExcelJS = require('exceljs')


// read xlsx data for fetching URL list
const boardeffectMaster = XLSX.readFile('./testsInitialData/Boardeffect_sampleTest.xlsx')
const amersBlogs = boardeffectMaster.Sheets['AMERS_blogs']
const amersBlogsJson = XLSX.utils.sheet_to_json(amersBlogs)
const amersBlogsList = amersBlogsJson.map(row => row['AMERS'])

test.describe.parallel('testing URLs parallelly', ()=> {

    let dataWorker0 = []
    let dataWorker1 = []
    let dataWorker2 = []
    let dataWorker3 = []

    //creating xlsx file
    const workbook = new ExcelJS.Workbook()
    let filePath = 'boardeffect_404_tests_v2.xlsx'
    // const filePath = path.join('boardeffect_404_tests.xlsx')
    workbook.addWorksheet('data-worker-0')
    workbook.addWorksheet('data-worker-1')
    workbook.addWorksheet('data-worker-2')
    workbook.addWorksheet('data-worker-3')
    workbook.addWorksheet('master')

    let worksheet

    let workerIndex
    let workerId
    // const outputDir = 'test-results'
    
    for (const amersBlog of amersBlogsList){

        test('testing URL :'+amersBlog, async({page},testInfo)=>{

            let status
            let dataPoint

            await page.goto(amersBlog)
            
            if (await page.locator('(//img[@alt="fb logo"])[1]').isVisible()) {
                status = 'Webpage is loaded'
                dataPoint = [ amersBlog,status ]
                
            } else if (await page.locator('//h1[normalize-space()="404"]').isVisible()) {
                status = 'boardeffect 404 page'
                dataPoint = [ amersBlog,status ]
                // test.fail()
            } else {
                status = 'unknown result'
                dataPoint = [ amersBlog,status ]
                // test.fail()
            }

            //console.log(dataPoint)

            //workerId = process.env.TEST_PARALLEL_INDEX || '0'

            worksheet = workbook.getWorksheet('master')
            worksheet.addRow(dataPoint)
            await workbook.xlsx.writeFile(filePath)

            switch (testInfo.workerIndex) {
                case 0:
                    worksheet = workbook.getWorksheet('data-worker-0')
                    worksheet.addRow(dataPoint)
                    await workbook.xlsx.writeFile(filePath)
                    break

                case 1:
                    worksheet = workbook.getWorksheet('data-worker-1')
                    worksheet.addRow(dataPoint)
                    await workbook.xlsx.writeFile(filePath)
                    break

                case 2:
                    worksheet = workbook.getWorksheet('data-worker-2')
                    worksheet.addRow(dataPoint)
                    await workbook.xlsx.writeFile(filePath)
                    break

                case 3:
                    worksheet = workbook.getWorksheet('data-worker-3')
                    worksheet.addRow(dataPoint)
                    await workbook.xlsx.writeFile(filePath)
                    break
            }
        })
    }
    
})