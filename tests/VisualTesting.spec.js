const {test, expect} = require('@playwright/test');

test('@web Visual Testig', async({page})=>
{
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});