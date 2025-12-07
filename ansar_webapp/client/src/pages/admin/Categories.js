import React, { useState } from 'react';
import { useAdminCategories } from '../../hooks/useAdminCategories';
import Table from '../../components/admin/Table';
import Form from '../../components/admin/Form';
import Modal from '../../components/admin/Modal';

const categoryFields = [
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description' },
  { name: 'icon', label: 'Icon' },
];

const Categories = () => {
  const { categories, loading, error, addCategory, editCategory, removeCategory } = useAdminCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

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
  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (editMode && selectedCategory) {
      await editCategory(selectedCategory._id, formValues);
    } else {
      await addCategory(formValues);
    }
    handleClose();
  };
  const handleDelete = async category => {
    if (window.confirm('Delete this category?')) {
      await removeCategory(category._id);
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'icon', label: 'Icon' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Project Categories</h2>
      <button className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700" onClick={handleOpenAdd}>
        Add Category
      </button>
      {error && <div className="text-red-600 mb-2">{error.message || 'Error loading categories.'}</div>}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table columns={columns} data={categories} onEdit={handleOpenEdit} onDelete={handleDelete} />
        )}
      </div>
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Category' : 'Add Category'}>
        <Form
          fields={categoryFields}
          values={formValues}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel={editMode ? 'Update' : 'Create'}
        />
      </Modal>
    </div>
  );
};

export default Categories;
