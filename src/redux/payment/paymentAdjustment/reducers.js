import PaymentAdjustmentActionTypes from "./constant";
const PAYMENT_ADJUSTMENT_INITIAL_STATE = {
    paymentAdjustmentList: [],
    loading: false,
};

const PAYMENT_ADJUSTMENT_CREATE_INITIAL_STATE = {
    loading: false,
    message: '',
};

const PAYMENT_ADJUSTMENT_UPDATE_INITIAL_STATE = {
    loading: false,
    message: '',
};

const PAYMENT_ADJUSTMENT_DELETE_INITIAL_STATE = {
    loading: false,
    message: '',
};

// start payment adjustment list
const PaymentAdjustmentList = (state = PAYMENT_ADJUSTMENT_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_LIST_LOADING:
            return {
                paymentAdjustmentList: state.paymentAdjustmentList,
                loading: true,
            };
        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_LIST_SUCCESS:
            return {
                paymentAdjustmentList: action.payload,
                loading: false,
            };
        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_LIST_ERROR:
            return {
                paymentAdjustmentList: state.paymentAdjustmentList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
//end payment adjustment list

// start Payment adjustment create
const PaymentAdjustmentCreate = (state = PAYMENT_ADJUSTMENT_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_CREATE_LOADING:
            return {
                loading: true,
            };

        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_CREATE_SUCESS:
            return {
                ...action?.payload?.data,
                loading: false,
            };
        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_CREATE_RESET:
            return PAYMENT_ADJUSTMENT_CREATE_INITIAL_STATE;
        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end Payment adjustment create

// start payment adjustment update
const PaymentAdjustmentUpdate = (state = PAYMENT_ADJUSTMENT_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_UPDATE_LOADING:
            return {
                loading: true,
            };

        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_UPDATE_SUCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_UPDATE_RESET:
            return PAYMENT_ADJUSTMENT_UPDATE_INITIAL_STATE;
        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end update payment adjustment

// start Payment type remove
const PaymentAdjustmentDelete = (state = PAYMENT_ADJUSTMENT_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_DELETE_LOADING:
            return {
                paymentAjustmentDelete: state.paymentAjustmentDelete,
                loading: true,
            };

        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_DELETE_SUCESS:
            return {
                ...action.payload,
                loading: false,
            };
        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_DELETE_RESET:
            return PAYMENT_ADJUSTMENT_DELETE_INITIAL_STATE;
        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_DELETE_ERROR:
            return {
                paymentAjustmentDelete: state.paymentAjustmentDelete,
                loading: false,
                message: action?.payload?.message,
            };
        case PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_DELETE_ERROR:
            return PAYMENT_ADJUSTMENT_DELETE_INITIAL_STATE
        default:
            return { ...state };
    }
};
// end payment adjustment delete


export { PaymentAdjustmentList, PaymentAdjustmentCreate, PaymentAdjustmentDelete, PaymentAdjustmentUpdate };
