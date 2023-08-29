import DoordeshSettingActionTypes from "./constant";

type AuthAction = { type: string, payload: {} | string };

// start app list
export const doordeshSettingList = (): AuthAction => ({
    type: DoordeshSettingActionTypes.GET_DOORDESH_SETTING_LIST,
    payload: undefined
})

// start app update
export const doordeshSettingUpdate = (data): AuthAction => ({
    type: DoordeshSettingActionTypes.DOORDESH_SETTING_UPDATE,
    payload: data
})


