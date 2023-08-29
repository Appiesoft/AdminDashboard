import WalletPromoActionTypes from "./constant";

const WALLET_PROMO_LIST_INITIAL_STATE = {
    walletPromoList: [],
    loading: false,
};

const WALLET_PROMO_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};
const WALLET_PROMO_DETAIL_INITIAL_STATE = {
    walletPromoDetail: {},
    loading: false,
};
const WALLET_PROMO_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const WALLET_PROMO_DELETE_INITIAL_STATE = {
    loading: false,
    message: ""
};

// start wallet promo list
const WalletPromoList = (state = WALLET_PROMO_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case WalletPromoActionTypes.WALLET_PROMO_LIST_LOADING:
            return {
                walletPromoList: state.walletPromoList,
                loading: true,
            };

        case WalletPromoActionTypes.WALLET_PROMO_LIST_SUCCESS:
            return {
                walletPromoList: action?.payload,
                loading: false,
            };
        case WalletPromoActionTypes.WALLET_PROMO_LIST_ERROR:
            return {
                walletPromoList: state.walletPromoList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end wallet promo list

// start wallet promo create
const WalletPromoCreate = (state = WALLET_PROMO_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case WalletPromoActionTypes.WALLET_PROMO_CREATE_LOADING:
            return {
                loading: true,
            };

        case WalletPromoActionTypes.WALLET_PROMO_CREATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case WalletPromoActionTypes.WALLET_PROMO_CREATE_RESET:
            return WALLET_PROMO_CREATE_INITIAL_STATE
        case WalletPromoActionTypes.WALLET_PROMO_CREATE_ERROR:
            return {
                loading: false,
                ...action?.payload,
            };
        default:
            return { ...state };
    }
};
// end wallet promo create

// start wallet promo detail
const WalletPromoDetail = (state = WALLET_PROMO_DETAIL_INITIAL_STATE, action) => {
    switch (action.type) {
        case WalletPromoActionTypes.WALLET_PROMO_DETAIL_LOADING:
            return {
                walletPromoDetail: state.walletPromoDetail,
                loading: true,
            };

        case WalletPromoActionTypes.WALLET_PROMO_DETAIL_SUCCESS:
            return {
                walletPromoDetail: action?.payload,
                loading: false,
            };
        case WalletPromoActionTypes.WALLET_PROMO_DETAIL_RESET:
            return WALLET_PROMO_DETAIL_INITIAL_STATE
        case WalletPromoActionTypes.WALLET_PROMO_DETAIL_ERROR:
            return {
                walletPromoDetail: state.walletPromoDetail,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end wallet promo create

// start wallet promo update
const WalletPromoUpdate = (state = WALLET_PROMO_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case WalletPromoActionTypes.WALLET_PROMO_UPDATE_LOADING:
            return {
                loading: true,
            };

        case WalletPromoActionTypes.WALLET_PROMO_UPDATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case WalletPromoActionTypes.WALLET_PROMO_UPDATE_RESET:
            return WALLET_PROMO_UPDATE_INITIAL_STATE
        case WalletPromoActionTypes.WALLET_PROMO_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end wallet promo update

// start wallet promo delete
const WalletPromoDelete = (state = WALLET_PROMO_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case WalletPromoActionTypes.WALLET_PROMO_DELETE_LOADING:
            return {
                loading: true,
            };

        case WalletPromoActionTypes.WALLET_PROMO_DELETE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case WalletPromoActionTypes.WALLET_PROMO_DELETE_RESET:
            return WALLET_PROMO_DELETE_INITIAL_STATE
        case WalletPromoActionTypes.WALLET_PROMO_DELETE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end wallet promo delete


export { WalletPromoList, WalletPromoCreate, WalletPromoDetail, WalletPromoUpdate, WalletPromoDelete };
