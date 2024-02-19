import { ConsoleMessage, expect, type Locator, type Page } from '@playwright/test';

export class RichMediaPreviewPage {
    readonly page: Page;
    readonly objectFiltersButton: Locator;
    readonly objectMenuButton: Locator;
    readonly objectMenuFilterDefaultAmount: Locator;
    readonly objectMenuFilterMaximumAmount: Locator;
    readonly bannerParentAsset_htmlbanner: Locator;

    constructor(page: Page) {

        this.page = page;

        this.objectFiltersButton = page.getByLabel('Filters');
        this.objectMenuButton = page.locator('#menu- div').first();
        this.objectMenuFilterDefaultAmount = page.getByLabel('10');
        this.objectMenuFilterMaximumAmount = page.getByRole('option', { name: '100' });

        this.bannerParentAsset_htmlbanner = page.locator('body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > iframe');





    }

    async gotoRichMediaPreviewLink(previewLink) {

        await this.page.goto(previewLink);
        console.log('Startin Test on Link: ' + previewLink);

    }

    async setupBannersDisplayed() {
        await this.objectFiltersButton.click();
        await this.objectMenuButton.click();
        await this.objectMenuFilterDefaultAmount.click();
        await this.objectMenuFilterMaximumAmount.click();
        console.log('Page is now setup to display 100 Assets per Page');

    }

    async bannerClickthroughWithErrorHandling() {
        const iFramesHolder = await this.bannerParentAsset_htmlbanner;
        const totalBannerCount = await iFramesHolder.count();
        let numberOfClickThrough = 0;
        console.log(totalBannerCount);

        for (let index = 0; index < totalBannerCount; ++index) {
            const banner = iFramesHolder.nth(index);
            const logs: { message: ConsoleMessage, type: string }[] = []
            this.page.on("console", message => {
                logs.push({ message, type: message.type() })
            });

            const errors: {}[] = []
            this.page.on("pageerror", exception => {
                errors.push(exception)
                //throw new Error(`Exceptions in browser console:\n${exception}`);
            });
            // Get all popups when they open
            this.page.on('popup', async popup => {
                await popup.waitForLoadState();

                await expect(popup).toHaveURL(/.*index.html/);
                console.log(await popup.title());

            });
            console.log("Testing : " + index + " " + await iFramesHolder.nth(index).textContent());

            // Start waiting for popup before clicking. Note no await.
            await this.page.waitForTimeout(1000);

            await banner.click();
            //Check we have no console logs
            //console.log(logs)
            //expect.soft(logs.length).toBe(0)

            //Check for errors
            console.log(errors)
            expect.soft(errors.length).toBe(0)

            if (errors.length <= 0) {
                ++numberOfClickThrough;
                console.log("Successful ClickThroughs : " + numberOfClickThrough);
            }
            await banner.screenshot({ path: index + 'screenshot.png' });
            console.log("Testing Complete on : " + index + " " + await iFramesHolder.nth(index).textContent());


        }
        await expect(numberOfClickThrough, "The number of clickthroughs does not match the number of banners").toEqual(totalBannerCount);
    }

    async bannerDimensionChecking() {
        const testContainer = await this.bannerParentAsset_htmlbanner.all();
        let index = 0;
        await this.page.waitForTimeout(1000);
        for (const iframe of await testContainer) {
            const dimensions = await iframe.boundingBox();
            const expectedWidth = await iframe.getAttribute('width');
            const expectedHeight = await iframe.getAttribute('height');

            console.log('Testing Banner: ' + index);
            if (dimensions) {
                console.log('Width: ' + dimensions.width);
                await expect(dimensions.width.toString()).toBe(expectedWidth);
                console.log('Height: ' + dimensions.height);
                await expect(dimensions.height.toString()).toBe(expectedHeight);
            }
            else
            {
                console.log('Dimension are null for banner: ' + index);
            }

            index++;
        }
    }

    async dumpFrameTree(frame, indent) {
        console.log(indent + frame.url());
        for (const child of frame.childFrames())
            this.dumpFrameTree(child, indent + '  ');
    }

    async bannerBorderCheck() {
        // Retriveve the list of frames on the page
        await this.dumpFrameTree(this.page.mainFrame(), '');

        //get the parent frame
        const parentFrame = await this.page.mainFrame();
        //get the children frames
        const childrenFrame = await parentFrame.childFrames();
        for (const iframe of childrenFrame) {
            console.log(parentFrame.url());
            console.log(childrenFrame.length);
            //then select each child and get the locator to interact with
            const bannerMainExit = await iframe.locator('.mainExit.border.fullscreen');

            //Border check
            console.log("Checking Border Width and CSS")
            await expect(bannerMainExit).toHaveCSS('border', '1px solid rgb(0, 0, 0)');
            console.log('Testing complete on Banner')

        }
    }


}
