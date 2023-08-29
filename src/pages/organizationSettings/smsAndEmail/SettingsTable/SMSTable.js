import React, { useEffect } from 'react';
import { options } from './FormData';
import Select from 'react-select';
import Table from '../../../../components/ClientSideTable/Table';
import { smsAndEmailUpdate } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import ToastHandle from '../../../../helpers/toastMessage';

const SMSTable = ({ data }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const updateStatus = store?.SmsAndEmailUpdate;

    useEffect(() => {
        if (updateStatus?.status === true) {
            ToastHandle('success', updateStatus?.message);
        } else if (updateStatus?.status === false) {
            ToastHandle('error', updateStatus?.message);
        }
    }, [updateStatus]);

    const handleChange = (val, id) => {
        dispatch(
            smsAndEmailUpdate({
                id: id,
                type: 'SMS',
                status: val.value,
            })
        );
        // setTimeout(() => {
        //     if (updateStatus?.status === true) {
        //         ToastHandle('success', updateStatus?.message);
        //         // dispatch(
        //         //     smsAndEmail({
        //         //         type: 'SMS',
        //         //     })
        //         // );
        //     } else if (updateStatus?.status === false) {
        //         ToastHandle('error', updateStatus?.message);
        //     }
        // }, 200);
    };
    const COLUMNS = [
        {
            Header: 'Sr No.',
            accessor: (row, index) => index + 1,
        },
        {
            Header: 'Template Id',
            accessor: (row) => (row.template_id ? row.template_id : 'N/A'),
            width: 240,
        },

        {
            Header: 'SMS Templates',
            accessor: (row) => (row.sms_templates ? row.sms_templates : 'N/A'),
            width: 500,
        },
        {
            Header: 'Comment',
            accessor: (row) => 'N/A',
        },
        {
            Header: 'SMS Enable/Disable',
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

export default SMSTable;
