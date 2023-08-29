import AdminProfileActionTypes from "./constant";

const ADMIN_PROFILE_INITIAL_STATE = {
    adminProfile: {},
    loading: false,
};
const ADMIN_PROFILE_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const AdminProfile = (state = ADMIN_PROFILE_INITIAL_STATE, action) => {
    switch (action.type) {
        case AdminProfileActionTypes.ADMIN_PROFILE_LOADING:
            return {
                adminProfile: state.adminProfile,
                loading: true,
            };

        case AdminProfileActionTypes.ADMIN_PROFILE_SUCCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case AdminProfileActionTypes.ADMIN_PROFILE_RESET:
            return ADMIN_PROFILE_INITIAL_STATE
        case AdminProfileActionTypes.ADMIN_PROFILE_ERROR:
            return {
                // adminProfile: state.adminProfile,
                loading: false,
                ...action?.payload,
            };
        default:
            return { ...state };
    }
};

const AdminProfileUpdate = (state = ADMIN_PROFILE_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case AdminProfileActionTypes.ADMIN_PROFILE_UPDATE_LOADING:
            return {
                loading: true,
            };

        case AdminProfileActionTypes.ADMIN_PROFILE_UPDATE_SUCCESS:
            return {
                ...action.payload,
                loading: false,
            };
        case AdminProfileActionTypes.ADMIN_PROFILE_UPDATE_RESET:
            return ADMIN_PROFILE_INITIAL_STATE
        case AdminProfileActionTypes.ADMIN_PROFILE_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};


export { AdminProfile, AdminProfileUpdate };
