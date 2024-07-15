import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../api';
import { calculateRewards } from '../utils';
import '../App.css'

const RewardsComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pure function to handle loading data
  const loadData = async (fetchTransactions, calculateRewards, setTransactions, setRewards, setError, setLoading) => {
    try {
      const data = await fetchTransactions();
      setTransactions(data);
      const calculatedRewards = calculateRewards(data);
      setRewards(calculatedRewards);
    } catch (error) {
      setError('Failed to load transactions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(fetchTransactions, calculateRewards, setTransactions, setRewards, setError, setLoading);
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Function to render customer rewards
  const renderCustomerRewards = (customerId, rewards) => (
    <div key={customerId}>
      <h2>Customer {customerId}</h2>
      <p>Total Points: {rewards[customerId].total}</p>
      <b>Monthly Points:</b>
      <ul>
        {Object.keys(rewards[customerId].monthly).map((month) => (
          <li key={month}>
            Month {month}: {rewards[customerId].monthly[month]} points
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className='mainDiv'>
      <h1>Rewards Program</h1>
      {Object.keys(rewards).map((customerId) => renderCustomerRewards(customerId, rewards))}
    </div>
  );
};

export default RewardsComponent;
