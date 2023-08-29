import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useTable, useResizeColumns, useFlexLayout, useColumnOrder, usePagination } from 'react-table';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Table.css';
import Table from '../../../components/TablePage/Table';
import DeleteModal from '../../../components/DeleteModal';
import { employeeDelete, employeeDetails, employeeList } from '../../../redux/actions';
import ToastHandle from '../../../helpers/toastMessage';

const EmployeeTable = ({ data, printPdf, exportPdf, exportCSV, openTableOption, onClickOutside }) => {
    const [currentColumn, setCurrentColumn] = useState(null);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [seletedItem, setSeletedItem] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useSelector((state) => state);
    const employeeDeleteData = store.EmployeeDelete;
    const employeeStatus = store?.EmployeeDelete?.status;
    const emoloyeeMessage = store?.EmployeeDelete?.message;

    const ref = useRef();
    const componentRef = useRef();
    const csvLinkRef = useRef();

    console.log('seletedItem :', seletedItem);

    const COLUMNS = [
        {
            Header: 'Join Date',
            accessor: (row) => (row.join_date ? row.join_date : 'N/A'),
        },
        {
            Header: 'Name',
            accessor: (row) => (row.first_name ? row.first_name + ' ' + row.last_name : 'N/A'),
        },
        {
            Header: 'Contact',
            accessor: (row) =>
                row.country_code ? row.country_code + ' ' + row.mobile : row.mobile ? row.mobile : 'N/A',
            minWidth: 200,
        },
        {
            Header: 'Member Group',
            accessor: (row) => (row.designation ? row.designation : 'N/A'),
            minWidth: 200,
        },
        {
            Header: 'Laundry Stores',
            accessor: (row) =>
                row.store_list
                    ? row.store_list
                          .map((store) => {
                              if (store != null) {
                                  return store;
                              }
                          })
                          .join(',')
                    : 'N/A',
        },
        {
            Header: 'Login Status',
            accessor: 'status',
            Cell: ({ value }) => (
                <span
                    className="rounded-2 p-1"
                    style={{
                        backgroundColor: value === 'enable' ? 'lightgreen' : value === 'disable' ? '#f6b6b6' : 'white',
                        color: value === 'enable' ? 'green' : value === 'disable' ? 'red' : 'black',
                    }}>
                    {value ? value : 'N/A'}
                </span>
            ),
            minWidth: 200,
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <DropdownButton
                    as="span"
                    variant="link"
                    align={{ sm: 'end' }}
                    className="actionButton"
                    id={`dropdown-row-${row.id}`}
                    title={<i className="bi bi-three-dots"></i>}>
                    <Dropdown.Item
                        className="my-dropdown-item"
                        onClick={() => {
                            navigate(`/createEmployee/${row?.original?.emp_id}`);
                            dispatch(employeeDetails({ employeeId: row?.original?.emp_id }));
                        }}>
                        <i className="mdi mdi-square-edit-outline"></i>&nbsp;&nbsp; Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="my-dropdown-item"
                        onClick={() => {
                            setIsDeleteModelOpen(!isDeleteModelOpen);
                            setSeletedItem(row?.original?.emp_id);
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
            dispatch(
                employeeDelete({
                    employeeId: seletedItem,
                })
            );
            setSeletedItem(null);
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    useEffect(() => {
        if (employeeDeleteData.status) {
            dispatch(
                employeeList({
                    storeId: [],
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
        }
    }, [employeeDeleteData]);

    useEffect(() => {
        if (employeeStatus) {
            ToastHandle('success', emoloyeeMessage);
        } else if (employeeStatus === false) {
            ToastHandle('error', emoloyeeMessage);
        }
    }, [employeeStatus]);

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

export default EmployeeTable;
