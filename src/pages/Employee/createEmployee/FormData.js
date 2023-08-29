import * as yup from 'yup';

export const validationSchema = yup.object({
    first_name: yup.string().required('Please enter your first name'),
    last_name: yup.string().required('Please enter your last name'),
    mobile: yup.string().required('Please Enter Your Phone').min(10, 'At least 10 digits required'),
    email_id: yup.string().email('Invalid email format'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    status: yup.string(),
    lat: yup.string(),
    long: yup.string(),
    address1: yup.string().required('Please Enter a Mobile Number'),
    address2: yup.string(),
    country_code: yup.string(),
    city: yup.string(),
    state: yup.string(),
    zipcode: yup.string(),
    designation: yup.string(),
    group_member_id: yup.string(),
    driver_role: yup.string(),
    pin: yup.string(),
    stores: yup.array().of(yup.string()),
});

export const initialValues = {
    first_name: '',
    last_name: '',
    mobile: '',
    email_id: '',
    password: '',
    status: "",
    lat: '',
    long: '',
    address1: '',
    address2: '',
    country_code: '',
    city: '',
    state: '',
    zipcode: '',
    designation: '',
    group_member_id: "",
    driver_role: '',
    pin: '',
    stores: [],
};

export const MemberGroup = [
    { label: 'Driver', value: 'driver' },
    { label: 'Manager', value: 'manager' },
];
export const roles = [
    { label: 'Enable', value: 'enable' },
    { label: 'Disable', value: 'disable' },
];

export const LaundryStores = [
    { label: 'TOPWASH KANDIVALI', value: 'TOPWASH KANDIVALI' },
    { label: 'TOPWASH MALAD', value: 'TOPWASH MALAD' },
];
