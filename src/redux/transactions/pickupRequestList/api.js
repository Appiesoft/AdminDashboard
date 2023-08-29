import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"


const api = new APICore();

function pickupRequestListApi(params: any): any {
    return api.create(URL.PICKUP_REQUEST_LIST, params);
}


function pickupRequestCreateApi(params: any): any {
    return api.create(URL.PICKUP_REQUEST_CREATE, params);
}

export { pickupRequestListApi, pickupRequestCreateApi }   