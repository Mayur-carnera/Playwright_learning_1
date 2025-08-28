// shopping several apparels
// add mens polo t-shirt - check for exact name
// add mens t-shirt - check for color in description
// add 1 jeans - check for size
// add kids top - check for suitable age
// add women's top - check for type
// add a hand print saree
// check cart
// check total value - check limit exceeds or not
// remove a product with highest cost
// checkout

const {test, expect} = require('@playwright/test')
const XLSX = require('xlsx')

test('Shopping several items', async({page})=>{

    // navigate to shopping website
    await page.goto('https://www.automationexercise.com/')
    
    //check that webpage is loaded
    await expect(page.getByAltText('Website for automation practice')).toBeVisible()

    await expect(page.locator('//div[@id="slider-carousel"]')).toBeVisible()
    await expect(page.locator('//div[@id="slider-carousel"]/ol/li')).toHaveCount(3)


    const tableData1 = []
// populate list of options for men
    //expand men's menu
    await expect(page.locator('//a[@href="#Men"]')).toBeVisible()
    await expect(page.locator('//a[@href="#Men"]')).not.toHaveClass('collapsed')
    await page.locator('//a[@href="#Men"]').click()
    await expect(page.locator('//div[@id="Men"]')).toBeVisible()

    const mensMenu = page.locator('//div[@id="Men"]/div/ul/li/a')
    await expect(mensMenu).toHaveCount(2)

    const mensMenuList = await mensMenu.allTextContents()

    tableData1.push(mensMenuList)

    console.log(mensMenuList)

// populate list of options for Women
    //expand women's menu
    await expect(page.locator('//a[@href="#Women"]')).toBeVisible()
    //await expect(page.locator('//a[@href="#Women"]')).not.toHaveClass('collapsed')
    await page.locator('//a[@href="#Women"]').click()
    await expect(page.locator('//div[@id="Women"]')).toBeVisible()

    const womensMenu = page.locator('//div[@id="Women"]/div/ul/li/a')
    await expect(womensMenu).toHaveCount(3)

    const womensMenuList = await womensMenu.allTextContents()
    
    tableData1.push(womensMenuList)

    console.log(womensMenuList)

// populate list of options for Kids
    //expand kids menu
    await expect(page.locator('//a[@href="#Kids"]')).toBeVisible()
    //await expect(page.locator('//a[@href="#Kids"]')).not.toHaveClass('collapsed')
    await page.locator('//a[@href="#Kids"]').click()
    await expect(page.locator('//div[@id="Kids"]')).toBeVisible()

    const kidsMenu = page.locator('//div[@id="Kids"]/div/ul/li/a')
    await expect(kidsMenu).toHaveCount(2)

    const kidsMenuList = await kidsMenu.allTextContents()
    
    tableData1.push(kidsMenuList)

    console.log(kidsMenuList)

    console.log(tableData1)
    await page.waitForTimeout(3000)

})

