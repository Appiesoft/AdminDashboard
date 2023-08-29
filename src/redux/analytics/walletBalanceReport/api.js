import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start wallet balance report list 
function walletBalanceReportList(params: any): any {
    return api.create(URL.WALLET_BALANCE_REPORT_LIST, params);
}
export { walletBalanceReportList }