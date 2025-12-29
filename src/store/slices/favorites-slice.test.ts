import { favoritesReducer } from './favorites-slice';
import { fetchFavorites, toggleFavorite, FavoriteStatus } from '../action';
import { Offer } from '../../types/offer';

const baseOffer: Offer = {
  id: '1',
  title: 'Favorite Offer',
  type: 'apartment',
  price: 100,
  city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: true,
  isPremium: false,
  rating: 4.5,
  previewImage: 'img/test.jpg',
  description: 'Test',
  bedrooms: 2,
  goods: [],
  host: { name: 'Host', avatarUrl: '', isPro: false },
  images: [],
  maxAdults: 4,
};

describe('favoritesSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { favorites: [], isLoading: false, error: null };

    const result = favoritesReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set isLoading to true with fetchFavorites.pending', () => {
    const expectedState = { favorites: [], isLoading: true, error: null };

    const result = favoritesReducer(undefined, fetchFavorites.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set favorites with fetchFavorites.fulfilled', () => {
    const mockFavorites = [baseOffer];
    const expectedState = { favorites: mockFavorites, isLoading: false, error: null };

    const result = favoritesReducer(undefined, fetchFavorites.fulfilled(mockFavorites, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set error with fetchFavorites.rejected', () => {
    const expectedState = { favorites: [], isLoading: false, error: 'Failed to load favorites' };

    const result = favoritesReducer(undefined, fetchFavorites.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should add offer with toggleFavorite.fulfilled when isFavorite is true', () => {
    const offer = { ...baseOffer, isFavorite: true };
    const state = { favorites: [], isLoading: false, error: null };

    const result = favoritesReducer(
      state,
      toggleFavorite.fulfilled(offer, '', { offerId: offer.id, status: FavoriteStatus.Add })
    );

    expect(result.favorites).toEqual([offer]);
  });

  it('should remove offer with toggleFavorite.fulfilled when isFavorite is false', () => {
    const removed = { ...baseOffer, isFavorite: false };
    const state = { favorites: [baseOffer], isLoading: false, error: null };

    const result = favoritesReducer(
      state,
      toggleFavorite.fulfilled(removed, '', { offerId: removed.id, status: FavoriteStatus.Remove })
    );

    expect(result.favorites).toEqual([]);
  });
});
