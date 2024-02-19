import test, { page, expect } from '@playwright/test'

test.describe('All my tests', () => {



    test.beforeEach(async ({ page }) => {

        await page.goto('https://demo.applitools.com/')

        await page.getByPlaceholder('Enter your username').click();
        await page.getByPlaceholder('Enter your username').press('CapsLock');
        await page.getByPlaceholder('Enter your username').fill('C');
        await page.getByPlaceholder('Enter your username').press('CapsLock');
        await page.getByPlaceholder('Enter your username').fill('Charlotte');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your password').fill('hello');
        await page.getByRole('link', { name: 'Sign in' }).click();

    })

    test.afterAll(async ({ page }) => {
        await page.close()
    })

    test('Homepage', async ({ page }) => {



        await page.getByRole('link', { name: '  Credit cards' }).click();
        await page.getByRole('link', { name: '  Debit cards' }).click();
        await page.getByRole('link', { name: 'View Statement ' }).click();
        await page.getByRole('link', { name: 'Pay Now ' }).click();
        await page.getByRole('link', { name: 'Request Increase ' }).click();
        await page.getByRole('link', { name: ' Add Account' }).click();
        await page.getByRole('link', { name: ' Make Payment' }).click();

    })

    test('Logout', async ({ page }) => {




        await page.locator('.top-icon > i').click();
        await page.locator('.avatar-w > img').first().click();
        await page.locator('.logged-user-toggler-arrow > .os-icon').click();
        await page.locator('.logged-user-toggler-arrow').click();
        await page.locator('.menu-w > .logged-user-w > .logged-user-i > .avatar-w > img').click();
        await page.getByText('Jack Gomez').click();
        await page.getByRole('link', { name: 'ACME' }).click();
        await page.getByRole('link', { name: 'ACME' }).click();

    })
})