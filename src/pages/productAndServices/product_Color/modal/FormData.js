import * as yup from 'yup';

export const validationSchema = yup.object({
    color_name: yup.string(),
    image: yup.string(),
    remark: yup.string(),
    color_code: yup.string(),
});

export const initialValues = {
    color_name: '',
    image: '',
    remark: '',
    color_code: '',
};
