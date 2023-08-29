import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Tip Report list 
function tipReportList(params: any): any {
    return api.create(URL.TIP_REPORT_LIST, params);
}
export { tipReportList }