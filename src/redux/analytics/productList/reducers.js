import ProductListActionTypes from './constant';
const PRODUCT_LIST_INITIAL_STATE = {
    productList: [],
    loading: false,
};

// start product List
const ProductList = (state = PRODUCT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductListActionTypes.PRODUCT_LIST_LOADING:
            return {
                productList: state.productList,
                loading: true,
            };
        case ProductListActionTypes.PRODUCT_LIST_SUCCESS:
            return {
                productList: action?.payload,
                loading: false,
            };
        case ProductListActionTypes.PRODUCT_LIST_RESET:
            return PRODUCT_LIST_INITIAL_STATE;
        case ProductListActionTypes.PRODUCT_LIST_ERROR:
            return {
                productList: action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end product List

export { ProductList };
