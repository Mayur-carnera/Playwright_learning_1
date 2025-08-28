const {test, expect} = require ('@playwright/test')

test('FlipkartNavBarMenu', async ({page})=>{

    //navigate to flipkart.com and validate
    await page.goto('https://www.flipkart.com/')
    await expect(page).toHaveTitle(/Shopping Site/)

    // const navBar = page.locator('//div[@class="_3sdu8W emupdz"]/a')
    
    // const navBarMenuCount = await navBar.count()
    // console.log(navBarMenuCount)

    // await navBar.nth(1).click()
    // await expect.soft(page).toHaveTitle(/Mobiles/)
    // await page.goBack()
    
    // await expect(page.locator('//span[contains(text(),"Fashion")]')).toBeVisible()
    // await page.locator('//span[contains(text(),"Fashion")]').hover()
    await expect(page.getByText("Men's Formal Shirts")).toBeVisible()
    await page.getByText("Men's Formal Shirts").click()
    await expect.soft(page).toHaveTitle(/Formal/)

})