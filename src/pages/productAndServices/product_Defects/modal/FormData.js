import * as yup from 'yup';

export const validationSchema = yup.object({
    defect_name: yup.string(),
    remark: yup.string(),
});

export const initialValues = {
    defect_name: '',
    remark: '',
};
