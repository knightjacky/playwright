import HelperBase from "./helperBase.js";

export default class DemoLoginPage extends HelperBase {
  constructor(page, randomID) {
    super(page);
    // Define locators for login elements
    this.usernameInput = page.locator(`${randomID}`);
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
  }

  async login(username, password) {
    await this.usernameInput.fill(username); // Fill in the username
    await this.passwordInput.fill(password); // Fill in the password
    await this.loginButton.click(); // Click the login button
    await this.waitForNumberOfSeconds(2);
  }
}
