import AdvanceSettingForStripeActionTypes from "./constant";

type AuthAction = { type: string, payload: {} | string };

// start employee list 
export const advanceSettingForStripeActions = (data): AuthAction => ({
    type: AdvanceSettingForStripeActionTypes.UPDATE_ADVANCE_SETTING_FOR_STRIPE,
    payload: { ...data }
})


