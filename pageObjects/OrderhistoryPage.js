class orderHistoryPage{
    constructor(page)
    {
        this.page = page;
        this.rows = page.locator("tbody tr");

    }
    async checkOrderIdAndNaviagetToOrderSummaryPage(orderId)
    {
    await this.rows.first().waitFor();
    // check each row one by one and check whether our order id is present or not
    for(let i =0; i < await this.rows.count(); ++i)
    {
        const rowOrderid = await this.rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderid))
        {
            await this.rows.nth(i).locator("button").first().click();
            break;
        }
     }
    }
}
module.exports= {orderHistoryPage};