import * as yup from 'yup';
import dayjs from 'dayjs';
export const validationSchema = yup.object({
    driver: yup.string().required('Please select the driver').min(2, 'Please select the driver'),
    date: yup.array().of(yup.string()).required('Date Range is required'),
    choose_for: yup.string().required('Please select the choose'),
});

export const initialValues = {
    driver: '',
    date: [dayjs(new Date()), dayjs(new Date())],
    choose_for: '',
};
