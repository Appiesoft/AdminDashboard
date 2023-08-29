// start login module
export const ADMIN_LOGIN = '/index.php/intapi/api/accounts/login';
export const EMPLOYEE_LOGIN = '/index.php/intapi/api/accounts/login';
export const STORE_LOGIN = '/index.php/intapi/api/accounts/login';
// end login module

// start employee module
export const EMPLOYEE_LIST = '/index.php/intapi/api/employee_list';
export const EMPLOYEE_CREATE = '/index.php/intapi/api/create_employee';
export const EMPLOYEE_UPDATE = '/index.php/intapi/api/update_employee';
export const EMPLOYEE_DETAILS = '/index.php/intapi/api/employee_details';
export const EMPLOYEE_DELETE = '/index.php/intapi/api/delete_employee';
// end employee module

// start transaction module
export const ORDER_LIST = '/index.php/intapi/api/order_list';
export const PICKUP_REQUEST_LIST = '/index.php/intapi/api/pickupRequest';
export const PICKUP_REQUEST_CREATE = '/index.php/intapi/api/create_pickup_request';
export const DELIVERY_REQUEST_LIST = '/index.php/intapi/api/deliveryRequest';
export const DELIVERY_REQUEST_CREATE = '/index.php/intapi/api/create_delivery_request';
export const PACKAGE_LIST = '/index.php/intapi/api/package_list';
export const ASSIGNED_PACKAGE_LIST = '/index.php/intapi/api/assigned_package_list';
export const ASSIGNED_PACKAGE_CREATE = '/index.php/intapi/api/assign_package';
export const ASSIGNED_PACKAGE_DELETE = '/index.php/intapi/api/delete_assign_package';
export const DRIVER_LIST = '/index.php/intapi/api/driver_list';
export const BULK_INVOICE_LIST = '/index.php/intapi/api/bulk_invoice_list';
// end transaction transaction module

// start product and services module
export const BRAND_LIST = '/index.php/intapi/api/brand_list';
export const BRAND_CREATE = '/index.php/intapi/api/create_brand';
export const BRAND_UPDATE = '/index.php/intapi/api/update_brand';
export const BRAND_DELETE = '/index.php/intapi/api/delete_brand';
export const SERVICE_CATEGORY_LIST = '/index.php/intapi/api/service_category_list';
export const SERVICE_CATEGORY_CREATE = '/index.php/intapi/api/create_service_category';
export const SERVICE_CATEGORY_UPDATE = '/index.php/intapi/api/update_service_category';
export const SERVICE_CATEGORY_DELETE = '/index.php/intapi/api/delete_service_category';
export const DEFECT_LIST = '/index.php/intapi/api/defect_list';
export const DEFECT_CREATE = '/index.php/intapi/api/create_defect';
export const DEFECT_UPDATE = '/index.php/intapi/api/update_defect';
export const DEFECT_DELETE = '/index.php/intapi/api/delete_defect';
export const PRODUCTS = '/index.php/intapi/api/product_list';
export const PRODUCT_PATTERNS_LIST = '/index.php/intapi/api/pattern_list';
export const PRODUCT_PATTERNS_CREATE = '/index.php/intapi/api/create_pattern';
export const PRODUCT_PATTERNS_UPDATE = '/index.php/intapi/api/update_pattern';
export const PRODUCT_PATTERNS_DELETE = '/index.php/intapi/api/delete_pattern';
export const PRODUCT_COLOR_LIST = '/index.php/intapi/api/color_list';
export const PRODUCT_COLOR_CREATE = '/index.php/intapi/api/create_color';
export const PRODUCT_COLOR_UPDATE = '/index.php/intapi/api/update_color';
export const COLOR_PRODUCT_DELETE = '/index.php/intapi/api/delete_color';
export const PRODUCT_CATEGORY_LIST = '/index.php/intapi/api/product_category_list';
export const PRODUCT_CATEGORY_CREATE = '/index.php/intapi/api/create_product_category';
export const PRODUCT_CATEGORY_UPDATE = '/index.php/intapi/api/update_product_category';
export const PRODUCT_CATEGORY_DELETE = '/index.php/intapi/api/delete_product_category';
export const PRODUCT_UPCHARGES_LIST = '/index.php/intapi/api/upcharge_list';
export const PRODUCT_UPCHARGES_CREATE = '/index.php/intapi/api/create_upcharge';
export const PRODUCT_UPCHARGES_UPDATE = '/index.php/intapi/api/update_upcharge';
export const PRODUCT_UPCHARGES_DELETE = '/index.php/intapi/api/delete_upcharge';
export const PRODUCT_PRICE_LIST = '/index.php/intapi/api/get_price_list';
export const PRODUCT_PRICE_CREATE = '/index.php/intapi/api/create_price_list';
export const PRODUCT_PRICE_UPDATE = '/index.php/intapi/api/update_delivery_request';
export const PRODUCT_ITEM_LIST = '/index.php/intapi/api/item_list';
export const PRODUCT_ITEM_CREATE = '/index.php/intapi/api/create_item';
export const PRODUCT_ITEM_UPDATE = '/index.php/intapi/api/update_item';
export const PRODUCT_ITEM_DELETE = '/index.php/intapi/api/delete_item';
export const PRODUCT_ITEM_DETAILS = '/index.php/intapi/api/item_details';
export const LAUNDRY_PACKAGES_LIST = '/index.php/intapi/api/package_list';
export const LAUNDRY_PACKAGES_CREATE = '/index.php/intapi/api/create_package';
export const LAUNDRY_PACKAGES_UPDATE = '/index.php/intapi/api/update_package';
export const LAUNDRY_PACKAGES_DELETE = '/index.php/intapi/api/delete_package';
// end product and services module

