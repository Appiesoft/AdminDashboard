import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Root from './Root';
import * as layoutConstants from '../constants/layout';

// All layouts/containers
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';
import DetachedLayout from '../layouts/Detached';
import HorizontalLayout from '../layouts/Horizontal';
import FullLayout from '../layouts/Full';
import MonthlyReportListTable from '../pages/analytics/monthlyReportList/monthlyReportListTable/MonthlyReportListTable';
import RetailProductWiseReportListTable from '../pages/analytics/retailProductWiseReportList/RetailProductWiseReportListTable/RetailProductWiseReportListTable';
// ORIGINAL ROUTE

//Employee Route
const Employee = React.lazy(() => import('../pages/Employee'));
const EmployeeTable = React.lazy(() => import('../pages/Employee/employeeTable'));
const CreateEmployee = React.lazy(() => import('../pages/Employee/createEmployee'));

//Transaction Route
const OrderList = React.lazy(() => import('../pages/transaction/orderList/index'));
const OrderTable = React.lazy(() => import('../pages/transaction/orderTable'));
const PickupRequestListTable = React.lazy(() => import('../pages/transaction/pickupRequestList/Index'));
const Pickup = React.lazy(() => import('../pages/transaction/pickup'));
const DeliveryRequesList = React.lazy(() => import('../pages/transaction/deliveryRequestList/Index'));
const Delivery = React.lazy(() => import('../pages/transaction/delivery'));
const PackagesList = React.lazy(() => import('../pages/transaction/packagesList/Index'));
const Package = React.lazy(() => import('../pages/transaction/package'));
const BulkTable = React.lazy(() => import('../pages/transaction/bulkInvoiceList/Index'));
const BulkInvoice = React.lazy(() => import('../pages/transaction/bulkInvoice'));
const DriverList = React.lazy(() => import('../pages/transaction/driverList/Index'));
const Driver = React.lazy(() => import('../pages/transaction/driver'));

//Products & Service Route
const PriceList = React.lazy(() => import('../pages/productAndServices/priceList/Index'));
const Price = React.lazy(() => import('../pages/productAndServices/price'));
const AddPriceListItem = React.lazy(() => import('../pages/productAndServices/price/addItem'));
const ServiceCategory = React.lazy(() => import('../pages/productAndServices/serviceCategory/Index'));
const ServiceAndCategory = React.lazy(() => import('../pages/productAndServices/service_category'));
const AddServiceCategory = React.lazy(() => import('../pages/productAndServices/service_category/addServiceCategory'));
const ProductCategory = React.lazy(() => import('../pages/productAndServices/productCategory/Index'));
const Products = React.lazy(() => import('../pages/productAndServices/products'));
const ProductBrand = React.lazy(() => import('../pages/productAndServices/productBrand/Index'));
const Product_Brands = React.lazy(() => import('../pages/productAndServices/product_Brand/index'));
const ProductDefects = React.lazy(() => import('../pages/productAndServices/productDefects/Index'));
const Product_Defects = React.lazy(() => import('../pages/productAndServices/product_Defects'));
const ProductPatterns = React.lazy(() => import('../pages/productAndServices/productPatterns/Index'));
const Product_Patterns = React.lazy(() => import('../pages/productAndServices/product_Patterns'));
const ProductColor = React.lazy(() => import('../pages/productAndServices/productColor/Index'));
const Product_Color = React.lazy(() => import('../pages/productAndServices/product_Color'));
const Upcharges = React.lazy(() => import('../pages/productAndServices/upCharges/Index'));
const Up_Charges = React.lazy(() => import('../pages/productAndServices/up_Charges'));
const LaundryPackages = React.lazy(() => import('../pages/productAndServices/laundryPackages/Index'));
const Laundry_Packages = React.lazy(() => import('../pages/productAndServices/laundry_Packages'));
const NewLaundryPackages = React.lazy(() => import('../pages/productAndServices/laundry_Packages/NewEntry'));

// Organization Settings
const AdminProfile = React.lazy(() => import('../pages/organizationSettings/adminSetting/Index'));
const Admin = React.lazy(() => import('../pages/organizationSettings/admin'));
const GeneralSettings = React.lazy(() => import('../pages/organizationSettings/generalSettings/Index'));
const OrganizationSettings = React.lazy(() => import('../pages/organizationSettings/settings'));
const SmsEmailSetting = React.lazy(() => import('../pages/organizationSettings/sms&EmailSettings/Index'));
const SmsAndEmail = React.lazy(() => import('../pages/organizationSettings/smsAndEmail'));
const Groups = React.lazy(() => import('../pages/organizationSettings/groupAndRoles/groups/Index'));
const Group = React.lazy(() => import('../pages/organizationSettings/groups/index'));
const RolePermission = React.lazy(() => import('../pages/organizationSettings/groupAndRoles/role&Permission/Index'));
const RoleAndPermission = React.lazy(() => import('../pages/organizationSettings/roleAndPermission'));

//Location Setting
const StoreSettings = React.lazy(() => import('../pages/locationSetting/storeSettings/Index'));
const Stores = React.lazy(() => import('../pages/locationSetting/storeSettings/stores'));
const StoreForm = React.lazy(() => import('../pages/locationSetting/storeSettings/stores/addStore'));

//Payments
const PaymentType = React.lazy(() => import('../pages/payments/paymentType/Index'));
const Payment_Type = React.lazy(() => import('../pages/payments/payment_Type'));
const PaymentAdjustment = React.lazy(() => import('../pages/payments/paymentAdjustment/Index'));
const Payment_Adjustment = React.lazy(() => import('../pages/payments/payment_Adjustment'));
const PaymentSetting = React.lazy(() => import('../pages/payments/paymentSettings/Index'));
const Payment_Setting = React.lazy(() => import('../pages/payments/payment_Settings'));
const AdvanceSettingForStripe = React.lazy(() => import('../pages/payments/advanceSettingForStripe/Index'));
const TipSetting = React.lazy(() => import('../pages/payments/tipSetting/Index'));
const PaymentCharges = React.lazy(() => import('../pages/payments/paymentCharges/Index'));
const PaymentList = React.lazy(() => import('../pages/payments/paymentList/Index'));
const Payment_List=React.lazy(()=>import('../pages/payments/payment_List'))

// customer
const AddNewCustomer = React.lazy(() => import('../pages/customer/addNewCustomer/Index'));
const CreateCustomer = React.lazy(() => import('../pages/customer/createNewCustomer'));
const CustomerList = React.lazy(() => import('../pages/customer/Index'));
const CustomerTable = React.lazy(() => import('../pages/customer/customerTable'));
const CustomerDetail = React.lazy(() => import('../pages/customer/customerList/customerDetail/CustomerDetailTable'));
const CustomerDetails = React.lazy(() => import('../pages/customer/customerTable/customerDetails'));
const CustomerDues = React.lazy(() => import('../pages/customer/customerDues/Index'));

