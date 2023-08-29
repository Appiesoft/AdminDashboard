import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Monthly Report 
function monthlyReportList(params: any): any {
    return api.create(URL.MONTHLY_REPORT_LIST, params);
}
export { monthlyReportList }