import CostomerActiveActionTypes from './constant';
const COSTOMER_ACTIVE_LIST_INITIAL_STATE = {
    costomerActiveList: [],
    loading: false,
};


// start costomer active list
const CostomerActiveList = (state = COSTOMER_ACTIVE_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case CostomerActiveActionTypes.COSTOMER_ACTIVE_LIST_LOADING:
            return {
                costomerActiveList: state.costomerActiveList,
                loading: true,
            };

        case CostomerActiveActionTypes.COSTOMER_ACTIVE_LIST_SUCCESS:
            return {
                costomerActiveList: action.payload,
                loading: false,
            };
        case CostomerActiveActionTypes.COSTOMER_ACTIVE_LIST_ERROR:
            return {
                costomerActiveList: state.costomerActiveList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end costomer active list



export { CostomerActiveList };
