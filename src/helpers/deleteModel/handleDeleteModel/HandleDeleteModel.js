import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';


const HandleDeleteModel = ({ parentDelete, childEmptyDelete, confirmDeleteHandle }) => {

    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyDelete('')
    };

    const openModalWithClass = (className) => {
        setClassName(className);
        setSize(null);
        setScroll(null);
        toggle();
    };

    const submitDelete = () => {
        confirmDeleteHandle()
        toggle();
    }

    useEffect(() => {
        if (parentDelete == "modal-dialog-centered")
            openModalWithClass("modal-dialog-centered")
    }, [parentDelete])
    return (
        <div>
            <Modal show={modal} onHide={toggle} dialogClassName={className}>
                <Modal.Header onHide={toggle} className='bg-light' closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center'>
                        <h3 className='fw-bold'>Are Your Sure to Delete this Record</h3>
                    </div>
                </Modal.Body>
                <div className='d-flex justify-content-center mb-2'>
                    <Button variant="danger" onClick={submitDelete}>
                        Delete
                    </Button>
                    <Button variant="light" className='ms-3' onClick={toggle}>
                        Close
                    </Button>{' '}

                </div>
            </Modal>
        </div>
    )
}

export default HandleDeleteModel