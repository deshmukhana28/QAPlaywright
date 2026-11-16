const base = require('@playwright/test');
const { expect } = base;

const LOGIN_URL = 'https://eventhub.rahulshettyacademy.com/login';
const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com';
const credentials = {
  email: 'anudeshmukh@gmail.com',
  password: 'Anu@2026',
};
const eventPayload= {title:"abcd",
                    description:"",
                    category:"Conference",
                    venue:"abcd",city:"banglore",
                    eventDate:"2026-11-20T09:25:00.000Z",
                    price:23,
                    totalSeats:4,
                    imageUrl: 'https://example.com/images/automation-event.jpg',
                };

exports.customtest = base.test.extend( {
// Task 1: UI ogin fixture 
authenticatedPage: async({browser}, use)=>
{
  const context = await browser.newContext();  
  const page = await context.newPage();
  await page.goto(LOGIN_URL);
  await page.locator("#email").fill(credentials.email);
  await page.locator("#password").fill(credentials.password);
  await page.locator("#login-btn").click();
  await page.waitForLoadState('networkidle');

  await use(page);
  await context.close();
},
// Task 2: API event creation Fixture - return the created event's data
createEvent: async({playwright}, use)=>
{
    const apiContext = await playwright.request.newContext({baseURL: API_BASE_URL});
let event;
let token;
try{
    const loginResponse = await apiContext.post('/api/auth/login', {data: credentials}); // 200, 201
    const loginResponseJson = await loginResponse.json();
    if(!loginResponse.ok())
    {
        throw new Error(`Login failed: ${JSON.stringify(loginResponseJson)}`);
    }
    token = loginResponseJson.token;
    // create event
    const createResponse = await apiContext.post('/api/events', {
        data: eventPayload, 
        headers:{authorization: `Bearer ${token}`},
});
    const body = await createResponse.json();
    console.log('Create status:', createResponse.status());
    console.log('Create response:', body);
    if(!createResponse.ok())
    {
         throw new Error(`Event creation failed: ${JSON.stringify(body)}`);
    }
    event = body.data;
    if (!event || !event.id) {
            throw new Error(`Event ID missing: ${JSON.stringify(body)}`);
        }
        // Pass event to test
    await use(event);
}
finally {
    if (event && event.id) {
        const deleteResponse = await apiContext.delete(
            `/api/events/${event.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log('Delete status:', deleteResponse.status());
    }

    await apiContext.dispose();
}
}
});
