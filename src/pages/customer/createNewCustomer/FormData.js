import * as yup from 'yup';

export const validationSchema = yup.object({
    customerId: yup.string(),
    joinDate: yup.string(),
    first_name: yup.string().required('Please Enter First Name'),
    lastName: yup.string().required('Please Enter Last Name'),
    address: yup.string().required('Please Enter Your Address'),
    city: yup.string().required('Please Enter Your City'),
    zipcode: yup.string().required('Please Enter Your City').min(6, 'Atleast 6 digits are required '),
    location_for: yup.string().required('Please Enter Your Location'),
    email_id: yup.string().email('Please Enter valid email address').required('Please Enter Your Email'),
    mobile: yup.string().required('Please Enter Your Phone').min(10, 'At least 10 digits required'),
    taxId: yup.string().required('Please Enter Tax ID'),
    taxExempt: yup.boolean(),
    cust_charges: yup.array().min(1, 'Please select at least one discount/charges'),
    promo: yup.array().min(1, 'Please select at least one Coupon/promo'),
    store_id: yup.string().required('Please Select Store Name'),
    price_list_id: yup.string().required('Please Select Price List'),
    package: yup.string().required('Please Select Package'),
    preferences: yup.string().required('Please Enter Your Preferences'),
});

export const initialValues = {
    customerId: '65',
    joinDate: new Date(),
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    zipcode: '',
    location_for: '',
    email_id: '',
    mobile: '',
    tax_id: '',
    tax_exempt: false,
    cust_charges: '',
    promo: '',
    store_id: '',
    price_list_id: '',
    package: '',
    preferences: '',
};

export const locations = [
    { label: 'Home', value: 'home' },
    { label: 'Office', value: 'office' },
    { label: 'Home and Office', value: 'both' },
];
