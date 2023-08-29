import LaundryPackagesActionTypes from '../laundryPackages/constant'
const LAUNDRY_PACKAGES_LIST_INITIAL_STATE = {
    laundryPackagesList: [],
    loading: false,
};
const LAUNDRY_PACKAGES_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const LAUNDRY_PACKAGES_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const LAUNDRY_PACKAGES_DELETE_INITIAL_STATE = {
    loading: false,
    message: ""
};


//start laundryPackages list
const LaundryPackagesList = (state = LAUNDRY_PACKAGES_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_LIST_LOADING:
            return {
                laundryPackagesList: state.laundryPackagesList,
                loading: true,
            }

        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_LIST_SUCCESS:
            return {
                laundryPackagesList: action.payload,
                loading: false,
            }
        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_LIST_ERROR:
            return {
                laundryPackagesList: state.laundryPackagesList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end laundryPackages list

//start laundryPackages create
const LaundryPackagesCreate = (state = LAUNDRY_PACKAGES_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_CREATE_LOADING:
            return {
                loading: true,
            }

        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_CREATE_SUCESS:
            return {
                ...action?.payload?.data,
                loading: false,
            }
        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_CREATE_RESET:
            return LAUNDRY_PACKAGES_CREATE_INITIAL_STATE
        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_CREATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            }
        default:
            return { ...state }
    };
}
//end laundryPackages create

//start laundryPackages update 
const LaundryPackagesUpdate = (state = LAUNDRY_PACKAGES_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_UPDATE_LOADING:
            return {
                loading: true,
            }

        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_UPDATE_SUCESS:
            return {
                ...action?.payload,
                loading: false,
            }
        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            }
        default:
            return { ...state }
    };
}
//end laundryPackages update

//start laundryPackages delete 
const LaundryPackagesDelete = (state = LAUNDRY_PACKAGES_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_DELETE_LOADING:
            return {
                loading: true,
            }

        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_DELETE_SUCESS:
            return {
                ...action.payload,
                loading: false,
            }
        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_DELETE_RESET:
            return LAUNDRY_PACKAGES_DELETE_INITIAL_STATE
        case LaundryPackagesActionTypes.LAUNDRY_PACKAGES_DELETE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end laundryPackages delete 

export { LaundryPackagesList, LaundryPackagesCreate, LaundryPackagesUpdate, LaundryPackagesDelete }
