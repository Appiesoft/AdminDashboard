import React, { useState, useEffect } from 'react';
import { Breadcrumb, Card, Row, InputGroup, Form, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import OrderTable from './OrderTable';
import { customerDetail } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../../components/MainLoader';
import './CustomerDetail.css';
import './OrderTable.css';

const CustomerDetail = () => {
    const navigate = useNavigate();
    const { customerId } = useParams();
    const [searchText, setSearchText] = useState('');
    const [openTableOption, setOpenTableOption] = useState(false);
    console.log('CustomerId:', customerId);
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    console.log('store:', store);
    const customerDetailData = store.CustomerDetail?.customerDetail;
    console.log('sc', store?.CustomerDetail);
    useEffect(() => {
        dispatch(customerDetail({ customerId: customerId }));
    }, [customerId]);
    console.log('Customer Details', customerDetailData);
    return (
        <>
            <div className="d-flex my-2">
                <p onClick={() => navigate(-1)} className="fs-6 blacks fw-semibold" style={{ cursor: 'pointer' }}>
                    Customer List
                </p>
                <i class="bi bi-chevron-compact-right"></i>
                <p className="fs-6 fw-semibold" style={{ color: '#e74023' }}>
                    Customer Detail
                </p>
            </div>
            <Card className="rounded-4">
                {customerDetailData ? (
                    <div className="d-flex">
                        <div className="my-1 mx-2 text-center">
                            <img
                                src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                                class="rounded mx-auto"
                                alt="avtar"
                                style={{ width: '4rem', height: '4rem', borderRadius: '50%' }}
                            />
                            <h4 className="blacks">
                                {customerDetailData?.first_name + ' ' + customerDetailData?.last_name}
                            </h4>
                            <div className="d-flex justify-content-center">
                                <i class="bi bi-envelope"></i>&nbsp;
                                <p className="m-0">
                                    {customerDetailData?.email_id?.length > 5 ? customerDetailData?.email_id : 'N/A'}
                                </p>
                            </div>
                            <div className="d-flex justify-content-center" style={{ minWidth: '140px' }}>
                                <i class="bi bi-telephone"></i>&nbsp;
                                <p className="m-0">
                                    {customerDetailData?.country_code + ' ' + customerDetailData?.mobile}
                                </p>
                            </div>
                        </div>
                        <div class="vr"></div>
                        <div className="m-1 w-100">
                            <h4 className="blacks">Other Details</h4>
                            <hr></hr>
                            <div className="d-flex justify-content-between px-2">
                                <div>
                                    <p className="text-start fs-6 fw-bold m-0 blacks">CUSTOMER TYPE</p>
                                    <p className="fs-6">{customerDetailData?.customer_type}</p>
                                    <div className="mt-1">
                                        <p className="text-start fs-6 fw-bold m-0 blacks">TOTAL REVENUE</p>
                                        <p className="fs-6">{customerDetailData?.total_revenue || '0'}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-start fs-6 fw-bold m-0 blacks">PRICE LIST</p>
                                    <p className="fs-6">{customerDetailData?.price_list_name}</p>
                                    <div className="mt-1">
                                        <p className="text-start fs-6 fw-bold m-0 blacks">AMOUNT DUE</p>
                                        <p className="fs-6" style={{ color: '#e74023' }}>
                                            {customerDetailData?.due_amount}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-start fs-6 fw-bold m-0 blacks">STORE</p>
                                    <p className="fs-6">{customerDetailData?.store_id}</p>
                                    <div className="mt-1">
                                        <p className="text-start fs-6 fw-bold m-0 blacks">TOTAL PENDING</p>
                                        <p className="fs-6">{customerDetailData?.pending_orders}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-start fs-6 fw-bold m-0 blacks">WALLET BALANCE</p>
                                    <p className="fs-6">{customerDetailData?.wallet_amount}</p>
                                </div>
                                <div>
                                    <p className="text-start fs-6 fw-bold m-0 blacks">CREDIT</p>
                                    <p className="fs-6">{customerDetailData?.credit_used}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </Card>
            <Card className="rounded-4 p-2">
                <div className="d-flex justify-content-between ">
                    <div className="d-flex">
                        <h4 className="blacks">Order History</h4>
                        <div
                            className="d-flex align-items-center rounded border ms-4 align-self-center"
                            style={{ height: 'fit-content' }}>
                            <span className="mdi mdi-magnify ms-1" style={{ fontSize: 'large' }}></span>
                            <InputGroup>
                                <Form.Control
                                    placeholder="Search..."
                                    className="border-0"
                                    onChange={(e) => {
                                        setSearchText(e.target.value);
                                    }}
                                />
                            </InputGroup>
                        </div>
                    </div>
                    <Button variant="outline-dark" onClick={() => setOpenTableOption(!openTableOption)}>
                        <i class="bi bi-gear"></i>&nbsp;&nbsp;Hide Fields
                    </Button>
                </div>
                {customerDetailData?.orders?.length > 0 ? (
                    <div className="mt-2 table_container rounded-1">
                        <OrderTable data={customerDetailData?.orders} openTableOption={openTableOption} />
                    </div>
                ) : (
                    <Row>
                        <Col xs={12} className="text-center">
                            <h4>No Order Detail Found</h4>
                        </Col>
                    </Row>
                )}
            </Card>
        </>
    );
};

export default CustomerDetail;
