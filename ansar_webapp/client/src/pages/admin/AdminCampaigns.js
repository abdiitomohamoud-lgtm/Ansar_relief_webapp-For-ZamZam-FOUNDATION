import React, { useState } from 'react';
import { useAdminCampaigns } from '../../hooks/useAdminCampaigns';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminCampaigns - CMS-style admin CRUD page for campaigns
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminCampaigns hook
 */
const campaignFields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'image', label: 'Image URL', required: true },
  { name: 'raised', label: 'Raised', type: 'number' },
  { name: 'goal', label: 'Goal', type: 'number' },
  { name: 'category', label: 'Category', required: true },
  { name: 'daysLeft', label: 'Days Left', type: 'number' },
  { name: 'location', label: 'Location' },
  { name: 'licenseNumber', label: 'License Number' }
];

const AdminCampaigns = () => {
  const { campaigns, loading, error, addCampaign, editCampaign, removeCampaign } = useAdminCampaigns();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Open modal for add/edit
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
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedCampaign) {
      await editCampaign(selectedCampaign.id, values);
    } else {
      await addCampaign(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async campaign => {
    if (window.confirm('Delete this campaign?')) {
      await removeCampaign(campaign.id);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Campaign Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Campaign"
      >
        + Add Campaign
      </button>
      <Table
        columns={campaignFields.map(f => ({ key: f.name, label: f.label }))}
        data={campaigns}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Campaign' : 'Add Campaign'}>
        <Form
          fields={campaignFields}
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

export default AdminCampaigns;
