import CostomerActionTypes from './constant';

const COSTOMER_LIST_INITIAL_STATE = {
    costomerList: [],
    loading: false,
};

const CUSTOMER_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const CUSTOMER_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const CUSTOMER_DELETE_INITIAL_STATE = {
    loading: false,
    message: ""
};


// start costomer list
const CostomerList = (state = COSTOMER_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case CostomerActionTypes.COSTOMER_LIST_LOADING:
            return {
                costomerList: state.costomerList,
                loading: true,
            };

        case CostomerActionTypes.COSTOMER_LIST_SUCCESS:
            return {
                costomerList: action?.payload,
                loading: false,
            };
        case CostomerActionTypes.COSTOMER_LIST_ERROR:
            return {
                costomerList: state.costomerList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end costomer list

// start customer create
const CustomerCreate = (state = CUSTOMER_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case CostomerActionTypes.CUSTOMER_CREATE_LOADING:
            return {
                loading: true,
            };

        case CostomerActionTypes.CUSTOMER_CREATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case CostomerActionTypes.CUSTOMER_CREATE_RESET:
            return CUSTOMER_CREATE_INITIAL_STATE
        case CostomerActionTypes.CUSTOMER_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};

// start customer update
const CustomerUpdate = (state = CUSTOMER_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case CostomerActionTypes.CUSTOMER_UPDATE_LOADING:
            return {
                loading: true,
            };

        case CostomerActionTypes.CUSTOMER_UPDATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case CostomerActionTypes.CUSTOMER_UPDATE_RESET:
            return CUSTOMER_UPDATE_INITIAL_STATE
        case CostomerActionTypes.CUSTOMER_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};

// start customer delete
const CustomerDelete = (state = CUSTOMER_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case CostomerActionTypes.CUSTOMER_DELETE_LOADING:
            return {
                loading: true,
            };

        case CostomerActionTypes.CUSTOMER_DELETE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case CostomerActionTypes.CUSTOMER_DELETE_RESET:
            return CUSTOMER_DELETE_INITIAL_STATE
        case CostomerActionTypes.CUSTOMER_DELETE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end customer delete



export { CostomerList, CustomerCreate, CustomerDelete, CustomerUpdate };
