import * as yup from 'yup';

export const validationSchema = yup.object({
    defect_name: yup.string(),
    remark: yup.string(),
    services: yup.string(),
    package_name: yup.string(),
    usage_limit: yup.string(),
    unit: yup.string(),
    pickup: yup.string(),
    duration: yup.string(),
    amount: yup.string(),
    description: yup.string(),
    status: yup.string(),
    priority: yup.string(),
});

export const initialValues = {
    services: '',
    package_name: '',
    usage_limit: '',
    unit: '',
    pickup: 'Alternative / Weekly',
    duration: '',
    amount: '',
    description: '',
    status: '',
    priority: '',
};

export const unitOptions = [
    { label: 'Quantity', value: 'Quantity' },
    { label: 'Kilogram', value: 'kg' },
    { label: 'Costomes', value: 'Costomes' },
];

export const durationOptions = [
    { label: 'One Month', value: '1' },
    { label: 'Two Months', value: '2' },
    { label: 'Three Months', value: '3' },
    { label: 'Six Months', value: '6' },
    { label: 'Twelve Months', value: '12' },
];

export const statusOptions = [
    { label: 'Show', value: 'show' },
    { label: 'Hide', value: 'hide' },
];
