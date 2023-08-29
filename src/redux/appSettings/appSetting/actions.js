import AppSettingActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start app list
export const appSettingList = (): AuthAction => ({
    type: AppSettingActionTypes.GET_APP_SETTING_LIST,
    payload: undefined
})


// start app update
export const appSettingUpdate = (data): AuthAction => ({
    type: AppSettingActionTypes.APP_SETTING_UPDATE,
    payload: data
})


