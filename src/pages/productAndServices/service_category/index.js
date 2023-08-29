import React, { useState, useEffect } from 'react';
import { Card, DropdownButton, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { serviceCategoryList, serviceCategoryDelete } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/TablePage/PageHeader';
import ToastHandle from '../../../helpers/toastMessage';
import Table from '../../../components/TablePage/Table';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import MainLoader from '../../../components/MainLoader';
import DeleteModal from '../../../components/DeleteModal';
import AddServiceCategoryModal from './modal';

const ServiceAndCategory = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);
    const [seletedItem, setSeletedItem] = useState(null);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [newServiceCategory, setNewServiceCategory] = useState(false);
    const [editRow, setEditRow] = useState(null);

    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const serviceCategoryLoader = store.ServiceCategoryList?.loading;
    const pagination = store.ServiceCategoryList?.serviceCategoryList?.meta?.pagination;
    const serviceCategoryData = store.ServiceCategoryList?.serviceCategoryList?.data;
    const serviceCategoryDeleteStatus = store?.ServiceCategoryDelete;

    const getServiceCategoryList = () => {
        dispatch(
            serviceCategoryList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    };

    useEffect(() => {
        getServiceCategoryList();
    }, [page, showLimit, searchText]);

    useEffect(() => {
        if (deleteRecordConfirmation) {
            dispatch(serviceCategoryDelete({ id: seletedItem }));
            setSeletedItem(null);
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    useEffect(() => {
        if (serviceCategoryDeleteStatus?.status === true) {
            ToastHandle('success', serviceCategoryDeleteStatus?.message);
            getServiceCategoryList();
        } else if (serviceCategoryDeleteStatus?.status === false) {
            ToastHandle('error', serviceCategoryDeleteStatus?.message);
        }
    }, [serviceCategoryDeleteStatus]);

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

    const COLUMNS = [
        {
            Header: 'Priority',
            accessor: (row) => (row.priority ? row.priority : 'N/A'),
        },
        {
            Header: 'Image',
            accessor: 'image',
            Cell: ({ row }) => (
                <span>
                    <img src={row?.original?.image} alt="product img" height="50px" width="50px" />
                </span>
            ),
        },
        {
            Header: 'Service Name',
            accessor: (row) => (row.service_name1 ? row.service_name1 : 'N/A'),
        },
        {
            Header: 'Service Name (English)',
            accessor: (row) => (row.service_name2 ? row.service_name2 : 'N/A'),
            width: 200,
        },
        {
            Header: 'Description',
            accessor: (row) => 'N/A',
        },
        {
            Header: 'Show/Hide',
            accessor: (row) => (row.show_hide ? row.show_hide : 'N/A'),
        },

        {
            Header: 'Sow/Hide On Website',
            accessor: (row) => (row.show_hide_on_website ? row.show_hide_on_website : 'N/A'),
            width: 200,
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
                        // onClick={() => navigate(`/productservices/serviceAndCategory/add/${row?.original?.id}`)}
                        onClick={() => {
                            setEditRow(row?.original);
                            setNewServiceCategory(true);
                        }}>
                        <i className="mdi mdi-square-edit-outline"></i>&nbsp;&nbsp; Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="my-dropdown-item"
                        onClick={() => {
                            setSeletedItem(row?.original?.id);
                            setIsDeleteModelOpen(!isDeleteModelOpen);
                        }}>
                        <i className="mdi mdi-delete"></i>&nbsp;&nbsp;Delete
                    </Dropdown.Item>
                </DropdownButton>
            ),
            width: 100,
        },
    ];

    return (
        <Card style={{ marginTop: '1.5rem' }}>
            <PageHeader
                title="Services"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}>
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">New Service</Tooltip>}>
                    <span
                        className="text-center p-1 border rounded-2 tableOption color d-none d-sm-block"
                        // onClick={() => navigate('/productservices/serviceAndCategory/add')}
                        onClick={() => setNewServiceCategory(true)}>
                        <i className="bi bi-plus-lg fs-4 fw-bold"></i>
                    </span>
                </OverlayTrigger>
            </PageHeader>
            <AddServiceCategoryModal show={newServiceCategory} onHide={setNewServiceCategory} editRow={editRow} />
            {serviceCategoryLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(serviceCategoryData) ? (
                            <Table
                                Data={serviceCategoryData}
                                Columns={COLUMNS}
                                printPdf={printPdf}
                                exportPdf={exportPdf}
                                exportCSV={exportCSV}
                                openTableOption={openTableOption}
                                onClickOutside={() => setOpenTableOption(false)}
                            />
                        ) : (
                            <h4 className="text-center">Oops There is No Data To Show</h4>
                        )}
                    </div>
                    {pagination && (
                        <PaginationArea
                            setShowLimit={setShowLimit}
                            current_page={pagination?.current_page}
                            total_page={pagination?.total_page}
                            setPage={setPage}
                            page={page}
                        />
                    )}
                </>
            )}
            <DeleteModal
                show={isDeleteModelOpen}
                onHide={setIsDeleteModelOpen}
                deleteRecord={setDeleteRecordConfirmation}
            />
        </Card>
    );
};

export default ServiceAndCategory;
