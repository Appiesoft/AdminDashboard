import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Payment Adjustment List 
function paymentAdjustmentApi(params: any): any {
    return api.get(URL.PAYMENT_ADJUSTMENT, params);
}

// start Payment Type new enter form Create
function paymentAdjustmentCreateApi(params: any): any {
    return api.create(URL.PAYMENT_ADJUSTMENTS_CREATE, params);
}

// start payment type Update
function paymentAdjustmentUpdateApi(params: any): any {
    console.log("chandan")
    return api.create(URL.PAYMENT_ADJUSTMENTS_UPDATE, params);
}

// start Payment adjustment  delete
function paymentAdjustmentDeleteApi(params: any): any {
    return api.delete(`${URL.PAYMENT_ADJUSTMENTS_DELETE}/${params.paymentAdjustmentId}`);
}


export { paymentAdjustmentApi, paymentAdjustmentCreateApi, paymentAdjustmentDeleteApi, paymentAdjustmentUpdateApi }