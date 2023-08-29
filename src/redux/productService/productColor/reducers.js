import ProductColorActionTypes from '../productColor/constant'
const COLOR_LIST_INITIAL_STATE = {
    colorList: [],
    loading: false,
};
const COLOR_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const COLOR_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const COLOR_DELETE_INITIAL_STATE = {
    loading: false,
    message: ""
};

//start color list
const ProductColorList = (state = COLOR_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductColorActionTypes.COLOR_LIST_LOADING:
            return {
                colorList: state.colorList,
                loading: true,
            }

        case ProductColorActionTypes.COLOR_LIST_SUCCESS:
            return {
                colorList: action.payload,
                loading: false,
            }
        case ProductColorActionTypes.COLOR_LIST_ERROR:
            return {
                colorList: state.colorList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end color list

//start color create
const ProductColorCreate = (state = COLOR_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductColorActionTypes.COLOR_CREATE_LOADING:
            return {
                loading: true,
            }

        case ProductColorActionTypes.COLOR_CREATE_SUCESS:
            return {
                ...action.payload.data,
                loading: false,
            }
        case ProductColorActionTypes.COLOR_CREATE_RESET:
            return COLOR_CREATE_INITIAL_STATE
        case ProductColorActionTypes.COLOR_CREATE_ERROR:
            return {
                ...action.payload,
                loading: false,
            }
        default:
            return { ...state }
    };
}
//end color create

//start color update 
const ProductColorUpdate = (state = COLOR_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductColorActionTypes.COLOR_UPDATE_LOADING:
            return {
                loading: true,
            }

        case ProductColorActionTypes.COLOR_UPDATE_SUCESS:
            return {
                ...action?.payload,
                loading: false,
            }
        case ProductColorActionTypes.COLOR_UPDATE_RESET:
            return COLOR_UPDATE_INITIAL_STATE
        case ProductColorActionTypes.COLOR_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,

            }
        default:
            return { ...state }
    };
}
//end color update 


//start Color delete 
const ProductColorDelete = (state = COLOR_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductColorActionTypes.COLOR_DELETE_LOADING:
            return {
                loading: true,
            }

        case ProductColorActionTypes.COLOR_DELETE_SUCESS:
            return {
                ...action.payload,
                loading: false,
            }
        case ProductColorActionTypes.COLOR_DELETE_RESET:
            return COLOR_DELETE_INITIAL_STATE
        case ProductColorActionTypes.COLOR_DELETE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end Color delete 

export { ProductColorList, ProductColorCreate, ProductColorUpdate, ProductColorDelete }
