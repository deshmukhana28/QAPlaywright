import {Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import {POManager} from '../../pageObjects/POManager';
import {chromium, Browser, Page, BrowserContext} from '@playwright/test';
setDefaultTimeout(60 * 1000);
let username:string;
poManager: POManager;
console.log("STEP FILE LOADED SUCCESSFULLY");

Given('Login to Ecommerce application with {string} and {string}', async function (userName:string, password:string) {
    username=userName;
    await this.poManager.getLoginPage().landOnLoginPage();
    await this.poManager.getLoginPage().validLogin(username, password);  
});

When('Add {string} to cart', async function (product:string) {
    await this.poManager.getDashboardPage().searchProductAddToCart(product);
    await this.poManager.getDashboardPage().navigateToCart();
});

Then('Verify {string} is dispayed in the cart', async function (product:string) {
    await this.poManager.getCartPage().checkItemVisible();
    await this.poManager.getCartPage().naviageToCheckoutPage();
});

When('Enter valid details and place the Order', async function () {
    await this.poManager.getCheckoutPage().fillShippingInfo(username);
    await this.poManager.getCheckoutPage().placeTheOrder();
});

Then('Verify order is present in the OrderHistoyPage', async function () {
  const orderId:string = await this.poManager.getThankyouPage().validateSuccessOrder();
    await this.poManager.getDashboardPage().navigateToOrdersHistoryPage();
    await this.poManager.getorderHistoryPage().checkOrderIdAndNaviagetToOrderSummaryPage(orderId);
    await this.poManager.getOrderSummaryPage().validateOrderIdFromSummary(orderId);
});