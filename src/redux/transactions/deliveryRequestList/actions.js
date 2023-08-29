import DeliveryRequestActionTypes from "./constant";

type AuthAction = { type: string, payload: {} | string };

export const diliveryRequestList = (data): AuthAction => ({
    type: DeliveryRequestActionTypes.GET_DELIVERY_REQUEST_LIST,
    payload: { ...data }
})

export const diliveryRequestCreate = (data): AuthAction => ({
    type: DeliveryRequestActionTypes.CREATE_DELIVERY_REQUEST,
    payload: { ...data }
}) 
