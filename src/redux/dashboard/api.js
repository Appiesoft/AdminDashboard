import { APICore } from '../../helpers/api/apiCore';
import * as URL from "../../constants/endPoints"

const api = new APICore();

// start dashboard list
function dashboardApi(params: any): any {
    return api.get(URL.DASHBOARD, params);
}

// start today order list
function todayOrderListApi(params: any): any {
    return api.create(URL.TODAY_ORDER_LIST, params);
}

// start order status
function orderStatusApi(params: any): any {
    return api.get(URL.ORDER_STATUS, params);
}


export { dashboardApi, todayOrderListApi, orderStatusApi }