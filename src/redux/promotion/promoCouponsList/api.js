import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start promo coupon List 
function promoCouponListApi(params: any): any {
    return api.create(URL.PROMO_COUPONS_LIST, params);
}

// start promo coupon create 
function promoCouponCreateApi(params: any): any {
    return api.create(URL.PROMO_COUPONS_CREATE, params);
}

// start promo coupon detail 
function promoCouponDetailApi(params: any): any {
    return api.create(URL.PROMO_COUPONS_DETAIL, params);
}

// start promo coupon upadte
function promoCouponUpdateApi(params: any): any {
    return api.create(URL.PROMO_COUPONS_UPDATE, params);
}

// start promo coupon delete
function promoCouponDeleteApi(params: any): any {
    return api.delete(`${URL.PROMO_COUPONS_DELETE}/${params.promoCouponId}`);
}



export { promoCouponListApi, promoCouponDeleteApi, promoCouponCreateApi, promoCouponDetailApi, promoCouponUpdateApi }