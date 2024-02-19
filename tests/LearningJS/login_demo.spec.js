const { test, expect } = require('@playwright/test');

test('Demo Login Test 1', async({page}) => {

    await page.goto('https://demo.applitools.com/')
    //await page.pause()
    await page.getByPlaceholder('Enter your username').fill('MyName')
    await page.getByPlaceholder('Enter your password').fill('MyName')
    
    await page.waitForSelector('text=Sign in',{timeout: 5000})
    await page.getByRole('link', { name: 'Sign in' }).click()
})


test.only('Demo Login Test 2', async({page}) => {

    await page.goto('https://demo.applitools.com/')
    await page.pause()

    await page.getByPlaceholder('Enter your username').click();
    await page.getByPlaceholder('Enter your username').press('CapsLock');
    await page.getByPlaceholder('Enter your username').fill('C');
    await page.getByPlaceholder('Enter your username').press('CapsLock');
    await page.getByPlaceholder('Enter your username').fill('Charlotte');
    await page.getByPlaceholder('Enter your password').click();
    await page.getByPlaceholder('Enter your password').press('CapsLock');
    await page.getByPlaceholder('Enter your password').fill('C');
    await page.getByPlaceholder('Enter your password').press('CapsLock');
    await page.getByPlaceholder('Enter your password').fill('Cheese');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('link', { name: 'ACME' }).click();
    await page.locator('.top-icon > i').click();
    await page.locator('.avatar-w > img').first().click();
    await page.locator('.logged-user-toggler-arrow > .os-icon').click();
    await page.locator('.menu-w > .logged-user-w > .logged-user-i > .avatar-w > img').click();

  // ---------------------

})
