import React from 'react'
import GroupListTable from './groupList/GroupListTable'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
    return (
        <div>
            <GroupListTable />
            <ToastContainer />
        </div>
    )
}

export default Index