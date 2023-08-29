import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Payment Type List 
function paymentTypeApi(params: any): any {
    return api.create(URL.PAYMENT_TYPE_LIST, params);
}

// start Payment Type new enter form Create
function paymentTypeCreateApi(params: any): any {
    return api.create(URL.PAYMENT_TYPE_CREATE, params);
}

// start Payment Type  Update
function paymentTypeUpdateApi(params: any): any {
    return api.create(URL.PAYMENT_TYPE_UPDATE, params);
}

// start Payment type Remove
function paymentTypeRemoveApi(params: any): any {
    return api.delete(`${URL.PAYMENT_TYPE_REMOVE}/${params.paymentId}`);
}


export { paymentTypeApi, paymentTypeCreateApi, paymentTypeUpdateApi, paymentTypeRemoveApi }