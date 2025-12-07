import React from 'react';
import { render, screen } from '@testing-library/react';
import { RoleGuard } from '../components/RoleGuard';

// Mock useRole hook
jest.mock('../hooks/useRole', () => ({
  useRole: () => 'admin',
}));

describe('RoleGuard', () => {
  it('renders children if role is allowed', () => {
    render(
      <RoleGuard allowedRoles={['admin', 'manager']}>
        <div>Secret Content</div>
      </RoleGuard>
    );
    expect(screen.getByText('Secret Content')).toBeInTheDocument();
  });

  it('does not render children if role is not allowed', () => {
    jest.mock('../hooks/useRole', () => ({ useRole: () => 'viewer' }));
    render(
      <RoleGuard allowedRoles={['admin', 'manager']}>
        <div>Secret Content</div>
      </RoleGuard>
    );
    expect(screen.queryByText('Secret Content')).toBeNull();
  });
});
