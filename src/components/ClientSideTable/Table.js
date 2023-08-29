import React, { useMemo, useState } from 'react';
import { useTable, useResizeColumns, useFlexLayout, useColumnOrder, usePagination } from 'react-table';
import '../TablePage/Table.css';
import '../TablePage/Pagination.css';
import FormInput from '../FormInput';

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

const Table = ({ Data, Columns }) => {
    const columns = useMemo(() => Columns, []);
    const data = useMemo(() => Data, []);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
    } = useTable(
        {
            columns,
            data: data ? data : [],
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useResizeColumns,
        useFlexLayout,
        useColumnOrder,
        usePagination
    );
    const handlePageChange = (page) => {
        gotoPage(page);
    };
    const { pageIndex, pageSize } = state;

    return (
        <>
            <div className="mt-2 mx-2 table_container rounded-1">
                <table {...getTableProps()} className="table">
                    <thead className="tableHead">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="tableHeaderRow">
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()} className="tableHeading">
                                        {column.render('Header')}
                                        {column.canResize && (
                                            <div {...column.getResizerProps()} className={`resizer`} />
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="tableBodyRow">
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()} className="tableBodyCell">
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
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
                                gotoPage(0);
                                setPageSize(Number(e.target.value));
                            }}>
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </FormInput>
                    </div>
                    {pageCount >= 1 && (
                        <div>
                            <p className="mb-0  color font-13">
                                Page:{' '}
                                <span className="fw-bold color">
                                    {pageIndex+1} of {pageCount}
                                </span>
                            </p>
                        </div>
                    )}
                    {/* {pageCount >= 1 && (
                        <div className="d-none d-sm-flex align-items-center color font-13">
                            <p className="mb-0  fw-bold color">Go to page: &nbsp; </p>
                            <Form.Control
                                required
                                min={1}
                                // value={page}
                                disabled={pageCount === 1}
                                type="text"
                                className="input_Style px-1 py-1 color font-12"
                                onChange={(e) => {
                                    if (e.target.value === '') {
                                    } else if (pageCount < e.target.value) {
                                        setTimeout(() => {
                                            handlePageChange(1);
                                        }, 800);
                                    } else {
                                        setTimeout(() => {
                                            handlePageChange(e.target.value);
                                        }, 800);
                                    }
                                }}
                            />
                        </div>
                    )} */}
                </div>
                <div className="d-flex justify-content-sm-end justify-content-between col-12 col-sm-4">
                    {/* <div className="d-flex d-sm-none align-items-center color font-13">
                        <p className="mb-0  fw-bold color">Go to page: &nbsp; </p>
                        <Form.Control
                            required
                            type="text"
                            disabled={pageCount === 1}
                            className="input_Style px-1 py-1 color font-12"
                            onChange={(e) => {
                                if (e.target.value === '') {
                                } else if (pageCount < e.target.value) {
                                    setTimeout(() => {
                                        handlePageChange(1);
                                    }, 800);
                                } else {
                                    setTimeout(() => {
                                        handlePageChange(e.target.value);
                                    }, 800);
                                }
                            }}
                        />
                    </div> */}
                    <div className="d-flex gap-1">
                        <span
                            className={`uil  uil-angle-double-left align-self-center icon pageNumber ${
                                !canPreviousPage && 'disable'
                            }`}
                            onClick={() => gotoPage(0)}
                        />
                        <span
                            className={`uil  uil-angle-left align-self-center icon pageNumber ${
                                !canPreviousPage && 'disable'
                            }`}
                            onClick={() => previousPage()}
                        />

                        {getPaginationArray(pageIndex + 1, pageCount).map((page) => {
                            if (typeof page === 'number' && !isNaN(page)) {
                                return (
                                    <span
                                        className={`align-self-center pageNumber ${
                                            state.pageIndex+1 == page && 'currentPage'
                                        }`}
                                        key={page}
                                        onClick={() => handlePageChange(page - 1)}>
                                        {page}
                                    </span>
                                );
                            } else {
                                return null;
                            }
                        })}
                        <span
                            className={`uil uil-angle-right align-self-center ms-1 icon pageNumber ${
                                !canNextPage && 'disable'
                            }`}
                            onClick={() => nextPage()}
                        />
                        <span
                            className={`uil uil-angle-double-right align-self-center ms-1 icon pageNumber ${
                                !canNextPage && 'disable'
                            }`}
                            onClick={() => gotoPage(pageCount - 1)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Table;