// start organization module
export const ADMIN_PROFILE_CREATE = '/index.php/intapi/api/admin_profile';
export const ADMIN_PROFILE_UPDATE = '/index.php/intapi/api/update_admin_profile';
export const GENERAL_SETTING = '/index.php/intapi/api/general_setting';
export const GENERAL_UPDATE = '/index.php/intapi/api/update_general_setting';
export const SMS_AND_EMAIL_LIST = '/index.php/intapi/api/sms_and_email';
export const SMS_AND_EMAIL_UPDATE = 'index.php/intapi/api/update_sms_and_email';
export const GROUP_LIST = '/index.php/intapi/api/group_list';
export const GROUP_CREATE = '/index.php/intapi/api/create_group';
export const GROUP_UPDATE = '/index.php/intapi/api/update_group';
export const GROUP_DELETE = '/index.php/intapi/api/delete_group';
// end organization module

// start location store module
export const STORE_LIST = '/index.php/intapi/api/store_list';
export const STORE_CREATE = '/index.php/intapi/api/create_store';
export const STORE_UPDATE = '/index.php/intapi/api/update_store';
export const STORE_DETAILS = '/index.php/intapi/api/store_details';
export const STORE_DELETE = '/index.php/intapi/api/delete_store';
// end location store module

// start payment module
export const PAYMENT_LIST = '/index.php/intapi/api/payment_list';
export const ADVANCE_SETTING_FOR_STRIPE = '/index.php/intapi/api/advance_setting_for_Stripe_list';
export const PAYMENT_TYPE_LIST = '/index.php/intapi/api/payment_methods';
export const PAYMENT_TYPE_CREATE = '/index.php/intapi/api/create_payment_method';
export const PAYMENT_TYPE_UPDATE = '/index.php/intapi/api/update_payment_method';
export const PAYMENT_TYPE_REMOVE = '/index.php/intapi/api/delete_payment_method';
export const PAYMENT_ADJUSTMENT = '/index.php/intapi/api/payment_adjustment_type';
export const PAYMENT_ADJUSTMENTS_CREATE = '/index.php/intapi/api/create_payment_adjustment';
export const PAYMENT_ADJUSTMENTS_UPDATE = '/index.php/intapi/api/update_payment_adjustment';
export const PAYMENT_ADJUSTMENTS_DELETE = '/index.php/intapi/api/delete_payment_adjustment';
export const PAYMENT_SETTING_LIST = '/index.php/intapi/api/payment_setting_details';
export const PAYMENT_CHARGES_LIST = '/index.php/intapi/api/payment_charges_list';
export const PAYMENT_CHARGES_CREATE = '/index.php/intapi/api/create_payment_charges';
export const PAYMENT_CHARGES_UPDATE = '/index.php/intapi/api/update_payment_charges';
export const PAYMENT_CHARGES_REMOVE = '/index.php/intapi/api/remove_payment_charges';
// end payment module

// ============== mileStone start - 2 ===========================

// start customer module
export const CUSTOMER_LIST = '/index.php/intapi/customers/customer_list';
export const CUSTOMER_CREATE = '/index.php/intapi/customers/create_customer';
export const CUSTOMER_DETAIL = '/index.php/intapi/customers/customer_details';
export const CUSTOMER_DUE = '/index.php/intapi/customers/customer_dues';
export const CUSTOMER_UPDATE = '/index.php/intapi/customers/update_customer';
export const CUSTOMER_DELETE = '/index.php/intapi/customers/delete_customer';
export const CUSTOMER_ACTIVE_LIST = '/index.php/intapi/customers/customer_active_passive_list';
// end customer module

