import * as yup from 'yup';

export const validationSchema = yup.object({
    refund_type: yup.string(),
    refund_reason: yup.string(),
    amount: yup.string(),
});

export const initialValues = {
    refund_type: '',
    refund_reason: '',
    amount: '',
};
