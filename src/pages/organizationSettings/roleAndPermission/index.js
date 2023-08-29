import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialValues, permisionsOptions, validationSchema, options } from './FormData';
import SelectField from '../../../components/Form Components/SelectField';
import { useLocation } from 'react-router-dom';

const RoleAndPermission = () => {
    const [permissionsData, setPermissionsData] = useState(permisionsOptions);
    const [permissionErrorMassege, setPermissionErrorMassege] = useState(null);
    const location = useLocation();
    if (location?.state?.groupId) {
        console.log(location?.state?.groupId);
    }
    useEffect(() => {
        reset(initialValues);
        setPermissionsData(permisionsOptions);
    }, []);

    const {
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });

    const onSubmit = (data) => {
        console.log('Data:', data);
        // dispatch(
        //     groupCreate({
        //         groupName: data?.group_name,
        //         groupPermission: data?.group_permission,
        //         groupStatus: data?.group_status,
        //     })
        // );
        reset(initialValues);
    };

    return (
        <Card style={{ marginTop: '1.5rem' }}>
            <Form
                className="m-2"
                onSubmit={handleSubmit(
                    (data) => {
                        data.group_permission = permissionsData.filter((itdx) => itdx.check).map((itds) => itds.value);
                        if (data.group_permission.length) {
                            onSubmit(data);
                        } else {
                            setPermissionErrorMassege('Please select minimum one Permission');
                        }
                    },
                    (err) => {
                        console.log(err);
                    }
                )}>
                <Row>
                    <Col lg={12} className="my-1">
                        <Controller
                            control={control}
                            name="group_status"
                            render={({ field }) => (
                                <SelectField
                                    field={field}
                                    isMulti={false}
                                    options={options}
                                    error={errors?.group_status}
                                    placeholder="Group Status"
                                />
                            )}
                        />
                        {errors?.group_status && (
                            <Form.Text className="text-danger text-start">{errors?.group_status?.message}</Form.Text>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table className="mb-0" size="sm">
                            <thead style={{ background: '#f3f2f1' }}>
                                <tr>
                                    <th>Model Name</th>
                                    <th>Group Permission ( Manager )</th>
                                </tr>
                            </thead>
                            <tbody>
                                {permissionsData?.map((item) => {
                                    const isDanger = item.title === 'Null (No Permission )';
                                    const icon = item.icon;
                                    return (
                                        <tr>
                                            <td className="d-flex">
                                                <div>
                                                    <i className={icon}></i>
                                                </div>
                                                <div className={isDanger ? 'text-danger ms-2 font-13' : 'ms-2 font-13'}>
                                                    {item.title}
                                                </div>
                                            </td>
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    name={item.title}
                                                    id={`check_perm_${item.value}`}
                                                    checked={item.check}
                                                    onChange={() => {
                                                        setPermissionsData(
                                                            permissionsData.map((itdm, ind) =>
                                                                itdm.id === item.id
                                                                    ? {
                                                                          ...itdm,
                                                                          check: !itdm.check,
                                                                      }
                                                                    : itdm
                                                            )
                                                        );
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        {permissionErrorMassege && (
                            <Form.Text className="text-danger text-start">{permissionErrorMassege}</Form.Text>
                        )}
                    </Col>
                </Row>
                <div className="d-flex justify-content-center mt-2">
                    <Button
                        className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                        onClick={() => {
                            reset(initialValues);
                            setPermissionsData(permisionsOptions);
                        }}>
                        Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                    </Button>
                    <Button className="rounded-pill mx-2" type="submit">
                        {location?.state?.groupId ? 'Update' : 'Save'} &nbsp;<i className="bi bi-save"></i>
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default RoleAndPermission;
