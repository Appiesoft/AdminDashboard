import * as yup from 'yup';

export const validationSchema = yup.object({
    pattern_name: yup.string(),
    image: yup.string(),
    remark: yup.string(),
});

export const initialValues = {
    pattern_name: '',
    image: '',
    remark: '',
};
