import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start automated promo List 
function automatedPromoListApi(params: any): any {
    return api.create(URL.AUTOMATED_PROMO_LIST, params);
}

// start automated promo create 
function automatedPromoCreateApi(params: any): any {
    return api.create(URL.AUTOMATED_PROMO_CREATE, params);
}
// start automated promo detail
function automatedPromoDetailApi(params: any): any {
    return api.create(URL.AUTOMATED_PROMO_DETAIL, params);
}
// start automated promo update 
function automatedPromoUpdateApi(params: any): any {
    return api.create(URL.AUTOMATED_PROMO_UPDATE, params);
}

// start automated promo delete
function automatedPromoDeleteApi(params: any): any {
    return api.delete(`${URL.AUTOMATED_PROMO_DELETE}/${params.automatedPromoId}`);
}

export { automatedPromoListApi, automatedPromoDeleteApi, automatedPromoDetailApi, automatedPromoUpdateApi, automatedPromoCreateApi }