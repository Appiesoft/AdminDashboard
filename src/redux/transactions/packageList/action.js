import PackageActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start employee list 
export const packageList = (data): AuthAction => ({
    type: PackageActionTypes.GET_PACKAGE_LIST,
    payload: data
})

// start employee create
export const packageCreate = (): AuthAction => ({
    type: PackageActionTypes.CREATE_PACKAGE,
    payload: {}
})

// start employee update
export const packageUpdate = (): AuthAction => ({
    type: PackageActionTypes.UPDATE_PACKAGE,
    payload: {}
})

// start employee details
export const packageDetails = (): AuthAction => ({
    type: PackageActionTypes.DETAILS_PACKAGE,
    payload: {}
})
