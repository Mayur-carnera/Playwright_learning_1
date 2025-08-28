// Test Case 20: Search Products and Verify Cart After Login
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Click on 'Products' button
// 4. Verify user is navigated to ALL PRODUCTS page successfully
// 5. Enter product name in search input and click search button
// 6. Verify 'SEARCHED PRODUCTS' is visible
// 7. Verify all the products related to search are visible
// 8. Add those products to cart
// 9. Click 'Cart' button and verify that products are visible in cart
// 10. Click 'Signup / Login' button and submit login details
// 11. Again, go to Cart page
// 12. Verify that those products are visible in cart after login as well

const { test, expect } = require('@playwright/test');

test('Shopping multiple items ', async ({ page }, testInfo) => {

    const userEmail = 'andyDufresne_7@shawshank.com';
    const userName = 'andy dufresne'
    const name = userName.split(' ')
    const fName = name[0]
    const lname = name[1]
    const password = 'EllisBoyd'

    test.setTimeout(500000)

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // navigate to shopping website
    await page.goto('https://www.automationexercise.com/');
    //check that webpage is loaded
    await page.waitForLoadState('load')
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
    
    // 3. Click on 'Products' button
    await page.locator('//a[@href="/products"]').click();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page.getByPlaceholder("Search Product")).toBeVisible();

    // 5. Enter product name in search input and click search button
    await page.getByPlaceholder("Search Product").fill('Top');
    await page.locator('//button[@id="submit_search"]').click();

    // 6. Verify 'SEARCHED PRODUCTS' is visible
    await expect(page.locator('//div[@class="productinfo text-center"]')).toHaveCount(14);

    // 7. Verify all the products related to search are visible
    const searchedProducts = await page.locator('//div[@class="productinfo text-center"]/p').all();

    // 14 products are listed in search result
    expect(searchedProducts.length).toBe(14)

    // 8. Add those products to cart

    // add only the products having Top in their name

    for (const searchedProd of searchedProducts) {
        let productName = await  searchedProd.textContent();
        if (productName.includes('Top')){
            //wait for the prouct link add to cart option to be visible
            const productLink = searchedProd.locator('xpath=following-sibling::a');
            await expect(productLink).toBeVisible();
            
            // click on add to cart
            await productLink.click();

            // wait for continue shopping pop-up to appear
            const contShoppingButton = page.locator('//button[contains(text(),"Continue Shopping")]');
            await expect(contShoppingButton).toBeVisible();
            await contShoppingButton.click();
        }
    }

    // 9. Click 'Cart' button and verify that products are visible in cart
    const cart = page.locator('//a[contains(text()," Cart")]');
    await expect(cart).toBeVisible();
    await cart.click();

    // wait for product list table to be visible
    const cartProductTable = page.locator('//table[@class="table table-condensed"]');
    await expect(cartProductTable).toBeVisible();

    //ensure product list
    let cartProductList = page.locator('//table[@class="table table-condensed"]/tbody/tr');

    // ensure 12 products are listed

    let prodCount = await cartProductList.count();

    expect(prodCount).toBe(12);

    // ensure added quantity is 1 per each item

    for (let i = 1; i <= prodCount; i++){

        //const cartProduct = cartProductList.nth(i).locator(`xpath=/td[2]/h4/a[${i}]`);
        //const cartProuctQuan = cartProduct.locator(`xpath=/td[4]/button[${i}]`);
        // await expect(cartProductName).toHaveText(/Top/)

        const cartProduct = page.locator(`//table[@class="table table-condensed"]/tbody/tr[${i}]/td[2]/h4/a[1]`);
        const cartProuctQuan = page.locator(`//table[@class="table table-condensed"]/tbody/tr[${i}]/td[4]`); 
        const cartProductName = await cartProduct.textContent();
        const cartProductNum = await cartProuctQuan.textContent();

        console.log(cartProductName+' has quantity = '+cartProductNum);
    }

    // 10. Click 'Signup / Login' button and submit login details
    await page.locator('//a[contains(text(),"Login")]').click();
    const signUpEmail = page.locator('//input[@data-qa="signup-email"]');
    await expect(signUpEmail).toBeVisible();
    await page.locator('//input[@data-qa="signup-name"]').fill(userName)
    await signUpEmail.fill(userEmail)

    await page.locator('//button[@data-qa="signup-button"]').click()

    // navigating to registration page
    await expect(page.locator('//b[contains(text(),"Enter Account Information")]')).toBeVisible();

    // confirm name entered is retained
    await page.locator('//input[@data-qa="name"]').getAttribute('value',userName);

    // confirm email fiele is disabled
    await expect(page.locator('//input[@data-qa="email"]')).toBeDisabled();

    // enter password
    await page.locator('//input[@data-qa="password"]').fill(password);

    // select DOB
    const days = page.locator('//select[@id="days"]')
    await days.selectOption({ label: '7' });
    await expect(days).toHaveValue('7')

    const months = page.locator('//select[@id="months"]')
    await months.selectOption({ label: 'March' });
    await expect(months).toHaveValue('3')

    const years = page.locator('//select[@id="years"]')
    await years.selectOption({ label: '1993' });
    await expect(years).toHaveValue('1993')


    // enter details

    await page.getByLabel('First name ').fill(fName)
    await page.getByLabel('Last name ').fill(lname)
    
    await page.getByLabel('Address ').first().fill('abcdefgh abcdefgh, aqwerty')
    
    await page.locator('//select[@id="country"]').selectOption({ label:'India'})

    await page.getByLabel('State ').fill('Delhi')

    await page.getByLabel('City ').fill('Delhi')

    // await expect(page.locator('//input[@id="zipcode"]')).toBeEnabled()

    await page.locator('//input[@id="zipcode"]').fill('2131412')

    await page.getByLabel('Mobile Number ').fill('1234567890')


    // submit the form
    const createAcc = page.locator('//button[@data-qa="create-account"]');
    await expect(createAcc).toBeVisible();
    await createAcc.click()

    // ensure acc creation message
    const accCreation = page.locator('//h2[@data-qa="account-created"]/b');
    await expect(accCreation).toHaveText('Account Created!')


    // proceed by continue button
    const contButton = page.locator('//a[contains(text(),"Continue")]');
    await expect(contButton).toBeVisible()
    await contButton.click()

    // ensure redirection to homepage
    await expect(page).toHaveTitle('Automation Exercise')

    const regex1 = new RegExp(userName,'i')
    await expect(page.locator('//ul[@class="nav navbar-nav"]/li[10]/a')).toHaveText(regex1)

    // await expect(page.locator('//ul[@class="nav navbar-nav"]/li[10]/a/b')).toHaveText(userName)

    // 11. Again, go to Cart page
    await expect(cart).toBeVisible();
    await cart.click();
    
    // 12. Verify that those products are visible in cart after login as well
    await expect(cartProductTable).toBeVisible();

    // ensure 12 products are listed
    prodCount = await cartProductList.count();
    expect(prodCount).toBe(12)

    const proceedCheckout = page.locator('//a[@class="btn btn-default check_out"]')

    await expect(proceedCheckout).toBeVisible()
    await proceedCheckout.click()

    await expect(page.locator('//h2[@class="heading"]').first()).toHaveText('Address Details')
    
})