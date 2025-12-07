import React, { useState } from 'react';

/**
 * UserEditor - Admin user creation and editing interface.
 * Replace with real form validation and API integration.
 */
export default function UserEditor({ user = {}, onSave }) {
  const [form, setForm] = useState({
    name: user.name || '',
    email: user.email || '',
    role: user.role || 'viewer',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave && onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="w-full px-2 py-1 border rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-2 py-1 border rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Role</label>
        <select name="role" value={form.role} onChange={handleChange} className="w-full px-2 py-1 border rounded">
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>
      <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded">Save</button>
    </form>
  );
}
