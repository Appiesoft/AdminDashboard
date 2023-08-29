import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start profit and loss report 
function profitAndLossReportList(params: any): any {
    return api.create(URL.PROFIT_AND_LOSS_REPORT_LIST, params);
}
export { profitAndLossReportList }