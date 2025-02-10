import { test, expect, request } from "@playwright/test";
import PageObjectManager from "../pageObjects/pageOjectManager";
import { createData } from "../customCommands/common/dataFeed.js";
import listingAPI from "../customCommands/api/services/listingService";
import automatonService from "../customCommands/api/services/automatonService.js";
import { getAuthData } from "../customCommands/api/services/authService.js";

test.describe("Auto Confirm", () => {
  let uid, org, users, listingAgent, showingAgent, listing, listingID;
  let poManager;

  // Before all tests
  test.beforeAll(async ({ browser, request }) => {
    const page = await browser.newPage();
    poManager = new PageObjectManager(page); // Initialize poManager
    const data = await createData();
    uid = data.uid;
    org = data.org;
    users = data.users;
    listingAgent = users.agent2;
    showingAgent = users.coop2;

    // Add feature flag
    await automatonService.addRemoveFeatureFlag(org, "SHOWING_AGENT_SMS", "ADD");

    // Authenticate
    await getAuthData(users.admin4.email, users.admin4.password);

    // Delete duplicate listing
    if (data.duplicateListing) {
      await listingAPI.deleteListing(data.duplicateListing["_id"]);
    }

    // Create a new listing
    listing = await listingAPI.createListingAndConfigureAccess({
      listingAgent,
      statusName: "Exclusive",
      listingType: "freehold",
      type: "sale",
    });

    listingID = listing.id;
    console.log("Listing ID: ", listingID);

    // Close the page after setup
    await page.close();
  });

  // Before each test
  test.beforeEach(async ({ page }) => {
    await page.goto("https://qa.brokerbay.com/");
    poManager = new PageObjectManager(page); // Reinitialize poManager for each test
    await poManager.getLoginPage().login(users.admin4.email, users.admin4.password);
    await expect(poManager.getDashboardPage().dashboardTitle).toBeVisible();
  });

  test("Auto Confirm test 10.1 @regression", async ({ page }) => {
    await page.goto(`/listings/${listingID}/edit`);
    await page.click('[data-cy="confirm-auto"]');
    await page.click('.confirm');
    await page.click('[data-cy="save-configure"]');

    // Request a showing
    await page.click('[data-cy="request-showing"]');
    await page.fill('[data-cy="agent-roster-input"]', showingAgent.fullName);
    await page.click(`[data-cy="${showingAgent.id}"]`);
    await page.click(`[data-cy="timeWidget-9:00 AM"]`);
    await page.click('[data-cy="submit-appointment"]');
    await page.waitForResponse(/appointments\/submit/);

    // Check that auto-confirm time is selected
    const autoConfirmText = await page.locator('[data-cy="autoconfirm-time-text"]').textContent();
    expect(autoConfirmText).toContain("AUTO-CONFIRM TIME SELECTED");
  });
});