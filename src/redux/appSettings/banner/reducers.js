import BannerListActionTypes from "./constant";

const BANNER_LIST_INITIAL_STATE = {
    bannerList: [],
    loading: false,
};

const BANNER_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const BANNER_DETAIL_INITIAL_STATE = {
    bannerDetail: {},
    loading: false,
};

const BANNER_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const BANNER_DELETE_INITIAL_STATE = {
    loading: false,
    message: ""
};


// start banner list
const BannerList = (state = BANNER_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case BannerListActionTypes.BANNER_LIST_LOADING:
            return {
                bannerList: state.bannerList,
                loading: true,
            };

        case BannerListActionTypes.BANNER_LIST_SUCCESS:
            return {
                bannerList: action?.payload,
                loading: false,
            };
        case BannerListActionTypes.BANNER_LIST_ERROR:
            return {
                bannerList: state.bannerList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end banner list

// start banner create
const BannerCreate = (state = BANNER_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case BannerListActionTypes.BANNER_CREATE_LOADING:
            return {
                loading: true,
            };

        case BannerListActionTypes.BANNER_CREATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case BannerListActionTypes.BANNER_CREATE_RESET:
            return BANNER_CREATE_INITIAL_STATE
        case BannerListActionTypes.BANNER_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end banner create

// start banner detail
const BannerDetail = (state = BANNER_DETAIL_INITIAL_STATE, action) => {
    switch (action.type) {
        case BannerListActionTypes.BANNER_DETAIL_LOADING:
            return {
                bannerDetail: state?.bannerDetail,
                loading: true,
            };

        case BannerListActionTypes.BANNER_DETAIL_SUCCESS:
            return {
                bannerDetail: action?.payload,
                loading: false,
            };
        case BannerListActionTypes.BANNER_DETAIL_RESET:
            return BANNER_DETAIL_INITIAL_STATE
        case BannerListActionTypes.BANNER_DETAIL_ERROR:
            return {
                bannerDetail: state?.bannerDetail,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end banner detail

// start banner update
const BannerUpdate = (state = BANNER_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case BannerListActionTypes.BANNER_UPDATE_LOADING:
            return {
                loading: true,
            };

        case BannerListActionTypes.BANNER_UPDATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case BannerListActionTypes.BANNER_UPDATE_RESET:
            return BANNER_UPDATE_INITIAL_STATE
        case BannerListActionTypes.BANNER_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end banner update

// start banner delete
const BannerDelete = (state = BANNER_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case BannerListActionTypes.BANNER_DELETE_LOADING:
            return {
                loading: true,
            };

        case BannerListActionTypes.BANNER_DELETE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case BannerListActionTypes.BANNER_DELETE_RESET:
            return BANNER_DELETE_INITIAL_STATE
        case BannerListActionTypes.BANNER_DELETE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end banner delete



export { BannerList, BannerCreate, BannerDetail, BannerUpdate, BannerDelete };
