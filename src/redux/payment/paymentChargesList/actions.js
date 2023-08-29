import PaymentChargesActionTypes from "./constant"



type AuthAction = { type: string, payload: {} | string };

// start payment Charges list 
export const paymentChargesList = (): AuthAction => ({
    type: PaymentChargesActionTypes.GET_PAYMENT_CHARGES_LIST,
    payload: undefined
})

// start payment Charges create
export const paymentChargesCreate = (data): AuthAction => ({
    type: PaymentChargesActionTypes.CREATE_PAYMENT_CHARGES,
    payload: { ...data }
})


// start payment Charges update
export const paymentChargesUpdate = (data): AuthAction => ({
    type: PaymentChargesActionTypes.UPDATE_PAYMENT_CHARGES,
    payload: { ...data }
})

// start payment Charges remove
export const paymentChargesRemove = (data): AuthAction => ({
    type: PaymentChargesActionTypes.REMOVE_PAYMENT_CHARGES,
    payload: { ...data }
})


