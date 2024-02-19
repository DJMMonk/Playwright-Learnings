import {test,expect} from '@playwright/test'

test('selectors demo', async({page}) => {

await page.goto('https://www.saucedemo.com/')
await page.pause()
// using any object property
await page.click('id=user-name')
await page.locator('id=user-name').fill('Edison')
await page.locator('[id="user-name"]').fill('John')

// Using CSS Selector
await page.locator('#login-button').click()
//Using X Path 
await page.locator('xpath=//input[@id="user-name"]').fill('Bl')
await page.locator('//input[@name="password"]').fill('Nothing')
// Using Text 
await page.locator('text=LOGIN').click()
await page.locator('input:has-text("LOGIN")').click()


});