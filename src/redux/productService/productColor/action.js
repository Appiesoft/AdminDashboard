import ProductColorActionTypes from "../productColor/constant"

type AuthAction = { type: string, payload: {} | string };

// start color list 
export const colorList = (data): AuthAction => ({
    type: ProductColorActionTypes.GET_COLOR_LIST,
    payload: data
})

// start color create
export const colorCreate = (data): AuthAction => ({
    type: ProductColorActionTypes.CREATE_COLOR,
    payload: { ...data }

})

// start color update
export const colorUpdate = (data): AuthAction => ({
    type: ProductColorActionTypes.UPDATE_COLOR,
    payload: { ...data }
})


// start color delete
export const colorDeleteAction = (data): AuthAction => ({
    type: ProductColorActionTypes.DELETE_PRODUCT_COLOR,
    payload: data
})
