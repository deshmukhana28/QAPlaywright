const {expect} = require('@playwright/test');
class OrderSummaryPage{
    constructor(page)
    {
        this.page =page;
        this.orderIdfromsummary = page.locator("div.col-text");
    }
    async validateOrderIdFromSummary(orderId)
    {
        await expect(this.orderIdfromsummary).toHaveText(orderId);
    }
}
module.exports = {OrderSummaryPage};