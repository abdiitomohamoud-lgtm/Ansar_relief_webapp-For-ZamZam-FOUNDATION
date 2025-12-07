import React, { useState } from 'react';
import { useAdminCart } from '../../hooks/useAdminCart';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminCart - CMS-style admin CRUD page for cart management
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminCart hook
 */
const cartFields = [
  { name: 'user', label: 'User', required: true },
  { name: 'items', label: 'Items', type: 'textarea', required: true },
  { name: 'total', label: 'Total', type: 'number', required: true },
  { name: 'status', label: 'Status' },
  { name: 'createdAt', label: 'Created At', type: 'datetime', readOnly: true }
];

const AdminCart = () => {
  const { carts, loading, error, addCart, editCart, removeCart } = useAdminCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedCart, setSelectedCart] = useState(null);

  // Open modal for add/edit
  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = cart => {
    setFormValues(cart);
    setSelectedCart(cart);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedCart(null);
  };
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedCart) {
      await editCart(selectedCart._id || selectedCart.id, values);
    } else {
      await addCart(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async cart => {
    if (window.confirm('Delete this cart?')) {
      await removeCart(cart._id || cart.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Cart Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Cart"
      >
        + Add Cart
      </button>
      <Table
        columns={cartFields.map(f => ({ key: f.name, label: f.label }))}
        data={carts}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Cart' : 'Add Cart'}>
        <Form
          fields={cartFields}
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

export default AdminCart;
