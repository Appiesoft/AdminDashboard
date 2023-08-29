import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import PaymentSettings from './Settings/paymentSetting';
import StripeSetting from './Settings/stripeSetting';
import TipSetting from './Settings/tipSetting';
import Charges from './Settings/chargesSetting';

const PaymentSetting = () => {
    const [currentSetting, setCurrentSetting] = useState('payment');
    return (
        <Card style={{ marginTop: '1.5rem' }}>
            <div className="d-flex justify-content-between mx-2 my-1">
                <div className="d-flex gap-2 ps-0 my-1">
                    <h4 className="page-title color">Payment Settings</h4>
                </div>
                <div className="col-sm-6 d-flex my-1 pe-0 align-self-center gap-1 justify-content-end">
                    <span
                        className="px-2 py-1 border rounded-2 fw-semibold btn-hover text-nowrap"
                        onClick={() => setCurrentSetting('payment')}
                        style={{
                            backgroundColor: currentSetting === 'payment' && '#e74023',
                            color: currentSetting === 'payment' && 'white',
                        }}>
                        Payment Settings
                    </span>
                    <span
                        className="px-2 py-1 border rounded-2 fw-semibold btn-hover text-nowrap"
                        style={{
                            backgroundColor: currentSetting === 'stripe' && '#e74023',
                            color: currentSetting === 'stripe' && 'white',
                        }}
                        onClick={() => setCurrentSetting('stripe')}>
                        Stripe Settings
                    </span>
                    <span
                        className="px-2 py-1 border rounded-2 fw-semibold btn-hover text-nowrap"
                        style={{
                            backgroundColor: currentSetting === 'tip' && '#e74023',
                            color: currentSetting === 'tip' && 'white',
                        }}
                        onClick={() => setCurrentSetting('tip')}>
                        Tip Settings
                    </span>
                    <span
                        className="px-2 py-1 border rounded-2 fw-semibold btn-hover text-nowrap"
                        style={{
                            backgroundColor: currentSetting === 'charges' && '#e74023',
                            color: currentSetting === 'charges' && 'white',
                        }}
                        onClick={() => setCurrentSetting('charges')}>
                        Payment Charges
                    </span>
                </div>
            </div>
            {currentSetting === 'payment' ? (
                <PaymentSettings />
            ) : currentSetting === 'stripe' ? (
                <StripeSetting />
            ) : currentSetting === 'tip' ? (
                <TipSetting />
            ) : (
                <Charges />
            )}
        </Card>
    );
};

export default PaymentSetting;
