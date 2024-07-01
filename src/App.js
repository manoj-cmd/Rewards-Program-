// src/App.js
import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './api';
import { calculateRewards } from './utils';
import './App.css'

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
        const calculatedRewards = calculateRewards(data);
        setRewards(calculatedRewards);
      } catch (error) {
        setError('Failed to load transactions.');
      }
    };
    loadData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='mainDiv'>
      <h1>Rewards Program</h1>
      {Object.keys(rewards).map((customerId) => (
        <div key={customerId}>
          <h2>Customer {customerId}</h2>
          <p>Total Points: {rewards[customerId].total}</p>
          <h3>Monthly Points:</h3>
          <ul>
            {Object.keys(rewards[customerId].monthly).map((month) => (
              <li key={month}>
                Month {month}: {rewards[customerId].monthly[month]} points
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;
