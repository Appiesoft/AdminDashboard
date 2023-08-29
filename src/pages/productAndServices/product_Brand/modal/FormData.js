import * as yup from 'yup';

export const validationSchema = yup.object({
    brand_name: yup.string(),
    image: yup.string(),
    brand_remark: yup.string(),
});

export const initialValues = {
    brand_name: '',
    image: '',
    brand_remark: '',
};
