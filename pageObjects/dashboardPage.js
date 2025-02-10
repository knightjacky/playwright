import HelperBase from "./helperBase.js";

export default class DashboardPage extends HelperBase {
  constructor(page) {
    super(page);

    // Define locators for login elements
    this.dashboardTitle = page.locator('[data-cy="dashboard-title"]');
  }

  async login(username, password) {
    await this.usernameInput.fill(username); // Fill in the username
    await this.passwordInput.fill(password); // Fill in the password
    await this.loginButton.click(); // Click the login button
  }
}
