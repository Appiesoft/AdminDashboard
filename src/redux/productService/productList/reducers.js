import ProductListActionTypes from './constant';

const PRODUCT_LIST_INITIAL_STATE = {
    productList: [],
    loading: false,
};

const ProductLists = (state = PRODUCT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductListActionTypes.PRODUCT_LIST_LOADING:
            return {
                productList: state.productList,
                loading: true,
            };

        case ProductListActionTypes.PRODUCT_LIST_SUCCESS:
            return {
                productList: action.payload,
                loading: false,
            };
        case ProductListActionTypes.PRODUCT_LIST_ERROR:
            return {
                productList: state.productList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};

export { ProductLists };
