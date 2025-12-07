import React, { useState } from 'react';
import { useAdminLoginHistory } from '../../hooks/useAdminLoginHistory';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminLoginHistory - CMS-style admin CRUD page for login history
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminLoginHistory hook
 */
const loginHistoryFields = [
  { name: 'user', label: 'User', required: true },
  { name: 'ip', label: 'IP Address' },
  { name: 'device', label: 'Device' },
  { name: 'location', label: 'Location' },
  { name: 'loginAt', label: 'Login Time', type: 'datetime' },
  { name: 'status', label: 'Status' }
];

const AdminLoginHistory = () => {
  const { loginHistory, loading, error, addLoginHistory, editLoginHistory, removeLoginHistory } = useAdminLoginHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Open modal for add/edit
  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = record => {
    setFormValues(record);
    setSelectedRecord(record);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedRecord(null);
  };
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedRecord) {
      await editLoginHistory(selectedRecord._id || selectedRecord.id, values);
    } else {
      await addLoginHistory(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async record => {
    if (window.confirm('Delete this login record?')) {
      await removeLoginHistory(record._id || record.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Login History Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Login Record"
      >
        + Add Login Record
      </button>
      <Table
        columns={loginHistoryFields.map(f => ({ key: f.name, label: f.label }))}
        data={loginHistory}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Login Record' : 'Add Login Record'}>
        <Form
          fields={loginHistoryFields}
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

export default AdminLoginHistory;
