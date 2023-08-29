import BulkInvoiceActionTypes from "./constant";

const BULK_INVOICE_LIST_INITIAL_STATE = {
    bulkInvoiceLists: [],
    loading: false,
};


const BulkInvoiceList = (state = BULK_INVOICE_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case BulkInvoiceActionTypes.BULK_INVOICE_LIST_LOADING:
            return {
                bulkInvoiceLists: state.bulkInvoiceLists,
                loading: true,
            }

        case BulkInvoiceActionTypes.BULK_INVOICE_LIST_SUCCESS:
            return {
                bulkInvoiceLists: action.payload,
                loading: false,
            }
        case BulkInvoiceActionTypes.BULK_INVOICE_LIST_ERROR:
            return {
                bulkInvoiceLists: state.bulkInvoiceLists,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}



export { BulkInvoiceList }
