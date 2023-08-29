import PromoCouponActionTypes from "./constant";

const PROMO_COUPON_LIST_INITIAL_STATE = {
    promoCouponList: [],
    loading: false,
};

const PROMO_COUPON_DELETE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const PROMO_COUPON_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};
const PROMO_COUPON_DETAIL_INITIAL_STATE = {
    promoCouponDetail: {},
    loading: false,
};
const PROMO_COUPON_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

// start promo coupon list
const PromoCouponList = (state = PROMO_COUPON_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case PromoCouponActionTypes.PROMO_COUPON_LIST_LOADING:
            return {
                promoCouponList: state.promoCouponList,
                loading: true,
            };

        case PromoCouponActionTypes.PROMO_COUPON_LIST_SUCCESS:
            return {
                promoCouponList: action?.payload,
                loading: false,
            };
        case PromoCouponActionTypes.PROMO_COUPON_LIST_ERROR:
            return {
                promoCouponList: state.promoCouponList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end promo coupon list

// start promo coupon create
const PromoCouponCreate = (state = PROMO_COUPON_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PromoCouponActionTypes.PROMO_COUPON_CREATE_LOADING:
            return {
                loading: true,
            };

        case PromoCouponActionTypes.PROMO_COUPON_CREATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case PromoCouponActionTypes.PROMO_COUPON_CREATE_RESET:
            return PROMO_COUPON_CREATE_INITIAL_STATE
        case PromoCouponActionTypes.PROMO_COUPON_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end promo coupon create

// start promo coupon detail
const PromoCouponDetail = (state = PROMO_COUPON_DETAIL_INITIAL_STATE, action) => {
    switch (action.type) {
        case PromoCouponActionTypes.PROMO_COUPON_DETAIL_LOADING:
            return {
                promoCouponDetail: state.promoCouponDetail,
                loading: true,
            };

        case PromoCouponActionTypes.PROMO_COUPON_DETAIL_SUCCESS:
            return {
                promoCouponDetail: action?.payload,
                loading: false,
            };
        case PromoCouponActionTypes.PROMO_COUPON_DETAIL_RESET:
            return PROMO_COUPON_DETAIL_INITIAL_STATE
        case PromoCouponActionTypes.PROMO_COUPON_DETAIL_ERROR:
            return {
                promoCouponDetail: state.promoCouponDetail,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end promo coupon detail

// start promo coupon update
const PromoCouponUpadte = (state = PROMO_COUPON_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PromoCouponActionTypes.PROMO_COUPON_UPDATE_LOADING:
            return {
                loading: true,
            };

        case PromoCouponActionTypes.PROMO_COUPON_UPDATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case PromoCouponActionTypes.PROMO_COUPON_UPDATE_RESET:
            return PROMO_COUPON_UPDATE_INITIAL_STATE
        case PromoCouponActionTypes.PROMO_COUPON_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end promo coupon update

// start promo coupon delete
const PromoCouponDelete = (state = PROMO_COUPON_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PromoCouponActionTypes.PROMO_COUPON_DELETE_LOADING:
            return {
                loading: true,
            };

        case PromoCouponActionTypes.PROMO_COUPON_DELETE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case PromoCouponActionTypes.PROMO_COUPON_DELETE_RESET:
            return PROMO_COUPON_DELETE_INITIAL_STATE
        case PromoCouponActionTypes.PROMO_COUPON_DELETE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end promo coupon delete


export { PromoCouponList, PromoCouponCreate, PromoCouponDetail, PromoCouponUpadte, PromoCouponDelete };
