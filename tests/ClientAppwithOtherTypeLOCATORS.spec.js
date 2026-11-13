//importing test here: these test are executed in playwright that launches the browser and provides a fresh page for each test
//test.only : PW runner will run only this testcase and skip all 100 testcases
const { test, expect } = require('@playwright/test');
test('End to End client App', async ({page}) =>
{
 
    const emailID= "Deshmukh@gmail.com"; 
    const country = "India";
    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = page.getByPlaceholder("email@example.com");
    const password = page.getByPlaceholder("enter your passsword");
    const loginButton = page.getByRole("button", {name: "Login"});

    const productList = page.locator(".card-body");
    const cart = page.locator("[routerlink*='cart']");

    const checkout = page.locator("text=Checkout");
    // const cvv = page.locator("div.small input.txt");
    const cvv= page.locator("div.field input.txt").nth(1);
    const nameOnCard= page.locator("div.field input.txt").nth(2);
    const confirmEmail = page.locator("div.details__user [type='text']").first();
    const countryDropdown = page.getByPlaceholder("Select Country");
    const countryOption = page.getByRole("button", {name: "India"});
    const placeOrder = page.getByText("PLACE ORDER");
    
    const successMessage = page.getByText("Thankyou for the order.");

    const orderIdLocator = page.locator("label.ng-star-inserted");
    const orderHistoryPage= page.locator("button[routerlink*='/dashboard/myorders']");
    const rows= page.locator("tbody tr");
    const orderIdfromsummary = page.locator("div.col-text");
    
    await email.fill(emailID);
    await password.fill("Anu@1234");
    await loginButton.click();
    await expect(page).toHaveTitle("Let's Shop");
    // solution no 2: use .waitfor() method
    await productList.first().waitFor();
    console.log(await productList.allTextContents());
    const count =  await productList.count();

    // iterating through items and adding defind item into the cart
    await productList.filter({hasText: productName}).getByRole('button', {name: " Add To Cart"}).click();
    
    // go to cart page
    await cart.click();
    // waiting for page to load
    await page.locator("div li").first().waitFor();

    // checking item is visible in cart or not
// const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
// expect(bool).toBeTruthy();
    // or
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

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
    // await countryOption.waitFor();

    // find the count of the country-options
    await countryOption.nth(1).click();
    
    // proceed the place order
    await placeOrder.click();

    // check the success message after placing order
    expect(successMessage).toBeVisible;
   
});