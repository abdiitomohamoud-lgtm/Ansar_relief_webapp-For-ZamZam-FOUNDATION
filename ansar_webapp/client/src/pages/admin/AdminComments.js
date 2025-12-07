import React, { useState } from 'react';
import { useAdminComments } from '../../hooks/useAdminComments';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminComments - CMS-style admin CRUD page for comments
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminComments hook
 */
const commentFields = [
  { name: 'user', label: 'User', required: true },
  { name: 'content', label: 'Content', type: 'textarea', required: true },
  { name: 'createdAt', label: 'Created At', type: 'datetime', readOnly: true },
  { name: 'status', label: 'Status' }
];

const AdminComments = () => {
  const { comments, loading, error, addComment, editComment, removeComment } = useAdminComments();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedComment, setSelectedComment] = useState(null);

  // Open modal for add/edit
  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = comment => {
    setFormValues(comment);
    setSelectedComment(comment);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedComment(null);
  };
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedComment) {
      await editComment(selectedComment._id || selectedComment.id, values);
    } else {
      await addComment(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async comment => {
    if (window.confirm('Delete this comment?')) {
      await removeComment(comment._id || comment.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Comments Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Comment"
      >
        + Add Comment
      </button>
      <Table
        columns={commentFields.map(f => ({ key: f.name, label: f.label }))}
        data={comments}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Comment' : 'Add Comment'}>
        <Form
          fields={commentFields}
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

export default AdminComments;
