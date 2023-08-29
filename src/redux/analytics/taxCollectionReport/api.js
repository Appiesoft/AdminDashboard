import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Tax Collection Report list 
function taxCollectionReportList(params: any): any {
    return api.create(URL.TAX_COLLECTION_REPORT_LIST, params);
}
export { taxCollectionReportList }