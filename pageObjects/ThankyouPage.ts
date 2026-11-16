import{Page, Locator, expect} from '@playwright/test';
export class ThankyouPage{
    page: Page;
    successMessage: Locator; 
    orderIdLocator: Locator;
    constructor(page: Page)
    {
        this.page =page;
        this.successMessage = page.locator(".hero-primary");
        this.orderIdLocator = page.locator("label.ng-star-inserted");
    }
    async validateSuccessOrder()
    {
    // check the success message after placing order
    await expect( this.successMessage).toHaveText(" Thankyou for the order. ");
    // store the Order Id
    let oIddummy: any;
    oIddummy= await this.orderIdLocator.textContent();
    const orderId = oIddummy.split("|")[1].trim();
    console.log(orderId);
    return orderId;
    }
}
module.exports= {ThankyouPage};