import React, { useState } from 'react';
import UserForm from './UserForm';
import PasswordForm from './PasswordForm';

const AdminProfileForm = ({ data }) => {
    const [showUserForm, setShowUserForm] = useState(true);
    // const [editForm, setEditForm] = useState(true);
    return (
        <>
            {showUserForm ? (
                <UserForm
                    data={data}
                    showUserForm={showUserForm}
                    setShowUserForm={setShowUserForm}
                
                />
            ) : (
                <PasswordForm showUserForm={showUserForm} setShowUserForm={setShowUserForm} />
            )}
        </>
    );
};

export default AdminProfileForm;
