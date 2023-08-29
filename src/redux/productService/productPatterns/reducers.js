import ProductPatternsActionTypes from '../productPatterns/constant'
const PRODUCT_PATTERNS_LIST_INITIAL_STATE = {
    productPatternsList: [],
    loading: false,
};
const PRODUCT_PATTERNS_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const PRODUCT_PATTERNS_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const PRODUCT_PATTERNS_DELETE_INITIAL_STATE = {
    loading: false,
    message: ""
};
//start product patterns list
const ProductPatternsList = (state = PRODUCT_PATTERNS_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductPatternsActionTypes.PRODUCT_PATTERNS_LIST_LOADING:
            return {
                productPatternsList: state.productPatternsList,
                loading: true,
            }

        case ProductPatternsActionTypes.PRODUCT_PATTERNS_LIST_SUCCESS:
            return {
                productPatternsList: action.payload,
                loading: false,
            }
        case ProductPatternsActionTypes.PRODUCT_PATTERNS_LIST_ERROR:
            return {
                productPatternsList: state.productPatternsList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end  product patterns list

//start  product patterns create
const ProductPatternsCreate = (state = PRODUCT_PATTERNS_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductPatternsActionTypes.PRODUCT_PATTERNS_CREATE_LOADING:
            return {
                loading: true,
            }

        case ProductPatternsActionTypes.PRODUCT_PATTERNS_CREATE_SUCESS:
            return {
                ...action?.payload?.data,
                loading: false,
            }
        case ProductPatternsActionTypes.PRODUCT_PATTERNS_CREATE_RESET:
            return PRODUCT_PATTERNS_CREATE_INITIAL_STATE
        case ProductPatternsActionTypes.PRODUCT_PATTERNS_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            }
        default:
            return { ...state }
    };
}
//end  product patterns create

//start  product patterns update 
const ProductPatternsUpdate = (state = PRODUCT_PATTERNS_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductPatternsActionTypes.PRODUCT_PATTERNS_UPDATE_LOADING:
            return {
                loading: true,
            }

        case ProductPatternsActionTypes.PRODUCT_PATTERNS_UPDATE_SUCESS:
            return {
                ...action?.payload,
                loading: false,
            }
        case ProductPatternsActionTypes.PRODUCT_PATTERNS_UPDATE_RESET:
            return PRODUCT_PATTERNS_UPDATE_INITIAL_STATE
        case ProductPatternsActionTypes.PRODUCT_PATTERNS_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            }
        default:
            return { ...state }
    };
}
//end  product patterns update 

//start pattern delete 
const ProductPatternsDelete = (state = PRODUCT_PATTERNS_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductPatternsActionTypes.PRODUCT_PATTERNS_DELETE_LOADING:
            return {
                loading: true,
            }

        case ProductPatternsActionTypes.PRODUCT_PATTERNS_DELETE_SUCESS:
            return {
                ...action.payload,
                loading: false,
            }
        case ProductPatternsActionTypes.PRODUCT_PATTERNS_DELETE_RESET:
            return PRODUCT_PATTERNS_DELETE_INITIAL_STATE
        case ProductPatternsActionTypes.PRODUCT_PATTERNS_DELETE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end brand delete 

export { ProductPatternsList, ProductPatternsCreate, ProductPatternsUpdate, ProductPatternsDelete }
