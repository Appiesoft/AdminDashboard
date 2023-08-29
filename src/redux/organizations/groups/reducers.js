import GroupsActionTypes from "./constant";

const GROUPS_INITIAL_STATE = {
    groupsList: [],
    loading: false,
};

const GROUPS_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const GROUPS_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const GROUPS_DELETE_INITIAL_STATE = {
    loading: false,
    message: ""
};

// start list 
const Groups = (state = GROUPS_INITIAL_STATE, action) => {
    switch (action.type) {
        case GroupsActionTypes.GROUPS_LIST_LOADING:
            return {
                groupsList: state.groupsList,
                loading: true,
            };

        case GroupsActionTypes.GROUPS_LIST_SUCCESS:
            return {
                groupsList: action.payload.data,
                loading: false,
            };
        case GroupsActionTypes.GROUPS_LIST_ERROR:
            return {
                groupsList: state.groupsList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};

// start create 
const GroupsCreate = (state = GROUPS_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case GroupsActionTypes.GROUPS_CREATE_LOADING:
            return {
                loading: true,
            };

        case GroupsActionTypes.GROUPS_CREATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case GroupsActionTypes.GROUPS_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        case GroupsActionTypes.GROUPS_CREATE_RESET:
            return GROUPS_CREATE_INITIAL_STATE
        default:
            return { ...state };
    }
};
// start update 
const GroupsUpdate = (state = GROUPS_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case GroupsActionTypes.GROUPS_UPDATE_LOADING:
            return {
                loading: true,
            };

        case GroupsActionTypes.GROUPS_UPDATE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case GroupsActionTypes.GROUPS_UPDATE_RESET:
            return GROUPS_UPDATE_INITIAL_STATE
        case GroupsActionTypes.GROUPS_UPDATE_ERROR:
            return {
                loading: false,
                ...action?.payload
            };
        default:
            return { ...state };
    }
};
// start delete 
const GroupsDelete = (state = GROUPS_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case GroupsActionTypes.GROUPS_DELETE_LOADING:
            return {
                loading: true,
            };

        case GroupsActionTypes.GROUPS_DELETE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case GroupsActionTypes.GROUPS_DELETE_RESET:
            return GROUPS_DELETE_INITIAL_STATE
        case GroupsActionTypes.GROUPS_DELETE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};


export { Groups, GroupsCreate, GroupsUpdate, GroupsDelete };
