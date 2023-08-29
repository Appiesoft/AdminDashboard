import React, { useState, useEffect, } from 'react'
import { Row, Col, Card, Form, InputGroup, Table, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useLocation } from "react-router"
import { useDispatch, useSelector } from 'react-redux';
import { groupUpdate, groups } from '../../../../../redux/organizations/groups/actions';
import { useNavigate } from "react-router-dom";
import ToastHandle from '../../../../../helpers/toastMessage';
import MainLoader from '../../../../../components/MainLoader';


// import AddGroupForm from '../../model/addGroupModel/AddGroupForm';
const PermissionForm = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const gropsData = store.Groups.groupsList;
    const groupUpdateStatus = store?.GroupsUpdate?.status
    const groupUpdateMessage = store?.GroupsUpdate?.message
    const location = useLocation()
    const navigate = useNavigate()
    const groupGroupUpdateLorder = store.GroupsUpdate
    const [permissionsEditData, setPermissionsEditData] = useState([
        { id: 1, icon: "uil uil-user-times", title: "Null (No Permission )", value: "null", check: false },
        { id: 2, icon: "uil uil-dashboard", title: "Dashboard", value: "desktop", check: false },
        { id: 3, icon: "uil uil-desktop-alt", title: "Cash Register", value: "cashregister", check: false },
        { id: 4, icon: "uil uil-desktop-alt", title: "Master", value: "master", check: false },
        { id: 5, icon: "uil uil-tear", title: "Products", value: "garment", check: false },
        { id: 6, icon: "uil uil-truck", title: "Services", value: "services", check: false },
        { id: 7, icon: "uil uil-list-ul", title: "Transaction", value: "joborder", check: false },
        { id: 8, icon: "uil uil-file-edit-alt", title: "Reports", value: "reports", check: false },
        { id: 9, icon: "uil uil-bright", title: "Settings", value: "settings", check: false },
        { id: 10, icon: "uil uil-users-alt", title: "Group and Roles", value: "groupanduser", check: false }
    ])

    //error message
    const [permissionErrorMassege, setPermissionErrorMassege] = useState(null)
    const [permissionValue, setPermissionValue] = useState(false)
    const permissionsCheck = permissionsEditData?.map((item) => {
        return item?.check
    })
    const permissionCheckTrue = permissionsCheck?.find((check) => {
        return check === true
    })
    //end error message

    const [selectedGroup, setSelectedGroup] = useState(null)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()


    const setPermission = (id) => {
        const selectedGroupData = gropsData.find((itmd, indx) => itmd.id === id)
        if (selectedGroupData?.group_permission) {
            const permissionsData = selectedGroupData.group_permission
            setPermissionsEditData(permissionsEditData.map((itd, indx) => {
                if (permissionsData.includes(itd.value)) {
                    return { ...itd, check: true }
                }
                else {
                    return { ...itd, check: false }
                }
            }))
        }

    }
    useEffect(() => {

        if (location?.state?.groupId) {
            setPermission(location?.state?.groupId)
            setSelectedGroup(location?.state?.groupId)
        }
    }, [gropsData])

    useEffect(() => {
        dispatch(groups());
    }, [])

    useEffect(() => {
        if (permissionCheckTrue === true) {
            setPermissionErrorMassege('')
            setPermissionValue(false)
        }
    }, [permissionCheckTrue])

    useEffect(() => {
        if (groupUpdateStatus) {
            navigate("/organization/groups")

            ToastHandle('success', groupUpdateMessage);
            // toggle()

        } else if (groupUpdateStatus === false) {
            ToastHandle('error', groupUpdateMessage);
        }

    }, [groupUpdateStatus])



    return (
        <>
            <Row>
                <Col className="px-0 mt-3">
                    <>
                        <Card>
                            <Card.Body className='pt-0'>
                                {groupGroupUpdateLorder.loading ? <MainLoader /> : <Form
                                    noValidate
                                    onSubmit={handleSubmit(
                                        (data) => {
                                            const permissionsBody = permissionsEditData.filter((itdx) => itdx.check).map((itds) => itds.value)
                                            const selectedGroupData = gropsData.find((itmd, indx) => itmd.id === selectedGroup)
                                            if (permissionsBody.length) {
                                                dispatch(groupUpdate({
                                                    groupId: selectedGroupData.id,
                                                    groupName: selectedGroupData.group_name,
                                                    groupPermission: permissionsBody,
                                                    groupStatus: selectedGroupData.group_status
                                                }))
                                            } else {
                                                setPermissionErrorMassege("Please select minimum one Permission")
                                                setPermissionValue(true)

                                            }
                                        },
                                        (err) => {
                                            console.log(err);
                                        }
                                    )}
                                >
                                    <Row className="p-3">
                                        <Col lg={12}>
                                            <Row>
                                                <Col lg={12}>
                                                    <Form.Group controlId="validationCustom01">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={3}>
                                                                <Form.Label>
                                                                    Group Name :
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={9}>
                                                                <Form.Select
                                                                    id="disabledSelect"
                                                                    aria-label="Default select example"
                                                                    placeholder="Member Group"
                                                                    className={!permissionValue ? '' : 'border-danger'}
                                                                    value={selectedGroup}
                                                                    onChange={(e) => {
                                                                        setSelectedGroup(e.target.value)
                                                                        setPermission(e.target.value)
                                                                    }}
                                                                >
                                                                    <option hidden> --Select Group--</option>
                                                                    {gropsData.map((itmd, ind) => (<option value={itmd.id}>{itmd.group_name}</option>))}
                                                                </Form.Select>
                                                                {!permissionValue ? "" : <span className='text-danger'>Please select one Group Name</span>}
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Table className="mb-0" size="sm">
                                                <thead className='bg-light'>
                                                    <tr>
                                                        <th>Model Name</th>
                                                        <th>Group Permission ( Manager )</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {permissionsEditData.map((item) => {
                                                        const isDanger = item.title === "Null (No Permission )"
                                                        const icon = item.icon
                                                        return (
                                                            <tr>
                                                                <td className="d-flex">
                                                                    <div><i className={icon}></i></div>
                                                                    <div className={isDanger ? 'text-danger ms-2' : 'ms-2'}  >{item.title}</div>
                                                                </td>
                                                                <td>
                                                                    <input checked={item.check} name={item.title} id={`check_perm_${item.value}`} type="checkbox" onChange={() => {
                                                                        setPermissionsEditData(permissionsEditData.map((itdm, ind) => itdm.id === item.id ? { ...itdm, check: !itdm.check } : itdm))
                                                                    }} />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    {/* <tr>
                                                        <td className="d-flex">
                                                            <div><i className="uil uil-user-times"></i></div>
                                                            <div className='ms-2'>Null (No Permission )</div>
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-flex">
                                                            <div><i className="uil uil-dashboard"></i></div>
                                                            <div className='ms-2'>Dashboard</div>
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-flex">
                                                            <div><i className="uil uil-desktop-alt"></i></div>
                                                            <div className='ms-2'>Cash Register</div>
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-flex">
                                                            <div><i className="uil uil-desktop-alt"></i></div>
                                                            <div className='ms-2'>Master</div>
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-flex">
                                                            <div><i className="uil uil-tear"></i></div>
                                                            <div className='ms-2'>Products</div>
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-flex">
                                                            <div><i className="uil uil-truck"></i></div>
                                                            <div className='ms-2'>Services</div>
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-flex">
                                                            <div><i className="uil uil-list-ul"></i></div>
                                                            <div className='ms-2'>Transaction</div>
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-flex">
                                                            <div><i className="uil uil-file-edit-alt"></i></div>
                                                            <div className='ms-2'>Reports</div>
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-flex">
                                                            <div><i className="uil uil-bright"></i></div>
                                                            <div className='ms-2'>Settings</div>
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-flex">
                                                            <div><i className="uil uil-users-alt"></i></div>
                                                            <div className='ms-2'>Group and Roles</div>
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                    </tr> */}
                                                </tbody>
                                            </Table>
                                            <Row>
                                                <Col>
                                                    <span className='text-danger'>{permissionErrorMassege}</span>
                                                </Col>
                                            </Row>
                                            <Row className='mt-3'>
                                                <Col className='d-flex justify-content-center'>
                                                    <button type='submit' className='btn bg-success text-white'>Update</button>
                                                    <button type="button" onClick={() => {
                                                        setPermission(selectedGroup)
                                                    }} className='btn bg-primary ms-3 text-white'>Reset</button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>}

                            </Card.Body>
                        </Card>
                    </>
                </Col>
            </Row >
            {/* <div>
                <AddGroupForm parentChangeAddGroupForm={parentChangeAddGroupForm} childEmptyChangeAddGroupForm={childEmptyChangeAddGroupForm} />
            </div> */}
        </>
    )
}

export default PermissionForm