import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start expenses report 
function expensesReportList(params: any): any {
    return api.create(URL.EXPENSES_REPORT_LIST, params);
}
export { expensesReportList }