import * as yup from 'yup';

export const validationSchema = yup.object({
    service_name: yup.string(),
    service_name1: yup.string(),
    show_hide: yup.string(),
    show_hide_on_website: yup.string(),
    image: yup.string(),
    priority: yup.string(),
});

export const initialValues = {
    service_name: '',
    service_name1: '',
    show_hide: '',
    show_hide_on_website: '',
    image: '',
    priority: '',
};

export const options = [
    { label: 'Show', value: 'show' },
    { label: 'Hide', value: 'hide' },
];
