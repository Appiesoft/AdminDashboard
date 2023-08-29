import React, { useState, useEffect } from 'react';
import { Card, DropdownButton, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { colorList, colorDeleteAction } from '../../../redux/actions';
import MainLoader from '../../../components/MainLoader';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../../components/TablePage/Table';
import PageHeader from '../../../components/TablePage/PageHeader';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import DeleteModal from '../../../components/DeleteModal';
import ToastHandle from '../../../helpers/toastMessage';
import NewProductColor from './modal';

const ProductColor = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);
    const [openNewProductColor, setOpenNewProductColor] = useState(false);
    const [seletedItem, setSeletedItem] = useState(null);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [editRow, setEditRow] = useState(null);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const colorListLoader = store.ProductColorList?.loading;
    const colorListData = store.ProductColorList?.colorList?.data;
    const pagination = store.ProductColorList?.colorList?.meta?.pagination;
    const productColorDelete = store.ProductColorDelete;

    const getColorList = () => {
        dispatch(
            colorList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    };

    useEffect(() => {
        getColorList();
    }, [page, showLimit, searchText]);

    useEffect(() => {
        if (deleteRecordConfirmation) {
            dispatch(colorDeleteAction({ id: seletedItem }));
            setSeletedItem(null);
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    useEffect(() => {
        if (productColorDelete?.status === true) {
            ToastHandle('success', productColorDelete?.message);
            getColorList();
        } else if (productColorDelete?.status === false) {
            ToastHandle('error', productColorDelete?.message);
        }
    }, [productColorDelete]);

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
            Header: 'Image',
            accessor: 'images',
            Cell: ({ row }) => (
                <span>
                    <img src={row?.original?.images} alt="product img" height="50px" width="50px" />
                </span>
            ),
        },
        {
            Header: 'Code',
            accessor: 'color_code',
            // accessor: (row) => (row.color_code ? row.color_code : 'N/A'),
            Cell: ({ row }) => (
                <span
                    className="rounded-2"
                    style={{
                        backgroundColor: row?.original?.color_code || 'white',
                        height: '50px',
                        color: row?.original?.color_code || 'black',
                    }}>
                    {row?.original?.color_code ? row?.original?.color_code : 'N/A'}
                </span>
            ),
        },
        {
            Header: 'Color Name',
            // accessor: 'color_name',
            accessor: (row) => (row.color_name ? row.color_name : 'N/A'),
        },
        {
            Header: 'Remarks',
            accessor: (row) => (row.color_remark ? row.color_remark : 'N/A'),
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
                            setOpenNewProductColor(true);
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
                title="Product Patterns"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}>
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">New Product Color</Tooltip>}>
                    <span
                        className="text-center p-1 border rounded-2 tableOption color d-none d-sm-block"
                        onClick={() => setOpenNewProductColor(true)}>
                        <i class="bi bi-plus-lg fs-4 fw-bold"></i>
                    </span>
                </OverlayTrigger>
            </PageHeader>
            <NewProductColor show={openNewProductColor} onHide={setOpenNewProductColor} editRow={editRow} />
            {colorListLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(colorListData) ? (
                            <Table
                                Data={colorListData}
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

export default ProductColor;
