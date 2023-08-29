import PaymentAdjustmentActionTypes from "./constant";
type AuthAction = { type: string, payload: {} | string };

// start payment adjustment  list 
export const paymentAdjustmentList = (data): AuthAction => ({
    type: PaymentAdjustmentActionTypes.GET_PAYMENT_ADJUSTMENT_LIST,
    payload: { ...data }
})

// start payment adjustment new Form create
export const paymentAdjustmentCreate = (data): AuthAction => ({
    type: PaymentAdjustmentActionTypes.CREATE_PAYMENT_ADJUSTMENT,
    payload: { ...data }
})

// start payment adjustment update
export const paymentAdjustmentUpdate = (data): AuthAction => ({
    type: PaymentAdjustmentActionTypes.UPDATE_PAYMENT_ADJUSTMENT,
    payload: { ...data }
})

//start payment type remove
export const paymentAdjustmentDelete = (data): AuthAction => ({
    type: PaymentAdjustmentActionTypes.DELETE_PAYMENT_ADJUSTMENT,
    payload: { ...data }
})