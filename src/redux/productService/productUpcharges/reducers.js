import ProductUpchargesActionTypes from '../productUpcharges/constant'
const UPCHARGES_LIST_INITIAL_STATE = {
    upchargesList: [],
    loading: false,
};
const UPCHARGES_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const UPCHARGES_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const UPCHARGES_DELETE_INITIAL_STATE = {
    loading: false,
    message: ""
};

//start upcharges list
const UpchargesList = (state = UPCHARGES_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductUpchargesActionTypes.UPCHARGES_LIST_LOADING:
            return {
                upchargesList: state.upchargesList,
                loading: true,
            }

        case ProductUpchargesActionTypes.UPCHARGES_LIST_SUCCESS:
            return {
                upchargesList: action.payload.data,
                loading: false,
            }
        case ProductUpchargesActionTypes.UPCHARGES_LIST_ERROR:
            return {
                upchargesList: state.upchargesList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end upcharges list

//start upcharges create
const UpchargesCreate = (state = UPCHARGES_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductUpchargesActionTypes.UPCHARGES_CREATE_LOADING:
            return {
                loading: true,
            }

        case ProductUpchargesActionTypes.UPCHARGES_CREATE_SUCESS:
            return {
                ...action?.payload?.data,
                loading: false,
            }
        case ProductUpchargesActionTypes.UPCHARGES_CREATE_RESET:
            return UPCHARGES_CREATE_INITIAL_STATE
        case ProductUpchargesActionTypes.UPCHARGES_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            }
        default:
            return { ...state }
    };
}
//end upcharges create

//start upcharges update 
const UpchargesUpdate = (state = UPCHARGES_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductUpchargesActionTypes.UPCHARGES_UPDATE_LOADING:
            return {
                loading: true,
            }

        case ProductUpchargesActionTypes.UPCHARGES_UPDATE_SUCESS:
            return {
                ...action?.payload,
                loading: false,
            }
        case ProductUpchargesActionTypes.UPCHARGES_UPDATE_RESET:
            return UPCHARGES_UPDATE_INITIAL_STATE
        case ProductUpchargesActionTypes.UPCHARGES_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            }
        default:
            return { ...state }
    };
}
//end upcharges update 


//start pattern delete 
const UpchargesDelete = (state = UPCHARGES_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductUpchargesActionTypes.UPCHARGES_DELETE_LOADING:
            return {
                loading: true,
            }

        case ProductUpchargesActionTypes.UPCHARGES_DELETE_SUCESS:
            return {
                ...action.payload,
                loading: false,
            }
        case ProductUpchargesActionTypes.UPCHARGES_DELETE_RESET:
            return UPCHARGES_DELETE_INITIAL_STATE
        case ProductUpchargesActionTypes.UPCHARGES_DELETE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}

export { UpchargesList, UpchargesCreate, UpchargesUpdate, UpchargesDelete }
