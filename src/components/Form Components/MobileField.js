import React from 'react';
import { InputGroup, FloatingLabel, Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import Flag from 'react-world-flags';
import './Field.css';

const MobileField = ({ error, current_build, country_code, register, label, disabled }) => {
    return (
        <>
            <InputGroup className={`border rounded ${error && 'text-danger border-danger'} ms-0`}>
                <div className={`d-flex justify-content-center align-items-center`} style={{ width: '30%' }}>
                    <Flag code={current_build ? current_build : 'in'} height="16" fallback={<span>N/A</span>} />
                    &nbsp; {country_code ? country_code : '+91'}
                </div>
                <FloatingLabel
                    controlId="floatingInput"
                    label={label}
                    style={{ width: '70%' }}
                    className="border-start ">
                    <InputMask
                        mask={current_build === 'us' ? '(999) 999-9999' : '99999 99999'}
                        maskChar={null}
                        placeholder="Enter phone number"
                        className="form-control rounded-0"
                        disabled={disabled || false}
                        // isInvalid={error}
                        {...register}
                        style={{ border: 'none' }}
                    />
                </FloatingLabel>
            </InputGroup>
            {error && <Form.Text className="text-danger text-start">{error?.message}</Form.Text>}
        </>
    );
};

export default MobileField;
