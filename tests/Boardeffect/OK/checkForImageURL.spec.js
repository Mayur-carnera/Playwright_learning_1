const {test, expect} = require('@playwright/test')
const XLSX = require('xlsx')

async function imageToHaveSrcUrl(page, webpageUrl){
    const testURL = webpageUrl
    const resultTable = []
    await page.goto(testURL)
    const allowCookieEleXpath = '(//span[@class="relative flex items-center group-active:text-white"])[3]'
    const contentImageXpath = '//div[@class="content-render"]//img'
    if(await page.locator(allowCookieEleXpath).isVisible()){
        await page.locator(allowCookieEleXpath).click()
    }
    // wait for page loading
    await expect(page.locator('(//img[@alt="BoardEffect Logo"])[1]')).toBeVisible()

    // check if page has images 
    const imageCount = await page.locator(contentImageXpath).count()
    if ( imageCount >0 ) {
        const allImageElements = await page.locator(contentImageXpath).all()
        for (const imageElement of allImageElements){
            const imageSrc = await imageElement.getAttribute('src')
            if (imageSrc.includes('https://cdn.sanity.io/images')){
                resultTable.push('src URL is present for the image')
            }else{
                resultTable.push('ISSUE : src URL is absent for the content image')
            }
        }
    }else{
        resultTable.push('No image is present')
    }
    return resultTable
}



test('Check that images have desired URLs', async({page})=>{
    test.setTimeout(1000000)
    const boardeffectMaster = XLSX.readFile('Boardeffect_sampleTest.xlsx')
    const amersBlogs = boardeffectMaster.Sheets['AMERS_blogs']
    const amersBlogsJson = XLSX.utils.sheet_to_json(amersBlogs)
    const amersBlogsList = amersBlogsJson.map(row => row['AMERS'])

    const resultAmers = []

    for(const amersBlog of amersBlogsList){
        resultAmers.push( await imageToHaveSrcUrl(page, amersBlog))
    }

    console.log(resultAmers)
})