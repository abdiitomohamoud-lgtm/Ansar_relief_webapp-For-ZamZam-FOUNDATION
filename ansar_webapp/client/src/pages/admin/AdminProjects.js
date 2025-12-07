import React, { useState } from 'react';
import { useAdminProjects } from '../../hooks/useAdminProjects';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminProjects - CMS-style admin CRUD page for projects
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminProjects hook
 */
const projectFields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'slug', label: 'Slug', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'image', label: 'Image URL', required: true },
  { name: 'budget', label: 'Budget', type: 'number' },
  { name: 'category', label: 'Category', required: true }
];

const AdminProjects = () => {
  const { projects, loading, error, addProject, editProject, removeProject } = useAdminProjects();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);

  // Open modal for add/edit
  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = project => {
    setFormValues(project);
    setSelectedProject(project);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedProject(null);
  };
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedProject) {
      await editProject(selectedProject._id || selectedProject.id, values);
    } else {
      await addProject(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async project => {
    if (window.confirm('Delete this project?')) {
      await removeProject(project._id || project.id);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Project Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Project"
      >
        + Add Project
      </button>
      <Table
        columns={projectFields.map(f => ({ key: f.name, label: f.label }))}
        data={projects}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Project' : 'Add Project'}>
        <Form
          fields={projectFields}
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

export default AdminProjects;
