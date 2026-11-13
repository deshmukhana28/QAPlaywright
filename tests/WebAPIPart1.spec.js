const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');
const loginPayload = {userEmail:"Deshmukh@gmail.com", userPassword:"Anu@1234"};
const orderPayload = {orders:[{country:"India", productOrderedId:"6960eac0c941646b7a8b3e68"}]};

let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayload);
   response =  await apiUtils.createOrder(orderPayload);
})

test.only('API Place Order', async ({page})=>
{
    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    const orderHistoryPage= page.locator("button[routerlink*='/dashboard/myorders']");
    await orderHistoryPage.click();
    const rows= page.locator("tbody tr");
    await rows.first().waitFor();
    const orderIdfromsummary = page.locator("div.col-text");

    for(let i =0; i < await rows.count(); ++i)
    {
        const rowOrderid = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderid))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails =await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});