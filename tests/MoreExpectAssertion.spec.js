const{test, expect} = require('@playwright/test');

test('@web More Expect Assertion', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    const hideButton = page.locator("#hide-textbox");
    await hideButton.click();
    await expect(page.locator("#displayed-text")).toBeHidden();
   
});

/*
await expect(page).toHaveTitle("Let's Shop");
await expect(page).toHaveURL(`${BASE_URL}/bookings`);
expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));
await expect(page.locator("#refund-spinner")).not.toBeVisible({timeout: 6000});
await expect(result).toContainText("Eligible for refund");

const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();

// Radio button assertion
await expect(radio.last()).toBeChecked();

// Checkbox assertion
expect(await checkbox.isChecked()).toBeFalsy();

// assertion for attribute
await expect(documentLink).toHaveAttribute('class', 'blinkingText');

*/