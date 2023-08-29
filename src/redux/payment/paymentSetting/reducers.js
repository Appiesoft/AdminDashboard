import PaymentSettingtActionTypes from "./constant";
const PAYMENT_SETTING_INITIAL_STATE = {
    paymentSettingList: [],
    loading: false,
};


const PaymentSettingtList = (state = PAYMENT_SETTING_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentSettingtActionTypes.PAYMENT_SETTING_LIST_LOADING:
            return {
                paymentSettingList: state.paymentSettingList,
                loading: true,
            };
        case PaymentSettingtActionTypes.PAYMENT_SETTING_LIST_SUCCESS:
            return {
                paymentSettingList: action.payload,
                loading: false,
            };
        case PaymentSettingtActionTypes.PAYMENT_SETTING_LIST_ERROR:
            return {
                paymentSettingList: state.paymentSettingList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};



export { PaymentSettingtList };
