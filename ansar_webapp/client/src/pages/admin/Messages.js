import React, { useState } from 'react';
import { useAdminMessages } from '../../hooks/useAdminMessages';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

const replyFields = [
  { name: 'reply', label: 'Reply', type: 'text' },
];

const Messages = () => {
  const { messages, loading, error, reply, remove } = useAdminMessages();
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleOpenReply = message => {
    setSelectedMessage(message);
    setFormValues({ reply: '' });
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedMessage(null);
  };
  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (selectedMessage) {
      await reply(selectedMessage._id, formValues);
    }
    handleClose();
  };
  const handleDelete = async message => {
    if (window.confirm('Delete this message?')) {
      await remove(message._id);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'message', label: 'Message' },
    { key: 'createdAt', label: 'Date', render: row => new Date(row.createdAt).toLocaleString() },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Messages & Feedback</h2>
      {error && <div className="text-red-600 mb-2">{error.message || 'Error loading messages.'}</div>}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table columns={columns} data={messages} onEdit={handleOpenReply} onDelete={handleDelete} />
        )}
      </div>
      <Modal open={modalOpen} onClose={handleClose} title={'Reply to Message'}>
        <Form
          fields={replyFields}
          values={formValues}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel={'Send Reply'}
        />
      </Modal>
    </div>
  );
};

export default Messages;
