import React, { useEffect } from 'react';
import { options } from './FormData';
import Select from 'react-select';
import Table from '../../../../components/ClientSideTable/Table';
import { smsAndEmailUpdate } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import ToastHandle from '../../../../helpers/toastMessage';

const EmailTable = ({ data }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const updateStatus = store?.SmsAndEmailUpdate?.status;
    const updateMessage = store?.SmsAndEmailUpdate?.message;

    useEffect(() => {
        if (updateStatus === true) {
            ToastHandle('success', updateMessage);
        } else if (updateStatus === false) {
            ToastHandle('error', updateMessage);
        }
    }, [updateStatus]);

    const handleChange = (val, id) => {
        dispatch(
            smsAndEmailUpdate({
                id: id,
                type: 'EMAIL',
                status: val.value,
            })
        );
    };
    const COLUMNS = [
        {
            Header: 'Sr No.',
            accessor: (row, index) => index + 1,
        },
        {
            Header: 'Email Templates',
            accessor: (row) => (row.email_templates ? row.email_templates : 'N/A'),
            width: 500,
        },
        {
            Header: 'Comment',
            accessor: (row) => 'N/A',
        },
        {
            Header: 'Email Enable/Disable',
            accessor: 'status',
            Cell: ({ row }) => (
                <Select
                    options={options}
                    className="react-select"
                    classNamePrefix="react-select"
                    defaultValue={options.filter((option) => option.value === row?.original?.status)}
                    onChange={(val) => handleChange(val, row.original?.id)}
                />
            ),
            width: 180,
        },
    ];
    return (
        <>
            {Array.isArray(data) ? (
                <Table Data={data} Columns={COLUMNS} />
            ) : (
                <h4 className="text-center">Oops There is No Data To Show</h4>
            )}
        </>
    );
};

export default EmailTable;
