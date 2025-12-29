import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortOptions from './sort-options';
import { SortType } from '../../constants/sort';

describe('SortOptions component', () => {
  it('should render sort by caption', () => {
    const mockOnSortChange = vi.fn();
    render(<SortOptions currentSort={SortType.Popular} onSortChange={mockOnSortChange} />);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('should render all sort options', () => {
    const mockOnSortChange = vi.fn();
    render(<SortOptions currentSort={SortType.Popular} onSortChange={mockOnSortChange} />);

    expect(screen.getByText(SortType.PriceLowToHigh)).toBeInTheDocument();
    expect(screen.getByText(SortType.PriceHighToLow)).toBeInTheDocument();
    expect(screen.getByText(SortType.TopRatedFirst)).toBeInTheDocument();
  });

  it('should call onSortChange when sort option is clicked', async () => {
    const mockOnSortChange = vi.fn();
    const user = userEvent.setup();

    render(<SortOptions currentSort={SortType.Popular} onSortChange={mockOnSortChange} />);

    const priceOption = screen.getByText(SortType.PriceLowToHigh);
    await user.click(priceOption);

    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortChange).toHaveBeenCalledWith(SortType.PriceLowToHigh);
  });
});
