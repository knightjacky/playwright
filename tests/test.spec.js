import { test, expect } from '@playwright/test';
import PageObjectManager from "../pageObject/pageObjectManager";

test.describe("Financial Data Standardizer", () => {
  let poManager;

  // Before all tests
  test.beforeAll(async ({ browser, request }) => {
    const page = await browser.newPage();
    poManager = new PageObjectManager(page); // Initialize poManager
    // poManager.getUploadFinacialData().navigate('http://localhost:3000/');
    await page.goto("http://localhost:3000/");

    // // Close the page after setup
    // await page.close();
  });

  // Before each test
//   test.beforeEach(async ({ page }) => {
//     await page.goto("https://qa.brokerbay.com/");
//     poManager = new PageObjectManager(page); // Reinitialize poManager for each test
//     await poManager.getLoginPage().login(users.admin4.email, users.admin4.password);
//     await expect(poManager.getDashboardPage().dashboardTitle).toBeVisible();
//   });

  test("Upload Financial Data", async ({ page }) => {
    await poManager.getUploadFinacialData('/Users/lei.yu/Downloads/test-engineer-assessment/SAMPLE_FINANCIAL_DATA.xlsx').uploadTheFile();
    await page.waitForTimeout(5000);
    // await page.goto(`/listings/${listingID}/edit`);
    // await page.click('[data-cy="confirm-auto"]');
    // await page.click('.confirm');
    // await page.click('[data-cy="save-configure"]');

    // // Request a showing
    // await page.click('[data-cy="request-showing"]');
    // await page.fill('[data-cy="agent-roster-input"]', showingAgent.fullName);
    // await page.click(`[data-cy="${showingAgent.id}"]`);
    // await page.click(`[data-cy="timeWidget-9:00 AM"]`);
    // await page.click('[data-cy="submit-appointment"]');
    // await page.waitForResponse(/appointments\/submit/);

    // // Check that auto-confirm time is selected
    // const autoConfirmText = await page.locator('[data-cy="autoconfirm-time-text"]').textContent();
    // expect(autoConfirmText).toContain("AUTO-CONFIRM TIME SELECTED");
  });
  test("Label Mapping", async ({ page }) => {

  });
  test("Financial Data Visualization", async ({ page }) => {

  });
});