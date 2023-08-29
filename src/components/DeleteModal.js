import React from 'react';
import deletered from '../assets/images/deletered.png';
import { Row, Col, Modal } from 'react-bootstrap';
import './DeleteModal.css';

const DeleteModal = ({ show, onHide, deleteRecord }) => {
    return (
        <Modal
            show={show}
            onHide={() => onHide(false)}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className="modal_body">
                <div>
                    <div className="wrapper">
                        <img src={deletered} alt="delete icon" style={{ width: '2.5rem', marginTop: '1.5rem' }} />
                    </div>
                    <div style={{ margin: '18px 0px' }}>
                        <p className="delete_txt">Are you sure</p>
                        <p className="delete_txt">You want to delete this record?</p>
                    </div>
                </div>
            </Modal.Body>
            <hr className="hr" />
            <Row>
                <Col onClick={() => onHide(false)} className="cancel-btn">
                    Cancel
                </Col>
                <div className="vr"></div>
                <Col
                    className="delete-btn"
                    onClick={() => {
                        deleteRecord(true);
                        onHide(false);
                    }}>
                    Yes! Delete
                </Col>
            </Row>
        </Modal>
    );
};

export default DeleteModal;
