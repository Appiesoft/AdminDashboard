import React from 'react';
import './Pagination.css';

function getPaginationArray(currentPage, lastPage) {
    if (lastPage <= 5) {
        return Array.from({ length: lastPage }, (_, i) => (i + 1 <= lastPage ? i + 1 : NaN));
    }
    const minDigit = Math.max(currentPage - 2, 1);
    const maxDigit = Math.min(currentPage + 2, lastPage);
    const length = maxDigit - minDigit + 1;

    if (length < 5) {
        if (currentPage <= (lastPage - minDigit) / 2 + minDigit) {
            return Array.from({ length: 5 }, (_, i) => (minDigit + i <= lastPage ? minDigit + i : lastPage));
        } else {
            return Array.from({ length: 5 }, (_, i) => (maxDigit - 4 + i >= 1 ? maxDigit - 4 + i : 1));
        }
    } else {
        return Array.from({ length: 5 }, (_, i) => currentPage - 2 + i);
    }
}

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
    const onPrevious = () => {
        if (currentPage - 1 >= 1) {
            onPageChange(currentPage - 1);
        }
    };

    const onNext = () => {
        if (currentPage + 1 <= totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="d-flex gap-1">
            <span
                className={`uil  uil-angle-double-left align-self-center icon pageNumber ${
                    currentPage - 1 < 1 && 'disable'
                }`}
                onClick={() => onPageChange(1)}
            />
            <span
                className={`uil  uil-angle-left align-self-center icon pageNumber ${currentPage - 1 < 1 && 'disable'}`}
                onClick={onPrevious}
            />

            {getPaginationArray(currentPage, totalPages).map((page) => {
                if (typeof page === 'number' && !isNaN(page)) {
                    return (
                        <span
                            className={`align-self-center pageNumber ${currentPage == page && 'currentPage'}`}
                            key={page}
                            onClick={() => onPageChange(page)}>
                            {page}
                        </span>
                    );
                } else {
                    return null;
                }
            })}
            <span
                className={`uil uil-angle-right align-self-center ms-1 icon pageNumber ${
                    currentPage + 1 > totalPages && 'disable'
                }`}
                onClick={onNext}
            />
            <span
                className={`uil uil-angle-double-right align-self-center ms-1 icon pageNumber ${
                    currentPage + 1 > totalPages && 'disable'
                }`}
                onClick={() => onPageChange(totalPages)}
            />
        </div>
    );
};

export default Pagination;
