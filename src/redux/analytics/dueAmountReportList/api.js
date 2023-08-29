import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Due Amount Report List 
function dueAmountReport(params: any): any {
    return api.create(URL.DUE_AMOUNT_REPORT_LIST, params);
}


export { dueAmountReport }