// @flow
import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import Layout from './layout/reducers';
import { EmployeeList, EmployeeCreate, EmployeeUpdate, EmployeeDetails, EmployeeDelete } from './employee/reducers';
import { StoreList, StoreCreate, StoreUpdate, StoreDetails, StoreDelete } from './locationStore/reducers';
import { OrderList } from './transactions/order/reducers';
import { PackageList } from './transactions/packageList/reducer';
import {
    AssignedPackageList,
    AssignPackageCreate,
    AssignPackageDelete,
} from './transactions/assignedPackageList/reducer';
import { AdminProfile } from './organizations/adminProfile/reducers';
import { GeneralSetting, GeneralSettingUpdate } from './organizations/generalSetting/reducers';
import { SmsAndEmail, SmsAndEmailUpdate } from './organizations/smsAndEmailSetting/reducers';
import {
    ServiceCategoryList,
    ServiceCategoryUpdate,
    ServiceCategoryCreate,
    ServiceCategoryDelete,
} from './productService/serviceCategory/reducers';
import { BrandList, BrandCreate, BrandUpdate, BrandDelete } from './productService/productBrand/reducers';
import { DefectList, DefectCreate, DefectUpdate, DefectDelete } from './productService/productDefects/reducers';
import { PaymentList } from './payment/paymentList/reducers';
import { AdvanceSettingForStripe } from './payment/advanceSettingForStripe/reducers';
import {
    PaymentTypeListReducer,
    paymentTypeCreate,
    PaymentTypeUpdate,
    PaymentTypeRemove,
} from './payment/paymentType/reducers';
import {
    PaymentAdjustmentList,
    PaymentAdjustmentCreate,
    PaymentAdjustmentUpdate,
    PaymentAdjustmentDelete,
} from './payment/paymentAdjustment/reducers';
import { PaymentSettingtList } from './payment/paymentSetting/reducers';
import {
    PaymentChargesList,
    PaymentChargesCreate,
    PaymentChagesUpdate,
    PaymentChargesRemove,
} from './payment/paymentChargesList/reducers';
import { CostomerList, CustomerCreate, CustomerUpdate, CustomerDelete } from './customer/customerList/reducers';
import { CostomerActiveList } from './customer/customerActivePassiveList/reducers';
import { ProductLists } from "./productService/productList/reducers"
import {
    ProductPatternsList,
    ProductPatternsCreate,
    ProductPatternsUpdate,
    ProductPatternsDelete,
} from './productService/productPatterns/reducers';
import {
    ProductColorList,
    ProductColorCreate,
    ProductColorUpdate,
    ProductColorDelete,
} from './productService/productColor/reducers';
import {
    ProductCategoryList,
    ProductCategoryCreate,
    ProductCategoryUpdate,
    ProductCategoryDelete,
} from './productService/productCategory/reducers';
import {
    UpchargesCreate,
    UpchargesList,
    UpchargesUpdate,
    UpchargesDelete,
} from './productService/productUpcharges/reducers';
import {
    DiscountChargesList,
    DiscountChargesCreate,
    DiscountChargesDetail,
    DiscountChargesUpdate,
    DiscountChargesDelete,
} from './promotion/discountChargesList/reducers';
import {
    PriceList,
    PriceCreate,
    PriceUpdate,
    ProductItemList,
    ProductItemCreate,
    ProductItemUpdate,
    ProductItemDelete,
    ProductItemDetails,
} from './productService/PriceList/reducers';
import {
    LaundryPackagesList,
    LaundryPackagesCreate,
    LaundryPackagesUpdate,
    LaundryPackagesDelete,
} from './productService/laundryPackages/reducers';
import { BulkInvoiceList } from './transactions/bulkInvoiceList/reducers';
import { DeliveryRequestList, DeliveryRequestCreate } from './transactions/deliveryRequestList/reducers';
import { PickupRequestList, PickupRequestCreate } from './transactions/pickupRequestList/reducers';
import { DriverList } from './transactions/driverList/reducers';
import { AdminProfileUpdate } from './organizations/adminProfile/reducers';
import { Groups, GroupsCreate, GroupsUpdate, GroupsDelete } from './organizations/groups/reducers';
import { CustomerDetail } from './customer/customerDetail/reducers';
import {
    PromoCouponList,
    PromoCouponCreate,
    PromoCouponDetail,
    PromoCouponUpadte,
    PromoCouponDelete,
} from './promotion/promoCouponsList/reducers';
import {
    WalletPromoList,
    WalletPromoCreate,
    WalletPromoDetail,
    WalletPromoUpdate,
    WalletPromoDelete,
} from './promotion/walletPromoList/reducers';
import {
    AutomatedPromoList,
    AutomatedPromoCreate,
    AutomatedPromoDetail,
    AutomatedPromoUpdate,
    AutomatedPromoDelete,
} from './promotion/automatedPromoList/reducers';
import { AppSettingList, AppSettingUpdate } from './appSettings/appSetting/reducers';
import { DueAmountReportList } from './analytics/dueAmountReportList/reducers';
import { DatewiseReportList } from './analytics/datewiseReport/reducers';
import { DueOrderListReducer } from './analytics/dueOrderList/reducers';
import { MonthlyReportList } from './analytics/monthlyReport/reducers';
import { WalletHistoryReportList } from './analytics/walletHistoryReportList/reducers';
import { ExpensesReportList } from './analytics/expensesReport/reducers';
import { IncomeReportList } from './analytics/incomeReports/reducers';
import { ProductList } from './analytics/productList/reducers';
import { ProductWiseReportList } from './analytics/productWiseReport/reducers';
import { WalletDeleteHistoryReportList } from './analytics/walletDeleteHistoryReport/reducers';
import { WalletBalanceReportList } from './analytics/walletBalanceReport/reducers';
import { PromoCodeReportList } from './analytics/promoCodeReport/reducers';
import { CashDayReportList } from './analytics/cashDayReport/reducers';
import { TaxCollectionReportList } from './analytics/taxCollectionReport/reducers';
import { TipReportList } from './analytics/tipReport/reducers';
import { ProfitAndLossReportList } from './analytics/profitAndLossReport/reducers';
import { DiscountChargeReportList } from './analytics/discountChagesReport/reducers';
import { RetailProductWiseReportList } from './analytics/retailProductWiseReport/reducers';
import { BannerList, BannerCreate, BannerDetail, BannerUpdate, BannerDelete } from './appSettings/banner/reducers';
import { HomePageSettingList, HomePageSettingUpadte } from './appSettings/homePageSetting/reducers';
import { DoordashSettingList, DoordashSettingUpdate } from './appSettings/doordeshSetting/reducers';
import { CustomerDue } from './customer/customerDue/reducers';
import { DashboardList, TodayOrderList, OrderStatus } from './dashboard/reducers';

