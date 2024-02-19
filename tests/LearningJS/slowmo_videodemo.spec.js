import test, {page,expect, chromium} from '@playwright/test'

test('Slow motion and video recording demo', async() => {
    const brower = await chromium.launch({
        slowMo: 500, 
        headless: false
    });

    const context = await brower.newContext({
        recordVideo: {
            dir: 'videos/',
            size: {width: 800, height: 600}
        }
    });

    const page = await context.newPage();

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


    await context.close();


})