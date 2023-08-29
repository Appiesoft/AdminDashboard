import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start promo code report list 
function promoCodeReportList(params: any): any {
    return api.create(URL.PROMO_CODE_REPORT_LIST, params);
}
export { promoCodeReportList }