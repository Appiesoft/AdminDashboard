import CustomerDueTypes from "./constant";

const CUSTOMER_DETAIL_INITIAL_STATE = {
    customerDue: {},
    loading: false,
};


// start customer due
const CustomerDue = (state = CUSTOMER_DETAIL_INITIAL_STATE, action) => {
    switch (action.type) {
        case CustomerDueTypes.CUSTOMER_DUE_LOADING:
            return {
                customerDue: state.customerDue,
                loading: true,
            };

        case CustomerDueTypes.CUSTOMER_DUE_SUCCESS:
            return {
                customerDue: action?.payload,
                loading: false,
            };
        case CustomerDueTypes.CUSTOMER_DUE_ERROR:
            return {
                customerDue: state.customerDue,
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end customer due



export { CustomerDue };
