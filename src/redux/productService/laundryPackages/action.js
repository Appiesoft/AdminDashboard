import LaundryPackagesActionTypes from "../laundryPackages/constant"

type AuthAction = { type: string, payload: {} | string };

// start laundryPackages list 
export const laundryPackagesList = ( data ): AuthAction => ({ 
    type: LaundryPackagesActionTypes.GET_LAUNDRY_PACKAGES_LIST,
    payload: data
})

// start laundryPackages create
export const laundryPackagesCreate = (data): AuthAction => ({
    type: LaundryPackagesActionTypes.CREATE_LAUNDRY_PACKAGES,
    payload: {...data}
    
}) 

// start laundryPackages update
export const laundryPackagesUpdate = (data): AuthAction => ({
    type: LaundryPackagesActionTypes.UPDATE_LAUNDRY_PACKAGES,
    payload: {...data}
})
 
// start laundry package delete
export const laundryPackageDelete = (data): AuthAction => ({
    type: LaundryPackagesActionTypes.DELETE_LAUNDRY_PACKAGES,
    payload: data
})
 
