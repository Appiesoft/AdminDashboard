import * as yup from 'yup';

export const validationSchema = yup.object({
    online_payment: yup.string(),
    payment_option_for_customer: yup.string(),
    active_pg: yup.string(),
});

export const initialValues = {
    online_payment: '',
    payment_option_for_customer: '',
    active_pg: '',
};

export const onlinePaymentOptions = [
    { label: 'Enable', value: 'ENABLE' },
    { label: 'Disable', value: 'DISABLE' },
];

export const customerOptions = [
    { label: 'Before in Process', value: 'BEFORE' },
    { label: 'After in Process', value: 'AFTER' },
];
