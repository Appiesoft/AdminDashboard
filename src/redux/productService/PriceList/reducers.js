import ProductPriceActionTypes from '../PriceList/constant'
const PRICE_LIST_INITIAL_STATE = {
    priceList: [],
    loading: false,
};
const PRICE_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const PRICE_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const ITEM_LIST_INITIAL_STATE = {
    productItemList: [],
    loading: false,
};
const ITEM_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const ITEM_UPDATE_INITIAL_STATE = {
    loading: false,
    // message: "",
    // productItemUpdate:null
};

const ITEM_DELETE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const ITEM_DETAILS_INITIAL_STATE = {
    productItemDetails: null,
    loading: false,
};

//start price list
const PriceList = (state = PRICE_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductPriceActionTypes.PRICE_LIST_LOADING:
            return {
                PriceList: state.PriceList,
                loading: true,
            }

        case ProductPriceActionTypes.PRICE_LIST_SUCCESS:
            return {
                priceList: action.payload,
                loading: false,
            }
        case ProductPriceActionTypes.PRICE_LIST_ERROR:
            return {
                priceList: state.priceList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end price list

//start price create
const PriceCreate = (state = PRICE_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductPriceActionTypes.PRICE_CREATE_LOADING:
            return {
                loading: true,
            }

        case ProductPriceActionTypes.PRICE_CREATE_SUCESS:
            return {
                ...action.payload.data,
                loading: false,
            }
        case ProductPriceActionTypes.PRICE_CREATE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end price create

//start price update 
const PriceUpdate = (state = PRICE_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductPriceActionTypes.PRICE_UPDATE_LOADING:
            return {
                loading: true,
            }

        case ProductPriceActionTypes.PRICE_UPDATE_SUCESS:
            return {
                ...action.payload.data,
                loading: false,
            }
        case ProductPriceActionTypes.PRICE_UPDATE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end price update 


//start item list
const ProductItemList = (state = ITEM_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductPriceActionTypes.ITEM_LIST_LOADING:
            return {
                productItemList: {},
                loading: true,
            }

        case ProductPriceActionTypes.ITEM_LIST_SUCCESS:
            return {
                productItemList: action.payload,
                loading: false,
            }
        case ProductPriceActionTypes.ITEM_LIST_ERROR:
            return {
                productItemList: state.productItemList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end item list

//start item create
const ProductItemCreate = (state = ITEM_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductPriceActionTypes.ITEM_CREATE_LOADING:
            return {
                loading: true,
            }

        case ProductPriceActionTypes.ITEM_CREATE_SUCESS:
            return {
                ...action.payload.data,
                loading: false,
            }
        case ProductPriceActionTypes.ITEM_CREATE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end item create

//start item update 
const ProductItemUpdate = (state = ITEM_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductPriceActionTypes.ITEM_UPDATE_LOADING:
            return {
                loading: true,
            }

        case ProductPriceActionTypes.ITEM_UPDATE_SUCESS:
            return {
                ...action.payload,
                // message: action?.payload?.message,
                loading: false,
            }
        case ProductPriceActionTypes.ITEM_UPDATE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end Item update 


//start  product item delete 
const ProductItemDelete = (state = ITEM_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductPriceActionTypes.ITEM_DELETE_LOADING:
            return {
                loading: true,
            }

        case ProductPriceActionTypes.ITEM_DELETE_SUCESS:
            return {
                ...action.payload,
                loading: false,
            }
        case ProductPriceActionTypes.ITEM_DELETE_RESET:
            return ITEM_DELETE_INITIAL_STATE
        case ProductPriceActionTypes.ITEM_DELETE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end product item delete 


// start  product item  details
const ProductItemDetails = (state = ITEM_DETAILS_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductPriceActionTypes.ITEM_DETAILS_LOADING:
            return {
                productItemDetails: state.productItemDetails,
                loading: true,
            };

        case ProductPriceActionTypes.ITEM_DETAILS_SUCESS:
            return {
                productItemDetails: action.payload,
                loading: false,
            };
        // case ProductPriceActionTypes.ITEM_DETAILS_RESET:
        //     return ITEM_DETAILS_INITIAL_STATE
        case ProductPriceActionTypes.ITEM_DETAILS_ERROR:
            return { 
                productItemDetails: state.productItemDetails,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};


export { PriceList, PriceCreate, PriceUpdate, ProductItemList, ProductItemCreate, ProductItemUpdate, ProductItemDelete,ProductItemDetails }
