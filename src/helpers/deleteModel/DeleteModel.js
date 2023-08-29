import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, Modal, InputGroup, Form, Card, Table, OverlayTrigger, Tooltip, Button, Pagination } from 'react-bootstrap';


const DeleteModel = ({ parentModelDelete, deleteId, deleteAction, ChildcloseModalHandel }) => {
    // model delete
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        ChildcloseModalHandel('')
    };

    const openModalWithClass = (className) => {
        setClassName(className);
        setSize(null);
        setScroll(null);
        toggle();
    };

    const submitDelete = (id) => {
        deleteAction(id);
    }

    useEffect(() => {
        if (parentModelDelete == "modal-dialog-centered")
            openModalWithClass("modal-dialog-centered")
    }, [parentModelDelete])
    return (
        <div>
            <Modal show={modal} onHide={toggle} dialogClassName={className}>
                <Modal.Header onHide={toggle} className='bg-light' closeButton>
                    {/* <h4 className="modal-title ">Delete Confirmation</h4> */}
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center'>

                        <h3 className='fw-bold'>Are Your Sure to Delete this Record</h3>
                    </div>
                </Modal.Body>
                <div className='d-flex justify-content-center mb-2'>
                    <Button variant="danger" onClick={() => submitDelete(deleteId)}>
                        Delete
                    </Button>
                    <Button variant="light" className='ms-3' onClick={toggle}>
                        Close
                    </Button>{' '}

                </div>
                {/* <Modal.Footer>
                   

                </Modal.Footer> */}
            </Modal>
        </div>

    )
}

export default DeleteModel