import AutomatedPromoActionTypes from "./constant";

type AuthAction = { type: string, payload: {} | string };

// start automated promo list 
export const automatedPromoList = (data): AuthAction => ({
    type: AutomatedPromoActionTypes.GET_AUTOMATED_PROMO_LIST,
    payload: data
})

// start automated promo create
export const automatedPromoCreate = (data): AuthAction => ({
    type: AutomatedPromoActionTypes.CREATE_AUTOMATED_PROMO,
    payload: data
})
// start automated promo detail
export const automatedPromoDetail = (data): AuthAction => ({
    type: AutomatedPromoActionTypes.DETAIL_AUTOMATED_PROMO,
    payload: data
})
// start automated promo update
export const automatedPromoUpdate = (data): AuthAction => ({
    type: AutomatedPromoActionTypes.UPDATE_AUTOMATED_PROMO,
    payload: data
})

// start automated promo delete
export const automatedPromoDelete = (data): AuthAction => ({
    type: AutomatedPromoActionTypes.DELETE_AUTOMATED_PROMO,
    payload: {
        ...data
    }
})

