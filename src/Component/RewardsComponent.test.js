import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RewardsComponent from './RewardsComponent';
import { fetchTransactions } from '../api';
import { calculateRewards } from '../utils';

// Mock fetchTransactions and calculateRewards
jest.mock('../api');
jest.mock('../utils');

const mockTransactions = [
  { customerId: '1', date: '2024-01-15', amount: 120 },
  { customerId: '1', date: '2024-02-10', amount: 90 },
  { customerId: '2', date: '2024-01-20', amount: 75 }
];

const mockRewards = {
  '1': {
    total: 90,
    monthly: { '1': 90, '2': 0 }
  },
  '2': {
    total: 0,
    monthly: { '1': 0 }
  }
};

describe('RewardsComponent', () => {
  beforeEach(() => {
    fetchTransactions.mockResolvedValue(mockTransactions);
    calculateRewards.mockReturnValue(mockRewards);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders rewards for customers', async () => {
    render(<RewardsComponent />);

    await waitFor(() => expect(fetchTransactions).toHaveBeenCalledTimes(1));

    // Check if the customer IDs and total points are rendered
    expect(screen.getByText('Customer 1')).toBeInTheDocument();
    expect(screen.getByText('Total Points: 90')).toBeInTheDocument();

    expect(screen.getByText('Customer 2')).toBeInTheDocument();
    expect(screen.getByText('Total Points: 0')).toBeInTheDocument();

    // Check if the monthly points are rendered
    expect(screen.getByText('Month 1: 90 points')).toBeInTheDocument();
    expect(screen.getByText('Month 2: 0 points')).toBeInTheDocument();
  });

  test('displays error message on API failure', async () => {
    fetchTransactions.mockRejectedValue(new Error('Failed to fetch'));

    render(<RewardsComponent />);

    await waitFor(() => expect(fetchTransactions).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Failed to load transactions.')).toBeInTheDocument();
  });
});
