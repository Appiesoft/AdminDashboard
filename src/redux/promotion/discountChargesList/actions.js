import DiscountChargesActionTypes from "./constant"



type AuthAction = { type: string, payload: {} | string };

// start discount charges list 
export const discountChargesList = (data): AuthAction => ({
    type: DiscountChargesActionTypes.GET_DISCOUNT_CHARGES_LIST,
    payload: { ...data }
})

// start discount charges create
export const discountChargesCreate = (data): AuthAction => ({
    type: DiscountChargesActionTypes.CREATE_DISCOUNT_CHARGES,
    payload: { ...data }
})
// start discount charges detail
export const discountChargesDetail = (data): AuthAction => ({
    type: DiscountChargesActionTypes.DETAIL_DISCOUNT_CHARGES,
    payload: { ...data }
})
// start discount charges update
export const discountChargesUpdate = (data): AuthAction => ({
    type: DiscountChargesActionTypes.UPDATE_DISCOUNT_CHARGES,
    payload: { ...data }
})

// start discount charges delete
export const discountChargesDelete = (data): AuthAction => ({
    type: DiscountChargesActionTypes.DELETE_DISCOUNT_CHARGES,
    payload: data
})


