const{test} = require('@playwright/test');
test('Navigation Back Forward', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();
});