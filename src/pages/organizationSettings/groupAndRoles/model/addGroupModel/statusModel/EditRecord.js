import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, Button, Modal, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const EditRecord = ({ parentChangeEditRecord, childEmptyChangeEditRecord }) => {
    const store = useSelector((state) => state);
    const gropsData = store?.Groups?.groupsList;
    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyChangeEditRecord('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        resetForm()
        if (parentChangeEditRecord == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentChangeEditRecord]);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const resetForm = () => {
        if (gropsData) {
            reset({
                groupId: gropsData.id,
                groupName: gropsData.group_name,
                status: gropsData.group_status

            })
        }
    }
    useEffect(() => {
        resetForm()
    }, [])
    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Record</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row>
                        <Col className="px-0">
                            <>
                                <Card>
                                    <Card.Body>
                                        <Form noValidate
                                            onSubmit={handleSubmit(
                                                (data) => {
                                                    console.log(data)
                                                },
                                                (err) => {
                                                    console.log(err);
                                                }
                                            )}>
                                            <Row className="p-3">
                                                <Col lg={12}>
                                                    <Row className="my-3">
                                                        <Col lg={12}>
                                                            <Form.Group controlId="ne_groupid">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Group ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            disabled
                                                                            {...register("groupId")}

                                                                        />
                                                                        <Form.Control.Feedback>
                                                                            Looks good!
                                                                        </Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="ne_groupname">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Group Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            {...register("groupName", { required: true })}
                                                                            isInvalid={errors.groupName}
                                                                        />
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
                                                                        <Form.Label>
                                                                            Group Status :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            placeholder="Member Group"
                                                                            {...register('status', { required: true })}
                                                                            isInvalid={errors.status}

                                                                        >
                                                                            <option hidden value='' >
                                                                                -- Select --
                                                                            </option>
                                                                            <option value="enable"
                                                                            >Enable</option>
                                                                            <option value="disable">Disable</option>
                                                                        </Form.Select>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        {/* <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row>
                                                                    <Col>
                                                                        <Table className="mb-0" size="sm">
                                                                            <thead className='bg-light'>
                                                                                <tr>
                                                                                    <th>Model Name</th>
                                                                                    <th>Group Permission ( Manager )</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-user-times"></i></div>
                                                                                        <div className='ms-2'>Null (No Permission )</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-dashboard"></i></div>
                                                                                        <div className='ms-2'>Dashboard</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-desktop-alt"></i></div>
                                                                                        <div className='ms-2'>Cash Register</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-desktop-alt"></i></div>
                                                                                        <div className='ms-2'>Master</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-tear"></i></div>
                                                                                        <div className='ms-2'>Products</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-truck"></i></div>
                                                                                        <div className='ms-2'>Services</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-list-ul"></i></div>
                                                                                        <div className='ms-2'>Transaction</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-file-edit-alt"></i></div>
                                                                                        <div className='ms-2'>Reports</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-bright"></i></div>
                                                                                        <div className='ms-2'>Settings</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="d-flex">
                                                                                        <div><i className="uil uil-users-alt"></i></div>
                                                                                        <div className='ms-2'>Group and Roles</div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="checkbox" />
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </Table>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col> */}
                                                    </Row>
                                                    <Row>
                                                        <Col className="text-center  py-3">
                                                            <Button type="submit" className="btn btn-success">
                                                                Update
                                                            </Button>
                                                            <Button type="submit" className="btn btn-primary ms-3">
                                                                Reset
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </>
                        </Col>
                    </Row>
                </Modal.Body>

            </Modal>
        </>)
}

export default EditRecord