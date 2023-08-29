import ServiceCategoryActionTypes from '../serviceCategory/constant';

const SERVICE_CATEGORY_LIST_INITIAL_STATE = {
    serviceCategoryList: [],
    loading: false,
};

const SERVICE_CATEGORY_CREATE_INITIAL_STATE = {
    loading: false,
    message: '',
};

const SERVICE_CATEGORY_UPDATE_INITIAL_STATE = {
    loading: false,
    message: '',
};

const SERVICE_CATEGORY_DELETE_INITIAL_STATE = {
    loading: false,
    message: '',
};

// start service category list
const ServiceCategoryList = (state = SERVICE_CATEGORY_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ServiceCategoryActionTypes.SERVICE_CATEGORY_LIST_LOADING:
            return {
                serviceCategoryList: state.serviceCategoryList,
                loading: true,
            };

        case ServiceCategoryActionTypes.SERVICE_CATEGORY_LIST_SUCCESS:
            return {
                serviceCategoryList: action.payload,
                loading: false,
            };
        case ServiceCategoryActionTypes.SERVICE_CATEGORY_LIST_ERROR:
            return {
                serviceCategoryList: state.serviceCategoryList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end service category list

// start service category create
const ServiceCategoryCreate = (state = SERVICE_CATEGORY_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ServiceCategoryActionTypes.SERVICE_CATEGORY_CREATE_LOADING:
            return {
                loading: true,
            };

        case ServiceCategoryActionTypes.SERVICE_CATEGORY_CREATE_SUCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case ServiceCategoryActionTypes.SERVICE_CATEGORY_CREATE_ERROR:
            return {
                loading: false,
                ...action?.payload,
            };

        case ServiceCategoryActionTypes.SERVICE_CATEGORY_CREATE_RESET:
            return SERVICE_CATEGORY_CREATE_INITIAL_STATE;
        default:
            return { ...state };
    }
};
// end service category create

// start service category update

const ServiceCategoryUpdate = (state = SERVICE_CATEGORY_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ServiceCategoryActionTypes.SERVICE_CATEGORY_UPDATE_LOADING:
            return {
                loading: true,
            };

        case ServiceCategoryActionTypes.SERVICE_CATEGORY_UPDATE_SUCESS:
            return {
                ...action?.payload,
                loading: false,
            };
        case ServiceCategoryActionTypes.SERVICE_CATEGORY_UPDATE_RESET:
            return SERVICE_CATEGORY_UPDATE_INITIAL_STATE;
        case ServiceCategoryActionTypes.SERVICE_CATEGORY_UPDATE_ERROR:
            return {
                ...action?.payload,
                loading: false,
            };

        default:
            return { ...state };
    }
};
// end service category update

//start service category  delete
const ServiceCategoryDelete = (state = SERVICE_CATEGORY_DELETE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ServiceCategoryActionTypes.SERVICE_CATEGORY_DELETE_LOADING:
            return {
                loading: true,
            };

        case ServiceCategoryActionTypes.SERVICE_CATEGORY_DELETE_SUCESS:
            return {
                ...action.payload,
                loading: false,
            };

        case ServiceCategoryActionTypes.SERVICE_CATEGORY_DELETE_ERROR:
            return {
                loading: false,
                ...action?.payload,
            };
        case ServiceCategoryActionTypes.SERVICE_CATEGORY_DELETE_RESET:
            return SERVICE_CATEGORY_DELETE_INITIAL_STATE;
        default:
            return { ...state };
    }
};
//end service category  delete
export { ServiceCategoryList, ServiceCategoryCreate, ServiceCategoryUpdate, ServiceCategoryDelete };
