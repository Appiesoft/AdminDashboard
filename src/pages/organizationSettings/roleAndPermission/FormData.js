import * as yup from 'yup';

export const validationSchema = yup.object({
    group_name: yup.string().required('Please Enter Group Name'),
    group_permission: yup.array(),
    group_status: yup.string().required('Please Select Group Status'),
});

export const initialValues = {
    group_name: '',
    group_permission: [],
    group_status: '',
};

export const options = [
    { label: 'Enable', value: 'enable' },
    { label: 'Disable', value: 'disable' },
];

export const permisionsOptions = [
    {
        id: 1,
        icon: 'uil uil-user-times',
        title: 'Null (No Permission )',
        value: 'null',
        check: true,
    },
    {
        id: 2,
        icon: 'uil uil-dashboard',
        title: 'Dashboard',
        value: 'desktop',
        check: false,
    },
    {
        id: 3,
        icon: 'uil uil-desktop-alt',
        title: 'Cash Register',
        value: 'cashregister',
        check: false,
    },
    {
        id: 4,
        icon: 'uil uil-desktop-alt',
        title: 'Master',
        value: 'master',
        check: false,
    },
    { id: 5, icon: 'uil uil-tear', title: 'Products', value: 'garment', check: false },
    {
        id: 6,
        icon: 'uil uil-truck',
        title: 'Services',
        value: 'services',
        check: false,
    },
    {
        id: 7,
        icon: 'uil uil-list-ul',
        title: 'Transaction',
        value: 'joborder',
        check: false,
    },
    {
        id: 8,
        icon: 'uil uil-file-edit-alt',
        title: 'Reports',
        value: 'reports',
        check: false,
    },
    {
        id: 9,
        icon: 'uil uil-bright',
        title: 'Settings',
        value: 'settings',
        check: false,
    },
    {
        id: 10,
        icon: 'uil uil-users-alt',
        title: 'Group and Roles',
        value: 'groupanduser',
        check: false,
    },
];
