import HelperBase from "./helperBase.js";

export default class DatePickerPage extends HelperBase {
  constructor(page) {
    super(page);

    // Define locators for login elements
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
  }

  async selectDateForNumberPlusCorrentDate(numberOfDayFromToday) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDayFromToday);
    const expectedDate = date.getDate().toString();
    const expectedMonthShot = date.toLocaleDateString("En-US", {
      month: "short",
    });
    const expectedMonthLong = date.toLocaleDateString("En-US", {
      month: "long",
    });
    const expectedYear = date.getFullYear();
    const dateToassert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page
      .locator("nb-calender-view-mode")
      .textConent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page.locator('[date-name="chevron-right"]').click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textConent();
    }
    await this.page
      .locator('[class="day-cell ng-star-inserted"]')
      .getByText(expectedDate, { exact: true })
      .click();
  }
}
