import ProductCategoryActionTypes from "../productCategory/constant"

type AuthAction = { type: string, payload: {} | string };

// start category list 
export const categoryList = ( data ): AuthAction => ({ 
    type: ProductCategoryActionTypes.GET_CATEGORY_LIST,
    payload: data
})

// start category create
export const categoryCreate = (data): AuthAction => ({
    type: ProductCategoryActionTypes.CREATE_CATEGORY,
    payload: {...data}
    
})

// start category update
export const categoryUpdate = (data): AuthAction => ({
    type: ProductCategoryActionTypes.UPDATE_CATEGORY,
    payload: {...data}
})
 
// start category delete
export const  categoryDelete = (data): AuthAction => ({
    type: ProductCategoryActionTypes.DELETE_CATEGORY,
    payload: data
})
 