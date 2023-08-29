import AdvanceSettingForStripeActionTypes from "./constant";
const ADVANCE_SETTING_FOR_STRIPE_INITIAL_STATE = {
    advanceSettingForStripe: [],
    loading: false,
};

const AdvanceSettingForStripe = (state = ADVANCE_SETTING_FOR_STRIPE_INITIAL_STATE, action) => {
    switch (action.type) {
        case AdvanceSettingForStripeActionTypes.ADVANCE_SETTING_FOR_STRIPE_LOADING:
            return {
                advanceSettingForStripe: state.advanceSettingForStripe,
                loading: true,
            };
        case AdvanceSettingForStripeActionTypes.ADVANCE_SETTING_FOR_STRIPE_SUCCESS:
            return {
                advanceSettingForStripe: action.payload,
                loading: false,
            };
        case AdvanceSettingForStripeActionTypes.ADVANCE_SETTING_FOR_STRIPE_ERROR:
            return {
                advanceSettingForStripe: state.advanceSettingForStripe,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};


export { AdvanceSettingForStripe };
