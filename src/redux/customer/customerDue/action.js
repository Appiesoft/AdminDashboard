import CustomerDueTypes from "./constant";

type AuthAction = { type: string, payload: {} | string };

// start costomer Due list 
export const customerDue = (data): AuthAction => ({
    type: CustomerDueTypes.GET_CUSTOMER_DUE,
    payload: { ...data }
})


