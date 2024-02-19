import test, {page,expect} from '@playwright/test'

test('Assertions Demo', async({page}) => {

    await page.goto('https://kitchen.applitools.com/')
    await page.pause()

    //Assertions
    //Check element present/not
    await expect(page.locator('text=The Kitchen')).toHaveCount(1);

    if(await page.$('text=The Kitchen'))
    {
        await page.locator('text=The Kitchen').click()
    }

    //Check element is visible/Hidden

    await expect(page.locator('text=The Kitchen')).toBeVisible();
    //await expect.soft(page.locator('text=The Kitchen')).toBeHidden();

    // check element enable or disabled 
    await expect(page.locator('text=The Kitchen')).toBeEnabled();
    //await expect.soft(page.locator('text=The Kitchen')).toBeDisabled();

    //check Text matches value given
    await expect(page.locator('text=The Kitchen')).toHaveText('The Kitchen');
    //await expect.soft(page.locator('text=The Kitchen')).not.toHaveText('The Kitchen');

    //check Attribute or Class
    await expect(page.locator('text=The Kitchen')).toHaveAttribute('class', 'chakra-heading css-dpmy2a');
    //OR for dynamic
    //await expect(page.locator('text=The Kitchen')).toHaveAttribute('class', /.*css-dpmy2a/);

    await expect.soft(page.locator('text=The Kitchen')).toHaveClass(/.*css-dpmy2a/);

    //check page title
    await expect(page).toHaveURL('https://kitchen.applitools.com/');
    await expect(page).toHaveTitle(/.*Kitchen/);

    //Compare Screenshot with visual validation
    //await expect(page).toHaveScreenshot();


})