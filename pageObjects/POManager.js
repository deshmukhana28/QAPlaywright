const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {CheckoutPage} = require('./CheckoutPage');
const {ThankyouPage} = require('./ThankyouPage');
const {orderHistoryPage} = require('./OrderhistoryPage');
const {OrderSummaryPage} = require('./OrderSummaryPage');

class POManager{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardpage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.thankyouPage =new ThankyouPage(this.page);
        this.oderhistorypage = new orderHistoryPage(this.page);
        this.ordersummapypage = new OrderSummaryPage(this.page);
    }
    getLoginPage()
    {
        return this.loginPage;
    }
    getDashboardPage()
    {
        return this.dashboardpage;
    }
    getCartPage()
    {
        return this.cartPage;
    }
    getCheckoutPage()
    {
        return this.checkoutPage;
    }
    getThankyouPage()
    {
        return this.thankyouPage;
    }
    getorderHistoryPage()
    {
        return this.oderhistorypage;
    }
    getOrderSummaryPage()
    {
        return this.ordersummapypage;
    }

}
module.exports= {POManager};