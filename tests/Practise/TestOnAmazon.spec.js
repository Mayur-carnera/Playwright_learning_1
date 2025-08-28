const {test, expect} = require ('@playwright/test')

test ('GetAllTabsFromNAvigationBar', async ({page}) => {
    
    //navigate to amazon.com and validate
    await page.goto('https://www.amazon.in/')
    await expect(page).toHaveTitle(/Shopping site in India/)

    //get all navigation bar menus
    /*
    const nav_bar = await page.$$('//div[@id="nav-xshop-container"]/div/ul/li')

    for ( const nav_menu of nav_bar){
        const menuTitle = await nav_menu.textContent()
        console.log(menuTitle)
    }
    */
    const navBar = page.locator('//div[@id="nav-xshop-container"]/div/ul/li')
    
    const navBarMenuCount = await navBar.count()
    console.log(navBarMenuCount)

    for (const navBarMenu of await navBar.all()){
        const navBarMenuTitle = await navBarMenu.textContent()
        // console.log(navBarMenuTitle)
        await navBarMenu.click()
        await expect.soft(page).toHaveTitle(/navBarMenuTitle/)
        await delay(1500)
        await page.goBack()
    }

    // await navBar.first().
    // await expect.soft(page).toHaveTitle(/Fresh/)
    // await delay(3000)

    // await navBar.last().click()
    // await expect.soft(page).toHaveTitle(/Gift/)
    // await delay(3000)

})
