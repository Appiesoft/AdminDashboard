import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Modal } from 'react-bootstrap';
import './OrderNote.css'


const OrderNotes = ({ parentFill, childEmpty }) => {

    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmpty("")
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };
    useEffect(() => {
        if (parentFill == "lg") {
            openModalWithSize('lg');
        }
    }, [parentFill]);
    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} className='model_control' scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className='bg-light '>
                    <h4 className="modal-title ">Order Notes</h4>
                </Modal.Header>
                <Modal.Body className='pt-0 model_control'>
                    <hr />
                    <Row>
                        <Col className='d-flex justify-content-around '>
                            <h5 className='fw-bold mt-0'> Slno.</h5>
                            <h5 className='fw-bold mt-0'>#Invoice No.</h5>
                            <h5 className='fw-bold mt-0'>Customer</h5>
                            <h5 className='fw-bold mt-0'>Order Status</h5>
                            <h5 className='fw-bold mt-0'>Notes</h5>
                            <h5 className='fw-bold mt-0'>Date time</h5>
                            <h5 className='fw-bold mt-0'>Done By</h5>

                        </Col>
                    </Row>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="light" onClick={toggle}>
                        Close
                    </Button>{' '}
                    <Button variant="primary" onClick={toggle}>
                        Save changes
                    </Button>
                </Modal.Footer> */}
            </Modal>

        </>
    )
}

export default OrderNotes