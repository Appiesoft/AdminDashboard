import AutomatedPromoActionTypes from "./constant";

const AUTOMATED_PROMO_LIST_INITIAL_STATE = {
    automatedPromoList: [],
    loading: false,
};

const AUTOMATED_PROMO_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};
const AUTOMATED_PROMO_DETAIL_INITIAL_STATE = {
    automatedPromoDetail: {},
    loading: false,
};
const AUTOMATED_PROMO_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const AUTOMATED_PROMO_DELETE_INITIAL_STATE = {
    loading: false,
    message: ""
};

// start automated promo list
const AutomatedPromoList = (state = AUTOMATED_PROMO_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_LIST_LOADING:
            return {
                automatedPromoList: state.automatedPromoList,
                loading: true,
            };
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_LIST_SUCCESS:
            return {
                automatedPromoList: action?.payload,
                loading: false,
            };
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_LIST_ERROR:
            return {
                automatedPromoList: state.automatedPromoList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end automated promo list

// start automated promo create
const AutomatedPromoCreate = (state = AUTOMATED_PROMO_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_CREATE_LOADING:
            return {
                loading: true,
            };
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_CREATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_CREATE_RESET:
            return AUTOMATED_PROMO_CREATE_INITIAL_STATE
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end automated promo create

// start automated promo detail
const AutomatedPromoDetail = (state = AUTOMATED_PROMO_DETAIL_INITIAL_STATE, action) => {
    switch (action.type) {
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_DETAIL_LOADING:
            return {
                automatedPromoDetail: state.automatedPromoDetail,
                loading: true,
            };
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_DETAIL_SUCCESS:
            return {
                automatedPromoDetail: action?.payload,
                loading: false,
            };
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_DETAIL_RESET:
            return AUTOMATED_PROMO_DETAIL_INITIAL_STATE
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_DETAIL_ERROR:
            return {
                automatedPromoDetail: state.automatedPromoDetail,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end automated promo detail

// start automated promo update
const AutomatedPromoUpdate = (state = AUTOMATED_PROMO_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_UPDATE_LOADING:
            return {
                loading: true,
            };
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_UPDATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_UPDATE_RESET:
            return AUTOMATED_PROMO_UPDATE_INITIAL_STATE
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end automated promo update

// start automated promo delete
const AutomatedPromoDelete = (state = AUTOMATED_PROMO_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_DELETE_LOADING:
            return {
                loading: true,
            };
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_DELETE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_DELETE_RESET:
            return AUTOMATED_PROMO_DELETE_INITIAL_STATE
        case AutomatedPromoActionTypes.AUTOMATED_PROMO_DELETE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end automated promo delete


export { AutomatedPromoList, AutomatedPromoDelete, AutomatedPromoCreate, AutomatedPromoDetail, AutomatedPromoUpdate };
