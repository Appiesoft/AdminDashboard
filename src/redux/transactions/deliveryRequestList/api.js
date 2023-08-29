import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"


const api = new APICore();

function deliveryRequestListApi(params: any): any {
    return api.create(URL.DELIVERY_REQUEST_LIST, params);
}

function deliveryRequestCreateApi(params: any): any {
    return api.create(URL.DELIVERY_REQUEST_CREATE, params);
}

export { deliveryRequestListApi, deliveryRequestCreateApi }   