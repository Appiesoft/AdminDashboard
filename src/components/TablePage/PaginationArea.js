import React from 'react';
import FormInput from '../FormInput';
import { Form } from 'react-bootstrap';
import Pagination from './Pagination';

const PaginationArea = ({ setShowLimit, current_page, total_page, setPage, page }) => {
    return (
        <div className="mb-2 row g-0 mx-2">
            <div className="d-flex align-items-center  justify-content-between justify-content-sm-start  mt-2 mb-2 col-12 col-sm-8 gap-2">
                <div className="d-flex align-items-center">
                    <p className="mb-0 fw-bold color font-13">Display:&nbsp; </p>
                    <FormInput
                        name="select"
                        type="select"
                        className="form-select form-select-sm color font-13"
                        key="select"
                        onChange={(e) => {
                            setShowLimit(e.target.value);
                        }}>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </FormInput>
                </div>
                {total_page >= 1 && (
                    <div>
                        <p className="mb-0  color font-13">
                            Page:{' '}
                            <span className="fw-bold color">
                                {current_page} of {total_page}
                            </span>
                        </p>
                    </div>
                )}
                {total_page >= 1 && (
                    <div className="d-none d-sm-flex align-items-center color font-13">
                        <p className="mb-0  fw-bold color">Go to page: &nbsp; </p>
                        <Form.Control
                            required
                            min={1}
                            // value={page}
                            disabled={total_page === 1}
                            type="text"
                            className="input_Style px-1 py-1 color font-12"
                            onChange={(e) => {
                                // if(e.target.value==="")
                                // console.log('e.target.value', e.target.value);
                                if (e.target.value === '') {
                                } else if (total_page < e.target.value) {
                                    setTimeout(() => {
                                        setPage(1);
                                    }, 800);
                                } else {
                                    setTimeout(() => {
                                        setPage(e.target.value);
                                    }, 800);
                                }
                            }}
                        />
                    </div>
                )}
            </div>
            <div className="d-flex justify-content-sm-end justify-content-between col-12 col-sm-4">
                <div className="d-flex d-sm-none align-items-center color font-13">
                    <p className="mb-0  fw-bold color">Go to page: &nbsp; </p>
                    <Form.Control
                        required
                        // min={1}
                        // value={page}
                        // max={total_page}
                        type="text"
                        disabled={total_page === 1}
                        className="input_Style px-1 py-1 color font-12"
                        onChange={(e) => {
                            // if(e.target.value==="")
                            // console.log('e.target.value', e.target.value);
                            if (e.target.value === '') {
                            } else if (total_page < e.target.value) {
                                setTimeout(() => {
                                    setPage(1);
                                }, 800);
                            } else {
                                setTimeout(() => {
                                    setPage(e.target.value);
                                }, 800);
                            }
                        }}
                    />
                </div>
                <Pagination
                    currentPage={parseInt(current_page)}
                    totalPages={total_page}
                    onPageChange={(page) => setPage(page)}
                />
            </div>
        </div>
    );
};

export default PaginationArea;
