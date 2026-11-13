const{test, expect} = require('@playwright/test');
const{futureValue}= require('../utils/dateUtils.js');

test('Full booking flow with event Creation', async ({page}) =>
{
    const baseUrl = "https://eventhub.rahulshettyacademy.com";
    const eventName = "Pune Diwali Event";
    const eventDescription = "About this event Celebrate the Festival of Lights at the grandest Diwali Mela in North India. Enjoy 200+ stalls of artisanal crafts, street food, folk performances, fireworks, and cultural showcases spanning three vibrant evenings.";
    const cityName = "pune";
    const venueName = "Grand High Street, Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park, Pune, Maharashtra 411057"
    const eventPrice = "100";
    const totalSeats = "50";
    await page.goto(`${baseUrl}/login`);
    const email = page.getByPlaceholder("you@email.com");
    const password = page.getByLabel("Password");
    const signInButton = page.locator("#login-btn");
    const adminOption = page.getByRole("button", {name: "Admin"});
    const title = page.locator("#event-title-input");
    const description = page.locator("#admin-event-form").getByPlaceholder("Describe the event…");
    const city =page.getByLabel("City");
    const venue = page.getByLabel("Venue");
    const eventDate = page.getByLabel("Event Date & Time");
    const price = page.getByLabel("Price ($)");
    const seats = page.getByLabel("Total Seats");
    const addEventButton = page.locator("#add-event-btn");
    const eventCreatedMsg = page.getByText("Event Created!");
    const events = page.locator("#nav-events");
    const allEventCards = page.locator("#event-card");
    const defaultTicketCount = page.locator("#ticket-count");

    const customerFirstName = page.getByLabel("Full Name");
    const customerEmail= page.locator("#customer-email");
    const customerPhone = page.getByPlaceholder("+91 98765 43210");  
    const confirmButton = page.locator(".confirm-booking-btn");  

    const bookingRef = page.locator(".booking-ref").first();
    const myBooking = page.locator("#nav-bookings");
     
// Step 1 — Login : anudeshmukh@gmail.com | Anu@2026

    await email.fill("anudeshmukh@gmail.com");
    await password.fill("Anu@2026");
    await signInButton.click();
    await expect(page.getByText("Browse Events →")).toBeVisible;

// Step 2 — Create a new event
    // await adminOption.click();
    // await page.locator("div.relative").getByRole("link", {name: "Manage Events"}).click();
    // await title.fill(eventName);
    // await description.fill(eventDescription);
    // await city.fill(cityName);
    // await venue.fill(venueName);
    // await eventDate.fill(futureValue());
    // await price.fill(eventPrice);
    // await seats.fill(totalSeats);
    // await addEventButton.click();
    // await expect(eventCreatedMsg).toBeVisible();

// Step 3 — Find the event card and capture seats
    await events.click();
    await expect( allEventCards.first()).toBeVisible();
    const targetCard = allEventCards.filter({hasText: eventName}).first();
    await expect(targetCard).toBeVisible({timeout: 5000});
    
    const seatsBeforeBooking = parseInt(await targetCard.getByText("seat").first().innerText());
    
    console.log(seatsBeforeBooking);

// Step 4 — Start booking
   await targetCard.getByTestId("book-now-btn").click({timeout:5000});

// Step 5 — Fill booking form
    await expect(defaultTicketCount).toHaveText("1", {timeout:5000});
    await customerFirstName.fill("Rushikesh Deshmukh");
    await customerEmail.fill("anupama@getMaxListeners.com");
    await customerPhone.fill("8765797654");
    await confirmButton.click();

// Step 6 — Verify booking confirmation
    await expect(bookingRef).toBeVisible();
    const BookingRefId = (await bookingRef.innerText()).trim();
    console.log(BookingRefId);
    expect(BookingRefId.charAt(0)).toBe(eventName.trim().charAt(0).toUpperCase());

// Step 7 — Verify in My Bookings
    await myBooking.click();
    await expect(page).toHaveURL(`${baseUrl}/bookings`);

    const bookingCards = page.locator("#booking-card");
    await expect(bookingCards.first()).toBeVisible();
    const matchCard= bookingCards.filter({has: page.locator(".booking-ref", {hasText:BookingRefId})});
    await expect(matchCard).toBeVisible();
    await expect(matchCard).toContainText(eventName);
    console.log(`Booking card found in my booking for ref: ${BookingRefId}`);

// Step 8 — Verify seat reduction
// - Navigate back to /events
await events.click();
// - Assert the first event card is visible
await expect(allEventCards.first()).toBeVisible();
// - Filter cards again using hasText: eventTitle
const updatedCard = await allEventCards.filter({hasText: eventName}).first();
// - Assert the card is visible
await expect(updatedCard).toBeVisible();
// - Read the seat count text again (same as Step 3) — store as seatsAfterBooking
const seatsAfterBooking = parseInt(await updatedCard.getByText("seat").first().innerText());
// - Assert: seatsAfterBooking === seatsBeforeBooking - 1
expect(seatsBeforeBooking).toBe(seatsAfterBooking+1);

})
