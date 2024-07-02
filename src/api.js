export const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { customerId: 1, date: '2024-01-15', amount: 120 },
        { customerId: 1, date: '2024-02-15', amount: 75 },
        { customerId: 2, date: '2024-01-20', amount: 200 },
        { customerId: 2, date: '2024-03-10', amount: 50 },
        // Add more sample transactions
      ]);
    }, 1000);
  });
};
