const {expect} = require('@playwright/test');
const {customtest} = require('../utils/Fixtures.js');

customtest('fixtures demo', async({authenticatePage, createOrder, testDataForOrder})=>
{
    await authenticatePage.goto('https://rahulshettyacademy.com/client');
    await authenticatePage.locator("button[routerlink*='/dashboard/myorders']").click();
    await authenticatePage.locator("tbody").waitFor();
    await expect(authenticatePage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);
})