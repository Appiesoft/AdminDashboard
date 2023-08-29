import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start discount charges report
function discountChargesReport(params: any): any {
    return api.create(URL.DISCOUNT_CHARGES_REPORT_LIST, params);
}


export { discountChargesReport }