import React from 'react';
import { useNavigate } from 'react-router-dom';

const BreadCrumb = ({ prevPage, currPage }) => {
    const navigate = useNavigate();
    return (
        <div className="d-flex my-2">
            <p onClick={() => navigate(-1)} className="fs-6 blacks fw-semibold" style={{ cursor: 'pointer' }}>
                {prevPage}
            </p>
            <i class="bi bi-chevron-compact-right fs-6 fw-bold"></i>
            <p className="fs-6 fw-semibold" style={{ color: '#e74023' }}>
                {currPage}
            </p>
        </div>
    );
};

export default BreadCrumb;
