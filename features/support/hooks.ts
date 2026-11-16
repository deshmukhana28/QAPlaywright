import {POManager} from '../../pageObjects/POManager';
import {After, AfterStep, Before, BeforeStep, Status} from '@cucumber/cucumber';
import {chromium, Browser, Page, BrowserContext} from '@playwright/test';

let browser:Browser;
let context:BrowserContext;
let page:Page;
//Before: run before each sceanrio
//BeforeAll: run only once before all the file scenario
//After: after each scenario
Before(async function()
{
    browser = await chromium.launch({headless:false});
    context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager= new POManager(this.page);
});

After(function()
{
    console.log("I am last to execute");
});
BeforeStep(function({})
{

});
AfterStep(async function({result})
{
    if(result.status === Status.FAILED)
    {
        await this.page.screenshot({path: 'screenshot.png'});
    }
});