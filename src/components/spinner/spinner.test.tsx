import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner component', () => {
  it('should render spinner', () => {
    render(<Spinner />);

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });
});
