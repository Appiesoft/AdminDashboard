import * as yup from 'yup';

export const validationSchema = yup.object({
    price_list_name: yup.string(),
    price_list_id: yup.string(),
    type: yup.string(),
    percentage: yup.string(),
});

export const initialValues = {
    price_list_name: '',
    price_list_id: '',
    type: '',
    percentage: '',
};

export const price_list_options = [
    { label: 'Increase current in percentage', value: '1' },
    { label: 'Decrease current in percentage', value: '2' },
];
