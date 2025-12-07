import React from 'react';
import { render, screen } from '@testing-library/react';
import Users from '../../pages/admin/Users';

describe('Admin Users Page', () => {
  it('renders user management heading', () => {
    render(<Users />);
    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
  });
});
