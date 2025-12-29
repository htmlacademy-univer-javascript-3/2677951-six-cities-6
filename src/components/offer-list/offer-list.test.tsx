import { render, fireEvent } from '@testing-library/react';
import OfferList from './offer-list';
import { Offer } from '../../types/offer';

vi.mock('../offer-card/offer-card', () => ({
  default: () => <div>OfferCard</div>,
}));

describe('OfferList component', () => {
  it('should call onOfferHover on mouse enter and leave', () => {
    const offers: Offer[] = [
      {
        id: '1',
        title: 'A',
        type: 'apartment',
        price: 100,
        city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
        location: { latitude: 0, longitude: 0, zoom: 10 },
        isFavorite: false,
        isPremium: false,
        rating: 4,
        previewImage: 'img/1.jpg',
      },
      {
        id: '2',
        title: 'B',
        type: 'room',
        price: 200,
        city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
        location: { latitude: 1, longitude: 1, zoom: 10 },
        isFavorite: false,
        isPremium: false,
        rating: 3,
        previewImage: 'img/2.jpg',
      },
    ];

    const onOfferHover = vi.fn();
    const { container } = render(<OfferList offers={offers} onOfferHover={onOfferHover} />);

    const wrappers = container.querySelectorAll('.cities__places-list > div');
    expect(wrappers.length).toBe(2);

    fireEvent.mouseEnter(wrappers[0]);
    expect(onOfferHover).toHaveBeenCalledWith(offers[0]);

    fireEvent.mouseLeave(wrappers[0]);
    expect(onOfferHover).toHaveBeenCalledWith(null);
  });
});
