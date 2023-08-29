import AssignedPackageActionTypes from './constant'
const ASSIGNED_PACKAGE_LIST_INITIAL_STATE = {
    assignedPackageLists: [],
    loading: false,
};

const ASSIGNED_PACKAGE_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const ASSIGNED_PACKAGE_DELETE_INITIAL_STATE = {
    loading: false,
    message: ""
};


const AssignedPackageList = (state = ASSIGNED_PACKAGE_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_LOADING:
            return {
                assignedPackageLists: state.assignedPackageLists,
                loading: true,
            }

        case AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_SUCCESS:
            return {
                assignedPackageLists: action.payload,
                loading: false,
            }
        case AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_ERROR:
            return {
                assignedPackageLists: state.assignedPackageLists,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}

const AssignPackageCreate = (state = ASSIGNED_PACKAGE_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case AssignedPackageActionTypes.ASSIGNED_PACKAGE_CREATE_LOADING:
            return {
                loading: true,
            }

        case AssignedPackageActionTypes.ASSIGNED_PACKAGE_CREATE_SUCESS:
            return {
                ...action.payload.data,
                loading: false,
            }
        case AssignedPackageActionTypes.ASSIGNED_PACKAGE_CREATE_RESET:
            return ASSIGNED_PACKAGE_CREATE_INITIAL_STATE
        case AssignedPackageActionTypes.ASSIGNED_PACKAGE_CREATE_ERROR:
            return {
                loading: false,
                message: action?.payload
            }
        default:
            return { ...state }
    };
}

const AssignPackageDelete = (state = ASSIGNED_PACKAGE_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case AssignedPackageActionTypes.ASSIGNED_PACKAGE_DELETE_LOADING:
            return {
                loading: true,
            }

        case AssignedPackageActionTypes.ASSIGNED_PACKAGE_DELETE_SUCESS:
            return {
                ...action?.payload,
                loading: false,
            }
        case AssignedPackageActionTypes.ASSIGNED_PACKAGE_DELETE_RESET:
            return ASSIGNED_PACKAGE_DELETE_INITIAL_STATE

        case AssignedPackageActionTypes.ASSIGNED_PACKAGE_DELETE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            }
        default:
            return { ...state }
    };
}


export { AssignedPackageList, AssignPackageCreate, AssignPackageDelete }
