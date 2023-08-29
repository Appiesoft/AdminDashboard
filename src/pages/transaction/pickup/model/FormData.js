import * as yup from 'yup';

export const validationSchema = yup.object({
    customer_name: yup.string().required('Please Select Customer Name'),
    pickup_date: yup.string(),
    pickup_time: yup.string().nullable(),
    qty_bag: yup.string(),
    driver_assign: yup.string().nullable(),
    store: yup.string().nullable(),
});

export const initialValues = {
    customer_name: '',
    pickup_date: new Date(),
    pickup_time: '',
    qty_bag: '',
    driver_assign: '',
    store: '',
};

export const driver = [
    { label: 'Sahil', value: 'sahil' },
    { label: 'Sahil1', value: 'sahil1' },
    { label: 'Abhinav', value: 'abhinav' },
];

export const recurringPickup = [
    { label: 'Every One Week', value: 'one' },
    { label: 'Every Two Week', value: 'two' },
    { label: 'Every Three Week', value: 'three' },
    { label: 'Every Four Week', value: 'four' },
];

export const pickupTime = [
    { label: '08:00 AM to 10:00 AM', value: '08:00 AM to 10:00 AM' },
    { label: '10:00 AM to 11:00 AM', value: '10:00 AM to 11:00 AM' },
    { label: '11:00 AM to 12:00 PM', value: '11:00 AM to 12:00 PM' },
];
