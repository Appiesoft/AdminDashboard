import * as yup from 'yup';

export const validationSchema = yup.object({
    priceListId: yup.string(),
    serviceId: yup.string(),
    categoryId: yup.string(),
    clothId: yup.string(),
    shortCode: yup.string(),
    price: yup.string(),
    minPrice: yup.string(),
    piece: yup.string(),
    unit: yup.string(),
    active: yup.string(),
    online: yup.string(),
    priority: yup.string(),
    tax: yup.array().of(yup.string()),
    addon:yup.array().of(yup.string()),
});

export const initialValues = {
    priceListId: '',
    serviceId: '',
    categoryId: '',
    clothId: '',
    shortCode: '',
    price: '',
    minPrice: '',
    piece: '',
    unit: '',
    active: '',
    online: '',
    priority: '',
    tax: [],
    addon:[]
};

export const options = [
    { label: 'YES', value: 'yes' },
    { label: 'NO', value: 'no' },
];

export const unitOptions = [
    { label: 'Qty/Lbs', value: 'qty' },
    { label: 'Lbs', value: 'lbs' },
    { label: 'Sq. Ft', value: 'sqft' },
    { label: 'Meter', value: 'meter' },
];

export const TaxesOptions = [
    {
        label: 'CGST(9.00)%',
        value: 'cgst',
    },
    {
        label: 'SGST(9.00)%',
        value: 'sgst',
    },
];
