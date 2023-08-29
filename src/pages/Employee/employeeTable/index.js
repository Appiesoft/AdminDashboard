import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Table from './Table';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../components/TablePage/PageHeader';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import MainLoader from '../../../components/MainLoader';
import { employeeDelete, employeeDetails, employeeList, employeeDetailsReset } from '../../../redux/actions';

const EmployeeTable = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const employeListData = store.EmployeeList;
    const employeeListLoader = store.EmployeeList;
    const pagination = store.EmployeeList?.employeeList?.meta?.pagination;


    useEffect(() => {
        dispatch(
            employeeList({
                storeId: [],
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
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
            <PageHeader
                title="Employee"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}
                link="createEmployee"
                action={employeeDetailsReset}
            />
            {employeeListLoader.loading ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        <Table
                            data={employeListData?.employeeList?.data}
                            printPdf={printPdf}
                            exportPdf={exportPdf}
                            exportCSV={exportCSV}
                            openTableOption={openTableOption}
                            onClickOutside={() => setOpenTableOption(false)}
                        />
                    </div>
                    <PaginationArea
                        setShowLimit={setShowLimit}
                        current_page={pagination?.current_page}
                        total_page={pagination?.total_page}
                        setPage={setPage}
                        page={page}
                    />
                </>
            )}
        </Card>
    );
};

export default EmployeeTable;
