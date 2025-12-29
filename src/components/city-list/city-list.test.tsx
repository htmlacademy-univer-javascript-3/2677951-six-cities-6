import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should call onCityChange when city is clicked', async () => {
    const mockOnCityChange = vi.fn();
    const user = userEvent.setup();

    render(<CityList currentCity="Paris" onCityChange={mockOnCityChange} />);

    const cologneButton = screen.getByText('Cologne');
    await user.click(cologneButton);

    expect(mockOnCityChange).toHaveBeenCalledTimes(1);
    expect(mockOnCityChange).toHaveBeenCalledWith('Cologne');
  });
});
