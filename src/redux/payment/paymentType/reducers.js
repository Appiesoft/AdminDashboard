import PaymentTypeActionTypes from "./constant";
const PAYMENT_TYPE_INITIAL_STATE = {
    paymentTypeList: [],
    loading: false,
};

const PAYMENT_TYPE_CREATE_INITIAL_STATE = {
    loading: false,
    message: '',
};

const PAYMENT_TYPE_UPDATE_INITIAL_STATE = {
    loading: false,
    message: '',
};

const PAYMENT_TYPE_REMOVE_INITIAL_STATE = {
    paymentTypeRemove: null,
    loading: false,
};

// start payment type list
const PaymentTypeListReducer = (state = PAYMENT_TYPE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentTypeActionTypes.PAYMENT_TYPE_LIST_LOADING:
            return {
                paymentTypeList: state.paymentTypeList,
                loading: true,
            };
        case PaymentTypeActionTypes.PAYMENT_TYPE_LIST_SUCCESS:
            return {
                paymentTypeList: action.payload,
                loading: false,
            };
        case PaymentTypeActionTypes.PAYMENT_TYPE_LIST_ERROR:
            return {
                paymentTypeList: state.paymentTypeList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end payment type list

// start Payment Type create
const paymentTypeCreate = (state = PAYMENT_TYPE_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentTypeActionTypes.PAYMENT_TYPE_CREATE_LOADING:
            return {
                paymentTypeCreate: state.paymentTypeList,
                loading: true,
            };

        case PaymentTypeActionTypes.PAYMENT_TYPE_CREATE_SUCESS:
            return {
                ...action?.payload?.data,
                loading: false,
            };
        case PaymentTypeActionTypes.PAYMENT_TYPE_CREATE_RESET:
            return PAYMENT_TYPE_CREATE_INITIAL_STATE;
        case PaymentTypeActionTypes.PAYMENT_TYPE_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end Payment Type create

// start employee update
const PaymentTypeUpdate = (state = PAYMENT_TYPE_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentTypeActionTypes.PAYMENT_TYPE_UPDATE_LOADING:
            return {
                loading: true,
            };

        case PaymentTypeActionTypes.PAYMENT_TYPE_UPDATE_SUCESS:
            return {
                ...action.payload,
                loading: false,
            };
        case PaymentTypeActionTypes.PAYMENT_TYPE_UPDATE_RESET:
            return PAYMENT_TYPE_UPDATE_INITIAL_STATE;
        case PaymentTypeActionTypes.PAYMENT_TYPE_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end update payment type

// start Payment type remove
const PaymentTypeRemove = (state = PAYMENT_TYPE_REMOVE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentTypeActionTypes.PAYMENT_TYPE_REMOVE_LOADING:
            return {
                paymentTypeRemove: state.paymentTypeRemove,
                loading: true,
            };

        case PaymentTypeActionTypes.PAYMENT_TYPE_REMOVE_SUCESS:
            return {
                ...action.payload,
                loading: false,
            };
        case PaymentTypeActionTypes.PAYMENT_TYPE_REMOVE_RESET:
            return PAYMENT_TYPE_REMOVE_INITIAL_STATE;
        case PaymentTypeActionTypes.PAYMENT_TYPE_REMOVE_ERROR:
            return {
                paymentTypeRemove: state.paymentTypeRemove,
                loading: false,
                message: action?.payload?.message,
            };
        case PaymentTypeActionTypes.PAYMENT_TYPE_REMOVE_ERROR:
            return PAYMENT_TYPE_REMOVE_INITIAL_STATE
        default:
            return { ...state };
    }
};



export { PaymentTypeListReducer, paymentTypeCreate, PaymentTypeUpdate, PaymentTypeRemove };
