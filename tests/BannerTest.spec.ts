
import { test, expect } from '@playwright/test';
import { RichMediaPreviewPage } from '../Pages/RichMediaPreviewPage';

test.describe('Banner HTML Functionality Test Suite', () => {

test('Banner Clickthrough Test', async ({ page }) => {

  const richMediaPreview = new RichMediaPreviewPage(page)

  await richMediaPreview.gotoRichMediaPreviewLink('PLACEHOLDER');
  await richMediaPreview.setupBannersDisplayed();
  await richMediaPreview.bannerClickthroughWithErrorHandling();

})
test('Banner Dimension Test', async ({ page }) => {

  const richMediaPreview = new RichMediaPreviewPage(page)

  await richMediaPreview.gotoRichMediaPreviewLink('PLACEHOLDER');
  await richMediaPreview.setupBannersDisplayed();
  await richMediaPreview.bannerDimensionChecking();

})
test('Banner Border Test', async ({ page }) => {

  const richMediaPreview = new RichMediaPreviewPage(page)

  await richMediaPreview.gotoRichMediaPreviewLink('PLACEHOLDER');
  await richMediaPreview.setupBannersDisplayed();
  await richMediaPreview.bannerBorderCheck();

})
});






