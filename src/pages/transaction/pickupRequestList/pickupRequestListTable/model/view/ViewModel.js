import React, { useState, useEffect } from 'react'
import { Row, Col, Modal } from 'react-bootstrap';

const ViewModel = ({ parentView, childEmptyView }) => {
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyView("")
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        if (parentView == "lg") {
            openModalWithSize("lg");
        }
    }, [parentView]);

    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className='bg-light'>
                    <h4 className="modal-title">Pickup View</h4>
                </Modal.Header>
                <Modal.Body className='pb-0'>
                    <Row>
                        <Col className='d-flex justify-content-between '>
                            <div className='d-flex align-items-center'>
                                <h5>Customer Name :</h5>
                                <span className='ms-2'>AJ</span>
                            </div>
                            <div className='d-flex align-items-center'>
                                <h5>Order Id :</h5>
                                <span className='ms-2'>TWH1088</span>
                            </div>
                        </Col>
                    </Row>
                    <hr className='my-0' />
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Pickup Request Id</th>
                                <th scope="col">Order Status</th>
                                <th scope="col">Pickup Status</th>
                                <th scope="col">Driver Info	</th>
                                <th scope="col">Dasher Tip</th>
                                <th scope="col">Pickup Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>PIC123	</th>
                                <td>New Order</td>
                                <td>Ready to Driver</td>
                                <td></td>
                                <td>0.00</td>
                                <td>0.00</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr className='my-0' />
                </Modal.Body>

            </Modal>
        </>
    )
}

export default ViewModel