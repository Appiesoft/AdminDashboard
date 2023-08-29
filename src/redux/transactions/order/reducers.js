import OrderActionTypes from './constant'

const ORDER_LIST_INITIAL_STATE = {
    orderList: [],
    loading: false,
};
const ORDER_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const OrderList = (state = ORDER_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case OrderActionTypes.ORDER_LIST_LOADING:
            return {
                orderList: state.orderList,
                loading: true,
            }

        case OrderActionTypes.ORDER_LIST_SUCCESS:
            return {
                orderList: action.payload,
                loading: false,
            }
        case OrderActionTypes.ORDER_LIST_ERROR:
            return {
                orderList: state.orderList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}

const OrderCreate = (state = ORDER_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case OrderActionTypes.ORDER_CREATE_LOADING:
            return {
                loading: true,
            }

        case OrderActionTypes.ORDER_CREATE_SUCESS:
            return {
                ...action.payload.data,
                loading: false,
            }
        case OrderActionTypes.ORDER_CREATE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}

export { OrderList, OrderCreate }
