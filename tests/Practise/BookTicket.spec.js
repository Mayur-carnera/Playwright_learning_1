    // Test to book a flight for 2 adults + 1 child in prem eco class
    // 1. Go to mmt
    // 2. verify webpage is loaded and correct
    // 3. select from as Mumbai also check default value was set as Delhi
    // 4. Select to as Jaipur also check default value was set as Bangluru
    // 5. select date as 14 august
    // 6. select 2 adults
    // 7. select 1 Children
    // 8. check that no infant is selected
    // 9 choose premium economy class
    // 10. Select apply
    // 11. Ensure all the details are filled correctly and are retained
    // select student
    // 12. Check 'Zero cancellation..' option
    // 13. Ensre zero cancellation is checked
    // 14. Search flights

const {test, expect} = require('@playwright/test')

test('BookFlightForStudent',async ({page})=>{
    // 1. Go to mmt
    await page.goto('https://www.makemytrip.com/')
    //to hancle pop-up -- closing it
    await expect.soft(page.locator("//span[@class='commonModal__close']")).toBeVisible()
    await page.locator("//span[@class='commonModal__close']").click()
    //verify desired webpage is visible
    await expect(page).toHaveTitle(/MakeMyTrip/)

    // 2. verify webpage is loaded and correct
    await expect(page.locator("//img[@alt='Make My Trip']")).toBeVisible()

    // 3. select from as Mumbai
    // ensuring default value as New Delhi
    await expect.soft(page.locator("span[data-cy='defaultFromValue']")).toHaveText(/DEL/)

    //to enable FROM city text input box
    await page.locator("span[data-cy='defaultFromValue']").click()

    //check is FromCity input box is visible 
    await expect(page.getByPlaceholder('From')).toBeVisible()
    // await expect(page.getByPlaceholder('From')).isEditable().toBeTruthy()
    // await expect(page.getByPlaceholder('From')).isEnabled().toBeTruthy()

    //entering Mumbai in the input field
    await page.getByPlaceholder('From').fill('Mumbai')
    await expect(page.locator("//span[contains(text(),'Mumbai')]")).toBeVisible()
    await expect(page.locator("//span[contains(text(),'Mumbai')]")).toHaveText('Mumbai')
    await page.locator("//span[contains(text(),'Mumbai')]").click()

    // 4. Select to as Jaipur
    // ensuring default value as Bengluru
    await expect.soft(page.locator("span[data-cy='defaultToValue']")).toHaveText(/BLR/)
    //entering Mumbai in the input field
    await page.locator("span[data-cy='defaultToValue']").click()
    await expect(page.getByPlaceholder('To')).toBeVisible()
    // await expect(page.getByPlaceholder('To')).isEditable().toBeTruthy()
    // await expect(page.getByPlaceholder('To')).isEnabled().toBeTruthy()
    await page.getByPlaceholder('To').fill('Jaipur')
    await expect(page.locator("//span[contains(text(),'Jaipur')]")).toBeVisible()
    await expect(page.locator("//span[contains(text(),'Jaipur')]")).toHaveText('Jaipur')
    await page.locator("//span[contains(text(),'Jaipur')]").click()

    // 5. select date as 14 august
    //ensure date picker is available
    await expect(page.locator('//div[@class="DayPicker-Month"][2]')).toBeVisible()
    await expect(page.locator('//div[@class="DayPicker-Month"][2]/div[3]//p[contains(text(),"14")]')).toBeVisible()
    //enter desired value of 14
    await page.locator('//div[@class="DayPicker-Month"][2]/div[3]//p[contains(text(),"14")]').click()
    
    // 6. select 2 adults
    //ensure default value is 1 traveller
    await expect(page.locator('//p[@data-cy="travellerText"]')).toBeVisible()
    await expect(page.locator('//p[@data-cy="travellerText"]/span/span')).toHaveText('1')
    //to check if the traveller menu is visible
    await expect(page.locator("//span[@class='lbl_input appendBottom5']")).toBeVisible()
    //click on the traveller menu 
    await page.locator("//span[@class='lbl_input appendBottom5']").click()
    //check the number of adults selection menu is visible
    await expect(page.locator("//div[contains(@class,'fltTravellers gbTravellers')]//div[contains(@class,'appendBottom20')]")).toBeVisible()
    //select number of adults
    await page.locator("//div[contains(@class,'fltTravellers gbTravellers')]//div[contains(@class,'appendBottom20')]/ul[1]/li[2]").click()
    //confirm correct selection of 2 adults
    await expect(page.locator("//div[contains(@class,'fltTravellers gbTravellers')]//div[contains(@class,'appendBottom20')]/ul[1]/li[2]")).toContainClass('selected')

    // 7. select 1 child
    await expect(page.locator('//p[@data-cy="childrenRange"]')).toHaveText(/CHILDREN/)
    await page.locator('//p[@data-cy="childrenRange"]//following-sibling::ul/li[2]').click()
    //confirm correct selection of 1 child
    await expect(page.locator('//p[@data-cy="childrenRange"]//following-sibling::ul/li[2]')).toContainClass('selected')

    
    // 8. check that no infant is selected
    await expect(page.locator('//p[@data-cy="infantRange"]')).toHaveText(/INFANT/)
    await expect(page.locator('//p[@data-cy="infantRange"]//following-sibling::ul/li[1]')).toContainClass('selected')


    // 9 choose premium economy class
    await expect(page.locator('//p[@data-cy="chooseTravelClass"]')).toBeVisible()
    await page.locator('//p[@data-cy="chooseTravelClass"]//following-sibling::ul/li[2]').click()
    //confirm selection
    await expect(page.locator('//p[@data-cy="chooseTravelClass"]//following-sibling::ul/li[2]')).toContainClass('selected')
    
    // 10. Select apply
    await page.getByRole('button', {name:/APPLY/}).click()

    // select student option
    await expect(page.locator('//div[contains(text(),"Student")]')).toBeVisible()
    await expect(page.locator('//div[contains(text(),"Student")]')).toHaveText(/Student/)

    //await page.locator('//div[contains(text(),"Student")]/parent::div/preceding-sibling::div/span/input').check()
    await page.locator("//div[contains(text(),'Student')]/parent::div/preceding-sibling::div/span").click()

    // 11. Check 'Zero cancellation..' option
    await expect(page.locator("//div[contains(@class,'makeFlex gap8 selectionTitle')]")).toBeVisible()
    await page.locator("//div[contains(@class,'makeFlex gap8 selectionTitle')]/div/span/input").check()

    // 12. Ensre zero cancellation is checked
    await expect.soft(page.locator("//div[contains(@class,'makeFlex gap8 selectionTitle')]/div[2]/div[@class='font14 latoBold']/div/font")).toHaveText('Zero Cancellation will be added')

    // 13. Search flights
    await expect(page.locator('//a[@class="primaryBtn font24 latoBold widgetSearchBtn "]')).toBeVisible()
    await expect(page.locator('//a[@class="primaryBtn font24 latoBold widgetSearchBtn "]')).toHaveText('Search')
    await page.screenshot({ path: 'screenshot_1.png' })
    await page.locator('//a[@class="primaryBtn font24 latoBold widgetSearchBtn "]').click()
    await page.screenshot({ path: 'screenshot_2.png' })

    await page.waitForTimeout(3000)

})