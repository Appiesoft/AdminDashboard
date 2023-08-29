import React, { useState, useEffect } from 'react';
import { Card, DropdownButton, Dropdown, OverlayTrigger, Tooltip, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { priceList, itemList, itemDelete } from '../../../redux/actions';
import ToastHandle from '../../../helpers/toastMessage';
import MainLoader from '../../../components/MainLoader';
import Table from '../../../components/TablePage/Table';
import DeleteModal from '../../../components/DeleteModal';
import PageHeader from '../../../components/TablePage/PageHeader';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import './Price.css';
import { useNavigate } from 'react-router';
import AddPriceListModal from './modal';

const AdditionFeatures = () => {
    return (
        <div className="d-flex m-2 justify-content-between">
            <div className="d-flex gap-2">
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">Delete</Tooltip>}>
                    <span className="featuresbtn" style={{ color: 'red' }}>
                        <i class="bi bi-trash-fill fs-4"></i>
                    </span>
                </OverlayTrigger>
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">Upload CSV File</Tooltip>}>
                    <span className="featuresbtn" style={{ color: 'blue' }}>
                        <i class="bi bi-cloud-arrow-up fs-4"></i>
                    </span>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="auto"
                    overlay={<Tooltip id="tooltip-auto">Download CSV file format</Tooltip>}>
                    <span className="featuresbtn" style={{ color: 'green' }}>
                        <i class="bi bi-cloud-arrow-down fs-4"></i>
                    </span>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="auto"
                    overlay={<Tooltip id="tooltip-auto">Checkout Existing Images</Tooltip>}>
                    <span className="featuresbtn">
                        <i class="bi bi-images fs-4"></i>
                    </span>
                </OverlayTrigger>
            </div>
            <div className="d-flex gap-2">
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto"> Edit price List</Tooltip>}>
                    <span className="featuresbtn">
                        <i className="mdi mdi-square-edit-outline fs-4" />
                    </span>
                </OverlayTrigger>
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">Delete price List</Tooltip>}>
                    <span className="featuresbtn">
                        <i className="mdi mdi-delete fs-4" />
                    </span>
                </OverlayTrigger>
                <Form.Group controlId="ne_taxExempt" className="d-flex gap-2 align-items-center">
                    <Form.Label className="switchLabel">Show / Hide on web :</Form.Label>
                    <Form.Check type="switch" id="custom-switch" className="switch" label="" />
                </Form.Group>
            </div>
        </div>
    );
};

const Price = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);
    const [selectedListId, setSelectedListId] = useState(null);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [seletedItem, setSeletedItem] = useState(null);
    const [openAddPriceList, setOpenAddPriceList] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const priceListData = store.PriceList?.priceList;
    const itemListLoader = store.ProductItemList?.loading;
    const dataTimeLists = store.ProductItemList?.productItemList?.data;
    const pagination = store.ProductItemList?.ProductItemList?.meta?.pagination;
    const productDelete = store.ProductItemDelete;

    useEffect(() => {
        dispatch(
            priceList({
                searchValue: '',
                pageNumber: '',
                showLimit: '',
            })
        );
    }, []);

    useEffect(() => {
        dispatch(
            itemList({
                priceListId: selectedListId,
            })
        );
    }, [selectedListId]);

    useEffect(() => {
        //getting the default list items
        if (priceListData && priceListData.data && priceListData.data.length > 0) {
            setSelectedListId(priceListData?.data[0]?.id);
        }
    }, [priceListData]);

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
            Header: 'Price List',
            accessor: (row) => (row.price_list_name ? row.price_list_name : 'N/A'),
        },
        {
            Header: 'Service Name',
            accessor: (row) => (row.service_name ? row.service_name : 'N/A'),
        },
        {
            Header: 'Category Name',
            accessor: (row) => (row.category_name ? row.category_name : 'N/A'),
        },
        {
            Header: 'Product',
            accessor: (row) => (row.product_name ? row.product_name : 'N/A'),
        },
        {
            Header: 'Price',
            accessor: (row) => (row.price ? row.price : 'N/A'),
        },

        {
            Header: 'Min Price',
            accessor: (row) => (row.min_price ? row.min_price : 'N/A'),
        },
        {
            Header: 'Currency',
            accessor: (row) => 'N/A',
        },
        {
            Header: 'Unit',
            accessor: (row) => 'N/A',
        },
        {
            Header: 'Short Code',
            accessor: (row) => (row.short_code ? row.short_code : 'N/A'),
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
                        onClick={() => navigate(`/productservices/addPriceListItem/${row?.original?.id}`)}>
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

    useEffect(() => {
        if (deleteRecordConfirmation) {
            dispatch(itemDelete({ id: seletedItem }));
            setSeletedItem(null);
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    useEffect(() => {
        if (productDelete?.status) {
            dispatch(
                itemList({
                    priceListId: selectedListId,
                })
            );
            ToastHandle('success', productDelete?.message);
        } else {
            if (productDelete?.status === false) {
                ToastHandle('error', productDelete?.message);
            }
        }
    }, [productDelete, productDelete?.status]);

    return (
        <Card style={{ marginTop: '1.5rem' }}>
            <PageHeader
                title="Price List"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}>
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">Create New Price List</Tooltip>}>
                    <span
                        className="text-center p-1 border rounded-2 tableOption color d-none d-sm-block"
                        onClick={() => setOpenAddPriceList(true)}>
                        <i class="bi bi-plus-lg fs-4 fw-bold"></i>
                    </span>
                </OverlayTrigger>
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">Add Item</Tooltip>}>
                    <span
                        className="text-center p-1 border rounded-2 tableOption color d-none d-sm-block"
                        onClick={() => navigate(`/productservices/addPriceListItem/${selectedListId}`)}>
                        <i class="bi bi-patch-plus fs-4 fw-bold"></i>
                    </span>
                </OverlayTrigger>
            </PageHeader>
            <div className="d-block mx-2 overflow-hidden">
                <div className="d-flex gap-1 tabs">
                    {priceListData?.data?.map(
                        (item) =>
                            item.show_hide_on_website === 'show' && (
                                <span
                                    key={item.id}
                                    className="my-1 px-2 py-1 border text-nowrap rounded-pill"
                                    style={{
                                        background: selectedListId === item.id ? '#e74023' : 'white',
                                        color: selectedListId === item.id ? 'white' : 'black',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setSelectedListId(item.id)}>
                                    {item.price_list_name}
                                </span>
                            )
                    )}
                </div>
            </div>
            {/* <div className="mx-2">
                <Select
                    options={priceListData?.data?.map(
                        (item) =>
                            item.show_hide_on_website === 'show' && {
                                label: item.price_list_name,
                                value: item.id,
                            }
                    )}
                    className="react-select"
                    classNamePrefix="react-select"
                    onChange={(option) => setSelectedListId(option.value)}
                />
            </div> */}
            <AddPriceListModal show={openAddPriceList} onHide={setOpenAddPriceList} />
            {itemListLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(dataTimeLists) ? (
                            <Table
                                Data={dataTimeLists}
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
            <AdditionFeatures />
        </Card>
    );
};

export default Price;
