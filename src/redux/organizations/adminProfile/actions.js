import AdminProfileActionTypes from "./constant";


type AuthAction = { type: string, payload: {} | string };

export const adminProfile = (): AuthAction => ({
    type: AdminProfileActionTypes.GET_ADMIN_PROFILE,
    payload: undefined
})

export const adminProfileUpdate = (data): AuthAction => ({
    type: AdminProfileActionTypes.ADMIN_PROFILE_UPDATE,
    payload: data
})


