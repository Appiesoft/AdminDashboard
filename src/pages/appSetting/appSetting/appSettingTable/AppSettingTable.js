import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination, FormControl, FormGroup, FormCheck } from 'react-bootstrap';
import AppSettingEditModel from './model/appSettingEditRecord/AppSettingEditModel';
import { useForm, } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { appSettingList } from '../../../../redux/actions';
import MainLoader from '../../../../components/MainLoader';

const AppSettingTable = ({ showBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const appSettingListData = store.AppSettingList?.appSettingList?.data
    const appSettingLoader = store.AppSettingList

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [parentAppSetting, setParentAppSetting] = useState('')
    const [inputData, setInputData] = useState(null)
    console.log(parentAppSetting, 'kk')

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    const btnChild = () => {
        showBtn()
    }
    //model start
    const openModalAppSetting = (fill, input_Data) => {
        setParentAppSetting(fill)
        setInputData(input_Data)
    };

    const childEmptyAppSetting = (empty) => {
        setParentAppSetting(empty)
    }
    //model end

    const { register,
        formState: { errors } }
        = useForm()


    useEffect(() => {
        dispatch(appSettingList())
    }, [])
    return (
        <>
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body className='pt-0'>
                                <Row className=" d-flex align-items-center p-0 ps-2 my-2">
                                    <Col xl={8}>
                                        {/* <form className="row gy-2  gx-2 align-items-center justify-content-xl-start justify-content-between">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <Row>
                                                        <Col className="d-flex  align-items-center border-start bg-light border-top border-bottom pe-0">
                                                            <span className="mdi mdi-magnify search-icon"></span>
                                                            <InputGroup>
                                                                <Form.Control placeholder="Search..." className='border-0 bg-light' />
                                                                <Dropdown
                                                                    addonType="append"
                                                                    isOpen={isSortDropdownOpen}
                                                                    toggle={toggleSortDropDown}
                                                                    align="end">
                                                                    <Dropdown.Toggle variant="secondary">
                                                                        <i className="uil uil-sort-amount-down "></i>
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className='bg-light'>
                                                                        <Dropdown.Item className='bg-light'>
                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example">Copy to clipboard</Tooltip>}>
                                                                                <button className='border p-1 px-2 bt_color_hover bg-white'>
                                                                                    <i class="bi bi-file-earmark-richtext"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}

                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Print</Tooltip>}>
                                                                                <button className='border p-1 px-2 ms-3 bt_color_hover bg-white '>
                                                                                    <i class="bi bi-printer"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item className='bg-light'>
                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Export to PDF</Tooltip>}>
                                                                                <button className='border p-1 px-2 bt_color_hover bg-white '>
                                                                                    <i class="bi bi-file-earmark-x"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}

                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Export to Excel</Tooltip>}>
                                                                                <button className='border p-1 ms-3 px-2 bt_color_hover  bg-white'>
                                                                                    <i class="bi bi-file-earmark-pdf"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </InputGroup>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </form> */}
                                    </Col>

                                    <Col xl={4}>
                                        <div className="text-lg-end mt-xl-0 ">
                                            <Row>
                                                <Col xl={12}>
                                                    <div className="text-lg-end mt-xl-0 mt-2">
                                                        <Button variant="white" className=" border py-0 pe-4 bg-primary text-white me-2" onClick={() => btnChild()}>
                                                            <div className='d-flex align-items-center'>
                                                                <h3>
                                                                    <i class="bi bi-plus me-1 text-dark" />
                                                                </h3>
                                                                <div>Home Page Settings</div>
                                                            </div>
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                {appSettingLoader?.loading ? <MainLoader /> :
                                    <Row >
                                        <Col className='overflow-auto  '>
                                            <Table className="mb-0" size="sm">
                                                <thead>
                                                    <tr className="bg-light">
                                                        <th scope="col" className="text-truncate">
                                                            Sr.No.
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Start Time
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            End Time
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Interval per solt(Hrs)
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Number of day(s) difference  between pick up and Drop off
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Number of solt(s) difference between pick up and Drop off for express
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Delivery Selection
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Pickup offset (Hrs)
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td>{appSettingListData?.start_time}</td>
                                                        <td>{appSettingListData?.end_time}</td>
                                                        <td>{appSettingListData?.interval_per_slot}</td>
                                                        <td>{appSettingListData?.diff_between_pickup_and_drop_off}</td>
                                                        <td>{appSettingListData?.diff_between_pickup_and_drop_off}</td>
                                                        <td>{appSettingListData?.delivery_selection}</td>
                                                        <td>{appSettingListData?.pickup_offset}</td>
                                                        <td>
                                                            <Dropdown
                                                                addonType="append"
                                                                isOpen={isSortDropdownOpen}
                                                                toggle={toggleSortDropDown}
                                                                align="end">
                                                                <Dropdown.Toggle variant="light ">
                                                                    <i className="uil uil-sort-amount-down "></i>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className='bg-light px-2'>
                                                                    <Dropdown.Item className='bg-light'>

                                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Edit </Tooltip>}>
                                                                            <button className='border p-1 px-2 bt_color_hover bg-white'
                                                                                onClick={() => openModalAppSetting('lg', appSettingListData)}

                                                                            >
                                                                                <i className="mdi mdi-square-edit-outline" ></i>
                                                                            </button>
                                                                        </OverlayTrigger>
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <Row>
                                                <Col>
                                                    <AppSettingEditModel parentAppSetting={parentAppSetting} childEmptyAppSetting={childEmptyAppSetting} inputData={inputData} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                }

                            </Card.Body>
                        </Card>
                    </Col >
                </Row>
            </div>
        </>
    )
}

export default AppSettingTable