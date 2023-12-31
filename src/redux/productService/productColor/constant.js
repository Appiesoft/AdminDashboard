const ProductColorActionTypes = {

    //start list 
    GET_COLOR_LIST: '@@GET_COLOR_LIST',
    COLOR_LIST_LOADING: '@@COLOR_LIST_LOADING/LOADING',
    COLOR_LIST_SUCCESS: '@@COLOR_LIST_SUCCESS/SUCESS',
    COLOR_LIST_ERROR: '@@COLOR_LIST_ERROR/ERROR',


    //start create 
    CREATE_COLOR: '@@CREATE_COLOR',
    COLOR_CREATE_LOADING: '@@COLOR_CREATE_LOADING/LOADING',
    COLOR_CREATE_SUCESS: '@@COLOR_CREATE_SUCESS/SUCESS',
    COLOR_CREATE_ERROR: '@@COLOR_CREATE_ERROR/ERROR',
    COLOR_CREATE_RESET: '@@COLOR_CREATE_ERROR/RESET',



    //start update
    UPDATE_COLOR: '@@UPDATE_COLOR',
    COLOR_UPDATE_LOADING: '@@COLOR_UPDATE_LOADING/LOADING',
    COLOR_UPDATE_SUCESS: '@@COLOR_UPDATE_SUCESS/SUCESS',
    COLOR_UPDATE_ERROR: '@@COLOR_UPDATE_ERROR/ERROR',
    COLOR_UPDATE_RESET: '@@COLOR_UPDATE_ERROR/RESET',


    // start delete 
    DELETE_PRODUCT_COLOR: '@@DELETE_PRODUCT_COLOR',
    COLOR_DELETE_LOADING: '@@COLOR_DELETE/LOADING',
    COLOR_DELETE_SUCESS: '@@COLOR_DELETE/SUCESS',
    COLOR_DELETE_ERROR: '@@COLOR_DELETE/ERROR',
    COLOR_DELETE_RESET: '@@COLOR_DELETE/RESETSET',

}

export default ProductColorActionTypes
