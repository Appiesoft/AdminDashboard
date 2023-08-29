import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { smsAndEmail } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import SMSTable from './SettingsTable/SMSTable';
import EmailTable from './SettingsTable/EmailTable';
import NotificationTable from './SettingsTable/NotificationTable';
import MainLoader from '../../../components/MainLoader';

const SmsAndEmail = () => {
    const [selectedSettings, setSelectedSettings] = useState('SMS');
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const tableLoader = store.SmsAndEmail?.loading;
    const tableData = store.SmsAndEmail?.smsAndEmail?.data;
    console.log('Table data: ', tableData);

    useEffect(() => {
        dispatch(
            smsAndEmail({
                type: selectedSettings,
            })
        );
    }, [selectedSettings]);
    return (
        <Card style={{ marginTop: '1.5rem' }}>
            <div className="d-flex justify-content-between mx-2 my-1">
                <div className="d-flex gap-2 ps-0 my-1">
                    <h4 className="page-title color">SMS/Email Settings</h4>
                    {/* <div
                        className="d-none d-sm-flex align-items-center rounded border align-self-center"
                        style={{ height: 'fit-content' }}>
                        <span className="mdi mdi-magnify ms-1" style={{ fontSize: 'large' }}></span>
                        <InputGroup>
                            <Form.Control
                                placeholder="Search..."
                                className="border-0"
                                onChange={(e) => {
                                    searchItem(e.target.value);
                                }}
                            />
                        </InputGroup>
                    </div> */}
                </div>
                <div className="col-sm-6 d-flex my-1 pe-0 align-self-center gap-1 justify-content-end">
                    <span
                        className="px-2 py-1 border rounded-2 fw-semibold btn-hover"
                        onClick={() => setSelectedSettings('SMS')}
                        style={{
                            backgroundColor: selectedSettings === 'SMS' && '#e74023',
                            color: selectedSettings === 'SMS' && 'white',
                        }}>
                        SMS Settings
                    </span>
                    <span
                        className="px-2 py-1 border rounded-2 fw-semibold btn-hover"
                        style={{
                            backgroundColor: selectedSettings === 'EMAIL' && '#e74023',
                            color: selectedSettings === 'EMAIL' && 'white',
                        }}
                        onClick={() => setSelectedSettings('EMAIL')}>
                        Email Settings
                    </span>
                    <span
                        className="px-2 py-1 border rounded-2 fw-semibold btn-hover"
                        style={{
                            backgroundColor: selectedSettings === 'NOTIFICATION' && '#e74023',
                            color: selectedSettings === 'NOTIFICATION' && 'white',
                        }}
                        onClick={() => setSelectedSettings('NOTIFICATION')}>
                        Notification Settings
                    </span>
                </div>
            </div>
            {tableLoader ? (
                <MainLoader />
            ) : (
                <>
                    {selectedSettings === 'SMS' ? (
                        <SMSTable data={tableData} />
                    ) : selectedSettings === 'EMAIL' ? (
                        <EmailTable data={tableData} />
                    ) : (
                        <NotificationTable data={tableData} />
                    )}
                </>
            )}
        </Card>
    );
};

export default SmsAndEmail;
