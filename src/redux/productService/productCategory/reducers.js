import ProductCategoryActionTypes from '../productCategory/constant'
const CATEGORY_LIST_INITIAL_STATE = {
    categoryList: [],
    loading: false,
};
const CATEGORY_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const CATEGORY_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const CATEGORY_DELETE_INITIAL_STATE = {
    loading: false,
    message: ""
};
//start category list
const ProductCategoryList = (state = CATEGORY_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductCategoryActionTypes.CATEGORY_LIST_LOADING:
            return {
                categoryList: state.categoryList,
                loading: true,
            }

        case ProductCategoryActionTypes.CATEGORY_LIST_SUCCESS:
            return {
                categoryList: action.payload,
                loading: false,
            }
        case ProductCategoryActionTypes.CATEGORY_LIST_ERROR:
            return {
                categoryList: state.categoryList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end category list

//start category create
const ProductCategoryCreate = (state = CATEGORY_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductCategoryActionTypes.CATEGORY_CREATE_LOADING:
            return {
                loading: true,
            }

        case ProductCategoryActionTypes.CATEGORY_CREATE_SUCESS:
            return {
                ...action?.payload,
                loading: false,
            }
        case ProductCategoryActionTypes.CATEGORY_CREATE_RESET:
            return CATEGORY_CREATE_INITIAL_STATE;
        case ProductCategoryActionTypes.CATEGORY_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            }
        default:
            return { ...state }
    };
}
//end category create

//start category update 
const ProductCategoryUpdate = (state = CATEGORY_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductCategoryActionTypes.CATEGORY_UPDATE_LOADING:
            return {
                loading: true,
            }

        case ProductCategoryActionTypes.CATEGORY_UPDATE_SUCESS:
            return {
                ...action?.payload,
                loading: false,
            }
        case ProductCategoryActionTypes.CATEGORY_UPDATE_RESET:
            return CATEGORY_CREATE_INITIAL_STATE;
        case ProductCategoryActionTypes.CATEGORY_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            }
        default:
            return { ...state }
    };
}
//end category update 

//start Product Category delete 
const ProductCategoryDelete = (state = CATEGORY_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductCategoryActionTypes.CATEGORY_DELETE_LOADING:
            return {
                loading: true,
            }

        case ProductCategoryActionTypes.CATEGORY_DELETE_SUCESS:
            return {
                ...action.payload,
                loading: false,
            }
        case ProductCategoryActionTypes.CATEGORY_DELETE_RESET:
            return CATEGORY_DELETE_INITIAL_STATE
        case ProductCategoryActionTypes.CATEGORY_DELETE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end Product Category delete

export { ProductCategoryList, ProductCategoryCreate, ProductCategoryUpdate, ProductCategoryDelete }
