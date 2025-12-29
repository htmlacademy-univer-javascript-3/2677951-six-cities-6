import { render, screen } from '@testing-library/react';
import ReviewItem from './review';
import { Review } from '../../types/review';

describe('ReviewItem component', () => {
  it('should render review content', () => {
    const review: Review = {
      id: '1',
      comment: 'Nice place',
      date: '2019-04-15T12:00:00.000Z',
      rating: 4.5,
      user: {
        name: 'John',
        avatarUrl: 'img/avatar.jpg',
        isPro: false,
      },
    };

    render(<ReviewItem review={review} />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Nice place')).toBeInTheDocument();
    expect(screen.getByText('April 2019')).toBeInTheDocument();
  });

  it('should render rounded rating width', () => {
    const review: Review = {
      id: '2',
      comment: 'Ok',
      date: '2020-01-01T00:00:00.000Z',
      rating: 3.1,
      user: {
        name: 'Kate',
        avatarUrl: 'img/avatar.jpg',
        isPro: false,
      },
    };

    const { container } = render(<ReviewItem review={review} />);
    const starsSpan = container.querySelector('.reviews__stars span') as HTMLSpanElement;

    expect(starsSpan).toHaveStyle({ width: '60%' });
  });
});
