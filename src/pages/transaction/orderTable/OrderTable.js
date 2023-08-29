import React, { useMemo, useState, useRef } from 'react';
import { useTable, useResizeColumns, useFlexLayout, useColumnOrder, usePagination } from 'react-table';
// import { COLUMNS } from './Columns';
import { Form, OverlayTrigger, Tooltip, Dropdown, DropdownButton } from 'react-bootstrap';
import DeleteModal from './DeleteModal';
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { customerDetail } from '../../../redux/actions';
import './OrderTable.css';

const Table = ({ data, printPdf, exportPdf, exportCSV, openTableOption, onClickOutside }) => {
    const [currentColumn, setCurrentColumn] = useState(null);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ref = useRef();
    const componentRef = useRef();
    const csvLinkRef = useRef();

    const handleCustomerDetail = (row) => {
        console.log('Row', row);
    };

    const COLUMNS = [
        {
            id: 1,
            Header: 'Order',
            accessor: 'invoice_number',
            Cell: ({ value }) => <span style={{ color: '#e74023' }}>{value}</span>,
        },
        {
            id: 2,
            Header: 'Price List',
            accessor: (row) => 'N/A',
        },
        { id: 3, Header: 'Store', accessor: (row) => 'N/A' },
        {
            id: 4,
            Header: 'Customer Name',
            accessor: (row) => (row.customer_name ? row.customer_name : 'N/A'),
        },
        {
            id: 5,
            Header: 'Mobile',
            accessor: (row) => (row.customer_phone_number ? row.customer_phone_number : 'N/A'),
        },
        { id: 6, Header: 'Address', accessor: (row) => 'N/A' },
        {
            id: 7,
            Header: 'Order Date',
            accessor: (row) =>
                row.order_date ? new Date(row.order_date).toLocaleDateString() + '[' + row.order_time + ']' : 'N/A',
        },
        {
            id: 8,
            Header: 'Pickup Date',
            accessor: (row) =>
                row.pickup_date
                    ? new Date(row.pickup_date).toLocaleDateString() +
                      `${row.pickup_time ? ' [' + row.pickup_time + '] ' : ''}`
                    : 'N/A',
        },
        {
            id: 9,
            Header: 'Due Date',
            accessor: (row) =>
                row.delivery_date
                    ? new Date(row.delivery_date).toLocaleDateString() +
                      `${row.delivery_time ? ' [' + row.delivery_time + '] ' : ''}` +
                      `${row.days ? ' (' + row.days + ') ' : ''}`
                    : 'N/A',
        },
        {
            id: 10,
            Header: 'Order Status',
            accessor: (row) => (row.order_status ? row.order_status : 'N/A'),
        },
        { id: 11, Header: 'Order Type', accessor: (row) => 'N/A' },
        {
            id: 12,
            Header: 'Order Place',
            accessor: (row) => 'N/A',
        },
        {
            id: 13,
            Header: 'Order details',
            accessor: (row) => 'N/A',
        },
        {
            id: 14,
            Header: 'Total Quantity (pieces)',
            accessor: (row) => (row?.qty ? row?.qty + ' ' + row?.unit : 'N/A'),
            width:180,
        },
        {
            id: 15,
            Header: 'Currency',
            accessor: (row) => 'N/A',
        },
        {
            id: 16,
            Header: 'Amount',
            accessor: (row) => (row?.total_amount ? row?.total_amount : 'N/A'),
        },
        {
            id: 17,
            Header: 'Discount/Charges',
            accessor: (row) => 'N/A',
        },
        {
            id: 18,
            Header: 'Promo/Coupon',
            accessor: (row) => 'N/A',
        },
        {
            id: 19,
            Header: 'Details',
            accessor: (row) => 'N/A',
        },
        { id: 20, Header: 'Item Notes', accessor: (row) => (row?.item_note ? row?.item_note : 'N/A') },
        {
            id: 21,
            Header: 'Token No',
            accessor: (row) => 'N/A',
        },
        {
            id: 22,
            Header: 'Adjustment',
            accessor: (row) => 'N/A',
        },
        {
            id: 23,
            Header: 'Due Amount',
            accessor: (row) => 'N/A',
        },
        {
            id: 24,
            Header: 'Payment',
            accessor: (row) => (row?.paid_status ? row?.paid_status : 'N/A'),
        },
        {
            id: 25,
            Header: 'Remarks',
            accessor: (row) => 'N/A',
        },
        {
            id: 26,
            Header: 'Racks',
            accessor: (row) => (row?.rack_count ? row?.rack_count : 'N/A'),
        },
        {
            id: 27,
            Header: 'Actions',
            accessor: 'action_icons',
            Cell: ({ row }) => (
                <div className="tableHeadRow d-flex flex-wrap" key={row}>
                    <DropdownButton
                        as="span"
                        variant="link"
                        align={{ sm: 'end' }}
                        className="actionButton"
                        id={`dropdown-row-${row.id}`}
                        title={<i className="bi bi-three-dots"></i>}>
                        {row.original.action_icons.map((action, index) => (
                            <Dropdown.Item className="my-dropdown-item" key={index}>
                                {action?.name === 'Order Notes' ? (
                                    <i class="bi bi-journal-bookmark-fill"></i>
                                ) : action?.name === 'Delete Order' ? (
                                    <i class="bi bi-trash3"></i>
                                ) : action?.name === 'Mini Invoice' ? (
                                    <i class="bi bi-receipt-cutoff"></i>
                                ) : action?.name === 'Send Invoice' ? (
                                    <i class="bi bi-send-fill"></i>
                                ) : action?.name === 'Edit Order' ? (
                                    <i class="bi bi-pencil-square"></i>
                                ) : action?.name === 'Send SMS' ? (
                                    <i class="bi bi-envelope"></i>
                                ) : action?.name === 'Delivery Request' ? (
                                    <i class="bi bi-truck"></i>
                                ) : (
                                    <i class="bi bi-receipt"></i>
                                )}
                                &nbsp;&nbsp; {action?.name}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
            ),
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

    const headers = useMemo(
        () =>
            allColumns
                .filter((column) => column.isVisible)
                .map((column) => ({ label: column.Header, key: column.id + '' })),
        [allColumns]
    );

    const visibleData = useMemo(() => rows.map((row) => row.values), [rows]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleExportPDF = () => {
        const doc = new jsPDF('landscape');
        doc.autoTable({
            head: [visibleColumns.map((column) => column.Header)],
            body: page.map((row) => row.cells.map((cell) => cell.value)),
            styles: {
                lineColor: [0, 0, 0],
                textColor: [0, 0, 0],
                fontSize: 6,
            },
            headStyles: {
                fillColor: [200, 200, 200],
                textColor: [0, 0, 0],
                fontSize: 8,
            },
        });
        doc.save('table.pdf');
    };

    // table options
    useEffect(() => {
        if (printPdf) handlePrint();
    }, [printPdf]);
    useEffect(() => {
        if (exportPdf) handleExportPDF();
    }, [exportPdf]);
    useEffect(() => {
        if (exportCSV) csvLinkRef.current.link.click();
    }, [exportCSV]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    useEffect(() => {
        if (deleteRecordConfirmation) {
            console.log('deleteRecordConfirmation:', deleteRecordConfirmation);
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    return (
        <>
            <CSVLink data={visibleData} headers={headers} ref={csvLinkRef} />
            {openTableOption && (
                <div className="dropDown" style={{ transition: 'all 0.5s ease-in' }} ref={ref}>
                    <div className="column_toggle">
                        <Form.Label>Show ALL</Form.Label>
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
                                        <i className="bi bi-grip-vertical"></i>&nbsp;
                                        {column.Header}
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
            {/* table */}
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
            <DeleteModal
                show={isDeleteModelOpen}
                onHide={setIsDeleteModelOpen}
                deleteRecord={setDeleteRecordConfirmation}
            />
        </>
    );
};

export default Table;
