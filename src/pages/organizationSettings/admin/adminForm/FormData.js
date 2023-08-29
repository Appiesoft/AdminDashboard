import * as yup from 'yup';

export const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    mobile: yup.string().required('Mobile Number is required'),
    email: yup.string().email('Please enter valid email').required('Email is required'),
    username: yup.string().required('Mobile Number is required'),
});

export const initialValues = {
    name: '',
    mobile: '',
    email: '',
    username: '',
};
export const passwordFormValidationSchema = yup.object({
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().required('Confirm Password is required'),
});

export const passwordFormInitialValues = {
    password: '',
    confirmPassword: '',
};

export const assignPriceList = [
    { label: 'The Wash House', value: 'home' },
    { label: 'The Wash House 2', value: 'office' },
    { label: 'The Wash House 3', value: 'both' },
];
