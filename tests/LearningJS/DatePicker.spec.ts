import { test, expect } from '@playwright/test';


test.describe('Date Picker', () => {

    test('Working with pickers', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
 
        //using fill
        //await page.fill('#datepicker','06/30/2023')

        //using date picker element

        const year = '2024'
        const month = 'March'
        const date = '24'

        await page.click('#datepicker'); // open calendar

        while (true) 
        {
            const currentYear = await page.locator('.ui-datepicker-year').textContent()
            const currentMonth = await page.locator('.ui-datepicker-month').textContent()

            if (currentYear == year && currentMonth == month) 
            {
                break;     
            }
            await page.locator('[title="Next"]').click();


        }

        const dates = await page.$$('.ui-state-default') // return all dates

        for (const dt of dates)
        {
            if (await dt.textContent() == date) 
            {
                await dt.click();
                break;   
            }
        }
    

        await page.waitForTimeout(3000);

    })



});