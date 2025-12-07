import React, { useState } from 'react';
import { useAdminSadaqahCards } from '../../hooks/useAdminSadaqahCards';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminSadaqahCards - CMS-style admin CRUD page for sadaqah cards
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminSadaqahCards hook
 */
const sadaqahCardFields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
  { name: 'image', label: 'Image URL' },
  { name: 'status', label: 'Status' }
];

const AdminSadaqahCards = () => {
  const { sadaqahCards, loading, error, addSadaqahCard, editSadaqahCard, removeSadaqahCard } = useAdminSadaqahCards();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);

  // Open modal for add/edit
  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = card => {
    setFormValues(card);
    setSelectedCard(card);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedCard(null);
  };
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedCard) {
      await editSadaqahCard(selectedCard._id || selectedCard.id, values);
    } else {
      await addSadaqahCard(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async card => {
    if (window.confirm('Delete this sadaqah card?')) {
      await removeSadaqahCard(card._id || card.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Sadaqah Cards Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Sadaqah Card"
      >
        + Add Sadaqah Card
      </button>
      <Table
        columns={sadaqahCardFields.map(f => ({ key: f.name, label: f.label }))}
        data={sadaqahCards}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Sadaqah Card' : 'Add Sadaqah Card'}>
        <Form
          fields={sadaqahCardFields}
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

export default AdminSadaqahCards;
