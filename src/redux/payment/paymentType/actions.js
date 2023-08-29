import PaymentTypeActionTypes from "./constant";
type AuthAction = { type: string, payload: {} | string };

// start Payment Type list 
export const PaymentTypeListAction = (data): AuthAction => ({
    type: PaymentTypeActionTypes.GET_PAYMENT_TYPE_LIST,
    payload: { ...data }
})

// start Payment Type new Form create
export const paymentTypeCreate = (data): AuthAction => ({
    type: PaymentTypeActionTypes.CREATE_PAYMENT_TYPE,
    payload: { ...data }
})

// start payment type update
export const paymentTypeUpdate = (data): AuthAction => ({
    type: PaymentTypeActionTypes.UPDATE_PAYMENT_TYPE,
    payload: { ...data }
})


//start payment type remove
export const paymentTypeRemove = (data): AuthAction => ({
    type: PaymentTypeActionTypes.REMOVE_PAYMENT_TYPE,
    payload: { ...data }
})


