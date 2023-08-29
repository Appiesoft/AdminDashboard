import React, { useState, useEffect } from 'react';
import './CustomerTable.css';
import { InputGroup, Form, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { costomerList } from '../../../redux/actions';
import Loader from '../../../components/MainLoader';
import FormInput from '../../../components/FormInput';
import Table from './CustomerTable';
import Pagination from './Pagination';

const CustomerTable = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);

    // api data
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const costomerListData = store?.CostomerList?.costomerList?.data;
    const paginationValues = store?.CostomerList?.costomerList?.meta?.pagination;
    const constomerListLoader = store.CostomerList;
    //api calls
    const getCustomerList = () => {
        dispatch(
            costomerList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: [],
            })
        );
    };

    useEffect(() => {
        getCustomerList();
    }, [page, showLimit, searchText]);

    //table options
    const handlePrintPdf = () => {
        setPrintPdf(true);
        setTimeout(() => setPrintPdf(false), 1000);
    };
    const handleExportPdf = () => {
        setExportPdf(true);
        setTimeout(() => setExportPdf(false), 1000);
    };
    const handleExportCSV = () => {
        setExportCSV(true);
        setTimeout(() => setExportCSV(false), 1000);
    };

    return (
        <Card style={{ marginTop: '1.5rem' }}>
            <div className="d-flex justify-content-between mx-2 my-1">
                <div className="d-flex gap-2 ps-0 my-1">
                    <h4 className="page-title color">Customer List</h4>
                    <div
                        className="d-none d-sm-flex align-items-center rounded border align-self-center"
                        style={{ height: 'fit-content' }}>
                        <span className="mdi mdi-magnify ms-1" style={{ fontSize: 'large' }}></span>
                        <InputGroup>
                            <Form.Control
                                placeholder="Search..."
                                className="border-0"
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                }}
                            />
                        </InputGroup>
                    </div>
                </div>
                <div className="col-sm-6 d-flex my-1 pe-0 align-self-center gap-1 justify-content-end">
                    <span className="text-center p-1 border rounded-2 tableOption color" onClick={handleExportPdf}>
                        <i className="bi bi-file-earmark-pdf fs-4"></i>
                    </span>
                    <span className="text-center p-1 border rounded-2 tableOption color" onClick={handleExportCSV}>
                        <i className="bi bi-file-earmark-x fs-4"></i>
                    </span>
                    <span className="text-center p-1 border rounded-2 tableOption color" onClick={handlePrintPdf}>
                        <i className="bi bi-printer fs-4"></i>
                    </span>
                    <span
                        className="text-center p-1 border rounded-2 tableOption color"
                        onClick={() => setOpenTableOption(!openTableOption)}>
                        <i className="bi bi-gear fs-4"></i>
                    </span>
                </div>
            </div>
            <div className="d-flex d-sm-none justify-content-center gap-2 mx-2">
                <div
                    className="d-flex align-items-center rounded border align-self-center"
                    style={{ height: 'fit-content' }}>
                    <span className="mdi mdi-magnify ms-1" style={{ fontSize: 'large' }}></span>
                    <InputGroup>
                        <Form.Control
                            placeholder="Search..."
                            className="border-0"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                    </InputGroup>
                </div>
            </div>
            {constomerListLoader?.loading && !costomerListData ? (
                <Loader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        <Table
                            data={costomerListData}
                            printPdf={printPdf}
                            exportPdf={exportPdf}
                            exportCSV={exportCSV}
                            openTableOption={openTableOption}
                            onClickOutside={() => setOpenTableOption(false)}
                        />
                    </div>
                    {paginationValues && (
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
                                <div>
                                    <p className="mb-0  color font-13">
                                        Page:{' '}
                                        <span className="fw-bold color">
                                            {paginationValues?.current_page} of {paginationValues?.total_page}
                                        </span>
                                    </p>
                                </div>
                                <div className="d-none d-sm-flex align-items-center color font-13">
                                    <p className="mb-0  fw-bold color">Go to page: &nbsp; </p>
                                    <Form.Control
                                        required
                                        min={1}
                                        value={page}
                                        type="number"
                                        className="input_Style px-1 py-1 color font-12"
                                        onChange={(e) => {
                                            setPage(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-sm-end justify-content-between col-12 col-sm-4">
                                <div className="d-flex d-sm-none align-items-center color font-13">
                                    <p className="mb-0  fw-bold color">Go to page: &nbsp; </p>
                                    <Form.Control
                                        required
                                        min={1}
                                        value={page}
                                        type="number"
                                        className="input_Style px-1 py-1 color font-12"
                                        onChange={(e) => {
                                            setPage(e.target.value);
                                        }}
                                    />
                                </div>
                                <Pagination
                                    currentPage={parseInt(paginationValues?.current_page)}
                                    totalPages={paginationValues?.total_page}
                                    onPageChange={(page) => setPage(page)}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </Card>
    );
};

export default CustomerTable;
