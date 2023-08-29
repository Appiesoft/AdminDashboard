import ProductListActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start Product List
export const ProducttList = (data): AuthAction => ({
    type: ProductListActionTypes.GET_PRODUCT_LIST,
    payload: data
})

