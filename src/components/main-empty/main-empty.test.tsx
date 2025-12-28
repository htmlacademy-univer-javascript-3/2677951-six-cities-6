import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';

describe('MainEmpty component', () => {
  it('should render empty state with city name', () => {
    const cityName = 'Paris';
    render(<MainEmpty city={cityName} />);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in/i)).toBeInTheDocument();
  });
});
