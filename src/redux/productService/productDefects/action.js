import ProductDefectsActionTypes from "../productDefects/constant"



type AuthAction = { type: string, payload: {} | string }; 

// start defect list 
export const defectList = ( data ): AuthAction => ({ 
    type: ProductDefectsActionTypes.GET_DEFECT_LIST,
    payload: data
})

// start  defect Create   
export const defectCreate = ( data ): AuthAction => ({ 
    type: ProductDefectsActionTypes.CREATE_DEFECT,
    payload: data
})


// // start defect update
export const defectUpdate = (data): AuthAction => ({
    type: ProductDefectsActionTypes.UPDATE_DEFECT,
    payload: {...data}
})


// start defect delete
export const defectDelete = (data): AuthAction => ({
    type: ProductDefectsActionTypes.DELETE_DEFECT,
    payload: data
})
 

