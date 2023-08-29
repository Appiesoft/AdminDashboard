import GeneralSettingActionTypes from "./constant";

type AuthAction = { type: string, payload: {} | string };

export const generalSetting = (): AuthAction => ({
    type: GeneralSettingActionTypes.GET_GENERAL_SETTING,
    payload: undefined
})


export const generalSettingUpdate = (data): AuthAction => ({
    type: GeneralSettingActionTypes.GENERAL_SETTING_UPDATE,
    payload: { ...data }
})


