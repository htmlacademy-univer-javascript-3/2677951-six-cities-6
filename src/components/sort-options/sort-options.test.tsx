import { render, screen } from '@testing-library/react';
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
});
