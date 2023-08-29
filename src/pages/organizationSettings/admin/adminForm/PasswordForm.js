import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Field from '../../../../components/Form Components/Field';
import { passwordFormInitialValues, passwordFormValidationSchema } from './FormData';

const PasswordForm = ({ showUserForm, setShowUserForm}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(passwordFormValidationSchema),
        mode: 'onTouched',
        defaultValues: passwordFormInitialValues,
    });

    const onSubmit = (data) => {
        console.log('new data: ', data);
    };

    return (
        <Form className="py-2 px-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
                <Field
                    label="Password"
                    placeholder="Password"
                    type="password"
                    disabled={false}
                    error={errors?.password}
                    errorMessage={errors?.password}
                    register={register('password')}
                />
            </div>
            <div className="my-2">
                <Field
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                    disabled={false}
                    error={errors?.confirmPassword}
                    errorMessage={errors?.confirmPassword}
                    register={register('confirmPassword')}
                />
            </div>

            <div className="d-flex justify-content-end">
                <Button className="rounded-pill mx-1" onClick={() => setShowUserForm(!showUserForm)}>
                    Cancel
                </Button>
                <Button className="rounded-pill mx-1" type="submit">
                    Update Password
                </Button>
            </div>
        </Form>
    );
};

export default PasswordForm;
