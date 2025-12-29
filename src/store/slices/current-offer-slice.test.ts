import { currentOfferReducer } from './current-offer-slice';
import { fetchOffer, fetchNearbyOffers } from '../action';
import { Offer } from '../../types/offer';

const mockOffer: Offer = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  previewImage: 'img/test.jpg',
  description: 'Test',
  bedrooms: 2,
  goods: [],
  host: { name: 'Host', avatarUrl: '', isPro: false },
  images: [],
  maxAdults: 4
};

describe('currentOfferSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { currentOffer: null, nearbyOffers: [], error: null };

    const result = currentOfferReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set currentOffer with fetchOffer.fulfilled', () => {
    const expectedState = { currentOffer: mockOffer, nearbyOffers: [], error: null };

    const result = currentOfferReducer(undefined, fetchOffer.fulfilled(mockOffer, '', '1'));

    expect(result).toEqual(expectedState);
  });

  it('should set nearbyOffers with fetchNearbyOffers.fulfilled', () => {
    const mockOffers = [mockOffer];
    const expectedState = { currentOffer: null, nearbyOffers: mockOffers, error: null };

    const result = currentOfferReducer(undefined, fetchNearbyOffers.fulfilled(mockOffers, '', '1'));

    expect(result).toEqual(expectedState);
  });
});
