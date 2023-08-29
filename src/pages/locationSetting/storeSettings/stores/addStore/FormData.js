import * as yup from 'yup';

export const validationSchema = yup.object({
    store_name: yup.string().required('Please Enter the store name'),
    short_name: yup.string(),
    mobile: yup.string(),
    email_id: yup.string(),
    password: yup.string(),
    status: yup.string(),
    address1: yup.string(),
    address2: yup.string(),
    city: yup.string(),
    state: yup.string(),
    zipcode: yup.string(),
    store_zipcode: yup.string(),
    landline: yup.string(),
    store_tax_no: yup.string(),
    store_logo: yup.string(),
    // is_main_store: yup.string(),
    default_price_list_id: yup.string(),
    assignVendor: yup.string(),
    assignPriceList: yup.array().of(yup.string()),
    description: yup.string(),
    defaultRetailPriceList: yup.string(),
});

export const initialValues = {
    store_name: '',
    short_name: '',
    mobile: '',
    email_id: '',
    password: '',
    status: '',
    address1: '',
    address2: '',
    assignVendor: '',
    assignPriceList: [],
    defaultRetailPriceList: '',
    description: '',
    city: '',
    state: '',
    zipcode: '',
    landline: '',
    store_tax_no: '',
    store_logo: '',
    // is_main_store: '',
    store_zipcode: '',
    default_price_list_id: '',
    country: '',
};

export const assignPriceListOptions = [
    { label: 'The Wash House', value: 'home' },
    { label: 'The Wash House 2', value: 'office' },
    { label: 'The Wash House 3', value: 'both' },
];

export const statusOptions = [
    { label: 'Show', value: 'show' },
    { label: 'Hide', value: 'hide' },
];
