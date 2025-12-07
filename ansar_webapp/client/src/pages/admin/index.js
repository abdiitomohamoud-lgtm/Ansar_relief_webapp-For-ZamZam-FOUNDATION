import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import Dashboard from './Dashboard';
import Users from './Users';
import Content from './Content';
import Messages from './Messages';
import Settings from './Settings';
import Categories from './Categories';
import Volunteers from './Volunteers';

const AdminIndex = () => (
  <AdminLayout>
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="users" element={<Users />} />
      <Route path="content" element={<Content />} />
      <Route path="categories" element={<Categories />} />
      <Route path="volunteers" element={<Volunteers />} />
      <Route path="messages" element={<Messages />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
    <Outlet />
  </AdminLayout>
);

export default AdminIndex;
