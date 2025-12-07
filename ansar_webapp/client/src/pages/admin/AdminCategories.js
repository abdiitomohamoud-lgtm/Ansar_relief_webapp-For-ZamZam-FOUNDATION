import React, { useState } from 'react';
import { useAdminCategories } from '../../hooks/useAdminCategories';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminCategories - CMS-style admin CRUD page for categories
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminCategories hook
 */
const categoryFields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'slug', label: 'Slug', required: true }
];

const AdminCategories = () => {
  const { categories, loading, error, addCategory, editCategory, removeCategory } = useAdminCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Open modal for add/edit
  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = category => {
    setFormValues(category);
    setSelectedCategory(category);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedCategory(null);
  };
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedCategory) {
      await editCategory(selectedCategory._id || selectedCategory.id, values);
    } else {
      await addCategory(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async category => {
    if (window.confirm('Delete this category?')) {
      await removeCategory(category._id || category.id);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Category Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Category"
      >
        + Add Category
      </button>
      <Table
        columns={categoryFields.map(f => ({ key: f.name, label: f.label }))}
        data={categories}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Category' : 'Add Category'}>
        <Form
          fields={categoryFields}
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

export default AdminCategories;
