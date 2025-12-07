import React, { useState } from 'react';
import { useAdminVolunteerPageData } from '../../hooks/useAdminVolunteerPageData';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminVolunteerPageData - CMS-style admin CRUD page for volunteer page data
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminVolunteerPageData hook
 */
const volunteerPageDataFields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'image', label: 'Image URL' },
  { name: 'status', label: 'Status' }
];

const AdminVolunteerPageData = () => {
  const { volunteerPageData, loading, error, addVolunteerPageData, editVolunteerPageData, removeVolunteerPageData } = useAdminVolunteerPageData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedData, setSelectedData] = useState(null);

  // Open modal for add/edit
  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = data => {
    setFormValues(data);
    setSelectedData(data);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedData(null);
  };
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedData) {
      await editVolunteerPageData(selectedData._id || selectedData.id, values);
    } else {
      await addVolunteerPageData(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async data => {
    if (window.confirm('Delete this volunteer page data?')) {
      await removeVolunteerPageData(data._id || data.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Volunteer Page Data Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Volunteer Page Data"
      >
        + Add Volunteer Page Data
      </button>
      <Table
        columns={volunteerPageDataFields.map(f => ({ key: f.name, label: f.label }))}
        data={volunteerPageData}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Volunteer Page Data' : 'Add Volunteer Page Data'}>
        <Form
          fields={volunteerPageDataFields}
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

export default AdminVolunteerPageData;
