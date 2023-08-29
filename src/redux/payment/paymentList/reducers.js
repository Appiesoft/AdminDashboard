import PaymentActionTypes from "./constant";

const PAYMENT_INITIAL_STATE = {
    paymentList: [],
    loading: false,
};

const PaymentList = (state = PAYMENT_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentActionTypes.PAYMENT_LIST_LOADING:
            return {
                paymentList: state.paymentList,
                loading: true,
            };
        case PaymentActionTypes.PAYMENT_LIST_SUCCESS:
            return {
                paymentList: action.payload,
                loading: false,
            };
        case PaymentActionTypes.PAYMENT_LIST_ERROR:
            return {
                paymentList: state.paymentList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};


export { PaymentList };
