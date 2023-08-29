import React, { useState } from 'react'
import { Row, Col, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import StoreList from './storeList/StoreList'
import AddStoreForm from './addStore/AddStoreForm';

const Index = () => {
    // component show/hide
    const [tableBtn, setTableBtn] = useState(false);

    const showBtn = () => {
        setTableBtn(!tableBtn);
    };
    return (<>
        {/* <Row>
            <Col>
                <StoreList />
                <EditStoreForm />
            </Col>
        </Row> */}
        <Row className='mt-3'>
            <Col>{!tableBtn ? <StoreList showBtn={showBtn} /> : <AddStoreForm showBtn={showBtn} />}</Col>
        </Row>
    </>


    )
}

export default Index