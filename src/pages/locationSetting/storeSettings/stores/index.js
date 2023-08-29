import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import StoreCard from './StoreCard';
import MainLoader from '../../../../components/MainLoader';
import { storeList } from '../../../../redux/actions';
import { useNavigate } from 'react-router-dom';

const Stores = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useSelector((state) => state);
    const storeListData = store?.StoreList;

    useEffect(() => {
        dispatch(
            storeList({
                searchValue: '',
            })
        );
    }, []);
    return (
        <Card style={{ marginTop: '1.5rem' }}>
            <div className="d-flex justify-content-between px-4 my-2">
                <h4 className="page-title color">Store Mangement</h4>
                <Button
                    className="text-white d-flex align-items-center fw-bolder rounded-pill"
                    onClick={() => navigate('/locationsetting/store')}>
                    <i className="bi bi-plus me-1 fs-4" />
                    Add Store
                </Button>
            </div>

            {storeListData.loading ? (
                <MainLoader />
            ) : (
                <div className="px-2 my-2 d-flex gap-2 flex-wrap justify-content-center">
                    {storeListData?.storeList?.map((item, index) => (
                        <StoreCard
                            key={index}
                            id={item?.store_id}
                            storeName={item.store_name}
                            phone={item.phone}
                            email={item.email}
                            taxNo={item.store_tax_no}
                            address={
                                item.address1 + item.address2 + ',' + item.city + ',' + item.state + ',' + item.zipcode
                            }
                        />
                    ))}
                </div>
            )}
        </Card>
    );
};

export default Stores;
