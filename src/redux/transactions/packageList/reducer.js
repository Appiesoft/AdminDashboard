import PackageActionTypes from './constant'
const PACKAGE_LIST_INITIAL_STATE = {
    packageList: [],
    loading: false,
};
const PACKAGE_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};


const PackageList = (state = PACKAGE_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case PackageActionTypes.PACKAGE_LIST_LOADING:
            return {
                packageList: state.packageList,
                loading: true,
            }

        case PackageActionTypes.PACKAGE_LIST_SUCCESS:
            return {
                packageList: action.payload.data,
                loading: false,
            }
        case PackageActionTypes.PACKAGE_LIST_ERROR:
            return {
                packageList: state.packageList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}

export { PackageList }
