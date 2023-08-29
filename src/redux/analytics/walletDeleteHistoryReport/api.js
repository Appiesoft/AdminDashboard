import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Wallet Delete History Report list 
function walletDeleteHistoryReportList(params: any): any {
    return api.create(URL.WALLET_DELETE_HISTORY_REPORT_LIST, params);
}
export { walletDeleteHistoryReportList }