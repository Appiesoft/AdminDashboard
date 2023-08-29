import PromoCouponActionTypes from "./constant"


type AuthAction = { type: string, payload: {} | string };

// start promo coupon list 
export const promoCouponList = (data): AuthAction => ({
    type: PromoCouponActionTypes.GET_PROMO_COUPON_LIST,
    payload: data
})

// start promo coupon create
export const promoCouponCreate = (data): AuthAction => ({
    type: PromoCouponActionTypes.CREATE_PROMO_COUPON,
    payload: data
})
// start promo coupon detail
export const promoCouponDetail = (data): AuthAction => ({
    type: PromoCouponActionTypes.DETAIL_PROMO_COUPON,
    payload: data
})
// start promo coupon update
export const promoCouponUpadte = (data): AuthAction => ({
    type: PromoCouponActionTypes.UPDATE_PROMO_COUPON,
    payload: data
})

// start promo coupon delete
export const promoCouponDelete = (data): AuthAction => ({
    type: PromoCouponActionTypes.DELETE_PROMO_COUPON,
    payload: data
})

