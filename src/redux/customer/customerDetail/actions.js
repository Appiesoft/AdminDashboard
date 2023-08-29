import CustomerDetailTypes from "./constant";

type AuthAction = { type: string, payload: {} | string };

// start costomer active list 
export const customerDetail = (data): AuthAction => ({
    type: CustomerDetailTypes.CUSTOMER_DETAIL,
    payload: { ...data }
})


