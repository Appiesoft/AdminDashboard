import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"
import * as STRING from "../../../constants/string"

const api = new APICore();

// start Order List 
function orderListApi(params: any): any {
    return api.create(URL.ORDER_LIST, params);
}

export { orderListApi }