import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Rewards Program heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Rewards Program/i);
  expect(headingElement).toBeInTheDocument();
});
