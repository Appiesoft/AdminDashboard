import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import './ShowHide.css'
import { useSelector } from 'react-redux';


const ShowHide = ({ parentShowHide, childEmptyShowHide, checkBoxStatus, setCheckBoxStatus }) => {
    const store = useSelector((state) => state);
    const paymentListData = store?.PaymentList?.paymentList?.data;
    const [modal, setModal] = useState(false);
    const [className, setClassName] = useState(null);
    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
        childEmptyShowHide('')
    };

    /**
     * Opens modal with custom class
     */
    const openModalWithClass = (className) => {
        setClassName(className);
        toggle();
    };

    const handleOnChangeChild = (item) => {
        let dataP = { ...checkBoxStatus }
        dataP[item] = checkBoxStatus[item] === undefined ? false : checkBoxStatus[item] ? false : true
        setCheckBoxStatus(dataP)
    }

    const getChecKBoxData = () => {
        const arr = paymentListData
        const obj = Array.isArray(arr) && arr[0]
        const checkData = typeof obj === 'object' && Object.keys(obj)
        return checkData ? checkData : []
    }


    useEffect(() => {
        if (parentShowHide == "modal-right") {
            openModalWithClass("modal-right");
        }
    }, [parentShowHide]);

    return (
        <>
            <div className='modal_parent'>

                <Modal show={modal} onHide={toggle} className='modal_height' dialogClassName={className}>
                    <Modal.Header onHide={toggle} closeButton className='bg-light header_div'>
                        <h4 className="modal-title ">Show Hide Columns</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={12} className='px-3'>
                                <Row>
                                    <Col lg={12} className='my-3'>
                                        <Row>
                                            {getChecKBoxData().map((item) =>
                                            (<>
                                                <Col lg={4} className='my-2'>
                                                    <Form>
                                                        <Form.Check checked={checkBoxStatus[item] === undefined ? true : checkBoxStatus[item] ? true : false} type="switch" name="check_box" onChange={(e) => handleOnChangeChild(item)} id="custom-switch" label={item.split("_").join(" ").toUpperCase()}
                                                        />
                                                    </Form>
                                                </Col>
                                            </>
                                            )
                                            )}

                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer >
                        <Button variant="success" onClick={toggle}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ShowHide