const base= require('@playwright/test');
const {request} = require('@playwright/test');
const {APiUtils} = require('./APiUtils.js');

const loginPayload = {userEmail:"Deshmukh@gmail.com", userPassword:"Anu@1234"};
const orderPayload = {orders:[{country:"India", productOrderedId:"6960eac0c941646b7a8b3e68"}]};

exports.customtest = base.test.extend(
    {
// UI browser custome fixture
        authenticatePage: async({browser}, use)=>
        {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/client");
            const email = page.locator("#userEmail");
            const password = page.locator("[type='password']");
            const loginButton = page.locator("#login");
            await email.fill("Deshmukh@gmail.com");
            await password.fill("Anu@1234");
            await loginButton.click(); 
            await page.waitForLoadState('networkidle');

            await use(page);
            //tear down
            await context.close();
        },
// API custome fixture
        createOrder: async({}, use)=>
        {
            const apiContext = await request.newContext();
            const apiUtils = new APiUtils(apiContext,loginPayload);
            const response =  await apiUtils.createOrder(orderPayload);
            await use(response);
            //tear down
            await apiContext.dispose();
        },
// data Driven custome fixture
        testDataForOrder: 
        {
            productName : 'ADIDAS ORIGINAL'
        }
});