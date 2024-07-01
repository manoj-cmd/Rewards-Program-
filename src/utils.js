// src/utils.js
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
  const rewards = {};

  transactions.forEach(({ customer, date, amount }) => {
    const month = new Date(date).getMonth() + 1;
    if (!rewards[customer]) {
      rewards[customer] = { total: 0, monthly: {} };
    }
    if (!rewards[customer].monthly[month]) {
      rewards[customer].monthly[month] = 0;
    }
    const points = calculateRewardPoints(amount);
    rewards[customer].monthly[month] += points;
    rewards[customer].total += points;
  });

  return rewards;
};