// analytics
const DatewiseReport = React.lazy(() => import('../pages/analytics/datewiseReportList/Index'));
const MonthlyReport = React.lazy(() => import('../pages/analytics/monthlyReportList/Index'));
const DueAmountReport = React.lazy(() => import('../pages/analytics/dueAmountReportList/Index'));
const DueOrderList = React.lazy(() => import('../pages/analytics/dueOrderList/Index'));
const ExpensesReport = React.lazy(() => import('../pages/analytics/expensesReportList/Index'));
const IncomeReport = React.lazy(() => import('../pages/analytics/incomeReportList/Index'));
const ProductList = React.lazy(() => import('../pages/analytics/productList/Index'));
const ProductWiseReport = React.lazy(() => import('../pages/analytics/productWiseReportList/Index'));
const WalletDeleteHistoryReport = React.lazy(() => import('../pages/analytics/walletDeleteHistoryReportList/Index'));
const WalletBalanceList = React.lazy(() => import('../pages/analytics/walletBalanceListReport/Index'));
const PromoCodeReportList = React.lazy(() => import('../pages/analytics/promoCodeReportList/Index'));
const RetailProductWiseReport = React.lazy(() => import('../pages/analytics/retailProductWiseReportList/Index'));
const AttendanceReport = React.lazy(() => import('../pages/analytics/attendanceReport/Index'));
const DicountChargesReportList = React.lazy(() => import('../pages/analytics/discountChargesReportListTable/Index'));
const CashDayReportList = React.lazy(() => import('../pages/analytics/cashDayReportList/Index'));
const ProfitAndLoss = React.lazy(() => import('../pages/analytics/profitAndLoss/Index'));
const WalletHistoryList = React.lazy(() => import('../pages/analytics/walletHistoryList/Index'));
const TaxCollectionReport = React.lazy(() => import('../pages/analytics/taxCollectionReportList/Index'));
const TipReport = React.lazy(() => import('../pages/analytics/tipReportList/Index'));

//end

// App setting
const AppSetting = React.lazy(() => import('../pages/appSetting/appSetting/Index'));
const Banner = React.lazy(() => import('../pages/appSetting/banner/Index'));
const DoorDashSetting = React.lazy(() => import('../pages/appSetting/doordashSetting/Index'));

//Promotions
const Promotions = React.lazy(() => import('../pages/promotion/promotions/Index'));
const WalletPromo = React.lazy(() => import('../pages/promotion/walletPromo/Index'));
const Discount = React.lazy(() => import('../pages/promotion/discount/Index'));
const AutoMatedPromo = React.lazy(() => import('../pages/promotion/automatedPromo/Index'));

// lazy load all the views
// auth
const Login = React.lazy(() => import('../pages/account/Login'));
const Logout = React.lazy(() => import('../pages/account/Logout'));
const Register = React.lazy(() => import('../pages/account/Register'));
const Confirm = React.lazy(() => import('../pages/account/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/account/ForgetPassword'));
const LockScreen = React.lazy(() => import('../pages/account/LockScreen'));

const Login2 = React.lazy(() => import('../pages/account2/Login2'));
const Logout2 = React.lazy(() => import('../pages/account2/Logout2'));
const Register2 = React.lazy(() => import('../pages/account2/Register2'));
const Confirm2 = React.lazy(() => import('../pages/account2/Confirm2'));
const ForgetPassword2 = React.lazy(() => import('../pages/account2/ForgetPassword2'));
const LockScreen2 = React.lazy(() => import('../pages/account2/LockScreen2'));

// dashboard
const AnalyticsDashboard = React.lazy(() => import('../pages/dashboard/Analytics'));
const EcommerceDashboard = React.lazy(() => import('../pages/dashboard/Ecommerce'));
const ProjectDashboard = React.lazy(() => import('../pages/dashboard/Project'));
const EWalletDashboard = React.lazy(() => import('../pages/dashboard/E-Wallet'));

// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
const Projects = React.lazy(() => import('../pages/apps/Projects'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Projects/Detail'));
const ProjectGannt = React.lazy(() => import('../pages/apps/Projects/Gantt'));
const ProjectForm = React.lazy(() => import('../pages/apps/Projects/ProjectForm'));

// - chat
const ChatApp = React.lazy(() => import('../pages/apps/Chat'));

// -crm
const CRMDashboard = React.lazy(() => import('../pages/apps/CRM/Dashboard'));
const CRMProjects = React.lazy(() => import('../pages/apps/CRM/Projects'));
const CRMManagement = React.lazy(() => import('../pages/apps/CRM/Management'));
const CRMClients = React.lazy(() => import('../pages/apps/CRM/Clients'));
const CRMOrderList = React.lazy(() => import('../pages/apps/CRM/OrderList'));

// - ecommece pages
const EcommerceProducts = React.lazy(() => import('../pages/apps/Ecommerce/Products'));
const ProductDetails = React.lazy(() => import('../pages/apps/Ecommerce/ProductDetails'));
const Orders = React.lazy(() => import('../pages/apps/Ecommerce/Orders'));
const OrderDetails = React.lazy(() => import('../pages/apps/Ecommerce/OrderDetails'));
const Customers = React.lazy(() => import('../pages/apps/Ecommerce/Customers'));
const Cart = React.lazy(() => import('../pages/apps/Ecommerce/Cart'));
const Checkout = React.lazy(() => import('../pages/apps/Ecommerce/Checkout'));
const Sellers = React.lazy(() => import('../pages/apps/Ecommerce/Sellers'));

// - email
const Inbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));

// - social
const SocialFeed = React.lazy(() => import('../pages/apps/SocialFeed'));

// - tasks
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List'));
const TaskDetails = React.lazy(() => import('../pages/apps/Tasks/Details'));
const Kanban = React.lazy(() => import('../pages/apps/Tasks/Board'));
// - file
const FileManager = React.lazy(() => import('../pages/apps/FileManager'));

// pages
const Profile = React.lazy(() => import('../pages/profile'));
const Profile2 = React.lazy(() => import('../pages/profile2'));
const ErrorPageNotFound = React.lazy(() => import('../pages/error/PageNotFound'));
const ErrorPageNotFoundAlt = React.lazy(() => import('../pages/error/PageNotFoundAlt'));
const ServerError = React.lazy(() => import('../pages/error/ServerError'));

// - other
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const FAQ = React.lazy(() => import('../pages/other/FAQ'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));
const Maintenance = React.lazy(() => import('../pages/other/Maintenance'));
const Starter = React.lazy(() => import('../pages/other/Starter'));
const PreLoader = React.lazy(() => import('../pages/other/PreLoader'));
const Timeline = React.lazy(() => import('../pages/other/Timeline'));

const Landing = React.lazy(() => import('../pages/landing'));

// uikit
const Accordions = React.lazy(() => import('../pages/uikit/Accordions'));
const Alerts = React.lazy(() => import('../pages/uikit/Alerts'));
const Avatars = React.lazy(() => import('../pages/uikit/Avatars'));
const Badges = React.lazy(() => import('../pages/uikit/Badges'));
const Breadcrumbs = React.lazy(() => import('../pages/uikit/Breadcrumb'));
const Buttons = React.lazy(() => import('../pages/uikit/Buttons'));
const Cards = React.lazy(() => import('../pages/uikit/Cards'));
const Carousels = React.lazy(() => import('../pages/uikit/Carousel'));
const Dropdowns = React.lazy(() => import('../pages/uikit/Dropdowns'));
const EmbedVideo = React.lazy(() => import('../pages/uikit/EmbedVideo'));
const Grid = React.lazy(() => import('../pages/uikit/Grid'));
const ListGroups = React.lazy(() => import('../pages/uikit/ListGroups'));
const Modals = React.lazy(() => import('../pages/uikit/Modals'));
const Notifications = React.lazy(() => import('../pages/uikit/Notifications'));
const Offcanvases = React.lazy(() => import('../pages/uikit/Offcanvas'));
const Paginations = React.lazy(() => import('../pages/uikit/Paginations'));
const Popovers = React.lazy(() => import('../pages/uikit/Popovers'));
const Progress = React.lazy(() => import('../pages/uikit/Progress'));
const Ribbons = React.lazy(() => import('../pages/uikit/Ribbons'));
const Spinners = React.lazy(() => import('../pages/uikit/Spinners'));
const Tabs = React.lazy(() => import('../pages/uikit/Tabs'));
const Tooltips = React.lazy(() => import('../pages/uikit/Tooltips'));
const Typography = React.lazy(() => import('../pages/uikit/Typography'));
const DragDrop = React.lazy(() => import('../pages/uikit/DragDrop'));
const RangeSliders = React.lazy(() => import('../pages/uikit/RangeSliders'));
const Ratings = React.lazy(() => import('../pages/uikit/Ratings'));

