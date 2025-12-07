import React, { useState } from 'react';
import { useAdminVolunteers } from '../../hooks/useAdminVolunteers';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminVolunteers - CMS-style admin CRUD page for volunteers
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminVolunteers hook
 */
const volunteerFields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', required: true },
  { name: 'phone', label: 'Phone' },
  { name: 'location', label: 'Location' },
  { name: 'skills', label: 'Skills', type: 'textarea' },
  { name: 'status', label: 'Status' }
];

const AdminVolunteers = () => {
  const { volunteers, loading, error, addVolunteer, editVolunteer, removeVolunteer } = useAdminVolunteers();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // Open modal for add/edit
  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = volunteer => {
    setFormValues(volunteer);
    setSelectedVolunteer(volunteer);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedVolunteer(null);
  };
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedVolunteer) {
      await editVolunteer(selectedVolunteer._id || selectedVolunteer.id, values);
    } else {
      await addVolunteer(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async volunteer => {
    if (window.confirm('Delete this volunteer?')) {
      await removeVolunteer(volunteer._id || volunteer.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Volunteer Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Volunteer"
      >
        + Add Volunteer
      </button>
      <Table
        columns={volunteerFields.map(f => ({ key: f.name, label: f.label }))}
        data={volunteers}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Volunteer' : 'Add Volunteer'}>
        <Form
          fields={volunteerFields}
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

export default AdminVolunteers;
