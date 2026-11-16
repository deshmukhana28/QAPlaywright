import { Locator, Page, expect} from "@playwright/test";

import{LoginPage} from './LoginPage';
import{DashboardPage} from './DashboardPage';
import{CartPage} from './CartPage';
import{CheckoutPage} from './CheckoutPage';
import{ThankyouPage} from './ThankyouPage';
import{OrderHistoryPage} from './OrderhistoryPage';
import{OrderSummaryPage} from './OrderSummaryPage';

export class POManager{
    loginPage:LoginPage;
    dashboardpage:DashboardPage;
    cartPage:CartPage;
    checkoutPage:CheckoutPage;
    thankyouPage:ThankyouPage;
    oderhistorypage:OrderHistoryPage;
    ordersummapypage:OrderSummaryPage;
    page:Page;
    constructor(page:Page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardpage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.thankyouPage =new ThankyouPage(this.page);
        this.oderhistorypage = new OrderHistoryPage(this.page);
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