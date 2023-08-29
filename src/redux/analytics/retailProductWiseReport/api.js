import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start retail product wise report list 
function retailProductWiseReportList(params: any): any {
    return api.create(URL.RETAIL_PRODUCT_WISE_REPORT_LIST, params);
}
export { retailProductWiseReportList }