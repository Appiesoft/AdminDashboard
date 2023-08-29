import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import './ActivePassiveCustomerListTable.css'
import FormInput from "../../../../components/FormInput"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { costomerActiveList } from '../../../../redux/actions';
import Loader from "../../../../components/MainLoader"
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVDownload } from 'react-csv';
import ShowHide from './model/showHideColumns/ShowHide';



const ActivePassiveCustomerListTable = ({ TableShowBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const costomerActiveData = store?.CostomerActiveList?.costomerActiveList?.data
    const constomerListLoader = store.CostomerActiveList;
    const [searchText, setSearchText] = useState("")



    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    const btnChild = () => {
        TableShowBtn()
    }


    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const headers = [
        { label: "Emp Id", key: "emp_id" },
        { label: "Source", key: "source" },
        { label: "Join Date", key: "join_date" },
        { label: "First Name", key: "first_name" },
        { label: "Last Name", key: "last_name" },
        { label: "Mobile", key: "mobile" },
        { label: "Store List", key: "store_list" },
        { label: "Status", key: "status" },
    ];

    const commanActions = (type) => {
        if (type === 4) {
            setIsCsvDownload(true)
        } else if (type === 1) {
            copyToClipboard()
        } else if (type === 3) {
            handleGeneratePdf()
        } else if (type === 2) {
            handlePrint()
        }
        setIsDropdownOpen(false);
    }

    const toogleActions = () => {
        setIsCsvDownload(false)
        setIsDropdownOpen(!isDropdownOpen);
    }


    const handleGeneratePdf = () => {
        var dataLists = costomerActiveData
        exportPdf(dataLists, headers, '');
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    //end header actions


    //model sidebar model hide and show
    const [parentShowHide, setParentShowHide] = useState('')

    const openModalWithClass = (fill) => {
        setIsDropdownOpen(!isDropdownOpen);

        setParentShowHide(fill)
    };
    const childEmptyShowHide = (empty) => {
        setParentShowHide(empty)
    }
    // start table hide and show
    const [checkBoxStatus, setCheckBoxStatus] = useState({
        order_id: true
    })
    const [tableShowHide, setTableShowHide] = useState({
        check_box: "",
        order: "",
        price_list: ""
    })
    const handleOnChange = (e) => {
        e.preventDefault()
        const { name, checked } = e.target;
        setTableShowHide({ ...tableShowHide, [name]: checked })
    }

    const getChecKBoxData = () => {
        const arr = costomerActiveData
        const obj = Array.isArray(arr) && arr[0] ? Array.isArray(arr) && arr[0] : []
        const checkData = typeof obj === 'object' && Object.keys(obj)
        let finalData = checkData ? checkData : []
        finalData = finalData.filter((itmdx, indx) => {
            if (checkBoxStatus[itmdx] !== false) {
                return true
            } else {
                return false
            }
        })
        return finalData
    }
    // end  table hide and show



    const getPaymentList = () => {
        dispatch(
            costomerActiveList({
                searchValue: searchText,
                pageNumber: 1,
                showLimit: 10,
                storeId: [],
                type: "active"
            })
        );
    };

    useEffect(() => {
        getPaymentList();
    }, [searchText]);


    return (
        <div>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className='pt-0'>
                            <Row className="  d-flex align-items-center p-0 ms-1 my-2">
                                {isCsvDownload && <CSVDownload filename={"patternList.csv"} data={costomerActiveData} headers={headers} target="_blank" />}
                                <Col xl={8}>
                                    <form className="row gy-2  gx-2 align-items-center justify-content-xl-start justify-content-between">
                                        <div className="col-auto">
                                            <div className="d-flex align-items-center w-auto">
                                                <Row>
                                                    <Col className="d-flex  align-items-center border-start bg-light border-top border-bottom pe-0">
                                                        <span className="mdi mdi-magnify search-icon"></span>
                                                        <InputGroup>
                                                            <Form.Control
                                                                placeholder="Search..."
                                                                className="border-0 bg-light"
                                                                onChange={(e) => {
                                                                    setSearchText(e.target.value)
                                                                }}
                                                            />
                                                            <Dropdown
                                                                onToggle={(e) => toogleActions()}
                                                                addonType="append"
                                                                isOpen={isSortDropdownOpen}
                                                                toggle={toggleSortDropDown}
                                                                show={isDropdownOpen}
                                                                autoClose={false}
                                                                align="end"
                                                            >
                                                                <Dropdown.Toggle variant="secondary">
                                                                    <i className="uil uil-sort-amount-down "></i>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="bg-light">
                                                                    <Dropdown.Item className="bg-light">
                                                                        <OverlayTrigger
                                                                            placement="bottom"
                                                                            overlay={
                                                                                <Tooltip id="overlay-example">
                                                                                    Show hide columns
                                                                                </Tooltip>
                                                                            }>
                                                                            <button
                                                                                className="border p-1 px-2 bt_color_hover bg-white"
                                                                                onClick={() =>
                                                                                    openModalWithClass('modal-right')
                                                                                }>
                                                                                <span className="mdi mdi-magnify search-icon"></span>
                                                                            </button>
                                                                        </OverlayTrigger>
                                                                        <OverlayTrigger
                                                                            placement="bottom"
                                                                            overlay={
                                                                                <Tooltip id="overlay-example">
                                                                                    Copy to clipboard
                                                                                </Tooltip>
                                                                            }>
                                                                            <button onClick={() => commanActions(1)} className="border p-1 px-2 ms-3 bt_color_hover bg-white">
                                                                                <i class="bi bi-file-earmark-richtext"></i>
                                                                            </button>
                                                                        </OverlayTrigger>
                                                                        <OverlayTrigger
                                                                            placement="bottom"
                                                                            overlay={
                                                                                <Tooltip id="overlay-example"> Print</Tooltip>
                                                                            }>
                                                                            <button onClick={() => commanActions(2)} className="border p-1 px-2 ms-3 bt_color_hover bg-white ">
                                                                                <i class="bi bi-printer"></i>
                                                                            </button>
                                                                        </OverlayTrigger>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className="bg-light">
                                                                        <OverlayTrigger
                                                                            placement="bottom"
                                                                            overlay={
                                                                                <Tooltip id="overlay-example">
                                                                                    Export to PDF
                                                                                </Tooltip>
                                                                            }>
                                                                            <button onClick={() => commanActions(3)} className="border p-1 px-2 bt_color_hover bg-white ">
                                                                                <i class="bi bi-file-earmark-x"></i>
                                                                            </button>
                                                                        </OverlayTrigger>
                                                                        <OverlayTrigger
                                                                            placement="bottom"
                                                                            overlay={
                                                                                <Tooltip id="overlay-example">
                                                                                    Export to Excel
                                                                                </Tooltip>
                                                                            }>
                                                                            <button onClick={() => commanActions(4)} className="border p-1 ms-3 px-2 bt_color_hover  bg-white">
                                                                                <i class="bi bi-file-earmark-pdf"></i>
                                                                            </button>
                                                                        </OverlayTrigger>
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </form>
                                </Col>

                                <Col xl={4}>
                                    <div className="text-lg-end mt-xl-0 ">
                                        <Row>
                                            <Col xl={12}>
                                                <div className="text-lg-end mt-xl-0 ">
                                                    <Button variant="white" className=" border py-0 pe-4 bg-primary text-white me-2" onClick={() => btnChild()}>
                                                        <div className='d-flex align-items-center'>
                                                            <h3>
                                                                <i class="bi bi-plus me-1 text-dark" />
                                                            </h3>
                                                            <div>Customer List</div>
                                                        </div>
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            {constomerListLoader?.loading ? <Loader /> : <>
                                <Row>
                                    <Col lg={3} className="d-flex  align-items-center border-end bg-light border-top border-bottom px-0 ms-2 mb-2">
                                        <InputGroup>
                                            <>
                                                <span className='bg-primary text-white align-self-center p-2'>
                                                    Customer
                                                </span>
                                            </>
                                            <Form.Select className='bg-light border-0'
                                            >
                                                <option hidden value="">
                                                    Active  </option>
                                                <option value="active">Active</option>
                                                <option value="passive">passive</option>
                                            </Form.Select>

                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col className='overflow-auto table_container'>
                                        <Table ref={componentRef} className="mb-0 " size="sm">
                                            <thead>
                                                <tr className="bg-light">
                                                    {getChecKBoxData().map((itmde) => (<th scope="col" className="text-truncate">
                                                        {itmde.split("_").join(" ").toUpperCase()}
                                                    </th>))}
                                                    <th scope="col" className="text-truncate">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {costomerActiveData?.map((item, index) => {
                                                    console.log(item, 'ac')
                                                    return (
                                                        <tr key={index}>
                                                            {getChecKBoxData().map((itmde) => {
                                                                if (itmde === "id") {
                                                                    return (<th scope="row">{item[itmde]}</th>)
                                                                } else if (itmde === "charges") {
                                                                    if (item?.charges?.length > 0) {
                                                                        return (<td scope="row" className="text-truncate">
                                                                            {item.charges[0]?.charge_name} {item.charges[0]?.charge_amount}

                                                                        </td>)
                                                                    } else {
                                                                        return (
                                                                            <td className="text-truncate">{''}</td>
                                                                        );
                                                                    }
                                                                } else if (itmde === "discount") {
                                                                    if (item?.discount?.length > 0) {
                                                                        return (<td scope="row" className="text-truncate">
                                                                            {item.discount[0]?.charge_name} {item.discount[0]?.charge_amount}

                                                                        </td>)
                                                                    } else {
                                                                        return (
                                                                            <td className="text-truncate">{''}</td>
                                                                        );
                                                                    }
                                                                }
                                                                else {
                                                                    return (<td className="text-truncate">{item[itmde]}</td>)

                                                                }
                                                            })}
                                                            <td>
                                                                <Dropdown
                                                                    addonType="append"
                                                                    isOpen={isSortDropdownOpen}
                                                                    toggle={toggleSortDropDown}
                                                                    align="end">
                                                                    <Dropdown.Toggle variant="light ">
                                                                        <i className="uil uil-sort-amount-down"></i>
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className='bg-light px-2'>
                                                                        <Dropdown.Item className='bg-light'>
                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Assign Driver </Tooltip>}>
                                                                                <Link to='/customer/customerdetail' className='border p-1 px-2 bt_color_hover text-dark bg-white'>
                                                                                    <i className="uil uil-search-plus"></i>
                                                                                </Link>
                                                                            </OverlayTrigger>
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col>
                                        <Row>
                                            <Col className="d-flex align-items-center mt-2 mb-2">
                                                <div>
                                                    <p className='mb-0 me-2' >Display</p>
                                                </div>
                                                <FormInput name="select" type="select" className="form-select form-select-sm" key="select">
                                                    <option>10</option>
                                                    <option>25</option>
                                                    <option>50</option>
                                                    <option>100</option>
                                                </FormInput>
                                                <div>
                                                    <p className='mb-0 ms-2' >Page <span className='fw-bold'>1 of 10</span></p>
                                                </div>
                                                <div className='d-flex align-items-center'>
                                                    <p className='mb-0 ms-2 me-2' >Go to page:
                                                    </p>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        className='input_Style px-1 py-1'
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col className='d-flex justify-content-end'>
                                        <Pagination>
                                            <Pagination className='pagination_style btn-hover'><i className="uil uil-angle-left"></i></Pagination>
                                            <Pagination className='pagination_style bg-primary text-white mx-1'>{1}</Pagination>
                                            <Pagination className='pagination_style btn-hover'>{2}</Pagination>
                                            <Pagination className='pagination_style mx-1 btn-hover'>{3}</Pagination>
                                            <Pagination className='pagination_style btn-hover'>{4}</Pagination>
                                            <Pagination className='pagination_style mx-1 btn-hover'>{5}</Pagination>
                                            <Pagination className='pagination_style'>...</Pagination>
                                            <Pagination className='pagination_style mx-1 btn-hover'>{10}</Pagination>

                                            <Pagination className='pagination_style btn-hover' ><i className="uil uil-angle-right"></i></Pagination>
                                        </Pagination>
                                    </Col>
                                </Row></>}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div >
                <ShowHide checkBoxStatus={checkBoxStatus} setCheckBoxStatus={setCheckBoxStatus} parentShowHide={parentShowHide} childEmptyShowHide={childEmptyShowHide} handleOnChange={handleOnChange} />
            </div >
        </div>
    )
}

export default ActivePassiveCustomerListTable
