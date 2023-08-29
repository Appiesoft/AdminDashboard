import DueOrderActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start Due Order List
export const DueOrderList = (data): AuthAction => ({
    type: DueOrderActionTypes.GET_DUE_ORDER_LIST,
    payload: data
})

