import * as yup from 'yup';

export const validationSchema = yup.object({
    status: yup.string(),
    default_tip1: yup.string(),
    default_tip2: yup.string(),
    is_mandatory: yup.string(),
    calculation_type: yup.string(),
});

export const initialValues = {
    status: '',
    default_tip1: '',
    default_tip2: '',
    is_mandatory: '',
    calculation_type: '',
};

export const options = [
    { label: 'Enable', value: 'enable' },
    { label: 'Disable', value: 'disable' },
];
export const tipOptions = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' },
];

export const percentageOptions = [
    { label: 'With Tax', value: '1' },
    { label: 'Without Tax', value: '0' },
];
