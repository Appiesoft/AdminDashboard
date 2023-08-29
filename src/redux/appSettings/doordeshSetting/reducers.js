import DoordeshSettingActionTypes from "./constant";

const DOORDASH_SETTING_LIST_INITIAL_STATE = {
    doordashSettingList: {},
    loading: false,
};

const DOORDASH_SETTING_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

// start doordash settinglist
const DoordashSettingList = (state = DOORDASH_SETTING_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case DoordeshSettingActionTypes.DOORDESH_SETTING_LIST_LOADING:
            return {
                doordashSettingList: state.doordashSettingList,
                loading: true,
            };

        case DoordeshSettingActionTypes.DOORDESH_SETTING_LIST_SUCCESS:
            return {
                doordashSettingList: action?.payload,
                loading: false,
            };
        case DoordeshSettingActionTypes.DOORDESH_SETTING_LIST_ERROR:
            return {
                doordashSettingList: state.doordashSettingList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end doordash setting list

// start doordash setting update
const DoordashSettingUpdate = (state = DOORDASH_SETTING_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case DoordeshSettingActionTypes.DOORDESH_SETTING_UPDATE_LOADING:
            return {
                loading: true,
            };

        case DoordeshSettingActionTypes.DOORDESH_SETTING_UPDATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case DoordeshSettingActionTypes.DOORDESH_SETTING_UPDATE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message,
            };
        case DoordeshSettingActionTypes.DOORDESH_SETTING_UPDATE_RESET:
            return DOORDASH_SETTING_UPDATE_INITIAL_STATE;
        default:
            return { ...state };
    }
};
// end doordash setting update



export { DoordashSettingList, DoordashSettingUpdate };
