// src/utils.test.js
import { calculateRewardPoints, calculateRewards } from './utils';

test('calculateRewardPoints', () => {
  expect(calculateRewardPoints(120)).toBe(90);
  expect(calculateRewardPoints(75)).toBe(25);
  expect(calculateRewardPoints(50)).toBe(0);
});

test('calculateRewards', () => {
  const transactions = [
    { customerId: 1, date: '2024-01-15', amount: 120 },
    { customerId: 1, date: '2024-02-15', amount: 75 },
  ];
  const rewards = calculateRewards(transactions);
  expect(rewards[1].total).toBe(115);
  expect(rewards[1].monthly[1]).toBe(90);
  expect(rewards[1].monthly[2]).toBe(25);
});

