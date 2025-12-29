import { render, screen } from '@testing-library/react';
import ErrorMessage from './error-message';

describe('ErrorMessage component', () => {
  it('should render default message', () => {
    render(<ErrorMessage />);
    expect(screen.getByText(/Failed to load data/i)).toBeInTheDocument();
  });

  it('should render custom message', () => {
    render(<ErrorMessage message="Custom error" />);
    expect(screen.getByText('Custom error')).toBeInTheDocument();
  });
});
