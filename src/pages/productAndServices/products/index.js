import React, { useState, useEffect } from 'react';
import { Card, DropdownButton, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { categoryList, categoryDelete } from '../../../redux/actions';
import PageHeader from '../../../components/TablePage/PageHeader';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import Table from '../../../components/TablePage/Table';
import MainLoader from '../../../components/MainLoader';
import DeleteModal from '../../../components/DeleteModal';
import ToastHandle from '../../../helpers/toastMessage';
import NewProductCategory from './modal';

const Products = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);
    const [openNewProductCategory, setOpenNewProductCategory] = useState(false);
    const [seletedItem, setSeletedItem] = useState(null);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);

    const [editRow, setEditRow] = useState(null);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const categoryListLoader = store.ProductCategoryList?.loading;
    const categoryListData = store.ProductCategoryList?.categoryList?.data;
    const pagination = store.ProductCategoryList?.categoryList?.meta?.pagination;
    const productCategoryDelete = store?.ProductCategoryDelete;

    const getCategoryList = () => {
        dispatch(
            categoryList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    };

    useEffect(() => {
        getCategoryList();
    }, [page, showLimit, searchText]);

    useEffect(() => {
        if (deleteRecordConfirmation) {
            dispatch(categoryDelete({ id: seletedItem }));
            setSeletedItem(null);
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    useEffect(() => {
        if (productCategoryDelete?.status === true) {
            ToastHandle('success', productCategoryDelete?.message);
            getCategoryList();
        } else if (productCategoryDelete?.status === false) {
            ToastHandle('error', productCategoryDelete?.message);
        }
    }, [productCategoryDelete]);

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
            accessor: (row) => (row.cat_id ? row.cat_id : 'N/A'),
        },
        {
            Header: 'Product Category',
            accessor: (row) => (row.category_name ? row.category_name : 'N/A'),
        },
        {
            Header: 'Description',
            accessor: (row) => 'N/A',
        },
        {
            Header: 'Show/Hide',
            accessor: (row) => (row.status ? row.status : 'N/A'),
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
                            setEditRow(row?.original);
                            setOpenNewProductCategory(true);
                        }}>
                        <i className="mdi mdi-square-edit-outline"></i>&nbsp;&nbsp; Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="my-dropdown-item"
                        onClick={() => {
                            setSeletedItem(row?.original?.cat_id);
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
                title="Products List"
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
                            setOpenNewProductCategory(true);
                        }}>
                        <i class="bi bi-plus-lg fs-4 fw-bold"></i>
                    </span>
                </OverlayTrigger>
            </PageHeader>
            <NewProductCategory show={openNewProductCategory} onHide={setOpenNewProductCategory} editRow={editRow} />
            {categoryListLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(categoryListData) ? (
                            <Table
                                Data={categoryListData}
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

export default Products;
