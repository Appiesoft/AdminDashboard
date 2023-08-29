import GroupsActionTypes from "./constant";

type AuthAction = { type: string, payload: {} | string };

export const groups = (): AuthAction => ({
    type: GroupsActionTypes.GET_GROUPS_LIST,
    payload: undefined
})

export const groupCreate = (data): AuthAction => ({
    type: GroupsActionTypes.GROUPS_CREATE,
    payload: data
})

export const groupUpdate = (data): AuthAction => ({
    type: GroupsActionTypes.GROUPS_UPDATE,
    payload: data
})

export const groupDelete = (data): AuthAction => ({
    type: GroupsActionTypes.GROUPS_DELETE,
    payload: data
})


