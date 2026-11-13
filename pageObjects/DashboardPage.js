class DashboardPage{

    constructor(page)
    {
       this.productList = page.locator(".card-body");
       this.cart = page.locator("[routerlink*='cart']");
       this.orderHistoryPage= page.locator("button[routerlink*='/dashboard/myorders']");
    }
    async searchProductAddToCart(productName)
    {
    const title = await this.productList.allTextContents();
    const count = await this.productList.count();
    // iterating through items and adding defind item into the cart
    for(let i=0; i<count; ++i)
    {
        if(await this.productList.nth(i).locator("b").textContent()==productName)
        {
            //logic of add to cart
            await this.productList.nth(i).locator("text = Add To Cart").click();
            break;
        }
    }
    }
    async navigateToCart()
    {
        // go to cart page
        await this.cart.click();
    }

    async navigateToOrdersHistoryPage()
    {
        // go to order history page
        await this.orderHistoryPage.click();
    }
    }
module.exports={DashboardPage};