// icons
const Dripicons = React.lazy(() => import('../pages/icons/Dripicons'));
const MDIIcons = React.lazy(() => import('../pages/icons/MDIIcons'));
const Unicons = React.lazy(() => import('../pages/icons/Unicons'));

// forms
const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editors = React.lazy(() => import('../pages/forms/Editors'));

// charts
const ApexChart = React.lazy(() => import('../pages/charts/Apex'));
const BriteChart = React.lazy(() => import('../pages/charts/Brite'));
const ChartJs = React.lazy(() => import('../pages/charts/ChartJs'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));

// widgets
const Widgets = React.lazy(() => import('../pages/uikit/Widgets'));

// maps
const GoogleMaps = React.lazy(() => import('../pages/maps/GoogleMaps'));
const VectorMaps = React.lazy(() => import('../pages/maps/VectorMaps'));

const loading = () => <div className=""> </div>;

type LoadComponentProps = {
    component: React.LazyExoticComponent<() => JSX.Element>,
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
    <Suspense fallback={loading()}>
        <Component />
    </Suspense>
);

const AllRoutes = () => {
    const { layout } = useSelector((state) => ({
        layout: state.Layout,
    }));

    const getLayout = () => {
        let layoutCls = VerticalLayout;

        switch (layout.layoutType) {
            case layoutConstants.LAYOUT_HORIZONTAL:
                layoutCls = HorizontalLayout;
                break;
            case layoutConstants.LAYOUT_DETACHED:
                layoutCls = DetachedLayout;
                break;
            case layoutConstants.LAYOUT_FULL:
                layoutCls = FullLayout;
                break;
            default:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    };
    let Layout = getLayout();

    return useRoutes([
        { path: '/', element: <Root /> },
        {
            // public routes
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    path: 'account',
                    children: [
                        { path: 'login', element: <LoadComponent component={Login} /> },
                        { path: 'register', element: <LoadComponent component={Register} /> },
                        { path: 'confirm', element: <LoadComponent component={Confirm} /> },
                        { path: 'forget-password', element: <LoadComponent component={ForgetPassword} /> },
                        { path: 'lock-screen', element: <LoadComponent component={LockScreen} /> },
                        { path: 'logout', element: <LoadComponent component={Logout} /> },
                        { path: 'login2', element: <LoadComponent component={Login2} /> },
                        { path: 'register2', element: <LoadComponent component={Register2} /> },
                        { path: 'confirm2', element: <LoadComponent component={Confirm2} /> },
                        { path: 'forget-password2', element: <LoadComponent component={ForgetPassword2} /> },
                        { path: 'lock-screen2', element: <LoadComponent component={LockScreen2} /> },
                        { path: 'logout2', element: <LoadComponent component={Logout2} /> },
                    ],
                },
                {
                    path: 'error-404',
                    element: <LoadComponent component={ErrorPageNotFound} />,
                },
                {
                    path: 'error-500',
                    element: <LoadComponent component={ServerError} />,
                },
                {
                    path: 'maintenance',
                    element: <LoadComponent component={Maintenance} />,
                },
                {
                    path: 'landing',
                    element: <LoadComponent component={Landing} />,
                },
            ],
        },
        {
            // auth protected routes
            path: '/',
            element: <PrivateRoute roles={'Admin'} component={Layout} />,
            children: [
                {
                    path: 'dashboard',
                    children: [
                        {
                            path: 'analytics',
                            element: <LoadComponent component={AnalyticsDashboard} />,
                        },
                        {
                            path: 'ecommerce',
                            element: <LoadComponent component={EcommerceDashboard} />,
                        },
                        {
                            path: 'project',
                            element: <LoadComponent component={ProjectDashboard} />,
                        },
                        {
                            path: 'e-wallet',
                            element: <LoadComponent component={EWalletDashboard} />,
                        },
                    ],
                },
                {
                    path: '/',
                    children: [
                        {
                            path: 'employee',
                            element: <LoadComponent component={Employee} />,
                        },
                        {
                            path: 'employeeTable',
                            element: <LoadComponent component={EmployeeTable} />,
                        },
                        {
                            path: 'createEmployee',
                            element: <LoadComponent component={CreateEmployee} />,
                        },
                        {
                            path: '/createEmployee/:empId',
                            element: <LoadComponent component={CreateEmployee} />,
                        },
                    ],
                },
                {
                    path: 'transactions',
                    children: [
                        {
                            path: 'orderlist',
                            element: <LoadComponent component={OrderList} />,
                        },
                        {
                            path: 'orderTable',
                            element: <LoadComponent component={OrderTable} />,
                        },
                        {
                            path: 'pickuprequestlist',
                            element: <LoadComponent component={PickupRequestListTable} />,
                        },
                        {
                            path: 'pickup',
                            element: <LoadComponent component={Pickup} />,
                        },
                        {
                            path: 'deliveryRequeslist',
                            element: <LoadComponent component={DeliveryRequesList} />,
                        },
                        {
                            path: 'delivery',
                            element: <LoadComponent component={Delivery} />,
                        },
                        {
                            path: 'packageslist',
                            element: <LoadComponent component={PackagesList} />,
                        },
                        {
                            path: 'packages',
                            element: <LoadComponent component={Package} />,
                        },
                        {
                            path: 'bulkinvoicelist',
                            element: <LoadComponent component={BulkTable} />,
                        },
                        {
                            path: 'bulkinvoice',
                            element: <LoadComponent component={BulkInvoice} />,
                        },
                        {
                            path: 'driverlist',
                            element: <LoadComponent component={DriverList} />,
                        },
                        {
                            path: 'driver',
                            element: <LoadComponent component={Driver} />,
                        },
                    ],
                },
                {
                    path: 'productservices',
                    children: [
                        {
                            path: 'pricelist',
                            element: <LoadComponent component={PriceList} />,
                        },
                        {
                            path: 'price',
                            element: <LoadComponent component={Price} />,
                        },
                        {
                            path: `addPriceListItem/:priceListId`,
                            element: <LoadComponent component={AddPriceListItem} />,
                        },
                        {
                            path: 'servicecategory',
                            element: <LoadComponent component={ServiceCategory} />,
                        },
                        {
                            path: 'serviceAndCategory',
                            element: <LoadComponent component={ServiceAndCategory} />,
                        },
                        {
                            path: 'serviceAndCategory/add',
                            element: <LoadComponent component={AddServiceCategory} />,
                        },
                        {
                            path: 'serviceAndCategory/add/:serviceId',
                            element: <LoadComponent component={AddServiceCategory} />,
                        },
                        {
                            path: 'productcategory',
                            element: <LoadComponent component={ProductCategory} />,
                        },
                        {
                            path: 'products',
                            element: <LoadComponent component={Products} />,
                        },
                        {
                            path: 'productbrand',
                            element: <LoadComponent component={ProductBrand} />,
                        },
                        {
                            path: 'productBrands',
                            element: <LoadComponent component={Product_Brands} />,
                        },
                        {
                            path: 'productdefects',
                            element: <LoadComponent component={ProductDefects} />,
                        },
                        {
                            path: 'productDefect',
                            element: <LoadComponent component={Product_Defects} />,
                        },
                        {
                            path: 'productpatterns',
                            element: <LoadComponent component={ProductPatterns} />,
                        },
                        {
                            path: 'productPattern',
                            element: <LoadComponent component={Product_Patterns} />,
                        },
                        {
                            path: 'productcolor',
                            element: <LoadComponent component={ProductColor} />,
                        },
                        {
                            path: 'productColors',
                            element: <LoadComponent component={Product_Color} />,
                        },
                        {
                            path: 'upcharges',
                            element: <LoadComponent component={Upcharges} />,
                        },
                        {
                            path: 'upCharge',
                            element: <LoadComponent component={Up_Charges} />,
                        },
                        {
                            path: 'laundrypackages',
                            element: <LoadComponent component={LaundryPackages} />,
                        },
                        {
                            path: 'laundryPackage',
                            element: <LoadComponent component={Laundry_Packages} />,
                        },
                        {
                            path: 'laundryPackage/add',
                            element: <LoadComponent component={NewLaundryPackages} />,
                        },
                    ],
                },
                {
                    path: 'organization',
                    children: [
                        {
                            path: 'adminprofile',
                            element: <LoadComponent component={AdminProfile} />,
                        },
                        {
                            path: 'admin',
                            element: <LoadComponent component={Admin} />,
                        },
                        {
                            path: 'generalsettings',
                            element: <LoadComponent component={GeneralSettings} />,
                        },
                        {
                            path: 'settings',
                            element: <LoadComponent component={OrganizationSettings} />,
                        },
                        {
                            path: 'smsemailsetting',
                            element: <LoadComponent component={SmsEmailSetting} />,
                        },
                        {
                            path: 'smsandemail',
                            element: <LoadComponent component={SmsAndEmail} />,
                        },
                        {
                            path: 'groups',
                            element: <LoadComponent component={Groups} />,
                        },
                        {
                            path: 'group',
                            element: <LoadComponent component={Group} />,
                        },
                        {
                            path: 'rolepermission',
                            element: <LoadComponent component={RolePermission} />,
                        },
                        {
                            path: 'roleandpermission',
                            element: <LoadComponent component={RoleAndPermission} />,
                        },
                    ],
                },

                {
                    path: 'locationsetting',
                    children: [
                        {
                            path: 'storesettings',
                            element: <LoadComponent component={StoreSettings} />,
                        },
                        {
                            path: 'stores',
                            element: <LoadComponent component={Stores} />,
                        },
                        {
                            path: 'store',
                            element: <LoadComponent component={StoreForm} />,
                        },
                        {
                            path: 'store/:storeId',
                            element: <LoadComponent component={StoreForm} />,
                        },
                    ],
                },
                {
                    path: 'payments',
                    children: [
                        {
                            path: 'paymenttype',
                            element: <LoadComponent component={PaymentType} />,
                        },
                        {
                            path: 'paymentTypes',
                            element: <LoadComponent component={Payment_Type} />,
                        },
                        {
                            path: 'paymentadjustment',
                            element: <LoadComponent component={PaymentAdjustment} />,
                        },
                        {
                            path: 'paymentAdjustments',
                            element: <LoadComponent component={Payment_Adjustment} />,
                        },
                        {
                            path: 'paymentsetting',
                            element: <LoadComponent component={PaymentSetting} />,
                        },
                        {
                            path: 'paymentSettings',
                            element: <LoadComponent component={Payment_Setting} />,
                        },
                        {
                            path: 'advancesettingforstripe',
                            element: <LoadComponent component={AdvanceSettingForStripe} />,
                        },
                        {
                            path: 'tipsetting',
                            element: <LoadComponent component={TipSetting} />,
                        },
                        {
                            path: 'paymentcharges',
                            element: <LoadComponent component={PaymentCharges} />,
                        },
                        {
                            path: 'paymentlist',
                            element: <LoadComponent component={PaymentList} />,
                        },
                        {
                            path: 'paymentLists',
                            element: <LoadComponent component={Payment_List} />,
                        },
                    ],
                },

                {
                    path: 'customer',
                    children: [
                        {
                            path: 'addnewcustomer',
                            element: <LoadComponent component={AddNewCustomer} />,
                        },
                        {
                            path: 'createcustomer',
                            element: <LoadComponent component={CreateCustomer} />,
                        },

                        {
                            path: 'customerlist',
                            element: <LoadComponent component={CustomerList} />,
                        },
                        {
                            path: 'customerTable',
                            element: <LoadComponent component={CustomerTable} />,
                        },
                        {
                            path: 'customerdetail',
                            element: <LoadComponent component={CustomerDetail} />,
                        },
                        {
                            path: 'customerdetail/:customerId',
                            element: <LoadComponent component={CustomerDetails} />,
                        },
                        {
                            path: 'customerdues',
                            element: <LoadComponent component={CustomerDues} />,
                        },
                    ],
                },

                {
                    path: 'analytics',
                    children: [
                        {
                            path: 'datewisereport',
                            element: <LoadComponent component={DatewiseReport} />,
                        },
                        {
                            path: 'monthlyreport',
                            element: <LoadComponent component={MonthlyReport} />,
                        },
                        {
                            path: 'dueamountreport',
                            element: <LoadComponent component={DueAmountReport} />,
                        },
                        {
                            path: 'dueorderlist',
                            element: <LoadComponent component={DueOrderList} />,
                        },
                        {
                            path: 'expensesreport',
                            element: <LoadComponent component={ExpensesReport} />,
                        },
                        {
                            path: 'incomereport',
                            element: <LoadComponent component={IncomeReport} />,
                        },
                        {
                            path: 'productlist',
                            element: <LoadComponent component={ProductList} />,
                        },
                        {
                            path: 'wallethistorylist',
                            element: <LoadComponent component={WalletHistoryList} />,
                        },
                        {
                            path: 'productwisereport',
                            element: <LoadComponent component={ProductWiseReport} />,
                        },
                        {
                            path: 'walletdeletehistoryreport',
                            element: <LoadComponent component={WalletDeleteHistoryReport} />,
                        },
                        {
                            path: 'walletbalancelist',
                            element: <LoadComponent component={WalletBalanceList} />,
                        },
                        {
                            path: 'promocodereportlist',
                            element: <LoadComponent component={PromoCodeReportList} />,
                        },
                        {
                            path: 'retailproductwisereport',
                            element: <LoadComponent component={RetailProductWiseReport} />,
                        },
                        {
                            path: 'attendancereport',
                            element: <LoadComponent component={AttendanceReport} />,
                        },
                        {
                            path: 'discountchargesreportlist',
                            element: <LoadComponent component={DicountChargesReportList} />,
                        },
                        {
                            path: 'cashdayreportlist',
                            element: <LoadComponent component={CashDayReportList} />,
                        },
                        {
                            path: 'profitandloss',
                            element: <LoadComponent component={ProfitAndLoss} />,
                        },
                        {
                            path: 'taxcollectionreport',
                            element: <LoadComponent component={TaxCollectionReport} />,
                        },
                        {
                            path: 'tipreport',
                            element: <LoadComponent component={TipReport} />,
                        },
                    ],
                },

                {
                    path: 'appssetting',
                    children: [
                        {
                            path: 'appsettings',
                            element: <LoadComponent component={AppSetting} />,
                        },
                        {
                            path: 'banner',
                            element: <LoadComponent component={Banner} />,
                        },
                        {
                            path: 'doordashsetting',
                            element: <LoadComponent component={DoorDashSetting} />,
                        },
                    ],
                },
                {
                    path: 'promotion',
                    children: [
                        {
                            path: 'promotions',
                            element: <LoadComponent component={Promotions} />,
                        },
                        {
                            path: 'walletpromo',
                            element: <LoadComponent component={WalletPromo} />,
                        },
                        {
                            path: 'discount',
                            element: <LoadComponent component={Discount} />,
                        },
                        {
                            path: 'automatedpromo',
                            element: <LoadComponent component={AutoMatedPromo} />,
                        },
                    ],
                },

                {
                    path: 'apps',
                    children: [
                        {
                            path: 'calendar',
                            element: <LoadComponent component={CalendarApp} />,
                        },
                        {
                            path: 'chat',
                            element: <LoadComponent component={ChatApp} />,
                        },

                        {
                            path: 'crm',
                            children: [
                                {
                                    path: 'dashboard',
                                    element: <LoadComponent component={CRMDashboard} />,
                                },
                                {
                                    path: 'projects',
                                    element: <LoadComponent component={CRMProjects} />,
                                },
                                {
                                    path: 'management',
                                    element: <LoadComponent component={CRMManagement} />,
                                },
                                {
                                    path: 'clients',
                                    element: <LoadComponent component={CRMClients} />,
                                },
                                {
                                    path: 'orders',
                                    element: <LoadComponent component={CRMOrderList} />,
                                },
                            ],
                        },
                        {
                            path: 'ecommerce',
                            children: [
                                {
                                    path: 'products',
                                    element: <LoadComponent component={EcommerceProducts} />,
                                },
                                {
                                    path: 'details',
                                    element: <LoadComponent component={ProductDetails} />,
                                },
                                {
                                    path: 'orders',
                                    element: <LoadComponent component={Orders} />,
                                },
                                {
                                    path: 'order/details',
                                    element: <LoadComponent component={OrderDetails} />,
                                },
                                {
                                    path: 'customers',
                                    element: <LoadComponent component={Customers} />,
                                },
                                {
                                    path: 'shopping-cart',
                                    element: <LoadComponent component={Cart} />,
                                },
                                {
                                    path: 'checkout',
                                    element: <LoadComponent component={Checkout} />,
                                },
                                {
                                    path: 'sellers',
                                    element: <LoadComponent component={Sellers} />,
                                },
                            ],
                        },
                        {
                            path: 'email',
                            children: [
                                {
                                    path: 'inbox',
                                    element: <LoadComponent component={Inbox} />,
                                },
                                {
                                    path: 'details',
                                    element: <LoadComponent component={EmailDetail} />,
                                },
                            ],
                        },
                        {
                            path: 'tasks',
                            children: [
                                {
                                    path: 'list',
                                    element: <LoadComponent component={TaskList} />,
                                },
                                {
                                    path: 'kanban',
                                    element: <LoadComponent component={Kanban} />,
                                },
                                {
                                    path: 'details',
                                    element: <LoadComponent component={TaskDetails} />,
                                },
                            ],
                        },

                        {
                            path: 'projects',
                            children: [
                                {
                                    path: 'list',
                                    element: <LoadComponent component={Projects} />,
                                },
                                {
                                    path: 'details',
                                    element: <LoadComponent component={ProjectDetail} />,
                                },
                                {
                                    path: 'gantt',
                                    element: <LoadComponent component={ProjectGannt} />,
                                },
                                {
                                    path: 'new',
                                    element: <LoadComponent component={ProjectForm} />,
                                },
                            ],
                        },
                        {
                            path: 'social',
                            element: <LoadComponent component={SocialFeed} />,
                        },
                        {
                            path: 'file',
                            element: <LoadComponent component={FileManager} />,
                        },
                    ],
                },
                {
                    path: 'pages',
                    children: [
                        {
                            path: 'starter',
                            element: <LoadComponent component={Starter} />,
                        },
                        {
                            path: 'profile',
                            element: <LoadComponent component={Profile} />,
                        },
                        {
                            path: 'profile2',
                            element: <LoadComponent component={Profile2} />,
                        },
                        {
                            path: 'pricing',
                            element: <LoadComponent component={Pricing} />,
                        },
                        {
                            path: 'error-404-alt',
                            element: <LoadComponent component={ErrorPageNotFoundAlt} />,
                        },
                        {
                            path: 'timeline',
                            element: <LoadComponent component={Timeline} />,
                        },
                        {
                            path: 'invoice',
                            element: <LoadComponent component={Invoice} />,
                        },
                        {
                            path: 'faq',
                            element: <LoadComponent component={FAQ} />,
                        },
                        {
                            path: 'preloader',
                            element: <LoadComponent component={PreLoader} />,
                        },
                    ],
                },
                {
                    path: 'ui',
                    children: [
                        {
                            path: 'base-ui',
                            children: [
                                {
                                    path: 'accordions',
                                    element: <LoadComponent component={Accordions} />,
                                },
                                {
                                    path: 'alerts',
                                    element: <LoadComponent component={Alerts} />,
                                },
                                {
                                    path: 'avatars',
                                    element: <LoadComponent component={Avatars} />,
                                },
                                {
                                    path: 'badges',
                                    element: <LoadComponent component={Badges} />,
                                },
                                {
                                    path: 'breadcrumb',
                                    element: <LoadComponent component={Breadcrumbs} />,
                                },
                                {
                                    path: 'buttons',
                                    element: <LoadComponent component={Buttons} />,
                                },
                                {
                                    path: 'cards',
                                    element: <LoadComponent component={Cards} />,
                                },
                                {
                                    path: 'carousel',
                                    element: <LoadComponent component={Carousels} />,
                                },
                                {
                                    path: 'dropdowns',
                                    element: <LoadComponent component={Dropdowns} />,
                                },
                                {
                                    path: 'embedvideo',
                                    element: <LoadComponent component={EmbedVideo} />,
                                },
                                {
                                    path: 'grid',
                                    element: <LoadComponent component={Grid} />,
                                },
                                {
                                    path: 'listgroups',
                                    element: <LoadComponent component={ListGroups} />,
                                },
                                {
                                    path: 'modals',
                                    element: <LoadComponent component={Modals} />,
                                },
                                {
                                    path: 'notifications',
                                    element: <LoadComponent component={Notifications} />,
                                },
                                {
                                    path: 'offcanvas',
                                    element: <LoadComponent component={Offcanvases} />,
                                },
                                {
                                    path: 'paginations',
                                    element: <LoadComponent component={Paginations} />,
                                },
                                // {
                                //     path: 'placeholders',
                                //     element: <LoadComponent component={Placeholders} />,
                                // },
                                {
                                    path: 'popovers',
                                    element: <LoadComponent component={Popovers} />,
                                },
                                {
                                    path: 'progress',
                                    element: <LoadComponent component={Progress} />,
                                },
                                {
                                    path: 'ribbons',
                                    element: <LoadComponent component={Ribbons} />,
                                },
                                {
                                    path: 'spinners',
                                    element: <LoadComponent component={Spinners} />,
                                },
                                {
                                    path: 'tabs',
                                    element: <LoadComponent component={Tabs} />,
                                },
                                {
                                    path: 'tooltips',
                                    element: <LoadComponent component={Tooltips} />,
                                },
                                {
                                    path: 'typography',
                                    element: <LoadComponent component={Typography} />,
                                },
                            ],
                        },
                        {
                            path: 'widgets',
                            element: <LoadComponent component={Widgets} />,
                        },
                        {
                            path: 'extended',
                            children: [
                                {
                                    path: 'dragdrop',
                                    element: <LoadComponent component={DragDrop} />,
                                },
                                {
                                    path: 'rangesliders',
                                    element: <LoadComponent component={RangeSliders} />,
                                },
                                {
                                    path: 'ratings',
                                    element: <LoadComponent component={Ratings} />,
                                },
                            ],
                        },
                        {
                            path: 'icons',
                            children: [
                                {
                                    path: 'unicons',
                                    element: <LoadComponent component={Unicons} />,
                                },
                                {
                                    path: 'mdi',
                                    element: <LoadComponent component={MDIIcons} />,
                                },
                                {
                                    path: 'dripicons',
                                    element: <LoadComponent component={Dripicons} />,
                                },
                            ],
                        },
                        {
                            path: 'forms',
                            children: [
                                {
                                    path: 'basic',
                                    element: <LoadComponent component={BasicForms} />,
                                },
                                {
                                    path: 'advanced',
                                    element: <LoadComponent component={FormAdvanced} />,
                                },
                                {
                                    path: 'validation',
                                    element: <LoadComponent component={FormValidation} />,
                                },
                                {
                                    path: 'wizard',
                                    element: <LoadComponent component={FormWizard} />,
                                },
                                {
                                    path: 'upload',
                                    element: <LoadComponent component={FileUpload} />,
                                },
                                {
                                    path: 'editors',
                                    element: <LoadComponent component={Editors} />,
                                },
                            ],
                        },
                        {
                            path: 'tables',
                            children: [
                                {
                                    path: 'basic',
                                    element: <LoadComponent component={BasicTables} />,
                                },
                                {
                                    path: 'advanced',
                                    element: <LoadComponent component={AdvancedTables} />,
                                },
                            ],
                        },
                        {
                            path: 'charts',
                            children: [
                                {
                                    path: 'apex',
                                    element: <LoadComponent component={ApexChart} />,
                                },
                                {
                                    path: 'brite',
                                    element: <LoadComponent component={BriteChart} />,
                                },
                                {
                                    path: 'chartjs',
                                    element: <LoadComponent component={ChartJs} />,
                                },
                            ],
                        },
                        {
                            path: 'maps',
                            children: [
                                {
                                    path: 'googlemaps',
                                    element: <LoadComponent component={GoogleMaps} />,
                                },
                                {
                                    path: 'vectormaps',
                                    element: <LoadComponent component={VectorMaps} />,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);
};

export { AllRoutes };

//mohit code

// type LoadComponentProps = {
//     component: React.LazyExoticComponent<() => JSX.Element>,
// };

// const LoadComponent = ({ component: Component }: LoadComponentProps) => (
//     <Suspense fallback={loading()} >
//         <Component />
//         < /Suspense>
//         );

// const AllRoutes = () => {
//     const {layout} = useSelector((state) => ({
//             layout: state.Layout,
//     }));

//     const getLayout = () => {
//             let layoutCls = VerticalLayout;

//         switch (layout.layoutType) {
//             case layoutConstants.LAYOUT_HORIZONTAL:
//         layoutCls = HorizontalLayout;
//         break;
//         case layoutConstants.LAYOUT_DETACHED:
//         layoutCls = DetachedLayout;
//         break;
//         case layoutConstants.LAYOUT_FULL:
//         layoutCls = FullLayout;
//         break;
//         default:
//         layoutCls = VerticalLayout;
//         break;
//         }
//         return layoutCls;
//     };
//         let Layout = getLayout();

//         return useRoutes([
//         {path: '/', element: <Root /> },
//         {
//             // public routes
//             path: '/',
//         element: <DefaultLayout />,
//         children: [
//         {
//             path: 'account',
//         children: [
//         {path: 'login', element: <LoadComponent component={Login} /> },
//         {path: 'register', element: <LoadComponent component={Register} /> },
//         {path: 'confirm', element: <LoadComponent component={Confirm} /> },
//         {path: 'forget-password', element: <LoadComponent component={ForgetPassword} /> },
//         {
//             path: 'lock-screen', element: <LoadComponent component={LockScreen} /> },
//         {
//             path: 'logout', element: <LoadComponent component={Logout} /> },
//         {
//             path: 'login2', element: <LoadComponent component={Login2} /> },
//         {
//             path: 'register2', element: <LoadComponent component={Register2} /> },
//         {
//             path: 'confirm2', element: <LoadComponent component={Confirm2} /> },
//         {
//             path: 'forget-password2', element: <LoadComponent component={ForgetPassword2} /> },
//         {
//             path: 'lock-screen2', element: <LoadComponent component={LockScreen2} /> },
//         {
//             path: 'logout2', element: <LoadComponent component={Logout2} /> },
//         ],
//                             },
//         {
//             path: 'error-404',
//         element: <LoadComponent component={ErrorPageNotFound} />,
//                             },
//         {
//             path: 'error-500',
//         element: <LoadComponent component={ServerError} />,
//                             },
//         {
//             path: 'maintenance',
//         element: <LoadComponent component={Maintenance} />,
//                             },
//         {
//             path: 'landing',
//         element: <LoadComponent component={Landing} />,
//                             },
//         ],
//                         },
//         {
//             // auth protected routes
//             path: '/',
//         element: <PrivateRoute roles={'Admin'} component={Layout} />,
//         children: [
//         {
//             path: 'dashboard',
//         children: [
//         {
//             path: 'analytics',
//         element: <LoadComponent component={AnalyticsDashboard} />,
//                         },
//         {
//             path: 'ecommerce',
//         element: <LoadComponent component={EcommerceDashboard} />,
//                         },
//         {
//             path: 'project',
//         element: <LoadComponent component={ProjectDashboard} />,
//                         },
//         {
//             path: 'e-wallet',
//         element: <LoadComponent component={EWalletDashboard} />,
//                         },
//         ],
//                     },
//         {
//             path: '/',
//         children: [{
//             path: 'employee',
//         element: <LoadComponent component={Employee} />,
//                     },]
//                 },
//         {
//             path: 'transactions',
//         children: [
//         {
//             path: 'orderlist',
//         element: <LoadComponent component={OrderList} />,
//                         }
//         ,
//         {
//             path: 'pickuprequestlist',
//         element: <LoadComponent component={PickupRequestListTable} />,
//                 },
//         {
//             path: 'deliveryRequeslist',
//         element: <LoadComponent component={DeliveryRequesList} />,
//                 },
//         {
//             path: 'packageslist',
//         element: <LoadComponent component={PackagesList} />,
//                 }, {
//             path: 'bulkinvoicelist',
//         element: <LoadComponent component={BulkTable} />,
//                 }, {
//             path: 'driverlist',
//         element: <LoadComponent component={DriverList} />,
//                 }
//         ]
//             },
//         {
//             path: 'productservices',
//         children: [
//         {
//             path: 'pricelist',
//         element: <LoadComponent component={PriceList} />,
//                         },
//         {
//             path: 'servicecategory',
//         element: <LoadComponent component={ServiceCategory} />,
//             },
//         {
//             path: 'productcategory',
//         element: <LoadComponent component={ProductCategory} />,
//             },
//         {
//             path: 'productbrand',
//         element: <LoadComponent component={ProductBrand} />,
//             },
//         {
//             path: 'productdefects',
//         element: <LoadComponent component={ProductDefects} />,
//             },
//         {
//             path: 'productpatterns',
//         element: <LoadComponent component={ProductPatterns} />,
//             },
//         {
//             path: 'productcolor',
//         element: <LoadComponent component={ProductColor} />,
//             },
//         {
//             path: 'upcharges',
//         element: <LoadComponent component={Upcharges} />,
//             },
//         {
//             path: 'laundrypackages',
//         element: <LoadComponent component={LaundryPackages} />,
//             }
//         ]
//         },
//         {
//             path: 'organization',
//         children: [{
//             path: 'adminprofile',
//         element: <LoadComponent component={AdminProfile} />,
//                     },
//         {
//             path: 'generalsettings',
//         element: <LoadComponent component={GeneralSettings} />,
//         },
//         {
//             path: 'smsemailsetting',
//         element: <LoadComponent component={SmsEmailSetting} />,
//         },
//         {
//             path: 'groups',
//         element: <LoadComponent component={Groups} />,
//         },
//         {
//             path: 'rolepermission',
//         element: <LoadComponent component={RolePermission} />,
//         },
//         ]
//     },

//         {
//             path: 'locationsetting',
//         children: [{
//             path: 'storesettings',
//         element: <LoadComponent component={StoreSettings} />,
//                     },]
//         },
//         {
//             path: 'payments',
//         children: [
//         {
//             path: 'paymenttype',
//         element: <LoadComponent component={PaymentType} />,
//                         },
//         {
//             path: 'paymentadjustment',
//         element: <LoadComponent component={PaymentAdjustment} />,
// },
//         {
//             path: 'paymentsetting',
//         element: <LoadComponent component={PaymentSetting} />,
// },
//         {
//             path: 'advancesettingforstripe',
//         element: <LoadComponent component={AdvanceSettingForStripe} />,
// },
//         {
//             path: 'tipsetting',
//         element: <LoadComponent component={TipSetting} />,
// },
//         {
//             path: 'paymentcharges',
//         element: <LoadComponent component={PaymentCharges} />,
// },
//         {
//             path: 'paymentlist',
//         element: <LoadComponent component={PaymentList} />,
// }
//         ,]
//                 },
//         {
//             path: 'Customer',
//         children: [{
//             path: 'customerlist',
//         element: <LoadComponent component={CustomerList} />,
//                     }, {
//             path: 'customerdetail',
//         element: <LoadComponent component={CustomerDetail} />
// }]
//                 },

//         {
//             path:'Analytics',
//         children: [{
//             path: 'datewisereport',
//         element: <LoadComponent component={DatewiseReport} />,
//                     },
//         {
//             path: 'monthlyreport',
//         element: <LoadComponent component={MonthlyReport} />,
// },
//         {
//             path: 'dueamountreport',
//         element: <LoadComponent component={DueAmountReport} />,
// },
//         {
//             path: 'dueorderlist',
//         element: <LoadComponent component={DueOrderList} />,
// },
//         {
//             path: 'expensesreport',
//         element: <LoadComponent component={ExpensesReport} />,
// },
//         {
//             path: 'incomereport',
//         element: <LoadComponent component={IncomeReport} />,
// },
//         {
//             path: 'productlist',
//         element: <LoadComponent component={ProductList} />,
// },
//         {
//             path: 'wallethistorylist',
//         element: <LoadComponent component={WalletHistoryList} />,
// },
//         {
//             path: 'productwisereport',
//         element: <LoadComponent component={ProductWiseReport} />,
// },
//         {
//             path: 'walletdeletehistoryreport',
//         element: <LoadComponent component={WalletDeleteHistoryReport} />,
// },
//         {
//             path: 'walletbalancelist',
//         element: <LoadComponent component={WalletBalanceList} />,
// },
//         {
//             path: 'promocodereportlist',
//         element: <LoadComponent component={PromoCodeReportList} />,
// },
//         {
//             path: 'retailproductwisereport',
//         element: <LoadComponent component={RetailProductWiseReport} />,
// },
//         {
//             path: 'attendancereport',
//         element: <LoadComponent component={AttendanceReport} />,
// },
//         {
//             path: 'discountchargesreportlist',
//         element: <LoadComponent component={DicountChargesReportList} />,
// },
//         {
//             path: 'cashdayreportlist',
//         element: <LoadComponent component={CashDayReportList} />,
// },
//         {
//             path: 'profitandloss',
//         element: <LoadComponent component={ProfitAndLoss} />,
// },
//         {
//             path: 'taxcollectionreport',
//         element: <LoadComponent component={TaxCollectionReport} />,
// },
//         ]
//                 },

//         {
//             path: 'apps',
//         children: [
//         {
//             path: 'calendar',
//         element: <LoadComponent component={CalendarApp} />,
//                         },
//         {
//             path: 'chat',
//         element: <LoadComponent component={ChatApp} />,

// },

//         {
//             path: 'crm',
//         children: [
//         {
//             path: 'dashboard',
//         element: <LoadComponent component={CRMDashboard} />,
//                                 },
//         {
//             path: 'projects',
//         element: <LoadComponent component={CRMProjects} />,
// },
//         {
//             path: 'management',
//         element: <LoadComponent component={CRMManagement} />,
// },
//         {
//             path: 'clients',
//         element: <LoadComponent component={CRMClients} />,
// },
//         {
//             path: 'orders',
//         element: <LoadComponent component={CRMOrderList} />,
// },
//         ],
//                         },
//         {
//             path: 'ecommerce',
//         children: [
//         {
//             path: 'products',
//         element: <LoadComponent component={EcommerceProducts} />,
//                                 },
//         {
//             path: 'details',
//         element: <LoadComponent component={ProductDetails} />,
// },
//         {
//             path: 'orders',
//         element: <LoadComponent component={Orders} />,
// },
//         {
//             path: 'order/details',
//         element: <LoadComponent component={OrderDetails} />,
// },
//         {
//             path: 'customers',
//         element: <LoadComponent component={Customers} />,
// },
//         {
//             path: 'shopping-cart',
//         element: <LoadComponent component={Cart} />,
// },
//         {
//             path: 'checkout',
//         element: <LoadComponent component={Checkout} />,
// },
//         {
//             path: 'sellers',
//         element: <LoadComponent component={Sellers} />,
// },
//         ],
//                         },
//         {
//             path: 'email',
//         children: [
//         {
//             path: 'inbox',
//         element: <LoadComponent component={Inbox} />,
//                                 },
//         {
//             path: 'details',
//         element: <LoadComponent component={EmailDetail} />,
// },
//         ],
//                         },
//         {
//             path: 'tasks',
//         children: [
//         {
//             path: 'list',
//         element: <LoadComponent component={TaskList} />,
//                                 },
//         {
//             path: 'kanban',
//         element: <LoadComponent component={Kanban} />,
// },
//         {
//             path: 'details',
//         element: <LoadComponent component={TaskDetails} />,
// },
//         ],
//                         },

//         {
//             path: 'projects',
//         children: [
//         {
//             path: 'list',
//         element: <LoadComponent component={Projects} />,
//                                 },
//         {
//             path: 'details',
//         element: <LoadComponent component={ProjectDetail} />,
// },
//         {
//             path: 'gantt',
//         element: <LoadComponent component={ProjectGannt} />,
// },
//         {
//             path: 'new',
//         element: <LoadComponent component={ProjectForm} />,
// },
//         ],
//                         },
//         {
//             path: 'social',
//         element: <LoadComponent component={SocialFeed} />,
// },
//         {
//             path: 'file',
//         element: <LoadComponent component={FileManager} />,
// },
//         ],
//                 },
//         {
//             path: 'pages',
//         children: [
//         {
//             path: 'starter',
//         element: <LoadComponent component={Starter} />,
//                         },
//         {
//             path: 'profile',
//         element: <LoadComponent component={Profile} />,
// },
//         {
//             path: 'profile2',
//         element: <LoadComponent component={Profile2} />,
// },
//         {
//             path: 'pricing',
//         element: <LoadComponent component={Pricing} />,
// },
//         {
//             path: 'error-404-alt',
//         element: <LoadComponent component={ErrorPageNotFoundAlt} />,
// },
//         {
//             path: 'timeline',
//         element: <LoadComponent component={Timeline} />,
// },
//         {
//             path: 'invoice',
//         element: <LoadComponent component={Invoice} />,
// },
//         {
//             path: 'faq',
//         element: <LoadComponent component={FAQ} />,
// },
//         {
//             path: 'preloader',
//         element: <LoadComponent component={PreLoader} />,
// },
//         ],
//                 },
//         {
//             path: 'ui',
//         children: [
//         {
//             path: 'base-ui',
//         children: [
//         {
//             path: 'accordions',
//         element: <LoadComponent component={Accordions} />,
//                                 },
//         {
//             path: 'alerts',
//         element: <LoadComponent component={Alerts} />,
//                                 },
//         {
//             path: 'avatars',
//         element: <LoadComponent component={Avatars} />,
// },
//         {
//             path: 'badges',
//         element: <LoadComponent component={Badges} />,
// },
//         {
//             path: 'breadcrumb',
//         element: <LoadComponent component={Breadcrumbs} />,
// },
//         {
//             path: 'buttons',
//         element: <LoadComponent component={Buttons} />,
// },
//         {
//             path: 'cards',
//         element: <LoadComponent component={Cards} />,
// },
//         {
//             path: 'carousel',
//         element: <LoadComponent component={Carousels} />,
// },
//         {
//             path: 'dropdowns',
//         element: <LoadComponent component={Dropdowns} />,
// },
//         {
//             path: 'embedvideo',
//         element: <LoadComponent component={EmbedVideo} />,
// },
//         {
//             path: 'grid',
//         element: <LoadComponent component={Grid} />,
// },
//         {
//             path: 'listgroups',
//         element: <LoadComponent component={ListGroups} />,
// },
//         {
//             path: 'modals',
//         element: <LoadComponent component={Modals} />,
// },
//         {
//             path: 'notifications',
//         element: <LoadComponent component={Notifications} />,
// },
//         {
//             path: 'offcanvas',
//         element: <LoadComponent component={Offcanvases} />,
// },
//         {
//             path: 'paginations',
//         element: <LoadComponent component={Paginations} />,
// },

//         {
//             path: 'popovers',
//         element: <LoadComponent component={Popovers} />,
//             },
//         {
//             path: 'progress',
//         element: <LoadComponent component={Progress} />,
//             },
//         {
//             path: 'ribbons',
//         element: <LoadComponent component={Ribbons} />,
//             },
//         {
//             path: 'spinners',
//         element: <LoadComponent component={Spinners} />,
//             },
//         {
//             path: 'tabs',
//         element: <LoadComponent component={Tabs} />,
//             },
//         {
//             path: 'tooltips',
//         element: <LoadComponent component={Tooltips} />,
//             },
//         {
//             path: 'typography',
//         element: <LoadComponent component={Typography} />,
//             },
//         ],
//                         },
//         {
//             path: 'widgets',
//         element: <LoadComponent component={Widgets} />,
// },
//         {
//             path: 'extended',
//         children: [
//         {
//             path: 'dragdrop',
//         element: <LoadComponent component={DragDrop} />,
//                                 },
//         {
//             path: 'rangesliders',
//         element: <LoadComponent component={RangeSliders} />,
// },
//         {
//             path: 'ratings',
//         element: <LoadComponent component={Ratings} />,
// },
//         ],
//                         },
//         {
//             path: 'icons',
//         children: [
//         {
//             path: 'unicons',
//         element: <LoadComponent component={Unicons} />,
//                                 },
//         {
//             path: 'mdi',
//         element: <LoadComponent component={MDIIcons} />,
// },
//         {
//             path: 'dripicons',
//         element: <LoadComponent component={Dripicons} />,
// },
//         ],
//                         },
//         {
//             path: 'forms',
//         children: [
//         {
//             path: 'basic',
//         element: <LoadComponent component={BasicForms} />,
//                                 },
//         {
//             path: 'advanced',
//         element: <LoadComponent component={FormAdvanced} />,
// },
//         {
//             path: 'validation',
//         element: <LoadComponent component={FormValidation} />,
// },
//         {
//             path: 'wizard',
//         element: <LoadComponent component={FormWizard} />,
// },
//         {
//             path: 'upload',
//         element: <LoadComponent component={FileUpload} />,
// },
//         {
//             path: 'editors',
//         element: <LoadComponent component={Editors} />,
// },
//         ],
//                         },
//         {
//             path: 'tables',
//         children: [
//         {
//             path: 'basic',
//         element: <LoadComponent component={BasicTables} />,
//                                 },
//         {
//             path: 'advanced',
//         element: <LoadComponent component={AdvancedTables} />,
// },
//         ],
//                         },
//         {
//             path: 'charts',
//         children: [
//         {
//             path: 'apex',
//         element: <LoadComponent component={ApexChart} />,
//                                 },
//         {
//             path: 'brite',
//         element: <LoadComponent component={BriteChart} />,
// },
//         {
//             path: 'chartjs',
//         element: <LoadComponent component={ChartJs} />,
// },
//         ],
//                         },
//         {
//             path: 'maps',
//         children: [
//         {
//             path: 'googlemaps',
//         element: <LoadComponent component={GoogleMaps} />,
//                                 },
//         {
//             path: 'vectormaps',
//         element: <LoadComponent component={VectorMaps} />,
// },
//         ],
//                         },
//         ],
//                 },
//         ],
//         },
//         ]);
// };
