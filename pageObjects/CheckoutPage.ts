import { Locator, Page, expect} from "@playwright/test";
export class CheckoutPage{
    cvv : Locator;
    nameOnCard : Locator;
    confirmEmail : Locator;
    countryDropdown : Locator;
    countryOption : Locator;
    placeOrder : Locator;
    page: Page;
    constructor(page: Page)
    {
        this.page = page;
        this.cvv= page.locator("div.field input.txt").nth(1);
        this.nameOnCard= page.locator("div.field input.txt").nth(2);
        this.confirmEmail = page.locator("div.details__user [type='text']").first();
        this.countryDropdown = page.locator("[placeholder*='Country']");
        this.countryOption = page.locator("section.ta-results");
        this.placeOrder = page.locator("text=Place Order ");
    }

    async fillShippingInfo(emailID: string)
    {
            await this.cvv.first().fill("123");
            await this.nameOnCard.fill("anupama");
            // check the email reflecting on shipping info is correct or not
            await expect(this.confirmEmail).toHaveText(emailID);
            // enter country from dynamic dropdown
            await this.countryDropdown.pressSequentially("ind");
            // wait for all options to load
            await this.countryOption.waitFor();
            // find the count of the country-options
            const optionCount = await this.countryOption.locator("button").count();
            // check each option one by one and select the expected country
            for(let i=0; i<optionCount; ++i)
            {
                const countryText = await this.countryOption.locator("button").nth(i).textContent();
                if(countryText === " India")
                {
                    await this.countryOption.locator("button").nth(i).click();
                    break;
                }
            }
            
    }
    async placeTheOrder()
    {
            await this.placeOrder.click();
    }
}
module.exports = {CheckoutPage};