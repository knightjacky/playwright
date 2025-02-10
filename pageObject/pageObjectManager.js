import UploadFinacialData from "./uploadFinancialData";
import LabelMapping from "./labelMapping";
import FinancialDataVisualization from "./financialDataVisualization";
export default class pageObjectManager {
  constructor(page) {
    this.page = page;
    this.uploadFinacialData = null;
    this.labelMapping = new LabelMapping(this.page);
    this.financialDataVisualization = new FinancialDataVisualization(this.page);
  }

  getUploadFinacialData(path) {
    if(!this.uploadFinacialData){
      this.uploadFinacialData = new UploadFinacialData(this.page, path);
    }
    return this.uploadFinacialData;
  }
  getLabelMapping() {
    return this.labelMapping;
  }
  getFinancialDataVisualization() {
    return this.financialDataVisualization;
  }

}
