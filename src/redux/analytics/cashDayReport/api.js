import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start cash day report
function cashDayReport(params: any): any {
    return api.create(URL.CASH_DAY_REPORT_LIST, params);
}

export { cashDayReport }