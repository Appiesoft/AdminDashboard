import ProductListActionTypes from './constant';

type AuthAction = { type: string, payload: {} | string };

export const productsLists = (data): AuthAction => ({
    type: ProductListActionTypes.GET_PRODUCT_LIST,
    payload: data,
});
