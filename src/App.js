
import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchTransactions } from './api';
import { calculateRewards } from './utils';

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
    <div className="mainDiv">
      <h1>Rewards Program</h1>
      {Object.keys(rewards).map((customer) => (
        <div key={customer}>
          <h2>Customer Name - {customer}</h2>
          <p>Total Points: {rewards[customer].total}</p>
          <b>Monthly Points:</b>
          <ul>
            {Object.keys(rewards[customer].monthly).map((month) => (
              <li key={month}>
                Month {month}: {rewards[customer].monthly[month]} points
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;
