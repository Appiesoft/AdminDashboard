import * as yup from 'yup';

export const validationSchema = yup.object({
    adjustment_name: yup.string(),
});

export const initialValues = {
    adjustment_name: '',
};
