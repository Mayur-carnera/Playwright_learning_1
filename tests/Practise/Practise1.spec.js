const {test , expect} = require('@playwright/test')

test('ValidatePageTitle',async ({page})=>{

    await page.locator('id=login2').click()
    await page.click('id=login2')

    await page.locator('#loginusername ').fill('userID')
    await page.fill('#loginusername','userID')
    await page.type('#loginusername','userID')

    

})