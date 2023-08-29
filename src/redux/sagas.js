// @flow
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import employeeListSaga from './employee/saga';
import serviceCategorySaga from './productService/serviceCategory/saga';
import productBrandSaga from './productService/productBrand/saga';
import productDefectsSaga from './productService/productDefects/saga';
import ProductPatternsSaga from './productService/productPatterns/saga';
import productColorSaga from './productService/productColor/saga';
import productCategorySaga from './productService/productCategory/saga';
import productUpchargesSaga from './productService/productUpcharges/saga';
import productPriceSaga from './productService/PriceList/saga';
import productsListSaga from './productService/productList/saga';

import productLaundryPackagesSaga from './productService/laundryPackages/saga';
import storeListSaga from './locationStore/saga';
import orderListSaga from './transactions/order/saga';
import packageListSaga from './transactions/packageList/saga';
import assignedPackageListSaga from './transactions/assignedPackageList/saga';
import adminProfileSaga from './organizations/adminProfile/saga';
import generalSettingSaga from './organizations/generalSetting/saga';
import smsAndEmailSaga from './organizations/smsAndEmailSetting/saga';
import updateSmsAndEmailSaga from './organizations/smsAndEmailSetting/saga'
import paymentSaga from './payment/paymentList/saga';
import getAdvanceSettingForStripeSaga from './payment/advanceSettingForStripe/saga';
import paymentTypeSaga from './payment/paymentType/saga';
import paymentAdjustmentSaga from './payment/paymentAdjustment/saga';
import paymentSettingSaga from './payment/paymentSetting/saga';
import paymentChargesListSaga from './payment/paymentChargesList/saga';
import costomerSaga from './customer/customerList/saga';
import costomerActiveSaga from './customer/customerActivePassiveList/saga';
import discountChargesSaga from './promotion/discountChargesList/saga';
import bulkInvoiceSaga from './transactions/bulkInvoiceList/saga';
import deliveryRequestSaga from './transactions/deliveryRequestList/saga';
import pickupRequestSaga from './transactions/pickupRequestList/saga';
import driverSaga from './transactions/driverList/saga';
import groupsSaga from './organizations/groups/saga';
import customerDetailSaga from './customer/customerDetail/saga';
import promoCouponSaga from './promotion/promoCouponsList/saga';
import walletPromoSaga from './promotion/walletPromoList/saga';
import automatedPromoSaga from './promotion/automatedPromoList/saga';
import appSettingSaga from './appSettings/appSetting/saga';
import bannerSaga from './appSettings/banner/saga';
import dueAmountReportListSaga from './analytics/dueAmountReportList/saga';
import datewiseReportSaga from './analytics/datewiseReport/saga';
import dueOrderListSaga from './analytics/dueOrderList/saga';
import monthlyReportListSaga from './analytics/monthlyReport/saga';
import walletHistoryReportListSaga from './analytics/walletHistoryReportList/saga';
import expenseReportListSaga from './analytics/expensesReport/saga';
import incomeReportListSaga from './analytics/incomeReports/saga';
import productListSaga from './analytics/productList/saga';
import productWiseReportListSaga from './analytics/productWiseReport/saga';
import WalletDeleteHistoryReportList from './analytics/walletDeleteHistoryReport/saga';
import walletBalanceReportListSaga from './analytics/walletBalanceReport/saga';
import promoCodeReportListSaga from './analytics/promoCodeReport/saga';
import cashDayReportSaga from './analytics/cashDayReport/saga';
import taxCollectionReportListSaga from './analytics/taxCollectionReport/saga';
import tipReportListSaga from './analytics/tipReport/saga';
import profitAndLossReportListSaga from './analytics/profitAndLossReport/saga';
import discountChargeReportSaga from './analytics/discountChagesReport/saga';
import retailproductWiseReportListSaga from './analytics/retailProductWiseReport/saga';
import homePageSettingSaga from './appSettings/homePageSetting/saga';
import doordeshSettingSaga from './appSettings/doordeshSetting/saga';
import customerDueSaga from './customer/customerDue/saga';
import dashbaordSaga from './dashboard/saga';

export default function* rootSaga(): any {
    yield all([
        authSaga(),
        layoutSaga(),
        employeeListSaga(),
        storeListSaga(),
        orderListSaga(),
        packageListSaga(),
        assignedPackageListSaga(),
        productBrandSaga(),
        productDefectsSaga(),
        serviceCategorySaga(),
        adminProfileSaga(),
        smsAndEmailSaga(),
        updateSmsAndEmailSaga(),
        getAdvanceSettingForStripeSaga(),
        paymentSaga(),
        paymentTypeSaga(),
        paymentAdjustmentSaga(),
        paymentSettingSaga(),
        paymentChargesListSaga(),
        costomerSaga(),
        costomerActiveSaga(),
        discountChargesSaga(),
        bulkInvoiceSaga(),
        pickupRequestSaga(),
        deliveryRequestSaga(),
        driverSaga(),
        generalSettingSaga(),
        groupsSaga(),
        ProductPatternsSaga(),
        productColorSaga(),
        productCategorySaga(),
        productUpchargesSaga(),
        productPriceSaga(),
        productsListSaga(),
        productLaundryPackagesSaga(),
        customerDetailSaga(),
        promoCouponSaga(),
        walletPromoSaga(),
        automatedPromoSaga(),
        appSettingSaga(),
        bannerSaga(),
        dueAmountReportListSaga(),
        datewiseReportSaga(),
        dueOrderListSaga(),
        monthlyReportListSaga(),
        walletHistoryReportListSaga(),
        expenseReportListSaga(),
        incomeReportListSaga(),
        productListSaga(),
        productWiseReportListSaga(),
        WalletDeleteHistoryReportList(),
        walletBalanceReportListSaga(),
        promoCodeReportListSaga(),
        cashDayReportSaga(),
        taxCollectionReportListSaga(),
        tipReportListSaga(),
        profitAndLossReportListSaga(),
        discountChargeReportSaga(),
        retailproductWiseReportListSaga(),
        homePageSettingSaga(),
        homePageSettingSaga(),
        doordeshSettingSaga(),
        customerDueSaga(),
        dashbaordSaga()
    ]);

}
