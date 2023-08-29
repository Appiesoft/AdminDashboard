import WalletPromoActionTypes from "./constant";

type AuthAction = { type: string, payload: {} | string };

// start wallet promo list 
export const walletPromoList = (data): AuthAction => ({
    type: WalletPromoActionTypes.GET_WALLET_PROMO_LIST,
    payload: {
        ...data
    }
})

// start wallet promo create 
export const walletPromoCreate = (data): AuthAction => ({
    type: WalletPromoActionTypes.CREATE_WALLET_PROMO,
    payload: {
        ...data
    }
})
// start wallet promo detail 
export const walletPromoDetail = (data): AuthAction => ({
    type: WalletPromoActionTypes.DETAIL_WALLET_PROMO,
    payload: {
        ...data
    }
})
// start wallet promo update
export const walletPromoUpdate = (data): AuthAction => ({
    type: WalletPromoActionTypes.UPDATE_WALLET_PROMO,
    payload: {
        ...data
    }
})

// start wallet promo delete
export const walletPromoDelete = (data): AuthAction => ({
    type: WalletPromoActionTypes.DELETE_WALLET_PROMO,
    payload: {
        ...data
    }
})

