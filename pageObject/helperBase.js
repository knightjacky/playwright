export default class BasePage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate(url) {
      await this.page.goto(url); // Navigate to a specified URL
    }
    async waitForNumberOfSeconds(timeInSeconds) {
      await this.page.waitForTimeout(timeInSeconds * 1000);
    }
  }