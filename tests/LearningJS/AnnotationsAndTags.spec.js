import { test } from '@playwright/test'

//Annotations
test.skip('Test One', async ({ page }) => {

});

test('not yet ready', async ({ page }) => {
    test.fail();

});

test.fixme('test to be fixed', async ({ page }) => {
});

test('slow test(triples timeout)', async ({ page }) => {
    test.slow();
});

test.only('focus this test', async ({ page }) => {
    // Run only focused tests in the entire project
});

//Tags
/*
You can tag your tests with tags like
@smoke
@sanity
@fast  @slow 
and only run the tests that have the certain tag
*/
test('Test full report @smoke', async ({ page }) => {
    // ...
  });