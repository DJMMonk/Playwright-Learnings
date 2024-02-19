import { test, expect } from '@playwright/test';


test.describe('Accordians', () => {

    test('Open each one and check contennt', async ({ page }) => {
        await page.goto('https://demoqa.com/accordian');
        const section1Heading = await page.getByText('What is Lorem Ipsum?');
        const section1Content = await page.getByText('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem');
        
        const section2Heading = await page.getByText('Where does it come from?');
        const section2Content = await page.getByText('Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots ');
        const section3Heading = await page.getByText('Why do we use it?');

        await expect(section1Heading).toBeVisible();
        await expect(section1Content).toBeVisible();
        await section1Heading.click();
        if(await section1Heading.filter({has: page.locator('#section1Content')}).isVisible())
        {
            console.log('Whoops Its visible');
            await expect(section1Content).toBeVisible();
        }
        else{console.log('The content is not visible')}


        await expect(section2Heading).toBeVisible();
        await section2Heading.click();
        //expect content to be visible
        await expect(section2Content).toBeVisible();   

    })



});



