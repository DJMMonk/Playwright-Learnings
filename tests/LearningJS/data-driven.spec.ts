import { test, expect } from '@playwright/test';
import { resolve } from 'path';
import * as csv from 'fast-csv';



test('CSV Test', async ({ page }) => {
    let myObject: any = new Promise((resolve) => {
        let dataArray: JSON[] = [];
        csv.parseFile('./myCsv.csv', { headers: true })
            .on('data', (data) => {
                dataArray.push(data);
            })
            .on('end', () => {
                resolve(dataArray);
            });

    });
    let output = await myObject;
    console.log(output);

    //Writing to CSV
    const arr: any = Array.from(output);
    await arr.unshift({ Channel: 'Channel', Subbed: 'Subbed', NewCol: 'NewCol' });
    await arr.push({
        Channel: 'New Channel', Subbed: 'Yes', NewCol: 'Please Sub'

    });
    csv.writeToPath('./tmp.csv', arr);

});

test.describe('Parametered Test', async () => {
        const people = ['Alice', 'Bob', 'tomsmith'];
        
        for (const name of people) {
            test(`testing with ${name}`, async ({ page }) => {
                await page.goto('https://the-internet.herokuapp.com/login')
                await page.getByLabel('Username').click();
                await page.getByLabel('Username').fill(name);
                await page.getByLabel('Username').click();
                await page.getByLabel('Username').fill(name);
                await page.getByLabel('Password').click();
                await page.getByLabel('Password').press('CapsLock');
                await page.getByLabel('Password').fill('S');
                await page.getByLabel('Password').press('CapsLock');
                await page.getByLabel('Password').fill('Super');
                await page.getByLabel('Password').press('CapsLock');
                await page.getByLabel('Password').fill('SuperS');
                await page.getByLabel('Password').press('CapsLock');
                await page.getByLabel('Password').fill('SuperSecret');
                await page.getByLabel('Password').press('CapsLock');
                await page.getByLabel('Password').fill('SuperSecretP');
                await page.getByLabel('Password').press('CapsLock');
                await page.getByLabel('Password').fill('SuperSecretPassword!');
                await page.getByRole('button', { name: ' Login' }).click();
                await page.getByRole('link', { name: 'Logout' }).click();
            });
            // You can also do it with test.describe() or with multiple tests as long the test name is unique.
        }

});