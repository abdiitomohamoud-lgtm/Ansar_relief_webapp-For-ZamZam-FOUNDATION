import React, { useState } from 'react';
import { useAdminProjectsDetailPage } from '../../hooks/useAdminProjectsDetailPage';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminProjectsDetailPage - CMS-style admin CRUD page for project detail pages
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminProjectsDetailPage hook
 */
const projectsDetailPageFields = [
  { name: 'project', label: 'Project', required: true },
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'image', label: 'Image URL' },
  { name: 'status', label: 'Status' }
];

const AdminProjectsDetailPage = () => {
  const { projectsDetailPages, loading, error, addProjectsDetailPage, editProjectsDetailPage, removeProjectsDetailPage } = useAdminProjectsDetailPage();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedPage, setSelectedPage] = useState(null);

  // Open modal for add/edit
  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = page => {
    setFormValues(page);
    setSelectedPage(page);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedPage(null);
  };
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedPage) {
      await editProjectsDetailPage(selectedPage._id || selectedPage.id, values);
    } else {
      await addProjectsDetailPage(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async page => {
    if (window.confirm('Delete this project detail page?')) {
      await removeProjectsDetailPage(page._id || page.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Projects Detail Pages Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Project Detail Page"
      >
        + Add Project Detail Page
      </button>
      <Table
        columns={projectsDetailPageFields.map(f => ({ key: f.name, label: f.label }))}
        data={projectsDetailPages}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Project Detail Page' : 'Add Project Detail Page'}>
        <Form
          fields={projectsDetailPageFields}
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

export default AdminProjectsDetailPage;
