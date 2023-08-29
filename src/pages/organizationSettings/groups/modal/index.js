import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form, Button, Table } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialValues, validationSchema, options, permisionsOptions } from './FormData';
import Field from '../../../../components/Form Components/Field';
import SelectField from '../../../../components/Form Components/SelectField';
import ToastHandle from '../../../../helpers/toastMessage';
import { groupCreate, groups, groupUpdate } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const AddGroupModal = ({ show, onHide, editRow }) => {
    const [permissionsData, setPermissionsData] = useState(permisionsOptions);
    const [permissionErrorMassege, setPermissionErrorMassege] = useState(null);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const groupCreateStore = store.GroupsCreate;
    const groupUpdateStore = store.GroupsUpdate;

    useEffect(() => {
        if (groupCreateStore?.status === true) {
            ToastHandle('success', groupCreateStore?.message);
            reset(initialValues);
            dispatch(groups());
            onHide(false);
        } else if (groupCreateStore?.status === false) {
            ToastHandle('error', groupCreateStore?.message);
        }
    }, [groupCreateStore]);
    useEffect(() => {
        if (groupUpdateStore?.status === true) {
            ToastHandle('success', groupUpdateStore?.message);
            reset(initialValues);
            dispatch(groups());
            onHide(false);
        } else if (groupUpdateStore?.status === false) {
            ToastHandle('error', groupUpdateStore?.message);
        }
    }, [groupUpdateStore]);

    const resetFormField = () => {
        if (editRow) {
            setPermissionsData(
                permissionsData?.map((item) =>
                    editRow?.group_permission.includes(item.value)
                        ? {
                              ...item,
                              check: true,
                          }
                        : item
                )
            );
            reset({
                group_name: editRow?.group_name,
                group_status: editRow?.group_status,
                group_permission: editRow?.group_permission,
            });
        } else {
            reset(initialValues);
            setPermissionsData(permisionsOptions);
        }
    };

    useEffect(() => {
        resetFormField();
    }, [editRow]);

    const {
        register,
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
        if (editRow) {
            dispatch(groupUpdate({
                groupId: editRow?.id,
                groupName: data?.group_name,
                groupPermission: data?.group_permission,
                groupStatus: data?.group_status,
            }))
        } else {
            dispatch(
                groupCreate({
                    groupName: data?.group_name,
                    groupPermission: data?.group_permission,
                    groupStatus: data?.group_status,
                })
            );
        }
    };

    return (
        <Modal
            show={show}
            onHide={() => onHide(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <div className="d-block">
                    <h4>{editRow ? 'Edit Group Record' : 'Create New Group'}</h4>
                    <hr />
                </div>
                <Form
                    onSubmit={handleSubmit(
                        (data) => {
                            data.group_permission = permissionsData
                                .filter((itdx) => itdx.check)
                                .map((itds) => itds.value);
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
                        <Col lg={6} className="my-1">
                            <Field
                                label="Group Name"
                                placeholder="Group Name"
                                type="text"
                                disabled={false}
                                error={errors?.group_name}
                                errorMessage={errors?.group_name}
                                register={register('group_name')}
                            />
                        </Col>
                        <Col lg={6} className="my-1">
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
                                <Form.Text className="text-danger text-start">
                                    {errors?.group_status?.message}
                                </Form.Text>
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
                                            <tr key={item.id}>
                                                <td className="d-flex">
                                                    <div>
                                                        <i className={icon}></i>
                                                    </div>
                                                    <div
                                                        className={
                                                            isDanger ? 'text-danger ms-2 font-13' : 'ms-2 font-13'
                                                        }>
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
                            onClick={resetFormField}>
                            Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                        </Button>
                        <Button className="rounded-pill mx-2" type="submit">
                            {editRow ? 'Update' : 'Save'} &nbsp;<i className="bi bi-save"></i>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddGroupModal;
