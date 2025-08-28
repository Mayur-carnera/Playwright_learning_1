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

    console.log('end of 1')


//another test
    //navigate to website and confirm page title
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    //enter with valid credentials
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    //login
    await page.getByRole('button', { name: 'Login' }).click();

    //verify user successful login
    await expect(page.getByText('Swag Labs')).toBeVisible();

    //navigate to product page verify uniqueness
    await page.getByText('Sauce Labs Backpack').click();
    await expect(page.getByText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')).toBeVisible();
    
    //verify item price with expected price
    await expect(page.locator('.inventory_details_price')).toHaveText('$29.99');

    //add to cart
    await page.getByRole('button', { name: 'Add to cart' }).click();

    //verify only one item is in cart
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    
    //navigate to cart
    await page.locator('.shopping_cart_link').click();

    //checkout
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.close()
    console.log('end of 2')

})

