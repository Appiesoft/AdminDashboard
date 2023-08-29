import React, { useState } from 'react';
import { FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import './Field.css';

const Field = ({ label, placeholder, disabled, type, error, errorMessage, register }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            {type === 'password' ? (
                <InputGroup className={`border rounded ${error && 'text-danger border-danger'}`}>
                    <FloatingLabel
                        controlId={`floatingInput-${label}`}
                        label={label}
                        className={`${error ? 'floatingLabel' : 'form-floating'}`}
                        style={{ width: '85%' }}>
                        <Form.Control
                            type={showPassword ? 'text' : type}
                            placeholder={placeholder}
                            disabled={disabled}
                            isInvalid={error}
                            style={{ border: 'none' }}
                            {...register}
                        />
                    </FloatingLabel>
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            width: '15%',
                            backgroundColor: '#eef2f7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '0px',
                        }}
                        className="rounded-end">
                        {showPassword ? <i className="bi bi-eye-fill fs-4"></i> : <i className="bi bi-eye-slash-fill fs-4"></i>}
                    </div>
                </InputGroup>
            ) : type === 'color' ? (
                <FloatingLabel
                    controlId={`floatingInput-${label}`}
                    label={label}
                    className={error ? 'floatingLabel' : 'form-floating'}>
                    <Form.Control
                        type={type}
                        placeholder={placeholder}
                        disabled={disabled}
                        isInvalid={error}
                        className='colorField'
                        // style={{ width: '100%', padding: '10px !important' }}
                        {...register}
                    />
                </FloatingLabel>
            ) : (
                <FloatingLabel
                    controlId={`floatingInput-${label}`}
                    label={label}
                    className={error ? 'floatingLabel' : 'form-floating'}>
                    <Form.Control
                        type={type}
                        placeholder={placeholder}
                        disabled={disabled}
                        isInvalid={error}
                        {...register}
                    />
                </FloatingLabel>
            )}
            {error && <Form.Text className="text-danger">{errorMessage}</Form.Text>}
        </>
    );
};

export default Field;
