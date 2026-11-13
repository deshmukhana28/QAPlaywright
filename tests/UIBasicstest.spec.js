//importing test here: these test are executed in playwright that launches the browser and provides a fresh page for each test
//test.only : PW runner will run only this testcase and skip all 100 testcases
const { test, expect } = require('@playwright/test');

test('Browser context Playwright Test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
});

test('page Test', async ({page})=>
{
   await page.goto('https://www.google.com/');
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");
});

test('Locator Playwright Test', async ({page})=>
{
    const userName = page.locator("input#username");
    const password = page.locator("input#password");
    const signIn = page.locator("[type='submit']");
    const cardTitle = page.locator(".card-body a");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userName.fill("anupama");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect ");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.title());
    await expect(page).toHaveTitle("ProtoCommerce");

    console.log(await cardTitle.nth(0).textContent());
    const allTitle = await cardTitle.allTextContents();
    console.log(allTitle);

});

test('Ui basics with assertion Test', async ({page})=>
{
    const userName = page.locator("input#username");
    const password = page.locator("input#password");
    const dropDown = page.locator("select.form-control");
    const radio = page.locator("span.checkmark");
    const checkbox = page.locator("#terms"); 
    const webAlert = page.locator("#okayBtn");
    const documentLink = page.locator("[href*=documents-request]");
    const signIn = page.locator("[type='submit']");
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userName.fill("anupama");
    await password.fill("Learning@830$3mK2");
    await radio.last().click();
    await webAlert.click();
    // Radio button assertion
    await expect(radio.last()).toBeChecked();

    await checkbox.check();

    // Checkbox assertion
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    // Checkbox assertion
    expect(await checkbox.isChecked()).toBeFalsy();
    
    // await page.pause();
    await dropDown.selectOption("Teacher");
   
    // assertion for attribute
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
    await signIn.click();
    

});

test('child window handling with assertion Test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const documentLink = page.locator("[href*=documents-request]");
    const userName = page.locator("input#username");
    const[newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click()
    ])
        const text = await newPage.locator("*.red").textContent();
        const arrayText = text.split("@");
        const domain = arrayText[1].split(" ")[0];
        console.log(domain);
        await userName.fill(domain);
        await page.pause();
});

test('Playwright Special locators', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    //locator(css)
});

