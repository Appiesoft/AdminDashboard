import PaymentActionTypes from "./constant";

type AuthAction = { type: string, payload: {} | string };

// start employee list 
export const paymentList = (data): AuthAction => ({
    type: PaymentActionTypes.GET_PAYMENT_LIST,
    payload: { ...data }
})


