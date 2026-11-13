import { test, expect } from '@playwright/test';
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL  = 'https://api.eventhub.rahulshettyacademy.com/api';
const YAHOO_USER = {email:"jjones35@testdomain.com", password:"6PFM3kLOLAFi@"};
const GMAIL_USER = {email:"anudeshmukh@gmail.com", password:"Anu@2026"};

async function loginAs(page, user)
{
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder('you@email.com').fill(user.email);
  await page.getByLabel('Password').fill(user.password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    
}
test('gmail user sees Access Denied when viewing yahoo user booking', async ({ page, request }) => 
    {
        // Step 1 — Login as Yahoo user via API -
// - Use request.post() to call POST /api/auth/login - (Refer below API Doc link to construct )- https://api.eventhub.rahulshettyacademy.com/api/docs/#/Auth/post_auth_login)
// - Pass { email, password } as the request body under the data key
// - Assert the response is OK (loginRes.ok() is truthy)    
// - Parse the JSON response and extract token — you will use this for all subsequent API calls
const loginRes = await request.post(`${API_URL}/auth/login`, {
    data: { email: YAHOO_USER.email, password: YAHOO_USER.password },
  });
  expect(loginRes.ok()).toBeTruthy();
  const { token } = await loginRes.json();
   

// Step 2 — Fetch events via API to get a valid event ID
// - Use request.get() to call GET /api/events - (Refer below API Doc link to construct )- https://api.eventhub.rahulshettyacademy.com/api/docs/#/Events/get_events)
    const eventsRes = await request.get(`${API_URL}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(eventsRes.ok()).toBeTruthy();
  const eventsData = await eventsRes.json();
  const eventId = eventsData.data[0].id;

// Step 3 — Create a booking via API as Yahoo user
// - Use request.post() to call POST /api/bookings - (Refer below API Doc link to construct )-
// https://api.eventhub.rahulshettyacademy.com/api/docs/#/Bookings/post_bookings
const bookingResponse = await request.post(`${API_URL}/bookings`,{
// - Pass Authorization: Bearer <token> in headers
headers: {Authorization: `Bearer ${token}`},
// - Pass the booking payload in data:
// - eventId — from Step 2
// - customerName — any name e.g. 'Yahoo User'
// - customerEmail — Yahoo user's email
// - customerPhone — any 10-digit number
// - quantity — 1
    data:{
        eventId,
        customerName: 'Yahoo User',
        customerEmail: YAHOO_USER.email,
        customerPhone: '9999999999',
        quantity:1,
    },
});
// - Assert the response is OK
await expect(bookingResponse.ok()).toBeTruthy();
// - Parse the JSON and extract data.id — store as yahooBookingId
const yahooBookingId =(await bookingResponse.json()).data.id;

console.log(`yahoo booking created via API. ID: ${yahooBookingId}`);

// Step 4 — Login as Gmail user via browser UI
// - Call your loginAs(page, GMAIL_USER) helper
await loginAs(page, GMAIL_USER);

// Step 5 — Navigate to Yahoo's booking URL as Gmail user
// - Navigate directly to /bookings/${yahooBookingId}
await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, {waitUntil: 'networkidle'});
// - Pass { waitUntil: 'networkidle' } as the navigation option so the page fully resolves before asserting

// Step 6 — Validate Access Denied
// - Assert text Access Denied is visible
 await expect(page.getByText('Access Denied')).toBeVisible();
// - Assert text You are not authorized to view this booking is visible
 await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();
  });