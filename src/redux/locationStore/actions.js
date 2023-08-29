import StoreActionTypes from "./constants";



type AuthAction = { type: string, payload: {} | string };

export const storeList = (data): AuthAction => ({
    type: StoreActionTypes.GET_STORE_LIST,
    payload: { ...data }
})

export const storeCreate = (data): AuthAction => ({
    type: StoreActionTypes.CREATE_STORE,
    payload: { ...data }
})

export const storeDetails = (data): AuthAction => ({
    type: StoreActionTypes.DETAILS_STORE,
    payload: { ...data }
})

export const storeUpdate = (data): AuthAction => ({
    type: StoreActionTypes.UPDATE_STORE,
    payload: { ...data }
})

export const storeDelete = (data): AuthAction => ({
    type: StoreActionTypes.DELETE_STORE,
    payload: { ...data }
})