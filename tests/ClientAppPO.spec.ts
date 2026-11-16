//importing test here: these test are executed in playwright that launches the browser and provides a fresh page for each test
//test.only : PW runner will run only this testcase and skip all 100 testcases

import {test, Page} from "@playwright/test";
import {POManager} from "../pageObjects/POManager";
import {customtest} from "../utils/TestDataFixture_basetest";

// json ->string ->js object
// const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
for(const data of dataset)
{
test(`test data by json file ${data.userName}`, async ({page}) =>
{
    const poManager = new POManager(page);

    await poManager.getLoginPage().landOnLoginPage();
    await poManager.getLoginPage().validLogin(data.userName, data.userpassword);
    
    await poManager.getDashboardPage().searchProductAddToCart(data.productName);
    await poManager.getDashboardPage().navigateToCart();

    await poManager.getCartPage().checkItemVisible();
    await poManager.getCartPage().naviageToCheckoutPage();

    await poManager.getCheckoutPage().fillShippingInfo(data.userName);
    await poManager.getCheckoutPage().placeTheOrder();

    const orderId = await poManager.getThankyouPage().validateSuccessOrder();
    
    await poManager.getDashboardPage().navigateToOrdersHistoryPage();

    await poManager.getorderHistoryPage().checkOrderIdAndNaviagetToOrderSummaryPage(orderId);

    await poManager.getOrderSummaryPage().validateOrderIdFromSummary(orderId);
    
});
}
// How to pass test data as fixture by extend test annotation 
customtest("test data by fixture",async({page, testDataForOrder})=>
{
     const poManager = new POManager(page);

    await poManager.getLoginPage().landOnLoginPage();
    await poManager.getLoginPage().validLogin(testDataForOrder.userName, testDataForOrder.userpassword);
    
    await poManager.getDashboardPage().searchProductAddToCart(testDataForOrder.productName);
    await poManager.getDashboardPage().navigateToCart();

    await poManager.getCartPage().checkItemVisible();
    await poManager.getCartPage().naviageToCheckoutPage();

    await poManager.getCheckoutPage().fillShippingInfo(testDataForOrder.userName);
    await poManager.getCheckoutPage().placeTheOrder();
    let orderId:any;
    orderId = await poManager.getThankyouPage().validateSuccessOrder();
    
    await poManager.getDashboardPage().navigateToOrdersHistoryPage();

    await poManager.getorderHistoryPage().checkOrderIdAndNaviagetToOrderSummaryPage(orderId);

    await poManager.getOrderSummaryPage().validateOrderIdFromSummary(orderId);
    
});
