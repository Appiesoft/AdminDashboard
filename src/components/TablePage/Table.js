import React,{useMemo,useState,useEffect,useRef} from 'react';
import { useTable, useResizeColumns, useFlexLayout, useColumnOrder, usePagination } from 'react-table';
import { CSVLink } from 'react-csv';
import { Form } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./Table.css"

const Table = ({ Data, Columns, printPdf, exportPdf, exportCSV, openTableOption, onClickOutside }) => {
    const [currentColumn, setCurrentColumn] = useState(null);
    const ref = useRef();
    const componentRef = useRef();
    const csvLinkRef = useRef();
    const columns = useMemo(() => Columns, []);
    const data = useMemo(() => Data, []);
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
        </>
    );
};

export default Table;
