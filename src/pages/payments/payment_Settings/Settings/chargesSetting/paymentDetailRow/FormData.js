import * as yup from 'yup';

export const validationSchema = yup.object({
    status: yup.string(),
    payment_method_id: yup.string(),
    amount: yup.string(),
});

export const initialValues = {
    status: '',
    payment_method_id: '',
    amount: '',
};

export const options = [
    { label: 'Enable', value: 'enable' },
    { label: 'Disable', value: 'disable' },
];
