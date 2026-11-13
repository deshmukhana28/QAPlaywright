const {expect} = require('@playwright/test');
const {customtest} = require('../utils/Assignment5_Fixture.js');

customtest('Assignment Fixture', async({authenticatedPage, createEvent})=>
{
    await authenticatedPage.goto("https://eventhub.rahulshettyacademy.com/events");
    await expect(authenticatedPage.getByText(createEvent.title).first()).toBeVisible();
});