import BulkInvoiceActionTypes from "./constant";

type AuthAction = { type: string, payload: {} | string };

export const bulkInvoiceList = (data): AuthAction => ({
    type: BulkInvoiceActionTypes.GET_BULK_INVOICE_LIST,
    payload: { ...data }
})

