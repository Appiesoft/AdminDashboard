import React, { useState } from "react";
import { DatePicker, Form } from "antd"
import { Row, Col, Card, Collapse, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";

function DriverForm({ isOpen, parentDataGet }) {
    const [selectData, setSelectData] = useState("")
    const [dateRangeStart, setDateRangeStart] = useState();
    const [dateRangeEnd, setDateRangeEnd] = useState()
    const [chooseInput, setChooseInput] = useState()
    const setSelectDatH = (e) => {
        const selectData = e?.target?.value
        setSelectData(selectData)
    }
    //date btn
    const handleDateGet = (x) => {
        if (x) {
            setDateRangeStart({ ...dateRangeStart, startDate: x[0]?.$d.toISOString().slice(0, 10) })
            setDateRangeEnd({ ...dateRangeEnd, endDate: x[1]?.$d.toISOString().slice(0, 10) })
        }
    }
    const ChooseHandle = (Data) => {
        setChooseInput(Data)
    }

    const onSubmitBtn = () => {
        parentDataGet({
            startDate: dateRangeStart?.startDate,
            endDate: dateRangeEnd?.endDate,
            selectData: selectData,
            chooseFor: chooseInput

        })
    }


    return (
        <>
            <Collapse in={isOpen}>
                <div>
                    <Card>
                        <Card.Body>
                            <Form >
                                <Row className='p-3'>
                                    <Col lg={12}>
                                        <Row className="d-flex justify-content-between align-items-baseline">
                                            <Col lg={2} >
                                                <Form.Item label="Start Date - End Date" colon={false}></Form.Item>
                                            </Col>
                                            <Col lg={4}>
                                                <DatePicker.RangePicker
                                                    format="MMM Do, YYYY"
                                                    className="w-100 "

                                                    separator={"-"}
                                                    onChange={x => {
                                                        handleDateGet(x);
                                                    }}
                                                    allowClear={false}
                                                />
                                            </Col>
                                            <Col lg={1}>
                                                <Form.Item label="Driver" colon={false}></Form.Item>
                                            </Col>

                                            <Col lg={3}>
                                                <select
                                                    class="chosen-select form-control" onChange={(e) => setSelectDatH(e)} name="employee" data-placeholder="Choose a employee...">
                                                    <option hidden >--None---</option>
                                                    <option value="All">All</option>
                                                    <option value="All Driver">All Driver</option>
                                                </select>
                                            </Col>
                                            <Col lg={1} className='text-center' >
                                                <Button type="submit" className="btn btn-success" onClick={onSubmitBtn}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col lg={2} className="my-3" >
                                        <label>Choose For :</label>
                                    </Col>
                                    <Col lg={6} className="my-3 ">
                                        <div className=" d-flex justify-content-between">
                                            <form >
                                                <input name="choose" className="ms-4"
                                                    type="radio" onClick={() => ChooseHandle("Pick up")} value="pickup" />
                                                <label className="ms-3" >Pickup</label>
                                                <input className="ms-3"
                                                    type="radio" name="choose" onClick={() => ChooseHandle("Delivery")} value="delivery" />

                                                <label className="ms-3" >Delivery</label>

                                            </form>
                                        </div>

                                    </Col>
                                </Row>
                                {/* <Button type="submit" className="btn btn-success" onClick={() => onSubmitBtn()}>
                                    Submit
                                </Button> */}
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Collapse >
        </>
    )
}

export default DriverForm



// import React, { useState } from 'react'
// import { DatePicker } from "antd"
// import { Row, Col, Card, Button, Form, Collapse } from 'react-bootstrap';
// import { useForm } from "react-hook-form";

// const DriverForm = ({ isOpen }) => {

//     return (
//         <>
//             <Collapse in={isOpen}>
//                 <div>
//                     <Card>
//                         <Card.Body>
//                             <Form>
//                                 <Row>
//                                     <Col lg={6}>
//                                         <Form.Group controlId="validationCustom01">
//                                             <Row className='d-flex align-items-center mb-3'>
//                                                 <Col lg={4} >
//                                                     date
//                                                 </Col>
//                                                 <Col lg={6}>
//                                                     input
//                                                 </Col>

//                                             </Row>
//                                         </Form.Group>
//                                         <Form.Group controlId="validationCustom01">
//                                             <Row className='d-flex align-items-center'>
//                                                 <Col lg={3}>
//                                                     <label>Choose For :</label>
//                                                 </Col>
//                                                 <Col lg={5}>
//                                                     <Form.Group className="d-flex justify-content-evenly">
//                                                         <Form.Check
//                                                             label="Pickup"
//                                                             feedback="You must agree before submitting."
//                                                         />
//                                                         <Form.Check
//                                                             label="Delivery"
//                                                             feedback="You must agree before submitting."
//                                                         />
//                                                     </Form.Group>
//                                                 </Col>
//                                             </Row>
//                                         </Form.Group>
//                                     </Col>
//                                     <Col lg={4}>
//                                         <Form.Group controlId="validationCustom01">
//                                             <Row className='d-flex align-items-center'>
//                                                 <Col lg={3}>
//                                                     <Form.Label>Price List :
//                                                     </Form.Label>
//                                                 </Col>
//                                                 <Col lg={9}>
//                                                     <Form.Group
//                                                         className=""
//                                                         placeholder="Member Group">
//                                                         <Form.Select
//                                                             id="disabledSelect"
//                                                             aria-label="Default select example"
//                                                         >
//                                                             <option hidden value=''>
//                                                                 -Select-
//                                                             </option>
//                                                             <option value="show">Show</option>
//                                                             <option value="hide">Hide</option>
//                                                         </Form.Select>
//                                                     </Form.Group>
//                                                 </Col>
//                                             </Row>
//                                         </Form.Group>
//                                     </Col>
//                                     <Col lg={1} className='text-center' >
//                                         <Button type="reset" className="btn btn-success ">
//                                             Submit
//                                         </Button>
//                                     </Col>
//                                 </Row>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </div>
//             </Collapse>
//         </>
//     )
// }

// export default DriverForm


