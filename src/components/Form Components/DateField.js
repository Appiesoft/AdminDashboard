import React from 'react';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { FloatingLabel, Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import './Field.css';
// import './DateField.css';

const CustomInput = ({ value, onClick, label, onChange, error }) => (
    <div className="d-flex border rounded-2">
        <FloatingLabel controlId="floatingInput" label={label} className={`w-100 ${error && 'text-danger'}`}>
            <input
                className="form-control border border-0"
                placeholder={label}
                value={value}
                onClick={onClick}
                onChange={onChange}
            />
        </FloatingLabel>
        <div style={{ marginLeft: '1px !important', width: '15%' }}>
            <span
                className="bg-primary text-white d-flex justify-content-center align-items-center rounded-end"
                style={{ height: 'calc(2.9rem + 2px)' }}>
                <i className="mdi mdi-calendar-range font-15"></i>
            </span>
        </div>
    </div>
);

const DateField = ({ field, error, errorMessage, label }) => {
    return (
        <>
            <DatePicker
                // ref={field.ref}
                // onBlur={field.onBlur}
                dateFormat="dd/MM/yyyy"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                customInput={
                    <CustomInput label={label} onChange={(e) => field.onChange(e.target.value)} error={error} />
                }
            />
            {error && <Form.Text className="text-danger text-start">{errorMessage}</Form.Text>}
        </>
    );
};

export default DateField;
