import { test, expect } from '@playwright/test';

test('Locate Multiple elements', async ({page})=>{

    //Navigate to the application and confirm its loaded
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    //enter with valid credentials
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    //login
    await page.getByRole('button', { name: 'Login' }).click();

    //verify user successful login
    await expect(page.getByText('Swag Labs')).toBeVisible();

    //locate multiple elements
    const links = await page.$$('//a')

    for(const link of links){
        const linkText = await link.textContent()
        console.log(linkText)
    }
})

test('locating navigation bar elements on Amazon', async({page})=>{

    //Navigate to the application and confirm its loaded
    await page.goto('https://www.amazon.in/');
    //await expect(page).toHaveTitle('Swag Labs');

    //page.waitForSelector() //waits for the element to be displayed
    

    //locate multiple elements
    const links = await page.$$("a[class='nav-a  ']")

    for(const link of links){
        const linkText = await link.textContent()
        console.log(linkText)
    }
})