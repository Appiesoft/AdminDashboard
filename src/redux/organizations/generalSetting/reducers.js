import GeneralSettingActionTypes from "./constant";

const GENERAL_SETTING_INITIAL_STATE = {
    generalSettings: {},
    loading: false,
};

const GENERAL_SETTING_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const GeneralSetting = (state = GENERAL_SETTING_INITIAL_STATE, action) => {
    switch (action.type) {
        case GeneralSettingActionTypes.GENERAL_SETTING_LOADING:
            return {
                generalSettings: state.generalSettings,
                loading: true,
            };

        case GeneralSettingActionTypes.GENERAL_SETTING_SUCCESS:
            return {
                generalSettings: action.payload.data,
                loading: false,
            };

        case GeneralSettingActionTypes.GENERAL_SETTING_ERROR:
            return {
                generalSettings: state.generalSettings,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};

const GeneralSettingUpdate = (state = GENERAL_SETTING_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case GeneralSettingActionTypes.GENERAL_SETTING_UPDATE_LOADING:
            return {
                loading: true,
            };

        case GeneralSettingActionTypes.GENERAL_SETTING_UPDATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case GeneralSettingActionTypes.GENERAL_SETTING_UPDATE_RESET:
            return GENERAL_SETTING_UPDATE_INITIAL_STATE
        case GeneralSettingActionTypes.GENERAL_SETTING_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};


export { GeneralSetting, GeneralSettingUpdate };
