export const fetchTransactions = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { customer: 'Rahul', amount: 120, date: '2024-01-10' },
          { customer: 'Sunil', amount: 75, date: '2024-01-15' },
          { customer: 'Rahul', amount: 200, date: '2024-02-10' },
          { customer: 'Sunil', amount: 60, date: '2024-02-20' },
          { customer: 'Rahul', amount: 50, date: '2024-03-10' },
          { customer: 'Sunil', amount: 110, date: '2024-03-15' },
          { customer: 'Anil', amount: 210, date: '2024-01-15' },
          { customer: 'Sunil', amount: 110, date: '2024-02-15' },
          { customer: 'Anil', amount: 50, date: '2024-03-15' },
        ]);
      }, 1000);
    });
  };
  