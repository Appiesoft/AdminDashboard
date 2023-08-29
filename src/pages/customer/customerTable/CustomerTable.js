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
import './CustomerTable.css';

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
            Header: 'Name',
            accessor: (row) => row.first_name + ' ' + row.last_name,
        },
        {
            Header: 'Mobile',
            accessor: (row) => (row.mobile ? row.mobile : 'N/A'),
        },
        {
            Header: 'Email',
            accessor: (row) => (row.email_id ? row.email_id : 'N/A'),
            minWidth: 200,
        },
        {
            Header: 'Address',
            accessor: (row) =>
                row.address1
                    ? row.address1 + ' ' + row.address2 + ' ' + row.city + '' + row.state + ' ' + row.zipcode
                    : 'N/A',
            minWidth: 200,
        },
        {
            Header: 'Join Date',
            accessor: (row) => (row.join_date ? new Date(row.join_date).toLocaleDateString() : 'N/A'),
        },
        {
            Header: 'Discount/Charges',
            accessor: (row) =>
                row.charges
                    ? row.charges
                          .slice(0, 3)
                          .map((charge) =>
                              charge.charge_type === 'percentage'
                                  ? charge.charge_name + '(' + charge.charge_amount + '%)'
                                  : charge.charge_name + '(' + charge.charge_amount + ')'
                          )
                          .join(',\n ')
                    : 'N/A',
            minWidth: 200,
        },
        {
            Header: 'Promo/Coupons',
            accessor: (row) =>
                row.discount && row.discount.length > 0
                    ? row.discount
                          .map((charge) =>
                              charge.charge_type === 'percentage'
                                  ? charge.charge_name + '(' + charge.charge_amount + '%)'
                                  : charge.charge_name + '(' + charge.charge_amount + ')'
                          )
                          .join(', ')
                    : 'N/A',
            minWidth: 200,
        },
        {
            Header: 'Location',
            accessor: (row) =>
                row.add_default
                    ? row.add_default.replace('add_', '').charAt(0).toUpperCase() +
                      row.add_default.replace('add_', '').slice(1)
                    : 'N/A',
        },
        {
            Header: 'Status',
            accessor: (row) => (row.status ? row.status : 'N/A'),
        },
        {
            Header: 'Tax ID',
            accessor: (row) => (row.taxId ? row.taxId : 'N/A'),
        },
        {
            Header: 'Preferences',
            accessor: (row) => (row.preferences ? row.preferences : 'N/A'),
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <DropdownButton
                    as="span"
                    variant="link"
                    align={{ sm: 'end' }}
                    className='actionButton'
                    id={`dropdown-row-${row.id}`}
                    title={<i className="bi bi-three-dots"></i>}>
                    <Dropdown.Item
                        className="my-dropdown-item"
                        onClick={() => {
                            // handleCustomerDetail(row.original.id);
                            dispatch(customerDetail({ customerId: row?.original?.id }));
                            navigate(`/customer/customerdetail/${row?.original?.id}`);
                        }}>
                        <i className="mdi mdi-book-information-variant"></i>&nbsp;&nbsp;Detail
                    </Dropdown.Item>
                    <Dropdown.Item className="my-dropdown-item">
                        <i className="mdi mdi-square-edit-outline"></i>&nbsp;&nbsp; Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="my-dropdown-item"
                        onClick={() => {
                            setIsDeleteModelOpen(true);
                        }}>
                        <i className="mdi mdi-delete"></i>&nbsp;&nbsp;Delete
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

    // check outside click of table options dropdown
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
