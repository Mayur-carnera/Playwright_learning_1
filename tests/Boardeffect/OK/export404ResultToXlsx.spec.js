const {test, expect} = require('@playwright/test')
const XLSX = require('xlsx')
const fs = require('fs')

async function exportToExcel(data, filePath, sheetName = 'Sheet1') {
  // Convert data (array of objects) to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook & append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Write to file
  XLSX.writeFile(workbook, filePath);
}

test('check webpage URLs for possible 404s and export to xlsx', async ({page})=> {
    
    test.setTimeout(200000)

    const boardeffectMaster = XLSX.readFile('Boardeffect_sampleTest.xlsx')
    const amersBlogs = boardeffectMaster.Sheets['AMERS_blogs']
    const amersBlogsJson = XLSX.utils.sheet_to_json(amersBlogs)
    const amersBlogsList = amersBlogsJson.map(row => row['AMERS'])
    
    let data = []

    for(const amersBlog of amersBlogsList){
        await page.goto(amersBlog)

        let status

        if (await page.locator('(//img[@alt="fb logo"])[1]').isVisible()){
            status='Webpage is loaded'
        } else if (await page.locator('//h1[normalize-space()="404"]').isVisible()){
            status='boardeffect 404 page'
        }else{
            status='unknown result'
        }
        let dataPoint = {URL:amersBlog , Status : status}
        data.push(dataPoint)
    }
    
    //console.log(data)

    exportToExcel(data,'be_404s_resultNew.xlsx')

    console.log('end')
})
