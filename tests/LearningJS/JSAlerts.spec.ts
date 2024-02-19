import { test, expect } from '@playwright/test';

test.describe('JS Alerts', () => {

    test('Basic JS Alert', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', dialog => {
            expect(dialog.type()).toContain('alert');
            console.log(`Dialog message: ${dialog.message()}`);
            expect(dialog.message()).toContain('I am a JS Alert');
            dialog.accept();
        });
        await page.getByRole('button', { name: 'Click for JS Alert' }).click();
        const resultHeading = await page.getByRole('heading', { name: 'Result:' });
        const resultText = await page.getByText('You successfully clicked an alert')
        await expect(resultHeading).toBeVisible();
        await expect(resultText).toBeVisible();
        await expect(resultText).toHaveCSS('color', 'rgb(0, 128, 0)');

    })

    test('Click for Confirm JS Alert', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', dialog => {
            expect(dialog.type()).toContain('confirm');
            console.log(`Dialog message: ${dialog.message()}`);
            expect(dialog.message()).toContain('I am a JS Confirm');
            dialog.dismiss();
        });
        await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
        const resultHeading = await page.getByRole('heading', { name: 'Result:' });
        const resultTextSuccess = await page.getByText('You clicked: Ok');
        const resultTextCancel = await page.getByText('You clicked: Cancel');
        await expect(resultHeading).toBeVisible();

        if (await resultTextSuccess.isVisible()) {
            await expect(resultTextSuccess).toContainText('You clicked: Ok');
            await expect(resultTextSuccess).toHaveCSS('color', 'rgb(0, 128, 0)');
        }
        else {
            await expect(resultTextCancel).toBeVisible();
            await expect(resultTextCancel).toContainText('You clicked: Cancel');
            await expect(resultTextCancel).toHaveCSS('color', 'rgb(0, 128, 0)');

        }

    })
    test('Click for JS Prompt', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('prompt');
            console.log(`Dialog message: ${dialog.message()}`);
            expect(dialog.message()).toContain('I am a JS prompt');
            expect(dialog.defaultValue()).toContain("");
            dialog.accept('John'); // close by clicking OK can also pass value
        });
        await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
        await expect(page.getByText('You entered: John')).toHaveText('You entered: John');
        await expect(page.getByText('You entered: John')).toHaveCSS('color', 'rgb(0, 128, 0)');


    })

});