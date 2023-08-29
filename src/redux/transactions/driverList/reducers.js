import DriverActionTypes from "./constant";
const DRIVER_LIST_INITIAL_STATE = {
    driverList: [],
    loading: false,
};


const DriverList = (state = DRIVER_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case DriverActionTypes.DRIVER_LIST_LOADING:
            return {
                driverList: state.driverList,
                loading: true,
            }

        case DriverActionTypes.DRIVER_LIST_SUCCESS:
            return {
                driverList: action.payload,
                loading: false,
            }
        case DriverActionTypes.DRIVER_LIST_ERROR:
            return {
                driverList: state.driverList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}



export { DriverList }
