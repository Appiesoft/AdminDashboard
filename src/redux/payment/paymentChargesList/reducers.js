import PaymentChargesActionTypes from './constant';
const PAYMENT_CHARGES_LIST_INITIAL_STATE = {
    paymentChargesList: [],
    loading: false,
};
const PAYMENT_CHARGES_CREATE_INITIAL_STATE = {
    loading: false,
    message: '',
};
const PAYMENT_CHARGES_UPDATE_INITIAL_STATE = {
    loading: false,
    message: '',
};
const PAYMENT_CHARGES_REMOVE_INITIAL_STATE = {
    paymentChargeRemove: null,
    loading: false,
};

// start Payment Charges List
const PaymentChargesList = (state = PAYMENT_CHARGES_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentChargesActionTypes.PAYMENT_CHARGES_LIST_LOADING:
            return {
                paymentChargesList: state.paymentChargesList,
                loading: true,
            };

        case PaymentChargesActionTypes.PAYMENT_CHARGES_LIST_SUCCESS:
            return {
                paymentChargesList: action.payload,
                loading: false,
            };
        case PaymentChargesActionTypes.PAYMENT_CHARGES_LIST_ERROR:
            return {
                paymentChargesList: state.paymentChargesList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end Payment Charges List

// start Payment Charges create
const PaymentChargesCreate = (state = PAYMENT_CHARGES_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentChargesActionTypes.PAYMENT_CHARGES_CREATE_LOADING:
            return {
                loading: true,
            };

        case PaymentChargesActionTypes.PAYMENT_CHARGES_CREATE_SUCESS:
            return {
                ...action.payload.data,
                loading: false,
            };
        case PaymentChargesActionTypes.PAYMENT_CHARGES_CREATE_RESET:
            return PAYMENT_CHARGES_CREATE_INITIAL_STATE;
        case PaymentChargesActionTypes.PAYMENT_CHARGES_CREATE_ERROR:
            return {
                ...action.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end Payment Charges create

// start employee update
const PaymentChagesUpdate = (state = PAYMENT_CHARGES_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentChargesActionTypes.PAYMENT_CHARGES_UPDATE_LOADING:
            return {
                loading: true,
            };

        case PaymentChargesActionTypes.PAYMENT_CHARGES_UPDATE_SUCESS:
            return {
                ...action.payload,
                loading: false,
            };

        case PaymentChargesActionTypes.PAYMENT_CHARGES_UPDATE_RESET:
            return PAYMENT_CHARGES_UPDATE_INITIAL_STATE;
        case PaymentChargesActionTypes.PAYMENT_CHARGES_UPDATE_ERROR:
            return {
                ...action.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end update employee

// start Payment charges remove
const PaymentChargesRemove = (state = PAYMENT_CHARGES_REMOVE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PaymentChargesActionTypes.PAYMENT_CHARGES_REMOVE_LOADING:
            return {
                paymentChargeRemove: state.paymentChargeRemove,
                loading: true,
            };

        case PaymentChargesActionTypes.PAYMENT_CHARGES_REMOVE_SUCESS:
            return {
                ...action.payload,
                loading: false,
            };
        case PaymentChargesActionTypes.PAYMENT_CHARGES_REMOVE_ERROR:
            return {
                paymentChargeRemove: state.paymentChargeRemove,
                loading: false,
                message: action?.payload?.message,
            };
        case PaymentChargesActionTypes.PAYMENT_CHARGES_REMOVE_RESET:
            return PAYMENT_CHARGES_REMOVE_INITIAL_STATE;
        default:
            return { ...state };
    }
};

export { PaymentChargesList, PaymentChargesCreate, PaymentChagesUpdate, PaymentChargesRemove };
