import { test, expect } from "@playwright/test";
import PageObjectManager from "../pageObjects/pageOjectManager";
// import faker from '@faker-js/faker';

test.describe("Login Tests", () => {
  test.describe.configure({retries: 2});
  test.beforeEach(async ({ page }) => {
    const baseUrl = process.env.BASE_URL;
    await page.goto("https://qa.brokerbay.com/");
  });

  test.only("Should log in with valid credentials @regression", async ({ page }, testInfo) => {
    if(testInfo.retry){
        // do something like clear the test data or delete some info reset the api if retry happening 
    }
    const validUserName = "jacky+agent@brokerbay.com";
    const validPassword = "Test123!";
    const poManager = new PageObjectManager(page);
    // const randomFullAddress = faker.randomFullAddress()
    const apiRandomID = "#username";

    // console.log("$$$$$$$$$$$"+randomFullAddress);
    const loginPage =poManager.getLoginPage(apiRandomID)

    loginPage.login(validUserName, validPassword);

    // Add assertions to verify successful login (e.g., check for a dashboard element)
    await poManager.getDatePickerPage().waitForNumberOfSeconds(5);
    // await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels: 300});
    // await expect(page.locator("#dashboard")).toBeVisible();
    await page.waitForTimeout(5000);
  });
});
