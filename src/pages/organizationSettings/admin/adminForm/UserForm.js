import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { adminProfile, adminProfileUpdate } from '../../../../redux/actions';
import { validationSchema, initialValues } from './FormData';
import { Button, Form } from 'react-bootstrap';
import ToastHandle from '../../../../helpers/toastMessage';
import Field from '../../../../components/Form Components/Field';
import MobileField from '../../../../components/Form Components/MobileField';

const UserForm = ({ data, setShowUserForm, showUserForm }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const current_build = store?.Auth?.current_build;
    const country_code = store?.Auth?.country_code;
    const updateAdminProfile = store?.AdminProfileUpdate;

    useEffect(() => {
        if (updateAdminProfile?.status === true) {
            ToastHandle('success', updateAdminProfile?.message);
            dispatch(adminProfile());
        } else if (updateAdminProfile?.status === false) {
            ToastHandle('error', updateAdminProfile?.message);
        }
    }, [updateAdminProfile]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });

    useEffect(() => {
        // console.log('mobile:', data?.mobile);
        reset({
            name: data?.admin_name,
            email: data?.email_id,
            username: data?.username,
            mobile: data?.mobile,
        });
    }, [data]);
    const onSubmit = (value) => {
        dispatch(
            adminProfileUpdate({
                adminName: value?.name,
                mobile: value?.mobile.replace(/\s+/g, ''),
                emailId: value?.email,
                password: '1234',
            })
        );
    };

    return (
        <Form className="py-2 px-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
                <Field
                    label="Name"
                    placeholder="Name"
                    type="text"
                    disabled={false}
                    error={errors?.name}
                    errorMessage={errors?.name}
                    register={register('name')}
                />
            </div>
            <div className="my-2">
                <Field
                    label="UserName"
                    placeholder="UserName"
                    type="text"
                    disabled={false}
                    error={errors?.username}
                    errorMessage={errors?.username}
                    register={register('username')}
                />
            </div>
            <div className="my-2">
                <Field
                    label="Email Address"
                    placeholder="Email Address"
                    type="email"
                    disabled={false}
                    error={errors?.email}
                    errorMessage={errors?.email}
                    register={register('email')}
                />
            </div>
            <div className="my-2">
                <MobileField
                    label="Mobile"
                    error={errors?.mobile}
                    current_build={current_build}
                    country_code={country_code}
                    disabled={false}
                    register={register('mobile')}
                />
            </div>
            <div className="d-flex justify-content-end">
                <Button className="rounded-pill mx-1" onClick={() => setShowUserForm(!showUserForm)} type="button">
                    Change Password
                </Button>
                {/* {editForm ? (
                    <Button className="rounded-pill mx-1" onClick={() => setEditForm(!editForm)}>
                        Edit Profile
                    </Button>
                ) : ( */}
                <Button className="rounded-pill mx-1" type="submit">
                    Update Profile
                </Button>
                {/* )} */}
            </div>
        </Form>
    );
};

export default UserForm;
