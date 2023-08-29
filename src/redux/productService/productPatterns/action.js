import ProductPatternsActionTypes from "../productPatterns/constant"

type AuthAction = { type: string, payload: {} | string };

// start brand list 
export const productPatternsList = ( data ): AuthAction => ({ 
    type: ProductPatternsActionTypes.GET_PRODUCT_PATTERNS_LIST,
    payload: data
})

// start brand create
export const productPatternsCreate = (data): AuthAction => ({
    type: ProductPatternsActionTypes.CREATE_PRODUCT_PATTERNS,
    payload: {...data}
    
}) 

// start brand update
export const productPatternsUpdate = (data): AuthAction => ({
    type: ProductPatternsActionTypes.UPDATE_PRODUCT_PATTERNS,
    payload: {...data}
})
 
// start brand delete
export const patternDelete = (data): AuthAction => ({
    type: ProductPatternsActionTypes.DELETE_PRODUCT_PATTERNS,
    payload: data
})
 
