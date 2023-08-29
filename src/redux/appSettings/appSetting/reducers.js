import AppSettingActionTypes from "./constant";

const APP_SETTING_LIST_INITIAL_STATE = {
    appSettingList: {},
    loading: false,
};

const APP_SETTING_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

// start app settinglist
const AppSettingList = (state = APP_SETTING_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case AppSettingActionTypes.APP_SETTING_LIST_LOADING:
            return {
                appSettingList: state.appSettingList,
                loading: true,
            };

        case AppSettingActionTypes.APP_SETTING_LIST_SUCCESS:
            return {
                appSettingList: action.payload,
                loading: false,
            };
        case AppSettingActionTypes.APP_SETTING_LIST_ERROR:
            return {
                appSettingList: state.appSettingList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end app setting list

// start app setting update
const AppSettingUpdate = (state = APP_SETTING_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case AppSettingActionTypes.APP_SETTING_UPDATE_LOADING:
            return {
                loading: true,
            };

        case AppSettingActionTypes.APP_SETTING_UPDATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case AppSettingActionTypes.APP_SETTING_UPDATE_RESET:
            return APP_SETTING_UPDATE_INITIAL_STATE
        case AppSettingActionTypes.APP_SETTING_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end app setting update



export { AppSettingList, AppSettingUpdate };
