import CostomerActionTypes from "./constant"



type AuthAction = { type: string, payload: {} | string };

// start costomer list 
export const costomerList = (data): AuthAction => ({
    type: CostomerActionTypes.GET_COSTOMER_LIST,
    payload: data
})

// start costomer create
export const customerCreate = (data): AuthAction => ({
    type: CostomerActionTypes.CUSTOMER_CREATE,
    payload: data
})

// start costomer update
export const customerUpdate = (data): AuthAction => ({
    type: CostomerActionTypes.CUSTOMER_UPDATE,
    payload: data
})

// start costomer Delete
export const customerDelete = (data): AuthAction => ({
    type: CostomerActionTypes.CUSTOMER_DELETE,
    payload: { ...data }
})


