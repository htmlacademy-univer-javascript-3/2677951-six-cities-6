import { currentOfferReducer } from './current-offer-slice';
import { fetchOffer, fetchNearbyOffers } from '../action';
import { Offer } from '../../types/offer';

const createMockOffer = (id: string, title: string): Offer => ({
  id,
  title,
  type: 'apartment',
  price: 100,
  city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: false,
  isPremium: false,
  rating: 4,
  description: 'Test',
  bedrooms: 2,
  goods: [],
  host: { name: 'Host', avatarUrl: '', isPro: false },
  images: [],
  maxAdults: 4,
  previewImage: ''
});

describe('currentOfferSlice', () => {
  it('should return initial state', () => {
    const state = currentOfferReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state.currentOffer).toBeNull();
    expect(state.nearbyOffers).toEqual([]);
  });

  it('should set currentOffer on fetchOffer.fulfilled', () => {
    const initialState = { currentOffer: null, nearbyOffers: [] };
    const mockOffer = createMockOffer('1', 'Test Offer');
    const state = currentOfferReducer(initialState, fetchOffer.fulfilled(mockOffer, '', ''));
    expect(state.currentOffer).toEqual(mockOffer);
  });

  it('should set nearbyOffers on fetchNearbyOffers.fulfilled', () => {
    const initialState = { currentOffer: null, nearbyOffers: [] };
    const mockNearbyOffers = [createMockOffer('2', 'Nearby')];
    const state = currentOfferReducer(initialState, fetchNearbyOffers.fulfilled(mockNearbyOffers, '', ''));
    expect(state.nearbyOffers).toEqual(mockNearbyOffers);
  });
});
