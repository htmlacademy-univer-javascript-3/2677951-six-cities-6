import { render, screen } from '@testing-library/react';
import CityList from './city-list';

describe('CityList component', () => {
  it('should render list of cities', () => {
    const mockOnCityChange = vi.fn();
    render(<CityList currentCity="Paris" onCityChange={mockOnCityChange} />);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
  });

  it('should highlight current city', () => {
    const mockOnCityChange = vi.fn();
    const { container } = render(<CityList currentCity="Paris" onCityChange={mockOnCityChange} />);

    const activeLink = container.querySelector('.tabs__item--active');
    expect(activeLink).toBeInTheDocument();
  });
});
