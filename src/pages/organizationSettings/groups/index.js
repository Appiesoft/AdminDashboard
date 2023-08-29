import React, { useEffect, useState } from 'react';
import { Card, DropdownButton, Dropdown } from 'react-bootstrap';
import { groupDelete, groups } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import MainLoader from '../../../components/MainLoader';
import Table from '../../../components/ClientSideTable/Table';
import DeleteModal from '../../../components/DeleteModal';
import ToastHandle from '../../../helpers/toastMessage';
import AddGroupModal from './modal';

const Groups = () => {
    const [seletedItem, setSeletedItem] = useState(null);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [showAddGroup, setShowAddGroup] = useState(false);
    const [editRow, setEditRow] = useState(null);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const groupsData = store.Groups.groupsList;
    const groupsDataLoader = store.Groups?.loading;
    const groupsDeleteData = store?.GroupsDelete;

    const getGroupsList = () => {
        dispatch(groups());
    };
    useEffect(() => {
        getGroupsList();
    }, []);

    useEffect(() => {
        if (deleteRecordConfirmation) {
            dispatch(groupDelete({ groupsId: seletedItem }));
            setSeletedItem(null);
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    useEffect(() => {
        if (groupsDeleteData?.status === true) {
            ToastHandle('success', groupsDeleteData?.message);
            getGroupsList();
        } else if (groupsDeleteData?.status === false) {
            ToastHandle('error', groupsDeleteData?.message);
        }
    }, [groupsDeleteData]);

    const COLUMNS = [
        {
            Header: 'Sr No.',
            accessor: (row, index) => index + 1,
            width: 80,
        },
        {
            Header: 'Group Name',
            accessor: (row) => (row.group_name ? row.group_name : 'N/A'),
        },

        {
            Header: 'Description',
            accessor: 'group_permission',
            Cell: ({ row }) => (
                <span style={{ color: '#e74023' }}>
                    {row?.original?.group_permission
                        ? 'Permission ( ' + row?.original?.group_permission.map((item) => item).join(',') + ' )'
                        : 'N/A'}
                </span>
            ),

            width: 360,
            color: 'red',
        },
        {
            Header: 'Status',
            accessor: 'group_status',
            Cell: ({ row }) => (
                <span style={{ color: row?.original?.group_status === 'enable' ? 'green' : 'red' }}>
                    {row?.original?.group_status}
                </span>
            ),
            width: 120,
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
                            setShowAddGroup(true);
                        }}>
                        {/* <Link state={{ groupId: row?.original?.id }} to="/organization/roleandpermission"> */}
                        <i className="mdi mdi-square-edit-outline"></i>&nbsp;&nbsp; Edit
                        {/* </Link> */}
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
            <div className="d-flex justify-content-between mx-2 my-1">
                <div className="d-flex gap-2 ps-0 my-1">
                    <h4 className="page-title color">Group List</h4>
                </div>
                <div className="col-sm-6 d-flex my-1 pe-0 align-self-center gap-1 justify-content-end">
                    <span
                        className="px-2 py-1 border rounded-2 fw-semibold btn-hover"
                        style={{
                            backgroundColor: '#e74023',
                            color: 'white',
                        }}
                        onClick={() => {
                            setEditRow(null);
                            setShowAddGroup(true);
                        }}>
                        Add Group
                    </span>
                </div>
            </div>
            <AddGroupModal show={showAddGroup} onHide={setShowAddGroup} editRow={editRow} />

            {groupsDataLoader ? (
                <MainLoader />
            ) : (
                <>
                    {Array.isArray(groupsData) ? (
                        <Table Data={groupsData} Columns={COLUMNS} />
                    ) : (
                        <h4 className="text-center">Oops There is No Data To Show</h4>
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

export default Groups;
