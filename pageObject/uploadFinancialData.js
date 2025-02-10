import HelperBase from "./helperBase";

export default class UploadFinacialData extends HelperBase {
  constructor(page) {
    super(page);
    // Define locators for uploadFinacialdata elements
    this.uploadSessionTitle = page.locator('h2:has-text("Upload Financial Data")');
    this.fileInput = page.locator('[name="file"]');
    this.fileName = page.locator('[accept=".xlsx,.xls"]');
    this.uploadBtn = page.getByText('Upload');
  }

  async uploadTheFile(path) {
    await this.fileInput.click();
    await this.fileInput.setInputFiles(path);
    await expect(this.fileName).toBeVisible();
    await this.uploadBtn.click();
  }
}
