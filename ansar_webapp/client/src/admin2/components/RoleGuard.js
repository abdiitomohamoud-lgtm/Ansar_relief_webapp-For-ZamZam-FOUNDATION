import React from 'react';
import PropTypes from 'prop-types';
import { useRole } from '../hooks/useRole';

/**
 * RoleGuard - Renders children only if user has one of the allowed roles.
 * @param {string[]} allowedRoles - Array of allowed role names
 * @param {React.ReactNode} children
 */
export function RoleGuard({ allowedRoles, children }) {
  const role = useRole();
  if (!allowedRoles.includes(role)) return null;
  return <>{children}</>;
}

RoleGuard.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node
};
