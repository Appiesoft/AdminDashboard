import OrderActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start order list 
export const ordersList = (data): AuthAction => ({
    type: OrderActionTypes.GET_ORDER_LIST,
    payload: data
})

