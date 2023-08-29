import ProductPriceActionTypes from "../PriceList/constant"

type AuthAction = { type: string, payload: {} | string };

// start price list  
export const priceList = ( data ): AuthAction => ({ 
    type: ProductPriceActionTypes.GET_PRICE_LIST,
    payload: data
})

// start price create
export const priceCreate = (data): AuthAction => ({
    type: ProductPriceActionTypes.CREATE_PRICE,
    payload: {...data}
    
}) 

// start price update
export const priceUpdate = (data): AuthAction => ({
    type: ProductPriceActionTypes.UPDATE_PRICE,
    payload: {...data}
})
 

// start item list  
export const itemList = ( data ): AuthAction => ({ 
    type: ProductPriceActionTypes.GET_ITEM_LIST,
    payload: data
})

// start item create
export const itemCreate = (data): AuthAction => ({
    type: ProductPriceActionTypes.CREATE_ITEM,
    payload: {...data}
    
}) 

// start itme update
export const itemUpdate = (data): AuthAction => ({
    type: ProductPriceActionTypes.UPDATE_ITEM,
    payload: {...data}
})


// start item delete
export const itemDelete = (data): AuthAction => ({
    type: ProductPriceActionTypes.DELETE_ITEM,
    payload: data
})
 

// start item details
export const itemDetails = (data): AuthAction => ({
    type: ProductPriceActionTypes.DETAILS_ITEM,
    payload: { ...data }
})