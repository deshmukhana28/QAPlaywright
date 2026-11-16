import { Locator, Page, expect} from "@playwright/test";
export class OrderSummaryPage{
    page:Page;
    orderIdfromsummary: Locator;
    constructor(page: Page)
    {
        this.page =page;
        this.orderIdfromsummary = page.locator("div.col-text");
    }
    async validateOrderIdFromSummary(orderId: any)
    {
        await expect(this.orderIdfromsummary).toHaveText(orderId);
    }
}
module.exports = {OrderSummaryPage};