import BannerListActionTypes from "./constant";

type AuthAction = { type: string, payload: {} | string };

// start app list
export const bannerList = (data): AuthAction => ({
    type: BannerListActionTypes.GET_BANNER_LIST,
    payload: data
})

// start app list
export const bannerCreate = (data): AuthAction => ({
    type: BannerListActionTypes.BANNER_CREATE,
    payload: data
})


// start app detail
export const bannerDetail = (data): AuthAction => ({
    type: BannerListActionTypes.BANNER_DETAIL,
    payload: data
})

// start app update
export const bannerUpdate = (data): AuthAction => ({
    type: BannerListActionTypes.BANNER_UPDATE,
    payload: data
})

// start app delete
export const bannersDelete = (data): AuthAction => ({
    type: BannerListActionTypes.BANNER_DELETE,
    payload: data
})


