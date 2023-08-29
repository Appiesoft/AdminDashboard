import ServiceCategoryActionTypes from "../serviceCategory/constant"

type AuthAction = { type: string, payload: {} | string };


// start service Category  list 
export const serviceCategoryList = (data): AuthAction => ({
    type: ServiceCategoryActionTypes.GET_SERVICE_CATEGORY_LIST,
    payload: data
})

// start service Category Create 
export const serviceCategoryCreate = (data): AuthAction => ({
    type: ServiceCategoryActionTypes.CREATE_SERVICE_CATEGORY,
    payload: { ...data }

})

// start employee update
export const serviceCategoryUpdate = (data): AuthAction => ({
    type: ServiceCategoryActionTypes.UPDATE_SERVICE_CATEGORY,
    payload: { ...data }
})

// start brand delete
export const serviceCategoryDelete = (data): AuthAction => ({
    type: ServiceCategoryActionTypes.DELETE_SERVICE_CATEGORY,
    payload: data
})

