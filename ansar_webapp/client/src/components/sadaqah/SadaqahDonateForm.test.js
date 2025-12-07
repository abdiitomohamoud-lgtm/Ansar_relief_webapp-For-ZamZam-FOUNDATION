import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SadaqahDonateForm from './SadaqahDonateForm';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>
  }
}));

describe('SadaqahDonateForm', () => {
  const mockFixedAmountOption = {
    id: '1',
    title: 'Food Sadaqah',
    amount: 50,
    isPeriodic: false,
    customAmount: false
  };

  const mockCustomAmountOption = {
    id: '2',
    title: 'General Sadaqah',
    isPeriodic: true,
    interval: 'monthly',
    customAmount: true
  };

  test('renders fixed amount form correctly', () => {
    render(<SadaqahDonateForm sadaqahOption={mockFixedAmountOption} />);
    
    // Check if title is rendered
    expect(screen.getByText('Food Sadaqah')).toBeInTheDocument();
    
    // Check if the fixed amount is displayed
    expect(screen.getByText('$50')).toBeInTheDocument();
    
    // Check if Next Step button is present
    expect(screen.getByText('Next Step')).toBeInTheDocument();
  });

  test('renders custom amount form correctly', () => {
    render(<SadaqahDonateForm sadaqahOption={mockCustomAmountOption} />);
    
    // Check if title is rendered
    expect(screen.getByText('General Sadaqah')).toBeInTheDocument();
    
    // Check if donation amount buttons are present
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText('$25')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
    
    // Check if frequency options are present
    expect(screen.getByText('One-time donation')).toBeInTheDocument();
    expect(screen.getByText('Recurring donation')).toBeInTheDocument();
  });

  test('allows changing donation amount', () => {
    render(<SadaqahDonateForm sadaqahOption={mockCustomAmountOption} />);
    
    // Click a predefined amount button
    fireEvent.click(screen.getByText('$100'));
    
    // Test custom amount input
    const customAmountInput = screen.getByPlaceholderText('Enter amount');
    fireEvent.change(customAmountInput, { target: { value: '75' } });
    
    // Value should be updated
    expect(customAmountInput.value).toBe('75');
  });

  test('changes to second step when Next Step is clicked', () => {
    render(<SadaqahDonateForm sadaqahOption={mockCustomAmountOption} />);
    
    // Click Next Step button
    fireEvent.click(screen.getByText('Next Step'));
    
    // Personal information fields should now be visible
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    
    // Donate Now button should be present
    expect(screen.getByText('Donate Now')).toBeInTheDocument();
  });

  test('allows going back from second step to first step', () => {
    render(<SadaqahDonateForm sadaqahOption={mockCustomAmountOption} />);
    
    // Go to second step
    fireEvent.click(screen.getByText('Next Step'));
    
    // Go back to first step
    fireEvent.click(screen.getByText('Back'));
    
    // Check if back on first step
    expect(screen.getByText('Next Step')).toBeInTheDocument();
  });

  test('shows correct summary in second step', () => {
    render(<SadaqahDonateForm sadaqahOption={mockCustomAmountOption} />);
    
    // Change amount and go to next step
    fireEvent.click(screen.getByText('$250'));
    fireEvent.click(screen.getByText('Next Step'));
    
    // Check summary
    expect(screen.getByText('Donation Amount:')).toBeInTheDocument();
    expect(screen.getByText('$250')).toBeInTheDocument();
    expect(screen.getByText('Frequency:')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
  });
}); 