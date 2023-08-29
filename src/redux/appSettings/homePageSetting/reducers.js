import HomePageSettingActionTypes from "./constant";

const HOME_PAGE_SETTING_LIST_INITIAL_STATE = {
    homePageSettingList: {},
    loading: false,
};

const HOME_PAGE_SETTING_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};


// start home page setting list
const HomePageSettingList = (state = HOME_PAGE_SETTING_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case HomePageSettingActionTypes.HOME_PAGE_SETTING_LIST_LOADING:
            return {
                homePageSettingList: state?.homePageSettingList,
                loading: true,
            };

        case HomePageSettingActionTypes.HOME_PAGE_SETTING_LIST_SUCCESS:
            return {
                homePageSettingList: action?.payload,
                loading: false,
            };
        case HomePageSettingActionTypes.HOME_PAGE_SETTING_LIST_ERROR:
            return {
                homePageSettingList: state.homePageSettingList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end home page setting

// start home page setting update
const HomePageSettingUpadte = (state = HOME_PAGE_SETTING_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case HomePageSettingActionTypes.HOME_PAGE_SETTING_UPDATE_LOADING:
            return {
                loading: true,
            };

        case HomePageSettingActionTypes.HOME_PAGE_SETTING_UPDATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case HomePageSettingActionTypes.HOME_PAGE_SETTING_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end home page setting update



export { HomePageSettingList, HomePageSettingUpadte };
