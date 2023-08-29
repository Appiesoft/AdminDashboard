import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start wallet History report list 
function walletHistoryReporttList(params: any): any {
    return api.create(URL.WALLET_HISTORY_REPORT_LIST, params);
}
export { walletHistoryReporttList }