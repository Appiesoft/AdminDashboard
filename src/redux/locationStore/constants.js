const StoreActionTypes = {
    GET_STORE_LIST: '@@GET_STORE_LIST',
    STORE_LIST_LOADING: '@@STORE_LIST/LOADING',
    STORE_LIST_SUCCESS: '@@STORE_LIST/SUCESS',
    STORE_LIST_ERROR: '@@STORE_LIST/ERROR',

    // start create 
    CREATE_STORE: '@CREATE_STORE',
    STORE_CREATE_LOADING: '@@STORE_CREATE/LOADING',
    STORE_CREATE_SUCCESS: '@@STORE_CREATE/SUCESS',
    STORE_CREATE_RESET: '@@STORE_CREATE/RESET',
    STORE_CREATE_ERROR: '@@STORE_CREATE/ERROR',


    // start details 
    DETAILS_STORE: '@DETAILS_STORE',
    STORE_DETAILS_LOADING: '@@STORE_DETAILS/LOADING',
    STORE_DETAILS_SUCCESS: '@@STORE_DETAILS/SUCESS',
    STORE_DETAILS_ERROR: '@@STORE_DETAILS/ERROR',
    STORE_DETAILS_RESET: '@@STORE_DETAILS/RESET',

    // // start update 
    UPDATE_STORE: '@UPDATE_STORE',
    STORE_UPDATE_LOADING: '@@STORE_UPDATE/LOADING',
    STORE_UPDATE_SUCCESS: '@@STORE_UPDATE/SUCESS',
    STORE_UPDATE_RESET: '@@STORE_UPDATE/RESET',
    STORE_UPDATE_ERROR: '@@STORE_UPDATE/ERROR',

    // // start delete 
    DELETE_STORE: '@DELETE_STORE',
    STORE_DELETE_LOADING: '@@STORE_DELETE/LOADING',
    STORE_DELETE_SUCCESS: '@@STORE_DELETE/SUCESS',
    STORE_DELETE_RESET: '@@STORE_DELETE/RESET',
    STORE_DELETE_ERROR: '@@STORE_DELETE/ERROR',

}
export default StoreActionTypes