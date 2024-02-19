import test, { page, expect, errors } from '@playwright/test'

test('Banner Clickthrough Test for 1 Banner', async ({ page }) => {
  //got to page

  await page.goto('PLACEHOLDER');
  await page.getByLabel('Filters').click();
  await page.locator('#menu- div').first().click();
  await page.getByLabel('10').click();
  await page.getByRole('option', { name: '100' }).click();
  await page.frameLocator('#FRAMELOCATOR').getByRole('img').nth(4).click();
  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('##FRAMELOCATOR').locator('.mainExit').click();
  const page1 = await page1Promise;
  console.log(await page1.title());
  await page.pause();

})

test('Banner Clickthrough Test for X Banner', async ({ page }) => {
  //got to page

  await page.goto('PLACHOLDER');
  await page.getByLabel('Filters').click();
  await page.locator('#menu- div').first().click();
  await page.getByLabel('10').click();
  await page.getByRole('option', { name: '100' }).click();


  const iFramesHolder = await page.locator('body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > iframe');
  const totalBannerCount = await iFramesHolder.count();
  let numberOfClickThrough = 0;
  console.log(totalBannerCount);

  for (let index = 0; index < totalBannerCount; ++index) {
    const banner = iFramesHolder.nth(index);
    const logs = []
    page.on("console", (message) => {
      logs.push({ message, type: message.type() })
    });

    const errors = []
    page.on("pageerror", (exception) => {
      errors.push(exception)
      //throw new Error(`Exceptions in browser console:\n${exception}`);
    });

    // Get all popups when they open
    page.on('popup', async popup => {
      await popup.waitForLoadState();

      await expect(popup).toHaveURL(/.*index.html/);
      console.log(await popup.title());

    });

    console.log("Testing : " + index + " " + await iFramesHolder.nth(index).textContent());

    // Start waiting for popup before clicking. Note no await.
    await page.waitForTimeout(1000);

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



})

test('Banner Dimensions Test for Banner', async ({ page }) => {
  //got to page

  await page.goto('PLACEHOLDER');
  await page.getByLabel('Filters').click();
  await page.locator('#menu- div').first().click();
  await page.getByLabel('10').click();
  await page.getByRole('option', { name: '100' }).click();

  const bannerContainers = await page.locator('body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div').all();
  const totalBannerCount = await bannerContainers.length;
  console.log('Total Banners:' + totalBannerCount);

  const testContainer = await page.locator('body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > iframe').all();
  let index = 0;
  await page.waitForTimeout(1000);
  for (const iframe of await testContainer) {
    const dimensions = await iframe.boundingBox();
    const expectedWidth  = await iframe.getAttribute('width');
    const expectedHeight = await iframe.getAttribute('height');

    console.log('Testing Banner: ' + index);
    console.log('Width: ' + dimensions.width);
    await expect(dimensions.width.toString()).toBe(expectedWidth);
    console.log('Height: ' + dimensions.height);
    await expect(dimensions.height.toString()).toBe(expectedHeight);
    index++;


  }
})
  test('Banner Border Test for Banner', async ({ page }) => {
    //got to page

    await page.goto('PLACEHOLDER');
    await page.getByLabel('Filters').click();
    await page.locator('#menu- div').first().click();
    await page.getByLabel('10').click();
    await page.getByRole('option', { name: '100' }).click();

    // Retriveve the list of frames on the page
    dumpFrameTree(page.mainFrame(), '');
  
    function dumpFrameTree(frame, indent) {
      console.log(indent + frame.url());
      for (const child of frame.childFrames())
        dumpFrameTree(child, indent + '  ');
    }

    //get the parent frame
    const parentFrame = await page.mainFrame();
    //get the children frames
    const childrenFrame = await parentFrame.childFrames();
    for (const iframe of childrenFrame) {
      console.log(parentFrame.url());
      console.log(childrenFrame.length);
      //then select each child and get the locator to interact with
      const bannerMainExit = await iframe.locator('.mainExit.border.fullscreen');
      
      //Border check
      await expect(bannerMainExit).toHaveCSS('border', '1px solid rgb(0, 0, 0)');
      
    }

    /*then select a child and get the locator to interact with [single]
    const test = await childrenFrame[0].locator('.mainExit.border.fullscreen');
    console.log(test);
    await test.click();
    */
  /* 
   //Dimension Check
   await expect(bounding_box_mainexit.height).toEqual(height);
   
   await expect(bounding_box_mainexit.width).toEqual(width);
   
   //Border check
   await expect(bannerMainExit).toHaveCSS('border', '1px solid rgb(0, 0, 0)');
   */
})



