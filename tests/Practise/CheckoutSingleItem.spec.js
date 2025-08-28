const {test, expect} = require ('@playwright/test')

test('ShoppingOneItem', async ({page}) => {

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

    await page.close();

});