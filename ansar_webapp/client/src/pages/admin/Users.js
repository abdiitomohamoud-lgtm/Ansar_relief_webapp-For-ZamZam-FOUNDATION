import React, { useState } from 'react';
import { useAdminUsers } from '../../hooks/useAdminUsers';
import Table from '../../components/admin/Table';
import Form from '../../components/admin/Form';
import Modal from '../../components/admin/Modal';

const userFields = [
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'role', label: 'Role' },
];

const Users = () => {
  const { users, loading, error, addUser, editUser, removeUser } = useAdminUsers();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = user => {
    setFormValues(user);
    setSelectedUser(user);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedUser(null);
  };
  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (editMode && selectedUser) {
      await editUser(selectedUser._id, formValues);
    } else {
      await addUser(formValues);
    }
    handleClose();
  };
  const handleDelete = async user => {
    if (window.confirm('Delete this user?')) {
      await removeUser(user._id);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <button className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700" onClick={handleOpenAdd}>
        Add User
      </button>
      {error && <div className="text-red-600 mb-2">{error.message || 'Error loading users.'}</div>}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table columns={columns} data={users} onEdit={handleOpenEdit} onDelete={handleDelete} />
        )}
      </div>
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit User' : 'Add User'}>
        <Form
          fields={userFields}
          values={formValues}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel={editMode ? 'Update' : 'Create'}
        />
      </Modal>
    </div>
  );
};

export default Users;
