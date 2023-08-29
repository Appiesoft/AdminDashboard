import DiscountChargesActionTypes from './constant';
const DISCOUNT_CHARGES_LIST_INITIAL_STATE = {
    discountChargesList: [],
    loading: false,
};

const DISCOUNT_CHARGES_CREATE_INITIAL_STATE = {
    loading: false,
    message: '',
};
const DISCOUNT_CHARGES_DETAIL_INITIAL_STATE = {
    discountChargesDetail: {},
    loading: false,
};
const DISCOUNT_CHARGES_UPDATE_INITIAL_STATE = {
    loading: false,
    message: '',
};

const DISCOUNT_CHARGES_DELETE_INITIAL_STATE = {
    loading: false,
    message: '',
};

// start discount charges list
const DiscountChargesList = (state = DISCOUNT_CHARGES_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_LIST_LOADING:
            return {
                discountChargesList: state.discountChargesList,
                loading: true,
            };

        case DiscountChargesActionTypes.DISCOUNT_CHARGES_LIST_SUCCESS:
            return {
                discountChargesList: action?.payload,
                loading: false,
            };
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_LIST_ERROR:
            return {
                discountChargesList: state.discountChargesList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end discount charges list

// start discount charges create
const DiscountChargesCreate = (state = DISCOUNT_CHARGES_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_CREATE_LOADING:
            return {
                loading: true,
            };

        case DiscountChargesActionTypes.DISCOUNT_CHARGES_CREATE_SUCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_CREATE_RESET:
            return DISCOUNT_CHARGES_CREATE_INITIAL_STATE
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end discount charges create

// start discount charges detail
const DiscountChargesDetail = (state = DISCOUNT_CHARGES_DETAIL_INITIAL_STATE, action) => {
    switch (action.type) {
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_DETAIL_LOADING:
            return {
                discountChargesDetail: state.discountChargesDetail,
                loading: true,
            };

        case DiscountChargesActionTypes.DISCOUNT_CHARGES_DETAIL_SUCESS:
            return {
                discountChargesDetail: action?.payload,
                loading: false,
            };
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_DETAIL_RESET:
            return DISCOUNT_CHARGES_DETAIL_INITIAL_STATE
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_DETAIL_ERROR:
            return {
                discountChargesDetail: state.discountChargesDetail,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end discount charges detail

// start discount charges update
const DiscountChargesUpdate = (state = DISCOUNT_CHARGES_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_UPDATE_LOADING:
            return {
                loading: true,
            };

        case DiscountChargesActionTypes.DISCOUNT_CHARGES_UPDATE_SUCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_UPDATE_RESET:
            return DISCOUNT_CHARGES_UPDATE_INITIAL_STATE
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end discount charges update

// start discount charges delete
const DiscountChargesDelete = (state = DISCOUNT_CHARGES_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_DELETE_LOADING:
            return {
                loading: true,
            };

        case DiscountChargesActionTypes.DISCOUNT_CHARGES_DELETE_SUCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_DELETE_RESET:
            return DISCOUNT_CHARGES_DELETE_INITIAL_STATE
        case DiscountChargesActionTypes.DISCOUNT_CHARGES_DELETE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end discount charges delete


export { DiscountChargesList, DiscountChargesCreate, DiscountChargesDetail, DiscountChargesUpdate, DiscountChargesDelete };
