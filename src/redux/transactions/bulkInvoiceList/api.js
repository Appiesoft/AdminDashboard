import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"


const api = new APICore();

function bulkInvoiceListApi(params: any): any {
    return api.create(URL.BULK_INVOICE_LIST, params);
}

export { bulkInvoiceListApi }   