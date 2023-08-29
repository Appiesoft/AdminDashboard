import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start wallet promo List 
function walletPromoListApi(params: any): any {
    return api.create(URL.WALLET_PROMO_LIST, params);
}
// start wallet promo create 
function walletPromoCreateApi(params: any): any {
    return api.create(URL.WALLET_PROMO_CREATE, params);
}
// start wallet promo detail 
function walletPromoDetailApi(params: any): any {
    return api.create(URL.WALLET_PROMO_DETAIL, params);
}
// start wallet promo update 
function walletPromoUpdateApi(params: any): any {
    return api.create(URL.WALLET_PROMO_UPDATE, params);
}
// start wallet promo delete 
function walletPromoDeleteApi(params: any): any {
    return api.delete(`${URL.WALLET_PROMO_DELETE}/${params.walletPromoId}`);
}



export { walletPromoListApi, walletPromoCreateApi, walletPromoDetailApi, walletPromoUpdateApi, walletPromoDeleteApi }