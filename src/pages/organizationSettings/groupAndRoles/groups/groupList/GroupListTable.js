import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    Row,
    Col,
    Dropdown,
    InputGroup,
    Form,
    Card,
    Table,
    OverlayTrigger,
    Tooltip,
    Button,
    Pagination,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MainLoader from '../../../../../components/MainLoader';
import HandleDeleteModel from '../../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import { groupDelete, groups } from '../../../../../redux/organizations/groups/actions';
import AddGroupForm from '../../model/addGroupModel/AddGroupForm';
import EditRecord from '../../model/addGroupModel/statusModel/EditRecord';
import ToastHandle from '../../../../../helpers/toastMessage';

const GroupListTable = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const gropsData = store.Groups.groupsList;
    const gropsDataLoader = store.Groups;
    const groupsDeleteData = store?.GroupsDelete
    const groupsDeleteStatus = store?.GroupsDelete?.status
    const groupsDeleteMessage = store?.GroupsDelete?.message
    console.log("groupsDeleteData", groupsDeleteData)


    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [parentChangeEditRecord, setParentChangeEditRecord] = useState('');
    const [parentChangeAddGroupForm, setParentChangeAddGroupForm] = useState('');
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };


    //start delete handle Model
    const [parentDelete, setParentDelete] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    const openModalWithDelete = (fill, groupsId) => {
        setParentDelete(fill);
        setDeleteId(groupsId);
    };
    const childEmptyDelete = (empty) => {
        setParentDelete(empty);
    };
    const confirmDeleteHandle = () => {
        dispatch(
            groupDelete({
                groupsId: deleteId,
            })
        );
    };
    // end delete handle model

    //model Add Group
    const openModalAddGroupForm = (fill) => {
        setParentChangeAddGroupForm(fill);
    };
    const childEmptyChangeAddGroupForm = (empty) => {
        setParentChangeAddGroupForm(empty);
    };
    //model Edit Record
    const openModalEditRecord = (fill) => {
        setParentChangeEditRecord(fill);
    };
    const childEmptyChangeEditRecord = (empty) => {
        setParentChangeEditRecord(empty);
    };

    // useEffect(() => {
    //     if (groupsDeleteData?.status === true) {
    //         dispatch(groups())
    //     }
    // }, [groupsDeleteData])

    useEffect(() => {
        if (groupsDeleteStatus) {
            ToastHandle('success', groupsDeleteMessage);
        } else if (groupsDeleteStatus === false) {
            ToastHandle('error', groupsDeleteMessage);
        }
    }, [groupsDeleteStatus]);

    useEffect(() => {
        dispatch(groups())
    }, [])
    return (
        <>
            <Row >
                <Col className="d-flex justify-content-end my-2">
                    <Button
                        variant="white"
                        className="border py-0 pe-4 bg-primary text-white me-2"
                        onClick={() => openModalAddGroupForm('lg')}>
                        <div className="d-flex align-items-center">
                            <h3>
                                <i class="bi bi-plus me-1 text-dark" />
                            </h3>
                            <div>Add Group</div>
                        </div>
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className='pt-0'>

                            {gropsDataLoader?.loading ? <MainLoader /> :
                                <>
                                    <Row>
                                        <Col className='my-2'>
                                            <h3>Group List</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="overflow-auto table_container">
                                            <Table className="mb-0 " size="sm">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th>Sr.No.</th>
                                                        <th>Group Name </th>
                                                        <th>Description</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {gropsData.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">{item.id}</th>
                                                                <td>{item.group_name}</td>
                                                                <td className="text-success">{`permission (${item.group_permission.join(
                                                                    ', '
                                                                )}, )`}</td>
                                                                <td>
                                                                    <button
                                                                        className="btn text-success border-0"
                                                                        onClick={() => openModalEditRecord('lg')}>
                                                                        {item.group_status}
                                                                    </button>
                                                                </td>
                                                                <td>
                                                                    <Dropdown
                                                                        addonType="append"
                                                                        isOpen={isSortDropdownOpen}
                                                                        toggle={toggleSortDropDown}
                                                                        align="end">
                                                                        <Dropdown.Toggle variant="light ">
                                                                            <i className="uil uil-sort-amount-down "></i>
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu className="bg-light px-2">
                                                                            <Dropdown.Item className="bg-light">
                                                                                <OverlayTrigger
                                                                                    placement="bottom"
                                                                                    overlay={
                                                                                        <Tooltip id="overlay-example">
                                                                                            Edit
                                                                                        </Tooltip>
                                                                                    }>
                                                                                    <Link
                                                                                        state={{ groupId: item.id }}
                                                                                        to="/organization/rolepermission"
                                                                                        className="border p-1 px-2 bt_color_hover bg-white">
                                                                                        <i className="mdi mdi-square-edit-outline text-dark"></i>
                                                                                    </Link>
                                                                                </OverlayTrigger>
                                                                                <OverlayTrigger
                                                                                    placement="bottom"
                                                                                    overlay={
                                                                                        <Tooltip id="overlay-example">
                                                                                            Delete
                                                                                        </Tooltip>
                                                                                    }>
                                                                                    <button className="border p-1 px-2 ms-3 bt_color_hover bg-white"
                                                                                        onClick={() => openModalWithDelete("modal-dialog-centered", item.id)}>
                                                                                        <i className="mdi mdi-delete"></i>
                                                                                    </button>
                                                                                </OverlayTrigger>
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td>
                                                            </tr>

                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row></>
                            }
                        </Card.Body>


                    </Card>
                </Col>
            </Row>
            <div>
                <AddGroupForm
                    parentChangeAddGroupForm={parentChangeAddGroupForm}
                    childEmptyChangeAddGroupForm={childEmptyChangeAddGroupForm}
                />
                <EditRecord
                    parentChangeEditRecord={parentChangeEditRecord}
                    childEmptyChangeEditRecord={childEmptyChangeEditRecord}
                />
                <HandleDeleteModel
                    parentDelete={parentDelete}
                    childEmptyDelete={childEmptyDelete}
                    confirmDeleteHandle={confirmDeleteHandle}
                />
            </div>
        </>
    );
};

export default GroupListTable;
