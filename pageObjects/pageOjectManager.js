import LoginPage from "./loginPage";
import DemoLoginPage from "./demoLoginPage";
import DashboardPage from "./dashboardPage";
import DatePickerPage from "./datePicklerPage";
export default class pageObjectManager {
  constructor(page, apiRandomID) {
    this.page = page;
    this.demoLoginPage = null;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.datePickerPage = new DatePickerPage(this.page);
  }

  getDemoLoginPage(randomID) {
    if(!this.demoLoginPage){
      this.demoLoginPage = new DemoLoginPage(this.page, randomID);
    }
    return this.loginPage;
  }
  getLoginPage() {
    return this.loginPage;
  }
  getDashboardPage() {
    return this.dashboardPage;
  }
  getDatePickerPage() {
    return this.datePickerPage;
  }

}
