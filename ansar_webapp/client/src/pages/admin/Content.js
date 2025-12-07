import React, { useState } from 'react';
import { useAdminCampaigns } from '../../hooks/useAdminCampaigns';
import Table from '../../components/admin/Table';
import Form from '../../components/admin/Form';
import Modal from '../../components/admin/Modal';

const campaignFields = [
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description' },
  { name: 'status', label: 'Status' },
];

const Content = () => {
  const { campaigns, loading, error, addCampaign, editCampaign, removeCampaign } = useAdminCampaigns();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = campaign => {
    setFormValues(campaign);
    setSelectedCampaign(campaign);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedCampaign(null);
  };
  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (editMode && selectedCampaign) {
      await editCampaign(selectedCampaign._id, formValues);
    } else {
      await addCampaign(formValues);
    }
    handleClose();
  };
  const handleDelete = async campaign => {
    if (window.confirm('Delete this campaign?')) {
      await removeCampaign(campaign._id);
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Content Management</h2>
      <button className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700" onClick={handleOpenAdd}>
        Add Campaign
      </button>
      {error && <div className="text-red-600 mb-2">{error.message || 'Error loading campaigns.'}</div>}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table columns={columns} data={campaigns} onEdit={handleOpenEdit} onDelete={handleDelete} />
        )}
      </div>
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Campaign' : 'Add Campaign'}>
        <Form
          fields={campaignFields}
          values={formValues}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel={editMode ? 'Update' : 'Create'}
        />
      </Modal>
    </div>
  );
};

export default Content;
