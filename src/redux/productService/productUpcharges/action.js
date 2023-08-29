import ProductUpchargesActionTypes from "../productUpcharges/constant"

type AuthAction = { type: string, payload: {} | string };

// start upcharges list 
export const upchargesList = ( data ): AuthAction => ({ 
    type: ProductUpchargesActionTypes.GET_UPCHARGES_LIST,
    payload: data
})

// start upcharges create
export const upchargesCreate = (data): AuthAction => ({
    type: ProductUpchargesActionTypes.CREATE_UPCHARGES,
    payload: {...data}
    
}) 

// start upcharges update
export const upchargesUpdate = (data): AuthAction => ({
    type: ProductUpchargesActionTypes.UPDATE_UPCHARGES,
    payload: {...data}
})
 
// start upcharges delete
export const upchargesDelete = (data): AuthAction => ({
    type: ProductUpchargesActionTypes.DELETE_UPCHARGES,
    payload: data
})
 
