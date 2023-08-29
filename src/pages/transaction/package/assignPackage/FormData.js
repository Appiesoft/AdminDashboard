import * as yup from 'yup';

export const validationSchema = yup.object({
    customer_id: yup.string(),
    pkg_id: yup.string(),
    start_date: new Date(),
    payment_mode: yup.string(),
});

export const initialValues = {
    customer_id: '',
    pkg_id: '',
    start_date: new Date(),
    payment_mode: '',
};

export const paymentOptions = [
    { label: 'Cash Payment', value: 'bycash' },
    { label: 'Online Payment', value: 'byonline' },
];
