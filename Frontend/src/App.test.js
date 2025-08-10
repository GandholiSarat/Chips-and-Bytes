/**
 * @file App.test.js
 * @description
 * Basic test for the App component using React Testing Library.
 * Checks that the "learn react" link is rendered.
 */

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
