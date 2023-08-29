import PickupRequestActionTypes from "./constant";

const PICKUP_REQUEST_LIST_INITIAL_STATE = {
    pickupRequestList: [],
    loading: false,
};

const PICKUP_REQUEST_CREATE_INITIAL_STATE = {
    loading: false,
    message: "",
};


const PickupRequestList = (state = PICKUP_REQUEST_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case PickupRequestActionTypes.PICKUP_REQUEST_LIST_LOADING:
            return {
                pickupRequestList: state.pickupRequestList,
                loading: true,
            }

        case PickupRequestActionTypes.PICKUP_REQUEST_LIST_SUCCESS:
            return {
                pickupRequestList: action.payload,
                loading: false,
            }
        case PickupRequestActionTypes.PICKUP_REQUEST_LIST_ERROR:
            return {
                pickupRequestList: state.pickupRequestList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}

const PickupRequestCreate = (state = PICKUP_REQUEST_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case PickupRequestActionTypes.PICKUP_REQUEST_CREATE_LOADING:
            return {
                loading: true,
            }

        case PickupRequestActionTypes.PICKUP_REQUEST_CREATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            }
            case PickupRequestActionTypes.PICKUP_REQUEST_CREATE_RESET:
            return PICKUP_REQUEST_CREATE_INITIAL_STATE;
        case PickupRequestActionTypes.PICKUP_REQUEST_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            }
        default:
            return { ...state }
    };
}



export { PickupRequestList, PickupRequestCreate }
