import { currentOfferReducer } from './current-offer-slice';
import { fetchOffer, fetchNearbyOffers, toggleFavorite, FavoriteStatus } from '../action';
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

  it('should reset error with fetchOffer.pending', () => {
    const state = { currentOffer: mockOffer, nearbyOffers: [], error: 'Some error' };
    const result = currentOfferReducer(state, fetchOffer.pending('', '1'));
    expect(result).toEqual({ ...state, error: null });
  });

  it('should set error with fetchOffer.rejected', () => {
    const expectedState = { currentOffer: null, nearbyOffers: [], error: 'Failed to load offer' };
    const result = currentOfferReducer(undefined, fetchOffer.rejected(null, '', '1'));
    expect(result).toEqual(expectedState);
  });

  it('should update currentOffer with toggleFavorite.fulfilled when ids match', () => {
    const updatedOffer = { ...mockOffer, isFavorite: true };
    const state = { currentOffer: mockOffer, nearbyOffers: [], error: null };

    const result = currentOfferReducer(
      state,
      toggleFavorite.fulfilled(updatedOffer, '', { offerId: '1', status: FavoriteStatus.Add })
    );

    expect(result).toEqual({ ...state, currentOffer: updatedOffer });
  });

  it('should not update currentOffer with toggleFavorite.fulfilled when ids do not match', () => {
    const updatedOffer = { ...mockOffer, id: '2', isFavorite: true };
    const state = { currentOffer: mockOffer, nearbyOffers: [], error: null };

    const result = currentOfferReducer(
      state,
      toggleFavorite.fulfilled(updatedOffer, '', { offerId: '2', status: FavoriteStatus.Add })
    );

    expect(result).toEqual(state);
  });
});
