import React, { useState, useEffect } from 'react';
import { Card, DropdownButton, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { brandList, brandDelete } from '../../../redux/actions';
import MainLoader from '../../../components/MainLoader';
import PageHeader from '../../../components/TablePage/PageHeader';
import Table from '../../../components/TablePage/Table';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import DeleteModal from '../../../components/DeleteModal';
import ToastHandle from '../../../helpers/toastMessage';
import NewEntry from './modal';

const ProductBrand = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);
    const [openNewEntry, setOpenNewEntry] = useState(false);
    const [seletedItem, setSeletedItem] = useState(null);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [editRow, setEditRow] = useState(null);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const brandListData = store.BrandList?.brandList?.data;
    const brandListLoader = store.BrandList?.loading;
    const pagination = store.BrandList?.brandList?.meta?.pagination;
    const productBrandDelete = store?.BrandDelete;

    const getProductsBrandList = () => {
        dispatch(
            brandList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    };

    useEffect(() => {
        getProductsBrandList();
    }, [page, showLimit, searchText]);

    useEffect(() => {
        if (deleteRecordConfirmation) {
            dispatch(brandDelete({ id: seletedItem }));
            setSeletedItem(null);
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    useEffect(() => {
        if (productBrandDelete?.status === true) {
            ToastHandle('success', productBrandDelete?.message);
            getProductsBrandList();
        } else if (productBrandDelete?.status === false) {
            ToastHandle('error', productBrandDelete?.message);
        }
    }, [productBrandDelete]);

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
            Header: 'ID',
            accessor: (row) => (row.id ? row.id : 'N/A'),
        },
        {
            Header: 'Brand Name',
            accessor: (row) => (row.brand_name ? row.brand_name : 'N/A'),
        },

        {
            Header: 'Image',
            accessor: 'images',
            Cell: ({ row }) => (
                <span className='rounded-2'>
                    <img src={row?.original?.images} alt="product img" height="50px" width="50px" className='rounded-2' />
                </span>
            ),
        },
        {
            Header: 'Remarks',
            accessor: (row) => (row.category_name ? row.category_name : 'N/A'),
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <DropdownButton
                    as="span"
                    variant="link"
                    align={{ sm: 'start' }}
                    className="actionButton"
                    id={`dropdown-row-${row.id}`}
                    title={<i className="bi bi-three-dots"></i>}>
                    <Dropdown.Item
                        className="my-dropdown-item"
                        onClick={() => {
                            setEditRow(row?.original);
                            setOpenNewEntry(true);
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
                title="Product Brand"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}>
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">New Entry</Tooltip>}>
                    <span
                        className="text-center p-1 border rounded-2 tableOption color d-none d-sm-block"
                        onClick={() => {
                            setEditRow(null);
                            setOpenNewEntry(true);
                        }}>
                        <i className="bi bi-plus-lg fs-4 fw-bold"></i>
                    </span>
                </OverlayTrigger>
            </PageHeader>
            <NewEntry show={openNewEntry} onHide={setOpenNewEntry} editRow={editRow} />
            {brandListLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(brandListData) ? (
                            <Table
                                Data={brandListData}
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

export default ProductBrand;
