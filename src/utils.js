export const calculateRewardPoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2;
    amount = 100;
  }
  if (amount > 50) {
    points += (amount - 50);
  }
  return points;
};

export const calculateRewards = (transactions) => {
  return transactions.reduce((rewards, { customerId, date, amount }) => {
    const month = new Date(date).getMonth() + 1;
    if (!rewards[customerId]) {
      rewards[customerId] = { total: 0, monthly: {} };
    }
    if (!rewards[customerId].monthly[month]) {
      rewards[customerId].monthly[month] = 0;
    }
    const points = calculateRewardPoints(amount);
    rewards[customerId].monthly[month] += points;
    rewards[customerId].total += points;

    return rewards;
  }, {});
};
