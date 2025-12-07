import React, { useState } from 'react';
import { useAdminTeam } from '../../hooks/useAdminTeam';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import Form from '../../components/admin/Form';

/**
 * AdminTeam - CMS-style admin CRUD page for team members
 * - Fully dynamic, responsive, and accessible
 * - Uses modular Table, Modal, and Form components
 * - Integrates with backend CRUD APIs via useAdminTeam hook
 */
const teamFields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'role', label: 'Role', required: true },
  { name: 'image', label: 'Image URL', required: true },
  { name: 'bio', label: 'Bio', type: 'textarea' }
];

const AdminTeam = () => {
  const { team, loading, error, addTeamMember, editTeamMember, removeTeamMember } = useAdminTeam();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedMember, setSelectedMember] = useState(null);

  // Open modal for add/edit
  const handleOpenAdd = () => {
    setFormValues({});
    setEditMode(false);
    setModalOpen(true);
  };
  const handleOpenEdit = member => {
    setFormValues(member);
    setSelectedMember(member);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setFormValues({});
    setSelectedMember(null);
  };
  // Handle form submit
  const handleSubmit = async values => {
    if (editMode && selectedMember) {
      await editTeamMember(selectedMember._id || selectedMember.id, values);
    } else {
      await addTeamMember(values);
    }
    handleClose();
  };
  // Handle delete
  const handleDelete = async member => {
    if (window.confirm('Delete this team member?')) {
      await removeTeamMember(member._id || member.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Team Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
        onClick={handleOpenAdd}
        aria-label="Add Team Member"
      >
        + Add Team Member
      </button>
      <Table
        columns={teamFields.map(f => ({ key: f.name, label: f.label }))}
        data={team}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        rowKey="_id"
      />
      <Modal open={modalOpen} onClose={handleClose} title={editMode ? 'Edit Team Member' : 'Add Team Member'}>
        <Form
          fields={teamFields}
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

export default AdminTeam;
