import React, { useState } from 'react';
import { useAdminMessages } from '../../hooks/useAdminMessages';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminMessages - CMS-style admin CRUD page for messages/feedback
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminMessages hook
 */
const messageFields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', required: true },
  { name: 'subject', label: 'Subject', required: true },
  { name: 'message', label: 'Message', type: 'textarea', required: true },
  { name: 'status', label: 'Status', required: false }
];

const AdminMessages = () => {
  const { messages, loading, error, addMessage, editMessage, removeMessage } = useAdminMessages();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Open modal for add/edit
  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = message => {
    setFormValues(message);
    setSelectedMessage(message);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedMessage(null);
  };
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedMessage) {
      await editMessage(selectedMessage._id || selectedMessage.id, values);
    } else {
      await addMessage(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async message => {
    if (window.confirm('Delete this message?')) {
      await removeMessage(message._id || message.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Messages & Feedback</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Message"
      >
        + Add Message
      </button>
      <Table
        columns={messageFields.map(f => ({ key: f.name, label: f.label }))}
        data={messages}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Message' : 'Add Message'}>
        <Form
          fields={messageFields}
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

export default AdminMessages;
