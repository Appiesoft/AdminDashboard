import * as yup from 'yup';

export const validationSchema = yup.object({
    name: yup.string().required('Business Name is required'),
    address1: yup.string(),
    address2: yup.string(),
    city: yup.string(),
    state: yup.string(),
    zipCode: yup.string(),
    country: yup.string(),
    language: yup.string(),
    businessMobile: yup.string(),
    landline: yup.string(),
    emailId: yup.string(),
    logo: yup.string(),
    timeZone: yup.string(),
    currency: yup.string(),
    showSystem: yup.string(),
    setCurrencyDecimal: yup.string(),
    allZipCode: yup.string(),
    templateName: yup.string(),
    mobileTemplate: yup.string(),
    orderId: yup.string(),
    autoDriverAssign: yup.string(),
    challanForm: yup.string(),
    pickup: yup.string(),
    delivery: yup.string(),
    facebook: yup.string(),
    instagram: yup.string(),
    twitter: yup.string(),
    skype: yup.string(),
    linkedin: yup.string(),
    yelp: yup.string(),
    retailOrderForm: yup.string(),
    pinterestLink: yup.string(),
    googleMap: yup.string(),
});

export const initialValues = {
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    language: '',
    businessMobile: '',
    landline: '',
    emailId: '',
    logo: '',
    timeZone: '',
    currency: '',
    showSystem: '',
    setCurrencyDecimal: '',
    allZipCode: '',
    templateName: '',
    mobileTemplate: '',
    orderId: '',
    autoDriverAssign: 'ON',
    challanForm: '',
    pickup: '',
    delivery: '',
    facebook: '',
    instagram: '',
    twitter: '',
    skype: '',
    linkedin: '',
    yelp: '',
    retailOrderForm: '',
    pinterestLink: '',
    googleMap: '',
};

export const templateName = [
    {
        label: 'webnew',
        value: 'webnew',
    },
    {
        label: 'turnsapp',
        value: 'turnsapp',
    },
];

export const showSystem = [
    {
        label: '(INR)',
        value: 'inr',
    },
    {
        label: '₹',
        value: '₹',
    },
];

export const openForAllZipCodeOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
];

export const autoDriverAssignOptions = [
    { label: 'On', value: 'ON' },
    { label: 'Off', value: 'Off' },
];
