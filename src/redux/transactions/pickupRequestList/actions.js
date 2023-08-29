import PickupRequestActionTypes from "./constant";
type AuthAction = { type: string, payload: {} | string };

export const pickupRequestList = (data): AuthAction => ({
    type: PickupRequestActionTypes.GET_PICKUP_REQUEST_LIST,
    payload: { ...data }
})

export const pickupRequestCreate = (data): AuthAction => ({
    type: PickupRequestActionTypes.CREATE_PICKUP_REQUEST,
    payload: { ...data }
})
