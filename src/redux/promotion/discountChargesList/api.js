import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start discount charges List 
function discountChargesListApi(params: any): any {
    return api.create(URL.DISCOUNT_CHARGES_LIST, params);
}

// start discount charges Create
function discountChargesCreateApi(params: any): any {
    return api.create(URL.DISCOUNT_CHARGES_CREATE, params);
}
// start discount charges Detail
function discountChargesDetailApi(params: any): any {
    return api.create(URL.DISCOUNT_CHARGES_DETAIL, params);
}
// start discount charges Update
function discountChargesUpdateApi(params: any): any {
    return api.create(URL.DISCOUNT_CHARGES_UPDATE, params);
}

// start discount charges Delete
function discountChargesDeleteApi(params: any): any {
    return api.delete(`${URL.DISCOUNT_CHARGES_DELETE}/${params.discountId}`);
}



export { discountChargesListApi, discountChargesCreateApi, discountChargesDetailApi, discountChargesUpdateApi, discountChargesDeleteApi }