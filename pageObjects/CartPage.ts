import { Locator, Page, expect} from "@playwright/test";

// const {expect, } = require('@playwright/test');
export class CartPage{
    item: Locator;
    checkout: Locator;
    page: Page;
    constructor(page:Page)
    {
        this.page = page;
        this.item = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkout = page.locator("text=Checkout");
    }
 
    async checkItemVisible()
    {
    const bool = await this.item.isVisible();
    expect(bool).toBeTruthy();
    }

    async naviageToCheckoutPage()
    {
        await this.checkout.click();
    }
}
module.exports = {CartPage};