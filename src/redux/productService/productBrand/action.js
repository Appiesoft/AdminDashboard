import ProductBrandActionTypes from "../productBrand/constant"

type AuthAction = { type: string, payload: {} | string };

// start brand list 
export const brandList = ( data ): AuthAction => ({ 
    type: ProductBrandActionTypes.GET_BRAND_LIST,
    payload: data
})

// start brand create
export const brandCreate = (data): AuthAction => ({
    type: ProductBrandActionTypes.CREATE_BRAND,
    payload: {...data}
    
}) 

// start brand update
export const brandUpdate = (data): AuthAction => ({
    type: ProductBrandActionTypes.UPDATE_BRAND,
    payload: {...data}
})
 
// start brand delete
export const brandDelete = (data): AuthAction => ({
    type: ProductBrandActionTypes.DELETE_BRAND,
    payload: data
})
 