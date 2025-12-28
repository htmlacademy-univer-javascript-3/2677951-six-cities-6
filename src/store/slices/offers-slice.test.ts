import { offersReducer } from './offers-slice';
import { fetchOffers } from '../action';
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

describe('offersSlice', () => {
  it('should return initial state', () => {
    const state = offersReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state.offers).toEqual([]);
    expect(state.isLoading).toBe(false);
  });

  it('should set isLoading to true on fetchOffers.pending', () => {
    const initialState = { offers: [], isLoading: false };
    const state = offersReducer(initialState, fetchOffers.pending('', undefined));
    expect(state.isLoading).toBe(true);
  });

  it('should set offers on fetchOffers.fulfilled', () => {
    const initialState = { offers: [], isLoading: true };
    const mockOffers = [createMockOffer('1', 'Test')];
    const state = offersReducer(initialState, fetchOffers.fulfilled(mockOffers, '', undefined));
    expect(state.offers).toEqual(mockOffers);
    expect(state.isLoading).toBe(false);
  });

  it('should set isLoading to false on fetchOffers.rejected', () => {
    const initialState = { offers: [], isLoading: true };
    const state = offersReducer(initialState, fetchOffers.rejected(null, '', undefined));
    expect(state.isLoading).toBe(false);
  });
});
