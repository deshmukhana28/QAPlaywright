class LoginPage{
    constructor(page)
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
    async validLogin(username, userpassword)
    {
        await this.email.fill(username);
        await this.password.fill(userpassword);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}
module.exports={LoginPage};