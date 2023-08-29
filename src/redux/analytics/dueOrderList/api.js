import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Due Order List 
function dueOrderList(params: any): any {
    return api.create(URL.DUE_ORDER_LIST, params);
}


export { dueOrderList }