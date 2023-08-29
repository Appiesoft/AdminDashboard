import * as yup from 'yup';

export const validationSchema = yup.object({
    method: yup.string(),
    image: yup.string(),
});

export const initialValues = {
    method: '',
    image: '',
};
