import { Locator, Page, expect} from "@playwright/test";
export class LoginPage{
    email:Locator;
    password:Locator;
    loginButton:Locator;
    productList:Locator;
    page: Page;
    constructor(page:Page)
    {
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("[type='password']");
        this.loginButton = page.locator("#login");
        this.productList = page.locator(".card-body b");
    }

    async landOnLoginPage()
    {
       await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login"); 
    }
    async validLogin(username:string, userpassword:string)
    {
        await this.email.fill(username);
        await this.password.fill(userpassword);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}
module.exports={LoginPage};