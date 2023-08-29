import CostomerActiveActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start costomer active list 
export const costomerActiveList = (data): AuthAction => ({
    type: CostomerActiveActionTypes.GET_COSTOMER_ACTIVE_LIST,
    payload: data
})


