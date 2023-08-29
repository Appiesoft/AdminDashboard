import TaxCollectionReportListActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start Tax collection report
export const TaxCollectionReportList = (data): AuthAction => ({
    type: TaxCollectionReportListActionTypes.GET_TAX_COLLECTION_REPORT_LIST,
    payload: data
})

