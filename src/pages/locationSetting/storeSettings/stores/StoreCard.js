import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import DeleteModal from '../../../../components/DeleteModal';
import ToastHandle from '../../../../helpers/toastMessage';
import { storeDelete,storeList } from '../../../../redux/actions';
import './Store.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const StoreCard = ({ phone, email, address, taxNo, storeName, id }) => {
    const [showActionBtn, setShowActionBtn] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const dispatch = useDispatch();
    const store = useSelector(state=>state);
    const storeDeleteData = store?.StoreDelete;

    const ref = useRef();
    const navigate = useNavigate();
    const onClickOutside = () => {
        setShowActionBtn(false);
    };

    useEffect(() => {
        if (deleteRecordConfirmation) {
            dispatch(
                storeDelete({
                    storeId: id,
                })
            );
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    useEffect(() => {
        if (storeDeleteData?.status === true) {
            ToastHandle('success', storeDeleteData?.message);
            dispatch(
                storeList({
                    searchValue: '',
                })
            );
        } else if (storeDeleteData?.status === false) {
            ToastHandle('error', storeDeleteData?.message);
        }
    }, [storeDeleteData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    return (
        <>
            <Card style={{ maxWidth: '20rem', minWidth: '18rem' }} className="rounded-2">
                <Card.Body>
                    <div className="d-flex">
                        <img
                            src="https://img.freepik.com/free-vector/shop-with-we-are-open-sign_23-2148557016.jpg?w=2000"
                            alt=""
                            style={{ height: '2.5rem', width: '2.5rem' }}
                        />
                        <div className="d-flex justify-content-between w-100  align-items-center ms-2">
                            <h4 className="page-title color font-24">{storeName}</h4>
                            <span className="actionBtnIcon" onClick={() => setShowActionBtn(!showActionBtn)}>
                                <i className="bi bi-three-dots-vertical fs-4"></i>
                            </span>
                        </div>
                        <div
                            className="actionBtnContent rounded-2"
                            style={{ display: showActionBtn ? 'block' : 'none' }}
                            ref={ref}>
                            <div
                                className="d-flex actionOption"
                                onClick={() => navigate(`/locationsetting/store/${id}`)}>
                                <i className="bi bi-pencil-square" style={{ color: 'green' }}></i>
                                &nbsp; Edit
                            </div>
                            <div
                                className="d-flex actionOption"
                                onClick={() => setIsDeleteModelOpen(!isDeleteModelOpen)}>
                                <div className="d-flex actionOption">
                                    <i className="bi bi-trash" style={{ color: 'red' }}></i>
                                    &nbsp; Delete
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="d-flex align-items-center my-1 font-12">
                            <i className="bi bi-envelope border rounded-2 px-1 fs-4" style={{ color: '#ffce00' }}></i>
                            &nbsp; {email}
                        </div>
                        <div className="d-flex align-items-center my-1 font-12">
                            <i
                                className="bi bi-telephone fw-bolder border rounded-2 px-1 fs-4"
                                style={{ color: 'green' }}></i>
                            &nbsp;{phone}
                        </div>
                        {taxNo && (
                            <div className="d-flex align-items-center my-1 font-12">
                                <i
                                    className="bi bi-tag fw-bolder border rounded-2 px-1 fs-4"
                                    style={{ color: 'gray' }}></i>
                                &nbsp; {taxNo}
                            </div>
                        )}
                        <div className="d-flex mt-1">
                            <div>
                                <i
                                    className="bi bi-pin-map fw-bolder border rounded-2 px-1 fs-4"
                                    style={{ color: 'red' }}></i>
                            </div>
                            &nbsp;&nbsp;
                            <p className="font-12">{address}</p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Button className="w-100 fs-bold rounded-pill">Login</Button>
                    </div>
                </Card.Body>
            </Card>
            <DeleteModal
                show={isDeleteModelOpen}
                onHide={setIsDeleteModelOpen}
                deleteRecord={setDeleteRecordConfirmation}
            />
        </>
    );
};

export default StoreCard;
