import * as yup from 'yup';

export const validationSchema = yup.object({
    name: yup.string(),
    unit: yup.string(),
    price: yup.string(),
});

export const initialValues = {
    name: '',
    unit: '',
    price: '',
};

export const unitOptions = [
    { label: 'Qty/Lbs', value: 'qty' },
    { label: 'Lbs', value: 'lbs' },
    { label: 'Sq. Ft', value: 'sqft' },
];
