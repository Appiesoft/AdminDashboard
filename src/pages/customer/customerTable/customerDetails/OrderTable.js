import React, { useMemo, useState, useRef } from 'react';
import { useTable, useResizeColumns, useFlexLayout, useColumnOrder, usePagination } from 'react-table';
import './OrderTable.css';
import { Form } from 'react-bootstrap';
import Model from '../DeleteModal';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../CustomerTable.css';

const OrderTable = ({ data, openTableOption }) => {
    const [currentColumn, setCurrentColumn] = useState(null);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const componentRef = useRef();

    const COLUMNS = [
        {
            Header: 'Order',
            accessor: 'invoice_number',
            Cell: ({ value }) => <span style={{ color: '#e74023' }}>{value}</span>,
        },
        {
            Header: 'Order Date',
            accessor: (row) => (row.order_date ? row.order_date : 'N/A'),
        },
        {
            Header: 'Order Status',
            accessor: (row) => (row.order_status ? row.order_status : 'N/A'),
        },
        {
            Header: 'Qty/kg',
            accessor: (row) => (row.qty ? row.qty : 'N/A'),
        },
        {
            Header: 'Price List',
            accessor: () => 'Current Price List',
        },
        {
            Header: 'Currency',
            accessor: (row) => (row.currency ? row.currency : 'N/A'),
        },
        {
            Header: 'Amount',
            accessor: (row) => (row.total_amount ? row.total_amount : 'N/A'),
        },
        {
            Header: 'Details',
            accessor: (row) => (row.details ? row.details : 'N/A'),
        },
        {
            Header: 'Adjustment',
            accessor: (row) => (row.adjustment ? row.adjustment : 'N/A'),
        },
        {
            Header: 'Due Amount',
            accessor: (row) => (row.amount_due ? row.amount_due : 'N/A'),
        },
        {
            Header: 'Payment',
            accessor: (row) => (row.paid_status ? row.paid_status : 'N/A'),
        },
        {
            Header: 'Remarks',
            accessor: (row) => (row.remark ? row.remark : 'N/A'),
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <DropdownButton
                    as="span"
                    variant="link"
                    align={{ sm: 'end' }}
                    id={`dropdown-row-${row.id}`}
                    title={<i className="bi bi-three-dots"></i>}>
                    <Dropdown.Item className="my-dropdown-item">
                        <i class="bi bi-upc-scan"></i>&nbsp;&nbsp;Barcode
                    </Dropdown.Item>
                    <Dropdown.Item className="my-dropdown-item">
                        <i class="bi bi-receipt"></i>&nbsp;&nbsp; Invoice
                    </Dropdown.Item>
                    <Dropdown.Item className="my-dropdown-item">
                        <i class="bi bi-receipt-cutoff"></i>&nbsp;&nbsp; Mini Invoice
                    </Dropdown.Item>
                    <Dropdown.Item className="my-dropdown-item">
                        <i className="mdi mdi-delete"></i>&nbsp;&nbsp;Delete
                    </Dropdown.Item>
                    <Dropdown.Item className="my-dropdown-item">
                        <i class="bi bi-envelope"></i>&nbsp;&nbsp;Send sms
                    </Dropdown.Item>
                </DropdownButton>
            ),
            width: 100,
        },
    ];

    const columns = useMemo(() => COLUMNS, []);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        prepareRow,
        setColumnOrder,
        allColumns,
        getToggleHideAllColumnsProps,
        visibleColumns,
    } = useTable(
        {
            columns,
            data: data ? data : [],
        },
        useResizeColumns,
        useFlexLayout,
        useColumnOrder,
        usePagination
    );

    function dragEnterHandler(e, column) {
        e.preventDefault();
        if (column === currentColumn) return;
        const arr = [...visibleColumns.map((d) => d.id)];
        const currentIndex = arr.indexOf(currentColumn.id);
        arr.splice(currentIndex, 1);
        const dropIndex = arr.indexOf(column.id);
        if (currentIndex > dropIndex) arr.splice(dropIndex, 0, currentColumn.id);
        else arr.splice(dropIndex + 1, 0, currentColumn.id);
        setColumnOrder(arr);
    }
    function dragStartHandler(e, column) {
        setCurrentColumn(column);
    }

    function dropHandler(e, column) {
        setCurrentColumn(null);
    }

    return (
        <>
            {openTableOption && (
                <div className="dropDown" style={{ transition: 'all 0.5s ease-in' }}>
                    <div className="column_toggle">
                        <Form.Label> &nbsp; &nbsp;&nbsp;Show ALL</Form.Label>
                        <Form.Check
                            type="switch"
                            name="check_box"
                            {...getToggleHideAllColumnsProps()}
                            id="custom-switch"
                            label=""
                        />
                    </div>
                    {allColumns.map((column) => (
                        <div key={column.id}>
                            {typeof column.Header === 'string' && (
                                <div
                                    className="column_toggle"
                                    draggable={true}
                                    onDragEnter={(e) => dragEnterHandler(e, column)}
                                    onDragStart={(e) => dragStartHandler(e, column)}
                                    onDrop={(e) => dropHandler(e, column)}>
                                    <Form.Label>
                                        {' '}
                                        <i class="bi bi-grip-vertical"></i>&nbsp;{column.Header}
                                    </Form.Label>
                                    <Form.Check
                                        checked={column.isVisible}
                                        type="switch"
                                        name="check_box"
                                        {...column.getToggleHiddenProps()}
                                        id="custom-switch"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <table {...getTableProps()} className="table" ref={componentRef}>
                <thead className="tableHead">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="tableHeaderRow">
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} className="tableHeading">
                                    {column.render('Header')}
                                    {column.canResize && <div {...column.getResizerProps()} className={`resizer`} />}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()} className="tableBodyRow">
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Model show={isDeleteModelOpen} onHide={setIsDeleteModelOpen} deleteRecord={setDeleteRecordConfirmation} />
        </>
    );
};

export default OrderTable;
