import { offersReducer } from './offers-slice';
import { fetchOffers, toggleFavorite, FavoriteStatus } from '../action';
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
  maxAdults: 4,
};

describe('offersSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { offers: [], isLoading: false, error: null };

    const result = offersReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set isLoading true and reset error with fetchOffers.pending', () => {
    const state = { offers: [], isLoading: false, error: 'Some error' };
    const expectedState = { offers: [], isLoading: true, error: null };

    const result = offersReducer(state, fetchOffers.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set offers and isLoading false with fetchOffers.fulfilled', () => {
    const mockOffers = [mockOffer];
    const expectedState = { offers: mockOffers, isLoading: false, error: null };

    const result = offersReducer(undefined, fetchOffers.fulfilled(mockOffers, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set error and isLoading false with fetchOffers.rejected', () => {
    const state = { offers: [], isLoading: true, error: null };
    const expectedState = { offers: [], isLoading: false, error: 'Failed to load offers' };

    const result = offersReducer(state, fetchOffers.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should update offer with toggleFavorite.fulfilled when offer exists', () => {
    const updatedOffer = { ...mockOffer, isFavorite: true };
    const state = { offers: [mockOffer], isLoading: false, error: null };
    const expectedState = { offers: [updatedOffer], isLoading: false, error: null };

    const result = offersReducer(
      state,
      toggleFavorite.fulfilled(updatedOffer, '', { offerId: '1', status: FavoriteStatus.Add })
    );

    expect(result).toEqual(expectedState);
  });

  it('should not update offers with toggleFavorite.fulfilled when offer does not exist', () => {
    const updatedOffer = { ...mockOffer, id: '2', isFavorite: true };
    const state = { offers: [mockOffer], isLoading: false, error: null };

    const result = offersReducer(
      state,
      toggleFavorite.fulfilled(updatedOffer, '', { offerId: '2', status: FavoriteStatus.Add })
    );

    expect(result).toEqual(state);
  });
});
