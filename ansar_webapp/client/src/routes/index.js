import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute, AdminRoute, Unauthorized } from '../components/common';
import {
  PUBLIC_ROUTES,
  PROTECTED_ROUTES,
  ADMIN_ROUTES,
  ROUTE_PERMISSIONS
} from './constants';

// Layout
import Layout from '../layouts/Layout';

// Public Pages
import Home from '../pages/Home';
import About from '../pages/about/AboutPage';
import Events from '../pages/Events';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Additional Public Pages
import Initiatives from '../pages/Initiatives';
import Campaigns from '../pages/Campaigns';
import SadaqahPage from '../pages/sadaqah/SadaqahPage';
import ZakatSadaqah from '../pages/sadaqah/ZakatSadaqah';
import Volunteer from '../pages/Volunteer';
import Contact from '../pages/Contact';
import Projects from '../pages/Projects';
import Sponsorship from '../pages/Sponsorship';
import DonatePage from '../pages/donate/DonatePage';
import CartPage from '../pages/cart/CartPage';

// Project and Sponsorship Routes
import projectRoutes from './projectRoutes';
import sponsorshipRoutes from './sponsorshipRoutes';

// Protected Pages
import Dashboard from '../pages/dashboard/Dashboard';
import DonateDetail from '../pages/donate/DonateDetailPage';
import CheckoutPage from '../pages/checkout/CheckoutPage';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/Users';
import AdminSettings from '../pages/admin/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Wrap all routes with Layout to include Navbar and Footer */}
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path={PUBLIC_ROUTES.HOME} element={<Home />} />
        <Route path={PUBLIC_ROUTES.ABOUT} element={<About />} />
        <Route path="/initiatives" element={<Initiatives />} />
        <Route path="/campaigns/*" element={<Campaigns />} />
        <Route path="/sadaqah/*" element={<SadaqahPage />} />
        <Route path="/sadaqah/zakat-calculator" element={<ZakatSadaqah />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/projects/*" element={<Projects />}>
          {projectRoutes}
        </Route>
        <Route path="/sponsorship/*" element={<Sponsorship />}>
          {sponsorshipRoutes}
        </Route>
        <Route path={PUBLIC_ROUTES.EVENTS} element={<Events />} />
        <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
        <Route path={PUBLIC_ROUTES.REGISTER} element={<Register />} />
        <Route path={PUBLIC_ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PUBLIC_ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={PUBLIC_ROUTES.UNAUTHORIZED} element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route path={PROTECTED_ROUTES.DASHBOARD} element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path={PROTECTED_ROUTES.DONATE_DETAIL} element={
          <PrivateRoute>
            <DonateDetail />
          </PrivateRoute>
        } />
        
        <Route path={PROTECTED_ROUTES.CHECKOUT} element={
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        } />

        {/* Admin Routes */}
        <Route path={ADMIN_ROUTES.DASHBOARD} element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />

        <Route path={ADMIN_ROUTES.USERS} element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        } />

        <Route path={ADMIN_ROUTES.SETTINGS} element={
          <AdminRoute requireSuperAdmin>
            <AdminSettings />
          </AdminRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to={PUBLIC_ROUTES.HOME} replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;