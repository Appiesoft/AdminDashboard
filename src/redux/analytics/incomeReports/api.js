import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start income Report 
function incomeReportList(params: any): any {
    return api.create(URL.INCOME_REPORT_LIST, params);
}
export { incomeReportList }