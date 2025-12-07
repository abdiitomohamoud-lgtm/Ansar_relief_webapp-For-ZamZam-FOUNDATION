import React, { useState } from 'react';
import { useAdminAbout } from '../../hooks/useAdminAbout';
import Form from '../../components/admin/Form';
import Modal from '../../components/admin/Modal';

/**
 * AdminAbout - CMS-style admin CRUD page for About page content
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Form and Modal components
 * - Integrates with backend CRUD APIs via useAdminAbout hook
 */
const aboutFields = [
  { name: 'heroTitle', label: 'Hero Title', required: true },
  { name: 'heroSubtitle', label: 'Hero Subtitle', required: true },
  { name: 'heroDescription', label: 'Hero Description', type: 'textarea', required: true },
  { name: 'heroImage', label: 'Hero Image URL', required: true },
  { name: 'backgroundImage', label: 'Background Image URL' },
  { name: 'storyTitle', label: 'Story Title' },
  { name: 'whoWeAre', label: 'Who We Are', type: 'textarea' },
  { name: 'mission', label: 'Mission', type: 'textarea' },
  { name: 'approaches', label: 'Approaches', type: 'textarea' }
];

const AdminAbout = () => {
  const { about, loading, error, updateAbout } = useAdminAbout();
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(about || {});

  // Open modal for edit
  const handleOpenEdit = () => {
    setFormValues(about || {});
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  // Handle form submit
  const handleSubmit = async values => {
    await updateAbout(values);
    handleClose();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">About Page Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenEdit}
        aria-label="Edit About Page"
      >
        Edit About Page
      </button>
      <Modal open={modalOpen} onClose={handleClose} title="Edit About Page">
        <Form
          fields={aboutFields}
          values={formValues}
          onChange={setFormValues}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </Modal>
      <div className="mt-8 bg-white rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-2">Current About Page Data</h3>
        <pre className="text-xs bg-gray-100 rounded p-2 overflow-x-auto">{JSON.stringify(about, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AdminAbout;
