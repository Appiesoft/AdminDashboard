import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { assignedPackageCreate } from '../../../../redux/transactions/assignedPackageList/action';
import { useForm } from 'react-hook-form';
import { costomerList, laundryPackagesList } from '../../../../redux/actions';
import HyperDatepicker from '../../../../components/Datepicker';
import { toast } from 'react-toastify';
import MainLoader from '../../../../components/MainLoader';



const AssignForm = ({ TableShowBtn }) => {
  const dispatch = useDispatch();
  const store = useSelector(state => state)
  const successHandle = store?.AssignPackageCreate?.status
  const successMessage = store?.AssignPackageCreate?.message
  const errorHandle = store?.AssignPackageCreate?.message?.status
  const errorMessage = store?.AssignPackageCreate?.message?.message
  const packageListData = store.LaundryPackagesList?.laundryPackagesList?.data
  const customerListData = store.CostomerList?.costomerList?.data
  const [showLimit, setShowLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date());
  const newEnteryLorder = store?.AssignPackageCreate



  const onDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const btnChild = () => {
    TableShowBtn()
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleReset = () => {
    reset(
      {
        customerName: '',
        packageName: '',
        paymentMode: '',

      }
    )
  }
  useEffect(() => {
    dispatch(laundryPackagesList(
      {
        searchValue: searchText,
        pageNumber: page,
        showLimit: showLimit,
      }
    ))
  }, [])

  const handleAssign = (data) => {
    dispatch(assignedPackageCreate(
      {
        customerId: data.customerName,
        pkgId: data.packageName,
        startDate: selectedDate,
        paymentMode: data.paymentMode
      }
    ));
  }
  useEffect(() => {
    dispatch(
      costomerList({
        searchValue: searchText,
        pageNumber: page,
        showLimit: showLimit,
        storeId: []
      })
    )
  }, []);

  useEffect(() => {
    if (successHandle === true) {
      toast.success(successMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      TableShowBtn()
    }


  }, [successHandle])

  useEffect(() => {
    if (errorHandle === false) {
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }

  }, [errorHandle])


  return (
    <>
      <Card>
        <Card.Body>

          <Row>
            <Col className='d-flex justify-content-start'>
              <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white ms-2" onClick={btnChild} >
                <div className='d-flex align-items-center'>
                  <h3>
                    <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                  </h3>
                  <div>Package List</div>
                </div>
              </Button>
            </Col>

          </Row>
          <Row className='align-items-center px-3'>
            <Col lg={12} className=' bg-light'><h3>Assign Package to Customer</h3>
            </Col>
          </Row>
          {newEnteryLorder?.loading ? <MainLoader /> :
            <Form noValidate onSubmit={
              handleSubmit((data) => {
                handleAssign(data)
              }, (err) => {
                console.log(err)
              })}
              className='px-3'>
              <Row className='p-3 border'>
                <Col lg={12}>
                  <Row className='my-3 '>
                    <Col lg={8} className='mx-auto'>
                      <Form.Group controlId="validationCustom01">
                        <Row className='d-flex  justify-content-evenly align-items-center'>
                          <Col lg={2} className='my-3' ><Form.Label>Order id :</Form.Label></Col>
                          <Col lg={10} className='my-3'>
                            <Form.Control required type="text" value='1' disabled />
                          </Col>

                          <Col lg={2}><Form.Label>Select Customer :</Form.Label></Col>
                          <Col lg={10}>
                            <Form.Group>
                              <Form.Select id="disabledSelect"
                                {...register('customerName')}
                                aria-label="Default select example" required>
                                {customerListData?.map((item) => {
                                  return (
                                    <>
                                      <option hidden value=''>--Select Customer--</option>
                                      <option value={item.id}>{item.first_name} {item.last_name}</option>
                                    </>
                                  )
                                })}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col lg={2} className='my-3'><Form.Label>Package Name :</Form.Label></Col>
                          <Col lg={10} className='my-3'>
                            <Form.Group>
                              <Form.Select id="disabledSelect"
                                {...register('packageName')}
                                aria-label="Default select example" required>
                                {packageListData?.map((item) => {
                                  return (
                                    <>
                                      <option hidden value=''>--Select Package--</option>
                                      <option value={item.pkg_id}>{item.package_name}</option>
                                    </>
                                  )
                                })}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col lg={2}><Form.Label>Package start date :</Form.Label></Col>
                          <Col lg={10}>
                            <HyperDatepicker
                              value={selectedDate}
                              inputClass="form-control-light"
                              onChange={(date) => {
                                onDateChange(date);
                              }}
                            />
                          </Col>

                          <Col lg={2} className='my-3'><Form.Label>Payment Mode :</Form.Label></Col>
                          <Col lg={10} className='my-3'>
                            <Form.Group>
                              <Form.Select id="disabledSelect"
                                {...register('paymentMode')}
                                aria-label="Default select example" required>
                                <option hidden value=''>--Select--</option>
                                <option value="cash">Cash </option>
                                <option value="online">Online </option>
                              </Form.Select>
                            </Form.Group>
                          </Col>

                        </Row>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='text-center'>
                      <Button type="submit" className='btn-lg btn-success'>Save</Button>
                      <Button type="reset" className='btn-lg btn-light ms-3' onClick={handleReset}>Reset</Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>}
        </Card.Body>
      </Card>
    </>
  )
}

export default AssignForm