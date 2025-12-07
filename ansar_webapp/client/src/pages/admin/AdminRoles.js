import React, { useState } from 'react';
import { useAdminRoles } from '../../hooks/useAdminRoles';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminRoles - CMS-style admin CRUD page for user roles
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminRoles hook
 */
const roleFields = [
  { name: 'name', label: 'Role Name', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'permissions', label: 'Permissions', type: 'textarea' }
];

const AdminRoles = () => {
  const { roles, loading, error, addRole, editRole, removeRole } = useAdminRoles();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);

  // Open modal for add/edit
  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = role => {
    setFormValues(role);
    setSelectedRole(role);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedRole(null);
  };
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedRole) {
      await editRole(selectedRole._id || selectedRole.id, values);
    } else {
      await addRole(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async role => {
    if (window.confirm('Delete this role?')) {
      await removeRole(role._id || role.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Roles Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Role"
      >
        + Add Role
      </button>
      <Table
        columns={roleFields.map(f => ({ key: f.name, label: f.label }))}
        data={roles}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Role' : 'Add Role'}>
        <Form
          fields={roleFields}
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

export default AdminRoles;
