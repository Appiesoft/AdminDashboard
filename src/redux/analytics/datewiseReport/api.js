import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start datewise report
function datewiseReport(params: any): any {
    return api.create(URL.DATEWISE_REPORT, params);
}


export { datewiseReport }