const{test, expect} = require('@playwright/test');

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
// test1
// booking with 1 ticket should show "Eligible for refund"
const GMAIL_USER = {email:'anudeshmukh@gmail.com', password:'Anu@2026'};
async function loginAndGoToBookingPage(page)
{
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder("you@email.com").fill(GMAIL_USER.email);
    await page.getByLabel("Password").fill(GMAIL_USER.password);
    await page.locator("#login-btn").click();
    await expect(page.getByText("Browse Events →")).toBeVisible;
}

test('Single ticket booking is eligible for refund', async ({page})=>
{

    const events = page.locator("#nav-events");
    const firstEventCards = page.locator("#event-card").first();
    const customerFirstName = page.getByLabel("Full Name");
    const customerEmail= page.locator("#customer-email");
    const customerPhone = page.getByPlaceholder("+91 98765 43210");  
    const confirmButton = page.locator(".confirm-booking-btn");  
    const myBooking = page.locator("#nav-bookings");

// Step 1 — Login - Call your login helper
    await loginAndGoToBookingPage(page);
// Step 2 — Book first event with 1 ticket (default)

// - Navigate to /events
    await events.click();
// - Click Book Now on the very first event card (locate data-testid="event-card" → first → data-testid="book-now-btn")
    await expect( firstEventCards).toBeVisible();    
    await firstEventCards.getByTestId("book-now-btn").click({timeout:5000});
// - Fill Full Name, Email (your email), Phone
    await customerFirstName.fill("Rushikesh Deshmukh");
    await customerEmail.fill("anupama@getMaxListeners.com");
    await customerPhone.fill("8765797654");

// - Click confirm button (.confirm-booking-btn)
    await confirmButton.click();

// Step 3 — Navigate to booking detail
// - Click View My Bookings link
    await myBooking.click();
// - Assert URL is /bookings
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByRole('link', { name: 'View Details' }).first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();
    
    // Validate booking ref first letter matches event name first letter
    const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
    const eventTitle = await page.locator('h1').innerText();
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));
// Step 5 — Check refund eligibility

// - Click the Check Refund Eligibility button
    const refundButton = page.locator("#check-refund-btn").click();
// - Assert: spinner element (#refund-spinner) is immediately visible
    await expect(page.locator("#refund-spinner")).toBeVisible();
// - Assert: spinner is no longer visible within 6 seconds
    await expect(page.locator("#refund-spinner")).not.toBeVisible({timeout: 6000});

// Step 6 — Validate result

// - Locate result element by id #refund-result
    const result = page.locator("#refund-result");
// - Assert it is visible
    await expect(result).toBeVisible();
// - Assert it contains text Eligible for refund
    await expect(result).toContainText("Eligible for refund");
// - Assert it contains text Single-ticket bookings qualify for a full refund
    await expect(result).toContainText("Single-ticket bookings qualify for a full refund");

});

// test2: booking with 3 tickets should show "Not eligible for refund"
test('Not Eligibile for Refund', async ({page})=>
{

// Steps 1–2 — Same as Test 1, except after navigating to the event detail page, click the + button twice to increase quantity to 3 before filling the form
 const events = page.locator("#nav-events");
    const firstEventCards = page.locator("#event-card").first();
    const customerFirstName = page.getByLabel("Full Name");
    const customerEmail= page.locator("#customer-email");
    const customerPhone = page.getByPlaceholder("+91 98765 43210");  
    const confirmButton = page.locator(".confirm-booking-btn");  
    const myBooking = page.locator("#nav-bookings");

    await loginAndGoToBookingPage(page);
    await events.click();
    await expect( firstEventCards).toBeVisible();    
    await firstEventCards.getByTestId("book-now-btn").click({timeout:5000});
    const counter = page.locator('button:has-text("+")');

    await counter.click();
    await counter.click();

    await customerFirstName.fill("Rushikesh Deshmukh");
    await customerEmail.fill("anupama@getMaxListeners.com");
    await customerPhone.fill("8765797654");
    await confirmButton.click();

    await page.locator("#nav-bookings").click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByRole('link', { name: 'View Details' }).first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();
    const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
    const eventTitle = await page.locator('h1').innerText();
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));
    await page.locator('#check-refund-btn').click();
    await expect(page.locator('#refund-spinner')).toBeVisible();
 
// Wait for spinner to disappear after 4s
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

// Step 6 — Validate result (different assertions)
    const result = page.locator('#refund-result'); 
    await expect(result).toBeVisible(); 
// - Assert result contains Not eligible for refund
    await expect(result).toContainText("Not eligible for refund")

// - Assert result contains Group bookings (3 tickets) are non-refundable
    await expect(result).toContainText("Group bookings (3 tickets) are non-refundable.")
});