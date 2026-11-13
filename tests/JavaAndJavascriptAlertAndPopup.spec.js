const{test, expect} = require('@playwright/test');

test('Java Javascript Alert And Popups ', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
// Java/Javascript poups, alerts 
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
// Hover
    await page.locator("#mousehover").hover();

// Frame

    // ->switch to frame
    const framesPage = page.frameLocator("#courses-iframe");
    framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const msg = await framesPage.locator(".text h2").textContent();
    console.log(msg.split(" ")[1]);
   
});