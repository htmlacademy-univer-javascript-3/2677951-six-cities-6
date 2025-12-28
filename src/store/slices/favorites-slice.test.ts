import { favoritesReducer } from './favorites-slice';
import { fetchFavorites, toggleFavorite } from '../action';
import { Offer } from '../../types/offer';

const createMockOffer = (id: string, isFavorite: boolean): Offer => ({
  id,
  title: 'Test',
  type: 'apartment',
  price: 100,
  city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite,
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

describe('favoritesSlice', () => {
  it('should return initial state', () => {
    const state = favoritesReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state.favorites).toEqual([]);
    expect(state.isLoading).toBe(false);
  });

  it('should set favorites on fetchFavorites.fulfilled', () => {
    const initialState = { favorites: [], isLoading: false };
    const mockFavorites = [createMockOffer('1', true)];
    const state = favoritesReducer(initialState, fetchFavorites.fulfilled(mockFavorites, '', undefined));
    expect(state.favorites).toEqual(mockFavorites);
    expect(state.isLoading).toBe(false);
  });

  it('should add to favorites on toggleFavorite.fulfilled', () => {
    const initialState = { favorites: [], isLoading: false };
    const updatedOffer = createMockOffer('1', true);
    const state = favoritesReducer(initialState, toggleFavorite.fulfilled(updatedOffer, '', { offerId: '1', status: 1 }));
    expect(state.favorites).toHaveLength(1);
    expect(state.favorites[0].isFavorite).toBe(true);
  });
});
