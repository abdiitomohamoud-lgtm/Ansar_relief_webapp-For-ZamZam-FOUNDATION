import React, { useState } from 'react';
import { useAdminHome } from '../../hooks/useAdminHome';
import Form from '../../components/admin/Form';
import Modal from '../../components/admin/Modal';

/**
 * AdminHome - CMS-style admin CRUD page for Home page content
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Form and Modal components
 * - Integrates with backend CRUD APIs via useAdminHome hook
 */
const homeFields = [
  { name: 'featuredCampaigns', label: 'Featured Campaigns (JSON)', type: 'textarea', required: true },
  { name: 'impactStats', label: 'Impact Stats (JSON)', type: 'textarea', required: true },
  { name: 'urgentCases', label: 'Urgent Cases (JSON)', type: 'textarea' }
];

const AdminHome = () => {
  const { home, loading, error, updateHome } = useAdminHome();
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(home || {});

  // Open modal for edit
  const handleOpenEdit = () => {
    setFormValues(home || {});
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  // Handle form submit
  const handleSubmit = async values => {
    // Parse JSON fields before sending
    const parsed = {
      ...values,
      featuredCampaigns: JSON.parse(values.featuredCampaigns),
      impactStats: JSON.parse(values.impactStats),
      urgentCases: values.urgentCases ? JSON.parse(values.urgentCases) : []
    };
    await updateHome(parsed);
    handleClose();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Home Page Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenEdit}
        aria-label="Edit Home Page"
      >
        Edit Home Page
      </button>
      <Modal open={modalOpen} onClose={handleClose} title="Edit Home Page">
        <Form
          fields={homeFields}
          values={formValues}
          onChange={setFormValues}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </Modal>
      <div className="mt-8 bg-white rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-2">Current Home Page Data</h3>
        <pre className="text-xs bg-gray-100 rounded p-2 overflow-x-auto">{JSON.stringify(home, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AdminHome;
