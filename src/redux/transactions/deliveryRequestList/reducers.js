import DeliveryRequestActionTypes from "./constant";

const DELIVERY_REQUEST_LIST_INITIAL_STATE = {
    deliveryRequestList: [],
    loading: false,
};
const DELIVERY_REQUEST_CREATE_INITIAL_STATE = {
    loading: false,
    message: "",
};


const DeliveryRequestList = (state = DELIVERY_REQUEST_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case DeliveryRequestActionTypes.DELIVERY_REQUEST_LIST_LOADING:
            return {
                deliveryRequestList: state.deliveryRequestList,
                loading: true,
            }

        case DeliveryRequestActionTypes.DELIVERY_REQUEST_LIST_SUCCESS:
            return {
                deliveryRequestList: action?.payload,
                loading: false,
            }
        case DeliveryRequestActionTypes.DELIVERY_REQUEST_LIST_SUCCESS:
            return {
                deliveryRequestList: state.deliveryRequestList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}

const DeliveryRequestCreate = (state = DELIVERY_REQUEST_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case DeliveryRequestActionTypes.DELIVERY_REQUEST_CREATE_LOADING:
            return {
                loading: true,
            }

        case DeliveryRequestActionTypes.DELIVERY_REQUEST_CREATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            }
        case DeliveryRequestActionTypes.DELIVERY_REQUEST_CREATE_RESET:
            return DELIVERY_REQUEST_CREATE_INITIAL_STATE;
        case DeliveryRequestActionTypes.DELIVERY_REQUEST_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            }
        default:
            return { ...state }
    };
}



export { DeliveryRequestList, DeliveryRequestCreate }
