import * as yup from 'yup';

export const validationSchema = yup.object({
    card_mandatory_for_pickup: yup.string(),
    payment_by_card_stage: yup.string(),
    failure_sms_for_admin: yup.string(),
    failure_sms_for_customer: yup.string(),
});

export const initialValues = {
    card_mandatory_for_pickup: 'no',
    payment_by_card_stage: '1',
    failure_sms_for_admin: 'yes',
    failure_sms_for_customer: 'yes',
};

export const options = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
];

export const cardOnStages = [
    { label: 'New Order', value: '1' },
    { label: 'Picked up', value: '2' },
    { label: 'In Store', value: '3' },
    { label: 'In Process', value: '4' },
    { label: 'Read for Delivery', value: '5' },
    { label: 'Delivered', value: '6' },
    { label: 'Cancelled', value: '7' },
];
