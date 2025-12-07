import React, { useState } from 'react';
import { useAdminUserProfiles } from '../../hooks/useAdminUserProfiles';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminUserProfiles - CMS-style admin CRUD page for user profiles
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminUserProfiles hook
 */
const userProfileFields = [
  { name: 'username', label: 'Username', required: true },
  { name: 'email', label: 'Email', required: true },
  { name: 'role', label: 'Role', required: true },
  { name: 'status', label: 'Status' },
  { name: 'createdAt', label: 'Created At', type: 'date', readOnly: true },
  { name: 'updatedAt', label: 'Updated At', type: 'date', readOnly: true }
];

const AdminUserProfiles = () => {
  const { userProfiles, loading, error, addUserProfile, editUserProfile, removeUserProfile } = useAdminUserProfiles();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Open modal for add/edit
  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = profile => {
    setFormValues(profile);
    setSelectedProfile(profile);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedProfile(null);
  };
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedProfile) {
      await editUserProfile(selectedProfile._id || selectedProfile.id, values);
    } else {
      await addUserProfile(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async profile => {
    if (window.confirm('Delete this user profile?')) {
      await removeUserProfile(profile._id || profile.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">User Profiles Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add User Profile"
      >
        + Add User Profile
      </button>
      <Table
        columns={userProfileFields.map(f => ({ key: f.name, label: f.label }))}
        data={userProfiles}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit User Profile' : 'Add User Profile'}>
        <Form
          fields={userProfileFields}
          values={formValues}
          onChange={setFormValues}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </Modal>
    </div>
  );
};

export default AdminUserProfiles;
