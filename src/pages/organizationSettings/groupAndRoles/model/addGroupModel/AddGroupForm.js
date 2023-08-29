import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, InputGroup, Button, Modal, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { groupCreate, groups } from '../../../../../redux/organizations/groups/actions';
import ToastHandle from '../../../../../helpers/toastMessage';
import MainLoader from '../../../../../components/MainLoader';

const AddGroupForm = ({ parentChangeAddGroupForm, childEmptyChangeAddGroupForm }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const groupCreateStore = store.GroupsCreate;
    const groupCreateStoreErrorStatus = store?.GroupsCreate?.status;
    const groupCreateMessage = store?.GroupsCreate?.message;
    const groupCreateLorder = store.GroupsCreate;
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);
    const [permissionsData, setPermissionsData] = useState([
        { id: 1, icon: 'uil uil-user-times', title: 'Null (No Permission )', value: 'null', check: true },
        { id: 2, icon: 'uil uil-dashboard', title: 'Dashboard', value: 'desktop', check: false },
        { id: 3, icon: 'uil uil-desktop-alt', title: 'Cash Register', value: 'cashregister', check: false },
        { id: 4, icon: 'uil uil-desktop-alt', title: 'Master', value: 'master', check: false },
        { id: 5, icon: 'uil uil-tear', title: 'Products', value: 'garment', check: false },
        { id: 6, icon: 'uil uil-truck', title: 'Services', value: 'services', check: false },
        { id: 7, icon: 'uil uil-list-ul', title: 'Transaction', value: 'joborder', check: false },
        { id: 8, icon: 'uil uil-file-edit-alt', title: 'Reports', value: 'reports', check: false },
        { id: 9, icon: 'uil uil-bright', title: 'Settings', value: 'settings', check: false },
        { id: 10, icon: 'uil uil-users-alt', title: 'Group and Roles', value: 'groupanduser', check: false },
    ]);
    const [permissionErrorMassege, setPermissionErrorMassege] = useState(null);
    const permissionsCheck = permissionsData?.map((item) => {
        return item?.check;
    });
    const permissionCheckTrue = permissionsCheck?.find((check) => {
        return check === true;
    });

    const toggle = () => {
        setModal(!modal);
        childEmptyChangeAddGroupForm('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        if (parentChangeAddGroupForm == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentChangeAddGroupForm]);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const submitData = (data) => {
        dispatch(
            groupCreate({
                groupName: data.groupName,
                groupPermission: data.permissionsdata,
                groupStatus: data.groupStatus,
            })
        );
    };

    useEffect(() => {
        if (groupCreateStore.status) {
            dispatch(groups());
        }
    }, [groupCreateStore]);

    useEffect(() => {
        if (permissionCheckTrue === true) {
            setPermissionErrorMassege('');
        }
    }, [permissionCheckTrue]);

    useEffect(() => {
        if (groupCreateStoreErrorStatus) {
            ToastHandle('success', groupCreateMessage);
            toggle();
        } else if (groupCreateStoreErrorStatus === false) {
            ToastHandle('error', groupCreateMessage);
        }
    }, [groupCreateStoreErrorStatus]);

    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Add Group</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row>
                        <Col className="px-0">
                            <>
                                <Card>
                                    <Card.Body>
                                        {groupCreateLorder.loading ? (
                                            <MainLoader />
                                        ) : (
                                            <Form
                                                noValidate
                                                onSubmit={handleSubmit(
                                                    (data) => {
                                                        data.permissionsdata = permissionsData
                                                            .filter((itdx) => itdx.check)
                                                            .map((itds) => itds.value);
                                                        if (data.permissionsdata.length) {
                                                            submitData(data);
                                                        } else {
                                                            setPermissionErrorMassege(
                                                                'Please select minimum one Permission'
                                                            );
                                                        }
                                                    },
                                                    (err) => {
                                                        console.log(err);
                                                    }
                                                )}>
                                                <Row className="p-3">
                                                    <Col lg={12}>
                                                        <Row className="my-3">
                                                            <Col lg={12}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={3}>
                                                                            <Form.Label>Group ID :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={9}>
                                                                            <Form.Control
                                                                                required
                                                                                type="text"
                                                                                value="1"
                                                                                disabled
                                                                            />
                                                                            <Form.Control.Feedback>
                                                                                Looks good!
                                                                            </Form.Control.Feedback>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={12} className="mt-3">
                                                                <Form.Group controlId="ne_groupname">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={3}>
                                                                            <Form.Label>Group Name :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={9}>
                                                                            <Form.Control
                                                                                required
                                                                                type="text"
                                                                                {...register('groupName', {
                                                                                    required: true,
                                                                                })}
                                                                                isInvalid={errors.groupName}
                                                                            />
                                                                            {errors.groupName && (
                                                                                <span className="text-danger">
                                                                                    Please add Group name
                                                                                </span>
                                                                            )}
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col lg={12}>
                                                                <Form.Group controlId="ne_groupStatus">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={3}>
                                                                            <Form.Label>Group Status :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={9}>
                                                                            <Form.Select
                                                                                aria-label="Default select example"
                                                                                placeholder="Member Group"
                                                                                required
                                                                                {...register('groupStatus', {
                                                                                    required: true,
                                                                                })}
                                                                                isInvalid={errors.groupStatus}>
                                                                                <option hidden value="">
                                                                                    -- Select --
                                                                                </option>
                                                                                <option value="enable">Enable</option>
                                                                                <option value="disable">Disable</option>
                                                                            </Form.Select>
                                                                            {errors.groupStatus && (
                                                                                <span className="text-danger">
                                                                                    Please select one Group status
                                                                                </span>
                                                                            )}
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={12} className="mt-3">
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row>
                                                                        <Col>
                                                                            <Table className="mb-0" size="sm">
                                                                                <thead className="bg-light">
                                                                                    <tr>
                                                                                        <th>Model Name</th>
                                                                                        <th>
                                                                                            Group Permission ( Manager )
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {permissionsData.map((item) => {
                                                                                        const isDanger =
                                                                                            item.title ===
                                                                                            'Null (No Permission )';
                                                                                        const icon = item.icon;
                                                                                        return (
                                                                                            <tr>
                                                                                                <td className="d-flex">
                                                                                                    <div>
                                                                                                        <i
                                                                                                            className={
                                                                                                                icon
                                                                                                            }></i>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className={
                                                                                                            isDanger
                                                                                                                ? 'text-danger ms-2'
                                                                                                                : 'ms-2'
                                                                                                        }>
                                                                                                        {item.title}
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <input
                                                                                                        checked={
                                                                                                            item.check
                                                                                                        }
                                                                                                        // {...register('groupPermission', { required: true })}
                                                                                                        // isInvalid={errors.groupPermission}
                                                                                                        // required={permissionsData.check !== "" ? true : false}
                                                                                                        name={
                                                                                                            item.title
                                                                                                        }
                                                                                                        id={`check_perm_${item.value}`}
                                                                                                        type="checkbox"
                                                                                                        onChange={() => {
                                                                                                            setPermissionsData(
                                                                                                                permissionsData.map(
                                                                                                                    (
                                                                                                                        itdm,
                                                                                                                        ind
                                                                                                                    ) =>
                                                                                                                        itdm.id ===
                                                                                                                        item.id
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

                                                                                    {/* <td className="d-flex">
                                                                                        <div><i className="uil uil-user-times"></i></div>
                                                                                        <div className='ms-2'>Null (No Permission )</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox"
                                                                                            required {...register('noPermission')} />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-dashboard"></i></div>
                                                                                        <div className='ms-2'>Dashboard</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox"  {...register('desktop')} />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-desktop-alt"></i></div>
                                                                                        <div className='ms-2'>Cash Register</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox"  {...register('cashRegister')} />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-desktop-alt"></i></div>
                                                                                        <div className='ms-2'>Master</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" {...register('master')} />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-tear"></i></div>
                                                                                        <div className='ms-2'>Products</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" {...register('garment')} />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-truck"></i></div>
                                                                                        <div className='ms-2'>Services</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" {...register('services')} />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-list-ul"></i></div>
                                                                                        <div className='ms-2'>Transaction</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" {...register('joborder')} />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-file-edit-alt"></i></div>
                                                                                        <div className='ms-2'>Reports</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" {...register('reports')} />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-bright"></i></div>
                                                                                        <div className='ms-2'>Settings</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" {...register('settings')} />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-users-alt"></i></div>
                                                                                        <div className='ms-2'>Group and Roles</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" {...register('groupAndUser ')} />
                                                                                    </td> */}
                                                                                </tbody>
                                                                            </Table>
                                                                            <Row>
                                                                                <Col>
                                                                                    <span className="text-danger fw-bold">
                                                                                        {permissionErrorMassege}
                                                                                    </span>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className="text-center  py-3">
                                                                <Button type="submit" className="btn btn-success">
                                                                    save
                                                                </Button>
                                                                <Button type="button" className="btn btn-primary ms-3">
                                                                    Reset
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        )}
                                    </Card.Body>
                                </Card>
                            </>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddGroupForm;