// start promotions module
export const PROMO_COUPONS_LIST = '/index.php/intapi/promotions/promo_coupon_list';
export const PROMO_COUPONS_CREATE = '/index.php/intapi/promotions/create_promo_coupon';
export const PROMO_COUPONS_DETAIL = '/index.php/intapi/promotions/promo_coupon_details';
export const PROMO_COUPONS_UPDATE = '/index.php/intapi/promotions/update_promo_coupon';
export const PROMO_COUPONS_DELETE = '/index.php/intapi/promotions/delete_promo_coupon';
export const WALLET_PROMO_LIST = '/index.php/intapi/promotions/wallet_promo_list';
export const WALLET_PROMO_CREATE = '/index.php/intapi/promotions/create_wallet_promo';
export const WALLET_PROMO_DETAIL = '/index.php/intapi/promotions/wallet_promo_details';
export const WALLET_PROMO_UPDATE = '/index.php/intapi/promotions/update_wallet_promo';
export const WALLET_PROMO_DELETE = '/index.php/intapi/promotions/delete_wallet_promo';
export const DISCOUNT_CHARGES_LIST = '/index.php/intapi/promotions/discount_charges_list';
export const DISCOUNT_CHARGES_CREATE = '/index.php/intapi/promotions/create_discount_charges';
export const DISCOUNT_CHARGES_DETAIL = '/index.php/intapi/promotions/discount_charges_details';
export const DISCOUNT_CHARGES_UPDATE = '/index.php/intapi/promotions/update_discount_charges';
export const DISCOUNT_CHARGES_DELETE = '/index.php/intapi/promotions/delete_discount_charges';
export const AUTOMATED_PROMO_LIST = '/index.php/intapi/promotions/automated_promo_list';
export const AUTOMATED_PROMO_CREATE = '/index.php/intapi/promotions/create_automated_promo';
export const AUTOMATED_PROMO_DETAIL = '/index.php/intapi/promotions/automated_promo_details';
export const AUTOMATED_PROMO_UPDATE = '/index.php/intapi/promotions/update_automated_promo';
export const AUTOMATED_PROMO_DELETE = '/index.php/intapi/promotions/delete_automated_promo';
// end promotions module

// start app setting module
export const APP_SETTING = '/index.php/intapi/app_setting/list';
export const APP_SETTING_UPDATE = '/index.php/intapi/app_setting/update_app_setting';
export const BANNER_LIST = '/index.php/intapi/app_setting/banner_list';
export const BANNER_CREATE = '/index.php/intapi/app_setting/create_banner';
export const BANNER_DETAIL = '/index.php/intapi/app_setting/banner_details';
export const BANNER_UPDATE = '/index.php/intapi/app_setting/update_banner';
export const BANNER_DELETE = '/index.php/intapi/app_setting/delete_banner';
export const HOME_PAGE_SETTING = '/index.php/intapi/app_setting/home_page_setting_list';
export const HOME_PAGE_SETTING_UPDATE = '/index.php/intapi/app_setting/update_home_page_setting';
export const DOORDESH_SETTING_LIST = '/index.php/intapi/app_setting/doordash_setting_list';
export const DOORDESH_SETTING_UPDATE = '/index.php/intapi/app_setting/update_doordash_setting';

// end app setting module

//start Analytics
export const DUE_AMOUNT_REPORT_LIST = '/index.php/intapi/reports/due_amount_report';
export const DATEWISE_REPORT = '/index.php/intapi/reports/datewise_report';
export const DUE_ORDER_LIST = '/index.php/intapi/reports/due_order_list';
export const MONTHLY_REPORT_LIST = '/index.php/intapi/reports/monthly_report';
export const WALLET_HISTORY_REPORT_LIST = '/index.php/intapi/reports/wallet_history_report';
export const EXPENSES_REPORT_LIST = '/index.php/intapi/reports/expenses_report';
export const INCOME_REPORT_LIST = '/index.php/intapi/reports/income_report';
export const PRODUCT_LIST = '/index.php/intapi/reports/product_list';
export const PRODUCT_WISE_REPORT_LIST = '/index.php/intapi/reports/product_wise_report';
export const WALLET_DELETE_HISTORY_REPORT_LIST = '/index.php/intapi/reports/wallet_delete_history_report';
export const WALLET_BALANCE_REPORT_LIST = '/index.php/intapi/reports/wallet_balance_report';
export const PROMO_CODE_REPORT_LIST = '/index.php/intapi/reports/promo_code_report';
export const CASH_DAY_REPORT_LIST = '/index.php/intapi/reports/cash_day_report';
export const TAX_COLLECTION_REPORT_LIST = '/index.php/intapi/reports/tax_collection_report';
export const TIP_REPORT_LIST = '/index.php/intapi/reports/tip_report';
export const PROFIT_AND_LOSS_REPORT_LIST = '/index.php/intapi/reports/profit_and_loss_report';
export const DISCOUNT_CHARGES_REPORT_LIST = '/index.php/intapi/reports/discount_charges_report';
export const RETAIL_PRODUCT_WISE_REPORT_LIST = '/index.php/intapi/reports/retail_product_wise_report';
//end Analytics

// start dashboard
export const DASHBOARD = '/index.php/intapi/dashboard/admin';
export const TODAY_ORDER_LIST = '/index.php/intapi/dashboard/todays_order';
export const ORDER_STATUS = '/index.php/intapi/api/order_status';
// end dashboard
