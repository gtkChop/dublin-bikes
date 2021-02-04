import { render, screen } from '@testing-library/react';
import BikesApp from './BikesApp';

test('renders learn react link', () => {
  render(<BikesApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
