import React from 'react';
import { usePagination, DOTS } from './usePagination';
import Pagination from "react-bootstrap/Pagination";
import './Paginations.css'

const Paginations = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <>
            <Pagination>
                <Pagination
                    className="mx-2 btn-hover px-2 d-flex align-items-center"
                    onClick={currentPage === 1 ? null : onPrevious}
                >
                    {/* <i className="uil uil-angle-double-left"></i> */}
                    <i className="uil uil-angle-left"></i>
                </Pagination>
                {paginationRange.map(pageNumber => {
                    if (pageNumber === DOTS) {
                        return <Pagination className='pagination_style'>...</Pagination>;
                    }

                    return (
                        <Pagination
                            className={pageNumber === currentPage ? " mx-2  pagination_style bg-primary text-white d-flex  align-items-center" : " mx-2 btn-hover  px-2 d-flex align-items-center"}
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </Pagination>
                    );
                })}
                <Pagination
                    className="mx-2 btn-hover  px-2 d-flex align-items-center"
                    onClick={currentPage === lastPage ? null : onNext}
                >
                    <i className="uil uil-angle-right"></i>
                </Pagination>
            </Pagination>
        </>
    );
};

export default Paginations;