export default combineReducers({
    Auth,
    Layout,
    EmployeeList,
    EmployeeCreate,
    EmployeeUpdate,
    EmployeeDetails,
    StoreList,
    StoreCreate,
    StoreDetails,
    StoreUpdate,
    OrderList,
    PackageList,
    AssignedPackageList,
    AssignPackageCreate,
    AdminProfile,
    GeneralSetting,
    SmsAndEmail,
    SmsAndEmailUpdate,
    BrandList,
    BrandCreate,
    BrandUpdate,
    BrandDelete,
    ServiceCategoryList,
    ServiceCategoryUpdate,
    ServiceCategoryCreate,
    ServiceCategoryDelete,
    DefectList,
    DefectCreate,
    DefectUpdate,
    DefectDelete,
    ProductPatternsList,
    ProductPatternsCreate,
    ProductPatternsUpdate,
    ProductPatternsDelete,
    ProductColorList,
    ProductColorCreate,
    ProductColorUpdate,
    ProductColorDelete,
    ProductCategoryList,
    ProductCategoryCreate,
    ProductCategoryUpdate,
    ProductCategoryDelete,
    UpchargesCreate,
    UpchargesList,
    UpchargesUpdate,
    UpchargesDelete,
    PriceList,
    ProductLists,
    PriceCreate,
    PriceUpdate,
    ProductItemList,
    ProductItemCreate,
    ProductItemUpdate,
    ProductItemDelete,
    ProductItemDetails,
    LaundryPackagesList,
    LaundryPackagesCreate,
    LaundryPackagesUpdate,
    LaundryPackagesDelete,
    AssignedPackageList,
    AssignPackageCreate,
    PaymentList,
    AdvanceSettingForStripe,
    PaymentTypeListReducer,
    paymentTypeCreate,
    PaymentTypeUpdate,
    PaymentTypeRemove,
    PaymentAdjustmentList,
    PaymentAdjustmentCreate,
    PaymentAdjustmentUpdate,
    PaymentSettingtList,
    PaymentChargesList,
    PaymentChargesCreate,
    PaymentChagesUpdate,
    PaymentChargesRemove,
    CostomerList,
    CostomerActiveList,
    DiscountChargesList,
    DiscountChargesCreate,
    BulkInvoiceList,
    DeliveryRequestList,
    DeliveryRequestCreate,
    PickupRequestList,
    PickupRequestCreate,
    DriverList,
    AdminProfileUpdate,
    Groups,
    GroupsCreate,
    GroupsUpdate,
    GroupsDelete,
    GeneralSettingUpdate,
    StoreDelete,
    EmployeeDelete,
    CustomerCreate,
    CustomerDelete,
    AssignPackageDelete,
    CustomerDetail,
    PromoCouponList,
    CustomerUpdate,
    WalletPromoList,
    AutomatedPromoList,
    AutomatedPromoDelete,
    WalletPromoCreate,
    WalletPromoDelete,
    AutomatedPromoCreate,
    DiscountChargesDelete,
    PromoCouponDelete,
    PromoCouponCreate,
    AppSettingList,
    AppSettingUpdate,
    BannerList,
    BannerCreate,
    BannerDelete,
    DueAmountReportList,
    DatewiseReportList,
    DueOrderListReducer,
    MonthlyReportList,
    ProductWiseReportList,
    WalletHistoryReportList,
    WalletDeleteHistoryReportList,
    WalletBalanceReportList,
    PromoCodeReportList,
    CashDayReportList,
    TaxCollectionReportList,
    TipReportList,
    DiscountChargeReportList,
    ProfitAndLossReportList,
    ExpensesReportList,
    IncomeReportList,
    ProductList,
    RetailProductWiseReportList,
    BannerDetail,
    BannerUpdate,
    HomePageSettingList,
    HomePageSettingUpadte,
    DoordashSettingList,
    DoordashSettingUpdate,
    PromoCouponDetail,
    PromoCouponUpadte,
    WalletPromoDetail,
    WalletPromoUpdate,
    DiscountChargesDetail,
    DiscountChargesUpdate,
    CustomerDue,
    PaymentAdjustmentDelete,
    AutomatedPromoDetail,
    AutomatedPromoUpdate,
    DashboardList,
    TodayOrderList,
    OrderStatus
});
