import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Payment Charges List
function paymentChargesListApi(params: any): any {
    return api.get(URL.PAYMENT_CHARGES_LIST, params);
}


// start Payment Charges Create
function paymentChargesCreateApi(params: any): any {
    return api.create(URL.PAYMENT_CHARGES_CREATE, params);
}

// start Payment Charges Update
function paymentChargesUpdateApi(params: any): any {
    return api.create(URL.PAYMENT_CHARGES_UPDATE, params);
}

// start Payment Charges Remove
function paymentChargesRemoveApi(params: any): any {
    return api.create(URL.PAYMENT_CHARGES_REMOVE, params);
}


export { paymentChargesListApi, paymentChargesCreateApi, paymentChargesRemoveApi, paymentChargesUpdateApi }