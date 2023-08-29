import Item from 'antd/es/list/Item';
import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import FormInput from "../../../../components/FormInput"
import './DiscountChargesReportListTable.css'
import DiscountChargesReportForm from '../DiscountChargesReportForm/DiscountChargesReportForm';
import { useSelector, useDispatch } from 'react-redux';
import { discountChargesReportList } from '../../../../redux/actions';
import MainLoader from '../../../../components/MainLoader';
import Paginations from '../../../../helpers/paginations/Pagination';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVDownload } from 'react-csv';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';



const DiscountChargesReportListTable = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state)
  const discountChargesTableData = store?.DiscountChargeReportList?.discountChargeReport?.data
  const paginationValues = store?.DiscountChargeReportList?.discountChargeReport?.meta?.pagination

  // const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  // const toggleSortDropDown = () => {
  //   setIsSortDropdownOpen(!isSortDropdownOpen);
  // };
  // const btnChild = () => {
  //   TableShowBtn()
  // }



  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const toggleSortDropDown = () => { setIsSortDropdownOpen(!isSortDropdownOpen) };
  // const [page, setPage] = useState(1);
  // const [showLimit, setShowLimit] = useState(10);
  // const [searchText, setSearchText] = useState('');
  // const [dateStart, setDateStart] = useState(null)
  // const [dateEnd, setDateEnd] = useState(null)
  const [cancelOrder, setCancelOrder] = useState(null)
  // const [store_Id, setStore_Id] = useState("")

  //header actions
  const [isCsvDownload, setIsCsvDownload] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let headers = [];
  if (discountChargesTableData) { headers = DynamicHeaders(discountChargesTableData, ['emp_id']); }
  const commanActions = (type) => {
    if (type === 4) {
      setIsCsvDownload(true);
    } else if (type === 1) {
      copyToClipboard();
    } else if (type === 3) {
      handleGeneratePdf();
    } else if (type === 2) {
      handlePrint();
    }
    setIsDropdownOpen(false);
  };

  const toogleActions = () => {
    setIsCsvDownload(false);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGeneratePdf = () => {
    var dataLists = discountChargesTableData
    exportPdf(dataLists, headers, '');
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  //end header actions

  //model sidebar model hide and show
  const [parentShowHide, setParentShowHide] = useState('');

  const openModalWithClass = (fill) => {
    setIsDropdownOpen(!isDropdownOpen);

    setParentShowHide(fill);
  };
  const childEmptyShowHide = (empty) => {
    setParentShowHide(empty);
  };

  // start table hide and show
  const [checkBoxStatus, setCheckBoxStatus] = useState({
    order_id: true,
  });
  const [tableShowHide, setTableShowHide] = useState({
    check_box: '',
    order: '',
    price_list: '',
  });
  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, checked } = e.target;
    setTableShowHide({ ...tableShowHide, [name]: checked });
  };

  const getChecKBoxData = () => {
    const arr = discountChargesTableData
    const obj = Array.isArray(arr) && arr[0];
    const checkData = typeof obj === 'object' && Object.keys(obj);
    let finalData = checkData ? checkData : [];
    finalData = finalData.filter((itmdx, indx) => {
      if (checkBoxStatus[itmdx] !== false) {
        return true;
      } else {
        return false;
      }
    });
    return finalData;
  };
  // end  table hide and show


  // Accordions
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(true)
  };

  const closeIsopen = () => {
    setIsOpen(false)
  }

  // form data get
  const [page, setPage] = useState(1);
  const [showLimit, setShowLimit] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [dateStart, setDateStart] = useState("")
  const [dateEnd, setDateEnd] = useState("")
  const [store_Id, setStore_Id] = useState("")

  const parentDiscountChargesReportTable = (item) => {
    setDateStart(item?.startDate);
    setDateEnd(item?.endDate);
    setStore_Id(item?.getStoreId);
  }

  useEffect(() => {
    dispatch(discountChargesReportList({
      searchValue: searchText,
      pageNumber: page,
      showLimit: showLimit,
      from: dateStart,
      to: dateEnd,
      storeId: store_Id

    }))
  }, [searchText, page, showLimit, dateStart, dateEnd, store_Id])
  return (
    <>
      <Row>
        <Col>
          <h4>
            Discount/Charges Report List
          </h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body className='pt-0'>
              <Row className="d-flex align-items-center p-0 ps-2 my-2">
                <Col xl={8}>
                  <form className="row gy-2  gx-2 align-items-center justify-content-xl-start justify-content-between">
                    <div className="col-auto">
                      <div className="d-flex align-items-center w-auto">
                        <Row>
                          <Col className="d-flex  align-items-center border-start bg-light border-top border-bottom pe-0">
                            <span className="mdi mdi-magnify search-icon"></span>
                            <InputGroup>
                              <Form.Control onChange={(e) => {
                                setSearchText(e.target.value);
                              }} placeholder="Search..." className='border-0 bg-light' />
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
                          <Button variant="white" className=" border py-0 pe-4 bg-primary text-white me-2" onClick={() => toggle()}>
                            <div className='d-flex align-items-center'>
                              <h3>
                                <i class="bi bi-plus me-1 text-dark" />
                              </h3>
                              <div>Report</div>
                            </div>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <DiscountChargesReportForm isOpen={isOpen} parentDiscountChargesReportTable={parentDiscountChargesReportTable} closeIsopen={closeIsopen} />
                </Col>
              </Row>
              <Row >
                <Col className='overflow-auto '>
                  <Table className="mb-0 " size="sm">
                    <thead>
                      <tr className="bg-light">
                        {getChecKBoxData().map((itmde) => (
                          <th scope="col" className="text-truncate">
                            {itmde.split('_').join(' ').toUpperCase()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {discountChargesTableData?.map((item, index) => {
                        console.log(item)
                        return (
                          <tr key={index} className='align-middle'>
                            {getChecKBoxData().map((itmde) => {
                              if (itmde === 'emp_id') {
                                return <th scope="row">{item[itmde]}</th>;
                              } else {
                                return <td className="text-truncate">{item[itmde]}</td>;
                              }
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              {paginationValues && (
                <Col lg={12}>
                  <Row className="mt-3">
                    <Col>
                      <Row>
                        <Col className="d-flex align-items-center mt-2 mb-2">
                          <div>
                            <p className="mb-0 me-2">Display</p>
                          </div>
                          <FormInput
                            name="select"
                            type="select"
                            value={showLimit}
                            className="form-select form-select-sm"
                            key="select"
                            onChange={(e) => {
                              setShowLimit(e.target.value);
                            }}>
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                          </FormInput>
                          <div>
                            <p className="mb-0 ms-2">
                              Page{' '}
                              <span className="fw-bold">{`${page} of ${paginationValues.total_page}`}</span>
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            <p className="mb-0 ms-2 me-2">Go to page:</p>
                            <Form.Control
                              max={paginationValues.total_page}
                              min={1}
                              value={page}
                              required
                              type="number"
                              className="input_Style px-1 py-1"
                              onChange={(e) => {
                                setPage(e.target.value);
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <Paginations
                        currentPage={parseInt(paginationValues?.current_page)}
                        totalCount={paginationValues?.total_data}
                        pageSize={showLimit}
                        onPageChange={(page) => setPage(page)}
                      />
                    </Col>
                  </Row>
                </Col>
              )}
              {/* <Row className='mt-3'>
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
              </Row> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}


export default DiscountChargesReportListTable
