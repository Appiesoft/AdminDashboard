import * as yup from 'yup';

export const validationSchema = yup.object({
    service_name: yup.string(),
    status: yup.string(),
    description: yup.string(),
});

export const initialValues = {
    service_name: '',
    status: '',
    description: '',
};

export const options = [
    {
        label: 'Show',
        value: 'show',
    },
    {
        label: 'Hide',
        value: 'hide',
    },
];
