const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');
const loginPayload = {userEmail:"Deshmukh@gmail.com", userPassword:"Anu@1234"};
const orderPayload = {orders:[{country:"India", productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakepayloadOrder = {data:[],message:"No Orders"};  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 1. route.fullfill() : Response Modification
 2. route.continue() : Request Modification
 3. route.abort() :  Aborts/fail the route's request due to any reason ex: address_unreachable. Images, Css Internet Error, many more
 4. route.request() : turning page mode to API Mode, Request to be Executed/routed

 5. Listeners, page.on()
 */
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayload);
   response =  await apiUtils.createOrder(orderPayload);
})

test.skip('API Place Order', async ({page})=>
{
    // Listeners page.on()
    page.on("request", request=> console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    // inject token into browser via addInitScript()
    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");

//  1. route.fullfill() : Response Modification   
//  4. route.request()                           +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        route=>
        {
            const response = page.request.fetch(route.request());
            let body = JSON.stringify(fakepayloadOrder);
            route.fulfill(
                response,
                body,
            )
        }
    ) 
    // Intercepting Response= Get API repsonse -> replace with playwright fake response body ->browser
    await page.locator("button[routerlink*='/dashboard/myorders']").click();
    // if any wait error occure use below waitfor Response method
    //await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());
 
});
// 2. route.continue() : Request Modification
test.skip('Security2 test request Intercept', async ({page})=>
{
    // Listeners page.on()
    page.on("request", request=> console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("Deshmukh@gmail.com");
    await page.locator("[type='password']").fill("Anu@1234");
    await page.locator("#login").click();
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='/dashboard/myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=> route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'})
        
    )
    await page.locator("button:has-text('View')").first().click();
    await page.pause();
    const errorMsg = await page.locator(".blink_me").textContent();
    console.log(errorMsg);
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
    // await expect(page.locator("p"))

});

// 3. route.abort() :   Aborts/fail the route's request due to any reason ex: address_unreachable. Images, Css Internet Error, many more
test.skip('Browser context validatong error login with help of Abort', async ({page})=>
{
// 1___jpg, png image blocking [**/*: means any url ]
    //page.route('**/*.{jpg,png,jpeg}', route=> route.abort());
// 2___block css
    page.route('**/*.css', route => route.abort());

// Listeners page.on()
    page.on("request", request=> console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.pause();
    await page.locator("#userEmail").fill("Deshmukh@gmail.com");
    await page.locator("[type='password']").fill("Anu@1234");
    await page.locator("#login").click();
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='/dashboard/myorders']").click();
    // await page.pause();
});

