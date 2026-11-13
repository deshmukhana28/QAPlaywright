//importing test here: these test are executed in playwright that launches the browser and provides a fresh page for each test
//test.only : PW runner will run only this testcase and skip all 100 testcases
const { test, expect } = require('@playwright/test');
const emailID= "Deshmukh@gmail.com"; 
const productName = 'ZARA COAT 3';
let webContext;
test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = page.locator("#userEmail");
    const password = page.locator("[type='password']");
    const loginButton = page.locator("#login");
    await email.fill("Deshmukh@gmail.com");
    await password.fill("Anu@1234");
    await loginButton.click(); 
    await page.waitForLoadState('networkidle'); //**************************************************VIP */
    await context.storageState({path: 'state.json'}); 
    webContext = await browser.newContext({storageState: 'state.json'});
})


test('End to End client App', async ({}) =>
{

    const page = await webContext.newPage(); //******************************************************************************************** */
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const productList = page.locator(".card-body");
    const cart = page.locator("[routerlink*='cart']");
    const checkout = page.locator("text=Checkout");
    // const cvv = page.locator("div.small input.txt");
    const cvv= page.locator("div.field input.txt").nth(1);
    const nameOnCard= page.locator("div.field input.txt").nth(2);
    const confirmEmail = page.locator("div.details__user [type='text']").first();
    const countryDropdown = page.locator("[placeholder*='Country']");
    const countryOption = page.locator("section.ta-results");
    const placeOrder = page.locator("text=Place Order ");
    const successMessage = page.locator(".hero-primary");
    const orderIdLocator = page.locator("label.ng-star-inserted");
    const orderHistoryPage= page.locator("button[routerlink*='/dashboard/myorders']");
    const rows= page.locator("tbody tr");
    const orderIdfromsummary = page.locator("div.col-text");
    
    await expect(page).toHaveTitle("Let's Shop");

    // solution no 2: use .waitfor() method
    await productList.first().waitFor();
    console.log(await productList.allTextContents());
    const count =  await productList.count();
    // iterating through items and adding defind item into the cart
    for(let i=0; i<count; ++i)
    {
        if(await productList.nth(i).locator("b").textContent()==productName)
        {
            //logic of add to cart
            await productList.nth(i).locator("text = Add To Cart").click();
            break;
        }
    }
    // go to cart page
    await cart.click();
    // waiting for page to load
    await page.locator("div li").first().waitFor();

    // checking item is visible in cart or not
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    // click on checkout button
    await checkout.click();
    // enter CVV
    await cvv.first().fill("123");
    // enter Name of card in the field
    await nameOnCard.fill("anupama");
    // check the email reflecting on shipping info is correct or not
    await expect( confirmEmail).toHaveText(emailID);

    // enter country from dynamic dropdown
    await countryDropdown.pressSequentially("ind");

    // wait for all options to load
    await countryOption.waitFor();

    // find the count of the country-options
    const optionCount = await countryOption.locator("button").count();
    // check each option one by one and select the expected country
    for(let i=0; i<optionCount; ++i)
    {
        const countryText = await countryOption.locator("button").nth(i).textContent();
        if(countryText === " India")
        {
            await countryOption.locator("button").nth(i).click();
            break;
        }
    }
    // proceed the place order
    await placeOrder.click();

    // check the success message after placing order
    await expect( successMessage).toHaveText(" Thankyou for the order. ");
    // store the Order Id
    const oIddummy= await orderIdLocator.textContent();
    const orderId = oIddummy.split("|")[1].trim();
    
    console.log(orderId);

    // go to order history page
    await orderHistoryPage.click();

    await rows.first().waitFor();
    // check each row one by one and check whether our order id is present or not
    
    for(let i =0; i < await rows.count(); ++i)
    {
        const rowOrderid = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderid))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    await expect(orderIdfromsummary).toHaveText(orderId);
    // await page.pause();
});