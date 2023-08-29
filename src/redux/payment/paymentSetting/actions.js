import PaymentSettingActionTypes from "./constant";
type AuthAction = { type: string, payload: {} | string };

// start payment Setting  list 
export const paymentSettingList = (data): AuthAction => ({
    type: PaymentSettingActionTypes.GET_PAYMENT_SETTING_LIST,
    payload: { ...data }
})


