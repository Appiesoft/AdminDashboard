import assignedPackageListActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start employee list 
export const assignedPackageList = (data): AuthAction => ({
    type: assignedPackageListActionTypes.GET_ASSIGNED_PACKAGE_LIST,
    payload: data
})

// start employee create
export const assignedPackageCreate = (data): AuthAction => ({
    type: assignedPackageListActionTypes.CREATE_ASSIGNED_PACKAGE,
    payload: { ...data }
})

// start employee delete
export const assignedPackageDelete = (data): AuthAction => ({
    type: assignedPackageListActionTypes.DELETE_ASSIGNED_PACKAGE,
    payload: { ...data }
})
