import CustomerDetailTypes from "./constant";

const CUSTOMER_DETAIL_INITIAL_STATE = {
    customerDetail: {},
    loading: false,
};


// start customer details
const CustomerDetail = (state = CUSTOMER_DETAIL_INITIAL_STATE, action) => {
    switch (action.type) {
        case CustomerDetailTypes.CUSTOMER_DETAIL_LOADING:
            return {
                customerDetail: state.customerDetail,
                loading: true,
            };

        case CustomerDetailTypes.CUSTOMER_DETAIL_SUCCESS:
            return {
                customerDetail: action.payload.data,
                loading: false,
            };
        case CustomerDetailTypes.CUSTOMER_DETAIL_ERROR:
            return {
                customerDetail: state.customerDetail,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end customer details



export { CustomerDetail };
