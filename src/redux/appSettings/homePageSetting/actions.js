import HomePageSettingActionTypes from "./constant";
type AuthAction = { type: string, payload: {} | string };

// start home page setting list
export const homePageSettingList = (): AuthAction => ({
    type: HomePageSettingActionTypes.GET_HOME_PAGE_SETTING_LIST,
    payload: undefined
})

// start home page setting update
export const homePageSettingUpdate = (data): AuthAction => ({
    type: HomePageSettingActionTypes.HOME_PAGE_SETTING_UPDATE,
    payload: data
})


