import { render, screen } from '@testing-library/react';
import ReviewList from './review-list';
import { Review } from '../../types/review';

describe('ReviewList component', () => {
  it('should render reviews count', () => {
    const mockReviews: Review[] = [
      {
        id: '1',
        comment: 'Great place!',
        date: '2024-01-01',
        rating: 5,
        user: { name: 'John', avatarUrl: '', isPro: false }
      },
      {
        id: '2',
        comment: 'Nice location',
        date: '2024-01-02',
        rating: 4,
        user: { name: 'Jane', avatarUrl: '', isPro: false }
      }
    ];

    render(<ReviewList reviews={mockReviews} />);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText('Great place!')).toBeInTheDocument();
    expect(screen.getByText('Nice location')).toBeInTheDocument();
  });

  it('should render empty list when no reviews', () => {
    render(<ReviewList reviews={[]} />);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });
});
