import React, { useState } from 'react';
import { useAdminProjectCategoryPages } from '../../hooks/useAdminProjectCategoryPages';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminProjectCategoryPages - CMS-style admin CRUD page for project category pages
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminProjectCategoryPages hook
 */
const projectCategoryPageFields = [
  { name: 'category', label: 'Category', required: true },
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'image', label: 'Image URL' },
  { name: 'status', label: 'Status' }
];

const AdminProjectCategoryPages = () => {
  const { projectCategoryPages, loading, error, addProjectCategoryPage, editProjectCategoryPage, removeProjectCategoryPage } = useAdminProjectCategoryPages();
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
      await editProjectCategoryPage(selectedPage._id || selectedPage.id, values);
    } else {
      await addProjectCategoryPage(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async page => {
    if (window.confirm('Delete this project category page?')) {
      await removeProjectCategoryPage(page._id || page.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Project Category Pages Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Project Category Page"
      >
        + Add Project Category Page
      </button>
      <Table
        columns={projectCategoryPageFields.map(f => ({ key: f.name, label: f.label }))}
        data={projectCategoryPages}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Project Category Page' : 'Add Project Category Page'}>
        <Form
          fields={projectCategoryPageFields}
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

export default AdminProjectCategoryPages;
