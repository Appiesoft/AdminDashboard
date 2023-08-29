import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start product wise report list 
function productWiseReportList(params: any): any {
    return api.create(URL.PRODUCT_WISE_REPORT_LIST, params);
}
export { productWiseReportList }