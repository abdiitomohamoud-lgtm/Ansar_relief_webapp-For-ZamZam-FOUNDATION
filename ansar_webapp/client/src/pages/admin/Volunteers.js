import React, { useState } from 'react';
import { useAdminVolunteers } from '../../hooks/useAdminVolunteers';
import Table from '../../components/admin/Table';
import Form from '../../components/admin/Form';
import Modal from '../../components/admin/Modal';

const volunteerFields = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone' },
  { name: 'city', label: 'City' },
  { name: 'country', label: 'Country' },
  { name: 'skills', label: 'Skills' },
  { name: 'experience', label: 'Experience' },
];

const Volunteers = () => {
  const { volunteers, loading, error, addVolunteer, editVolunteer, removeVolunteer } = useAdminVolunteers();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

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
  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (editMode && selectedVolunteer) {
      await editVolunteer(selectedVolunteer._id, formValues);
    } else {
      await addVolunteer(formValues);
    }
    handleClose();
  };
  const handleDelete = async volunteer => {
    if (window.confirm('Delete this volunteer?')) {
      await removeVolunteer(volunteer._id);
    }
  };

  const columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'city', label: 'City' },
    { key: 'country', label: 'Country' },
    { key: 'skills', label: 'Skills' },
    { key: 'experience', label: 'Experience' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Volunteers</h2>
      <button className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700" onClick={handleOpenAdd}>
        Add Volunteer
      </button>
      {error && <div className="text-red-600 mb-2">{error.message || 'Error loading volunteers.'}</div>}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table columns={columns} data={volunteers} onEdit={handleOpenEdit} onDelete={handleDelete} />
        )}
      </div>
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Volunteer' : 'Add Volunteer'}>
        <Form
          fields={volunteerFields}
          values={formValues}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel={editMode ? 'Update' : 'Create'}
        />
      </Modal>
    </div>
  );
};

export default Volunteers;
